export type StoryThread = 'aether' | 'chaos' | 'dark-aether';

export interface LoreEvent {
  id: string;
  title: string;
  date: string;
  dateSort: number;
  location: string;
  thread: StoryThread;
  summary: string;
  mapId?: string;
  x: number;
  y: number;
}

export interface LoreConnection {
  id: string;
  source: string;
  target: string;
  label?: string;
}

// ── X column stops (360px per slot) ──────────────────────────
// col 0=100, 1=460, 2=820, 3=1180, 4=1540, 5=1900, 6=2260, 7=2620, 8=2980

// ── Y row stops ───────────────────────────────────────────────
// Aether main   y = 80
// Aether branch y = 360
// Chaos         y = 680

export const LORE_EVENTS: LoreEvent[] = [

  // ════════════════════════════════════════════
  //  AETHER STORY  ·  Row 1  (main chain)
  // ════════════════════════════════════════════

  {
    id: 'pre-history',
    title: 'The Keepers & Apothicons',
    date: 'Before recorded history',
    dateSort: -99999,
    location: 'Agartha / The Aether',
    thread: 'aether',
    summary:
      'The Keepers — ancient cosmic beings — inhabit Agartha and protect the universe. A faction of Keepers is corrupted by Element 115 and transformed into the monstrous Apothicons, banished to the Dark Aether. The war between order and corruption begins. Dr. Monty presides over Agartha as its guardian.',
    x: -620, y: 80,
  },
  {
    id: 'great-war',
    title: 'The Great War',
    date: '~1300 AD',
    dateSort: 1300,
    location: 'Earth / Agartha borderlands',
    thread: 'aether',
    summary:
      'The Apothicons breach reality and invade Earth. The Keepers recruit four human champions — ancestors of Dempsey, Nikolai, Takeo, and Richtofen — and arm them with four Elemental Staffs forged from 115 meteorites. After a long war, the Apothicons are repelled and the Staffs are buried beneath what will become the Somme in France. This directly sets up the Origins excavation centuries later.',
    x: -260, y: 80,
  },
  {
    id: 'origins',
    title: 'Origins',
    date: 'September 1917',
    dateSort: 1917,
    location: 'Excavation Site 64, France',
    thread: 'aether',
    summary:
      'During WWI, Group 935 discovers buried Element 115 meteorites beneath the Somme. Richtofen, Dempsey, Nikolai, and Takeo work the dig under Dr. Maxis. Ancient Panzer robots awaken. Richtofen first makes contact with the Aether entities.',
    mapId: 'origins',
    x: 100, y: 80,
  },
  {
    id: 'shi-no-numa',
    title: 'Shi No Numa',
    date: 'July 1943',
    dateSort: 1943,
    location: 'Shi No Numa Facility, Japan',
    thread: 'aether',
    summary:
      'Group 935 runs a 115-fueled research station in a Japanese swamp. Richtofen retrieves the Golden Rod artifact. First confirmed appearance of Hellhounds. The O4 crew teleports here during their initial jump from Der Riese.',
    mapId: 'shi-no-numa',
    x: 460, y: 80,
  },
  {
    id: 'der-riese',
    title: 'Der Riese / The Giant',
    date: '1945',
    dateSort: 1945,
    location: 'Der Riese Facility, Poland',
    thread: 'aether',
    summary:
      'Richtofen completes the Matter Transference Device teleporter network. During a test, Maxis and daughter Samantha are trapped inside an MTD and a dog teleports in their place. Samantha is launched into the Aether, bonds with the MPD, and becomes the controller of the undead.',
    mapId: 'the-giant',
    x: 820, y: 80,
  },
  {
    id: 'kino-der-toten',
    title: 'Kino der Toten',
    date: '1963',
    dateSort: 1963,
    location: 'Group 935 Theater, Berlin',
    thread: 'aether',
    summary:
      'The O4 crew emerges from teleportation in an abandoned Group 935 theater. The facility was used to test Nova 6 gas and subliminal mind-control films on zombie subjects. A functional teleporter links two sections of the building.',
    mapId: 'kino-der-toten',
    x: 1180, y: 80,
  },
  {
    id: 'ascension',
    title: 'Ascension',
    date: '1963',
    dateSort: 1963,
    location: 'Baikonur Cosmodrome, Soviet USSR',
    thread: 'aether',
    summary:
      'A Group 935 / Soviet cosmodrome houses MPD research and luna lander systems. The O4 crew frees Gersh from the Casimir Mechanism. Space monkeys steal perks between rounds. Cosmonaut zombies roam the site.',
    mapId: 'ascension',
    x: 1540, y: 80,
  },
  {
    id: 'moon',
    title: 'Moon',
    date: '1969',
    dateSort: 1969,
    location: 'Griffin Station, The Moon',
    thread: 'aether',
    summary:
      'The O4 crew reaches Griffin Station on the lunar surface. Richtofen swaps souls with Samantha using the MPD — claiming control of all zombies. He then fires the Hanford rockets at Earth\'s surface, destroying civilization. The Aether war truly begins.',
    mapId: 'moon',
    x: 1900, y: 80,
  },
  {
    id: 'tranzit',
    title: 'TranZit / Green Run',
    date: '2035',
    dateSort: 2035,
    location: 'Hanford, Washington',
    thread: 'aether',
    summary:
      'Post-nuclear Earth. Survivors board a looping bus through a radioactive wasteland. Maxis (embedded in the power grid) and Richtofen (transmitted from space) battle through the N4 crew for control of the Hanford power pylon. The winner gains a foothold in the Aether.',
    mapId: 'tranzit',
    x: 2260, y: 80,
  },
  {
    id: 'buried',
    title: 'Buried',
    date: '2035',
    dateSort: 2035,
    location: 'Gideon, Nevada (underground)',
    thread: 'aether',
    summary:
      'An underground 19th-century ghost town is uncovered beneath post-nuclear Nevada. The N4 crew activates the final Pylon. Whichever side wins the Maxis vs. Richtofen contest now controls the Aether — the war\'s first chapter is decided.',
    mapId: 'buried',
    x: 2620, y: 80,
  },
  {
    id: 'revelations',
    title: 'Revelations',
    date: '2025+',
    dateSort: 2026,
    location: 'The Aether — all dimensions combined',
    thread: 'aether',
    summary:
      'The Shadow Man fuses all previous map environments into one fractured reality. The Primis crew — now armed with the full history of the Aether conflict — confronts the Apothicon God. After defeating him, the cycle is sealed and the original Aether storyline comes to a close.',
    mapId: 'revelations',
    x: 2980, y: 80,
  },

  // ════════════════════════════════════════════
  //  AETHER STORY  ·  Row 2  (branches & Primis)
  // ════════════════════════════════════════════

  {
    id: 'origins-ending',
    title: 'Origins — True Ending',
    date: 'Revealed in Black Ops III (2015)',
    dateSort: 2015,
    location: 'A child\'s bedroom',
    thread: 'aether',
    summary:
      'After the Primis crew destroys the Aether connection, the scene cuts to a child\'s bedroom. Young Samantha and Eddie play with toy zombie figures. Their father calls them to dinner. The implication: the entire Aether saga was a story born from a child\'s grief. Eddie is revealed to be the young Richtofen.',
    x: 100, y: 360,
  },
  {
    id: 'mob-of-the-dead',
    title: 'Mob of the Dead',
    date: '1934 (endless loop)',
    dateSort: 1934,
    location: 'Alcatraz Island, USA',
    thread: 'aether',
    summary:
      'Four mobsters — Sal, Billy, Weasel (Albert Arlington), and Finn — attempt to escape Alcatraz on New Year\'s Eve. They are trapped in a purgatory loop by the undead Warden, fueled by Element 115. Each death resets the cycle. Weasel is the only innocent.',
    mapId: 'mob-of-the-dead',
    x: 460, y: 360,
  },
  {
    id: 'verruckt',
    title: 'Verrückt',
    date: '1945',
    dateSort: 1945,
    location: 'Wittenau Sanatorium, Berlin',
    thread: 'aether',
    summary:
      'A Group 935 sanatorium becomes overrun. An extraction team sent in is never heard from again. The facility was used for classified teleporter experiments and early zombie containment studies, including the first Nova 6 gas field tests.',
    mapId: 'verruckt',
    x: 820, y: 360,
  },
  {
    id: 'five',
    title: 'Five',
    date: 'October 1963',
    dateSort: 1963,
    location: 'The Pentagon, USA',
    thread: 'aether',
    summary:
      'During JFK\'s meeting on the Cuban Missile Crisis, an outbreak erupts at the Pentagon. Kennedy, Nixon, Castro, and McNamara fight for survival in the war room. The Pentagon Thief — a zombie janitor — drains weapons from living players.',
    mapId: 'five',
    x: 1180, y: 360,
  },
  {
    id: 'shangri-la',
    title: 'Shangri-La',
    date: 'Unknown (time loop)',
    dateSort: 1960,
    location: 'Ancient ruins, Himalayas',
    thread: 'aether',
    summary:
      'A mythical city hidden in the Himalayas, corrupted by 115. The O4 crew is trapped in a time loop. Explorers Brock and Gary have been cursed to repeat the same cycle for years — their journal entries appear throughout the map.',
    mapId: 'shangri-la',
    x: 1540, y: 360,
  },
  {
    id: 'die-rise',
    title: 'Die Rise',
    date: '2035',
    dateSort: 2035,
    location: 'Collapsed skyscrapers, China',
    thread: 'aether',
    summary:
      'Survivors navigate crumbling skyscrapers in a Chinese city. The N4 crew activates an Annihilator Pylon. Maxis and Richtofen continue their tug-of-war. A grief-fueled side story between two survivors — Samuel and Marlton — plays in the background.',
    mapId: 'die-rise',
    x: 1900, y: 360,
  },
  {
    id: 'zetsubou-no-shima',
    title: 'Zetsubou No Shima',
    date: '2025',
    dateSort: 2025,
    location: 'Pacific research island',
    thread: 'aether',
    summary:
      'The Primis crew is captured on a zombie-infested Japanese WWII island. Plant spores, flooded underground tunnels, and a spider boss guard 115 research. The crew retrieves Takeo\'s soul fragment from the Gauntlet of Siegfried.',
    mapId: 'zetsubou-no-shima',
    x: 2260, y: 360,
  },
  {
    id: 'blood-of-the-dead',
    title: 'Blood of the Dead',
    date: '2035',
    dateSort: 2035,
    location: 'Alcatraz Island, USA',
    thread: 'aether',
    summary:
      'Post-apocalyptic Alcatraz is ruled by a zombified Warden. Primis arrives to free Ultimis Richtofen\'s soul, trapped on the island. The Spectral Shield allows interaction with the spirit world. The Golden Gate Bridge looms over a corrupted bay.',
    mapId: 'blood-of-the-dead',
    x: 2620, y: 360,
  },
  {
    id: 'gorod-krovi',
    title: 'Gorod Krovi',
    date: '1943 (alternate)',
    dateSort: 2025,
    location: 'Stalingrad, Soviet Union',
    thread: 'aether',
    summary:
      'An alternate-universe Stalingrad where dragons battle zombies and German forces in the ruins. The Primis crew retrieves Nikolai\'s soul fragment. The Dragon Command acts as a central hub for routing the dragon to different objectives.',
    mapId: 'gorod-krovi',
    x: 2980, y: 360,
  },
  {
    id: 'der-eisendrache',
    title: 'Der Eisendrache',
    date: '1945 (alternate timeline)',
    dateSort: 1945.5,
    location: 'Austrian Castle, Alps',
    thread: 'aether',
    summary:
      'The Primis crew arrives at a Nazi-occupied Austrian mountain fortress where a prototype MPD has been built around a 115 meteorite. Richtofen uses the Annihilator to release Ultimis Dempsey\'s soul. The Wrath of the Ancients bow weapon is assembled through four elemental upgrade paths — fire, wind, lightning, and void.',
    mapId: 'der-eisendrache',
    x: 2080, y: 360,
  },

  // ── Aether Secondary Branches (y = 520) ──────────────────────

  {
    id: 'nacht-der-untoten',
    title: 'Nacht der Untoten',
    date: '1945',
    dateSort: 1944.5,
    location: 'Abandoned bunker, Germany',
    thread: 'aether',
    summary:
      'An anonymous group of soldiers seeks shelter in an abandoned German bunker as the first zombie outbreak erupts. With minimal equipment and no clear objective, they hold the line in total darkness. This is the earliest confirmed zombie encounter and the event that compelled Group 935 to accelerate their Element 115 research.',
    mapId: 'nacht-der-untoten',
    x: 820, y: 520,
  },
  {
    id: 'call-of-the-dead',
    title: 'Call of the Dead',
    date: '1945 (alternate)',
    dateSort: 1963.5,
    location: 'Soviet film studio, Siberia',
    thread: 'aether',
    summary:
      'A film crew shooting in a Soviet research facility accidentally activates a 115 teleporter, unleashing an outbreak — with a zombified George A. Romero among the undead. The trapped O4 crew contacts Richtofen from a sealed control room via radio, transmitting coordinates critical to his Aether plan. The Wunderwaffe DG-2 and VR-11 wonder weapons feature prominently.',
    mapId: 'call-of-the-dead',
    x: 1540, y: 520,
  },

  // ════════════════════════════════════════════
  //  CHAOS STORY
  // ════════════════════════════════════════════

  {
    id: 'ix',
    title: 'IX',
    date: '52 AD',
    dateSort: 52,
    location: 'Roman Coliseum',
    thread: 'chaos',
    summary:
      'The four Chaos crew — Bruno, Scarlett, Diego, and Stanton — are transported to a Roman arena hosting zombie gladiator games in honor of the gods. IX introduces the Chaos storyline, the Artifact mechanic, and the Sentinel Artifact system that powers each map\'s setup.',
    mapId: 'ix',
    x: 100, y: 680,
  },
  {
    id: 'ancient-evil',
    title: 'Ancient Evil',
    date: '400 BC',
    dateSort: -400,
    location: 'Delphi, Greece',
    thread: 'chaos',
    summary:
      'The crew reaches the Oracle of Delphi where Perseus pursues godhood through 115 Artifacts. God-hand upgrades, eagle cage rituals, and an Amphitheater trial sequence gate the final confrontation. The underworld is accessible via Pegasus flight.',
    mapId: 'ancient-evil',
    x: 460, y: 680,
  },
  {
    id: 'voyage-of-despair',
    title: 'Voyage of Despair',
    date: 'April 1912',
    dateSort: 1912,
    location: 'RMS Titanic',
    thread: 'chaos',
    summary:
      'The Chaos crew arrives aboard the Titanic as it sinks. A Sentinel Artifact aboard the ship caused the outbreak. The crew races through flooding decks to contain the spread before the ship goes under. The sinking itself is a timed structural hazard.',
    mapId: 'voyage-of-despair',
    x: 820, y: 680,
  },
  {
    id: 'dead-of-the-night',
    title: 'Dead of the Night',
    date: 'October 1912',
    dateSort: 1912,
    location: 'Crimson Manor, England',
    thread: 'chaos',
    summary:
      'An English manor hosts a secret society meeting. Vampires, werewolves, and a zombie outbreak erupt. Alistair Rhodes\' collection — including another Artifact — is at stake. Silver Bullets, Alistair\'s Folly wonder weapon, and werewolf escort define the quest.',
    mapId: 'dead-of-the-night',
    x: 1180, y: 680,
  },
  {
    id: 'shadows-of-evil',
    title: 'Shadows of Evil',
    date: '1940',
    dateSort: 1940,
    location: 'Morg City, USA',
    thread: 'chaos',
    summary:
      'Four criminals in a 1940s noir city are manipulated by the Shadow Man into awakening a Rift. Each character transforms into a "Beast" to open barriers and power ritual sites. The Shadow Man\'s masters — the Apothicons — are being summoned from beyond.',
    mapId: 'shadows-of-evil',
    x: 1540, y: 680,
  },
  {
    id: 'alpha-omega',
    title: 'Alpha Omega',
    date: '2025',
    dateSort: 2025,
    location: 'Nuketown Bunker, Nevada',
    thread: 'chaos',
    summary:
      'The Chaos crew reaches a bunker beneath the Nuketown test site. Rushmore — an AI controlling the facility — and a trapped Avogadro threaten to destabilize everything. Ray Gun Mark II variants are assembled here. The Chaos storyline accelerates toward its end.',
    mapId: 'alpha-omega',
    x: 1900, y: 680,
  },
  {
    id: 'tag-der-toten',
    title: 'Tag der Toten',
    date: '2035',
    dateSort: 2035,
    location: 'Arctic research station',
    thread: 'chaos',
    summary:
      'The final chapter of the Chaos story. The crew reaches an arctic facility where Nikolai uses the Agarthan Device to destroy the entire multiverse — erasing Element 115, Agartha, and Dr. Monty from existence. The Aether cycle ends permanently. Zipline traversal, lighthouse beam-routing, and a moving Seal of Duality finale close the arc.',
    mapId: 'tag-der-toten',
    x: 2260, y: 680,
  },

  // ════════════════════════════════════════════
  //  DARK AETHER STORY  ·  Row 4  (y = 920)
  // ════════════════════════════════════════════

  {
    id: 'die-maschine',
    title: 'Die Maschine',
    date: 'November 1984',
    dateSort: 1984,
    location: 'Morasko, Poland',
    thread: 'dark-aether',
    summary:
      'Requiem — a CIA-backed task force — investigates a decommissioned Nazi particle collider in Poland that has torn open a Dark Aether rift. Manglers and Plaguehounds pour through. Samantha Maxis is discovered trapped inside the Dark Aether dimension. After shutting down the collider and extracting Maxis, Requiem\'s Cold War arc begins in earnest.',
    mapId: 'die-maschine',
    x: 100, y: 920,
  },
  {
    id: 'firebase-z',
    title: 'Firebase Z',
    date: 'Early 1985',
    dateSort: 1985,
    location: 'Firebase Ripcord, Vietnam',
    thread: 'dark-aether',
    summary:
      'Requiem deploys to a US firebase in Vietnam where Omega Group has been harvesting Dark Aether energy from captive zombie subjects. Peck — a disaffected Omega scientist — assists against his own organization. The crew recovers critical data on Omega\'s plans to weaponize Dark Aether entities and disable a massive Orda creature.',
    mapId: 'firebase-z',
    x: 460, y: 920,
  },
  {
    id: 'mauer-der-toten',
    title: 'Mauer der Toten',
    date: 'Summer 1985',
    dateSort: 1985.5,
    location: 'East Berlin, Germany',
    thread: 'dark-aether',
    summary:
      'A catastrophic zombie outbreak erupts in East Berlin, threatening to expose the Dark Aether to the world. Klaus, a prototype robot soldier, serves as a controllable ally. The divided city — split by the Berlin Wall — creates two interlocking sectors. Requiem recovers an Omega databank before Discordian forces can claim it.',
    mapId: 'mauer-der-toten',
    x: 820, y: 920,
  },
  {
    id: 'forsaken',
    title: 'Forsaken',
    date: 'October 1985',
    dateSort: 1985.9,
    location: 'Outpost 25, Ralston, California',
    thread: 'dark-aether',
    summary:
      'Requiem\'s leadership is betrayed and imprisoned inside the Dark Aether by Cornelius Peck acting on Omega orders. Samantha Maxis sacrifices herself to seal the rift permanently, ending the Cold War crisis. Director Strauss is arrested. The Chrysalax wonder weapon is assembled from Dark Aether crystal shards. This closes the Black Ops Cold War arc.',
    mapId: 'forsaken',
    x: 1180, y: 920,
  },
  {
    id: 'liberty-falls',
    title: 'Liberty Falls',
    date: '2027',
    dateSort: 2027,
    location: 'Liberty Falls, West Virginia',
    thread: 'dark-aether',
    summary:
      'Years after the Cold War crisis, a Dark Aether outbreak consumes the small town of Liberty Falls. Terminus Outcomes — a private successor to Requiem — investigates alongside surviving operatives. The town\'s church hides a critical Sentinel Artifact. Liberty Falls and Terminus are simultaneous launch maps opening the Black Ops 6 Dark Aether arc.',
    mapId: 'liberty-falls',
    x: 1540, y: 920,
  },
  {
    id: 'terminus',
    title: 'Terminus',
    date: '2027',
    dateSort: 2027.1,
    location: 'Terminus Island, Pacific Ocean',
    thread: 'dark-aether',
    summary:
      'A maximum-security Terminus Outcomes research facility on a remote Pacific island is overrun. An Abomination — a titanic Dark Aether entity — threatens to consume the island. Prisoner records reveal connections to Requiem\'s Cold War experiments. Underwater traversal and the Jet Gun wonder weapon define the map\'s mechanics.',
    mapId: 'terminus',
    x: 1900, y: 920,
  },
  {
    id: 'citadelle-des-morts',
    title: 'Citadelle des Morts',
    date: '2027',
    dateSort: 2027.2,
    location: 'Medieval castle, France',
    thread: 'dark-aether',
    summary:
      'A Dark Aether rift has phased a medieval French fortress into temporal stasis. Undead knights and era-blending abominations guard the keep. Records left by an ancient monastic order reveal they first encountered the Dark Aether centuries ago. The Mort Cannon wonder weapon is constructed from century-old Dark Aether-infused components.',
    mapId: 'citadelle-des-morts',
    x: 2260, y: 920,
  },
  {
    id: 'the-tomb',
    title: 'The Tomb',
    date: '2028',
    dateSort: 2028,
    location: 'Antarctic research station',
    thread: 'dark-aether',
    summary:
      'The crew descends into a frozen Antarctic research station to recover a critical containment device. Dark Aether energy has crystallized the entire facility, creating unpredictable spatial rifts. The final chapter of the BO6 narrative brings the ongoing Dark Aether storyline to a decisive confrontation — and ties the new arc back to the Cold War origins of the rift.',
    mapId: 'the-tomb',
    x: 2620, y: 920,
  },
];

export const LORE_CONNECTIONS: LoreConnection[] = [
  // Aether main chain
  { id: 'a0a', source: 'pre-history', target: 'great-war' },
  { id: 'a0b', source: 'great-war',   target: 'origins' },
  { id: 'a1', source: 'origins',        target: 'shi-no-numa' },
  { id: 'a2', source: 'shi-no-numa',    target: 'der-riese' },
  { id: 'a3', source: 'der-riese',      target: 'kino-der-toten' },
  { id: 'a4', source: 'kino-der-toten', target: 'ascension' },
  { id: 'a5', source: 'ascension',      target: 'moon' },
  { id: 'a6', source: 'moon',           target: 'tranzit' },
  { id: 'a7', source: 'tranzit',        target: 'buried' },
  { id: 'a8', source: 'buried',         target: 'revelations' },

  // Aether converge on Revelations
  { id: 'a9',  source: 'blood-of-the-dead', target: 'revelations' },
  { id: 'a10', source: 'gorod-krovi',        target: 'revelations' },

  // Aether side branches
  { id: 'a11', source: 'tranzit',          target: 'die-rise' },
  { id: 'a12', source: 'die-rise',         target: 'buried' },
  { id: 'a13', source: 'zetsubou-no-shima', target: 'gorod-krovi' },

  // Location link (same place, different eras)
  { id: 'a14', source: 'mob-of-the-dead', target: 'blood-of-the-dead', label: 'same island' },

  // Primis arc (new maps)
  { id: 'p1', source: 'der-riese',        target: 'der-eisendrache' },
  { id: 'p2', source: 'der-eisendrache',  target: 'zetsubou-no-shima' },

  // Aether secondary branches
  { id: 'b1', source: 'ascension', target: 'call-of-the-dead' },

  // Chaos chain
  { id: 'c1', source: 'voyage-of-despair',  target: 'dead-of-the-night' },
  { id: 'c2', source: 'shadows-of-evil',    target: 'alpha-omega' },
  { id: 'c3', source: 'alpha-omega',        target: 'tag-der-toten' },

  // Dark Aether chain
  { id: 'd1', source: 'die-maschine',         target: 'firebase-z' },
  { id: 'd2', source: 'firebase-z',           target: 'mauer-der-toten' },
  { id: 'd3', source: 'mauer-der-toten',      target: 'forsaken' },
  { id: 'd4', source: 'forsaken',             target: 'liberty-falls' },
  { id: 'd5', source: 'liberty-falls',        target: 'terminus' },
  { id: 'd6', source: 'terminus',             target: 'citadelle-des-morts' },
  { id: 'd7', source: 'citadelle-des-morts',  target: 'the-tomb' },
];
