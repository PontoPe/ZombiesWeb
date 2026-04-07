// Extended guide data for individual map pages.
// Maps without an entry here will show placeholder sections.

export interface PartLocation {
  name: string;
  /** Path relative to /public, e.g. "/images/maps/kino/engine-cafeteria.jpg" */
  image?: string;
}

export interface PartSpawn {
  name: string;
  locations: PartLocation[];
}

export interface Buildable {
  name: string;
  description: string;
  parts: PartSpawn[];
}

export interface EEStep {
  num: number;
  title: string;
  desc: string;
  tip?: string;
  /** Path relative to /public */
  image?: string;
}

/** Arbitrary extra section — for map-specific content like shield builds, WW upgrades, etc. */
export interface GuideItem {
  title?: string;
  desc: string;
  image?: string;
  tip?: string;
}

export interface GuideSection {
  id: string;
  title: string;
  /** Sub-label shown above the title, e.g. "Field Manual — Weapons" */
  label?: string;
  items: GuideItem[];
}

export interface MapGuide {
  powerSteps?: string[];
  papLocation?: string;
  papSteps?: string[];
  buildables?: Buildable[];
  eeOverview?: string;
  eeSteps?: EEStep[];
  strategies?: string[];
  loreNote?: string;
  /** Extra sections rendered after Strategies — e.g. shield builds, WW upgrades, special mechanics */
  customSections?: GuideSection[];
}

export const MAP_GUIDES: Record<string, MapGuide> = {

  'kino-der-toten': {
    powerSteps: [
      'From spawn, open the corner door (500 pts) into the first hallway.',
      'Purchase the door to the dressing room corridor (1000 pts).',
      'The power switch is at the end of the dressing room hall — flip it to restore electricity to the theater.',
    ],
    papLocation: 'Projector Room — reached via the stage mainframe teleporter.',
    papSteps: [
      'Stand on the mainframe pad in the centre of the stage to activate it.',
      'Link Teleporter A (near spawn / lobby) by stepping on its pad and activating.',
      'Link Teleporter B (backstage / dressing room area) the same way.',
      'Link Teleporter C (upper balcony) the same way.',
      'Return to the mainframe pad and teleport — you arrive in the Projector Room.',
      'Pack-a-Punch is inside. You have roughly 30 seconds before being sent back.',
    ],
    eeOverview:
      'The Casimir Mechanism (2+ players): link all three teleporters, have both players step into separate teleporter pads simultaneously, then interact with the meteorite in the Projector Room.',
    eeSteps: [
      {
        num: 1,
        title: 'Link all three teleporters',
        desc: 'Activate and link Teleporters A, B, and C to the stage mainframe so the full network is online.',
      },
      {
        num: 2,
        title: 'Dual-pad timing',
        desc: 'With at least two players, stand on two teleporter pads and trigger them together during an active cycle.',
      },
      {
        num: 3,
        title: 'Meteor interaction',
        desc: 'In the Projector Room, interact with the meteorite to complete the Casimir Mechanism sequence.',
      },
    ],
    strategies: [
      'Run clockwise laps (stage → alley → lobby → stage) to build large, manageable trains.',
      'Use the stage teleporter as an emergency escape — it resets your position and breaks aggro.',
      'Nova Crawlers spawn after teleporter use and drop power-ups. Prioritise killing them.',
      'Save Thundergun shots for genuine emergencies — ammo is limited even with PaP.',
      'Avoid camping near windows; zombies vault significantly faster here than in earlier maps.',
      'Keep at least one player on the stage side at all times to maintain teleporter links.',
    ],
    loreNote:
      "Group 935 repurposed the theater for Nova-6 refinement after Der Riese was compromised. The Nova Crawlers are failed test subjects. The mainframe teleporter is derived from Der Riese technology — Richtofen had planned the crew's arrival here long before they ever stepped on that stage.",
    customSections: [
      {
        id: 'teleporter-and-traps',
        title: 'Teleporter and Trap Control',
        label: 'Field Manual — Systems',
        items: [
          {
            title: 'Mainframe as panic reset',
            desc: 'The stage mainframe teleporter is your most reliable emergency escape when the loop collapses.',
          },
          {
            title: 'Electric trap pacing',
            desc: 'Use trap activations to thin waves while preserving Thundergun ammo for hard clutches.',
          },
          {
            title: 'Nova crawler management',
            desc: 'Crawlers after teleports can drop power-ups. Clear them quickly so they do not break your route timing.',
          },
        ],
      },
      {
        id: 'wonder-weapon-notes',
        title: 'Thundergun Notes',
        label: 'Field Manual — Wonder Weapon',
        items: [
          {
            title: 'Role in late rounds',
            desc: 'Reserve Thundergun shots for blocked lanes, revive windows, and full-route recoveries only.',
          },
          {
            title: 'Best pairing',
            desc: 'Pair with high-ammo point weapon for economy rounds and swap to emergency mode only when needed.',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual — Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/kino-der-toten/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Stage teleporter loops and Thundergun economy define high-round reliability.',
            image: 'https://static.wikia.nocookie.net/callofduty/images/9/97/Kino_Der_Toten_Menu_Selection_BO.png/revision/latest?cb=20161009103534',
          },
        ],
      },
    ],
  },

  'mob-of-the-dead': {
    powerSteps: [
      'Mob of the Dead has no single global power switch; power is routed through Afterlife voltmeters.',
      'Enter Afterlife (via an Afterlife box or by being downed), then zap voltmeters to energize nearby systems.',
      'Use Afterlife-only wall tunnels to reach hidden switches for doors, gondola access, key drops, and utility circuits.',
      'Plan your route around limited Afterlife charges so progression steps do not stall mid-round.',
    ],
    papLocation: 'Golden Gate Bridge — at the far end, accessed by flying the plane.',
    papSteps: [
      'Acquire the Warden\'s Key by zapping the hidden key-drop voltmeter in Afterlife (spawns above Warden\'s Office or near the Cafeteria entrance).',
      'Use the key in the showers to start the Uniforms step: power the laundry switch in Afterlife, survive the incoming wave, then collect Uniforms.',
      'Use the key to open the Valves case in the Infirmary and collect them.',
      'Collect the Engine by overloading the Docks generators (one generator is only reachable in Afterlife).',
      'Collect the Rigging in Citadel Tunnels by inputting the shock code in the spiral stairwell; pick it up before the timer expires.',
      'Collect the Propane Tank in the Docks by opening the keyed gate and the Afterlife-powered gate behind it.',
      'Build/refuel the plane on the Roof, zap its power points in Afterlife, then fly to the Golden Gate Bridge to access Pack-a-Punch.',
    ],
    buildables: [
      {
        name: 'Icarus Plane Access Set',
        description:
          'These six quest items are needed to complete the Alcatraz setup path to the Roof plane and Golden Gate Bridge Pack-a-Punch.',
        parts: [
          {
            name: 'Warden\'s Key',
            locations: [
              { name: 'Drops from a key hook after an Afterlife zap (Warden\'s Office side or Cafeteria-side spawn).' },
            ],
          },
          {
            name: 'Uniforms',
            locations: [
              { name: 'Showers laundry section under Cafeteria, unlocked with the key and powered via Afterlife.' },
            ],
          },
          {
            name: 'Valves',
            locations: [
              { name: 'Infirmary glass case near the Cerberus head, opened with the key.' },
            ],
          },
          {
            name: 'Engine',
            locations: [
              { name: 'Behind the electrified Docks gate after overloading all three generators.' },
            ],
          },
          {
            name: 'Rigging',
            locations: [
              { name: 'Citadel spiral staircase lower room after entering the shock code in Afterlife.' },
            ],
          },
          {
            name: 'Propane Tank',
            locations: [
              { name: 'Docks, left of the M1927 Thompson, behind a key gate plus an Afterlife-zapped gate.' },
            ],
          },
        ],
      },
      {
        name: 'Shield',
        description:
          'Protects your back while stowed and can be used as a melee/distraction tool when equipped. The wiki notes it breaks after roughly 15 hits.',
        parts: [
          {
            name: 'Shield Cell Door',
            locations: [
              { name: 'Near Generator Room, rested on a wall.', image: '/images/parts/external-migrated/V6EK0sF.jpg' },
              { name: 'Citadel Tunnels, near the elevator on the bottom floor.', image: '/images/parts/external-migrated/nDBt7ug.jpg' },
              { name: 'Citadel Tunnels, leaning on one of the walls on the staircase.', image: '/images/parts/external-migrated/GfaT17o.jpg' },
            ],
          },
          {
            name: 'Clamp',
            locations: [
              { name: 'Generator Room, on the Shelf to the Left.', image: '/images/parts/external-migrated/CLIBMIo.jpg' },
              { name: 'Generator Room, on the Shelf to the Right.', image: '/images/parts/external-migrated/o9HeY0C.jpg' },
              { name: 'Generator Room, on the floor next to a generator.', image: '/images/parts/external-migrated/mt2dUIH.png' },
              { name: 'Generator Room, on a table.', image: '/images/parts/external-migrated/pIuMVRv.jpg' },
            ],
          },
          {
            name: 'Trolley',
            locations: [
              { name: 'Docks, beside the boxes nearest to the mystery box spawn and closer to the M1927 Thompson Wallbuy.', image: '/images/parts/external-migrated/heF40uh.jpg' },
              { name: 'Docks, beside the boxes nearest to the mystery box spawn and closer to the sniper tower.', image: '/images/parts/external-migrated/oM1ntRU.jpg' },
            ],
          },
        ],
      },
      {
        name: 'Acid Gat Kit',
        description:
          'Upgrade kit for the Blundergat. Build at a table, then interact while holding the Blundergat to convert it into the Acid Gat.',
        parts: [
          {
            name: 'Motor',
            locations: [
              { name: 'Warden\'s Office, near the Uzi wallbuy against a wall.', image: '/images/parts/external-migrated/N76UW0v.jpg' },
              { name: 'Warden\'s Office, left of the Mystery Box spawn.', image: '/images/parts/external-migrated/PG91RpP.jpg' },
              { name: 'Warden\'s Office, left of the fireplace.', image: '/images/parts/external-migrated/xHFCY8s.jpg' },
            ],
          },
          {
            name: 'Case',
            locations: [
              { name: 'Cell Block desk just outside spawn by a jail cell.', image: '/images/parts/external-migrated/BWuM5aT.jpg' },
              { name: 'Cell Block near the Afterlife box by Cafeteria.', image: '/images/parts/external-migrated/A5CMl19.jpg' },
              { name: 'Cell Block under stairs in the hallway toward Warden\'s Office/B23R.', image: '/images/parts/external-migrated/tD6MRPF.jpg' },
            ],
          },
          {
            name: 'Acid Bottle',
            locations: [
              { name: 'Infirmary table near a bloody bathtub.', image: '/images/parts/external-migrated/Xji8IFi.jpg' },
              { name: 'Infirmary floor corner in the room with two blood-filled bathtubs.', image: '/images/parts/external-migrated/kOd1TDZ.jpg' },
              { name: 'Infirmary hallway, on top of a trolley.', image: '/images/parts/external-migrated/bEClKm9.jpg' },
            ],
          },
        ],
      },
    ],
    eeOverview:
      '"Pop Goes the Weasel" (2-4 players only): complete core setup items, repeat the bridge cycle, enter inmate numbers in the Citadel panel, then resolve the final confrontation on the Golden Gate Bridge.',
    strategies: [
      'Spend early rounds opening routes tied to key progression checks (Warden\'s Key path, showers, Citadel, Docks generators).',
      'Prioritize Hell\'s Retriever and Blundergat access early; both feed into later objectives and survivability.',
      'Brutus can lock Mystery Box and perks for escalating fees each round, so clear him quickly and keep points in reserve.',
      'Use the gondola and trap network to rotate safely while handling tight corridors like Michigan and Citadel.',
      'Build the shield in the location you pass most often so replacements are low-risk and fast.',
      'When planning bridge trips, coordinate Afterlife timing so no one misses refuel or revive windows.',
    ],
    customSections: [
      {
        id: 'traps-and-transport',
        title: 'Traps and Transport',
        label: 'Field Manual — Systems',
        items: [
          {
            title: 'Sniper Tower',
            desc: 'Docks trap, 1000 points. Fires at nearby zombies and can be upgraded in Afterlife to launch RPG rounds.',
          },
          {
            title: 'Acid Trap',
            desc: 'Cafeteria trap, 1000 points. Instant-kills zombies in its spray lane but can damage players.',
          },
          {
            title: 'Fan Trap',
            desc: 'Warden\'s Office doorway trap, 1000 points. Must be activated via Afterlife and downs players instantly on contact.',
          },
          {
            title: 'Gondola',
            desc: 'Costs 750 points from Cell Block top floor to Docks. Requires prior Afterlife power activation.',
          },
        ],
      },
      {
        id: 'special-weapons',
        title: 'Special Weapons and Upgrades',
        label: 'Field Manual — Arsenal',
        items: [
          {
            title: 'Free Blundergat',
            desc: 'After acquiring Hell\'s Retriever, hit the five hidden skulls around Alcatraz, then collect the Blundergat in Warden\'s Office near Speed Cola.',
          },
          {
            title: 'Hell\'s Retriever',
            desc: 'Feed all three Cerberus heads (Broadway, Infirmary, Docks) and claim it in Citadel Tunnels at the dog-head altar.',
          },
          {
            title: 'Hell\'s Redeemer',
            desc: 'Wiki path: get Retriever kills, finish a bridge round with it, throw it into the Broadway lava pit, then claim the blue-aura upgrade in Afterlife at Citadel.',
          },
          {
            title: 'Silver Spoon to Golden Spork',
            desc: 'Use Retriever and Afterlife interactions near Warden/Cafeteria for Silver Spoon, then complete blood-bath and shower-kill requirements to claim Golden Spork.',
          },
        ],
      },
      {
        id: 'game-features',
        title: 'Game Features',
        label: 'Field Manual — Operations',
        items: [
          {
            title: 'Mystery Box spawns',
            desc: 'Warden\'s Office, Cafeteria, Docks, Infirmary, and Citadel Tunnels. Brutus can lock the box and force a paid unlock.',
          },
          {
            title: 'Perk locations',
            desc: 'Juggernog (Docks), Speed Cola (Warden\'s Office), Double Tap II (Citadel), Deadshot Daiquiri (Infirmary), Electric Cherry (Cell Block top floor).',
          },
          {
            title: 'Brutus machine locks',
            desc: 'Perks and box can be locked and require paid unlocks; costs escalate when repeatedly locked in the same round.',
          },
        ],
      },
      {
        id: 'main-easter-egg-notes',
        title: 'Main Easter Egg Notes',
        label: 'Field Manual — Quest Intel',
        items: [
          {
            title: 'Lobby requirement',
            desc: 'The wiki specifies 2-4 players only; the Main Easter Egg cannot be completed solo.',
          },
          {
            title: 'Panel code step',
            desc: 'After setup and repeated cycles, use Afterlife in the Citadel/Docks spiral panel and input inmate numbers: 101, 386, 872, 481.',
          },
          {
            title: 'Narration and finale',
            desc: 'Collect headphone narration prompts, then refuel/board in Afterlife and resolve the final Weasel-vs-crew ending on the bridge.',
          },
        ],
      },
    ],
    loreNote:
      "The four prisoners exist in a purgatorial loop with no natural end. Weasel has lived and died countless times, always betrayed by his crew. The question at the heart of the Easter Egg is whether redemption is possible when the loop itself is built on betrayal — and whether only one man can ever truly leave.",
  },

  'der-eisendrache': {
    powerSteps: [
      'The castle already has power from the start. No switch required.',
    ],
    papLocation: 'Main courtyard gate — unlocks permanently after feeding the dragon three times.',
    papSteps: [
      'Locate the dragon head mounted above the courtyard gate.',
      'Kill zombies in the courtyard near the dragon — their souls feed it.',
      'After three feedings the dragon breathes blue fire and Pack-a-Punch unlocks beneath it.',
    ],
    buildables: [
      {
        name: 'Rocket Shield',
        description:
          'Core survivability buildable in DE. Blocks frontal hits, gives back protection while stowed, and can burst through tight lanes with a rocket dash.',
        parts: [
          {
            name: 'Fuel Tank (Lower Courtyard set)',
            locations: [
              { name: 'Crates past the Castle Door trap', image: '/images/parts/external-migrated/UEWJrqN.png' },
              { name: 'Base of stairs leading to balconies', image: '/images/parts/external-migrated/AEaejf7.png' },
              { name: 'Stairs toward Bastion/Death Ray', image: '/images/parts/external-migrated/SoOFLe9.png' },
            ],
          },
          {
            name: 'Body Piece (Upper Courtyard set)',
            locations: [
              { name: 'Clock tower by table', image: '/images/parts/external-migrated/e5VK28e.png' },
              { name: 'Bottom of clocktower stairs', image: '/images/parts/external-migrated/Eb6FK7g.png' },
              { name: 'Wall in front of Church', image: '/images/parts/external-migrated/TVivX4A.png' },
            ],
          },
          {
            name: 'Top Piece (Undercroft anti-gravity set)',
            locations: [
              { name: 'Outside railing above pyramid', image: '/images/parts/external-migrated/zXcGge0.png' },
              { name: 'Wall above Undercroft PaP location', image: '/images/parts/external-migrated/oucvExh.png' },
              { name: 'Wall above teleporter-room entrance', image: '/images/parts/external-migrated/GiBfO6m.png' },
            ],
          },
        ],
      },
      {
        name: 'Ragnarok DG-4',
        description:
          'Specialist buildable required for late-main-quest progression and one of the safest panic tools in DE.',
        parts: [
          {
            name: 'Panzer Part',
            locations: [{ name: 'Guaranteed drop from a Panzersoldat kill.' }],
          },
          {
            name: 'Death Ray Part',
            locations: [{ name: 'Use Death Ray, then grab the floating blue piece using the matching Wundersphere route.' }],
          },
          {
            name: 'Rocket Test Part',
            locations: [{ name: 'During rocket test, pull tunnel lever, survive bunker lockdown, then collect teleporter-spawned part before despawn.' }],
          },
        ],
      },
      {
        name: 'Wrath of the Ancients',
        description:
          'The base wonder bow. Upgrade path branches into Void, Fire, Storm, and Wolf bows. At least one upgraded bow is needed for solo main quest progression.',
        parts: [
          {
            name: 'Dragon Feed 1',
            locations: [{ name: 'Lower Courtyard dragon statue', image: '/images/parts/external-migrated/nNr47LL.png' }],
          },
          {
            name: 'Dragon Feed 2',
            locations: [{ name: 'Church/Mission Control dragon statue', image: '/images/parts/external-migrated/s1HlQKa.png' }],
          },
          {
            name: 'Dragon Feed 3',
            locations: [{ name: 'Undercroft dragon statue', image: '/images/parts/external-migrated/Sgo9pop.png' }],
          },
        ],
      },
    ],
    eeOverview:
      '"The House Always Wins": each player completes a unique bow upgrade ritual (Storm, Wolf, Void, Fate bow). Once all four bows are upgraded, the crew converges for the final sequence involving the rocket launch and the recovery of Dempsey\'s soul canister.',
    eeSteps: [
      {
        num: 1,
        title: 'Upgrade at least one bow (all four in unranked co-op)',
        desc: 'Feed dragons for Wrath of the Ancients, then complete one elemental bow quest (Void/Fire/Storm/Wolf). Ranked games scale to player count, unranked can force all bows.',
      },
      {
        num: 2,
        title: 'Time-travel sequence and safe code',
        desc: 'Use teleporter + wisp cycle, return to past, collect canister/parts, read Dr. Groph code, then enter that round-specific code at Death Ray console to open Undercroft safe.',
      },
      {
        num: 3,
        title: 'Death Ray and rocket crash sequence',
        desc: 'Install safe parts at Death Ray pylons, flip mode back to Destroy, trigger rocket impact, then collect the Golden Rod from the crash site.',
      },
      {
        num: 4,
        title: 'Keeper escort and boss fight finish',
        desc: 'Charge Keeper at four ritual spots with correct bow element souls, open MPD, defeat corrupted Keeper in boss arena, then place Summoning Key by clock tower to complete quest.',
      },
    ],
    strategies: [
      'Upgrade your bow to an elemental variant as early as possible — each has a unique crowd-control mechanic.',
      'Rocket shields: grab the buildable shield for emergency blocking; it fires an energy charge from its back.',
      'The Giant robots walk fixed paths and can be ridden — step on their feet to reach the platform on their heads for treasure chests.',
      'Use the teleporters frequently to reposition — they send you to the Undercroft and back.',
      'The Keeper Protector can be summoned from specific items on the map and acts as a temporary bodyguard.',
      'Run laps through the keep → courtyard → outer walls for consistent, safe trains.',
    ],
    customSections: [
      {
        id: 'bow-upgrade-anchors',
        title: 'Bow Upgrade Anchor Points',
        label: 'Field Manual — Wonder Weapons',
        items: [
          {
            title: 'Void Bow start symbol',
            desc: 'Shoot the purple symbol near Castle Door/Gate Keep to reveal the broken arrow start.',
            image: '/images/parts/external-migrated/2fDNqar.png',
          },
          {
            title: 'Storm Bow weather vane',
            desc: 'Shoot weather vane with a charged shot to start Storm Bow and collect the broken arrow below.',
            image: '/images/parts/external-migrated/uTRj87Z.png',
          },
          {
            title: 'Wolf Bow painting order guide',
            desc: 'Activate four wolf paintings in the correct order, then retrieve the broken wolf arrow in Undercroft.',
            image: '/images/parts/external-migrated/FyuqxMo.jpg',
          },
        ],
      },
      {
        id: 'rocket-shield',
        title: 'Building the Rocket Shield',
        label: 'Field Manual — Equipment',
        items: [
          {
            title: 'Rocket Shield Part 1',
            desc: 'Fuel Tank set in Lower Courtyard: crates by Castle Door trap, balcony stair base, or stairs to Bastion.',
            image: '/images/parts/external-migrated/UEWJrqN.png',
          },
          {
            title: 'Rocket Shield Part 2',
            desc: 'Body Piece set in Upper Courtyard/clock tower lanes.',
            image: '/images/parts/external-migrated/e5VK28e.png',
          },
          {
            title: 'Top Piece and assembly',
            desc: 'Use anti-gravity in Undercroft to grab the Top Piece set, then assemble at any DE workbench.',
            image: '/images/parts/external-migrated/zXcGge0.png',
            tip: 'The shield has limited health — repair it at the workbench when damaged.',
          },
        ],
      },
    ],
    loreNote:
      "Der Eisendrache was built by Division 9 atop a site of ancient supernatural power predating Group 935. The castle's dragon and the elemental bow shrines suggest the location was chosen for its proximity to a natural 115 deposit. Primis Dempsey's soul is held here by Richtofen as leverage — a fact Dempsey himself does not yet know.",
  },

  'origins': {
    powerSteps: [
      'Origins power is split across six Generators; each activation starts a defense/conversion sequence on the pad.',
      'Activation cost scales by player count: 200 (solo), 400 (2P), 600 (3P), 800 (4P).',
      'Stay on the Generator pad until conversion completes; leaving the pad causes progress loss.',
      'Generator positions: 1 Spawn, 2 Tank Station front, 3 Workshop/Fire tunnel, 4 Wind tunnel/Juggernog side, 5 Lightning tunnel side, 6 Church upper floor near Ice tunnel.',
      'Templar Zombies periodically attack powered Generators later in the match; reclaiming dropped Generators should stay a team priority.',
    ],
    papLocation: 'Top of the Excavation Site mound (Pack-a-Punch platform).',
    papSteps: [
      'Activate all six Generators across the map.',
      'Once every Generator is powered, the Pack-a-Punch machine becomes active at Excavation.',
      'If Templars disable any Generator later, quickly recover map control so rotations remain safe.',
    ],
    buildables: [
      {
        name: 'Zombie Shield',
        description:
          'Three-part shield built at any Origins build table. It protects your back while stowed and is essential for high-round trench survivability.',
        parts: [
          {
            name: 'Top Piece',
            locations: [
              { name: 'Next to a brown crate at Generator 3 (near AK-74u).', image: '/images/parts/external-migrated/bneXTUL.jpg' },
              { name: 'Outside Spawn on the path to Generator 3, first room on the right.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
              { name: 'Fire Staff tunnel, right of the portal.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
            ],
          },
          {
            name: 'Middle Piece',
            locations: [
              { name: 'Inside Odin (middle robot) right-foot prints.', image: '/images/parts/external-migrated/xH1ujHd.jpg' },
            ],
          },
          {
            name: 'Bottom Piece',
            locations: [
              { name: 'Tank Station roof next to a pipe.', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
              { name: 'Dead-end lane near Generator 2.', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
              { name: 'Outside Spawn on the path to Generator 2, first room on the right.', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
            ],
          },
        ],
      },
      {
        name: 'Maxis Drone',
        description:
          'Quest utility drone required for major Easter Egg progress and special side quests (including Free Magna Collider).',
        parts: [
          {
            name: 'Brain',
            locations: [
              { name: 'Spawn, on a table.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
            ],
          },
          {
            name: 'Body',
            locations: [
              { name: 'Ice Staff tunnel.', image: '/images/parts/external-migrated/xH1ujHd.jpg' },
              { name: 'Between Church and Generator 4.', image: '/images/parts/external-migrated/xH1ujHd.jpg' },
              { name: 'Between Church and Generator 5.', image: '/images/parts/external-migrated/xH1ujHd.jpg' },
            ],
          },
          {
            name: 'Rotor',
            locations: [
              { name: 'Excavation next to AK74u wallbuy.', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
              { name: 'Staircase near Mule Kick.', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
              { name: 'On oxygen tanks inside Excavation.', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
            ],
          },
        ],
      },
      {
        name: 'Staff of Fire',
        description:
          'Record + crystal + three pieces. The first Panzer kill and flaming plane are mandatory for completion.',
        parts: [
          {
            name: 'Red Record (Fire)',
            locations: [
              { name: 'Church, between tank and staircase.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
              { name: 'Church 2nd floor, in burning pew pile.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
              { name: 'Church near Generator 6/challenge chest boxes.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
            ],
          },
          {
            name: 'Fire Crystal',
            locations: [
              { name: 'Crazy Place via Fire tunnel portal.', image: '/images/parts/external-migrated/xH1ujHd.jpg' },
            ],
          },
          {
            name: 'Staff Pieces',
            locations: [
              { name: 'Generator 6 reward chest piece (after powering/claiming chest).', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
              { name: 'Shoot down the flaming plane; piece drops near Excavation soul chest.', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
              { name: 'Kill the first Panzer Soldat for the final piece.', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
            ],
          },
        ],
      },
      {
        name: 'Staff of Wind',
        description:
          'Built from Wind Record, crystal, and three robot-foot pieces. Requires correct robot entry timing.',
        parts: [
          {
            name: 'Yellow Record (Wind)',
            locations: [
              { name: 'Generator 5, near Stamin-Up.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
              { name: 'Generator 5, boxes in front of Lightning tunnel.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
              { name: 'Lightning tunnel table near entrance.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
            ],
          },
          {
            name: 'Wind Crystal',
            locations: [
              { name: 'Crazy Place via Wind portal (near Generator 4).', image: '/images/parts/external-migrated/xH1ujHd.jpg' },
            ],
          },
          {
            name: 'Staff Pieces',
            locations: [
              { name: 'Inside Thor robot after opening a foot and boarding safely.', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
              { name: 'Inside Odin robot after opening a foot and boarding safely.', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
              { name: 'Inside Freya robot after opening a foot and boarding safely.', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
            ],
          },
        ],
      },
      {
        name: 'Staff of Ice',
        description:
          'Built from Ice Record, crystal, and three dig-site parts that only spawn during snow rounds.',
        parts: [
          {
            name: 'Blue Record (Ice)',
            locations: [
              { name: 'Tank Station shelf right of Mystery Box.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
              { name: 'Tank Station shelf right of back exit.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
              { name: 'Tank Station shelf right of front entrance.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
            ],
          },
          {
            name: 'Ice Crystal',
            locations: [
              { name: 'Crazy Place via Ice portal behind Church.', image: '/images/parts/external-migrated/xH1ujHd.jpg' },
            ],
          },
          {
            name: 'Staff Pieces',
            locations: [
              { name: 'Dig sites during snow only (all three parts are weather-gated).', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
            ],
          },
        ],
      },
      {
        name: 'Staff of Lightning',
        description:
          'Built from Lightning Record, crystal, and three tank-jump pieces collected during a full tank loop.',
        parts: [
          {
            name: 'Purple Record (Lightning)',
            locations: [
              { name: 'Generator 4, next to Wunderfizz.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
              { name: 'Generator 4, on top of a wooden cart.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
              { name: 'End of Wind Staff tunnel.', image: '/images/parts/external-migrated/bneXTUL.jpg' },
            ],
          },
          {
            name: 'Lightning Crystal',
            locations: [
              { name: 'Crazy Place via Lightning portal next to Generator 5.', image: '/images/parts/external-migrated/xH1ujHd.jpg' },
            ],
          },
          {
            name: 'Staff Pieces',
            locations: [
              { name: 'Tank jump near Generators 4/3 into footprint platform.', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
              { name: 'Tank jump near Generator 5 into Excavation route.', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
              { name: 'Tank jump before Church Tank Station into Church-side route.', image: '/images/parts/external-migrated/t7xDbW4.jpg' },
            ],
          },
        ],
      },
    ],
    eeOverview:
      '"Little Lost Girl": activate all Generators, upgrade all four Staffs, complete soul-box and tablet trials, then finish the robot/G-Strike/Maxis finale inside Agartha.',
    strategies: [
      'Split duties early: one player opens Generator lanes while others collect Shovel, records, and first build parts.',
      'Treat Panzer rounds as hard checkpoints; save high-DPS weapons and clear him immediately before resuming setup.',
      'Learn robot foot cues and safe boarding timing, since Wind Staff and main quest steps depend on consistent robot access.',
      'Use the Tank route intentionally for Lightning Staff pieces, not reactively; call timing so teammates are ready at jump points.',
      'Do not overstay muddy trenches during recovery rounds; rotate through safer hard-floor routes whenever possible.',
      'Recover dropped Generators quickly when Templars attack so map flow, perks, and revives stay stable.',
    ],
    customSections: [
      {
        id: 'transport-and-records',
        title: 'Transport and Records',
        label: 'Field Manual — Systems',
        items: [
          {
            title: 'Mark IV Tank',
            desc: 'Costs 500 points at Church and loops through the map with a cooldown at Tank Station. It is required for Lightning Staff jumps and repositioning.',
          },
          {
            title: 'Teleporters and Gramophone',
            desc: 'Each Staff tunnel teleporter requires the Gramophone plus its record. You can only activate one overworld teleporter at a time, but Crazy Place exits remain usable.',
          },
          {
            title: 'Gramophone and White Record spawns',
            desc: 'Gramophone: Excavation middle level near a table. White Record: next to Pack-a-Punch, No Man\'s Land entrance sign, or Church-side pillar with boxes.',
          },
        ],
      },
      {
        id: 'shovel-and-helmet',
        title: 'Shovel and Golden Helmet',
        label: 'Field Manual — Survival',
        items: [
          {
            title: 'Shovel role',
            desc: 'Dig sites can reward weapons, power-ups, zombies, and special items. Ice Staff parts are tied to snow rounds only.',
          },
          {
            title: 'Golden Shovel',
            desc: 'Dig 30 sites after obtaining a shovel to upgrade. This improves access to stronger dig rewards.',
          },
          {
            title: 'Golden Helmet',
            desc: 'After obtaining Golden Shovel, keep digging until Helmet appears. It prevents death from robot stomps.',
          },
        ],
      },
      {
        id: 'staff-upgrades',
        title: 'Staff Upgrade Notes',
        label: 'Field Manual — Wonder Weapons',
        items: [
          {
            title: 'Fire (Kagutsuchi\'s Blood)',
            desc: 'Crazy Place Fire kills on chain plate, then Church torch-number puzzle, set Excavation rings to red, and charge at Fire pedestal.',
          },
          {
            title: 'Wind (Boreas\' Fury)',
            desc: 'Solve Crazy Place Wind symbol puzzle, redirect all three smoke stacks, set Excavation rings to yellow, and charge at Wind pedestal.',
          },
          {
            title: 'Ice (Ull\'s Arrow)',
            desc: 'Solve Crazy Place Ice symbol puzzle, break all three tombstones, set Excavation rings to blue, and charge at Ice pedestal.',
          },
          {
            title: 'Lightning (Kimat\'s Bite)',
            desc: 'Complete Crazy Place piano code, rotate all electric panel dials correctly, set Excavation rings to purple, and charge at Lightning pedestal.',
          },
        ],
      },
      {
        id: 'maxis-drone-and-build-tables',
        title: 'Maxis Drone and Build Tables',
        label: 'Field Manual — Equipment',
        items: [
          {
            title: 'Build table locations',
            desc: 'Workshop lower floor rear corner, bottom of Wind tunnel staircase, and Church lower level near tank hop point.',
            image: '/images/parts/external-migrated/bneXTUL.jpg',
          },
          {
            title: 'Build table references',
            desc: 'Wind tunnel stair table and Church lower-level table references from the wiki.',
            image: '/images/parts/external-migrated/xH1ujHd.jpg',
          },
          {
            title: 'Church table reference',
            desc: 'Lower-level Church build table near tank jump point.',
            image: '/images/parts/external-migrated/t7xDbW4.jpg',
          },
          {
            title: 'Free Magna Collider mini-quest',
            desc: 'With Maxis Drone built, collect the four yellow disk checks and then claim the free Magna Collider by Pack-a-Punch.',
          },
        ],
      },
      {
        id: 'game-features-origins',
        title: 'Game Features',
        label: 'Field Manual — Operations',
        items: [
          {
            title: 'Mystery Box network',
            desc: 'Box rotates between Laboratory, Generator 2 bunker corner, Generator 3, Generator 4 (Jug lane), Generator 5 (Wunderfizz side), and Generator 6 rear.',
          },
          {
            title: 'Perk layout and Wunderfizz',
            desc: 'Core perks: Quick Revive, Speed Cola, Stamin-Up, Juggernog, Mule Kick. Wunderfizz can roll additional perks and has multiple generator-area spawn points.',
          },
          {
            title: 'Special grenades',
            desc: 'Map-specific explosive utility includes Semtex, Monkey Bombs, and G-Strike (earned through quest progression).',
          },
        ],
      },
      {
        id: 'origins-main-quest-notes',
        title: 'Main Easter Egg Notes',
        label: 'Field Manual — Quest Intel',
        items: [
          {
            title: 'Core progression gates',
            desc: 'Power all six Generators, upgrade all four Staffs, fill four soul boxes, obtain Thunder Fists and G-Strike, then complete Maxis Drone milestones.',
          },
          {
            title: 'Robot and G-Strike sequence',
            desc: 'Use robot button timing plus G-Strike near Generator 5 to open the pit, deploy Maxis Drone, then survive the Panzer wave.',
          },
          {
            title: 'Final Agartha closeout',
            desc: 'Place Staffs in Agartha pedestals, secure 100 kills, then deploy upgraded Maxis Drone into the ceiling portal to trigger the ending cutscene.',
          },
        ],
      },
    ],
    loreNote:
      "Origins is the birthplace of Primis — the crew first met here, drawn together by the supernatural pull of the 115 meteor beneath the WWI battlefield. It's also where the Maxis–Richtofen rift began in earnest, as each pursued the Elemental Staffs for their own agenda. Samantha's music box is buried somewhere beneath the mud, and her voice has been calling out for longer than anyone realises.",
  },

  'nacht-der-untoten': {
    papLocation: 'No Pack-a-Punch on this map.',
    strategies: [
      'Early rounds are about pistol point-building and controlled window repairs.',
      'Use the help-room choke when ammo is efficient; rotate before overrun.',
      'Always keep one emergency weapon for dogpiles through narrow doors.',
    ],
    loreNote:
      'The map that started Zombies: a ruined bunker and a pure survival loop with no side systems.',
    customSections: [
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual - Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/nacht-der-untoten/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Pure survival with no perks or Pack-a-Punch; route discipline and ammo efficiency are everything.',
            image: 'https://static.wikia.nocookie.net/callofduty/images/2/2b/Nacht_Der_Untoten_Menu_Selection_WaW.png/revision/latest?cb=20161009103545',
          },
        ],
      },
    ],
  },

  'verruckt': {
    powerSteps: [
      'Open from your starting side toward the central power room.',
      'Activate the power switch to enable perks and trap systems.',
    ],
    papLocation: 'No Pack-a-Punch on this map.',
    strategies: [
      'Split spawns mean early coordination matters more than pure slaying speed.',
      'Electric traps can stabilize rounds when hallway pressure spikes.',
      'Avoid over-committing to tiny rooms; rotate through longer corridors.',
    ],
    loreNote:
      'Verruckt introduced perks and cooperative pressure through mirrored starting positions.',
    customSections: [
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual - Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/verruckt/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Split-team spawn and trap-focused hallway control define early and mid-round pacing.',
            image: 'https://static.wikia.nocookie.net/callofduty/images/a/a1/Verruckt_Menu_Selection_WaW.png/revision/latest?cb=20161009103542',
          },
        ],
      },
    ],
  },

  'shi-no-numa': {
    powerSteps: [
      'Power is active by default in WaW/BO1 versions; focus on route opening.',
    ],
    papLocation: 'No Pack-a-Punch in original Shi No Numa.',
    strategies: [
      'Use the random-perk hut cycle to adjust your route each game.',
      'Wunderwaffe is strongest for emergency clears and dog-round recovery.',
      'Watch swamp movement penalties when repositioning under pressure.',
    ],
    loreNote:
      'The first Ultimis map and first appearance of the Wunderwaffe DG-2 in Zombies.',
    customSections: [
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual - Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/shi-no-numa/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Randomized perk huts and swamp traversal penalties shape movement and setup every match.',
            image: 'https://static.wikia.nocookie.net/callofduty/images/2/2f/Shi_No_Numa_Menu_Selection_WaW.png/revision/latest?cb=20161009103553',
          },
        ],
      },
    ],
  },

  'der-riese': {
    powerSteps: [
      'Open toward the mainframe and switch on power in the central facility.',
      'Link teleporters to the mainframe for fast repositioning and Pack-a-Punch access.',
    ],
    papLocation: 'Mainframe teleporter destination room.',
    papSteps: [
      'Power on and activate each side teleporter to link it.',
      'Use the mainframe to teleport and access Pack-a-Punch.',
    ],
    strategies: [
      'Classic catwalk and loop strats both work; pick one and commit as a team.',
      'Use teleporters as panic resets when trap timing is unfavorable.',
      'Trap usage scales better than ammo dumping in later rounds.',
    ],
    customSections: [
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual - Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/der-riese/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Teleporter linking, trap cycling, and fast catwalk resets are the map\'s core loop.',
            image: 'https://static.wikia.nocookie.net/callofduty/images/8/86/Der_Riese_Menu_Selection_WaW.png/revision/latest?cb=20161009103603',
          },
        ],
      },
    ],
  },

  'five': {
    powerSteps: [
      'Open down from spawn into lower levels and switch on power in the basement.',
    ],
    papLocation: 'War Room teleporter room rotation (DEFCON sequence).',
    papSteps: [
      'Lower DEFCON to 5 by activating all required terminals.',
      'Use the central teleporter to enter Pack-a-Punch room.',
    ],
    strategies: [
      'Prioritize anti-thief loadouts before Pentagon Thief rounds.',
      'War Room training is safer than tight upper floors in high rounds.',
      'Do not overstay elevators; pathing collapses quickly.',
    ],
    customSections: [
      {
        id: 'pentagon-thief',
        title: 'Pentagon Thief Control',
        label: 'Field Manual — Threat Intel',
        items: [
          {
            title: 'Spawn response',
            desc: 'Collapse on the thief immediately; fast focus fire minimizes weapon-loss pressure and round delay.',
          },
          {
            title: 'Loadout prep',
            desc: 'Keep one high-burst weapon ready before thief rounds so your best gun is not easily stolen.',
          },
          {
            title: 'Room choice',
            desc: 'Fight the thief in cleaner geometry (War Room side lanes) rather than cramped office intersections.',
          },
        ],
      },
      {
        id: 'defcon-pap',
        title: 'DEFCON and Pack-a-Punch',
        label: 'Field Manual — Systems',
        items: [
          {
            title: 'DEFCON timing',
            desc: 'Lower DEFCON quickly during stable rounds so teleporter access does not collide with emergency revives.',
          },
          {
            title: 'Upgrade windows',
            desc: 'Batch weapon upgrades when the room is open to reduce repeated risk through basement chokepoints.',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual — Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/five/',
          },
          {
            title: 'Notable mechanics',
            desc: 'DEFCON teleporter management and Pentagon Thief control heavily influence economy.',
            image: 'https://static.wikia.nocookie.net/callofduty/images/3/34/Five_Menu_Selection_BO.png/revision/latest?cb=20240710065748',
          },
        ],
      },
    ],
  },

  'ascension': {
    powerSteps: [
      'Open from spawn to the central lunar lander/power complex.',
      'Activate power to unlock perk machines and map systems.',
    ],
    papLocation: 'Central facility after lander and generator requirements.',
    papSteps: [
      'Activate all lunar landers and route through central room.',
      'Once systems are online, access Pack-a-Punch in the hub area.',
    ],
    eeOverview:
      'Ascension co-op quest centers on lunar lander coordination and button interactions.',
    eeSteps: [
      {
        num: 1,
        title: 'Power and route setup',
        desc: 'Open to power and establish safe movement between all lander zones before starting objective interactions.',
      },
      {
        num: 2,
        title: 'Lander/button sequence',
        desc: 'Coordinate players on required pads/buttons in order while keeping round control in open areas.',
      },
      {
        num: 3,
        title: 'Hold objective lanes',
        desc: 'During interaction windows, one player handles objective while others anchor incoming lanes and revive coverage.',
      },
      {
        num: 4,
        title: 'Finalize co-op completion',
        desc: 'Complete the final synchronized interactions once all prior checks are done.',
      },
    ],
    strategies: [
      'Plan monkey rounds around perk protection priority.',
      'Use wide open training lanes near spawn and central ring.',
      'Save explosive utility for monkey and clutch revive windows.',
    ],
    customSections: [
      {
        id: 'space-monkeys',
        title: 'Space Monkeys',
        label: 'Field Manual — Threat Intel',
        items: [
          {
            title: 'Perk defense priority',
            desc: 'Decide perk protection order before monkey rounds so each player knows where to rotate first.',
          },
          {
            title: 'Fast clear tools',
            desc: 'Shotguns, explosive utility, and focused callouts shorten monkey rounds and preserve perk economy.',
          },
        ],
      },
      {
        id: 'lunar-lander-notes',
        title: 'Lunar Lander Notes',
        label: 'Field Manual — Mobility',
        items: [
          {
            title: 'Reposition value',
            desc: 'Landers are not just transport; they are tempo tools for breaking pressure and resetting control.',
          },
          {
            title: 'Pathing discipline',
            desc: 'Use landers before lanes collapse, not after - late activations often force unnecessary downs.',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual — Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/ascension/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Space Monkeys pressure perk defense; lunar landers and open loops drive survival flow.',
            image: 'https://static.wikia.nocookie.net/callofduty/images/f/fd/Ascension_Menu_Selection_BO.png/revision/latest',
          },
        ],
      },
    ],
  },

  'call-of-the-dead': {
    powerSteps: [
      'Progress through ship and lighthouse routes to restore map flow and perks.',
    ],
    papLocation: 'Lighthouse top via zipline progression.',
    papSteps: [
      'Open lighthouse route and enable required zipline travel.',
      'Use lighthouse access points to reach Pack-a-Punch level safely.',
    ],
    eeOverview:
      'Stand-In quest revolves around helping trapped Ultimis and completing item interactions across the map.',
    eeSteps: [
      {
        num: 1,
        title: 'Map control and power',
        desc: 'Open core ship/lighthouse routes and stabilize movement so objective travel is safe.',
      },
      {
        num: 2,
        title: 'Trigger Stand-In interactions',
        desc: 'Begin the sequence linked to the trapped crew and complete the required item/action handoffs.',
      },
      {
        num: 3,
        title: 'Coordinate George pressure',
        desc: 'Handle George movement intentionally during objective windows so he does not break your progress routes.',
      },
      {
        num: 4,
        title: 'Finalize quest turn-in',
        desc: 'Complete the closing interactions once all required steps and combat checks are satisfied.',
      },
    ],
    strategies: [
      'Manage George Romero pacing; avoid random fights without objective value.',
      'Scavenger and crowd-control secondaries are high value on this map.',
      'Keep one player ready for lighthouse repositioning calls.',
    ],
    customSections: [
      {
        id: 'george-romero',
        title: 'George Romero Control',
        label: 'Field Manual — Threat Intel',
        items: [
          {
            title: 'Movement manipulation',
            desc: 'Pull George away from active objectives before starting long interactions or revives.',
          },
          {
            title: 'When to fight',
            desc: 'Only commit to killing George when your team can cash in the reward safely and reset quickly.',
          },
        ],
      },
      {
        id: 'lighthouse-routing',
        title: 'Lighthouse and Zipline Routing',
        label: 'Field Manual — Mobility',
        items: [
          {
            title: 'Zipline timing',
            desc: 'Use zipline transitions before the horde reaches stairs; late use creates avoidable choke deaths.',
          },
          {
            title: 'Vertical control',
            desc: 'Treat lighthouse floors as staged fallback points, not static holdouts.',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual — Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/call-of-the-dead/',
          },
          {
            title: 'Notable mechanics',
            desc: 'George Romero and vertical lighthouse routing create constant movement pressure.',
            image: 'https://static.wikia.nocookie.net/callofduty/images/7/78/Call_of_the_Dead_Menu_Selection_BO.png/revision/latest',
          },
        ],
      },
    ],
  },

  'shangri-la': {
    powerSteps: [
      'Map opens through pressure traps, minecart routing, and coordinated door pathing.',
    ],
    papLocation: 'Temple center after rotating and opening the required mechanisms.',
    papSteps: [
      'Activate/rotate key map devices to open central Pack-a-Punch path.',
      'Maintain route discipline because space is limited and punishing.',
    ],
    eeOverview:
      'Time Travel Will Tell uses strict co-op timing and multi-location objective handoffs.',
    eeSteps: [
      {
        num: 1,
        title: 'Open temple routes',
        desc: 'Unlock key map lanes and traps so co-op movement is reliable before beginning quest phases.',
      },
      {
        num: 2,
        title: 'Execute synchronized interactions',
        desc: 'Perform timing-dependent co-op actions in sequence across the temple and side lanes.',
      },
      {
        num: 3,
        title: 'Protect objective carriers',
        desc: 'Assign one player to objective handling while others hold space and deny collapses in tight corridors.',
      },
      {
        num: 4,
        title: 'Complete final handoff',
        desc: 'Finish the last sequence once all prerequisite interactions are validated.',
      },
    ],
    strategies: [
      'Space is the real enemy - pre-plan fallback lanes and callouts.',
      'Napalm and Shrieker rounds should be treated as tactical events, not chaos.',
      'Use wonder-weapon ammo sparingly for trapped-team emergencies.',
    ],
    customSections: [
      {
        id: 'special-round-threats',
        title: 'Special Round Threats',
        label: 'Field Manual — Threat Intel',
        items: [
          {
            title: 'Napalm and Shrieker response',
            desc: 'Treat specials as lane-control events; clear them first before re-engaging main trains.',
          },
          {
            title: 'Tight-space discipline',
            desc: 'Small rooms punish panic movement. Keep fallback directions pre-called each round.',
          },
        ],
      },
      {
        id: 'trap-economy',
        title: 'Trap Economy',
        label: 'Field Manual — Systems',
        items: [
          {
            title: 'Ammo preservation',
            desc: 'Use trap cycles to thin rounds and save wonder-weapon ammo for true route failures.',
          },
          {
            title: 'Pathing safety',
            desc: 'Trigger traps with a clear exit route already in mind; dead-end trap plays are high risk.',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual — Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/shangri-la/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Tight lanes, trap timing, and coordinated co-op interactions punish overextension.',
            image: 'https://static.wikia.nocookie.net/callofduty/images/d/d5/Shangri-La_Menu_Selection_BO.png/revision/latest',
          },
        ],
      },
    ],
  },

  'moon': {
    powerSteps: [
      'Secure area 51 opening route and survive first teleporter transition.',
      'Restore power in lunar sections to enable core machines and doors.',
    ],
    papLocation: 'Biodome/receiving-bay route after map power and access setup.',
    papSteps: [
      'Activate required systems and hold excavator control where needed.',
      'Open the lunar route segments that gate Pack-a-Punch approach.',
    ],
    eeOverview:
      'Moon main quest chains QED, hacker, and objective dependencies into one of BO1\'s largest finales.',
    eeSteps: [
      {
        num: 1,
        title: 'Area 51 and lunar setup',
        desc: 'Build economy and survive first transitions, then restore lunar-side power and route control.',
      },
      {
        num: 2,
        title: 'Acquire hacker and dependencies',
        desc: 'Secure hacker usage and required equipment before attempting multi-step objective phases.',
      },
      {
        num: 3,
        title: 'Manage excavator windows',
        desc: 'Disable or route around excavator pressure while preserving oxygen-safe movement paths.',
      },
      {
        num: 4,
        title: 'Execute endgame chain',
        desc: 'Complete the final quest interactions in order once all gates are satisfied.',
      },
    ],
    strategies: [
      'Always track oxygen and suit state before committing to long routes.',
      'Hacker timing is make-or-break for efficiency and objective recovery.',
      'Area 51 starts can overfeed points if coordinated and not over-greedy.',
    ],
    customSections: [
      {
        id: 'hacker-and-excavators',
        title: 'Hacker and Excavator Control',
        label: 'Field Manual — Systems',
        items: [
          {
            title: 'Hacker priority use',
            desc: 'Use hacker for objective acceleration and excavator response windows rather than low-impact convenience hacks.',
          },
          {
            title: 'Excavator discipline',
            desc: 'Call excavator states immediately so no one commits to unsafe oxygen routes by mistake.',
          },
        ],
      },
      {
        id: 'oxygen-and-routing',
        title: 'Oxygen and Routing',
        label: 'Field Manual — Survival',
        items: [
          {
            title: 'Suit awareness',
            desc: 'Never begin long objective movement without confirming suit/oxygen safety first.',
          },
          {
            title: 'Area 51 pacing',
            desc: 'Strong starts come from disciplined point farming, not over-greedy holds that cause early downs.',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual — Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/moon/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Hacker timing, excavator control, and oxygen/suit awareness define map mastery.',
            image: 'https://static.wikia.nocookie.net/callofduty/images/c/cc/Moon_Menu_Selection_BO.png/revision/latest',
          },
        ],
      },
    ],
  },

  'tranzit': {
    powerSteps: [
      'Build a Turbine at Bus Depot first (mannequin, fan, model-plane tail).',
      'Ride to Power Station, drop into the lower room, and assemble the Power Switch (zombie hand, panel, handle).',
      'Expect Avogadro release when power turns on; avoid standing in the center room during activation pulse.',
      'Keep a spare Turbine alive for shortcuts, teleporter lamp posts, and Pack-a-Punch access timing.',
    ],
    papLocation: 'Town bank laboratory, behind the lightning-door and two blown vault safes.',
    papSteps: [
      'Turn on main power at Power Station.',
      'Place a healthy Turbine on the lightning-panel door at Power Station.',
      'Sprint/ride to Town, blow open vault safes, and enter the lab before the lightning-door closes.',
      'Inside the lab, build Pack-a-Punch from shell, table, and battery parts found in that room.',
      'If the lightning-door closes again, repeat Turbine setup and re-entry route.',
    ],
    buildables: [
      {
        name: 'Turbine',
        description:
          'Most important Tranzit utility buildable. Powers temporary doors, perk access, lamp-post teleports, and PaP door mechanics.',
        parts: [
          {
            name: 'Bus Depot set',
            locations: [
              { name: 'Mannequin in Bus Depot spawn room.', image: '/images/parts/external-migrated/0VFpTZK.jpg?1' },
              { name: 'Fan in Bus Depot spawn room.', image: '/images/parts/external-migrated/0VFpTZK.jpg?1' },
              { name: 'Model plane tail in Bus Depot spawn room.', image: '/images/parts/external-migrated/0VFpTZK.jpg?1' },
            ],
          },
        ],
      },
      {
        name: 'Jet Gun (Thrustodyne Aeronautics Model 23)',
        description:
          'Tranzit wonder weapon buildable crafted in Town bar from four map-spread parts.',
        parts: [
          {
            name: 'Jet Engine (Tunnel)',
            locations: [
              { name: 'Tunnel windows/cars around M16 segment.', image: '/images/parts/external-migrated/0VFpTZK.jpg?1' },
            ],
          },
          {
            name: 'Wires (Power/Tombstone side)',
            locations: [
              { name: 'Tombstone lower room and barrel lanes between tombstone and power rooms.', image: '/images/parts/external-migrated/0VFpTZK.jpg?1' },
            ],
          },
          {
            name: 'Handbrake (Nacht der Untoten)',
            locations: [
              { name: 'Nacht lamp, cabinet, or stair variants.', image: '/images/parts/external-migrated/0VFpTZK.jpg?1' },
            ],
          },
          {
            name: 'Pressure Gauge (Hunter cabin)',
            locations: [
              { name: 'Hunter cabin fireplace or bed spawn.', image: '/images/parts/external-migrated/0VFpTZK.jpg?1' },
            ],
          },
        ],
      },
    ],
    eeOverview:
      'Tower of Babble has two branches. Maxis side revolves around powering down and Avogadro EMP kill under pylon; Richtofen side requires Jet Gun and synchronized EMP teleport lamp execution.',
    eeSteps: [
      {
        num: 1,
        title: 'Core setup and role assignment',
        desc: 'Build Turbines for all players, open power route, and assign one caller (Stuhlinger if available) to track branch-specific audio cues.',
      },
      {
        num: 2,
        title: 'Choose branch and satisfy branch gates',
        desc: 'Maxis: power ON then OFF and prep Avogadro EMP kill. Richtofen: keep power ON, build Jet Gun, and prep EMP users/teleporter lamps.',
      },
      {
        num: 3,
        title: 'Execute pylon interaction sequence',
        desc: 'Maxis: place dual Turbines under pylon, lure Avogadro beneath tower, and EMP-kill him during active turbine window. Richtofen: break Jet Gun beneath pylon, feed required explosive kills, then prep all lamp teleports before simultaneous EMP detonation.',
      },
      {
        num: 4,
        title: 'Finalize synchronized endpoint',
        desc: 'Complete final simultaneous Turbine (Maxis) or EMP-lamp (Richtofen) actions to lock quest completion and achievement pop.',
      },
    ],
    strategies: [
      'Assign bus-stop roles early to avoid duplicated travel and missed windows.',
      'Use denizen control and lantern routes to reduce fog attrition.',
      'Keep one safety buildable ready for revives and emergency lockouts.',
      'Treat Turbine health as a resource - damaged turbines are the main cause of failed PaP and quest attempts.',
      'When moving on foot, chain lamp teleports only after confirming zombie spacing to avoid fog isolation downs.',
    ],
    customSections: [
      {
        id: 'tranzit-branch-matrix',
        title: 'Tower of Babble Branch Matrix',
        label: 'Field Manual — Quest Intel',
        items: [
          {
            title: 'Maxis route quick checklist',
            desc: 'Power ON first, then OFF. Place two Turbines under pylon, lure Avogadro into tower space, and EMP-kill him before turbine decay. Finalize with synchronized turbine timing.',
          },
          {
            title: 'Richtofen route quick checklist',
            desc: 'Keep power ON. Build Jet Gun, destroy it under pylon, score explosive kills for tower charge, then complete synchronized EMP at prepared denizen-lamp nodes.',
          },
          {
            title: 'Maxis route reference video',
            desc: 'https://www.youtube.com/watch?v=OuEqh7v7zRg',
          },
          {
            title: 'Richtofen route reference video',
            desc: 'https://www.youtube.com/watch?v=ZHucBiEdTRc',
          },
        ],
      },
      {
        id: 'tranzit-map-and-transit',
        title: 'Route and Transit Notes',
        label: 'Field Manual — Mobility',
        items: [
          {
            title: 'Annotated full map',
            desc: 'Community reference with fog lanes, stops, and special zones.',
            image: '/images/parts/external-migrated/0VFpTZK.jpg?1',
          },
          {
            title: 'Bus upgrade parts',
            desc: 'Ladder, hatch, and cow catcher spawn in random Turbine-locked sheds across Bus Depot, Diner, Farm, and Town.',
          },
          {
            title: 'Lamp teleporter rule',
            desc: 'Denizen must latch your head and jump off under an active lamp (power on or Turbine nearby) to create a teleport node.',
          },
        ],
      },
      {
        id: 'tranzit-buildables-and-crossmap',
        title: 'Buildables and Cross-Map Systems',
        label: 'Field Manual — Systems',
        items: [
          {
            title: 'Navcard table notes',
            desc: 'Build nav table at pylon fence with meteorite, plank table, radio box, and fuse box parts. Tranzit navcard is inserted into Die Rise table.',
          },
          {
            title: 'Bank and fridge utility',
            desc: 'Town bank stores points across matches; Farm fridge stores one weapon across Green Run maps.',
          },
          {
            title: 'Tower of Babble tutorial',
            desc: 'Reference video for branch execution timings.',
            image: 'https://www.youtube.com/watch?v=ZHucBiEdTRc',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual - Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/tranzit/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Bus route planning, denizen/fog management, and buildable coordination are core systems.',
          },
        ],
      },
    ],
  },

  'die-rise': {
    powerSteps: [
      'Drop from spawn through initial shafts to lower tower sections and work back upward through connected buildings.',
      'Reach rooftop power room and activate power to enable perk elevators and map systems.',
      'Track elevator cycles constantly; weapon/perk elevator drift can soft-lock weak setups if ignored.',
    ],
    papLocation: 'Rooftop dragon platform area after symbol and dragon-fire unlock sequence.',
    papSteps: [
      'Turn on power and open rooftop access where dragon statues are visible.',
      'Shoot both dragon mouth balls with a scoped sniper to trigger dragon-fire sequence.',
      'Stand on four rooftop symbols in correct order to advance PaP unlock script.',
      'After successful sequence, Pack-a-Punch becomes available on rooftop platform route.',
    ],
    buildables: [
      {
        name: 'Sliquifier',
        description:
          'Map wonder weapon built near power. Extremely strong chain-kill tool for vertical lane control.',
        parts: [
          {
            name: 'Mannequin Foot',
            locations: [{ name: 'Top of staircase near television by Sliquifier route.', image: '/images/parts/external-migrated/QC1vwdM.jpg' }],
          },
          {
            name: 'Gas Canister',
            locations: [
              { name: 'Green cage near Sliquifier table.', image: '/images/parts/external-migrated/QC1vwdM.jpg' },
              { name: 'Table near power switch.', image: '/images/parts/external-migrated/QC1vwdM.jpg' },
            ],
          },
          {
            name: 'Handbreak',
            locations: [
              { name: 'Power room table near elevator.', image: '/images/parts/external-migrated/QC1vwdM.jpg' },
              { name: 'Fridge near Sliquifier table.', image: '/images/parts/external-migrated/QC1vwdM.jpg' },
            ],
          },
          {
            name: 'Wires and Discs',
            locations: [
              { name: 'Barrel near debris door.', image: '/images/parts/external-migrated/QC1vwdM.jpg' },
              { name: 'Fridge near Sliquifier table.', image: '/images/parts/external-migrated/QC1vwdM.jpg' },
            ],
          },
        ],
      },
      {
        name: 'Trample Steam',
        description:
          'Key mobility and objective tool. Used for movement skips, symbol steps, and both EE branches.',
        parts: [
          {
            name: 'Chicken Wire',
            locations: [
              { name: 'Left of spawn door.', image: '/images/parts/external-migrated/arj1osH.png' },
              { name: 'Left-side wall through spawn door.', image: '/images/parts/external-migrated/arj1osH.png' },
            ],
          },
          {
            name: 'Motor',
            locations: [
              { name: 'Lobby desk.', image: '/images/parts/external-migrated/arj1osH.png' },
              { name: 'Corner by collapsed staircase.', image: '/images/parts/external-migrated/arj1osH.png' },
            ],
          },
          {
            name: 'Bellows',
            locations: [
              { name: 'Lobby staircase.', image: '/images/parts/external-migrated/arj1osH.png' },
              { name: 'Right-side wall through spawn door.', image: '/images/parts/external-migrated/arj1osH.png' },
            ],
          },
          {
            name: 'Flag',
            locations: [
              { name: 'Broken chair at bottom-right spawn stairs.', image: '/images/parts/external-migrated/arj1osH.png' },
              { name: 'Right-side railing through spawn door.', image: '/images/parts/external-migrated/arj1osH.png' },
            ],
          },
        ],
      },
    ],
    eeOverview:
      'High Maintenance splits into Richtofen and Maxis routes after shared rooftop setup. Both rely on Trample Steam placement logic, Mahjong direction puzzle, and Radio Tower melee order.',
    eeSteps: [
      {
        num: 1,
        title: 'Shared setup phase',
        desc: 'Activate power, build nav table on rooftop, synchronize four-elevator jump symbols, then solve ground symbol order and dragon mouth shots.',
      },
      {
        num: 2,
        title: 'Choose branch after dragon signal',
        desc: 'Blue firework indicates Richtofen path ready; orange indicates Maxis path ready. Commit before placing Trample Steams or pickup items.',
      },
      {
        num: 3,
        title: 'Branch execution',
        desc: 'Richtofen: complete Sliquifier orb charge loop and Trample kill requirements in assigned tower lanes. Maxis: complete Buddha blood ritual, ballistic-knife revive sequence, and strict character-specific orb handling without order breaks.',
      },
      {
        num: 4,
        title: 'Mahjong order and Radio Tower finish',
        desc: 'Use Mahjong direction/order mapping to melee Radio Tower in the correct compass sequence. Successful finish grants 6 perks and locks branch completion.',
      },
    ],
    strategies: [
      'Vertical risk is the map\'s hardest mechanic - value safe jumps over speed.',
      'Track elevator states verbally so teams do not waste rounds waiting.',
      'Sliquifier saves lives, but overuse in tight drop zones can punish movement.',
    ],
    customSections: [
      {
        id: 'die-rise-branch-matrix',
        title: 'High Maintenance Branch Matrix',
        label: 'Field Manual — Quest Intel',
        items: [
          {
            title: 'Branch lock signal',
            desc: 'Blue fireworks indicate Richtofen progression state; orange fireworks indicate Maxis progression state. Confirm team callout before placing branch-critical Trample Steams.',
          },
          {
            title: 'Richtofen route execution',
            desc: 'Prioritize Sliquifier orb-charge step, maintain rooftop control, and avoid accidental Maxis-only interactions while tower input is pending.',
          },
          {
            title: 'Maxis route execution',
            desc: 'Run Buddha blood timing cleanly, coordinate ballistic-knife revive ritual, and enforce exact role ownership on orb carry/placement steps.',
          },
        ],
      },
      {
        id: 'die-rise-mobility-risk',
        title: 'Vertical Mobility Risk Control',
        label: 'Field Manual — Survival',
        items: [
          {
            title: 'Elevator tracking discipline',
            desc: 'Call perk and weapon elevator positions every round. Lost elevators are the main source of failed recoveries.',
          },
          {
            title: 'Trample as movement tool',
            desc: 'Use Trample Steam for intentional movement skips and emergency route saves, not just trap kills.',
          },
          {
            title: 'Roofline objective safety',
            desc: 'Run symbol/objective steps only with one controlled zombie to avoid fatal falls during pressure spikes.',
          },
        ],
      },
      {
        id: 'die-rise-puzzle-references',
        title: 'Puzzle References',
        label: 'Field Manual — Quest Intel',
        items: [
          {
            title: 'Mahjong symbol mapping',
            desc: 'Compass mapping helper for radio tower melee order.',
            image: '/images/parts/external-migrated/arj1osH.png',
          },
          {
            title: 'Tower side compass guide',
            desc: 'Radio tower side orientation reference for final order input.',
            image: '/images/parts/external-migrated/QC1vwdM.jpg',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual - Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/die-rise/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Vertical routing, elevator states, and fall-risk mitigation are more important than raw DPS.',
          },
        ],
      },
    ],
  },

  'buried': {
    powerSteps: [
      'Open candy shop upper floor and activate main power switch there.',
      'Use Leroy (Arthur) with Booze/Candy intelligently to break barriers and accelerate route opening.',
      'Once power is active, combine mansion route, maze route, and fountain portal for full-map mobility.',
    ],
    papLocation: 'Under the Gazebo at maze end near Stamin-Up.',
    papSteps: [
      'Open path through mansion and enter the hedge maze.',
      'Navigate maze to Gazebo center and drop to Pack-a-Punch chamber.',
      'Remember maze randomizes when leaving through mansion or using fountain portal.',
    ],
    buildables: [
      {
        name: 'Core buildables (General Store)',
        description:
          'Buried setup starts in General Store where most key traps and utility devices are assembled.',
        parts: [
          {
            name: 'Turbine set',
            locations: [
              { name: 'Fan', image: '/images/parts/external-migrated/Kh05Zxu.jpg' },
              { name: 'Mannequin', image: '/images/parts/external-migrated/jmSrJSJ.jpg' },
              { name: 'Plane Wing', image: '/images/parts/external-migrated/QhYPqa9.jpg' },
            ],
          },
          {
            name: 'Headchopper set',
            locations: [
              { name: 'Saw Blade', image: '/images/parts/external-migrated/JHtfnAU.jpg' },
              { name: 'Lever', image: '/images/parts/external-migrated/Kcv21wo.jpg' },
              { name: 'Gears', image: '/images/parts/external-migrated/5al6GlD.jpg' },
              { name: 'Stand', image: '/images/parts/external-migrated/Yc576pe.jpg' },
            ],
          },
          {
            name: 'Subsurface Resonator set',
            locations: [
              { name: 'Roulette Wheel', image: '/images/parts/external-migrated/1sI2ctj.jpg' },
              { name: 'Card Table', image: '/images/parts/external-migrated/I24AsQa.jpg' },
              { name: 'Roulette Table', image: '/images/parts/external-migrated/0jYEDsK.jpg' },
              { name: 'Pipe', image: '/images/parts/external-migrated/GQXXKVq.jpg' },
            ],
          },
          {
            name: 'Trample Steam set',
            locations: [
              { name: 'Bellows', image: '/images/parts/external-migrated/2HHcTDB.jpg' },
              { name: 'Screen', image: '/images/parts/external-migrated/BeEOVH2.jpg' },
              { name: 'Compressor', image: '/images/parts/external-migrated/q9yEXAH.jpg' },
              { name: 'Flag', image: '/images/parts/external-migrated/nFWcmrr.jpg' },
            ],
          },
        ],
      },
      {
        name: 'Guillotine / Gallows (EE devices)',
        description:
          'Main-quest devices built at saloon exterior and church bench. Required for both Mined Games branches.',
        parts: [
          {
            name: 'Guillotine parts',
            locations: [
              { name: 'Satellite Dish', image: '/images/parts/external-migrated/tr3mN8K.jpg' },
              { name: 'Wire Spool', image: '/images/parts/external-migrated/cytbto5.jpg' },
              { name: 'Crystal', image: '/images/parts/external-migrated/06ZmPYw.jpg' },
              { name: 'Antennae', image: '/images/parts/external-migrated/VWiJkLT.jpg' },
            ],
          },
          {
            name: 'Gallows parts',
            locations: [
              { name: 'Bulb', image: '/images/parts/external-migrated/WqiZKmg.jpg' },
              { name: 'Battery', image: '/images/parts/external-migrated/ujLkmKt.jpg' },
              { name: 'Wire Spool', image: '/images/parts/external-migrated/cytbto5.jpg' },
              { name: 'Antennae', image: '/images/parts/external-migrated/VWiJkLT.jpg' },
            ],
          },
        ],
      },
    ],
    eeOverview:
      'Mined Games is the Buried branch quest. Richtofen path is fully documented and ends with target challenge + all-perk reward. Maxis-side guidance is community-documented in fragments, so run a checklist approach with strict role discipline. Optional super-EE trigger requires all Green Run map completions and navcard network setup.',
    eeSteps: [
      {
        num: 1,
        title: 'Core setup and Guillotine build',
        desc: 'Power on, open map with Arthur support, then build and collect Guillotine. This begins branch dialogue and orb phases.',
      },
      {
        num: 2,
        title: 'Richtofen orb and lantern sequence',
        desc: 'Charge four red orbs with Paralyzer, knock down lantern with grenade, then complete mistress kill and rooftop cipher steps.',
      },
      {
        num: 3,
        title: 'Mine sign logic, wisp path, and Time Bomb phase',
        desc: 'Solve mine sign hits from lantern cipher, escort visible wisp to Guillotine, kill charged zombies, then run Round Infinity switch retrieval with Time Bomb.',
      },
      {
        num: 4,
        title: 'Maze lever order and route-specific finish',
        desc: 'Solve maze lever order, command Arthur to break mansion fountain, then complete branch endpoint: Richtofen target test/all-perk payout or Maxis device-finalization sequence if your team committed to that side.',
      },
    ],
    strategies: [
      'Leroy control is the map\'s skill ceiling - keep resources reserved for key tasks.',
      'Paralyzer movement can bypass risk but also create overextension mistakes.',
      'Bank and wallbuy economy let you accelerate setup if coordinated.',
    ],
    customSections: [
      {
        id: 'buried-branch-matrix',
        title: 'Mined Games Branch Matrix',
        label: 'Field Manual — Quest Intel',
        items: [
          {
            title: 'Richtofen route (fully documented)',
            desc: 'Use Guillotine-centered orb flow, lantern cipher, mine sign order, Round Infinity switch recovery, then complete timed target challenge for completion and all perks.',
          },
          {
            title: 'Maxis route (source sparse)',
            desc: 'Treat as strict coordinated checklist: build/transport Gallows sequence, preserve role ownership, and avoid cross-route actions. Verify team method against a current community runbook before final attempt.',
          },
          {
            title: 'Super EE gate reminder',
            desc: 'Courthouse global button availability depends on consistent side completion across Tranzit + Die Rise + Buried and correct navcard table state.',
          },
        ],
      },
      {
        id: 'buried-arthur-and-fountain',
        title: 'Arthur and Fountain Mobility',
        label: 'Field Manual — Systems',
        items: [
          {
            title: 'Church fountain break',
            desc: 'Give Arthur booze with his back to the church fountain to crack it open and enable maze fountain transport logic.',
            image: '/images/parts/external-migrated/Y4qAHIb.jpg',
          },
          {
            title: 'Maze fountain portal',
            desc: 'Explosive-open maze fountain pit to activate one-way return portal to lower spawn.',
            image: '/images/parts/external-migrated/7ykBSOF.jpg',
          },
          {
            title: 'Paralyzer traversal',
            desc: 'Paralyzer can trivialize maze navigation by floating over hedge gates and reducing randomization pressure.',
          },
        ],
      },
      {
        id: 'buried-main-quest-richtofen',
        title: 'Richtofen Route References',
        label: 'Field Manual — Quest Intel',
        items: [
          {
            title: 'Mahjong direction helpers',
            desc: 'Mine sign order and direction puzzle references used during lantern cipher phase.',
            image: '/images/parts/external-migrated/9HWqCAF.jpg',
          },
          {
            title: 'Round Infinity switch rule',
            desc: 'Time Bomb sends team forward for 90 seconds - search all body spawns quickly, recover switch, and place it on Guillotine after returning.',
          },
          {
            title: 'Super EE optional gate',
            desc: 'Optional final courthouse button requires consistent-side completions of Tranzit + Die Rise + Buried and correct navcard table network state.',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual - Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/buried/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Leroy management, banking, and route shortcuts enable fast setup and objective control.',
          },
        ],
      },
    ],
  },

  'shadows-of-evil': {
    powerSteps: [
      'Power in SOE is district-based: use Beast Mode to zap fuse boxes next to each perk machine and key shortcuts.',
      'Open Beast shortcuts in Junction, Canals, Waterfront, Footlight, and Rift to massively reduce setup time.',
      'Keep one Beast charge available each round for utility (new gate, sword statues, or emergency revival route).',
    ],
    papLocation: 'Undercroft after all district rituals and gate unlock.',
    papSteps: [
      'Collect Summoning Key in spawn (break box in Beast Mode).',
      'Collect four ritual items and complete all four district rituals for Gateworms.',
      'In the Rift, enter Beast Mode and open the hidden chamber wall to expose ritual portal network.',
      'Place all four Gateworms in the central ritual room and complete final Pack-a-Punch ritual.',
    ],
    buildables: [
      {
        name: 'Rocket Shield',
        description:
          'SOE shield with rocket-boost attack. One of the most important survival tools in district rotations and boss prep.',
        parts: [
          {
            name: 'Waterfront set',
            locations: [
              { name: 'Small bridge outside waterfront perk room', image: '/images/parts/external-migrated/XRpUEeQ.png' },
              { name: 'Floor by Beast chalice in waterfront', image: '/images/parts/external-migrated/PRylQPu.png' },
              { name: 'Near window by waterfront lion-head room', image: '/images/parts/external-migrated/b5pawSi.png' },
            ],
          },
          {
            name: 'Footlight set',
            locations: [
              { name: 'Near footlight train stairs', image: '/images/parts/external-migrated/4yjoX7y.png' },
              { name: 'At upper walkway by footlight perk room', image: '/images/parts/external-migrated/UxVQ2gD.png' },
              { name: 'Near entrance staircase under Burlesque lane', image: '/images/parts/external-migrated/1SUf9fB.png' },
            ],
          },
          {
            name: 'Canals set',
            locations: [
              { name: 'Bridge between lion room and perk room', image: '/images/parts/external-migrated/XgwHjbE.png' },
              { name: 'Near Ruby Rabbit lane stairs', image: '/images/parts/external-migrated/NG90ZYq.png' },
              { name: 'Opposite canal perk room window', image: '/images/parts/external-migrated/KYOOnUR.png' },
            ],
          },
        ],
      },
      {
        name: 'Apothicon Servant',
        description:
          'Map wonder weapon built from three parts. Required for smooth high-round control and several EE phases.',
        parts: [
          {
            name: 'Apothicon Tentacle',
            locations: [{ name: 'Random drop from opening a purple/pink pod with Fumigator.' }],
          },
          {
            name: 'Xenomatter',
            locations: [{ name: 'Drop from Meatball enemies during special waves.' }],
          },
          {
            name: 'Margwa Heart',
            locations: [{ name: 'Guaranteed drop from a killed Margwa.' }],
          },
        ],
      },
    ],
    eeOverview:
      'Shadows quest flow: full ritual unlock, sword progression, flag escort cycle, Shadowman trap, then optional 4-player finale closeout.',
    eeSteps: [
      {
        num: 1,
        title: 'Unlock rituals and Pack-a-Punch',
        desc: 'Collect all ritual items, complete all district rituals, then perform the central ritual in the Rift to trigger apocalyptic skybox state.',
      },
      {
        num: 2,
        title: 'Sword and Keeper sword progression',
        desc: 'Reveal sword chamber, charge Arch-Ovum at four statue boxes, then complete red ritual circles and claim upgraded sword at your character ritual room.',
      },
      {
        num: 3,
        title: 'Flag escort sequence',
        desc: 'Begin flag rounds from Rift, protect the flag at lightning ritual spots in set order, and deliver charge to ritual tables across multiple cycles.',
      },
      {
        num: 4,
        title: 'Shadowman boss trap',
        desc: 'Start boss by activating all keepers in PaP room, break Shadowman shield with Summoning Key throws, and trap him in key at ritual altar. Four-player worm step is required for in-game completion gateworm icon.',
      },
    ],
    strategies: [
      'Beast-mode route planning saves multiple rounds in early setup.',
      'Civil Protector and sword upgrades reduce revive-risk in late midgame.',
      'Keep one player focused on objective pathing while others stabilize waves.',
    ],
    customSections: [
      {
        id: 'beast-shortcuts',
        title: 'Beast Shortcut Power Route',
        label: 'Field Manual — Early Setup',
        items: [
          {
            title: 'Junction to Nero loft stairs',
            desc: 'Grapple to Nero loft and zap fuse to permanently open spawn-to-Nero stairs.',
            image: '/images/parts/external-migrated/YhH2Ywj.png',
          },
          {
            title: 'Canals staircase fuse',
            desc: 'Use Canals grapple path and zap the fuse in red room route to unlock that staircase.',
            image: '/images/parts/external-migrated/jUnJuDK.png',
          },
          {
            title: 'Waterfront staircase fuse',
            desc: 'Grapple up in Waterfront and zap roof-side fuse to unlock fast staircase route.',
            image: '/images/parts/external-migrated/ErNmr5e.png',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual - Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/shadows-of-evil/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Beast-mode optimization, district rituals, and sword progression drive the full setup.',
          },
        ],
      },
    ],
  },

  'the-giant': {
    powerSteps: [
      'Open from spawn toward central power switch room and activate it (free action).',
      'After power, lower side barricades and use full circular route for safer training transitions.',
    ],
    papLocation: 'Teleporter destination room (Der Riese flow).',
    papSteps: [
      'Activate each teleporter (A, B, C) and run back to mainframe to complete each link within timer.',
      'After all three links, the mainframe pod opens permanently for Pack-a-Punch access.',
      'Track link status by checking the three bulbs on top of the pod.',
    ],
    eeOverview:
      'The Giant main quest (Fly Trap) is short: Pack-a-Punch setup, hidden panel trigger, three hidden object shots, then Annihilator reward.',
    eeSteps: [
      {
        num: 1,
        title: 'Get Pack-a-Punch online',
        desc: 'Turn on power, link all teleporters, and upgrade any weapon so you can trigger Fly Trap panel with PaP firepower.',
      },
      {
        num: 2,
        title: 'Activate hidden control panel',
        desc: 'At L-CAR 9 lane, shoot the far hidden panel in the zombie barrier background until it confirms with audio cue and object lift animation.',
      },
      {
        num: 3,
        title: 'Shoot three hidden objects',
        desc: 'Hit hidden monkey/teddy targets in Teleporter A furnace, power-side balcony exterior, and Teleporter C cauldron area.',
      },
      {
        num: 4,
        title: 'Claim Annihilator',
        desc: 'Go to furnace room behind VMP path and collect Annihilator pistol reward for all qualified players.',
      },
    ],
    strategies: [
      'Catwalk remains reliable for low-mid rounds and team rhythm.',
      'Use teleporter cycles as panic breaks when trap windows close.',
      'Wunderwaffe and trap rotation together extend ammo efficiency.',
    ],
    customSections: [
      {
        id: 'giant-specials',
        title: 'Special Equipment Notes',
        label: 'Field Manual — Weapons',
        items: [
          {
            title: 'Wunderwaffe DG-2',
            desc: 'Box-only wonder weapon on The Giant. Extreme crowd clear and chain-kill control.',
          },
          {
            title: 'Annihilator pistol',
            desc: 'Earned from Fly Trap quest; does not consume a normal weapon slot and offers high precision damage.',
          },
          {
            title: 'Sixth Perk mini EE',
            desc: 'Throw monkeys into each teleporter before warp to turn all panel lights green, then activate mainframe panel for random sixth perk spawn.',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual - Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/the-giant/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Classic Der Riese pacing with teleporter cycles and trap-supported high rounds.',
          },
        ],
      },
    ],
  },

  'zetsubou-no-shima': {
    powerSteps: [
      'Turn on temporary power in both Lab A and Lab B first to unlock bunker progression.',
      'In bunker power room, clear webs on underwater vent, survive lockdown, and claim permanent power activation.',
      'Use bucket water loops (blue/green/purple/rainbow) to support plant growth and quest gating.',
    ],
    papLocation: 'Bunker route after power and map-system progression.',
    papSteps: [
      'Collect three underwater/cocoon parts in bunker sections 1, 2, and 3.',
      'Interact with all three white drain points around the PaP pool in bunker center.',
      'Pool drains permanently, gate opens, and Pack-a-Punch remains available for the match.',
    ],
    buildables: [
      {
        name: 'Gas Mask',
        description:
          'Essential utility against spore gas and long underwater segments; strongly recommended before late setup and EE cogs.',
        parts: [
          {
            name: 'Lab B area part',
            locations: [
              { name: 'Behind Lab B near sewer exit and green water lane (including ICR stairs side).' },
            ],
          },
          {
            name: 'Plane area part',
            locations: [{ name: 'Around plane/propeller trap zone near box spawn.' }],
          },
          {
            name: 'Docks part',
            locations: [{ name: 'Under bunker in docks/zipline-challenge statue area.' }],
          },
        ],
      },
      {
        name: 'Zombie Shield (and Electrified Shield)',
        description:
          'Base shield provides back protection; electrified upgrade is needed for multiple Easter Egg steps and price-zap utility.',
        parts: [
          {
            name: 'Bunker piece',
            locations: [{ name: 'Right section immediately after entering main bunker door (1250 side room).' }],
          },
          {
            name: 'Lab B exterior piece',
            locations: [{ name: 'Tree/stubble near Lab B staircase from spawn side.' }],
          },
          {
            name: 'Lab A lower piece',
            locations: [{ name: 'Wall area near Kuda under Lab A lane.' }],
          },
        ],
      },
      {
        name: 'KT-4 / Masamune',
        description:
          'Map wonder weapon chain and upgrade path. KT-4 is required for web clearing; Masamune is required for full main quest completion.',
        parts: [
          {
            name: 'KT-4 core parts',
            locations: [
              { name: 'Spider venom extraction (Lab A cage control).' },
              { name: 'Glowing zombie drop near green water lane.' },
              { name: 'Underwater plant pickup near Mule Kick cave route.' },
            ],
          },
          {
            name: 'Masamune upgrades',
            locations: [
              { name: 'Spider boss tooth (from giant spider corpse).' },
              { name: 'Skeleton vial (Lab B cage lowered with Electrified Shield).' },
              { name: 'Rainbow-water plant growth part via hidden wall seed cycle.' },
            ],
          },
        ],
      },
    ],
    eeOverview:
      'Zetsubou quest chain combines Skull ritual, KT-4 to Masamune upgrade, cog retrieval, elevator gas section, and final boss sequence.',
    eeSteps: [
      {
        num: 1,
        title: 'Core setup and poster mesmerize',
        desc: 'Activate permanent power, open bunker, build KT-4 and Gas Mask, then mesmerize cocoon-room plans and hidden elevator door.',
      },
      {
        num: 2,
        title: 'Collect all three elevator cogs',
        desc: 'Get zipline cog, Anywhere But Here cog, and plane-shot cog from blue-water fertilized plant shell sequence.',
      },
      {
        num: 3,
        title: 'Upgrade to Masamune and descend elevator',
        desc: 'Complete spider boss and shield-based upgrade tasks, craft Masamune, then ride gas elevator with mask and survive lower challenge room.',
      },
      {
        num: 4,
        title: 'Boss and final challenge closeout',
        desc: 'Finish scripted final interaction chain and complete boss phase to resolve quest ending sequence.',
      },
    ],
    strategies: [
      'KT-4 progression should be an early objective, not a late rescue plan.',
      'Use artillery and spider rounds for controlled resource swings.',
      'Plant utility can replace raw firepower if managed each round.',
    ],
    customSections: [
      {
        id: 'zns-map-and-water',
        title: 'Water and Plant System Anchors',
        label: 'Field Manual — Systems',
        items: [
          {
            title: 'Full map reference',
            desc: 'Detailed community map showing power, buildables, and bunker sectors.',
            image: '/images/parts/external-migrated/KjyUIGY.jpg',
          },
          {
            title: 'Water types',
            desc: 'Blue (Lab A cave), Green (Lab B lower), Purple (bunker lower), Rainbow (sewer passage). Correct water sequencing controls plant outcomes.',
          },
          {
            title: 'Electrified Shield utility',
            desc: 'Required for multiple EE steps and can discount shocked machines/perks while adding defensive kill value.',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual - Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/zetsubou-no-shima/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Plant growth, KT-4 progression, and utility-lab loops are central mechanics.',
          },
        ],
      },
    ],
  },

  'gorod-krovi': {
    powerSteps: [
      'Open to Dragon Command and flip power switch near map console.',
      'Maintain routes between Dragon Command, Supply Depot, Tank Factory, and Infirmary for objective travel.',
    ],
    papLocation: 'Dragon command network route after objective unlocks.',
    papSteps: [
      'Build Dragon Network Controller by defending three Groph Modules (blue/red/yellow cylinders).',
      'Install controller in Operations Bunker machine.',
      'Call dragon flight to Hatchery for 500 and access Pack-a-Punch area consistently.',
    ],
    buildables: [
      {
        name: 'Dragon Shield',
        description:
          'GK shield with high-value fire blast. One-shots Manglers/Valkyries and carries many lockdown phases.',
        parts: [
          {
            name: 'Head piece',
            locations: [
              { name: 'Infirmary middle floor shelf (Finger Trap room).' },
              { name: 'Infirmary top floor left of Stamin-Up.' },
              { name: 'Broken floor rubble from Operations to Infirmary.' },
            ],
          },
          {
            name: 'Heart piece',
            locations: [
              { name: 'Juggernog room chair.' },
              { name: 'Truck near Operations approach.' },
              { name: 'Operations shelf left of entrance.' },
            ],
          },
          {
            name: 'Mouth piece',
            locations: [
              { name: 'Top Armory wall by 500 bridge.' },
              { name: 'Armory middle floor by crashed bus walkway.' },
              { name: 'Rubble below Armory by Wunderfizz lane.' },
            ],
          },
        ],
      },
      {
        name: 'Dragon Network Controller',
        description:
          'Three-cylinder build that enables dragon travel to Hatchery and power-up module calls.',
        parts: [
          {
            name: 'Blue Cylinder',
            locations: [{ name: 'Dragon Command Groph Module defense reward.' }],
          },
          {
            name: 'Red Cylinder',
            locations: [{ name: 'Tank Factory Groph Module defense reward.' }],
          },
          {
            name: 'Yellow Cylinder',
            locations: [{ name: 'Supply Depot Groph Module defense reward.' }],
          },
        ],
      },
      {
        name: 'Gauntlet of Siegfried',
        description:
          'Specialist weapon unlocked through dragon egg trials. Mandatory for full main quest flow.',
        parts: [
          {
            name: 'Dragon Egg chain',
            locations: [
              { name: 'Shoot egg down at Hatchery roof and incubate through trial stages.' },
              { name: 'Complete Napalm kills, penetrating multi-kills, and melee kills.' },
              { name: 'Claim Gauntlet from trial gravestone in spawn.' },
            ],
          },
        ],
      },
    ],
    eeOverview:
      'My Brother\'s Keeper: power and Gauntlet setup, SOPHIA multi-task sequence, lock-down downloads, then dragon + Nikolai boss fights.',
    eeSteps: [
      {
        num: 1,
        title: 'Power, Hatchery generator, and Gauntlet setup',
        desc: 'Turn on power in Dragon Command, charge Hatchery generator with Valkyrie kill, then obtain Gauntlet of Siegfried and open full map.',
      },
      {
        num: 2,
        title: 'SOPHIA tasks',
        desc: 'Complete randomized SOPHIA tasks: bomb defuse, Valkyrie escort, Mangler escort, Gersch escort/capture, and lockdown server download.',
      },
      {
        num: 3,
        title: 'Power core and bunker descent',
        desc: 'Use specialist dragon activation in spawn to carry power core sequence, return to SOPHIA, then descend through opened sewer gate to boss arena.',
      },
      {
        num: 4,
        title: 'Dragon + Nikolai boss finale',
        desc: 'Defeat dragon encounter first, then final Nikolai phase to trigger end cutscene and quest completion.',
      },
    ],
    strategies: [
      'GKZ-45 setup plus anti-special-zombie loadout is non-negotiable.',
      'Call out Valkyrie paths early to avoid silent objective failures.',
      'Use shield and trap loops to preserve ammo for objective rounds.',
    ],
    customSections: [
      {
        id: 'gk-valve-step',
        title: 'Valve Step Quick Intel',
        label: 'Field Manual — Quest Intel',
        items: [
          {
            title: 'Valve reference sheet',
            desc: 'Use this valve relation table image as a solve helper mid-run.',
            image: '/images/parts/external-migrated/RLE9Z0f.png',
          },
          {
            title: 'Task pacing rule',
            desc: 'Between SOPHIA tasks, always reactivate SOPHIA/map terminal if the indicator is green to advance script state.',
          },
          {
            title: 'Lockdown survival anchor',
            desc: 'Top Hatchery entry floor has safest pressure pattern; combined MK3 shots plus shield fire trivialize Mangler-only lockdown waves.',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual - Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/gorod-krovi/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Dragon command systems, Valkyrie/Mangler control, and shield timing anchor consistency.',
          },
        ],
      },
    ],
  },

  'revelations': {
    powerSteps: [
      'Open major portals from spawn to branch zones (Origins, Shangri-La, Verruckt, Mob, Kino, DE).',
      'Activate all four Corruption Engines on the power grid to stabilize full-map systems.',
    ],
    papLocation: 'Nacht teleporter room after unlocking required corruption engines.',
    papSteps: [
      'Activate all four Corruption Engines (Spawn, DE side, Mob side, Verruckt side).',
      'At Nacht top floor control panel, wait for Apothicon fly-by and trigger Tesla beacons.',
      'Enter trapped Apothicon mouth, shoot internal restraints, and drop Pack-a-Punch into active state.',
    ],
    buildables: [
      {
        name: 'Dragon Shield',
        description:
          'Revelations keeps the shield loop from prior maps with mixed-zone part locations and anti-gravity dependency for DE piece.',
        parts: [
          {
            name: 'Head piece (Origins)',
            locations: [
              { name: 'Wall left of spawn jump pad in Origins.' },
              { name: 'Box near KRM-262 in Origins.' },
              { name: 'Chair near lower-right Origins door.' },
            ],
          },
          {
            name: 'Heart piece (Verruckt)',
            locations: [
              { name: 'Top-floor counter in Verruckt.' },
              { name: 'Near ZNS-style tubes in Verruckt.' },
              { name: 'Chair after upper stairs in Verruckt.' },
            ],
          },
          {
            name: 'Mouth piece (DE anti-gravity)',
            locations: [
              { name: 'Wall above DE PaP/wolf area during anti-gravity.' },
              { name: 'Panel above pyramid room during anti-gravity.' },
              { name: 'Wall between DE and Kino portals during anti-gravity.' },
            ],
          },
        ],
      },
      {
        name: 'Keeper Protector',
        description:
          'Buildable ally summoned from four altar locations. Required for main EE progression in Revelations.',
        parts: [
          {
            name: 'Altar parts',
            locations: [
              { name: 'One piece in each region set; build at one of four Keeper Protector altars around the map.' },
            ],
          },
        ],
      },
    ],
    eeOverview:
      'Revelations main quest: prep essentials (Apothicon Servant, Arnies, Keeper Protector), run symbol/egg/rune chains, then complete Sophia shield break and Kronorium finish.',
    eeSteps: [
      {
        num: 1,
        title: 'Complete prep requirements',
        desc: 'Before main steps, ensure power + PaP active, build Keeper Protector, get Lil Arnies, and secure upgraded Apothicon Servant path readiness.',
      },
      {
        num: 2,
        title: 'Run gravestone and reel chains',
        desc: 'Shoot spawn gravestones in order, complete reel interactions, and finish key Summoning Key objective interactions around map and Apothicon interior.',
      },
      {
        num: 3,
        title: 'Gateworm eggs and rune of creation cycle',
        desc: 'Find/fill eggs with souls, use gateworm sonar placement to claim four runes, then resolve projector-room script transition.',
      },
      {
        num: 4,
        title: 'Sophia boss closeout',
        desc: 'Charge Summoning Key at fountains, throw to break Sophia shield, fire Shadowman into Apothicon mouth, then interact with Kronorium to finish.',
      },
    ],
    strategies: [
      'Apothicon Servant remains your strongest crowd-control anchor.',
      'Memorize jump-pad lanes for safe, no-mud/no-trap rotations.',
      'Run objective steps during stable rounds to avoid forced clutch fights.',
    ],
    customSections: [
      {
        id: 'revelations-pap-grid',
        title: 'Corruption Engine and PaP Control',
        label: 'Field Manual — Systems',
        items: [
          {
            title: 'Engine locations',
            desc: 'Spawn, DE lane, Mob lane, and Verruckt lane engines must all be completed for PaP unlock flow.',
          },
          {
            title: 'Nacht panel timing',
            desc: 'After all engines are done, activate Tesla panel only when Apothicon fly-by happens to lock mouth access.',
          },
          {
            title: 'Anti-gravity utility',
            desc: 'DE anti-gravity is needed for several side mechanics including some shield part spawns and movement shortcuts.',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual - Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/revelations/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Corruption engine activation and jump-pad route memory are key to clean objective flow.',
          },
        ],
      },
    ],
  },

  'ix': {
    powerSteps: [
      'Open each temple lane (Ra, Danu, Zeus, Odin) and clear paths to every altar room.',
      'Trigger each temple gong and kill the champion that spawns to collect the ritual head.',
      'Deposit all four heads at the Temple altar to complete core setup and unlock full map tempo.',
    ],
    papLocation: 'Temple center altar, unlocked by placing all four champion heads.',
    buildables: [
      {
        name: 'Brazen Bull (Shield)',
        description: 'Primary survivability item for IX. Strong melee utility and critical for Iron Bull upgrade steps.',
        parts: [
          {
            name: 'Part 1 (Ra side)',
            locations: [
              { name: 'Ra Altar Room spawn.', image: '/images/parts/external-migrated/pRcp55H.jpg' },
              { name: 'Ra Altar Room alternate spawn.', image: '/images/parts/external-migrated/febH4rt.jpg' },
            ],
          },
          {
            name: 'Part 2 (Zeus side)',
            locations: [
              { name: 'Zeus Altar Room.', image: '/images/parts/external-migrated/aVwJwbM.jpg' },
              { name: 'Zeus Tower Entrance / Bath area.', image: '/images/parts/external-migrated/jRTN9ZZ.jpg' },
            ],
          },
          {
            name: 'Part 3 (Odin side)',
            locations: [
              { name: 'Odin Altar Room.', image: '/images/parts/external-migrated/ieN5Bcb.jpg' },
              { name: 'Odin Tower Cauldron.', image: '/images/parts/external-migrated/mC0R5Xj.jpg' },
            ],
          },
        ],
      },
      {
        name: 'Acid Trap',
        description: 'Needed for Scorpion Key route and high-round objective control.',
        parts: [
          {
            name: 'Core part route',
            locations: [
              { name: 'Trap grate used in Scorpion Key chain.', image: '/images/parts/external-migrated/n4Hlg2w.jpg' },
              { name: 'Crowd jar reward marker after max affinity round.', image: '/images/parts/external-migrated/DTFElcf.jpg' },
            ],
          },
        ],
      },
    ],
    eeOverview:
      'IX is a long ritual chain built around Death of Orion progression, affinity manipulation, challenge phases, and a two-elephant boss finale.',
    eeSteps: [
      {
        num: 1,
        title: 'Open map and unlock PaP',
        desc: 'Open all four temple lanes, run gongs/champions, and place the heads to unlock Pack-a-Punch.',
      },
      {
        num: 2,
        title: 'Build wonder-weapon chain',
        desc: 'Acquire Death of Orion, process grinder/cauldron/fertilizer chain, and complete Danu underworld pod phases.',
      },
      {
        num: 3,
        title: 'Run challenge gauntlet',
        desc: 'Complete skull/champion/obelisk/symbol rooms in order while controlling special zombie spawns.',
      },
      {
        num: 4,
        title: 'Complete arena charge steps',
        desc: 'Raise underground poles and finish the Arena electric-circle phase using Kill-O-Watt stun kills.',
      },
      {
        num: 5,
        title: 'Finish Fury and Wrath',
        desc: 'Enter the red portal and defeat both elephant phases by stripping armor and focusing face damage windows.',
      },
    ],
    strategies: [
      'Treat arena and bridge as your two safest reset loops; do not trap yourself in narrow altar stairs during specials.',
      'Assign each player one temple side for faster head collection and cleaner challenge callouts.',
      'Use Serket and shield shots for revive windows, not random clear, then save specialist for underworld forced-fight steps.',
      'Control crowd affinity intentionally: max affinity for rewards, bad affinity only when a quest step needs it.',
    ],
    customSections: [
      {
        id: 'death-of-orion',
        title: 'Death of Orion Chain',
        label: 'Field Manual - Wonder Weapon',
        items: [
          {
            title: 'Skull interaction start',
            desc: 'Locate and collect the marked skull in Temple to begin the weapon chain.',
            image: '/images/parts/external-migrated/aoILsEZ.png',
          },
          {
            title: 'Grinder step',
            desc: 'Use Death of Orion charged shots on the Flooded Crypt grinder, then collect bone mesh output.',
            image: '/images/parts/external-migrated/RdGmf1y.jpg',
          },
        ],
      },
      {
        id: 'ritual-checks',
        title: 'Ritual and Challenge Checks',
        label: 'Field Manual - Main Quest',
        items: [
          {
            title: 'Fertilizer bowl placement',
            desc: 'Place bone mesh, charcoal, and crowd item in Zeus bowl to advance the growth chain.',
            image: '/images/parts/external-migrated/mUHpprZ.jpg',
          },
          {
            title: 'Ra obelisk symbol logic',
            desc: 'Watch the obelisk flash order and kill only the required special zombie type sequence.',
            image: '/images/parts/external-migrated/kx47Mns.png',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual — Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/ix/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Temple trial cadence and arena special-round handling are the map\'s tempo checks.',
          },
        ],
      },
    ],
  },

  'voyage-of-despair': {
    powerSteps: [
      'Open lower deck lanes quickly: Turbine, Boiler, Cargo, and Engine routes are your quest backbone.',
      'Drain water in Cargo Hold and Boiler Room early so late-round rotations are not movement-locked.',
      'Unlock all fast-travel links you actually use; they save failed runs during long code phases.',
    ],
    papLocation: 'Accessible after activating all four PaP pedestals around the ship.',
    papSteps: [
      'Activate the four Pack-a-Punch pedestals in Cargo Hold, Turbine Room, Poop Deck, and Lower Grand Staircase.',
      'Use the rotating PaP spawn safely by pre-clearing nearby stairs and door lanes before interacting.',
    ],
    buildables: [
      {
        name: 'Ballistic Shield',
        description: 'Essential for Titanic corridors, revives, and close-quarters objective holdouts.',
        parts: [
          {
            name: 'Part 1 (State Rooms)',
            locations: [
              { name: 'State Rooms spawn 1.', image: '/images/parts/external-migrated/IMzTggh.jpg' },
              { name: 'State Rooms spawn 2.', image: '/images/parts/external-migrated/EGp2VpK.jpg' },
            ],
          },
          {
            name: 'Part 2 (Provisions / 3rd Class)',
            locations: [
              { name: 'Provisions spawn.', image: '/images/parts/external-migrated/6I1LEWm.jpg' },
              { name: '3rd Class Berths spawn.', image: '/images/parts/external-migrated/J6mAalj.jpg' },
            ],
          },
          {
            name: 'Part 3 (Bridge)',
            locations: [
              { name: 'Bridge spawn 1.', image: '/images/parts/external-migrated/hAcifDS.jpg' },
              { name: 'Bridge spawn 2.', image: '/images/parts/external-migrated/mBG7Gtt.jpg' },
            ],
          },
        ],
      },
    ],
    eeOverview:
      'Voyage of Despair is a code-heavy elemental quest with strict symbol memory, catalyst management, and ship-wide movement checks.',
    eeSteps: [
      {
        num: 1,
        title: 'Open and stabilize ship',
        desc: 'Open all core decks, drain water, and activate PaP before touching advanced code steps.',
      },
      {
        num: 2,
        title: 'Run clock and symbol logic',
        desc: 'Read changed clocks, map elemental symbols, and process dial logic while maintaining a controlled zombie.',
      },
      {
        num: 3,
        title: 'Complete planet and outlet phases',
        desc: 'Run planet interactions and element-matched catalyst outlet kills in sequence with clear team callouts.',
      },
      {
        num: 4,
        title: 'Execute artifact finale',
        desc: 'Move the Sentinel sequence into final combat and finish the boss encounter with disciplined movement through stair funnels.',
      },
    ],
    strategies: [
      'Never perform code logic while two or more players are split in dead-end rooms; ship geometry punishes bad exits.',
      'Assign one caller for symbols and one recorder for clocks/planets to avoid memory desyncs.',
      'Use Kraken shots and specialists for stair resets, not routine kills in open corridors.',
      'Catalyst kills must match required element steps exactly; avoid random catalyst bursts near objective outlets.',
    ],
    customSections: [
      {
        id: 'pap-pedestals',
        title: 'Pack-a-Punch Pedestals',
        label: 'Field Manual - Setup',
        items: [
          {
            title: 'Cargo Hold pedestal',
            desc: 'Pedestal location for one of four required activations.',
            image: '/images/parts/external-migrated/iaHOvoU.jpg',
          },
          {
            title: 'Turbine / Poop Deck / Stair pedestal route',
            desc: 'Finish all four pedestal activations before beginning long quest chains.',
            image: '/images/parts/external-migrated/Hbl3eDO.jpg',
          },
        ],
      },
      {
        id: 'kraken-workflow',
        title: 'Kraken Workflow',
        label: 'Field Manual - Wonder Weapon',
        items: [
          {
            title: 'Chest phase examples',
            desc: 'Use stoker key chest locations to spawn Kraken safely while one player holds the zombie.',
            image: '/images/parts/external-migrated/5nAXh9G.jpg',
          },
          {
            title: 'Elemental upgrade path',
            desc: 'Collect kit parts and convert Kraken based on your squad needs (control vs burst).',
            image: '/images/parts/external-migrated/1tK5C15.jpg',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual — Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/voyage-of-despair/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Deck routing, catalyst control, and tight chokepoint recovery are critical.',
          },
        ],
      },
    ],
  },

  'blood-of-the-dead': {
    powerSteps: [
      'Open prison loops toward Power House and Building 64 to turn on both sides of power.',
      'Route through Catwalk to Docks/Warden sectors so mid-quest rotations stay connected.',
      'Build Spectral Shield as early as possible, because both PaP and core quest checks depend on it.',
    ],
    papLocation: 'Moves between Roof, Power House, and Building 64 after Spectral unlock.',
    papSteps: [
      'Craft Spectral Shield and absorb three souls with the key attack.',
      'Go to Roof and Spirit Blast the power box near the electric chair to summon Pack-a-Punch.',
      'Track rotating PaP position each cycle (Roof, Power House, Building 64).',
    ],
    buildables: [
      {
        name: 'Spectral Shield',
        description: 'Most important utility on Blood - enables PaP, quest checks, spirit vision, and emergency blasts.',
        parts: [
          {
            name: 'Essence part',
            locations: [
              { name: 'Power-box spawn example.', image: '/images/parts/external-migrated/t8gwb4R.jpg' },
              { name: 'Michigan Avenue / Library / Times Square variants.', image: '/images/parts/external-migrated/FqMDuyN.jpg' },
            ],
          },
          {
            name: 'Door part',
            locations: [
              { name: 'China Alley spawn.', image: '/images/parts/external-migrated/GcWhvYq.jpg' },
              { name: 'Citadel Tunnels spawn.', image: '/images/parts/external-migrated/UhC2iHg.jpg' },
            ],
          },
          {
            name: 'Key part',
            locations: [
              { name: 'Dropped by first Warden kill.', image: '/images/parts/external-migrated/Krijchp.jpg' },
            ],
          },
        ],
      },
      {
        name: 'Spectral Shield',
        description: 'Three-part buildable essential for the main quest and late-round survival. The Spiritual Essence and Shield Plate are random spawns; the Warden\'s Key is dropped by Brutus on his first appearance.',
        parts: [
          {
            name: 'Spiritual Essence (glowing orb on a fuse box)',
            locations: [
              {
                name: 'Times Square — outside the Cafeteria, next to the staircase down to the Showers. The Auger DMR wall-buy is right beside it.',
                image: 'https://www.powerpyx.com/wp-content/uploads/Snapshot_20181012_004436-1024x580.jpg',
              },
              {
                name: 'Michigan Avenue — right outside the Warden\'s Office door.',
                image: 'https://www.powerpyx.com/wp-content/uploads/Snapshot_20181011_235653-1024x580.jpg',
              },
              {
                name: 'Library — next to the entrance on the left-hand wall.',
                image: 'https://www.powerpyx.com/wp-content/uploads/Snapshot_20181012_002046-1024x580.jpg',
              },
            ],
          },
          {
            name: 'Shield Plate (physical panel)',
            locations: [
              {
                name: 'Citadel Tunnels — behind one of the corrugated iron walls mid-tunnel while walking downhill.',
                image: 'https://www.powerpyx.com/wp-content/uploads/cod-bo4-blood-of-the-dead-pack-a-punch-shield-location-1.jpg',
              },
              {
                name: 'Citadel Tunnels exit — at the very bottom; turn left as you exit the tunnel.',
                image: 'https://www.powerpyx.com/wp-content/uploads/cod-bo4-blood-of-the-dead-pack-a-punch-shield-location-2.jpg',
              },
              {
                name: 'Outside the second power room (Building 64 side), leaning against the wall near the Citadel Tunnels exit.',
                image: 'https://www.powerpyx.com/wp-content/uploads/Snapshot_20181011_235516-1024x580.jpg',
              },
            ],
          },
          {
            name: 'Warden\'s Electric Key',
            locations: [
              {
                name: 'Dropped by Brutus (The Warden) on his first appearance — he spawns automatically after you activate the Building 64 power switch, or naturally around rounds 6–8.',
              },
            ],
          },
        ],
      },
    ],
    eeOverview:
      'Blood is a high-density quest of Spectral checks, code challenge rooms, escort pressure, and a punishing multi-phase finale.',
    eeSteps: [
      {
        num: 1,
        title: 'Open prison and full setup',
        desc: 'Turn on both power switches, build Spectral Shield, unlock PaP, and secure loops through Docks/New Industries.',
      },
      {
        num: 2,
        title: 'Run investigation sequence',
        desc: 'Complete bird hunts, code interactions, and spirit-vision checks in strict order while preserving one zombie.',
      },
      {
        num: 3,
        title: 'Complete challenge rooms',
        desc: 'Finish all challenge checks (including symbol and Simon-style logic) before advancing to post-prison sequences.',
      },
      {
        num: 4,
        title: 'Run escort and final prep',
        desc: 'Complete escort pressure segments and lock in loadouts for the end encounter.',
      },
      {
        num: 5,
        title: 'Finish final encounter',
        desc: 'Close the final sequence cleanly with shield timing and controlled crowding in narrow prison routes.',
      },
    ],
    strategies: [
      'Magmagat plus Spectral Shield is the safest late-round combo for Blood quest consistency.',
      'Do all code-heavy steps with one designated zombie holder and one caller to avoid failed repeats.',
      'Plan catwalk and New Industries transitions before starting each major objective branch.',
      'Shield blasts are best reserved for revive corridors and challenge-room emergency clears.',
    ],
    customSections: [
      {
        id: 'spectral-shield',
        title: 'Spectral Shield Ops',
        label: 'Field Manual - Equipment',
        items: [
          {
            title: 'Essence spawn example',
            desc: 'Power-box locations change each game - verify and call out immediately during setup.',
            image: '/images/parts/external-migrated/t8gwb4R.jpg',
          },
          {
            title: 'Free recharge point',
            desc: 'Use sparking power boxes once per round for key refill instead of wasting full replacements.',
            image: '/images/parts/external-migrated/npT37RO.jpg',
          },
        ],
      },
      {
        id: 'magmagat-priority',
        title: 'Magmagat Priority',
        label: 'Field Manual - Wonder Weapon',
        items: [
          {
            title: 'Forge path anchor',
            desc: 'Place Tempered Blundergat into the New Industries press to finish Magmagat forge step.',
            image: '/images/parts/external-migrated/7B4tlvg.jpg',
          },
          {
            title: 'Barrel transfer route',
            desc: 'Follow blue-flame barrel order quickly; route mistakes add multiple rounds of delay.',
            image: '/images/parts/external-migrated/LVgsmlw.jpg',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual — Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/blood-of-the-dead/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Spectral shield routing, Magmagat progression, and dense quest chains dominate setup.',
          },
        ],
      },
    ],
  },

  'dead-of-the-night': {
    powerSteps: [
      'Spawn starts split by a barrier on the North Atrium Bridge. Push either side to the Grand Staircase.',
      'Activate the Sentinel Artifact on the Grand Staircase to open red barriers and unify route access.',
      'Once Artifact is active, prioritize opening Main Hall connectors: East Hallway, West Hallway, Wine Cellar, and Forest Terrace.',
      'Bring online your utility loop early: Shield table (Smoking Room), Silver Melter (Wine Cellar), and Silver Bullet station (Library).',
    ],
    papLocation: 'Forest end-path, unlocked by the Tuning Fork gate from Forest Terrace.',
    papSteps: [
      'Activate the Sentinel Artifact on the Grand Staircase.',
      'Find and melee three smoke-emitting vases to reveal purple, blue, and green stones.',
      'For each stone, kill four nearby zombies to charge it, then interact to reveal the linked object task.',
      'Complete three object tasks (clock/perk statue/ghost-object variants) to earn three Tuning Forks.',
      'Go to Forest Terrace and interact with the blocked gate using the collected Tuning Forks.',
      'Enter the Forest (first opening spawns a werewolf), then move to the far end to use Pack-a-Punch.',
    ],
    buildables: [
      {
        name: 'Ballistic Shield',
        description:
          'Three-part shield built at the Smoking Room table. Core survivability tool for hallway revives and objective steps.',
        parts: [
          {
            name: 'Part 1',
            locations: [
              { name: 'East Balcony, left of Saug wall-buy.', image: '/images/parts/external-migrated/R9qEWBw.png' },
              { name: 'Grand Staircase, leaning on pillar.', image: '/images/parts/external-migrated/dotnshield1.webp' },
              { name: 'West Balcony, against stained glass.', image: '/images/parts/external-migrated/piMPkGq.png' },
            ],
          },
          {
            name: 'Part 2',
            locations: [
              { name: 'Study, on table.', image: '/images/parts/external-migrated/WNh6dau.png' },
              { name: 'Library, on couch.', image: '/images/parts/external-migrated/czbxLvv.png' },
              { name: 'Library, broken shelf.', image: '/images/parts/external-migrated/o41MvC7.png' },
            ],
          },
          {
            name: 'Part 3',
            locations: [
              { name: 'East Hallway, on chair.', image: '/images/parts/external-migrated/O9D5M6j.png' },
              { name: 'Dining Room, right of SwordFish wall-buy.', image: '/images/parts/external-migrated/dotnshield1.webp' },
              { name: 'Dining Room, shelf left of staircase.', image: '/images/parts/external-migrated/roI4DS8.jpg' },
            ],
          },
        ],
      },
      {
        name: 'Silver Bullets',
        description:
          'Multi-part silver crafting chain that hard-counters werewolves and gates several main-quest steps.',
        parts: [
          {
            name: 'Candlestick',
            locations: [
              { name: 'Entrance Hall, round table.', image: '/images/parts/external-migrated/flpXGoC.png' },
              { name: 'Billiards Room, fireplace floor.', image: '/images/parts/external-migrated/IXvtzOU.png' },
              { name: 'Main Hall, near Mozu wall-buy.', image: '/images/parts/external-migrated/eHXZZmT.png' },
            ],
          },
          {
            name: 'Trophy / Pot',
            locations: [
              { name: 'Dining Room, red table opposite clock.', image: '/images/parts/external-migrated/ora657N.png' },
              { name: 'West Hallway, near sofa.', image: '/images/parts/external-migrated/kMzTfZZ.png' },
              { name: 'Dining Room, corner of large table.', image: '/images/parts/external-migrated/gl4MguS.png' },
            ],
          },
          {
            name: 'Silver Plate',
            locations: [
              { name: 'Wine Cellar, wall near vase.', image: '/images/parts/external-migrated/Au4swel.png' },
              { name: 'Wine Cellar, shelf opposite workbench.', image: '/images/parts/external-migrated/pFK31wJ.png' },
              { name: 'Wine Cellar, wooden table near noose.', image: '/images/parts/external-migrated/WfU9O1L.png' },
            ],
          },
          {
            name: 'Gunpowder (Guano / Charcoal / Sulfur)',
            locations: [
              { name: 'Guano route examples near Mausoleum/Cemetery paths.', image: '/images/parts/external-migrated/ZwzxYba.png' },
              { name: 'Charcoal route examples in manor fireplaces.', image: '/images/parts/external-migrated/vCoIt4Z.png' },
              { name: 'Sulfur route examples near Greenhouse Laboratory.', image: '/images/parts/external-migrated/FL9Ke2Z.png' },
            ],
          },
        ],
      },
      {
        name: 'Alistair\'s Folly Lock Input',
        description:
          'Free wonder-weapon route: find one symbol of each color, then input all four symbols at the Library lock box.',
        parts: [
          {
            name: 'Blue Symbol',
            locations: [
              { name: 'Cemetery gravestone near Stake table.', image: '/images/parts/external-migrated/IWyR5Bp.png' },
              { name: 'Mausoleum crypt top / lion statue variants.', image: '/images/parts/external-migrated/9fuMJqf.png' },
            ],
          },
          {
            name: 'Green Symbol',
            locations: [
              { name: 'Greenhouse gate-left variant.', image: '/images/parts/external-migrated/PYg2yic.png' },
              { name: 'Gardens gazebo and perk-gate variants.', image: '/images/parts/external-migrated/WEZgwVr.png' },
            ],
          },
          {
            name: 'Yellow Symbol',
            locations: [
              { name: 'Forest Terrace, left of Bowie wall-buy.', image: '/images/parts/external-migrated/UwIdBtU.png' },
              { name: 'Forest Terrace gate/window variants.', image: '/images/parts/external-migrated/NqnhqpO.png' },
            ],
          },
          {
            name: 'Red Symbol',
            locations: [
              { name: 'Master Bedroom, right of fireplace.', image: '/images/parts/external-migrated/lRFOSC5.png' },
              { name: 'East Gallery / Wine Cellar / Dining variants.', image: '/images/parts/external-migrated/xPmlGlV.png' },
            ],
          },
        ],
      },
    ],
    eeOverview:
      'Trial by Ordeal: open Pack-a-Punch, activate three crystal quest lines (Telescope, Knight, Effigy), then clear the Shadow Werewolf boss in the Ruins.',
    eeSteps: [
      {
        num: 1,
        title: 'Full setup before activation',
        desc: 'Open major loops, craft Silver Bullets and Shield, and activate Pack-a-Punch through the Tuning Fork flow.',
        tip: 'Do not start quest-line activation until each player has a stable loadout and clear route roles.',
      },
      {
        num: 2,
        title: 'Activate the three quest lines',
        desc: 'Return to the three PaP crystals and interact to assign Telescope, Knight, and Effigy lines in any order.',
      },
      {
        num: 3,
        title: 'Complete Telescope line',
        desc: 'Do silver-bullet rod shot, Atlas ring alignment, zodiac scratch ordering, telescope dome/electric/shield check, and survive slab lockdown.',
        tip: 'If zodiac input fails, symbols and scratch counts reroll - re-scout immediately instead of guessing.',
      },
      {
        num: 4,
        title: 'Complete Knight and Effigy lines',
        desc: 'Knight: blue-fire fireplace chain and forest knight escort. Effigy: birch branches, spirit-mode escort, and slab lockdown completion.',
      },
      {
        num: 5,
        title: 'Enter Ruins and finish boss',
        desc: 'Use forest door to enter the arena. Trap the invisible werewolf in green-beam squares during phases 1 and 3, then finish add-heavy phase 2.',
        tip: 'Arena Max Ammo/Carpenter drops respawn by phase only after prior pickups are collected.',
      },
    ],
    strategies: [
      'Open both mansion side loops early (Library side and Bedroom side) so ghost/objective calls never force dead-end rotates.',
      'Craft Silver Bullets by mid-game; werewolf pace and several quest checks become dramatically safer.',
      'Use Shield aggressively for objective windows: zodiac scouting, trap runs, and revive coverage in hallways.',
      'Assign one player as lookup-caller for symbols/scratch logic while others maintain a controlled zombie tail.',
      'Use portals (Greenhouse, Mausoleum, Forest) for fast reset to Main Hall when route pressure spikes.',
      'Do not over-camp Dining/Library interiors in high rounds; rotate toward Main Hall and terrace connectors.',
    ],
    customSections: [
      {
        id: 'map-flow-and-portals',
        title: 'Map Flow and Portals',
        label: 'Field Manual — Routing',
        items: [
          {
            title: 'Main Hall as anchor',
            desc: 'Treat Main Hall as the central reset point and route all objective detours back through it.',
          },
          {
            title: 'Portal network',
            desc: 'Greenhouse, Mausoleum, and Forest each portal back to Main Hall for 500 points.',
          },
          {
            title: 'Spawn-split opener',
            desc: 'Because spawn is split, coordinate first-door spending so both halves reach the Artifact without delay.',
          },
        ],
      },
      {
        id: 'silver-bullets',
        title: 'Silver Bullets Full Chain',
        label: 'Field Manual — Systems',
        items: [
          {
            title: 'Two-stage crafting',
            desc: 'Melt silver at the Wine Cellar table, then craft usable Silver Bullets at the Library station.',
            image: '/images/parts/external-migrated/9cgLErV.png',
          },
          {
            title: 'Werewolf counter',
            desc: 'Silver rounds massively improve werewolf time-to-kill and reduce wipe risk during objective locks.',
          },
          {
            title: 'Priority component routes',
            desc: 'Prioritize Candlestick and Plate first so your team can start silver processing while powder parts are finished.',
          },
        ],
      },
      {
        id: 'alistairs-line',
        title: 'Alistair Weapon Line (Folly -> Chaos Theory -> Annihilator)',
        label: 'Field Manual — Wonder Weapon',
        items: [
          {
            title: 'Folly lock-box path',
            desc: 'Collect one symbol of each color and input the exact set in the Library lock box for a free Folly.',
            image: '/images/parts/external-migrated/2caVF9z.png',
          },
          {
            title: 'Chaos Theory upgrade',
            desc: 'Requires werewolf material + Prima Materia machine sequence in Greenhouse before crafting.',
            image: '/images/parts/external-migrated/TFHUsQT.png',
          },
          {
            title: 'Annihilator upgrade',
            desc: 'Complete lamp/bat and materia chain, then craft in Greenhouse for quest-critical charged shots.',
            image: '/images/parts/external-migrated/MuvLWNN.png',
          },
          {
            title: 'Usage discipline',
            desc: 'Save charged shots for quest gates, werewolf control, and boss vulnerability windows.',
          },
        ],
      },
      {
        id: 'traps-and-cores',
        title: 'Trap and Core Management',
        label: 'Field Manual — Combat Systems',
        items: [
          {
            title: 'Trap loadout limitation',
            desc: 'Fire traps require collectible Fire Cores; only three cores can be installed per match.',
            image: '/images/parts/external-migrated/LNtuAYQ.png',
          },
          {
            title: 'Electric trap utility',
            desc: 'Greenhouse electric trap is both a kill tool and a Telescope-line progression step.',
          },
          {
            title: '1500-point timing',
            desc: 'Trigger traps to protect objective players during long interactions, not for random point burn.',
          },
        ],
      },
      {
        id: 'savage-impaler',
        title: 'Side Quest — Savage Impaler',
        label: 'Field Manual — Optional Power',
        items: [
          {
            title: 'Craft Silver Bullets first',
            desc: 'The Savage Impaler chain requires Silver Bullets. Process silver at the Wine Cellar melter, then craft at the Library station before starting.',
          },
          {
            title: 'Kill Nosferatu for Bloodrush',
            desc: 'Nosferatu spawn near the Mausoleum and Cemetery from mid-game. Hit them with Silver Bullets — eventually one drops a Bloodrush pickup (glowing red orb on the ground). Collect it immediately.',
          },
          {
            title: 'Light the three ceremonial candles',
            desc: 'Three unlit candles are scattered around the Cemetery and Mausoleum exterior walls. Interact with each to light it. All three must be lit in the same life.',
          },
          {
            title: 'Follow the ghost escort',
            desc: 'After all candles are lit, a ghost apparition spawns in the Cemetery and begins moving toward the Crypt. Follow closely and keep zombies off you — breaking the escort resets the step.',
          },
          {
            title: 'Activate the Crypt pedestal',
            desc: 'When the ghost reaches the Crypt entrance, interact with the central pedestal. A timed defense wave begins — the pedestal glows until the timer ends.',
          },
          {
            title: 'Collect the Savage Impaler',
            desc: 'After surviving the defense, the Savage Impaler appears on the pedestal. Pick it up. Once one player has collected it, others in the lobby can obtain it from the Mystery Box.',
          },
        ],
      },
      {
        id: 'stake-knife',
        title: 'Side Quest — Stake Knife',
        label: 'Field Manual — Optional Power',
        items: [
          {
            title: 'Locate the three stake symbols',
            desc: 'Three glowing symbols appear at fixed locations each game: one near the Master Bedroom fireplace, one in the East Gallery by the armour display, and one inside the Mausoleum alcove. They glow faintly — look for small rune icons on walls or floors.',
          },
          {
            title: 'Soul-charge each symbol',
            desc: 'Kill zombies in very close proximity to each symbol (within ~3 metres). After roughly 6–10 kills per symbol, it pulses bright and locks charged. All three must be charged.',
          },
          {
            title: 'Return to the Mausoleum workbench',
            desc: 'With all three symbols charged, head to the Mausoleum crafting table. The interaction prompt will now be available.',
          },
          {
            title: 'Craft and retrieve the Stake Knife',
            desc: 'Interact with the table to assemble the Stake Knife. Each player must repeat the charging process to get their own — the crafting is per-player, not shared.',
          },
          {
            title: 'Usage — throw and retrieve',
            desc: 'Throw the Stake Knife at any Nosferatu to one-shot it regardless of round. The knife must be physically walked over and retrieved after each throw. It does not auto-return.',
          },
        ],
      },
      {
        id: 'hidden-rooms',
        title: 'Side Quest — Hidden Room Rewards',
        label: 'Field Manual — Optional Power',
        items: [
          {
            title: 'Billiards Room puzzle',
            desc: 'Shoot the billiards balls off the table in a specific round order using any weapon. When the correct ball sinks the right pocket, a reward item spawns on or near the table — usually an elixir or a Max Ammo. Sequence varies by lobby.',
          },
          {
            title: 'Wine Cellar hanging puzzle',
            desc: 'Interact with the hanging noose and the surrounding wine rack weights in sequence. When the correct combination locks, a silver ammo bundle or point bonus drops nearby. The sequence is fixed per map version.',
          },
          {
            title: 'Balcony / Study telescope',
            desc: 'Interact with the small telescope in the Study or upper Balcony area, then interact with adjacent ornament objects in order. A power-up or bonus item spawns at the end of the sequence.',
          },
          {
            title: 'General tip',
            desc: 'None of these puzzles are required for the main Easter Egg, but they pay out free items during mid-game. Complete them on stable rounds with a zombie tail held so you have time to interact without pressure.',
          },
        ],
      },
      {
        id: 'boss-fight-notes',
        title: 'Shadow Werewolf Boss Notes',
        label: 'Field Manual — Final Encounter',
        items: [
          {
            title: 'Phase structure',
            desc: 'Phase 1 and 3 are trap phases using statue beam alignment; phase 2 is sustained survival pressure.',
          },
          {
            title: 'Recommended loadout',
            desc: 'Hellion Salvo, Alistair\'s Annihilator, and fast-close shotgun backup are the most consistent setup.',
          },
          {
            title: 'Arena resource rule',
            desc: 'Collect existing Max Ammo and Carpenter drops promptly so new phase drops can spawn in.',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual — Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/dead-of-the-night/',
          },
          {
            title: 'Attempted IGN source',
            desc: 'https://www.ign.com/wikis/call-of-duty-black-ops-4/Dead_of_the_Night_Walkthrough',
          },
          {
            title: 'Supporting overview',
            desc: 'https://callofduty.fandom.com/wiki/Dead_of_the_Night',
          },
          {
            title: 'Notable mechanics',
            desc: 'Sentinel Artifact opener, Silver Bullet economy, Alistair upgrade chain, and multi-line quest logic define this map.',
          },
        ],
      },
    ],
  },

  'ancient-evil': {
    powerSteps: [
      'Open city-side lanes into the underworld and activate Pegasus travel as soon as possible.',
      'Use shrine access and tribute loops to stabilize economy before long gauntlet steps.',
      'Prioritize Center of the World control because all major quest branches route through it.',
    ],
    papLocation: 'Center of the World after freeing both eagles and surviving the opening defense.',
    papSteps: [
      'Ride Pegasus to the dark side and free the two eagle cages (Python Pass and Cliff Ruins flows).',
      'Use specialist melee/shots to finish eagle cage interactions, then go Center of the World.',
      'Defend until the eagles complete the unlock and Pack-a-Punch activates.',
    ],
    buildables: [
      {
        name: 'Apollo\'s Will (Shield)',
        description: 'Core defensive item and required for multiple high-value objectives.',
        parts: [
          {
            name: 'Handle',
            locations: [
              { name: 'Upper Road handle spawn 1.', image: 'https://i.imgur.com/Fs3d9wU.jpg' },
              { name: 'Upper Road handle spawn 2.', image: 'https://i.imgur.com/KwJNcQI.jpg' },
            ],
          },
          {
            name: 'Spear segment',
            locations: [
              { name: 'Stoa of the Athenians spear spawn.', image: 'https://i.imgur.com/oirdG9N.jpg' },
              { name: 'Intersection of Treasuries spear spawn.', image: 'https://i.imgur.com/AGOVBds.jpg' },
            ],
          },
          {
            name: 'Shield plate',
            locations: [
              { name: 'Dropped by Gegenees enemy.', image: 'https://i.imgur.com/D8JZ4TP.jpg' },
              { name: 'Build table near Marketplace Saug wall-buy.', image: 'https://i.imgur.com/oh6K9it.jpg' },
            ],
          },
        ],
      },
      {
        name: 'Pegasus Strike',
        description: 'High-impact specialist support equipment useful in boss transition phases.',
        parts: [
          {
            name: 'Anvil / Hammer / Prongs sets',
            locations: [
              { name: 'Cliff Ruins anvil spawn.', image: 'https://i.imgur.com/3OwmNmw.jpg' },
              { name: 'Python Pass hammer spawn.', image: 'https://i.imgur.com/3nvgBSz.jpg' },
              { name: 'River of Sorrows prongs spawn.', image: 'https://i.imgur.com/xeGUzet.jpg' },
            ],
          },
        ],
      },
    ],
    eeOverview:
      'Ancient Evil is a long gauntlet-and-trial quest: upgrade god hands, solve multi-location challenge logic, then defeat Pegasus and Perseus phases.',
    eeSteps: [
      {
        num: 1,
        title: 'Open full map and PaP',
        desc: 'Unlock city and underworld routes, activate Pegasus transit, and open Pack-a-Punch.',
      },
      {
        num: 2,
        title: 'Build and redeem all god hands',
        desc: 'Acquire dormant hands, complete each initiation, then finish redeem portals for Charon, Ouranos, Hemera, and Gaia.',
      },
      {
        num: 3,
        title: 'Run flame and trial sequence',
        desc: 'Ignite Apollo flow, solve blood/ankh/cog/sundial style steps, and complete Amphitheater team challenge logic.',
      },
      {
        num: 4,
        title: 'Finish boss finale',
        desc: 'Defeat Pegasus phase first, then burn Perseus in Mount Olympus rotations and close with focused damage windows.',
      },
    ],
    strategies: [
      'Assign each player one god hand path early so upgrades do not overlap and waste rounds.',
      'Save specialist charge for challenge portals and Olympus damage windows, not mid-round cleanup.',
      'Use Pegasus travel to chain objectives in single trips and cut failed attempt downtime.',
      'Catalyst kills should be intentional around hand-specific circles; random kills can delay progress.',
    ],
    customSections: [
      {
        id: 'gauntlet-flow',
        title: 'Gauntlet Progression',
        label: 'Field Manual - Wonder Weapon',
        items: [
          {
            title: 'Dormant hand clue examples',
            desc: 'Oracle hint lines map to fixed dormant hand spots around Delphi.',
            image: 'https://i.imgur.com/fqc2hdG.png',
          },
          {
            title: 'Hemera mirror chain',
            desc: 'Angle mirrors then route the light to Hemera shrine quickly before decay timer resets.',
            image: 'https://i.imgur.com/MtXmu74.png',
          },
        ],
      },
      {
        id: 'apollo-and-trials',
        title: 'Apollo and Trial Steps',
        label: 'Field Manual - Main Quest',
        items: [
          {
            title: 'Ignited spear pillar',
            desc: 'Blue flame ignition and pillar throw gate all exalted-hand challenge entries.',
            image: 'https://i.imgur.com/26WKVI0.png',
          },
          {
            title: 'Olympus damage rhythm',
            desc: 'Level 3 specialist damage windows are the most consistent way to close Pegasus and Perseus phases.',
            image: 'https://i.imgur.com/26WKVI0.png',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual — Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/ancient-evil/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Gauntlet progression and underworld traversal drive both setup and quest tempo.',
          },
        ],
      },
    ],
  },

  'alpha-omega': {
    powerSteps: [
      'Turn on power at the Cul-de-sac Power House and open full bunker access.',
      'Enable ventilation in Generators and complete lockdown to start Pack-a-Punch flow.',
      'Repair all four house vents quickly so the bunker route stays stable for Rushmore steps.',
    ],
    papLocation: 'Beds bunker area after ventilation lockdown and four vent repairs.',
    papSteps: [
      'Power on in Cul-de-sac, complete Generators lockdown, then repair all four vent units.',
      'When all vents are fixed, use Pack-a-Punch in Beds (re-repair vents when clogged later).',
    ],
    buildables: [
      {
        name: 'Riot Shield',
        description: 'Reliable defensive option for bunker corridors and mannequin-heavy objective phases.',
        parts: [
          {
            name: 'Cul-de-sac part',
            locations: [
              { name: 'Rear bus tire.', image: '/images/parts/external-migrated/iM171uI.png' },
              { name: 'Green car front tire.', image: '/images/parts/external-migrated/VguYSD9.png' },
            ],
          },
          {
            name: 'Operations part',
            locations: [
              { name: 'Filing cabinet in garage.', image: 'https://i.imgur.com/lxdZOh5.png' },
              { name: 'Desk with green monitors.', image: 'https://i.imgur.com/LcTnxhX.png' },
            ],
          },
          {
            name: 'Beds part',
            locations: [
              { name: 'Boxes on shelf.', image: 'https://i.imgur.com/YtuCbCE.png' },
              { name: 'Dresser near barrier.', image: 'https://i.imgur.com/GdJB3k0.png' },
            ],
          },
        ],
      },
      {
        name: 'Telepads',
        description: 'Extremely valuable mobility tool for code rushes and late-round revives.',
        parts: [
          {
            name: 'Transfusion / Green House / Generators parts',
            locations: [
              { name: 'Transfusion locker spawn.', image: 'https://i.imgur.com/Ru0z7zK.png' },
              { name: 'Green House barrels spawn.', image: 'https://i.imgur.com/TrK7t8v.png' },
              { name: 'Generators rail spawn.', image: 'https://i.imgur.com/Lr6blj0.png' },
            ],
          },
        ],
      },
    ],
    eeOverview:
      'Alpha Omega revolves around Rushmore code chains, mannequin/escort phases, and APD Avogadro endgame management.',
    eeSteps: [
      {
        num: 1,
        title: 'Open map and stabilize systems',
        desc: 'Complete power, vents, PaP, and core utility setup before heavy code work.',
      },
      {
        num: 2,
        title: 'Run Rushmore code phases',
        desc: 'Complete TV/clock/code logic, then process the multi-location switch and picture-code sequences.',
      },
      {
        num: 3,
        title: 'Complete mannequin and orb stages',
        desc: 'Finish mannequin defense pickups, escort elemental orb, and prep APD Control for boss transition.',
      },
      {
        num: 4,
        title: 'Finish Avogadro sequence',
        desc: 'Fill canisters, position Avogadro into APD, and secure final shard interaction.',
      },
    ],
    strategies: [
      'One caller plus one confirmer for Rushmore inputs prevents full-round resets on bad entries.',
      'Craft at least one Ray Gun Mark II variant before late code chains to reduce bunker pressure.',
      'Use telepads proactively for rescue rotations; bunker corners punish slow recoveries.',
      'Time switch and picture-code tasks on controlled rounds, not during hound/jack spikes.',
    ],
    customSections: [
      {
        id: 'rushmore-ops',
        title: 'Rushmore Ops Discipline',
        label: 'Field Manual - Systems',
        items: [
          {
            title: 'TV and clock code start',
            desc: 'Static TV activation leads to letter-time clocks that must be entered cleanly.',
          },
          {
            title: 'Picture-code phase',
            desc: 'Brain Rot picture reveals are a late-sequence bottleneck — call each code instantly.',
          },
        ],
      },
      {
        id: 'mk2-variants',
        title: 'Ray Gun MKII Variants',
        label: 'Field Manual - Wonder Weapon',
        items: [
          {
            title: 'Assembly kit baseline',
            desc: 'Build Ray Gun MKII kit parts first to unlock all variant branches.',
          },
          {
            title: 'TV number frame step',
            desc: 'Activate and charge all four static TVs, then input the reveal order at Rushmore.',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual — Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/alpha-omega/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Rushmore command flow and Ray Gun Mark II variant usage are major power spikes.',
          },
        ],
      },
    ],
  },

  'tag-der-toten': {
    powerSteps: [
      'Turn on at least two of three power switches (Docks, Bridge, Human Infusion) to start setup flow.',
      'Open zipline routes and lighthouse floors early to avoid long objective detours in late rounds.',
      'Prioritize movement tools (cranks/handle) because most major systems are travel-gated.',
    ],
    papLocation: 'Wherever the lighthouse beam points (Beach, Boathouse, Sunken Path, or Iceberg Golden PaP).',
    papSteps: [
      'Activate Docks and Bridge power switches, then obtain the blue rock and deliver it to the Hermit pulley.',
      'Track the lighthouse beam to find current PaP location and re-route quickly each move cycle.',
      'For Golden PaP, complete both zipline crank chains and Human Infusion power, then use Sun Deck flinger timing.',
    ],
    buildables: [
      {
        name: 'Riot Shield',
        description: 'Three-part shield with one piece in each major zone: Docks, Frozen Crevasse/Lagoon, and Lighthouse. Each part has three possible spawns. Build at the Lighthouse Station workbench, the Gangway on the ship, or Specimen Storage in the Facility.',
        parts: [
          {
            name: 'Part 1 — Panel (Docks / Spawn area)',
            locations: [
              {
                name: 'On the bridge at the Docks — the gas pump leaning on its side.',
                image: 'https://cdn.segmentnextimages.com/wp-content/uploads/2024/01/BO4-Zombies-Tag-der-Toten-Riot-Shield-Part-1.jpg',
              },
              {
                name: 'Side of the boat frozen in the ice, opposite the power switch on the bridge.',
              },
              {
                name: 'The ice heaps behind the boat, near the zombie spawn area.',
                image: 'https://i0.wp.com/gameranx.com/wp-content/uploads/2019/09/Call-of-Duty%C2%AE_-Black-Ops-4_20190923221034.jpg',
              },
            ],
          },
          {
            name: 'Part 2 — Base (Frozen Crevasse / Lagoon)',
            locations: [
              {
                name: 'On top of the blue ice hills — sitting on a black rock in the Frozen Crevasse.',
                image: 'https://i0.wp.com/gameranx.com/wp-content/uploads/2019/09/Call-of-Duty%C2%AE_-Black-Ops-4_20190923221422.jpg',
              },
              {
                name: 'On top of the ice shack, two jumps from the first spot, beside the bloodstain where the Mystery Box can spawn.',
              },
              {
                name: 'Behind the large ice mound at the back-left corner near the Lagoon Pack-a-Punch area.',
              },
            ],
          },
          {
            name: 'Part 3 — Gun (Lighthouse)',
            locations: [
              {
                name: 'Lighthouse Level 1 — immediately left of the entrance, against the outer wall opposite the start of the spiral stairs.',
              },
              {
                name: 'Lighthouse Level 2 — beside the "2" painted on the wall.',
                image: 'https://i0.wp.com/gameranx.com/wp-content/uploads/2019/09/Call-of-Duty%C2%AE_-Black-Ops-4_20190923221034.jpg',
              },
              {
                name: 'Lighthouse Level 3 — leaning against the guard rail, right of the stairs.',
              },
            ],
          },
        ],
      },
    ],
    eeOverview:
      'Tag der Toten is a long logistics quest with riddles, orange orb freezes, soapstone routing, and final moving-shield survival.',
    eeSteps: [
      {
        num: 1,
        title: 'Open full mobility network',
        desc: 'Open lighthouse, zipline, and facility paths while setting up PaP and Golden PaP access.',
      },
      {
        num: 2,
        title: 'Run Seal of Duality chain',
        desc: 'Complete challenge totems, dial phases, and offering riddles to start the orb process.',
      },
      {
        num: 3,
        title: 'Complete orb and soapstone logistics',
        desc: 'Freeze and return orange orbs, then run soapstone heating/cooling sequence without route mistakes.',
      },
      {
        num: 4,
        title: 'Survive moving shield finale',
        desc: 'Enter Golden PaP transformation and stay inside the moving Seal shield through lava-map pressure until Human Infusion closeout.',
      },
    ],
    strategies: [
      'Tag runs are won by route discipline: pre-call every zipline and flinger before carrying timed items.',
      'Use Tundra Gun for panic clears and escort protection, not routine point rounds.',
      'Maintain one dedicated zombie holder during riddle/orb phases to avoid repeated setup loops.',
      'Heat pack and water management matter in every late step; avoid unnecessary water crossings.',
    ],
    customSections: [
      {
        id: 'power-and-pap-network',
        title: 'Power and PaP Network',
        label: 'Field Manual - Setup',
        items: [
          {
            title: 'Three power switch map',
            desc: 'Docks, Bridge, and Human Infusion switches determine route availability and objective pacing.',
            image: 'https://callofdutymaps.com/wp-content/uploads/tagdertotenpower.jpg',
          },
          {
            title: 'Golden PaP crank chain',
            desc: 'Both crank routes are mandatory for fast facility access and strongest PaP economy.',
            image: 'https://callofdutymaps.com/wp-content/uploads/tagdertoten34-1024x576.jpg',
          },
        ],
      },
      {
        id: 'equipment-logistics',
        title: 'Equipment Logistics',
        label: 'Field Manual - Utility',
        items: [
          {
            title: 'Dynamite and Heat Pack flow',
            desc: 'Dynamite opens key facility paths; Heat Pack removes water slow and protects timed objective routes.',
            image: 'https://callofdutymaps.com/wp-content/uploads/totenmusixbox.jpg',
          },
          {
            title: 'Samantha Music Box path',
            desc: 'Vault keycard lockdown sequence is worth doing during stable rounds for safer late attempts.',
            image: 'https://callofdutymaps.com/wp-content/uploads/totenegg.jpg',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual — Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/tag-der-toten/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Zipline traversal, frozen route management, and wonder-weapon timing are central.',
          },
        ],
      },
    ],
  },

  'classified': {
    powerSteps: [
      'Open to South Laboratories and turn on core power to activate Pentagon systems and teleporter use.',
      'Open War Room routes quickly so DEFCON switches can be cycled without backtracking.',
    ],
    papLocation: 'War Room teleporter access after DEFCON-style setup.',
    papSteps: [
      'Collect Teleporter Signal Amplifier parts (Main Offices pad, Panic Room amplifier, Morgue wire).',
      'Build and place Amplifier on War Room teleporter base, then set DEFCON 5.',
      'Take amplified teleporter to Groom Lake to access Pack-a-Punch.',
    ],
    buildables: [
      {
        name: 'Riot Shield',
        description: 'Best safety layer for Pentagon hallways, elevator choke points, and long survive rounds.',
        parts: [
          {
            name: 'Central Filing side part',
            locations: [
              { name: 'Near filing cabinets.', image: 'https://i.imgur.com/NQlGGHL.jpg' },
              { name: 'Below teller window.', image: 'https://i.imgur.com/YYNu2UC.jpg' },
            ],
          },
          {
            name: 'War Room base part',
            locations: [
              { name: 'Lower Level right of computers.', image: 'https://i.imgur.com/LyueBBX.jpg' },
              { name: 'Lower Level below staircase.', image: 'https://i.imgur.com/StJA7y5.jpg' },
            ],
          },
          {
            name: 'Lab head part',
            locations: [
              { name: 'South Labs left of power switch.', image: 'https://i.imgur.com/1M0SzNy.jpg' },
              { name: 'South Labs left of teleporter.', image: 'https://i.imgur.com/cOiOGs8.jpg' },
            ],
          },
        ],
      },
    ],
    eeOverview:
      'Classified has a survival-style main quest (Round 150) plus multiple side quests led by Project Skadi and Pentagon easter-egg chains.',
    eeSteps: [
      {
        num: 1,
        title: 'Complete full setup',
        desc: 'Power on, build shield, unlock Groom Lake Pack-a-Punch, and stabilize perk economy.',
      },
      {
        num: 2,
        title: 'Optional Project Skadi route',
        desc: 'Run Winter\'s Howl puzzle chain for stronger control in high-round Pentagon loops.',
      },
      {
        num: 3,
        title: 'Commit to high-round plan',
        desc: 'Choose one repeatable survival lane set and avoid unnecessary cross-map travel once pace accelerates.',
      },
      {
        num: 4,
        title: 'Reach Round 150 objective',
        desc: 'Maintain disciplined shield/equipment economy and controlled teleporter usage through ultra-late rounds.',
      },
    ],
    strategies: [
      'Set one primary hold and one fallback route; random repositioning causes most late-round wipes.',
      'Use teleporter cycles intentionally and keep DEFCON knowledge fresh for emergency recoveries.',
      'Winter\'s Howl and shield usage should be saved for recoveries, not routine wave cleanup.',
      'Bank points for emergency perk rebuys and repeated trap/elevator rescue situations.',
    ],
    customSections: [
      {
        id: 'project-skadi',
        title: 'Project Skadi (Winter\'s Howl)',
        label: 'Field Manual - Side Quest',
        items: [
          {
            title: 'Skadi key start',
            desc: 'Collect lockbox key in War Room lower level to begin the full code-photo puzzle chain.',
            image: 'https://i.imgur.com/PnCa6yb.jpg',
          },
          {
            title: 'Code terminal entry',
            desc: 'Input all four discovered code sets at the lower War Room machine to retrieve Project Skadi.',
            image: 'https://i.imgur.com/fJlnJ2A.jpg',
          },
        ],
      },
      {
        id: 'teleporter-amplifier',
        title: 'Teleporter Amplifier Setup',
        label: 'Field Manual - Pack-a-Punch',
        items: [
          {
            title: 'Main Offices part spawns',
            desc: 'Grab teleporter pad part during first office sweep to avoid repeat visits.',
            image: 'https://i.imgur.com/3CqX1dt.jpg',
          },
          {
            title: 'Panic Room amplifier part',
            desc: 'Cycle DEFCON to reach Panic Room and collect amplifier before late-round complexity ramps up.',
            image: 'https://i.imgur.com/VvJg4sK.jpg',
          },
        ],
      },
      {
        id: 'wiki-intel',
        title: 'Wiki Intel',
        label: 'Field Manual — Reference',
        items: [
          {
            title: 'Source guide',
            desc: 'https://www.reddit.com/r/CODZombies/wiki/classified/',
          },
          {
            title: 'Notable mechanics',
            desc: 'Pentagon lane control and DEFCON teleporter pacing remain the defining systems.',
          },
        ],
      },
    ],
  },

};



