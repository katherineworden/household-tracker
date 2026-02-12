// =========================================
// HOUSEHOLD MAINTENANCE - TASK DATABASE
// Comprehensive list of all recurring tasks
// =========================================

const DEFAULT_TASKS = [
    // =========================================
    // 🏠 DAILY ROUTINES (from Organization System)
    // =========================================

    {
        id: 'routine-001',
        name: '5-min evening reset (clear surfaces)',
        category: 'living',
        frequency: 'daily',
        duration: 5,
        location: 'whole-home',
        assignee: 'Either',
        supplies: '',
        notes: 'Clear kitchen table/counter, put dirty clothes in hamper, quick scan of living room. Move things to landing zone or homeless bin.',
        isDefault: true
    },
    {
        id: 'routine-002',
        name: 'Go through mail bin',
        category: 'admin',
        frequency: 'weekly',
        duration: 10,
        location: 'living',
        assignee: 'Either',
        supplies: '',
        notes: 'Toss junk immediately, file or act on real mail. Part of the weekly review.',
        isDefault: true
    },
    {
        id: 'routine-003',
        name: 'Review "homeless items" bin',
        category: 'admin',
        frequency: 'weekly',
        duration: 10,
        location: 'whole-home',
        assignee: 'Either',
        supplies: '',
        notes: 'Find permanent homes for items or discard. If something has been homeless for 2+ weeks, it probably needs to go.',
        isDefault: true
    },
    {
        id: 'routine-004',
        name: 'Review in-progress station',
        category: 'admin',
        frequency: 'weekly',
        duration: 5,
        location: 'living',
        assignee: 'Either',
        supplies: '',
        notes: 'Max 5-7 items allowed. Is each thing still in progress? If not, put it away or toss it.',
        isDefault: true
    },
    {
        id: 'routine-005',
        name: '20-min power tidy (both people, timer, music)',
        category: 'living',
        frequency: 'weekly',
        duration: 20,
        location: 'whole-home',
        assignee: 'Either',
        supplies: '',
        notes: 'Set a timer, put on music, both people tackle different rooms. Stop when timer goes off - "good enough" counts!',
        isDefault: true
    },

    // =========================================
    // 🍳 KITCHEN
    // =========================================

    // Daily Kitchen
    {
        id: 'kitchen-001',
        name: 'Wipe down counters',
        category: 'kitchen',
        frequency: 'daily',
        duration: 2,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Cleaning spray, cloth',
        notes: 'Quick wipe after cooking or before bed',
        isDefault: true
    },
    {
        id: 'kitchen-002',
        name: 'Wash dishes / run dishwasher',
        category: 'kitchen',
        frequency: 'daily',
        duration: 10,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Dish soap',
        notes: 'Don\'t let dishes pile up - smaller batches are easier',
        isDefault: true
    },
    {
        id: 'kitchen-003',
        name: 'Put away clean dishes',
        category: 'kitchen',
        frequency: 'daily',
        duration: 5,
        location: 'kitchen',
        assignee: 'Either',
        supplies: '',
        notes: 'Pair with morning coffee routine',
        isDefault: true
    },
    {
        id: 'kitchen-004',
        name: 'Take out kitchen trash',
        category: 'kitchen',
        frequency: 'daily',
        duration: 2,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Trash bags',
        notes: '',
        isDefault: true
    },
    {
        id: 'kitchen-005',
        name: 'Wipe stovetop',
        category: 'kitchen',
        frequency: 'daily',
        duration: 2,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Cleaning spray, cloth',
        notes: 'Easier to clean when still slightly warm',
        isDefault: true
    },

    // Weekly Kitchen
    {
        id: 'kitchen-010',
        name: 'Clean microwave inside',
        category: 'kitchen',
        frequency: 'weekly',
        duration: 5,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Microwave-safe bowl, vinegar or lemon',
        notes: 'Steam with water + vinegar for 3 min, then wipe',
        isDefault: true
    },
    {
        id: 'kitchen-011',
        name: 'Wipe down cabinet fronts',
        category: 'kitchen',
        frequency: 'weekly',
        duration: 10,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Cleaning spray, cloth',
        notes: 'Focus on handles and areas near stove',
        isDefault: true
    },
    {
        id: 'kitchen-012',
        name: 'Clean sink thoroughly',
        category: 'kitchen',
        frequency: 'weekly',
        duration: 5,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Baking soda, scrub brush',
        notes: 'Don\'t forget the drain and faucet',
        isDefault: true
    },
    {
        id: 'kitchen-013',
        name: 'Wipe down small appliances',
        category: 'kitchen',
        frequency: 'weekly',
        duration: 10,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Damp cloth',
        notes: 'Toaster, coffee maker exterior, kettle, etc.',
        isDefault: true
    },
    {
        id: 'kitchen-014',
        name: 'Clean coffee maker',
        category: 'kitchen',
        frequency: 'weekly',
        duration: 5,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Dish soap',
        notes: 'Wash carafe, filter basket, wipe exterior',
        isDefault: true
    },
    {
        id: 'kitchen-015',
        name: 'Mop kitchen floor',
        category: 'kitchen',
        frequency: 'weekly',
        duration: 10,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Mop, floor cleaner',
        notes: 'Sweep first',
        isDefault: true
    },
    {
        id: 'kitchen-016',
        name: 'Clean trash can',
        category: 'kitchen',
        frequency: 'weekly',
        duration: 5,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Disinfectant spray',
        notes: 'Spray inside and outside, wipe down',
        isDefault: true
    },
    {
        id: 'kitchen-017',
        name: 'Wipe fridge exterior and handles',
        category: 'kitchen',
        frequency: 'weekly',
        duration: 5,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Cleaning spray, cloth',
        notes: '',
        isDefault: true
    },

    // Biweekly Kitchen
    {
        id: 'kitchen-020',
        name: 'Clean inside of fridge',
        category: 'kitchen',
        frequency: 'biweekly',
        duration: 20,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Cleaning spray, cloth',
        notes: 'Check expiration dates, wipe shelves and drawers',
        isDefault: true
    },
    {
        id: 'kitchen-021',
        name: 'Deep clean coffee maker (descale)',
        category: 'kitchen',
        frequency: 'biweekly',
        duration: 30,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'White vinegar or descaling solution',
        notes: 'Run vinegar through, then 2-3 water cycles',
        isDefault: true
    },

    // Monthly Kitchen
    {
        id: 'kitchen-030',
        name: 'Clean oven interior',
        category: 'kitchen',
        frequency: 'monthly',
        duration: 30,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Oven cleaner or baking soda paste',
        notes: 'Or run self-clean cycle if available',
        isDefault: true
    },
    {
        id: 'kitchen-031',
        name: 'Clean dishwasher filter and interior',
        category: 'kitchen',
        frequency: 'monthly',
        duration: 15,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Dish soap, toothbrush',
        notes: 'Remove filter, clean debris, wipe door seals',
        isDefault: true
    },
    {
        id: 'kitchen-032',
        name: 'Deep clean range hood/exhaust fan',
        category: 'kitchen',
        frequency: 'monthly',
        duration: 15,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Degreaser, cloth',
        notes: 'Remove and soak filters if possible',
        isDefault: true
    },
    {
        id: 'kitchen-033',
        name: 'Organize pantry / check expirations',
        category: 'kitchen',
        frequency: 'monthly',
        duration: 20,
        location: 'kitchen',
        assignee: 'Either',
        supplies: '',
        notes: 'Toss expired items, reorganize',
        isDefault: true
    },
    {
        id: 'kitchen-034',
        name: 'Clean behind/under small appliances',
        category: 'kitchen',
        frequency: 'monthly',
        duration: 15,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Cloth, vacuum with attachment',
        notes: 'Move toaster, coffee maker, etc.',
        isDefault: true
    },
    {
        id: 'kitchen-035',
        name: 'Sanitize sponges and dish brushes',
        category: 'kitchen',
        frequency: 'weekly',
        duration: 2,
        location: 'kitchen',
        assignee: 'Either',
        supplies: '',
        notes: 'Microwave damp sponge 2 min or run through dishwasher',
        isDefault: true
    },
    {
        id: 'kitchen-036',
        name: 'Replace kitchen sponge',
        category: 'kitchen',
        frequency: 'biweekly',
        duration: 1,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'New sponge',
        notes: 'Sponges harbor bacteria - replace often',
        isDefault: true
    },

    // Quarterly Kitchen
    {
        id: 'kitchen-040',
        name: 'Deep clean freezer',
        category: 'kitchen',
        frequency: 'quarterly',
        duration: 30,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Cooler for food, cleaning spray',
        notes: 'Defrost if needed, toss old items',
        isDefault: true
    },
    {
        id: 'kitchen-041',
        name: 'Clean refrigerator coils',
        category: 'kitchen',
        frequency: 'biannual',
        duration: 15,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Vacuum with brush attachment',
        notes: 'Usually on back or bottom of fridge',
        isDefault: true
    },

    // =========================================
    // 🚿 BATHROOM
    // =========================================

    // Daily Bathroom
    {
        id: 'bath-001',
        name: 'Wipe bathroom counter',
        category: 'bathroom',
        frequency: 'daily',
        duration: 2,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Cloth or wipe',
        notes: 'Quick wipe to prevent buildup',
        isDefault: true
    },
    {
        id: 'bath-002',
        name: 'Squeegee shower door/walls',
        category: 'bathroom',
        frequency: 'daily',
        duration: 1,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Squeegee',
        notes: 'Do it right after showering - prevents soap scum',
        isDefault: true
    },

    // Weekly Bathroom
    {
        id: 'bath-010',
        name: 'Clean toilet (bowl, seat, exterior)',
        category: 'bathroom',
        frequency: 'weekly',
        duration: 10,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Toilet brush, toilet cleaner, disinfectant',
        notes: 'Don\'t forget base and behind toilet',
        isDefault: true
    },
    {
        id: 'bath-011',
        name: 'Clean shower/tub',
        category: 'bathroom',
        frequency: 'weekly',
        duration: 15,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Bathroom cleaner, scrub brush',
        notes: 'Spray, let sit 5 min, scrub, rinse',
        isDefault: true
    },
    {
        id: 'bath-012',
        name: 'Clean bathroom sink',
        category: 'bathroom',
        frequency: 'weekly',
        duration: 5,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Bathroom cleaner, cloth',
        notes: 'Include faucet and handles',
        isDefault: true
    },
    {
        id: 'bath-013',
        name: 'Clean bathroom mirror',
        category: 'bathroom',
        frequency: 'weekly',
        duration: 3,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Glass cleaner, microfiber cloth',
        notes: '',
        isDefault: true
    },
    {
        id: 'bath-014',
        name: 'Mop bathroom floor',
        category: 'bathroom',
        frequency: 'weekly',
        duration: 10,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Mop, floor cleaner',
        notes: 'Get corners and around toilet base',
        isDefault: true
    },
    {
        id: 'bath-015',
        name: 'Wash bathroom hand towels',
        category: 'bathroom',
        frequency: 'weekly',
        duration: 5,
        location: 'bathroom',
        assignee: 'Either',
        supplies: '',
        notes: 'Replace with fresh towels',
        isDefault: true
    },
    {
        id: 'bath-016',
        name: 'Empty bathroom trash',
        category: 'bathroom',
        frequency: 'weekly',
        duration: 2,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Trash bags',
        notes: '',
        isDefault: true
    },
    {
        id: 'bath-017',
        name: 'Wipe light switches and door handles',
        category: 'bathroom',
        frequency: 'weekly',
        duration: 2,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Disinfectant wipe',
        notes: 'High-touch surfaces',
        isDefault: true
    },

    // Monthly Bathroom
    {
        id: 'bath-020',
        name: 'Deep clean shower grout',
        category: 'bathroom',
        frequency: 'monthly',
        duration: 20,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Grout cleaner or baking soda paste, brush',
        notes: 'Apply, let sit, scrub with old toothbrush',
        isDefault: true
    },
    {
        id: 'bath-021',
        name: 'Clean showerhead (remove mineral buildup)',
        category: 'bathroom',
        frequency: 'monthly',
        duration: 5,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Vinegar, plastic bag, rubber band',
        notes: 'Soak in vinegar overnight',
        isDefault: true
    },
    {
        id: 'bath-022',
        name: 'Clean bathroom exhaust fan',
        category: 'bathroom',
        frequency: 'monthly',
        duration: 10,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Vacuum, damp cloth',
        notes: 'Remove cover, vacuum dust, wipe down',
        isDefault: true
    },
    {
        id: 'bath-023',
        name: 'Wash shower curtain/liner',
        category: 'bathroom',
        frequency: 'monthly',
        duration: 5,
        location: 'bathroom',
        assignee: 'Either',
        supplies: '',
        notes: 'Machine wash on gentle or replace',
        isDefault: true
    },
    {
        id: 'bath-024',
        name: 'Clean under bathroom sink cabinet',
        category: 'bathroom',
        frequency: 'monthly',
        duration: 10,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Cleaning spray, cloth',
        notes: 'Remove items, wipe, organize, check for leaks',
        isDefault: true
    },
    {
        id: 'bath-025',
        name: 'Wash bath mats',
        category: 'bathroom',
        frequency: 'biweekly',
        duration: 5,
        location: 'bathroom',
        assignee: 'Either',
        supplies: '',
        notes: 'Machine wash and dry',
        isDefault: true
    },
    {
        id: 'bath-026',
        name: 'Clean toilet brush and holder',
        category: 'bathroom',
        frequency: 'monthly',
        duration: 5,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Bleach or disinfectant',
        notes: 'Soak in bleach water, rinse well',
        isDefault: true
    },

    // Quarterly Bathroom
    {
        id: 'bath-030',
        name: 'Deep clean bathroom tile and baseboards',
        category: 'bathroom',
        frequency: 'quarterly',
        duration: 30,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Tile cleaner, scrub brush',
        notes: 'All grout lines, corners, baseboards',
        isDefault: true
    },
    {
        id: 'bath-031',
        name: 'Clean bathroom light fixtures',
        category: 'bathroom',
        frequency: 'quarterly',
        duration: 10,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Glass cleaner, cloth',
        notes: 'Turn off, remove covers if possible, clean',
        isDefault: true
    },
    {
        id: 'bath-032',
        name: 'Check and clean drain stoppers',
        category: 'bathroom',
        frequency: 'monthly',
        duration: 10,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Drain cleaner or enzyme cleaner',
        notes: 'Remove hair and buildup',
        isDefault: true
    },

    // =========================================
    // 🛏️ BEDROOM
    // =========================================

    // Daily Bedroom
    {
        id: 'bed-001',
        name: 'Make bed',
        category: 'bedroom',
        frequency: 'daily',
        duration: 2,
        location: 'bedroom',
        assignee: 'Either',
        supplies: '',
        notes: 'Even just pulling up the blanket counts!',
        isDefault: true
    },
    {
        id: 'bed-002',
        name: 'Put dirty clothes in hamper',
        category: 'bedroom',
        frequency: 'daily',
        duration: 1,
        location: 'bedroom',
        assignee: 'Either',
        supplies: '',
        notes: 'Floor check before bed',
        isDefault: true
    },

    // Weekly Bedroom
    {
        id: 'bed-010',
        name: 'Change bed sheets',
        category: 'bedroom',
        frequency: 'weekly',
        duration: 10,
        location: 'bedroom',
        assignee: 'Either',
        supplies: 'Clean sheets',
        notes: 'Strip, replace, put dirty in laundry',
        isDefault: true
    },
    {
        id: 'bed-011',
        name: 'Dust bedroom surfaces',
        category: 'bedroom',
        frequency: 'weekly',
        duration: 10,
        location: 'bedroom',
        assignee: 'Either',
        supplies: 'Microfiber cloth or duster',
        notes: 'Nightstands, dresser, shelves',
        isDefault: true
    },
    {
        id: 'bed-012',
        name: 'Vacuum bedroom floor',
        category: 'bedroom',
        frequency: 'weekly',
        duration: 10,
        location: 'bedroom',
        assignee: 'Either',
        supplies: 'Vacuum',
        notes: 'Under bed too if possible',
        isDefault: true
    },

    // Monthly Bedroom
    {
        id: 'bed-020',
        name: 'Wash pillows',
        category: 'bedroom',
        frequency: 'quarterly',
        duration: 10,
        location: 'bedroom',
        assignee: 'Either',
        supplies: '',
        notes: 'Check care label - most are machine washable',
        isDefault: true
    },
    {
        id: 'bed-021',
        name: 'Flip/rotate mattress',
        category: 'bedroom',
        frequency: 'quarterly',
        duration: 5,
        location: 'bedroom',
        assignee: 'Either',
        supplies: '',
        notes: 'Extends mattress life, rotate head to foot',
        isDefault: true
    },
    {
        id: 'bed-022',
        name: 'Vacuum mattress',
        category: 'bedroom',
        frequency: 'monthly',
        duration: 10,
        location: 'bedroom',
        assignee: 'Either',
        supplies: 'Vacuum with upholstery attachment',
        notes: 'Removes dust mites and dead skin cells',
        isDefault: true
    },
    {
        id: 'bed-023',
        name: 'Wash duvet/comforter',
        category: 'bedroom',
        frequency: 'monthly',
        duration: 15,
        location: 'bedroom',
        assignee: 'Either',
        supplies: '',
        notes: 'May need laundromat for larger items',
        isDefault: true
    },
    {
        id: 'bed-024',
        name: 'Clean under bed',
        category: 'bedroom',
        frequency: 'monthly',
        duration: 10,
        location: 'bedroom',
        assignee: 'Either',
        supplies: 'Vacuum, duster',
        notes: 'Dust bunnies accumulate fast',
        isDefault: true
    },
    {
        id: 'bed-025',
        name: 'Organize closet',
        category: 'bedroom',
        frequency: 'monthly',
        duration: 30,
        location: 'bedroom',
        assignee: 'Either',
        supplies: '',
        notes: 'Quick tidy, rehang fallen items, organize bins',
        isDefault: true
    },
    {
        id: 'bed-026',
        name: 'Dust ceiling fan and light fixtures',
        category: 'bedroom',
        frequency: 'monthly',
        duration: 10,
        location: 'bedroom',
        assignee: 'Either',
        supplies: 'Duster or pillowcase method',
        notes: 'Use old pillowcase on fan blades to catch dust',
        isDefault: true
    },

    // =========================================
    // 🛋️ LIVING AREAS
    // =========================================

    // Daily Living
    {
        id: 'living-001',
        name: 'Quick tidy - return items to place',
        category: 'living',
        frequency: 'daily',
        duration: 5,
        location: 'living',
        assignee: 'Either',
        supplies: '',
        notes: 'Evening 5-minute reset',
        isDefault: true
    },
    {
        id: 'living-002',
        name: 'Fluff and arrange couch pillows',
        category: 'living',
        frequency: 'daily',
        duration: 1,
        location: 'living',
        assignee: 'Either',
        supplies: '',
        notes: 'Takes 30 seconds, makes room look tidy',
        isDefault: true
    },

    // Weekly Living
    {
        id: 'living-010',
        name: 'Dust all surfaces',
        category: 'living',
        frequency: 'weekly',
        duration: 15,
        location: 'living',
        assignee: 'Either',
        supplies: 'Microfiber cloth or duster',
        notes: 'Coffee table, shelves, TV stand, decor',
        isDefault: true
    },
    {
        id: 'living-011',
        name: 'Vacuum living room floor',
        category: 'living',
        frequency: 'weekly',
        duration: 10,
        location: 'living',
        assignee: 'Either',
        supplies: 'Vacuum',
        notes: 'Include under couch edges',
        isDefault: true
    },
    {
        id: 'living-012',
        name: 'Wipe down TV screen',
        category: 'living',
        frequency: 'weekly',
        duration: 2,
        location: 'living',
        assignee: 'Either',
        supplies: 'Microfiber cloth (dry or screen cleaner)',
        notes: 'Never spray directly on screen',
        isDefault: true
    },
    {
        id: 'living-013',
        name: 'Clean remotes and controllers',
        category: 'living',
        frequency: 'weekly',
        duration: 5,
        location: 'living',
        assignee: 'Either',
        supplies: 'Disinfectant wipes',
        notes: 'These are super germy',
        isDefault: true
    },
    {
        id: 'living-014',
        name: 'Tidy books and magazines',
        category: 'living',
        frequency: 'weekly',
        duration: 5,
        location: 'living',
        assignee: 'Either',
        supplies: '',
        notes: 'Stack neatly, recycle old magazines',
        isDefault: true
    },

    // Monthly Living
    {
        id: 'living-020',
        name: 'Vacuum couch cushions and crevices',
        category: 'living',
        frequency: 'monthly',
        duration: 15,
        location: 'living',
        assignee: 'Either',
        supplies: 'Vacuum with upholstery attachment',
        notes: 'Remove cushions, vacuum all surfaces',
        isDefault: true
    },
    {
        id: 'living-021',
        name: 'Dust electronics (TV back, cable box, etc.)',
        category: 'living',
        frequency: 'monthly',
        duration: 15,
        location: 'living',
        assignee: 'Either',
        supplies: 'Microfiber cloth, compressed air',
        notes: 'Unplug first, dust vents and ports',
        isDefault: true
    },
    {
        id: 'living-022',
        name: 'Clean light switches and door handles',
        category: 'living',
        frequency: 'weekly',
        duration: 5,
        location: 'whole-home',
        assignee: 'Either',
        supplies: 'Disinfectant wipes',
        notes: 'High-touch surfaces throughout home',
        isDefault: true
    },
    {
        id: 'living-023',
        name: 'Dust blinds/curtains',
        category: 'living',
        frequency: 'monthly',
        duration: 15,
        location: 'living',
        assignee: 'Either',
        supplies: 'Duster or vacuum attachment',
        notes: '',
        isDefault: true
    },
    {
        id: 'living-024',
        name: 'Dust baseboards',
        category: 'living',
        frequency: 'monthly',
        duration: 15,
        location: 'whole-home',
        assignee: 'Either',
        supplies: 'Damp cloth or duster',
        notes: 'Work around the room',
        isDefault: true
    },
    {
        id: 'living-025',
        name: 'Clean windows (interior)',
        category: 'living',
        frequency: 'monthly',
        duration: 20,
        location: 'whole-home',
        assignee: 'Either',
        supplies: 'Glass cleaner, microfiber cloth',
        notes: '',
        isDefault: true
    },
    {
        id: 'living-026',
        name: 'Wash throw blankets',
        category: 'living',
        frequency: 'monthly',
        duration: 5,
        location: 'living',
        assignee: 'Either',
        supplies: '',
        notes: 'Machine wash per care label',
        isDefault: true
    },
    {
        id: 'living-027',
        name: 'Clean picture frames and mirrors',
        category: 'living',
        frequency: 'monthly',
        duration: 10,
        location: 'whole-home',
        assignee: 'Either',
        supplies: 'Glass cleaner, cloth',
        notes: '',
        isDefault: true
    },

    // Quarterly Living
    {
        id: 'living-030',
        name: 'Deep clean couch/upholstery',
        category: 'living',
        frequency: 'quarterly',
        duration: 30,
        location: 'living',
        assignee: 'Either',
        supplies: 'Upholstery cleaner, brush',
        notes: 'Spot clean stains, freshen fabric',
        isDefault: true
    },
    {
        id: 'living-031',
        name: 'Clean ceiling fans',
        category: 'living',
        frequency: 'quarterly',
        duration: 10,
        location: 'whole-home',
        assignee: 'Either',
        supplies: 'Duster or pillowcase',
        notes: 'Use pillowcase to catch dust from blades',
        isDefault: true
    },
    {
        id: 'living-032',
        name: 'Move furniture and vacuum underneath',
        category: 'living',
        frequency: 'quarterly',
        duration: 30,
        location: 'whole-home',
        assignee: 'Either',
        supplies: 'Vacuum',
        notes: 'The dust bunnies hiding there...',
        isDefault: true
    },

    // =========================================
    // 👕 LAUNDRY
    // =========================================

    // Weekly Laundry
    {
        id: 'laundry-001',
        name: 'Do regular laundry (clothes)',
        category: 'laundry',
        frequency: 'weekly',
        duration: 15,
        location: 'laundry',
        assignee: 'Either',
        supplies: 'Detergent',
        notes: 'Wash, dry, put in bins (no folding required!)',
        isDefault: true
    },
    {
        id: 'laundry-002',
        name: 'Wash towels',
        category: 'laundry',
        frequency: 'weekly',
        duration: 10,
        location: 'laundry',
        assignee: 'Either',
        supplies: 'Detergent',
        notes: 'Hot water, no fabric softener',
        isDefault: true
    },
    {
        id: 'laundry-003',
        name: 'Wash sports bras / workout clothes',
        category: 'laundry',
        frequency: 'weekly',
        duration: 10,
        location: 'laundry',
        assignee: 'Katherine',
        supplies: 'Sports detergent or regular',
        notes: 'Cold water, hang or low heat dry to preserve elasticity',
        isDefault: true
    },
    {
        id: 'laundry-004',
        name: 'Clean out dryer lint trap',
        category: 'laundry',
        frequency: 'weekly',
        duration: 1,
        location: 'laundry',
        assignee: 'Either',
        supplies: '',
        notes: 'Do every load - fire safety!',
        isDefault: true
    },

    // Monthly Laundry
    {
        id: 'laundry-010',
        name: 'Wash delicates',
        category: 'laundry',
        frequency: 'monthly',
        duration: 15,
        location: 'laundry',
        assignee: 'Either',
        supplies: 'Delicate detergent, mesh bags',
        notes: 'Hand wash or gentle cycle in bags',
        isDefault: true
    },
    {
        id: 'laundry-011',
        name: 'Clean washing machine',
        category: 'laundry',
        frequency: 'monthly',
        duration: 10,
        location: 'laundry',
        assignee: 'Either',
        supplies: 'Washing machine cleaner or vinegar + baking soda',
        notes: 'Run empty hot cycle with cleaner, wipe gaskets',
        isDefault: true
    },
    {
        id: 'laundry-012',
        name: 'Deep clean dryer lint trap and vent',
        category: 'laundry',
        frequency: 'monthly',
        duration: 15,
        location: 'laundry',
        assignee: 'Either',
        supplies: 'Vacuum with attachment, dryer vent brush',
        notes: 'Prevents fires and improves efficiency',
        isDefault: true
    },
    {
        id: 'laundry-013',
        name: 'Wipe down washer/dryer exteriors',
        category: 'laundry',
        frequency: 'monthly',
        duration: 5,
        location: 'laundry',
        assignee: 'Either',
        supplies: 'Cleaning spray, cloth',
        notes: '',
        isDefault: true
    },

    // =========================================
    // 🐕 ARTHUR (Dog Care)
    // =========================================

    // Daily Arthur
    {
        id: 'arthur-001',
        name: 'Feed Arthur (morning)',
        category: 'arthur',
        frequency: 'daily',
        duration: 5,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Dog food',
        notes: '',
        isDefault: true
    },
    {
        id: 'arthur-002',
        name: 'Feed Arthur (evening)',
        category: 'arthur',
        frequency: 'daily',
        duration: 5,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Dog food',
        notes: '',
        isDefault: true
    },
    {
        id: 'arthur-003',
        name: 'Refill water bowl',
        category: 'arthur',
        frequency: 'daily',
        duration: 2,
        location: 'kitchen',
        assignee: 'Either',
        supplies: '',
        notes: 'Fresh water daily',
        isDefault: true
    },
    {
        id: 'arthur-004',
        name: 'Walk Arthur',
        category: 'arthur',
        frequency: 'daily',
        duration: 30,
        location: 'outdoor',
        assignee: 'Either',
        supplies: 'Leash, poop bags',
        notes: '',
        isDefault: true
    },

    // Weekly Arthur
    {
        id: 'arthur-010',
        name: 'Wash food and water bowls',
        category: 'arthur',
        frequency: 'weekly',
        duration: 5,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Dish soap',
        notes: 'Prevents bacteria buildup',
        isDefault: true
    },
    {
        id: 'arthur-011',
        name: 'Brush Arthur',
        category: 'arthur',
        frequency: 'weekly',
        duration: 15,
        location: 'living',
        assignee: 'Either',
        supplies: 'Dog brush',
        notes: 'Reduces shedding, good bonding time',
        isDefault: true
    },
    {
        id: 'arthur-012',
        name: 'Quick toy sanitizing (wipe down)',
        category: 'arthur',
        frequency: 'weekly',
        duration: 10,
        location: 'living',
        assignee: 'Either',
        supplies: 'Pet-safe disinfectant wipes',
        notes: 'Rubber and plastic toys',
        isDefault: true
    },

    // Monthly Arthur
    {
        id: 'arthur-020',
        name: 'Deep clean/wash dog toys',
        category: 'arthur',
        frequency: 'monthly',
        duration: 15,
        location: 'laundry',
        assignee: 'Either',
        supplies: 'Pet-safe soap',
        notes: 'Soft toys in washer, hard toys hand wash',
        isDefault: true
    },
    {
        id: 'arthur-021',
        name: 'Wash Arthur\'s bedding',
        category: 'arthur',
        frequency: 'biweekly',
        duration: 10,
        location: 'laundry',
        assignee: 'Either',
        supplies: 'Pet-safe detergent',
        notes: 'Hot water to kill bacteria and odors',
        isDefault: true
    },
    {
        id: 'arthur-022',
        name: 'Clean grooming tools (brushes, combs)',
        category: 'arthur',
        frequency: 'monthly',
        duration: 10,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Soap, warm water',
        notes: 'Remove hair, soak, dry thoroughly',
        isDefault: true
    },
    {
        id: 'arthur-023',
        name: 'Trim Arthur\'s nails',
        category: 'arthur',
        frequency: 'monthly',
        duration: 15,
        location: 'living',
        assignee: 'Either',
        supplies: 'Dog nail clippers or grinder',
        notes: 'Or schedule groomer appointment',
        isDefault: true
    },
    {
        id: 'arthur-024',
        name: 'Bath Arthur',
        category: 'arthur',
        frequency: 'monthly',
        duration: 30,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Dog shampoo, towels',
        notes: 'Or schedule groomer',
        isDefault: true
    },
    {
        id: 'arthur-025',
        name: 'Check Arthur for fleas/ticks',
        category: 'arthur',
        frequency: 'weekly',
        duration: 5,
        location: 'living',
        assignee: 'Either',
        supplies: 'Flea comb',
        notes: 'Especially after outdoor time',
        isDefault: true
    },
    {
        id: 'arthur-026',
        name: 'Vacuum pet hair from furniture',
        category: 'arthur',
        frequency: 'weekly',
        duration: 10,
        location: 'living',
        assignee: 'Either',
        supplies: 'Vacuum with pet attachment or lint roller',
        notes: '',
        isDefault: true
    },

    // Quarterly Arthur
    {
        id: 'arthur-030',
        name: 'Replace worn dog toys',
        category: 'arthur',
        frequency: 'quarterly',
        duration: 5,
        location: 'personal',
        assignee: 'Either',
        supplies: '',
        notes: 'Check for damage, choking hazards',
        isDefault: true
    },
    {
        id: 'arthur-031',
        name: 'Wash leash and collar',
        category: 'arthur',
        frequency: 'monthly',
        duration: 10,
        location: 'laundry',
        assignee: 'Either',
        supplies: 'Pet-safe soap',
        notes: 'Hand wash or machine in mesh bag',
        isDefault: true
    },

    // =========================================
    // 💊 HEALTH & PERSONAL CARE
    // =========================================

    // Weekly Health
    {
        id: 'health-001',
        name: 'Change toothbrush heads',
        category: 'health',
        frequency: 'quarterly',
        duration: 2,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Replacement toothbrush heads',
        notes: 'Or every 3 months, whichever comes first',
        isDefault: true
    },
    {
        id: 'health-002',
        name: 'Clean electric toothbrush handle',
        category: 'health',
        frequency: 'weekly',
        duration: 2,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Damp cloth',
        notes: 'Wipe down handle, clean around head connection',
        isDefault: true
    },
    {
        id: 'health-003',
        name: 'Clean hairbrushes and combs',
        category: 'health',
        frequency: 'weekly',
        duration: 10,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Comb cleaner or scissors, shampoo',
        notes: 'Remove hair, soak in warm soapy water, dry',
        isDefault: true
    },
    {
        id: 'health-004',
        name: 'Sanitize phone',
        category: 'health',
        frequency: 'daily',
        duration: 1,
        location: 'personal',
        assignee: 'Either',
        supplies: 'Phone-safe wipes or microfiber cloth',
        notes: 'Phones are super germy - quick wipe daily',
        isDefault: true
    },

    // Biweekly Health
    {
        id: 'health-010',
        name: 'Deep clean water bottles',
        category: 'health',
        frequency: 'weekly',
        duration: 10,
        location: 'kitchen',
        assignee: 'Either',
        supplies: 'Bottle brush, dish soap or baking soda',
        notes: 'Don\'t forget the lid, straw, and any seals',
        isDefault: true
    },
    {
        id: 'health-011',
        name: 'Clean retainer/night guard',
        category: 'health',
        frequency: 'weekly',
        duration: 5,
        location: 'bathroom',
        assignee: 'Katherine',
        supplies: 'Retainer cleaner or gentle soap',
        notes: 'Soak and brush gently',
        isDefault: true
    },

    // Monthly Health
    {
        id: 'health-020',
        name: 'Refill weekly pill organizer / vitamins',
        category: 'health',
        frequency: 'weekly',
        duration: 5,
        location: 'personal',
        assignee: 'Either',
        supplies: '',
        notes: 'Sunday night ritual',
        isDefault: true
    },
    {
        id: 'health-021',
        name: 'Restock vitamins and supplements',
        category: 'health',
        frequency: 'monthly',
        duration: 5,
        location: 'personal',
        assignee: 'Either',
        supplies: '',
        notes: 'Check what\'s running low, order/buy more',
        isDefault: true
    },
    {
        id: 'health-022',
        name: 'Clean makeup brushes',
        category: 'health',
        frequency: 'weekly',
        duration: 15,
        location: 'bathroom',
        assignee: 'Katherine',
        supplies: 'Brush cleaner or gentle soap',
        notes: 'Prevents bacteria and breakouts',
        isDefault: true
    },
    {
        id: 'health-023',
        name: 'Check medicine cabinet for expired items',
        category: 'health',
        frequency: 'quarterly',
        duration: 10,
        location: 'bathroom',
        assignee: 'Either',
        supplies: '',
        notes: 'Eye drops, medications, first aid supplies',
        isDefault: true
    },
    {
        id: 'health-024',
        name: 'Clean glasses/sunglasses',
        category: 'health',
        frequency: 'weekly',
        duration: 2,
        location: 'personal',
        assignee: 'Either',
        supplies: 'Glasses cleaner, microfiber cloth',
        notes: '',
        isDefault: true
    },
    {
        id: 'health-025',
        name: 'Clean jewelry (rings, everyday pieces)',
        category: 'health',
        frequency: 'monthly',
        duration: 10,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Jewelry cleaner or dish soap, soft brush',
        notes: 'Warm soapy water, gentle scrub, dry well',
        isDefault: true
    },
    {
        id: 'health-026',
        name: 'Replace razor blade/cartridge',
        category: 'health',
        frequency: 'biweekly',
        duration: 1,
        location: 'bathroom',
        assignee: 'Either',
        supplies: 'Replacement blades',
        notes: 'Dull blades = irritation',
        isDefault: true
    },
    {
        id: 'health-027',
        name: 'Check sunscreen expiration',
        category: 'health',
        frequency: 'annual',
        duration: 5,
        location: 'personal',
        assignee: 'Either',
        supplies: '',
        notes: 'Spring is good time - replace before summer',
        isDefault: true
    },
    {
        id: 'health-028',
        name: 'Check eye drops expiration',
        category: 'health',
        frequency: 'monthly',
        duration: 2,
        location: 'bathroom',
        assignee: 'Either',
        supplies: '',
        notes: 'Eye drops expire relatively quickly once opened',
        isDefault: true
    },

    // =========================================
    // 🌿 OUTDOOR / BALCONY
    // =========================================

    // Weekly Outdoor
    {
        id: 'outdoor-001',
        name: 'Water plants',
        category: 'outdoor',
        frequency: 'weekly',
        duration: 10,
        location: 'outdoor',
        assignee: 'Either',
        supplies: 'Watering can',
        notes: 'Check soil moisture first',
        isDefault: true
    },
    {
        id: 'outdoor-002',
        name: 'Sweep balcony/patio',
        category: 'outdoor',
        frequency: 'weekly',
        duration: 10,
        location: 'outdoor',
        assignee: 'Either',
        supplies: 'Broom',
        notes: '',
        isDefault: true
    },

    // Monthly Outdoor
    {
        id: 'outdoor-010',
        name: 'Wipe down outdoor furniture',
        category: 'outdoor',
        frequency: 'monthly',
        duration: 15,
        location: 'outdoor',
        assignee: 'Either',
        supplies: 'All-purpose cleaner, cloth',
        notes: '',
        isDefault: true
    },
    {
        id: 'outdoor-011',
        name: 'Check plants for pests/disease',
        category: 'outdoor',
        frequency: 'monthly',
        duration: 10,
        location: 'outdoor',
        assignee: 'Either',
        supplies: '',
        notes: 'Look under leaves, check soil',
        isDefault: true
    },
    {
        id: 'outdoor-012',
        name: 'Clean outdoor light fixtures',
        category: 'outdoor',
        frequency: 'quarterly',
        duration: 10,
        location: 'outdoor',
        assignee: 'Either',
        supplies: 'Glass cleaner, cloth',
        notes: '',
        isDefault: true
    },

    // Seasonal Outdoor
    {
        id: 'outdoor-020',
        name: 'Deep clean balcony/patio floor',
        category: 'outdoor',
        frequency: 'quarterly',
        duration: 30,
        location: 'outdoor',
        assignee: 'Either',
        supplies: 'Hose or mop, cleaner',
        notes: '',
        isDefault: true
    },
    {
        id: 'outdoor-021',
        name: 'Clean exterior of windows',
        category: 'outdoor',
        frequency: 'quarterly',
        duration: 30,
        location: 'outdoor',
        assignee: 'Either',
        supplies: 'Glass cleaner, squeegee',
        notes: '',
        isDefault: true
    },

    // =========================================
    // 🔧 HOME MAINTENANCE
    // =========================================

    // Monthly Maintenance
    {
        id: 'maint-001',
        name: 'Replace HVAC filter',
        category: 'maintenance',
        frequency: 'monthly',
        duration: 5,
        location: 'whole-home',
        assignee: 'Either',
        supplies: 'Replacement filter',
        notes: 'Check size before buying',
        isDefault: true
    },
    {
        id: 'maint-002',
        name: 'Clean humidifier',
        category: 'maintenance',
        frequency: 'weekly',
        duration: 15,
        location: 'bedroom',
        assignee: 'Either',
        supplies: 'White vinegar',
        notes: 'Prevents mold and bacteria',
        isDefault: true
    },
    {
        id: 'maint-003',
        name: 'Check smoke/CO detector batteries',
        category: 'maintenance',
        frequency: 'biannual',
        duration: 5,
        location: 'whole-home',
        assignee: 'Either',
        supplies: 'Batteries (9V usually)',
        notes: 'Test button, replace batteries yearly',
        isDefault: true
    },
    {
        id: 'maint-004',
        name: 'Run water in unused drains',
        category: 'maintenance',
        frequency: 'monthly',
        duration: 2,
        location: 'whole-home',
        assignee: 'Either',
        supplies: '',
        notes: 'Prevents P-trap from drying out and letting sewer gas in',
        isDefault: true
    },
    {
        id: 'maint-005',
        name: 'Clean computer keyboard',
        category: 'maintenance',
        frequency: 'weekly',
        duration: 10,
        location: 'personal',
        assignee: 'Either',
        supplies: 'Compressed air, wipes',
        notes: 'Shake out crumbs, wipe keys',
        isDefault: true
    },
    {
        id: 'maint-006',
        name: 'Clean laptop/computer fans',
        category: 'maintenance',
        frequency: 'quarterly',
        duration: 15,
        location: 'personal',
        assignee: 'Either',
        supplies: 'Compressed air',
        notes: 'Keeps computer cool, prevents damage',
        isDefault: true
    },
    {
        id: 'maint-007',
        name: 'Test and reset GFCI outlets',
        category: 'maintenance',
        frequency: 'monthly',
        duration: 2,
        location: 'whole-home',
        assignee: 'Either',
        supplies: '',
        notes: 'Press test, then reset - usually in kitchen/bathroom',
        isDefault: true
    },

    // Quarterly Maintenance
    {
        id: 'maint-010',
        name: 'Deep clean dehumidifier/air purifier filters',
        category: 'maintenance',
        frequency: 'quarterly',
        duration: 15,
        location: 'whole-home',
        assignee: 'Either',
        supplies: '',
        notes: 'Vacuum or wash per manufacturer instructions',
        isDefault: true
    },
    {
        id: 'maint-011',
        name: 'Check under sinks for leaks',
        category: 'maintenance',
        frequency: 'monthly',
        duration: 5,
        location: 'whole-home',
        assignee: 'Either',
        supplies: '',
        notes: 'Kitchen and bathroom - catch problems early',
        isDefault: true
    },

    // =========================================
    // 🍂 SEASONAL
    // =========================================

    {
        id: 'seasonal-001',
        name: 'Rotate seasonal clothes',
        category: 'seasonal',
        frequency: 'biannual',
        duration: 60,
        location: 'bedroom',
        assignee: 'Either',
        supplies: 'Storage bins',
        notes: 'Spring and fall - swap winter/summer clothes',
        isDefault: true
    },
    {
        id: 'seasonal-002',
        name: 'Deep clean entire home',
        category: 'seasonal',
        frequency: 'biannual',
        duration: 240,
        location: 'whole-home',
        assignee: 'Either',
        supplies: 'All cleaning supplies',
        notes: 'Spring and fall deep clean',
        isDefault: true
    },
    {
        id: 'seasonal-003',
        name: 'Wash winter coats/jackets',
        category: 'seasonal',
        frequency: 'annual',
        duration: 15,
        location: 'laundry',
        assignee: 'Either',
        supplies: '',
        notes: 'Before storing for summer',
        isDefault: true
    },
    {
        id: 'seasonal-004',
        name: 'Clean and store seasonal decor',
        category: 'seasonal',
        frequency: 'annual',
        duration: 30,
        location: 'whole-home',
        assignee: 'Either',
        supplies: 'Storage bins',
        notes: 'Holiday decorations, etc.',
        isDefault: true
    },

    // =========================================
    // 📋 ADMIN / SUPPLIES
    // =========================================

    // Weekly Admin
    {
        id: 'admin-001',
        name: 'Go through mail',
        category: 'admin',
        frequency: 'weekly',
        duration: 10,
        location: 'living',
        assignee: 'Either',
        supplies: '',
        notes: 'Recycle junk immediately, file or act on rest',
        isDefault: true
    },
    {
        id: 'admin-002',
        name: 'Take out recycling',
        category: 'admin',
        frequency: 'weekly',
        duration: 5,
        location: 'kitchen',
        assignee: 'Either',
        supplies: '',
        notes: '',
        isDefault: true
    },

    // Monthly Admin
    {
        id: 'admin-010',
        name: 'Inventory cleaning supplies',
        category: 'admin',
        frequency: 'monthly',
        duration: 10,
        location: 'whole-home',
        assignee: 'Either',
        supplies: '',
        notes: 'Check what\'s running low, add to shopping list',
        isDefault: true
    },
    {
        id: 'admin-011',
        name: 'Check household consumables stock',
        category: 'admin',
        frequency: 'monthly',
        duration: 10,
        location: 'whole-home',
        assignee: 'Either',
        supplies: '',
        notes: 'Toilet paper, paper towels, trash bags, etc.',
        isDefault: true
    },
    {
        id: 'admin-012',
        name: 'Check pet supply stock',
        category: 'admin',
        frequency: 'monthly',
        duration: 5,
        location: 'whole-home',
        assignee: 'Either',
        supplies: '',
        notes: 'Dog food, treats, poop bags, etc.',
        isDefault: true
    },

    // Annual Admin
    {
        id: 'admin-020',
        name: 'Review and restock vitamin/supplement supply',
        category: 'admin',
        frequency: 'annual',
        duration: 15,
        location: 'personal',
        assignee: 'Either',
        supplies: '',
        notes: 'Check expirations, reorder what\'s needed for the year',
        isDefault: true
    },
    {
        id: 'admin-021',
        name: 'Check sunscreen and summer supplies',
        category: 'admin',
        frequency: 'annual',
        duration: 10,
        location: 'personal',
        assignee: 'Either',
        supplies: '',
        notes: 'Before summer - check expirations, restock',
        isDefault: true
    },
    {
        id: 'admin-022',
        name: 'Audit first aid kit',
        category: 'admin',
        frequency: 'annual',
        duration: 15,
        location: 'bathroom',
        assignee: 'Either',
        supplies: '',
        notes: 'Check expirations, restock bandages and meds',
        isDefault: true
    }
];

// Category metadata for display
const CATEGORIES = {
    kitchen: { name: 'Kitchen', icon: '', color: '#a0674b' },
    bathroom: { name: 'Bathroom', icon: '', color: '#7b96a8' },
    bedroom: { name: 'Bedroom', icon: '', color: '#7c6f8a' },
    living: { name: 'Living Areas', icon: '', color: '#6b7c5e' },
    laundry: { name: 'Laundry', icon: '', color: '#7b96a8' },
    arthur: { name: 'Arthur', icon: '', color: '#c4953a' },
    health: { name: 'Health & Personal', icon: '', color: '#a0674b' },
    outdoor: { name: 'Outdoor/Balcony', icon: '', color: '#6b7c5e' },
    maintenance: { name: 'Home Maintenance', icon: '', color: '#8a8580' },
    seasonal: { name: 'Seasonal', icon: '', color: '#c4953a' },
    admin: { name: 'Admin/Supplies', icon: '', color: '#8a8580' }
};

// Frequency metadata
const FREQUENCIES = {
    daily: { name: 'Daily', days: 1 },
    weekly: { name: 'Weekly', days: 7 },
    biweekly: { name: 'Every 2 Weeks', days: 14 },
    monthly: { name: 'Monthly', days: 30 },
    quarterly: { name: 'Quarterly', days: 90 },
    biannual: { name: 'Twice a Year', days: 182 },
    annual: { name: 'Yearly', days: 365 }
};

// Location metadata for batch grouping
const LOCATIONS = {
    kitchen: { name: 'Kitchen', icon: '' },
    bathroom: { name: 'Bathroom', icon: '' },
    bedroom: { name: 'Bedroom', icon: '' },
    living: { name: 'Living Room', icon: '' },
    laundry: { name: 'Laundry Area', icon: '' },
    outdoor: { name: 'Outdoor/Balcony', icon: '' },
    'whole-home': { name: 'Whole Home', icon: '' },
    personal: { name: 'Personal', icon: '' }
};

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DEFAULT_TASKS, CATEGORIES, FREQUENCIES, LOCATIONS };
}
