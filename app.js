// =========================================
// HOUSEHOLD MAINTENANCE TRACKER - APP
// Executive Function Friendly Design
// with Integrated Organization System
// =========================================

class HouseholdTracker {
    constructor() {
        this.tasks = [];
        this.completionHistory = [];
        this.streak = 0;
        this.focusMode = false;
        this.routineState = {}; // Track routine checklist progress
        this.init();
    }

    // =========================================
    // INITIALIZATION
    // =========================================

    init() {
        this.loadData();
        this.initializeTasks();
        this.bindEvents();
        this.render();
        this.renderSystemsView();
        this.updateStats();
        this.checkEFHelper();
        this.setTodayDate();
        this.showRandomTip();

        // Initialize GitHub sync
        this.sync = new GitHubSync(this);
        this.sync.updateSyncUI();
        this.bindSyncEvents();

        // Auto-sync on load if configured
        if (this.sync.isConfigured()) {
            this.sync.sync();
        }
    }

    loadData() {
        // Load completion history from localStorage
        const savedHistory = localStorage.getItem('householdTracker_history');
        if (savedHistory) {
            this.completionHistory = JSON.parse(savedHistory);
        }

        // Load custom tasks
        const savedTasks = localStorage.getItem('householdTracker_tasks');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        }

        // Load streak
        const savedStreak = localStorage.getItem('householdTracker_streak');
        if (savedStreak) {
            this.streak = parseInt(savedStreak);
        }

        // Check and update streak
        this.updateStreak();
    }

    initializeTasks() {
        // If no saved tasks, use defaults
        if (this.tasks.length === 0) {
            this.tasks = DEFAULT_TASKS.map(task => ({
                ...task,
                nextDue: this.calculateNextDue(task.frequency),
                lastCompleted: null
            }));
            this.saveTasks();
        }
    }

    // =========================================
    // DATE CALCULATIONS
    // =========================================

    calculateNextDue(frequency, fromDate = null) {
        const base = fromDate ? new Date(fromDate) : new Date();
        const days = FREQUENCIES[frequency]?.days || 7;
        base.setDate(base.getDate() + days);
        base.setHours(0, 0, 0, 0);
        return base.toISOString();
    }

    isOverdue(task) {
        if (!task.nextDue) return false;
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return new Date(task.nextDue) < now;
    }

    isDueToday(task) {
        if (!task.nextDue) return false;
        const now = new Date();
        const due = new Date(task.nextDue);
        return now.toDateString() === due.toDateString();
    }

    isDueThisWeek(task) {
        if (!task.nextDue) return false;
        const now = new Date();
        const weekEnd = new Date();
        weekEnd.setDate(now.getDate() + 7);
        const due = new Date(task.nextDue);
        return due >= now && due <= weekEnd;
    }

    getDaysUntilDue(task) {
        if (!task.nextDue) return Infinity;
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const due = new Date(task.nextDue);
        due.setHours(0, 0, 0, 0);
        return Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    setTodayDate() {
        const dateEl = document.getElementById('today-date');
        if (dateEl) {
            const options = { weekday: 'long', month: 'long', day: 'numeric' };
            dateEl.textContent = new Date().toLocaleDateString('en-US', options);
        }
    }

    // =========================================
    // TASK OPERATIONS
    // =========================================

    completeTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        // Record completion
        const completion = {
            taskId: task.id,
            taskName: task.name,
            completedAt: new Date().toISOString(),
            wasOverdue: this.isOverdue(task)
        };
        this.completionHistory.push(completion);
        this.saveHistory();

        // Update task
        task.lastCompleted = new Date().toISOString();
        task.nextDue = this.calculateNextDue(task.frequency);
        this.saveTasks();

        // Update streak
        this.updateStreak();

        // Show celebration
        this.showCelebration();

        // Re-render
        this.render();
        this.updateStats();
    }

    uncompleteTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        // Remove most recent completion for this task
        const index = this.completionHistory.findLastIndex(c => c.taskId === taskId);
        if (index !== -1) {
            this.completionHistory.splice(index, 1);
            this.saveHistory();
        }

        // Recalculate next due based on previous completion or default
        const prevCompletion = this.completionHistory.filter(c => c.taskId === taskId).pop();
        if (prevCompletion) {
            task.lastCompleted = prevCompletion.completedAt;
            task.nextDue = this.calculateNextDue(task.frequency, prevCompletion.completedAt);
        } else {
            task.lastCompleted = null;
            task.nextDue = this.calculateNextDue(task.frequency, new Date(Date.now() - FREQUENCIES[task.frequency].days * 24 * 60 * 60 * 1000));
        }

        this.saveTasks();
        this.render();
        this.updateStats();
    }

    addTask(taskData) {
        const newTask = {
            id: 'custom-' + Date.now(),
            ...taskData,
            isDefault: false,
            nextDue: this.calculateNextDue(taskData.frequency),
            lastCompleted: null
        };
        this.tasks.push(newTask);
        this.saveTasks();
        this.render();
    }

    updateTask(taskId, taskData) {
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            this.tasks[index] = { ...this.tasks[index], ...taskData };
            this.saveTasks();
            this.render();
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveTasks();
        this.render();
    }

    pauseTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;
        task.paused = true;
        task.pausedAt = new Date().toISOString();
        this.saveTasks();
        this.render();
        this.updateStats();
    }

    unpauseTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;
        task.paused = false;
        task.pausedAt = null;
        // Recalculate next due from now so it doesn't show as immediately overdue
        task.nextDue = this.calculateNextDue(task.frequency);
        this.saveTasks();
        this.render();
        this.updateStats();
    }

    // =========================================
    // STREAK MANAGEMENT
    // =========================================

    updateStreak() {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        const todayCompletions = this.completionHistory.filter(c =>
            new Date(c.completedAt).toDateString() === today
        );
        const yesterdayCompletions = this.completionHistory.filter(c =>
            new Date(c.completedAt).toDateString() === yesterday
        );

        if (todayCompletions.length > 0) {
            if (yesterdayCompletions.length > 0 || this.streak > 0) {
                // Continue streak
            } else {
                this.streak = 1;
            }
        } else if (yesterdayCompletions.length > 0) {
            // Did something yesterday, waiting for today
        } else {
            this.streak = 0;
        }

        // Increment streak if first completion today
        const lastStreakUpdate = localStorage.getItem('householdTracker_lastStreakDate');
        if (todayCompletions.length > 0 && lastStreakUpdate !== today) {
            this.streak++;
            localStorage.setItem('householdTracker_lastStreakDate', today);
        }

        localStorage.setItem('householdTracker_streak', this.streak.toString());
    }

    // =========================================
    // DATA PERSISTENCE
    // =========================================

    saveTasks() {
        localStorage.setItem('householdTracker_tasks', JSON.stringify(this.tasks));
    }

    saveHistory() {
        // Keep only last 90 days of history
        const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        this.completionHistory = this.completionHistory.filter(c =>
            new Date(c.completedAt) > cutoff
        );
        localStorage.setItem('householdTracker_history', JSON.stringify(this.completionHistory));
    }

    exportData() {
        const data = {
            tasks: this.tasks,
            completionHistory: this.completionHistory,
            streak: this.streak,
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `household-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.tasks) this.tasks = data.tasks;
                if (data.completionHistory) this.completionHistory = data.completionHistory;
                if (data.streak) this.streak = data.streak;
                this.saveTasks();
                this.saveHistory();
                localStorage.setItem('householdTracker_streak', this.streak.toString());
                this.render();
                this.updateStats();
                alert('Data imported successfully!');
            } catch (err) {
                alert('Error importing data: ' + err.message);
            }
        };
        reader.readAsText(file);
    }

    // =========================================
    // FILTERING & SORTING
    // =========================================

    getOverdueTasks() {
        return this.tasks
            .filter(t => !t.paused && this.isOverdue(t))
            .sort((a, b) => new Date(a.nextDue) - new Date(b.nextDue));
    }

    getTodayTasks() {
        return this.tasks
            .filter(t => !t.paused && this.isDueToday(t))
            .sort((a, b) => a.duration - b.duration);
    }

    getWeekTasks() {
        return this.tasks
            .filter(t => !t.paused && this.isDueThisWeek(t) && !this.isOverdue(t))
            .sort((a, b) => new Date(a.nextDue) - new Date(b.nextDue));
    }

    getQuickWins() {
        return this.tasks
            .filter(t => !t.paused && (this.isDueToday(t) || this.isOverdue(t)) && t.duration <= 5)
            .slice(0, 5);
    }

    getFilteredTasks(category = 'all', assignee = 'all', frequency = 'all', status = 'active') {
        return this.tasks.filter(t => {
            if (category !== 'all' && t.category !== category) return false;
            if (assignee !== 'all' && t.assignee !== assignee) return false;
            if (frequency !== 'all' && t.frequency !== frequency) return false;
            if (status === 'active' && t.paused) return false;
            if (status === 'paused' && !t.paused) return false;
            return true;
        });
    }

    getPausedTaskCount() {
        return this.tasks.filter(t => t.paused).length;
    }

    // =========================================
    // BATCH MODE
    // =========================================

    getBatchByLocation() {
        const batches = {};
        const dueTasks = this.tasks.filter(t => this.isDueThisWeek(t) || this.isOverdue(t));

        dueTasks.forEach(task => {
            const loc = task.location || 'other';
            if (!batches[loc]) {
                batches[loc] = { tasks: [], totalTime: 0 };
            }
            batches[loc].tasks.push(task);
            batches[loc].totalTime += task.duration || 0;
        });

        return batches;
    }

    getBatchByDuration() {
        const batches = {
            'quick': { name: 'Quick (1-5 min)', tasks: [], totalTime: 0 },
            'medium': { name: 'Medium (10-15 min)', tasks: [], totalTime: 0 },
            'long': { name: 'Longer (30+ min)', tasks: [], totalTime: 0 }
        };

        const dueTasks = this.tasks.filter(t => this.isDueThisWeek(t) || this.isOverdue(t));

        dueTasks.forEach(task => {
            let bucket;
            if (task.duration <= 5) bucket = 'quick';
            else if (task.duration <= 15) bucket = 'medium';
            else bucket = 'long';

            batches[bucket].tasks.push(task);
            batches[bucket].totalTime += task.duration || 0;
        });

        return batches;
    }

    getBatchBySupplies() {
        const batches = {};
        const dueTasks = this.tasks.filter(t => this.isDueThisWeek(t) || this.isOverdue(t));

        dueTasks.forEach(task => {
            const supplies = task.supplies || 'No supplies needed';
            const mainSupply = supplies.split(',')[0].trim() || 'No supplies needed';

            if (!batches[mainSupply]) {
                batches[mainSupply] = { tasks: [], totalTime: 0 };
            }
            batches[mainSupply].tasks.push(task);
            batches[mainSupply].totalTime += task.duration || 0;
        });

        return batches;
    }

    // =========================================
    // EXECUTIVE FUNCTION HELPERS
    // =========================================

    checkEFHelper() {
        const overdue = this.getOverdueTasks().length;
        const today = this.getTodayTasks().length;

        if (overdue > 5 || today > 5) {
            document.getElementById('ef-helper')?.classList.remove('hidden');
        }
    }

    pickRandomTask() {
        const available = [...this.getOverdueTasks(), ...this.getTodayTasks()];
        if (available.length === 0) {
            alert('No tasks due — you\'re all caught up.');
            return;
        }

        const quickTasks = available.filter(t => t.duration <= 5);
        const pool = quickTasks.length > 0 ? quickTasks : available;
        const randomTask = pool[Math.floor(Math.random() * pool.length)];

        this.highlightTask(randomTask.id);
    }

    highlightTask(taskId) {
        document.querySelectorAll('.task-card').forEach(el => {
            el.style.animation = '';
        });

        const taskEl = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskEl) {
            taskEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            taskEl.style.animation = 'pulse 0.5s ease 3';
        }
    }

    toggleFocusMode() {
        this.focusMode = !this.focusMode;
        document.body.classList.toggle('focus-mode', this.focusMode);

        if (this.focusMode) {
            this.renderFocusMode();
        } else {
            this.render();
        }
    }

    renderFocusMode() {
        const urgent = [...this.getOverdueTasks(), ...this.getTodayTasks()].slice(0, 3);

        const container = document.getElementById('today-tasks');
        container.innerHTML = '';

        if (urgent.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">~</span>
                    <p>nothing urgent — take a break or pick a quick win</p>
                </div>
            `;
            return;
        }

        urgent.forEach(task => {
            container.appendChild(this.createTaskCard(task));
        });

        document.querySelector('.task-section')?.classList.add('focus-section');
    }

    // =========================================
    // CONTEXTUAL TIPS
    // =========================================

    showRandomTip() {
        if (typeof ORGANIZATION_TIPS === 'undefined') return;

        const tipEl = document.getElementById('contextual-tip');
        const tipText = tipEl?.querySelector('.tip-text');
        if (!tipEl || !tipText) return;

        // Get today's tasks categories to show a relevant tip
        const todayCategories = [...this.getOverdueTasks(), ...this.getTodayTasks()]
            .map(t => t.category)
            .filter((v, i, a) => a.indexOf(v) === i);

        let tips = [];

        // Gather tips from categories that have tasks due today
        todayCategories.forEach(cat => {
            if (ORGANIZATION_TIPS.categoryTips[cat]) {
                tips.push(...ORGANIZATION_TIPS.categoryTips[cat]);
            }
        });

        // Fallback to core rules if no category tips
        if (tips.length === 0) {
            tips = ORGANIZATION_TIPS.coreRules.map(r => `${r.title}: ${r.description}`);
        }

        // Pick a random tip
        const tip = tips[Math.floor(Math.random() * tips.length)];
        tipText.textContent = tip;
        tipEl.classList.remove('hidden');
    }

    showCategoryTips(category) {
        if (typeof ORGANIZATION_TIPS === 'undefined') return;

        const banner = document.getElementById('category-tip-banner');
        if (!banner) return;

        const tips = ORGANIZATION_TIPS.categoryTips[category];
        if (!tips || tips.length === 0 || category === 'all') {
            banner.classList.add('hidden');
            return;
        }

        const catInfo = CATEGORIES[category] || { icon: '', name: category };

        banner.innerHTML = `
            <div class="category-tip-header">
                <span>tips for ${catInfo.name.toLowerCase()}</span>
                <button class="category-tip-close" onclick="this.parentElement.parentElement.classList.add('hidden')">x</button>
            </div>
            <ul class="category-tip-list">
                ${tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        `;
        banner.classList.remove('hidden');
    }

    // =========================================
    // ROUTINE MODAL
    // =========================================

    openRoutineModal(routineKey) {
        if (typeof ORGANIZATION_TIPS === 'undefined') return;

        const routine = ORGANIZATION_TIPS.routines[routineKey];
        if (!routine) return;

        const modal = document.getElementById('routine-modal');
        const title = document.getElementById('routine-modal-title');
        const checklist = document.getElementById('routine-checklist');
        const doneSection = document.getElementById('routine-done');

        title.textContent = `${routine.name} (~${routine.time})`;
        doneSection.classList.add('hidden');

        // Initialize state for this routine
        this.routineState[routineKey] = routine.steps.map(() => false);

        checklist.innerHTML = routine.steps.map((step, i) => `
            <div class="routine-item" data-index="${i}">
                <div class="routine-checkbox" data-routine="${routineKey}" data-index="${i}"></div>
                <span class="routine-step-text">${step}</span>
            </div>
        `).join('');

        // Bind checkbox events
        checklist.querySelectorAll('.routine-checkbox').forEach(cb => {
            cb.addEventListener('click', (e) => {
                const rKey = e.target.dataset.routine;
                const idx = parseInt(e.target.dataset.index);
                this.toggleRoutineStep(rKey, idx);
            });
        });

        modal.classList.remove('hidden');
    }

    toggleRoutineStep(routineKey, index) {
        if (!this.routineState[routineKey]) return;

        this.routineState[routineKey][index] = !this.routineState[routineKey][index];
        const checked = this.routineState[routineKey][index];

        const item = document.querySelector(`.routine-item[data-index="${index}"]`);
        const checkbox = item?.querySelector('.routine-checkbox');
        if (item && checkbox) {
            if (checked) {
                checkbox.classList.add('checked');
                item.classList.add('completed');
            } else {
                checkbox.classList.remove('checked');
                item.classList.remove('completed');
            }
        }

        // Check if all steps are done
        const allDone = this.routineState[routineKey].every(s => s);
        if (allDone) {
            const doneSection = document.getElementById('routine-done');
            doneSection?.classList.remove('hidden');

            // Record as a completion for streak
            this.completionHistory.push({
                taskId: `routine-${routineKey}`,
                taskName: `${ORGANIZATION_TIPS.routines[routineKey].name}`,
                completedAt: new Date().toISOString(),
                wasOverdue: false
            });
            this.saveHistory();
            this.updateStreak();
            this.updateStats();
        }
    }

    closeRoutineModal() {
        document.getElementById('routine-modal')?.classList.add('hidden');
    }

    // =========================================
    // SYSTEMS VIEW RENDERING
    // =========================================

    renderSystemsView() {
        if (typeof ORGANIZATION_TIPS === 'undefined') return;

        this.renderCoreRules();
        this.renderRoutines();
        this.renderProblemGuides();
        this.renderRoomSetup();
        this.renderGoldenRule();
    }

    renderCoreRules() {
        const container = document.getElementById('core-rules');
        if (!container) return;

        container.innerHTML = ORGANIZATION_TIPS.coreRules.map(rule => `
            <div class="core-rule-card">
                <span class="core-rule-icon">${rule.icon}</span>
                <div class="core-rule-content">
                    <strong>${rule.title}</strong>
                    <p>${rule.description}</p>
                </div>
            </div>
        `).join('');
    }

    renderRoutines() {
        const container = document.getElementById('routines-list');
        if (!container) return;

        const routines = ORGANIZATION_TIPS.routines;
        const icons = {};

        container.innerHTML = Object.keys(routines).map(key => {
            const routine = routines[key];
            return `
                <div class="routine-detail-card">
                    <div class="routine-detail-header">
                        <span>${routine.name}</span>
                        <span class="routine-time-badge">~${routine.time}</span>
                    </div>
                    <ol class="routine-steps">
                        ${routine.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            `;
        }).join('');
    }

    renderProblemGuides() {
        const container = document.getElementById('problem-guides');
        if (!container) return;

        container.innerHTML = ORGANIZATION_TIPS.problemGuides.map(guide => `
            <details class="problem-guide-card">
                <summary class="problem-guide-summary">
                    <span class="problem-guide-icon">${guide.icon}</span>
                    <span>${guide.title}</span>
                </summary>
                <div class="problem-guide-body">
                    <p class="problem-description">${guide.problem}</p>
                    <h4>The Fix:</h4>
                    <ul class="solution-list">
                        ${guide.solution.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
            </details>
        `).join('');
    }

    renderRoomSetup() {
        const container = document.getElementById('room-setup');
        if (!container) return;

        container.innerHTML = ORGANIZATION_TIPS.roomSetup.map(room => `
            <details class="room-setup-card">
                <summary class="room-setup-summary">
                    <span>${room.icon} ${room.room}</span>
                    <span class="room-purpose">${room.purpose}</span>
                </summary>
                <div class="room-setup-body">
                    <h4>What you need:</h4>
                    <ul class="room-items-list">
                        ${room.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    <div class="room-rule">
                        <strong>Rule:</strong> ${room.rule}
                    </div>
                </div>
            </details>
        `).join('');
    }

    renderGoldenRule() {
        const container = document.getElementById('golden-rule');
        if (!container) return;

        const rule = ORGANIZATION_TIPS.goldenRule;
        container.innerHTML = `
            <div class="golden-rule-inner">
                <h3>${rule.title}</h3>
                <p>${rule.text}</p>
            </div>
        `;
    }

    // =========================================
    // UI RENDERING
    // =========================================

    render() {
        this.renderTodayView();
        this.renderWeekView();
        this.renderAllView();
        this.populateCategoryFilter();
    }

    createTaskCard(task, showDueDate = false) {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.dataset.taskId = task.id;
        card.dataset.category = task.category;

        if (this.isOverdue(task) && !task.paused) card.classList.add('overdue');
        if (task.duration <= 5 && !task.paused) card.classList.add('quick-win');
        if (task.paused) card.classList.add('paused');

        const category = CATEGORIES[task.category] || { icon: '', name: task.category };
        const daysUntil = this.getDaysUntilDue(task);

        let dueText = '';
        if (showDueDate) {
            if (daysUntil < 0) {
                dueText = `${Math.abs(daysUntil)} days overdue`;
            } else if (daysUntil === 0) {
                dueText = 'Today';
            } else if (daysUntil === 1) {
                dueText = 'Tomorrow';
            } else {
                dueText = this.formatDate(task.nextDue);
            }
        }

        card.innerHTML = `
            <div class="task-checkbox" data-action="toggle"></div>
            <div class="task-content" data-action="edit">
                <div class="task-name">
                    <span>${task.name}</span>
                </div>
                <div class="task-meta">
                    <span class="task-tag category">${category.name}</span>
                    <span class="task-tag duration">${task.duration} min</span>
                    ${task.assignee !== 'Either' ? `<span class="task-tag assignee">${task.assignee}</span>` : ''}
                    ${task.paused ? `<span class="task-tag paused-tag">paused</span>` : ''}
                    ${!task.paused && dueText && daysUntil < 0 ? `<span class="task-tag overdue">${dueText}</span>` : ''}
                    ${!task.paused && dueText && daysUntil >= 0 && showDueDate ? `<span class="task-tag">${dueText}</span>` : ''}
                </div>
            </div>
        `;

        // Event listeners
        card.querySelector('[data-action="toggle"]').addEventListener('click', (e) => {
            e.stopPropagation();
            this.completeTask(task.id);
        });

        card.querySelector('[data-action="edit"]').addEventListener('click', () => {
            this.openTaskModal(task);
        });

        return card;
    }

    renderTodayView() {
        // Overdue
        const overdueContainer = document.getElementById('overdue-tasks');
        const overdueSection = document.getElementById('overdue-section');
        const overdueTasks = this.getOverdueTasks();

        overdueContainer.innerHTML = '';
        if (overdueTasks.length > 0) {
            overdueSection.classList.remove('hidden');
            overdueTasks.forEach(task => {
                overdueContainer.appendChild(this.createTaskCard(task, true));
            });
        } else {
            overdueSection.classList.add('hidden');
        }

        // Today
        const todayContainer = document.getElementById('today-tasks');
        const todayEmpty = document.getElementById('today-empty');
        const todayTasks = this.getTodayTasks();

        todayContainer.innerHTML = '';
        if (todayTasks.length > 0) {
            todayEmpty.classList.add('hidden');
            todayTasks.forEach(task => {
                todayContainer.appendChild(this.createTaskCard(task));
            });
        } else {
            todayEmpty.classList.remove('hidden');
        }

        // Quick wins
        const quickContainer = document.getElementById('quick-wins-tasks');
        const quickTasks = this.getQuickWins();

        quickContainer.innerHTML = '';
        if (quickTasks.length > 0) {
            document.getElementById('quick-wins-section').classList.remove('hidden');
            quickTasks.forEach(task => {
                quickContainer.appendChild(this.createTaskCard(task));
            });
        } else {
            document.getElementById('quick-wins-section').classList.add('hidden');
        }
    }

    renderWeekView() {
        const container = document.getElementById('week-tasks');
        const weekTasks = this.getWeekTasks();

        container.innerHTML = '';

        if (weekTasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">~</span>
                    <p>nothing else due this week</p>
                </div>
            `;
            return;
        }

        // Group by day
        const grouped = {};
        weekTasks.forEach(task => {
            const dateKey = new Date(task.nextDue).toDateString();
            if (!grouped[dateKey]) grouped[dateKey] = [];
            grouped[dateKey].push(task);
        });

        Object.keys(grouped).forEach(dateKey => {
            const dayGroup = document.createElement('div');
            dayGroup.className = 'category-group';
            dayGroup.innerHTML = `<h3 class="category-header">${this.formatDate(dateKey)}</h3>`;

            const taskList = document.createElement('div');
            taskList.className = 'task-list';

            grouped[dateKey].forEach(task => {
                taskList.appendChild(this.createTaskCard(task));
            });

            dayGroup.appendChild(taskList);
            container.appendChild(dayGroup);
        });
    }

    renderAllView() {
        const container = document.getElementById('all-tasks');

        // Get filter values
        const categoryFilter = document.getElementById('category-filter')?.value || 'all';
        const assigneeFilter = document.getElementById('assignee-filter')?.value || 'all';
        const frequencyFilter = document.getElementById('frequency-filter')?.value || 'all';
        const statusFilter = document.getElementById('status-filter')?.value || 'active';

        const filteredTasks = this.getFilteredTasks(categoryFilter, assigneeFilter, frequencyFilter, statusFilter);

        // Show category tips when filtering by category
        this.showCategoryTips(categoryFilter);

        container.innerHTML = '';

        if (filteredTasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">~</span>
                    <p>no tasks match your filters</p>
                </div>
            `;
            return;
        }

        // Group by category
        const grouped = {};
        filteredTasks.forEach(task => {
            if (!grouped[task.category]) grouped[task.category] = [];
            grouped[task.category].push(task);
        });

        Object.keys(grouped).sort().forEach(cat => {
            const category = CATEGORIES[cat] || { icon: '', name: cat };
            const catGroup = document.createElement('div');
            catGroup.className = 'category-group';
            catGroup.innerHTML = `<h3 class="category-header">${category.name}</h3>`;

            const taskList = document.createElement('div');
            taskList.className = 'task-list';

            grouped[cat]
                .sort((a, b) => new Date(a.nextDue) - new Date(b.nextDue))
                .forEach(task => {
                    taskList.appendChild(this.createTaskCard(task, true));
                });

            catGroup.appendChild(taskList);
            container.appendChild(catGroup);
        });
    }

    renderBatchView(batchType) {
        const container = document.getElementById('batch-results');
        let batches;
        let groupLabel;

        switch (batchType) {
            case 'location':
                batches = this.getBatchByLocation();
                groupLabel = (key) => {
                    const loc = LOCATIONS[key] || { icon: '', name: key };
                    return loc.name;
                };
                break;
            case 'duration':
                batches = this.getBatchByDuration();
                groupLabel = (key) => batches[key].name;
                break;
            case 'supplies':
                batches = this.getBatchBySupplies();
                groupLabel = (key) => key;
                break;
            default:
                return;
        }

        container.innerHTML = '';

        Object.keys(batches).forEach(key => {
            const batch = batches[key];
            if (batch.tasks.length === 0) return;

            const group = document.createElement('div');
            group.className = 'batch-group';
            group.innerHTML = `
                <div class="batch-group-header">
                    <div class="batch-group-title">
                        ${groupLabel(key)}
                        <span class="batch-group-count">${batch.tasks.length} tasks</span>
                    </div>
                    <span class="batch-group-time">~${batch.totalTime} min total</span>
                </div>
            `;

            const taskList = document.createElement('div');
            taskList.className = 'task-list';

            batch.tasks.forEach(task => {
                taskList.appendChild(this.createTaskCard(task));
            });

            group.appendChild(taskList);
            container.appendChild(group);
        });
    }

    populateCategoryFilter() {
        const select = document.getElementById('category-filter');
        if (!select) return;

        select.innerHTML = '<option value="all">All Categories</option>';

        Object.keys(CATEGORIES).forEach(key => {
            const cat = CATEGORIES[key];
            const option = document.createElement('option');
            option.value = key;
            option.textContent = cat.name;
            select.appendChild(option);
        });
    }

    updateStats() {
        const overdue = this.getOverdueTasks().length;
        const today = this.getTodayTasks().length + overdue;
        const week = this.getWeekTasks().length;
        const paused = this.getPausedTaskCount();

        document.querySelector('#stat-overdue .stat-number').textContent = overdue;
        document.querySelector('#stat-today .stat-number').textContent = today;
        document.querySelector('#stat-week .stat-number').textContent = week;
        document.querySelector('#stat-streak .stat-number').textContent = this.streak;

        // Show paused count if any
        const pausedStat = document.getElementById('stat-paused');
        if (pausedStat) {
            pausedStat.querySelector('.stat-number').textContent = paused;
            pausedStat.style.display = paused > 0 ? '' : 'none';
        }

        // Color overdue if > 0
        document.getElementById('stat-overdue').style.background =
            overdue > 0 ? 'rgba(225, 112, 85, 0.1)' : '';
    }

    showCelebration() {
        const celebration = document.getElementById('celebration');
        const messages = [
            'nice work',
            'one less thing',
            'done',
            'task complete',
            'well done',
            'keep going'
        ];

        celebration.querySelector('.celebration-text').textContent =
            messages[Math.floor(Math.random() * messages.length)];

        celebration.classList.remove('hidden');

        setTimeout(() => {
            celebration.classList.add('hidden');
        }, 1500);
    }

    // =========================================
    // MODAL HANDLING
    // =========================================

    openTaskModal(task = null) {
        const modal = document.getElementById('task-modal');
        const form = document.getElementById('task-form');
        const title = document.getElementById('modal-title');
        const deleteBtn = document.getElementById('delete-task-btn');
        const pauseBtn = document.getElementById('pause-task-btn');

        if (task) {
            title.textContent = 'Edit Task';
            deleteBtn.classList.remove('hidden');
            pauseBtn.classList.remove('hidden');
            pauseBtn.textContent = task.paused ? 'unpause' : 'pause';
            pauseBtn.dataset.taskId = task.id;
            pauseBtn.dataset.isPaused = task.paused ? 'true' : 'false';
            document.getElementById('task-id').value = task.id;
            document.getElementById('task-name').value = task.name;
            document.getElementById('task-category').value = task.category;
            document.getElementById('task-frequency').value = task.frequency;
            document.getElementById('task-duration').value = task.duration;
            document.getElementById('task-assignee').value = task.assignee;
            document.getElementById('task-location').value = task.location || 'whole-home';
            document.getElementById('task-supplies').value = task.supplies || '';
            document.getElementById('task-notes').value = task.notes || '';
        } else {
            title.textContent = 'Add New Task';
            deleteBtn.classList.add('hidden');
            pauseBtn.classList.add('hidden');
            form.reset();
            document.getElementById('task-id').value = '';
        }

        modal.classList.remove('hidden');
    }

    closeTaskModal() {
        document.getElementById('task-modal').classList.add('hidden');
    }

    handleTaskFormSubmit(e) {
        e.preventDefault();

        const taskId = document.getElementById('task-id').value;
        const taskData = {
            name: document.getElementById('task-name').value,
            category: document.getElementById('task-category').value,
            frequency: document.getElementById('task-frequency').value,
            duration: parseInt(document.getElementById('task-duration').value),
            assignee: document.getElementById('task-assignee').value,
            location: document.getElementById('task-location').value,
            supplies: document.getElementById('task-supplies').value,
            notes: document.getElementById('task-notes').value
        };

        if (taskId) {
            this.updateTask(taskId, taskData);
        } else {
            this.addTask(taskData);
        }

        this.closeTaskModal();
    }

    // =========================================
    // EVENT BINDING
    // =========================================

    bindEvents() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                e.target.classList.add('active');
                const tabView = document.getElementById(`${e.target.dataset.tab}-view`);
                if (tabView) tabView.classList.add('active');
            });
        });

        // Focus mode
        document.getElementById('focus-mode-btn')?.addEventListener('click', () => {
            this.toggleFocusMode();
        });

        // EF helper
        document.querySelector('.ef-pick-one')?.addEventListener('click', () => {
            this.pickRandomTask();
        });
        document.querySelector('.ef-dismiss')?.addEventListener('click', () => {
            document.getElementById('ef-helper')?.classList.add('hidden');
        });

        // Contextual tip dismiss
        document.querySelector('.tip-dismiss')?.addEventListener('click', () => {
            document.getElementById('contextual-tip')?.classList.add('hidden');
        });

        // Filters (including category tip display)
        ['category-filter', 'assignee-filter', 'frequency-filter', 'status-filter'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', () => {
                this.renderAllView();
            });
        });

        // Batch mode buttons
        document.querySelectorAll('.batch-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.batch-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.renderBatchView(e.target.dataset.batch);
            });
        });

        // Add task FAB
        document.getElementById('add-task-fab')?.addEventListener('click', () => {
            this.openTaskModal();
        });

        // Task Modal
        document.querySelector('#task-modal .modal-close')?.addEventListener('click', () => {
            this.closeTaskModal();
        });
        document.getElementById('task-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'task-modal') this.closeTaskModal();
        });
        document.getElementById('task-form')?.addEventListener('submit', (e) => {
            this.handleTaskFormSubmit(e);
        });
        document.getElementById('delete-task-btn')?.addEventListener('click', () => {
            const taskId = document.getElementById('task-id').value;
            if (taskId && confirm('Delete this task?')) {
                this.deleteTask(taskId);
                this.closeTaskModal();
            }
        });

        // Pause/unpause task
        document.getElementById('pause-task-btn')?.addEventListener('click', (e) => {
            const taskId = e.target.dataset.taskId;
            const isPaused = e.target.dataset.isPaused === 'true';
            if (taskId) {
                if (isPaused) {
                    this.unpauseTask(taskId);
                } else {
                    this.pauseTask(taskId);
                }
                this.closeTaskModal();
            }
        });

        // Routine Modal
        document.querySelectorAll('.routine-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const routineKey = e.target.dataset.routine;
                this.openRoutineModal(routineKey);
            });
        });
        document.querySelector('.routine-modal-close')?.addEventListener('click', () => {
            this.closeRoutineModal();
        });
        document.getElementById('routine-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'routine-modal') this.closeRoutineModal();
        });

        // Export/Import
        document.getElementById('export-btn')?.addEventListener('click', () => {
            this.exportData();
        });
        document.getElementById('import-input')?.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                this.importData(e.target.files[0]);
            }
        });

        // Celebration click to dismiss
        document.getElementById('celebration')?.addEventListener('click', () => {
            document.getElementById('celebration').classList.add('hidden');
        });
    }

    bindSyncEvents() {
        // Sync button
        document.getElementById('sync-btn')?.addEventListener('click', () => {
            if (this.sync.isConfigured()) {
                this.sync.sync();
            } else {
                this.sync.openConfigModal();
            }
        });

        // Sync settings (long press or right-click on sync button)
        document.getElementById('sync-btn')?.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.sync.openConfigModal();
        });

        // Sync modal
        document.getElementById('sync-save-btn')?.addEventListener('click', () => {
            this.sync.saveConfigFromForm();
        });
        document.querySelector('#sync-modal .modal-close')?.addEventListener('click', () => {
            this.sync.closeConfigModal();
        });
        document.getElementById('sync-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'sync-modal') this.sync.closeConfigModal();
        });

        // Auto-sync after completing a task (push changes)
        const origComplete = this.completeTask.bind(this);
        this.completeTask = (taskId) => {
            origComplete(taskId);
            if (this.sync.isConfigured()) {
                setTimeout(() => this.sync.pushData(), 500);
            }
        };
    }
}

// =========================================
// GITHUB SYNC MODULE
// Allows two people to share task state via a GitHub repo
// =========================================

class GitHubSync {
    constructor(tracker) {
        this.tracker = tracker;
        this.config = this.loadConfig();
        this.syncing = false;
        this.lastSyncTime = localStorage.getItem('householdTracker_lastSync') || null;
    }

    loadConfig() {
        const saved = localStorage.getItem('householdTracker_githubConfig');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { /* ignore */ }
        }
        return { token: '', repo: '', branch: 'main', filePath: 'tracker-data.json' };
    }

    saveConfig() {
        localStorage.setItem('householdTracker_githubConfig', JSON.stringify(this.config));
    }

    isConfigured() {
        return this.config.token && this.config.repo;
    }

    async pushData() {
        if (!this.isConfigured() || this.syncing) return;
        this.syncing = true;
        this.updateSyncStatus('syncing...');

        try {
            const data = {
                tasks: this.tracker.tasks,
                completionHistory: this.tracker.completionHistory,
                streak: this.tracker.streak,
                syncedAt: new Date().toISOString(),
                syncedBy: localStorage.getItem('householdTracker_userName') || 'unknown'
            };

            // Get current file SHA (needed for updates)
            let sha = null;
            try {
                const getResp = await fetch(
                    `https://api.github.com/repos/${this.config.repo}/contents/${this.config.filePath}?ref=${this.config.branch}`,
                    { headers: { 'Authorization': `Bearer ${this.config.token}`, 'Accept': 'application/vnd.github.v3+json' } }
                );
                if (getResp.ok) {
                    const fileData = await getResp.json();
                    sha = fileData.sha;
                }
            } catch (e) { /* file doesn't exist yet, that's fine */ }

            const body = {
                message: `sync: ${data.syncedBy} at ${new Date().toLocaleString()}`,
                content: btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2)))),
                branch: this.config.branch
            };
            if (sha) body.sha = sha;

            const putResp = await fetch(
                `https://api.github.com/repos/${this.config.repo}/contents/${this.config.filePath}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${this.config.token}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }
            );

            if (putResp.ok) {
                this.lastSyncTime = new Date().toISOString();
                localStorage.setItem('householdTracker_lastSync', this.lastSyncTime);
                this.updateSyncStatus('synced');
            } else {
                const err = await putResp.json();
                throw new Error(err.message || 'Push failed');
            }
        } catch (err) {
            console.error('Sync push error:', err);
            this.updateSyncStatus('sync error');
        } finally {
            this.syncing = false;
        }
    }

    async pullData() {
        if (!this.isConfigured() || this.syncing) return;
        this.syncing = true;
        this.updateSyncStatus('syncing...');

        try {
            const resp = await fetch(
                `https://api.github.com/repos/${this.config.repo}/contents/${this.config.filePath}?ref=${this.config.branch}`,
                { headers: { 'Authorization': `Bearer ${this.config.token}`, 'Accept': 'application/vnd.github.v3+json' } }
            );

            if (!resp.ok) {
                if (resp.status === 404) {
                    this.updateSyncStatus('no remote data yet');
                    return;
                }
                throw new Error('Pull failed');
            }

            const fileData = await resp.json();
            const content = decodeURIComponent(escape(atob(fileData.content.replace(/\n/g, ''))));
            const data = JSON.parse(content);

            // Merge: remote data wins for task definitions, local completions get merged
            if (data.tasks) {
                // Merge tasks: keep paused states, merge any new tasks from remote
                const localTaskMap = new Map(this.tracker.tasks.map(t => [t.id, t]));
                const remoteTaskMap = new Map(data.tasks.map(t => [t.id, t]));

                // Start with remote tasks as base
                const mergedTasks = data.tasks.map(rt => {
                    const local = localTaskMap.get(rt.id);
                    if (local) {
                        // Keep more recent completion
                        const localDate = local.lastCompleted ? new Date(local.lastCompleted) : new Date(0);
                        const remoteDate = rt.lastCompleted ? new Date(rt.lastCompleted) : new Date(0);
                        return localDate > remoteDate ? { ...rt, lastCompleted: local.lastCompleted, nextDue: local.nextDue } : rt;
                    }
                    return rt;
                });

                // Add any local-only tasks (custom tasks not yet synced)
                this.tracker.tasks.forEach(lt => {
                    if (!remoteTaskMap.has(lt.id)) {
                        mergedTasks.push(lt);
                    }
                });

                this.tracker.tasks = mergedTasks;
            }

            if (data.completionHistory) {
                // Merge completion histories (deduplicate by taskId + completedAt)
                const existingKeys = new Set(
                    this.tracker.completionHistory.map(c => `${c.taskId}_${c.completedAt}`)
                );
                data.completionHistory.forEach(c => {
                    const key = `${c.taskId}_${c.completedAt}`;
                    if (!existingKeys.has(key)) {
                        this.tracker.completionHistory.push(c);
                        existingKeys.add(key);
                    }
                });
            }

            this.tracker.saveTasks();
            this.tracker.saveHistory();
            this.tracker.render();
            this.tracker.updateStats();

            this.lastSyncTime = new Date().toISOString();
            localStorage.setItem('householdTracker_lastSync', this.lastSyncTime);
            this.updateSyncStatus('synced');
        } catch (err) {
            console.error('Sync pull error:', err);
            this.updateSyncStatus('sync error');
        } finally {
            this.syncing = false;
        }
    }

    async sync() {
        await this.pullData();
        await this.pushData();
    }

    updateSyncStatus(status) {
        const el = document.getElementById('sync-status');
        if (el) el.textContent = status;
    }

    openConfigModal() {
        const modal = document.getElementById('sync-modal');
        if (!modal) return;

        document.getElementById('sync-repo').value = this.config.repo;
        document.getElementById('sync-token').value = this.config.token;
        document.getElementById('sync-branch').value = this.config.branch || 'main';
        document.getElementById('sync-username').value =
            localStorage.getItem('householdTracker_userName') || '';

        modal.classList.remove('hidden');
    }

    closeConfigModal() {
        document.getElementById('sync-modal')?.classList.add('hidden');
    }

    saveConfigFromForm() {
        this.config.repo = document.getElementById('sync-repo').value.trim();
        this.config.token = document.getElementById('sync-token').value.trim();
        this.config.branch = document.getElementById('sync-branch').value.trim() || 'main';

        const userName = document.getElementById('sync-username').value.trim();
        if (userName) {
            localStorage.setItem('householdTracker_userName', userName);
        }

        this.saveConfig();
        this.closeConfigModal();
        this.updateSyncUI();

        if (this.isConfigured()) {
            this.sync();
        }
    }

    updateSyncUI() {
        const syncBtn = document.getElementById('sync-btn');
        const syncStatus = document.getElementById('sync-status');
        if (syncBtn) {
            syncBtn.style.display = '';
        }
        if (syncStatus && this.lastSyncTime) {
            const ago = this.timeSince(new Date(this.lastSyncTime));
            syncStatus.textContent = `synced ${ago}`;
        }
    }

    timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        if (seconds < 60) return 'just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    }
}

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        50% { transform: scale(1.02); box-shadow: 0 8px 24px rgba(108, 92, 231, 0.3); }
    }
`;
document.head.appendChild(style);

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.tracker = new HouseholdTracker();
});
