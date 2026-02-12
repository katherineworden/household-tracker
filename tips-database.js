// =========================================
// ORGANIZATION SYSTEM - TIPS & GUIDES
// Executive Function Friendly Principles
// =========================================

const ORGANIZATION_TIPS = {
    // Core principles shown in the Systems tab
    coreRules: [
        { icon: '*', title: '1-2 steps max', description: 'To put something away. If it takes more steps, redesign the storage.' },
        { icon: '*', title: 'Visible storage', description: 'Open bins, clear fronts, labeled containers. Out of sight = out of mind.' },
        { icon: '*', title: '"Good enough" counts', description: 'Tossed in a bin beats folded on the floor. Done is better than perfect.' },
        { icon: '*', title: 'Landing zones', description: 'One designated spot for stuff to land near your entry. Contain the chaos.' }
    ],

    // Contextual tips that appear when viewing specific categories
    categoryTips: {
        kitchen: [
            'Store dishes where they get CLEAN, not where tradition says they go.',
            'The drying rack IS storage. That\'s okay.',
            'Empty dishwasher/rack first thing in morning — pair with coffee.',
            'Keep counters clear. Only permanent items: fruit bowl, paper towels, 1-2 appliances.',
            'Fewer dishes = smaller batches = less overwhelming. Consider 4 of each.',
            'Kitchen zones: near stove (pans, oils, spices), near sink (soap, rack, clean dishes), near coffee maker (mugs, filters).'
        ],
        bathroom: [
            'Daily use items stay visible on counter. Everything else in labeled bins under sink.',
            'Use hooks instead of towel bars — hooks are fewer steps.',
            'Small trash can for easy disposal.',
            'Check under sink monthly for leaks.'
        ],
        bedroom: [
            'Open bins in closet for clean laundry — no folding required!',
            'Keep a "worn once" bin or hook for clothes that aren\'t dirty yet.',
            'Empty hangers at the FRONT of closet = actually hanging things up.',
            'Hamper should be RIGHT where you undress, not across the room.',
            'If clothes end up on the floor, the bins are in the wrong place. Move them.',
            'Nightstand: only essentials — lamp, phone charger, maybe a book.'
        ],
        living: [
            'The 5-item rule: max 5 loose items on the coffee table at any time.',
            'Blanket basket — toss them in, don\'t fold.',
            'Designate a spot for remotes (small tray).',
            '"Current stuff" basket near where you sit — for books, chargers, etc.',
            'Minimal flat surfaces = minimal piles.'
        ],
        laundry: [
            'The new laundry routine: dryer → toss into labeled bins. Done. No folding required.',
            '3-5 open bins: tops, bottoms, underwear/socks, lounge/PJs, workout clothes.',
            'For hangable clothes: put hanger in shirt BEFORE bringing to closet.',
            'Smaller wardrobe = smaller loads = less overwhelming.'
        ],
        admin: [
            'Go through mail bin once a week — toss junk IMMEDIATELY.',
            'Have a "homeless items" bin for things without a spot. Review weekly.',
            '"In-progress" stations are allowed! Max 5-7 items. Review weekly.',
            'Landing zone near entry: tray for keys/wallet, bin for mail, hooks for bags.'
        ],
        arthur: [
            'Keep Arthur\'s supplies in one zone — food, treats, bags, leash all together.',
            'Bowl washing is easier if bowls stay near the sink.'
        ],
        health: [
            'Keep daily-use items visible and in reach.',
            'Group by routine: morning items together, evening items together.',
            'Pill organizer filled on the same day each week (pair with an existing habit).'
        ],
        maintenance: [
            'Set calendar reminders for filter replacements — don\'t rely on memory.',
            'Keep a small toolkit in ONE spot. Know where it is.'
        ],
        seasonal: [
            'Don\'t unpack into cabinets until you\'ve lived there 1-2 weeks.',
            'Notice where you naturally put things, THEN set up storage to match.',
            'Label all storage bins. Future you will thank present you.'
        ],
        outdoor: [
            'Keep outdoor supplies together near the door to outside.',
            'Watering is easier with a routine — pair it with morning coffee.'
        ]
    },

    // Problem-solution guides for the Systems tab
    problemGuides: [
        {
            id: 'clothes',
            icon: '',
            title: 'The Clothes Mountain',
            problem: 'Putting away laundry is secretly 6+ steps: carry, sort, fold, open drawer, place correctly, repeat. Your brain sees that and says "nope."',
            solution: [
                'Get 3-5 open bins (NO LIDS) — label them: tops, bottoms, underwear/socks, lounge/PJs, workout',
                'New routine: dryer → toss each item into its bin → done',
                'No folding required. Tossed in a bin = success.',
                'Keep 5-10 empty hangers at the front of your closet',
                'Have a "worn once" bin/hook for not-dirty clothes',
                'Put bins where clothes actually land, not where they "should" go',
                'If clothes keep ending up on the floor, the bins are in the wrong spot'
            ]
        },
        {
            id: 'dishes',
            icon: '',
            title: 'The Dish Situation',
            problem: 'Putting away dishes requires knowing where everything goes, opening multiple cabinets, and making micro-decisions. Too many steps.',
            solution: [
                'Consider having fewer dishes: 4 plates, 4 bowls, 4 cups, 4 sets of silverware',
                'Store dishes near where they get CLEAN (next to dishwasher/drying rack)',
                'The drying rack IS storage. Accept it. Get a nice big one.',
                'Empty the rack/dishwasher first thing with your morning coffee',
                'Open shelving or clear cabinet fronts help — seeing where things go = actually putting them there',
                'One person cooks, one handles dishes right after'
            ]
        },
        {
            id: 'piles',
            icon: '',
            title: 'Temporary Piles',
            problem: 'No designated spot = flat surfaces become the default. "I\'ll use it again soon" is often true, but the pile grows.',
            solution: [
                'Create ONE landing zone near your entry: tray for keys/wallet, bin for mail, hooks for bags',
                'Stuff can stay in the landing zone for 48 hours max, then it needs a real home',
                'Create 1-2 "in-progress" stations (basket/tray) for things you\'re actively using',
                'In-progress stations: max 5-7 items. Add one = remove one.',
                'Review in-progress stations weekly: is this still in progress?',
                'Daily 5-min reset every evening: move things off surfaces',
                'Have a "homeless items" bin for things without a spot yet',
                'Put something in the center of tables (plant, centerpiece) to reduce flat space'
            ]
        }
    ],

    // Room setup guides for new apartment
    roomSetup: [
        {
            room: 'Entryway',
            icon: '',
            purpose: 'Catch everything coming in, prevent it from spreading',
            items: ['Hooks by door (keys, bags, jackets) — hooks not hangers!', 'Small tray on surface (wallet, sunglasses, everyday items)', 'Bin or basket for mail', 'Shoe tray/mat'],
            rule: 'Things live here temporarily. 3+ days = needs a real home.'
        },
        {
            room: 'Kitchen',
            icon: '',
            purpose: 'Cooking easy, cleaning effortless',
            items: ['Near stove: pans, spatulas, oils, spices', 'Near sink: soap, sponge, rack, clean dish storage', 'Near coffee maker: mugs, coffee, filters, sugar', 'One junk drawer (allowed to exist!)'],
            rule: 'Only permanent items on counters. Everything else → landing zone.'
        },
        {
            room: 'Living Room',
            icon: '',
            purpose: 'Relaxation + containing daily life items',
            items: ['Blanket basket (toss, don\'t fold)', 'Remote tray', '"Current stuff" basket near seating', 'Minimal flat surfaces'],
            rule: 'Max 5 loose items on coffee table at any time.'
        },
        {
            room: 'Bedroom',
            icon: '',
            purpose: 'Sleep and getting dressed should be easy',
            items: ['Open bins in closet (tops, bottoms, etc.)', '"Worn once" bin or hook', 'Empty hangers at front of closet', 'Hamper where you undress'],
            rule: 'Nightstand: essentials only (lamp, charger, one book).'
        },
        {
            room: 'Bathroom',
            icon: '',
            purpose: 'Minimal decisions',
            items: ['Daily items visible on counter', 'Labeled bins under sink', 'Small trash can', 'Hook on door for towel (not a towel bar)'],
            rule: 'If it\'s daily-use, it stays out. Everything else goes under the sink.'
        },
        {
            room: 'Office/Desk',
            icon: '',
            purpose: 'Contain work chaos',
            items: ['Inbox tray for papers needing action', 'Outbox tray for papers to file', 'Pen cup', 'Cable management'],
            rule: 'Clear desk surface at end of each day or week.'
        }
    ],

    // Quick routines reference
    routines: {
        morning: {
            name: 'Morning Reset',
            time: '5 min',
            steps: [
                'Make bed (even just pulling up the blanket)',
                'Empty dish rack if full / start dishwasher'
            ]
        },
        evening: {
            name: 'Evening Reset',
            time: '5-10 min',
            steps: [
                'Clear kitchen table/counter → landing zone or homeless bin',
                'Dirty clothes → hamper',
                'Quick scan of living room → toss things in their bins'
            ]
        },
        weekly: {
            name: 'Weekly Review',
            time: '20 min',
            steps: [
                'Go through mail bin (toss junk, deal with real mail)',
                'Go through "homeless items" bin — find homes or discard',
                'Review "in-progress" station — still in progress?',
                '20-minute power tidy (timer, both people, music on)'
            ]
        }
    },

    // Golden rule for moving
    goldenRule: {
        title: 'The Golden Rule for Moving In',
        text: 'Don\'t unpack into cabinets/drawers until you\'ve lived there 1-2 weeks. Live out of boxes briefly. Notice where you naturally gravitate. THEN set up storage based on actual behavior, not where things "should" go.'
    }
};

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ORGANIZATION_TIPS };
}
