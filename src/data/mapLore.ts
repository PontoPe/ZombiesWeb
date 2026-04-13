
export type StoryImpact = 'Low' | 'Medium' | 'High' | 'Critical';

export interface MapLoreHeader {
  setting: string;
  crew: string[];
  storyImpact: StoryImpact;
  zombieController: string;
}

export interface LoreSubsection {
  heading: string;
  text: string;
}

export interface MapLoreEntry {
  nodeId: string;
  title: string;
  header: MapLoreHeader;
  prelude: LoreSubsection[];
  quest: LoreSubsection[];
  aftermath: LoreSubsection[];
}

function lore(
  nodeId: string,
  title: string,
  header: MapLoreHeader,
  prelude: LoreSubsection[],
  quest: LoreSubsection[],
  aftermath: LoreSubsection[],
): MapLoreEntry {
  return { nodeId, title, header, prelude, quest, aftermath };
}

export const MAP_LORE: MapLoreEntry[] = [

  lore('great-war', 'THE GREAT WAR', {
    setting: 'The borderlands between Earth and Agartha, circa 1292 AD. An interdimensional battlefield where reality itself is tearing apart under the strain of the Apothicon invasion.',
    crew: ['The four champions of the Great War (the original Primis)', 'The Keepers'],
    storyImpact: 'Critical',
    zombieController: 'The Apothicons',
  }, [
    { heading: 'The Apothicon Invasion',
      text: 'Long before the events of any playable map, the Keepers — ancient beings who discovered and harnessed the energy of the Aether — split into two factions. Those corrupted by the Dark Aether became the Apothicons, monstrous entities bent on consuming all of reality. The Apothicons breached the dimensional barrier and invaded the physical world, threatening to devour Earth and everything on it.' },
    { heading: 'The Summoning of Champions',
      text: 'Desperate, the remaining Keepers reached across time and space to recruit four human warriors — the original Primis. These champions were drawn from different walks of life but shared an uncommon resilience. Armed with elemental staffs powered by Element 115, they stood alongside the Keepers at the threshold between dimensions.' },
  ], [
    { heading: 'The Battle',
      text: 'The Great War was a cataclysmic conflict fought across multiple planes of existence. The Apothicons unleashed waves of undead and elder horrors. The four champions wielded the elemental staffs — fire, ice, lightning, and wind — to push back the invasion. The Keepers channeled the Aether\'s energy to seal dimensional rifts as they formed.' },
    { heading: 'Sealing the Apothicons',
      text: 'Through a combined effort, the champions and the Keepers managed to banish the Apothicons back into the Dark Aether and seal the breach. The Summoning Key — the most powerful artifact in existence, capable of trapping souls and manipulating dimensions — was used to lock the gateway. The Apothicons were imprisoned, but not destroyed.' },
  ], [
    { heading: 'The Foundation of Everything',
      text: 'The Great War is the single most important event in the entire Aether storyline. Every fracture, every timeline, every map that follows branches from this moment. The sealing of the Apothicons established the dimensional order that would later be shattered by Element 115 experimentation.' },
    { heading: 'Seeds of the Future',
      text: 'The Summoning Key remained hidden in the physical world. Element 115 meteorites — remnants of the Apothicon invasion — embedded themselves across the globe, waiting to be discovered centuries later by Group 935. The cycle that would trap Primis in an eternal loop was set in motion. The prophecy written in the Kronorium foretold that the champions would return.' },
  ]),

  lore('nacht', 'NACHT DER UNTOTEN', {
    setting: 'An abandoned airfield bunker in northern Germany, 1945. A small concrete structure surrounded by fog and the stench of decay. The first known site of a modern zombie outbreak.',
    crew: ['Unnamed US Marines'],
    storyImpact: 'Medium',
    zombieController: 'Samantha Maxis (from the MPD)',
  }, [
    { heading: 'Crash Landing',
      text: 'In the final days of World War II, a squad of United States Marines crash-landed near an abandoned German airfield. With their aircraft destroyed and no way to call for extraction, they took shelter in the only structure available — a decrepit concrete bunker that had served as a Wehrmacht outpost.' },
    { heading: 'The First Outbreak',
      text: 'Unknown to the Marines, the bunker sat near a deposit of Element 115, the extraterrestrial mineral that Group 935 had been experimenting with throughout the war. The element\'s radiation had been reanimating the dead in the surrounding area. As night fell, the dead began to rise.' },
  ], [
    { heading: 'Survival at All Costs',
      text: 'With no Easter egg quest or grand objective, Nacht der Untoten is pure survival. The Marines barricade windows, scavenge weapons from the walls, and fight wave after wave of zombies. The bunker is tiny — two floors connected by a staircase, with a "help" door that can be purchased to access the upper level. There is no power, no perks, no Pack-a-Punch. Just bullets, boards, and the undead.' },
    { heading: 'The Mystery Box',
      text: 'The only supernatural element within the bunker is the Mystery Box — a glowing crate containing random weapons that appears to be connected to the Aether. It is the first indication that something far larger is at play. The box would go on to appear in every subsequent outbreak, always offering hope at a price.' },
  ], [
    { heading: 'Where It All Began',
      text: 'Nacht der Untoten is the genesis point of the entire Zombies saga. While it tells no explicit story, it establishes the fundamental question: why are the dead rising? The answer — Element 115, Group 935, and the manipulation of the Aether — would unfold across dozens of maps over the next decade of real-world releases.' },
    { heading: 'A Warning Unheeded',
      text: 'The outbreak at the airfield was one of many that occurred as World War II ended. Group 935\'s experiments had scattered Element 115 across Europe and the Pacific, and the dead were rising at every site. The world\'s governments would attempt to cover up these events, but the damage was already done. The stage was set for Verrückt, Shi No Numa, and the discovery that would change everything at Der Riese.' },
  ]),

  lore('verruckt', 'VERRÜCKT', {
    setting: 'Wittenau Sanatorium, a Group 935 asylum turned black site in Berlin, 1945. The facility reeks of medical experiments and madness. Electroshock therapy equipment lines the corridors.',
    crew: ['Marine squad led by "Tank" Dempsey (pre-Ultimis)', 'Peter McCain (prior operative, MIA)'],
    storyImpact: 'High',
    zombieController: 'Samantha Maxis',
  }, [
    { heading: 'The Rescue Mission',
      text: 'Following reports of a downed American operative — Peter McCain, an OSS spy embedded within Group 935 — the US Marine Raiders dispatched a rescue team. Among them was Corporal "Tank" Dempsey, a hardened soldier whose file would later be flagged by Group 935 for his exceptional resilience and aggression. The team was ordered to infiltrate Wittenau Sanatorium, a psychiatric hospital that Group 935 had converted into a research annex.' },
    { heading: 'Group 935\'s Asylum Experiments',
      text: 'Wittenau Sanatorium was no ordinary hospital. Under Dr. Richtofen\'s direction, Group 935 had been using the patients as test subjects for Element 115 exposure and teleporter experiments. Electroshock therapy was combined with 115 injections in an attempt to create controllable undead soldiers. The experiments failed catastrophically — the subjects reanimated but could not be controlled, and the facility was overrun.' },
  ], [
    { heading: 'Split Spawn, Desperate Survival',
      text: 'Verrückt introduced the split-start mechanic — the four players spawn on opposite sides of the asylum and must fight through zombie hordes to reunite. The facility is a labyrinth of dark corridors, operating rooms, and flooded basements. The notorious dentist\'s chair and blood-spattered walls tell the story of what Group 935 did here without a single word of dialogue.' },
    { heading: 'The Birth of Perks',
      text: 'Verrückt is the birthplace of Perk-a-Cola machines — Juggernog, Speed Cola, Double Tap Root Beer, and Quick Revive all make their first appearance here. In-universe, these machines were developed by Group 935 as performance enhancers for their soldiers. The jingles that play when you purchase them hint at a corporate veneer over something deeply sinister. These machines would become a staple of every map going forward.' },
    { heading: 'The Hanging Man',
      text: 'Deep within the facility, players can find a body hanging from the ceiling — widely believed to be Peter McCain, the very operative Dempsey was sent to rescue. The mission was already a failure before it began. This grim discovery is one of the first overt story beats in Zombies, connecting the gameplay to a larger narrative.' },
  ], [
    { heading: 'Dempsey\'s Capture',
      text: 'Canonically, the rescue mission fails. The Marines are overwhelmed by the undead. Dempsey is the sole survivor, and he is captured by Group 935 — specifically by Dr. Edward Richtofen. Richtofen subjects Dempsey to the same 115 experimentation that created the zombie outbreak, erasing portions of his memory but failing to break his spirit. Dempsey would later be conscripted into the Ultimis crew alongside Nikolai, Takeo, and Richtofen himself.' },
    { heading: 'A Turning Point',
      text: 'Verrückt is where the Zombies storyline shifts from "random Marines fighting zombies" to a deliberate narrative about Group 935, Element 115, and the individuals who would become the iconic Ultimis crew. Every map after this builds on the revelations found in these bloodied asylum halls.' },
  ]),

  lore('gorod-krovi', 'GOROD KROVI', {
    setting: 'A fractured version of Stalingrad, Soviet Union, November 6th, 1945. In this Agonia fracture, the Battle of Stalingrad never ended — dragons now patrol the skies alongside zombie hordes, and mechanized soldiers roam the ruins.',
    crew: ['Primis — Tank Dempsey, Nikolai Belinski, Takeo Masaki, Edward Richtofen'],
    storyImpact: 'High',
    zombieController: 'Dr. Groph / Sophia (A.I.)',
  }, [
    { heading: 'The Soul Collection Mission',
      text: 'Following the events of Zetsubou No Shima, where Primis secured Takeo\'s soul, the crew travels to a fractured version of Stalingrad to collect the soul of Ultimis Nikolai. Richtofen has been following the Kronorium\'s instructions — he must collect the souls of all four Ultimis versions in the Summoning Key to complete his plan to secure a better tomorrow.' },
    { heading: 'A Stalingrad That Never Fell',
      text: 'In the Agonia fracture, history diverged catastrophically. Group 935\'s dragon experiments succeeded, producing fire-breathing reptilian weapons. Soviet forces never reclaimed the city. Instead, Stalingrad became a perpetual warzone where the living, the dead, and the dragons exist in an endless three-way battle. Dr. Groph, a loyal Group 935 scientist, has set up operations here, continuing Richtofen\'s work from the shadows.' },
  ], [
    { heading: 'Navigating the Warzone',
      text: 'Gorod Krovi is one of the most chaotic maps in the franchise. Players navigate a bombed-out Stalingrad under siege from zombies, Manglers (mechanized soldiers with arm cannons), and Valkyrie Drones. Dragons periodically strafe the map with fire, and a massive dragon serves as the map\'s transportation system — players ride it between areas of the city.' },
    { heading: 'Building the Dragon Strike',
      text: 'The Dragon Strike Controller is this map\'s signature buildable — a device that calls in a targeted dragon fire-bombing run on a location of the player\'s choosing. Assembling it requires navigating the entire map, collecting parts from dragon-guarded areas, and surviving the Valkyrie Drone ambushes in the process.' },
    { heading: 'Nikolai\'s Soul',
      text: 'The main Easter egg quest culminates in a battle against a massive mechanized dragon controlled by Sophia, Maxis\'s A.I. assistant. After defeating it, Primis confronts Ultimis Nikolai. Richtofen uses the Summoning Key to absorb Nikolai\'s soul — the third of four needed. The scene is emotional; Nikolai, a drunk who buries his pain in vodka, finally finds peace as his fractured self is laid to rest.' },
  ], [
    { heading: 'Three Down, One to Go',
      text: 'With Nikolai\'s soul secured, Primis now has three of the four Ultimis souls in the Summoning Key (Dempsey from Der Eisendrache, Takeo from Zetsubou, Nikolai from Gorod Krovi). Only Richtofen\'s own soul remains — and collecting it will require the most dangerous journey yet.' },
    { heading: 'The Road to Revelations',
      text: 'After the Easter egg completion, the crew is teleported directly into the heart of a fractured reality — Revelations, where the Shadow Man has fused remnants of every previous map into one horrifying arena. The soul collection is complete, but Richtofen\'s true plan and the implications of what he\'s done are about to be revealed.' },
  ]),

  lore('five-agonia', 'FIVE', {
    setting: 'The Pentagon, Washington D.C., November 6th, 1963. Deep beneath the world\'s most secure military headquarters, an outbreak tears through the halls of power during the height of the Cold War.',
    crew: ['President John F. Kennedy', 'Secretary of Defense Robert McNamara', 'President Richard Nixon', 'Prime Minister Fidel Castro'],
    storyImpact: 'Medium',
    zombieController: 'Samantha Maxis',
  }, [
    { heading: 'A Meeting of World Leaders',
      text: 'On November 6th, 1963, President John F. Kennedy convened a secret meeting at the Pentagon with Secretary of Defense Robert McNamara, former Vice President Richard Nixon, and — in a stunning twist of Cold War diplomacy — Cuban Prime Minister Fidel Castro. The meeting concerned intelligence about Group 935\'s research and the growing threat of Element 115. The US government had been running its own parallel program, Broken Arrow, to weaponize 115.' },
    { heading: 'The Broken Arrow Connection',
      text: 'Unknown to most of the Pentagon\'s staff, Element 115 samples were being stored and studied in laboratories beneath the building. The Broken Arrow program had been acquiring 115 from former Group 935 sites and conducting experiments that mirrored — and in some cases exceeded — what the Nazis had done. Security protocols failed, and the dead began to rise within the most secure building in the free world.' },
  ], [
    { heading: 'Playing as World Leaders',
      text: '"Five" is unique in that players control four of the most recognizable political figures of the 20th century. JFK delivers quips about the space race, Nixon grumbles about communists, Castro makes sardonic observations, and McNamara approaches the situation with military precision. The humor is dark, but the scenario is terrifying — the zombie outbreak has reached the heart of American power.' },
    { heading: 'The Pentagon Thief',
      text: 'The map\'s signature mechanic is the Pentagon Thief — a teleporting scientist (later revealed to be connected to the experiments below) who appears at regular intervals and steals the players\' weapons. He must be killed before he escapes, or the stolen weapons are lost permanently. He warps between floors of the Pentagon, making the chase frantic and dangerous.' },
    { heading: 'The Defcon System',
      text: 'Players navigate between floors of the Pentagon using the DEFCON switch system. Activating all DEFCON switches changes the alert level, opening new areas and eventually granting access to the Pack-a-Punch machine in the War Room. The map\'s layout — elevators, conference rooms, laboratories — sells the fantasy of fighting zombies in America\'s most classified spaces.' },
  ], [
    { heading: 'Government Knowledge',
      text: '"Five" confirms that the highest levels of the US government were aware of Element 115 and the zombie threat. The Broken Arrow program would continue to operate for decades, eventually playing a central role in maps like Alpha Omega. The events at the Pentagon were covered up, but the knowledge gained here informed American policy on 115 containment for years.' },
    { heading: 'Foreshadowing',
      text: 'The outbreak at the Pentagon occurs on the same day as the events of Ascension. The timeline is converging — multiple outbreaks happening simultaneously across the globe, all triggered by 115 experimentation. The world is being pushed toward the breaking point that will culminate on the Moon.' },
  ]),

  lore('zetsubou', 'ZETSUBOU NO SHIMA', {
    setting: 'A Division 9 research facility on a remote island in the Pacific, October 18th, 1945. The jungle has been mutated by Element 115 — carnivorous plants, giant spiders, and flooded research tunnels fill the landscape.',
    crew: ['Primis — Tank Dempsey, Nikolai Belinski, Takeo Masaki, Edward Richtofen'],
    storyImpact: 'High',
    zombieController: 'Element 115 corruption (Takeo\'s experiments)',
  }, [
    { heading: 'Division 9\'s Island',
      text: 'Following the events of Der Eisendrache, where Primis secured Dempsey\'s soul, the crew teleports to a remote Pacific island. This island housed Division 9 — the Japanese counterpart to Group 935, sharing research and Element 115 samples through a wartime alliance. Division 9\'s experiments focused on biological applications of 115: mutating plant life, creating super-soldiers, and breeding weaponized insects.' },
    { heading: 'Takeo\'s Personal Mission',
      text: 'For Takeo, this map is deeply personal. The Ultimis version of Takeo was betrayed by the Emperor and delivered to Division 9 as a test subject. He was experimented on, mutated, and left to rot in this facility. Primis Takeo must now confront the broken shell of his other self and grant him an honorable death — collecting his soul for the Summoning Key.' },
  ], [
    { heading: 'A Living, Hostile Island',
      text: 'Zetsubou No Shima\'s environment is its greatest threat. The jungle is alive with mutated plant life — spore clouds that obscure vision, vines that grab players, and man-eating plants that must be carefully cultivated. The research facility is partially flooded, requiring players to swim through underwater tunnels where zombies lurk beneath the surface. Thrasher zombies — massive fungal mutations — serve as mini-bosses.' },
    { heading: 'The KT-4 Wonder Weapon',
      text: 'The KT-4 (and its upgraded form, the Masamune) is this map\'s buildable wonder weapon — a biological weapon that fires pods of mutated 115 plant matter. Building it requires collecting parts from across the island, including irradiated water from the facility\'s flooded lower levels. The weapon can also be used to grow special plants that provide tactical advantages.' },
    { heading: 'Confronting Ultimis Takeo',
      text: 'The main Easter egg involves navigating the island\'s elaborate underground laboratory, powering up Division 9\'s equipment, and ultimately confronting a giant spider boss that guards the inner sanctum. After defeating it, Primis finds Ultimis Takeo — barely alive, mutated, and suffering. In the map\'s most emotional scene, Primis Takeo performs a mercy killing with a katana, and Richtofen captures his soul in the Summoning Key. Takeo whispers his final words about honor, duty, and the Emperor who betrayed him.' },
  ], [
    { heading: 'The Second Soul Secured',
      text: 'With Takeo\'s soul now in the Summoning Key alongside Dempsey\'s, Primis is halfway through their collection mission. The emotional weight is building — each soul collection forces the crew to witness what their alternate selves endured, and each death is a reminder of what is at stake.' },
    { heading: 'Onward to Stalingrad',
      text: 'The Kronorium directs Primis to the Agonia fracture next — a nightmarish version of Stalingrad where dragons fill the skies. Nikolai\'s soul awaits. The crew teleports out of the collapsing island facility, leaving Division 9\'s horrors behind but carrying the weight of Takeo\'s sacrifice forward.' },
  ]),

  lore('the-giant', 'THE GIANT', {
    setting: 'The Der Riese facility in Breslau, Poland, October 13th, 1945. A Group 935 weapons research complex housing the Matter Transference Device and Wunderwaffe DG-2 prototypes. This is the Deceptio fracture version of events.',
    crew: ['Primis — Tank Dempsey, Nikolai Belinski, Takeo Masaki, Edward Richtofen'],
    storyImpact: 'Critical',
    zombieController: 'Samantha Maxis (initially)',
  }, [
    { heading: 'The Moment Everything Changes',
      text: 'After the events of Origins, where the young Primis crew assembled the elemental staffs and opened the gateway to Agartha, Richtofen received instructions from the Kronorium. He learned that to save the universe, he must travel to the moment his older Ultimis self betrays Maxis at Der Riese — and kill him. This single act would create the Deceptio fracture, shattering the original timeline but opening a path to collect the four souls needed to set things right.' },
    { heading: 'Teleporting to 1945',
      text: 'Primis arrives at Der Riese through a temporal rift, moments after Ultimis Richtofen has trapped Maxis and Samantha in the Matter Transference Device teleporter. The facility is in chaos — the teleporter experiments have destabilized the local space-time, zombies are overrunning the compound, and Group 935 personnel have either fled or been killed.' },
  ], [
    { heading: 'Killing His Other Self',
      text: 'The map opens with one of the most iconic cutscenes in Zombies history. Primis Richtofen confronts Ultimis Richtofen in the teleporter room. Without hesitation, he shoots his older self in the head with a pistol. "I\'m sorry... I truly am," he says. Ultimis Dempsey, Nikolai, and Takeo are stunned. Primis Richtofen explains nothing — he simply tells his crew that "things are about to get a lot worse before they get better." The act fractures the timeline, creating the Deceptio branch.' },
    { heading: 'Holding the Facility',
      text: 'Gameplay-wise, The Giant is a remastered Der Riese — the classic three-teleporter layout with the mainframe, catwalk, and Pack-a-Punch linkage. Players must activate each teleporter by linking it to the mainframe, fighting through increasingly intense waves. The Annihilator pistol and classic Wunderwaffe DG-2 return. The fly trap Easter egg from the original returns as well.' },
    { heading: 'Sending the Beacon',
      text: 'The main Easter egg involves activating all three teleporters and triggering a hidden radio sequence. Richtofen uses Group 935\'s equipment to send a beacon to Doctor Maxis across dimensions — a signal that will guide Maxis to them and help coordinate the next phase of the plan. The beacon is confirmed received, setting up the events of Der Eisendrache.' },
  ], [
    { heading: 'The Fracture Ripples',
      text: 'By killing Ultimis Richtofen, Primis Richtofen created the Deceptio fracture — one of several timeline breaks that splinter reality. The original timeline where Ultimis completes their journey (Shi No Numa → Der Riese → Kino → Moon) still exists as the True Timeline, but now an alternate branch has formed. Richtofen\'s actions here will have consequences that echo through every subsequent map.' },
    { heading: 'The Plan Takes Shape',
      text: 'The beacon sent from Der Riese reaches Maxis, who begins coordinating from Agartha. Primis now has a clear mission: travel through the fractures, collect the four Ultimis souls, and use the Summoning Key to restore order. Their next destination is an Austrian castle in the Alps — Der Eisendrache — where Ultimis Dempsey is being held.' },
  ]),

  lore('der-eisendrache', 'DER EISENDRACHE', {
    setting: 'Eagle\'s Nest — a medieval Austrian castle in the Alps repurposed by Group 935, November 5th, 1945. The fortress houses a death ray, a rocket launch pad, and an MPD (Moon Pyramid Device) replica. Snow-covered battlements overlook a vast mountain range.',
    crew: ['Primis — Tank Dempsey, Nikolai Belinski, Takeo Masaki, Edward Richtofen'],
    storyImpact: 'Critical',
    zombieController: 'Dr. Groph (Group 935)',
  }, [
    { heading: 'Following the Beacon',
      text: 'After killing Ultimis Richtofen at The Giant and sending a beacon to Maxis, Primis follows coordinates to Griffin Castle (Der Eisendrache) in the Austrian Alps. Group 935 has been using this castle as a secondary research facility, and Dr. Groph — Richtofen\'s most loyal scientist — has been conducting experiments with a replica of the Moon Pyramid Device (MPD). Ultimis Dempsey has been captured and is being held here in cryogenic stasis aboard a rocket bound for the Moon.' },
    { heading: 'A Race Against Time',
      text: 'Primis must reach Dempsey before Groph launches the rocket to Griffin Station on the Moon. If the rocket launches with Dempsey aboard, his soul will be beyond their reach. The castle is heavily fortified with Group 935 defenses, Panzer Soldats, and the undead. Time is not on their side.' },
  ], [
    { heading: 'The Wrath of the Ancients',
      text: 'Der Eisendrache\'s defining feature is its bow system. Players discover the Wrath of the Ancients — an ancient bow left behind by the Keepers. It can be upgraded into four elemental variants: the Storm Bow (lightning), the Wolf Bow (spectral wolves), the Fire Bow (lava), and the Void Bow (skulls). Each upgrade quest is elaborate, involving ancient symbols, time travel, and environmental puzzles spread across the castle. The Storm Bow, in particular, is considered one of the most powerful wonder weapons in Zombies history.' },
    { heading: 'The Anti-Gravity Chamber',
      text: 'A key area of the map is the pyramid room — housing a replica MPD that can activate zero-gravity zones throughout the castle. Players use the anti-gravity mechanic to reach otherwise inaccessible areas, collect parts, and solve Easter egg steps. The room itself is a visual masterpiece, with the pyramid pulsing with Aether energy.' },
    { heading: 'Destroying the Moon',
      text: 'The main Easter egg quest is one of the most epic in Zombies. After upgrading the bows, assembling the death ray, and navigating the castle\'s secrets, players must confront the Keeper boss in a brutal arena fight. After defeating it, they redirect the castle\'s rockets to destroy the Moon — specifically Griffin Station and the MPD. As the Moon cracks apart in the sky, Primis confronts Ultimis Dempsey in his cryo-pod. Richtofen uses the Summoning Key to absorb his soul. Dempsey, a soldier to the end, accepts his fate with quiet dignity.' },
  ], [
    { heading: 'The First Soul',
      text: 'Dempsey\'s soul is the first collected in the Summoning Key. The emotional toll on the crew is immediate — they have just witnessed one version of their friend die to serve a plan they don\'t fully understand. Richtofen promises it\'s necessary, but trust is fraying. The destruction of the Moon sends shockwaves through the timeline.' },
    { heading: 'The Journey Continues',
      text: 'With one soul collected and the Moon in ruins, Primis must now travel to a remote Pacific island where Division 9 has been conducting biological experiments. Takeo\'s counterpart awaits in Zetsubou No Shima. The stakes are rising, and Richtofen\'s refusal to explain the full plan is creating tension within the group.' },
  ]),

  lore('tt-shi-no-numa', 'SHI NO NUMA', {
    setting: 'A Japanese swamp research facility operated by Group 935 and Division 9, September 17th, 1945. Decrepit wooden buildings built on stilts over murky water, surrounded by dense jungle and rising fog.',
    crew: ['Ultimis — Tank Dempsey, Nikolai Belinski, Takeo Masaki, Edward Richtofen'],
    storyImpact: 'High',
    zombieController: 'Samantha Maxis',
  }, [
    { heading: 'Richtofen\'s Hidden Agenda',
      text: 'Dr. Edward Richtofen, having already betrayed Maxis and trapped him and Samantha in the teleporter at Der Riese, now leads the Ultimis crew to a remote Group 935/Division 9 facility in a Japanese swamp. His stated reason is to investigate ongoing research, but his true objective is to retrieve the Vril Device — an ancient artifact connected to the Aether that he needs for his master plan to control the zombies.' },
    { heading: 'Division 9\'s Swamp Lab',
      text: 'The facility was jointly operated by Group 935 and Division 9, the Imperial Japanese Army\'s paranormal research division. The swamp location was chosen because of a naturally occurring deposit of Element 115 deep beneath the marshland. Experiments here focused on using 115 to reanimate and control the dead as weapons. When the war ended, the staff abandoned the facility, leaving their experiments to fester and mutate in the tropical heat.' },
  ], [
    { heading: 'The Swamp Horror',
      text: 'Shi No Numa was the first map to introduce outdoor environments and the concept of random perk locations. The facility consists of a main building surrounded by four huts connected by wooden walkways over waist-deep swamp water. Movement through the water is slow and dangerous — zombies emerge from the muck and can surround players quickly. The atmosphere is oppressive: constant rain, distant screams, and the sound of things moving beneath the water.' },
    { heading: 'The Wunderwaffe DG-2',
      text: 'This map introduces the Wunderwaffe DG-2 — Richtofen\'s personal wonder weapon that fires a bolt of lightning capable of chaining between up to ten zombies. It is the culmination of Group 935\'s energy weapon research and one of the most satisfying weapons in the franchise. Richtofen takes particular pride in its performance.' },
    { heading: 'The Hanging Man and the Meteor',
      text: 'A body hanging from a tree near the facility is later identified as Peter McCain — the OSS spy whose disappearance prompted Dempsey\'s original mission to Verrückt. Players can also interact with four meteorites scattered around the map, which contain Element 115 and play one of the franchise\'s iconic musical Easter eggs. These meteors hint at the extraterrestrial origin of 115.' },
  ], [
    { heading: 'The Golden Rod',
      text: 'Richtofen successfully retrieves the Vril Device (Golden Rod) from the facility. This artifact, combined with the Focusing Stone he will later obtain from Shangri-La, will allow him to interface with the Moon Pyramid Device on the Moon. He tells the others nothing about it, continuing to manipulate them as unwitting pawns in his plan to take control of the Aether.' },
    { heading: 'Onward to Der Riese',
      text: 'With the Vril Device secured, Richtofen leads the crew back to the main Group 935 facility at Der Riese. There, he plans to use the teleporters to advance his scheme — overloading the system to catapult the crew through time and space. The next stop will be Kino der Toten, 1963.' },
  ]),

  lore('tt-der-riese', 'DER RIESE', {
    setting: 'Group 935\'s primary weapons research facility near Breslau, Poland, October 13th, 1945. The factory complex houses the Matter Transference Device, Wunderwaffe laboratories, and the original teleporter prototypes.',
    crew: ['Ultimis — Tank Dempsey, Nikolai Belinski, Takeo Masaki, Edward Richtofen'],
    storyImpact: 'Critical',
    zombieController: 'Samantha Maxis',
  }, [
    { heading: 'Return to the Factory',
      text: 'Fresh from Shi No Numa with the Vril Device in his possession, Richtofen brings the Ultimis crew back to Der Riese — the heart of Group 935\'s operations. He had previously betrayed Dr. Ludvig Maxis and his daughter Samantha here, trapping them in the teleporter with the hellhound Fluffy. Samantha was sent to the Moon, where she bonded with the MPD and became the controller of the undead. Now Richtofen must use the teleporters to advance his plan.' },
    { heading: 'The Fly Trap',
      text: 'Hidden within Der Riese are numerous radio messages recorded by Maxis, Richtofen, and other Group 935 scientists. These recordings reveal the full scope of the betrayal — Maxis discovering Richtofen\'s treachery, Richtofen\'s descent into madness after touching the MPD, and the creation of the Matter Transference Device. They paint a picture of scientific ambition corrupted by the Aether\'s influence.' },
  ], [
    { heading: 'The Classic Layout',
      text: 'Der Riese is one of the most beloved maps in Zombies history. Three teleporters must be linked to the mainframe to activate the Pack-a-Punch machine atop the facility\'s catwalk bridge. The map features tight corridors, an animal testing lab (where Fluffy was transformed into the first hellhound), and the iconic Thompson Room. The pacing is methodical — each teleporter link opens new areas and escalates the zombie threat.' },
    { heading: 'Pack-a-Punch',
      text: 'Der Riese introduced Pack-a-Punch — the weapon upgrade machine that would become a franchise staple. Lore-wise, it was Group 935\'s attempt to enhance existing weapons using Element 115 infusion. The machine transforms regular weapons into devastating tools of destruction, complete with new names and visual effects.' },
    { heading: 'The Teleporter Overload',
      text: 'Canonically, Richtofen deliberately overloads the mainframe teleporter during the crew\'s escape, causing it to catapult them not just through space but through time. Instead of emerging at another Group 935 facility in 1945, they arrive at Kino der Toten in 1963 — eighteen years in the future. Whether this was intentional or accidental on Richtofen\'s part is debated, but it serves his plan perfectly.' },
  ], [
    { heading: 'The Time Jump',
      text: 'The overloaded teleporter sends the Ultimis crew eighteen years into the future. They land in an abandoned Group 935 theater in Berlin, unknowingly jumping over nearly two decades of history. In the interim, the Cold War has begun, the Space Race is underway, and both American and Soviet programs are racing to exploit Element 115. The crew has no idea what year it is when they arrive.' },
    { heading: 'The Point of No Return',
      text: 'Der Riese represents the last moment the Ultimis crew was in their own time period. Everything after this point is a journey through the consequences of Richtofen\'s betrayal of Maxis — a chain of events that will take them from Berlin to the Pentagon, from a Soviet cosmodrome to Siberia, from the Himalayas to the Moon. There is no going back.' },
  ]),

  lore('tt-kino', 'KINO DER TOTEN', {
    setting: 'An abandoned Group 935 theater in Berlin, October 28th, 1963. The facility was used for brainwashing experiments involving Nova 6 gas and zombie projection technology. Film reels and propaganda posters line the walls of this once-grand cinema.',
    crew: ['Ultimis — Tank Dempsey, Nikolai Belinski, Takeo Masaki, Edward Richtofen'],
    storyImpact: 'Medium',
    zombieController: 'Samantha Maxis',
  }, [
    { heading: 'Lost in Time',
      text: 'After the teleporter overload at Der Riese, the Ultimis crew materializes in a darkened theater in Berlin — Kino der Toten, "Theater of the Dead." They have jumped from 1945 to 1963 without realizing it. The facility was one of Group 935\'s many secret sites, this one dedicated to developing zombie mind-control technology through a combination of Element 115 and visual projection (film reels containing encoded brainwashing patterns).' },
    { heading: 'Group 935\'s Movie Theater',
      text: 'The theater was designed to test whether zombies could be controlled through audiovisual programming — projecting specific patterns and frequencies at reanimated subjects strapped into seats. The experiments were partially successful but ultimately abandoned when the facility was overrun. Film reels scattered throughout the theater contain fragmented records of these experiments, along with propaganda footage and coded messages.' },
  ], [
    { heading: 'The Stage Is Set',
      text: 'Kino der Toten\'s layout is iconic: a grand lobby with a staircase, a theater auditorium with a stage, a projector room, and a back alley leading to dressing rooms. The map introduced the Zombies experience to millions of Black Ops players. Its circular training routes — particularly the "stage loop" — defined how players approach high-round strategies to this day.' },
    { heading: 'The Nova Crawlers',
      text: 'Kino introduced Nova Crawlers — zombie test subjects exposed to Nova 6 gas that explode in a cloud of toxic green gas upon death. They crawl along walls and ceilings, creating a new kind of threat. In-lore, these were Group 935\'s attempt to create chemical weapon delivery systems using the undead — each crawler is essentially a walking gas bomb.' },
    { heading: 'The Thundergun',
      text: 'The Thundergun debuts here — a massive pneumatic weapon that fires concentrated blasts of pressurized air, ragdolling entire hordes of zombies. It is one of the most iconic wonder weapons in the franchise. Lore-wise, it was a prototype developed by Group 935 that never made it past the testing phase before the facility was abandoned.' },
    { heading: 'The Teleporter and Film Reels',
      text: 'The stage contains a teleporter that links to the projector room. When activated, it briefly teleports players to various locations — including a room with Samantha\'s belongings and a Pentagon-like office. These glimpses hint at the broader story and Richtofen\'s past. The Pack-a-Punch machine is accessible only through this teleporter.' },
  ], [
    { heading: 'No Explicit Easter Egg',
      text: 'Kino der Toten is notable for having no main quest Easter egg — it is purely a survival map. However, the film reels, radios, and environmental storytelling drop critical lore: references to a "Pentagon outbreak" (foreshadowing "Five"), hints about Samantha\'s control of the zombies, and Richtofen\'s growing obsession with reaching the Moon.' },
    { heading: 'Pushing Forward',
      text: 'After surviving the theater, Richtofen determines that they need to reach the Ascension Facility — a Soviet cosmodrome where Group 935 scientist Gersh has been working with Element 115. The crew\'s journey through time is accelerating, and Richtofen\'s plan is moving toward its climax on the Moon.' },
  ]),

  lore('tt-classified', 'CLASSIFIED', {
    setting: 'The Pentagon, Washington D.C., November 5th, 1963. A reimagining of "Five" from the perspective of the Ultimis crew, revealing classified documents about Broken Arrow, Group 935, and the government\'s secret war against the undead.',
    crew: ['Ultimis — Tank Dempsey, Nikolai Belinski, Takeo Masaki, Edward Richtofen'],
    storyImpact: 'High',
    zombieController: 'Samantha Maxis',
  }, [
    { heading: 'The Ultimis Crew at the Pentagon',
      text: 'Between the events of Kino der Toten and Ascension, the Ultimis crew briefly passes through the Pentagon via a teleporter malfunction. This visit — hidden from the official timeline for years — reveals that the US government detained the crew and interrogated them about Group 935, Element 115, and the zombie threat. Richtofen was of particular interest, given his former role within Group 935.' },
    { heading: 'Broken Arrow Exposed',
      text: 'Classified documents scattered throughout the Pentagon reveal the full scope of the Broken Arrow program — America\'s black-budget initiative to weaponize Element 115. The program operated from multiple sites, including Camp Edward (Nevada), the Pentagon sub-levels, and Groom Lake. What the Americans didn\'t realize was that their experiments were destabilizing the same dimensional barriers that Group 935 had already weakened.' },
  ], [
    { heading: 'Pentagon Revisited',
      text: 'Classified features the Pentagon layout reimagined with enhanced detail. Players navigate the War Room, laboratories, server rooms, and the Groom Lake facility (accessible via teleporter). The map includes radios and documents that fill in critical gaps in the timeline — conversations between McNamara, audio logs from Broken Arrow scientists, and classified reports about the Ultimis crew.' },
    { heading: 'The Trapped Ultimis Crew',
      text: 'The main Easter egg\'s climactic moment reveals that Ultimis was held in Groom Lake\'s Hangar 4, detained by the US government. Samantha, from the MPD, sends a wave of zombies to "rescue" them — or rather, to ensure Richtofen continues on his path to the Moon. The crew escapes through a teleporter, setting up their arrival at the Ascension Facility.' },
  ], [
    { heading: 'Filling the Timeline Gap',
      text: 'Classified resolves one of the longest-standing mysteries in Zombies lore: what happened between Kino and Ascension. The revelation that Ultimis was captured and studied by the US government adds enormous depth to the story. It also confirms that the American government knew about the zombie threat for decades and actively tried to weaponize it.' },
    { heading: 'The Bigger Picture',
      text: 'The documents found here foreshadow events in Alpha Omega and Tag der Toten. The Broken Arrow program\'s failures, the Avogadro containment, and Camp Edward\'s research all originate from decisions made during this period. Classified is a critical puzzle piece that connects the Cold War-era maps into a coherent narrative.' },
  ]),

  lore('tt-ascension', 'ASCENSION', {
    setting: 'The Baikonur Cosmodrome, Soviet Kazakhstan, November 6th, 1963. A Soviet space launch facility secretly operating as a Group 935/GRU-Division 8 research complex. Centrifuges, rocket gantries, and lunar landers dominate the landscape.',
    crew: ['Ultimis — Tank Dempsey, Nikolai Belinski, Takeo Masaki, Edward Richtofen'],
    storyImpact: 'High',
    zombieController: 'Samantha Maxis',
  }, [
    { heading: 'Gersh\'s Casimir Device',
      text: 'The Soviet Union, through its secret GRU-Division 8 program, recruited former Group 935 scientist Gersh to continue Element 115 research at the Baikonur Cosmodrome. Gersh developed the Casimir Mechanism — a device capable of creating localized black holes — and was working toward harnessing the Aether\'s energy. However, Gersh\'s assistant, Yuri Zavoyski, was corrupted by Samantha\'s whispers from the Aether and tricked into activating the Gersh Device prematurely, trapping Gersh in a dimensional rift.' },
    { heading: 'Ultimis Arrives',
      text: 'Following their escape from the Pentagon (as revealed in Classified), the Ultimis crew teleports to the cosmodrome. Richtofen knows that freeing Gersh and using the Casimir Mechanism is the next step in his plan to reach the Moon and confront the MPD. The facility is overrun — cosmonauts, monkeys, and the undead roam the launch pads.' },
  ], [
    { heading: 'The Cosmodrome',
      text: 'Ascension\'s layout is expansive: a central rocket launch pad, surrounding research buildings, centrifuge rooms, and an open courtyard. The lunar lander system lets players fly between locations, providing both transportation and tactical escape routes. The map introduced the Space Monkey round mechanic — primates that were test subjects attack perk machines rather than players, stealing perks if not stopped.' },
    { heading: 'The Gersh Device',
      text: 'The Gersh Device (Black Hole Bomb) is both a tactical grenade and a key Easter egg element. It creates a miniature black hole that sucks in nearby zombies. Players use it during the Easter egg quest to free Gersh from his dimensional prison by aligning it with specific nodes around the map at precise times.' },
    { heading: 'Freeing Gersh',
      text: 'The main Easter egg involves using the Casimir Mechanism to free Gersh from the dimensional rift. Players must press buttons in a specific order, ride lunar landers, and use Gersh Devices at coordinates broadcasted through number station radios. When Gersh is freed, he screams that "the mechanism must be repaired" and escapes into the Aether, warning the crew about what Richtofen truly intends.' },
  ], [
    { heading: 'Richtofen\'s Plan Advances',
      text: 'Freeing Gersh and using the Casimir Mechanism gives Richtofen critical information about how to interface with the MPD on the Moon. Each location the crew visits, Richtofen extracts exactly what he needs while keeping his companions in the dark. Gersh\'s warning about Richtofen goes unheeded — the crew has no reason to distrust their "doctor" yet.' },
    { heading: 'Next Stop: Siberia',
      text: 'The Ultimis crew must now retrieve the Vril Device components needed for the Moon operation. Their next destination is a Siberian coastal facility where a film crew is shooting a movie — unaware that the site contains a sealed room with exactly what Richtofen needs. Call of the Dead awaits.' },
  ]),

  lore('tt-call-dead', 'CALL OF THE DEAD', {
    setting: 'A derelict Group 935 outpost on the coast of Siberia, March 17th, 2011. An icebound facility near a beached freighter, surrounded by frozen tundra. A Hollywood film crew has unwittingly set up production on top of a dormant 115 site.',
    crew: ['Sarah Michelle Gellar', 'Robert Englund', 'Danny Trejo', 'Michael Rooker', 'George Romero (boss zombie)'],
    storyImpact: 'High',
    zombieController: 'Samantha Maxis / George Romero (independent)',
  }, [
    { heading: 'A Movie Set Gone Wrong',
      text: 'Director George A. Romero brought his cast — Sarah Michelle Gellar, Robert Englund, Danny Trejo, and Michael Rooker — to the Siberian coast to film a zombie movie at what he believed was an atmospheric abandoned facility. In reality, the site was a decommissioned Group 935 outpost containing active Element 115 deposits and a sealed underground laboratory. When Romero\'s crew activated old equipment during filming, they triggered an outbreak — and Romero himself was infected, becoming a relentless boss zombie.' },
    { heading: 'The Ultimis Crew Is Trapped',
      text: 'Unknown to the film crew, the Ultimis crew (Richtofen, Dempsey, Nikolai, and Takeo) is trapped in a sealed room within the facility\'s underground section. They arrived via teleporter but became locked behind a security door. They can communicate with the film crew through a window in the door and desperately need their help to retrieve the Golden Rod and escape.' },
  ], [
    { heading: 'George Romero Boss Mechanic',
      text: 'Call of the Dead\'s signature feature is George Romero as a persistent boss zombie. He wanders the map carrying a stage light that he swings as a weapon. He is extremely durable, cannot be permanently killed (only temporarily stunned by lowering him into water), and becomes enraged (glowing red, sprinting) if shot by a player or hit by a grenade. Managing George while fighting normal zombies is the map\'s central challenge.' },
    { heading: 'The V-R11 and Scavenger',
      text: 'The map features two unique wonder weapons: the V-R11 (which turns zombies back into humans, briefly creating an ally or a George-distracting decoy) and the Scavenger (a bolt-action sniper rifle that fires explosive rounds). Both are obtainable from the Mystery Box and represent some of the most creative weapon designs in Zombies.' },
    { heading: 'Helping the Ultimis Crew',
      text: 'The main Easter egg involves following instructions shouted by the trapped Ultimis crew through the door. Players must navigate the icy facility, locate specific items, survive Romero\'s attacks, and eventually use a submarine to retrieve the Golden Rod from the ocean floor. The rod is passed through the door mechanism, and Richtofen\'s grateful (if cryptic) response confirms that the film crew has unknowingly advanced his plan.' },
  ], [
    { heading: 'The Golden Rod Recovered',
      text: 'The Vril Device (Golden Rod) that the film crew retrieves is essential to Richtofen\'s plan to take control of the MPD. Combined with the Focusing Stone from Shangri-La, it will allow him to swap souls with Samantha and seize control of the zombies. The Ultimis crew escapes the locked room via teleporter, leaving the film crew to fend for themselves against the unending horde.' },
    { heading: 'The Focusing Stone Awaits',
      text: 'With the Golden Rod secured, only one artifact remains: the Focusing Stone, hidden within the ancient ruins of Shangri-La. The Ultimis crew teleports to an unknown point in time and space — arriving at a Himalayan temple that exists outside normal time, trapped in a paradox loop. The final pieces of Richtofen\'s puzzle are almost in place.' },
  ]),

  lore('tt-shangri-la', 'SHANGRI-LA', {
    setting: 'Ancient temple ruins in the Himalayas, date uncertain (the location exists in a time loop, approximately April 25th, 1956). A lush, overgrown paradise corrupted by Element 115 — waterfalls, stone carvings, underground mines, and geysers create a vibrant but deadly environment.',
    crew: ['Ultimis — Tank Dempsey, Nikolai Belinski, Takeo Masaki, Edward Richtofen'],
    storyImpact: 'High',
    zombieController: 'Samantha Maxis / The Temple itself',
  }, [
    { heading: 'The Lost City',
      text: 'Shangri-La is an ancient city hidden in the Himalayas, built around a massive Element 115 deposit. The city was once a thriving civilization that worshipped the element as divine energy. Over centuries, the 115 exposure mutated the inhabitants and the wildlife, creating a deadly ecosystem. When explorers Brock and Gary arrived in the 1950s, they triggered a time loop — the temple resets endlessly, trapping anyone within it in a perpetual cycle.' },
    { heading: 'Richtofen\'s Final Artifact',
      text: 'Richtofen needs the Focusing Stone — a refined meteorite of pure Element 115 hidden within the temple\'s inner sanctum. With the Golden Rod already in his possession (from Call of the Dead), the Focusing Stone is the final piece needed to interface with the MPD on the Moon. The temple\'s time loop makes this retrieval particularly dangerous, as the layout shifts between two time periods.' },
  ], [
    { heading: 'The Eclipse Mechanic',
      text: 'Shangri-La\'s unique mechanic is the time shift. Players can activate stepping stones near a geyser to trigger an eclipse, shifting the map between two states — a sun-lit version and a darker eclipse version. The layout changes between states: doors open and close, water levels shift, and zombie behavior changes. Both versions must be navigated to complete the Easter egg.' },
    { heading: 'Napalm and Shrieker Zombies',
      text: 'The map introduces two special zombie types: the Napalm Zombie (a slow, burning hulk that explodes on death, setting nearby players on fire) and the Shrieker Zombie (a fast, screaming mutant that can blur players\' vision). The oppressive jungle environment, tight corridors, and these special enemies make Shangri-La one of the most challenging maps in the franchise.' },
    { heading: 'Freeing Brock and Gary',
      text: 'The main Easter egg quest involves freeing explorers Brock and Gary from the time loop. Players must navigate both eclipse states, complete rituals at stone altars, align crystal skulls, and ultimately reach the inner sanctum. When completed, the Focusing Stone is revealed — a glowing meteorite that Richtofen takes with barely concealed glee. The time loop resets for Brock and Gary, trapping them once more, but the crew has what they came for.' },
  ], [
    { heading: 'All Pieces in Place',
      text: 'With both the Golden Rod (Vril Device) and the Focusing Stone in his possession, Richtofen has everything he needs to execute the Grand Scheme. The Ultimis crew\'s next and final destination is the Moon — Griffin Station, where the MPD awaits. Richtofen\'s manipulation of his companions is about to reach its climax.' },
    { heading: 'The Endgame Begins',
      text: 'Nothing can stop Richtofen now. He has the artifacts, the knowledge, and three unwitting soldiers who trust him just enough to follow him to the Moon. What happens next will shatter the Earth, define the future of humanity, and set in motion events that span another twenty years of suffering. The road to Moon is the road to the apocalypse.' },
  ]),

  lore('tt-moon', 'MOON', {
    setting: 'Griffin Station — a secret Group 935 base on the lunar surface, October 13th, 2025. The facility houses the Moon Pyramid Device (MPD), a Keeper artifact of immense power. The airless lunar landscape and cramped facility corridors create a suffocating atmosphere.',
    crew: ['Ultimis — Tank Dempsey, Nikolai Belinski, Takeo Masaki, Edward Richtofen'],
    storyImpact: 'Critical',
    zombieController: 'Samantha Maxis → Edward Richtofen (after the swap)',
  }, [
    { heading: 'The Grand Scheme',
      text: 'Everything has led to this. Richtofen has manipulated the Ultimis crew across six maps and decades of time to reach Griffin Station — the secret Group 935 moon base built around the Moon Pyramid Device (MPD). Samantha Maxis currently inhabits the MPD, controlling the zombies across all dimensions. Richtofen intends to use the Vril Device and Focusing Stone to swap their souls — placing himself inside the MPD and granting him control of the undead.' },
    { heading: 'Griffin Station',
      text: 'Built by Dr. Groph and Schuster under Richtofen\'s orders, Griffin Station is a fully operational lunar base with laboratories, living quarters, a biodome, and the excavation chamber housing the MPD. The station has been running on autopilot since the end of WWII, maintained by automated systems and the occasional Group 935 loyalist. The crew arrives via a teleporter in Area 51 (Groom Lake), fighting through zombies on the Nevada surface before warping to the Moon.' },
  ], [
    { heading: 'No Air, No Mercy',
      text: 'Moon\'s signature mechanic is the vacuum of space. Outside the pressurized zones, players must wear a P.E.S. (Pressurized External Suit) helmet or suffocate. Explosive decompression events can breach the facility\'s windows, venting the air from entire sections. Players must find and activate air restoration terminals while fighting zombies in low gravity. The disorientation of lunar gravity — zombies float when killed, players can leap enormous distances — makes Moon a uniquely chaotic experience.' },
    { heading: 'The Wave Gun',
      text: 'Moon\'s wonder weapon is the Wave Gun — a dual-wield weapon that can be combined into the Zap Gun Dual Wield or a single devastating Wave Gun that causes zombies to expand and explode from microwave radiation. It is arguably the most powerful wonder weapon in the series for crowd control.' },
    { heading: 'Richtofen\'s Betrayal',
      text: 'The main Easter egg is the climax of the entire Ultimis storyline. Players must navigate the facility, hack terminals, solve puzzles involving Samantha\'s toys and coded switches, and eventually reach the MPD. Richtofen inserts the Vril Device and Focusing Stone, initiating the soul swap. His body collapses as his consciousness enters the Aether, taking Samantha\'s place in the MPD. "I WIN!" he screams in triumph as he gains control of every zombie on Earth.' },
    { heading: 'Maxis\'s Counterstrike',
      text: 'But Maxis, communicating from the Aether via the facility\'s computer systems, convinces Dempsey, Nikolai, and Takeo to counteract Richtofen. They activate three rockets aimed at Earth — Maxis claims this will sever Richtofen\'s connection to the Aether, but in reality, the rockets strike the planet\'s surface precisely where Element 115 deposits are concentrated. The impact cracks the Earth, devastating civilization. A mushroom cloud is visible from the Moon\'s surface. The Earth burns.' },
  ], [
    { heading: 'The Earth Is Shattered',
      text: 'Moon is the most consequential map in the Aether storyline. Richtofen achieves his goal — he becomes the Demonic Announcer, controlling all zombies. But Maxis\'s rockets have fractured the Earth, killing billions and irradiating the surface with Element 115. Civilization collapses. The simultaneous Nuketown map shows the impact from Earth\'s perspective — US soldiers fighting zombies at the Nevada Test Site are killed by the shockwave.' },
    { heading: 'The War Between Gods',
      text: 'With Richtofen in the Aether and Maxis reduced to a digital consciousness, the two begin a war for control of the remaining 115 pylons on Earth — massive structures that channel Aether energy. This war will play out across TranZit, Die Rise, and Buried, waged through a new group of survivors: the Victis crew. The world has ended, but the story is far from over.' },
  ]),

  lore('tt-nuketown', 'NUKETOWN', {
    setting: 'Nuketown test site — a mock suburban neighborhood built for nuclear weapons testing in the Nevada desert, October 13th, 2025. Mannequins line the driveways of pristine 1950s houses as the sky burns and rockets fall from space.',
    crew: ['Unnamed CIA and CDC operatives'],
    storyImpact: 'Low',
    zombieController: 'Samantha Maxis → Edward Richtofen (control shifts during gameplay)',
  }, [
    { heading: 'Ground Zero',
      text: 'The Nuketown test site is a replica suburban neighborhood in the Nevada desert, originally built by the U.S. government for nuclear blast testing. At the same moment that Richtofen arrives at Griffin Station on the Moon, a zombie outbreak begins at the site. CIA and CDC teams are dispatched to contain the threat, unaware that they are standing at the epicenter of the coming apocalypse.' },
  ], [
    { heading: 'Survival in Suburbia',
      text: 'Nuketown Zombies is a pure survival map — no Easter egg quest, no grand puzzle. Players fight through waves of undead in the tight streets and houses of the test town. Perk-a-Cola machines drop from the sky on random rounds via mushroom-cloud-style airdrops, crashing into the map like care packages. The enclosed layout and limited training routes make Nuketown one of the most intense high-round survival experiences in the series.' },
    { heading: 'The Announcer Shifts',
      text: 'Nuketown\'s most unique mechanic reflects the events of Moon in real-time. As the game progresses, the zombie announcer voice shifts from Samantha Maxis to Edward Richtofen — marking the exact moment Richtofen completes the soul swap in the MPD on the Moon. The sky darkens, the Earth shakes, and Richtofen\'s maniacal laughter echoes across the battlefield. Players on Nuketown are witnessing the same apocalyptic event from Earth\'s surface.' },
  ], [
    { heading: 'When the Rockets Hit',
      text: 'On round 25, Maxis\'s rockets impact Earth. A blinding flash engulfs the Nuketown site. The screen whites out as a massive shockwave obliterates the test town and everything in it. The match ends — there is no surviving this. While Moon shows Richtofen\'s triumph and Maxis\'s desperate counterstrike from the lunar perspective, Nuketown shows the human cost: unnamed soldiers fighting a losing battle, completely unaware that the real threat isn\'t the zombies — it\'s the missiles screaming down from the sky.' },
    { heading: 'A Footnote in the Apocalypse',
      text: 'Nuketown Zombies is a small but powerful piece of the Aether story. It grounds the cosmic events of Moon in visceral, ground-level reality. The rockets that shattered civilization aren\'t just a cutscene — they are a playable extinction event. The map\'s simplicity is its strength: no quest distracts from the dawning horror that the world is ending, and there is nothing anyone can do to stop it.' },
  ]),

  lore('tt-tranzit', 'TRANZIT', {
    setting: 'The irradiated wasteland of Hanford, Washington, October 21st, 2035. A devastated American landscape where a robotic bus navigates through fire, fog, and lava. The ruins of a diner, farm, power station, and town are connected by a winding road through dangerous terrain.',
    crew: ['Victis — Samuel Stuhlinger, Marlton Johnson, Abigail "Misty" Briarton, Russman'],
    storyImpact: 'Medium',
    zombieController: 'Edward Richtofen (from the MPD)',
  }, [
    { heading: 'Ten Years After the Rockets',
      text: 'It has been ten years since Maxis\'s rockets struck the Earth. Civilization has collapsed. The surface is irradiated, covered in volcanic fog laced with Element 115. Pockets of survivors eke out existence in the ruins of the old world. Among them are four strangers who find each other at a bus depot in the wasteland of Washington state: Stuhlinger, Marlton, Misty, and Russman. They have no idea they are about to become pawns in a war between gods.' },
    { heading: 'The Voices',
      text: 'Stuhlinger hears a voice in his head — the voice of Richtofen, speaking from the Aether through the MPD. Richtofen needs the Victis crew to activate a 115 pylon located in the area. Meanwhile, Maxis communicates through electronic devices, urging the crew to power the pylon for him instead. Both entities are manipulating these survivors to gain control of the global 115 network that will determine the fate of reality.' },
  ], [
    { heading: 'The Bus Route',
      text: 'TranZit\'s defining feature is its massive, interconnected map — the largest in Zombies at the time of release. A robotic bus (driven by T.E.D.D., a malfunctioning AI driver) follows a circular route through five distinct locations: Bus Depot, Diner, Farm, Power Station, and Town. Players can ride the bus, run through the dangerous fog between stops (where Denizens — leaping fog creatures — attack), or discover hidden pathways through underground tunnels.' },
    { heading: 'The Jet Gun and Buildables',
      text: 'TranZit introduced the buildables system. Players scavenge parts from across the map to construct tools: a turbine (powers objects remotely), an electric trap, a turret, and the Jet Gun — a makeshift wonder weapon that creates a powerful vortex but overheats and breaks with extended use. The buildable system forces exploration and teamwork.' },
    { heading: 'Powering the Pylon',
      text: 'The main Easter egg involves routing power to the 115 pylon using turbines and Navcard readers scattered across the map. Players must choose: follow Richtofen\'s instructions (placing turbines in specific patterns) or Maxis\'s (performing different rituals). The choice determines which entity gains partial control of the pylon. Both paths end with the pylon activating, its beam shooting into the sky — one of three needed to complete either entity\'s plan.' },
  ], [
    { heading: 'The First Pylon',
      text: 'Regardless of which side the players choose, the Hanford pylon is activated — the first of three global 115 structures that must be charged. Two more remain, at the sites of Die Rise and Buried. The Richtofen/Maxis war continues, with the Victis crew as unwitting soldiers in a conflict they barely understand.' },
    { heading: 'A New Kind of Horror',
      text: 'TranZit established the post-apocalyptic era of Zombies. The world is truly destroyed — there is no government, no military, no hope of rescue. The survivors are on their own, manipulated by two disembodied voices with god-like power. The desolation of TranZit\'s wasteland drives home the consequences of what happened on the Moon.' },
  ]),

  lore('tt-die-rise', 'DIE RISE', {
    setting: 'Collapsed skyscrapers in a ruined Chinese city, October 22nd, 2035. Two massive towers have toppled against each other, creating a vertical battlefield of crumbling floors, broken elevators, and vertiginous drops into the abyss.',
    crew: ['Victis — Samuel Stuhlinger, Marlton Johnson, Abigail "Misty" Briarton, Russman'],
    storyImpact: 'Medium',
    zombieController: 'Edward Richtofen (from the MPD)',
  }, [
    { heading: 'Following the Trail',
      text: 'After activating the Hanford pylon, the Victis crew — guided by Richtofen\'s voice in Stuhlinger\'s head — travels to China in search of the second 115 pylon. They arrive at a devastated Chinese city where skyscrapers have collapsed against each other, creating an unstable vertical maze. The city was destroyed by the rocket impact fallout and subsequent earthquakes.' },
    { heading: 'The Second Pylon',
      text: 'Maxis and Richtofen continue their tug-of-war over the Victis crew. Whoever controls two of the three pylons will gain a decisive advantage. Maxis becomes increasingly desperate and unstable, while Richtofen grows more manipulative. Stuhlinger, the only one who can hear Richtofen directly, is conflicted about who to trust.' },
  ], [
    { heading: 'Vertical Survival',
      text: 'Die Rise is defined by its verticality. Players navigate between floors of two toppled skyscrapers using broken elevators that move unpredictably, mattresses for safe falls, and narrow walkways over deadly drops. Falling off the map is a constant threat — it\'s the only map where the environment itself is the most reliable killer. Zombie navigation is also affected; they climb walls and pour in from above and below.' },
    { heading: 'The Sliquifier',
      text: 'The buildable wonder weapon is the Sliquifier — a gun that fires a chemical slurry that makes surfaces incredibly slippery. Zombies that touch the slick are ragdolled to their deaths, often sliding off the edge of buildings. It\'s darkly comedic and brutally effective, especially in a map where positioning on narrow ledges is everything.' },
    { heading: 'The Dragon and the Pylon',
      text: 'The Easter egg quest involves activating Mahjong tiles in a specific order, navigating the treacherous building interiors, and eventually powering the second 115 pylon. A massive dragon imagery features in the building — Chinese mythology meeting Element 115 technology. The pylon activation is again split: Richtofen or Maxis, each with different steps and consequences.' },
  ], [
    { heading: 'Two Down, One to Go',
      text: 'With two of the three pylons now activated, the balance of power is shifting. One more pylon — located beneath the Earth\'s surface at the site of Buried — will determine whether Richtofen or Maxis gains ultimate control. The Victis crew presses on, weary and traumatized, toward the final confrontation.' },
    { heading: 'Growing Tension',
      text: 'The dynamic between the four Victis members is strained. Stuhlinger\'s secret communication with Richtofen is wearing on him, and the others are getting suspicious. Marlton\'s analytical mind is piecing together that they\'re being used. But with no other options in a destroyed world, they follow the voices into the dark.' },
  ]),

  lore('tt-buried', 'BURIED', {
    setting: 'An underground ghost town buried beneath a mining facility, December 31st, 2035. An entire Old West settlement was swallowed by the Earth and preserved underground, now infested with the undead and haunted by spectral witches.',
    crew: ['Victis — Samuel Stuhlinger, Marlton Johnson, Abigail "Misty" Briarton, Russman'],
    storyImpact: 'Critical',
    zombieController: 'Edward Richtofen (from the MPD)',
  }, [
    { heading: 'The Final Pylon',
      text: 'The third and final 115 pylon is located deep underground, beneath a mining facility that collapsed into a massive underground cavern. Within this cavern, the Victis crew discovers an entire preserved Old West town — buildings, a saloon, a general store, a courthouse — all swallowed by the Earth decades ago and sealed in darkness. The 115 deposits here are the largest yet, and the dead have been active for a very long time.' },
    { heading: 'The Climactic Choice',
      text: 'Both Maxis and Richtofen know this is the endgame. Whoever controls the third pylon controls the majority of the global 115 network and gains the power to reshape reality. Both entities are at their most persuasive and their most threatening. Stuhlinger is cracking under the pressure of Richtofen\'s constant demands, while Maxis threatens the entire crew with annihilation if they don\'t comply.' },
  ], [
    { heading: 'The Underground Town',
      text: 'Buried\'s setting is atmospheric and eerie — an entire Wild West town illuminated only by glowing 115 crystals and scattered lamps. The layout includes a saloon, jail, church, hedge maze, and a mysterious mansion. A gentle giant named Leroy (Arthur) can be befriended with alcohol and candy — he\'ll break through barriers, carry items, and pummel zombies for the players. Ghostly witches haunt certain areas, stealing points from players who disturb them.' },
    { heading: 'The Paralyzer',
      text: 'Buried\'s wonder weapon is the Paralyzer (Petrifier) — a gun that fires a stream of energy that slows and eventually kills zombies while also allowing players to hover in midair when aimed at the ground. This levitation ability opens up unique strategies and hidden areas. It uses a cooldown system instead of ammo, making resource management a key tactical consideration.' },
    { heading: 'Maxis\'s Endgame',
      text: 'The main Easter egg is the final confrontation of the Maxis vs. Richtofen war. On the Maxis path (canon), players complete a series of underground rituals, power the final pylon, and hand control to Maxis. In a devastating twist, Maxis — who has been presented as the sympathetic choice — immediately uses the combined pylon network to rip open a gateway to Agartha. He doesn\'t want to save the world; he wants to reach his daughter Samantha in Agartha, no matter the cost. His actions further devastate the already-ruined Earth.' },
  ], [
    { heading: 'Maxis Wins',
      text: 'In the canon ending (Maxis\'s side), Maxis gains control of the Aether and tears open a rift to Agartha. His obsession with reuniting with Samantha has blinded him to the destruction he\'s causing. Richtofen, defeated, is left powerless in the MPD. The Earth\'s remaining survivors — including Victis — are at the mercy of Maxis\'s increasingly unhinged plans.' },
    { heading: 'The Bridge to Black Ops 4',
      text: 'The events of Buried set the stage for the Black Ops 4 Aether maps. Victis would eventually be frozen in stasis by Richtofen (Primis) beneath Alcatraz, to be used later. The 115 pylon network activated by the Victis crew becomes the mechanism through which the multiverse will ultimately be addressed — in Alpha Omega and Tag der Toten. Buried is the end of an era and the beginning of the final chapter.' },
  ]),

  lore('tt-alpha-omega', 'ALPHA OMEGA', {
    setting: 'Camp Edward, a Broken Arrow facility in the Nevada desert, October 13th, 2025. The Nuketown testing ground has been converted into a secret research base housing the Rushmore A.I. and the imprisoned Avogadro.',
    crew: ['Primis & Ultimis combined — all eight members (Richtofen, Dempsey, Nikolai, Takeo × 2)'],
    storyImpact: 'High',
    zombieController: 'Samantha Maxis / Broken Arrow experiments',
  }, [
    { heading: 'The Elemental Shard',
      text: 'Following the events of Blood of the Dead, where Primis Richtofen sacrificed himself and was replaced by a post-Revelations version, the combined Primis and Ultimis crews travel to Camp Edward in Nevada. Hidden beneath the Nuketown test site is a Broken Arrow facility housing the Elemental Shard — a refined fragment of Element 115 that is crucial to Nikolai\'s plan to set things right. The Shard can power the Agarthan Device, the weapon that will end the cycle once and for all.' },
    { heading: 'Rushmore and the Avogadro',
      text: 'Camp Edward is guarded by Rushmore — a patriotic A.I. system that controls the facility\'s defenses. The Avogadro — a being of pure 115 energy accidentally created by Broken Arrow\'s experiments — is imprisoned within the facility and threatens to escape. The crew must earn Rushmore\'s trust, navigate the facility\'s traps, and deal with the Avogadro before they can claim the Shard.' },
  ], [
    { heading: 'Nuketown Reimagined',
      text: 'Alpha Omega remixes the Nuketown Zombies environment, expanding it with new underground laboratory sections, the Beds test houses, and the surrounding desert. Elemental zombie variants (fire, electric, etc.) roam the surface, while Nova Crawlers and Jolting Jacks infest the underground labs. The Galvaknuckles and Ray Gun Mark II return alongside new equipment.' },
    { heading: 'Earning Rushmore\'s Trust',
      text: 'The Easter egg quest involves completing a series of challenges set by Rushmore to prove the crew is "authorized personnel." This includes powering up the facility\'s systems, solving code puzzles tied to the Broken Arrow research, and surviving defense protocol activations. Rushmore\'s dialogue — patriotic, absurd, and deeply unsettling — provides both comic relief and lore about Broken Arrow\'s experiments.' },
    { heading: 'Defeating the Avogadro',
      text: 'The climactic boss fight pits the crew against the Avogadro — the electrical entity that was first encountered in TranZit. Now fully powered and enraged, it teleports, summons lightning, and creates electrical fields. Defeating it requires using the facility\'s equipment to trap and dissipate its energy. Once the Avogadro is contained, the crew retrieves the Elemental Shard from the facility\'s core.' },
  ], [
    { heading: 'The Shard Secured',
      text: 'With the Elemental Shard in their possession, the combined crew now has the key component needed for the Agarthan Device. Nikolai — who has been quietly reading the Kronorium and formulating a plan he hasn\'t shared with anyone — knows what must be done. The endgame is approaching, and it will require a sacrifice none of them expect.' },
    { heading: 'One Last Stop',
      text: 'The final destination is a Siberian facility trapped in a pocket dimension — the same location as Call of the Dead, but altered. Tag der Toten awaits, and with it, the end of the Aether storyline. Everything the crew has fought for across dimensions, timelines, and decades comes down to one final map.' },
  ]),

  lore('tt-tag', 'TAG DER TOTEN', {
    setting: 'A Siberian facility trapped in a pocket dimension, 1965 (outside normal time). The frozen coastal environment from Call of the Dead, now distorted and decaying. Icebergs, abandoned buildings, and dimensional tears fill the landscape. The end of all things.',
    crew: ['Primis & Ultimis combined — all eight members (Richtofen, Dempsey, Nikolai, Takeo × 2)'],
    storyImpact: 'Critical',
    zombieController: 'Samantha Maxis / The Apothicons (final stand)',
  }, [
    { heading: 'The Final Map',
      text: 'Tag der Toten — "Day of the Dead" — is the final map of the Aether storyline. The combined Primis and Ultimis crews travel to a Siberian facility that exists in a pocket dimension, disconnected from normal time. This is the same facility from Call of the Dead, but warped and decayed. Here, they must use the Agarthan Device to destroy the multiverse and end the cycle of suffering that has defined their existence.' },
    { heading: 'Nikolai\'s Secret',
      text: 'Primis Nikolai has been reading the Kronorium in secret. He knows the truth that even Richtofen couldn\'t accept: the only way to truly end the cycle is to destroy the multiverse entirely. Not save it. Not fix it. Destroy it. Every version of every person across every dimension must cease to exist so that a new, uncorrupted reality can be born. Nikolai has accepted this — but he hasn\'t told the others what the plan truly requires.' },
  ], [
    { heading: 'The Frozen Wasteland',
      text: 'Tag der Toten\'s environment is a frozen, desolate facility surrounded by icebergs and shipping containers. Players navigate between the shore, the facility buildings, a lighthouse, and underground ice caves. The Tundragun — a freezing wonder weapon — and the Wunderwaffe DG-Scharfschütze (sniper variant) provide firepower. Elemental zombie variants and a Blightfather boss roam the facility.' },
    { heading: 'Assembling the Agarthan Device',
      text: 'The main Easter egg involves assembling the Agarthan Device from components scattered across the facility. The Elemental Shard (from Alpha Omega) serves as its power source. Players must complete a series of rituals, solve dimensional puzzles, and survive increasingly intense waves of enemies. The facility itself seems to resist the crew\'s efforts, as if reality knows what they\'re about to do.' },
    { heading: 'Nikolai\'s Plan',
      text: 'In the climactic cutscene, Nikolai invites both crews to a final dinner. He has prepared a poisoned drink. As each crew member drinks, they collapse — Ultimis and Primis alike. Only Nikolai remains standing, and then Samantha arrives. In the original version of events, Nikolai had poisoned everyone including himself. But Samantha — freed from the Dark Aether — shoots Nikolai with a Welling pistol, ending his life. She and Eddie (a young, innocent version of Richtofen) step through a portal into a new, clean universe. The multiverse collapses behind them.' },
  ], [
    { heading: 'The End of the Aether Story',
      text: 'The multiverse is destroyed. Every timeline, every fracture, every dimension ceases to exist. Primis, Ultimis, Victis, the Keepers, the Apothicons — all of it is gone. The cycle that trapped these characters in an eternal loop of suffering and war is finally broken. Not through victory, but through sacrifice. Nikolai\'s willingness to erase himself and everyone he cared about is the most selfless and devastating act in the storyline.' },
    { heading: 'A New Beginning',
      text: 'Samantha and Eddie emerge into a new universe — one without Element 115, without the Dark Aether, without the corruption that created the zombie plague. They are children, innocent and hopeful. The last image of the Aether storyline is a field of flowers under a clear sky. After decades of darkness, death, and interdimensional war, the story ends with the simplest possible message: there is a world worth saving, even if saving it means letting go of everything.' },
  ]),

  lore('d63-origins', 'ORIGINS', {
    setting: 'Excavation Site 64, the Western Front near the Somme, France, June 4th, 1918. World War I rages above while ancient 115 deposits are unearthed below. Trenches, mud, barbed wire, and colossal Panzer robots define the landscape.',
    crew: ['Primis — Tank Dempsey, Nikolai Belinski, Takeo Masaki, Edward Richtofen (their first meeting)'],
    storyImpact: 'Critical',
    zombieController: 'The Ancients / Samantha Maxis (from Agartha)',
  }, [
    { heading: 'The Excavation',
      text: 'During World War I, Group 935 — under Dr. Ludvig Maxis — discovered ancient Element 115 deposits beneath the battlefields of northern France. Excavation Site 64 was established to extract and study the element. What they found was far more than a mineral: ancient tombs, Keeper artifacts, and underground chambers containing the elemental staffs used in the Great War centuries earlier. The discovery drew the attention of every major power.' },
    { heading: 'Four Strangers Meet',
      text: 'Origins is the first meeting of the Primis crew. Young Edward Richtofen, a brilliant but morally conflicted scientist, arrives at the site to investigate. He encounters Dempsey (an American soldier), Nikolai (a Russian soldier), and Takeo (a Japanese soldier) — all present at the site through various circumstances of war. When the excavation inadvertently triggers a massive zombie outbreak and awakens ancient Panzer Soldat robots, the four are forced to fight together.' },
  ], [
    { heading: 'The Elemental Staffs',
      text: 'Origins\' signature feature is the four elemental staffs — the Staff of Fire, Staff of Ice, Staff of Lightning, and Staff of Wind. Each must be assembled from parts found across the map and then upgraded through elaborate rituals in the "Crazy Place" — an Aether dimension accessible through underground tunnels. The staffs are among the most iconic buildable wonder weapons in Zombies history, each with unique abilities and gorgeous visual effects.' },
    { heading: 'The Maxis Drone',
      text: 'A critical buildable is the Maxis Drone — a flying robot named after Dr. Maxis that assists players by stunning zombies, reviving downed teammates, and picking up items. In the lore, it is a prototype created by Richtofen based on Maxis\'s research. The drone is essential for several Easter egg steps and represents the beginning of the Richtofen-Maxis dynamic that will define the story.' },
    { heading: 'Opening the Gateway',
      text: 'The main Easter egg involves upgrading all four staffs, placing them in their correct pedestals in the Crazy Place, and using them to power an ancient Keeper mechanism. The process also involves defeating a massive Panzer Soldat boss and navigating the treacherous mud-filled trenches while Giant Robots stomp across the battlefield. When completed, Samantha\'s voice calls from Agartha — she begs the crew to free her. They open a gateway, and Samantha is released. The final cutscene shows Samantha and a young Eddie playing with toy figurines of the maps — suggesting that the entire Zombies saga might be their game.' },
  ], [
    { heading: 'The Birth of Primis',
      text: 'Origins establishes the Primis crew — the younger, alternate-dimension versions of the Ultimis characters. Their bond, forged in the trenches of WWI, will carry them through The Giant, Der Eisendrache, Zetsubou No Shima, Gorod Krovi, Revelations, Blood of the Dead, and beyond. Richtofen\'s contact with the Aether entities here sets him on the path of the Kronorium\'s prophecy.' },
    { heading: 'The Cycle Begins',
      text: 'Origins is both a beginning and an ending. The release of Samantha from Agartha triggers a chain of events that leads Richtofen to consult the Kronorium, learn about the cycle, and begin his dimension-hopping quest to collect souls. It also establishes Dimension 63 as a crucial alternate timeline where events diverge from the Original Dimension. MOTD, Shadows of Evil, and Blood of the Dead all exist in this dimensional space.' },
  ]),

  lore('d63-motd', 'MOB OF THE DEAD', {
    setting: 'Alcatraz Island, San Francisco Bay, December 31st, 1933. A purgatorial pocket dimension overlaid on the infamous prison. The Golden Gate Bridge stretches into the fog, the cell blocks echo with screams, and the undead Warden stalks the halls.',
    crew: ['Albert "Weasel" Arlington', 'Salvatore DeLuca', 'Billy Handsome', 'Michael "Finn" O\'Leary'],
    storyImpact: 'Critical',
    zombieController: 'The Warden / The Shadow Man',
  }, [
    { heading: 'The Mobsters\' Plan',
      text: 'Albert "Weasel" Arlington, Salvatore DeLuca, Billy Handsome, and Finn O\'Leary are four inmates at Alcatraz Federal Penitentiary. Weasel — the only one with any imagination — has devised an escape plan: build a makeshift airplane (Icarus) on the prison roof using parts smuggled from the workshops. The other three agree, but they don\'t trust Weasel. On New Year\'s Eve 1933, their escape attempt goes horribly wrong — they kill Weasel on the roof before he can finish the plane.' },
    { heading: 'Trapped in Purgatory',
      text: 'The murder of Weasel doesn\'t lead to freedom — it traps all four of them in a purgatorial loop created by the Dark Aether. They wake up in a zombified version of Alcatraz with no memory of killing Weasel, condemned to relive the escape attempt over and over. The Warden — himself a servant of the Shadow Man — maintains the cycle, feeding the Dark Aether\'s power with each repetition. The prison is a pocket dimension, disconnected from normal reality.' },
  ], [
    { heading: 'Alcatraz Reimagined',
      text: 'Mob of the Dead transforms Alcatraz into a nightmarish hellscape. The cell blocks are overrun, the cafeteria is a bloodbath, and the dock leads to a boat that can take players to the Golden Gate Bridge — a separate playable area shrouded in fog. The atmosphere is the darkest in Zombies history: Art Deco aesthetics mixed with demonic corruption, torch-lit corridors, and the constant sound of the fog horn.' },
    { heading: 'The Blundergat and Hell\'s Retriever',
      text: 'MOTD introduced two iconic weapons: the Blundergat (a shotgun-revolver hybrid found through the Mystery Box or a complex jail cell puzzle) and Hell\'s Retriever (a spectral tomahawk that returns after thrown, collecting zombie souls). The Retriever can be upgraded to the Redeemer by feeding it more souls — a process that involves throwing it into specific spectral portals around the map.' },
    { heading: 'Building Icarus',
      text: 'The main Easter egg involves collecting plane parts (again) and building Icarus on the prison roof. When flown, the plane crashes on the Golden Gate Bridge, where the crew must power up electric chairs and confront the cycle\'s truth. In the canonical ending, Weasel kills the other three — breaking the cycle and freeing himself from purgatory. In the non-canonical ending, the others kill Weasel again, and the cycle resets.' },
  ], [
    { heading: 'Breaking vs. Continuing the Cycle',
      text: 'MOTD\'s central theme — the cycle — becomes the defining metaphor of the entire Aether storyline. The idea that characters are trapped in loops, doomed to repeat the same events until someone makes a different choice, directly parallels the Primis crew\'s situation. Weasel\'s decision to break the cycle (the canonical ending) foreshadows the eventual solution to the Aether saga: someone must choose to end the cycle, even at great personal cost.' },
    { heading: 'The Blood Vials',
      text: 'Crucially, the purgatorial dimension of Alcatraz contains blood vials that Richtofen later collects during his dimension-hopping (as seen in the "The Giant" opening cutscene where he carries them). These vials contain the blood of the MOTD crew and provide a form of dimensional insurance — as long as Richtofen carries them, he cannot be permanently killed, as the blood connects him to the pocket dimension\'s time-defying properties. This directly sets up the events of Blood of the Dead.' },
  ]),

  lore('d63-soe', 'SHADOWS OF EVIL', {
    setting: 'Morg City — a fictional 1940s American noir city in Dimension 63, April 25th, 1944. Art Deco architecture, jazz clubs, burlesque theaters, and docks create a rain-soaked urban landscape hiding Lovecraftian horrors beneath its surface.',
    crew: ['Nero Blackstone (magician)', 'Jessica Rose (burlesque dancer)', 'Jack Vincent (corrupt cop)', 'Floyd Campbell (boxer)'],
    storyImpact: 'High',
    zombieController: 'The Shadow Man / The Apothicons',
  }, [
    { heading: 'Four Sinners',
      text: 'Nero Blackstone, Jessica Rose, Jack Vincent, and Floyd Campbell are four residents of Morg City who share one thing in common: each has committed a terrible sin. Nero murdered his wife for insurance money, Jessica killed an abusive partner, Jack took bribes that led to deaths, and Floyd threw a fight that destroyed lives. The Shadow Man — an ancient Apothicon entity — has been manipulating all four, drawing them together on this specific night for a ritual that will unleash the Apothicons upon Dimension 63.' },
    { heading: 'The Shadow Man\'s Manipulation',
      text: 'Each character receives a mysterious invitation to a specific location in Morg City. When they arrive, the city transforms — reality warps, tentacles burst through the streets, and the dead rise. The Shadow Man appears as a smooth-talking figure in a top hat, guiding the four through a series of rituals that he claims will save them. In reality, every step they take is designed to open the dimensional rift and summon the Apothicons.' },
  ], [
    { heading: 'Morg City\'s Districts',
      text: 'Shadows of Evil features four distinct districts — each belonging to one of the characters. The Junction serves as the central hub, connecting to Nero\'s lair, Jessica\'s nightclub, Jack\'s precinct, and Floyd\'s gym. The Art Deco architecture is stunning, and the city transitions between a normal (rain-soaked noir) and a corrupted "beast mode" state where players transform into tentacled creatures that can grapple, zap, and smash their way through obstacles.' },
    { heading: 'Beast Mode and the Rituals',
      text: 'The beast mode transformation is Shadows\' signature mechanic. Players step into glowing portals to become Apothicon beasts — powerful but time-limited forms that can interact with objects invisible to human eyes. In beast mode, players power generators, break chains, grapple to rooftops, and unlock areas. The main quest involves performing sacrifice rituals in each character\'s district, collecting their personal item of sin, and placing it on the altar.' },
    { heading: 'The Apothicon Rift',
      text: 'The Easter egg quest culminates in opening the rift beneath Morg City. Players complete all rituals, acquire the Summoning Key, and are contacted by the Keepers. The Shadow Man reveals his true form — a grotesque Apothicon — and attempts to use the rift to bring his masters into Dimension 63. Players must fight waves of Apothicon parasites from the rift while the Keepers try to seal it. In the canonical ending, Richtofen from another dimension arrives and takes the Summoning Key before the crew can fully close the rift.' },
  ], [
    { heading: 'The Summoning Key Changes Hands',
      text: 'The most important consequence of Shadows of Evil is that Richtofen obtains the Summoning Key — the most powerful artifact in existence. He takes it from the Shadows crew after they\'ve done the hard work of retrieving it. This is the Summoning Key that Richtofen carries throughout The Giant, Der Eisendrache, Zetsubou No Shima, Gorod Krovi, and Revelations, using it to collect souls and eventually challenge the Apothicons.' },
    { heading: 'Dimension 63 Doomed',
      text: 'With the Summoning Key gone and the rift partially open, Dimension 63\'s cycle timeline is doomed. The Apothicons will eventually consume it — leading to the "Universe Destroyed" endpoint on the timeline. The four characters of Morg City are left to face the consequences of their sins with no divine artifact to protect them. Their story is a tragedy: they were manipulated from beginning to end.' },
  ]),

  lore('d63-blood', 'BLOOD OF THE DEAD', {
    setting: 'Alcatraz Island in a pocket dimension, July 4th, 1941. The same purgatorial prison from Mob of the Dead, but now warped further by the Dark Aether. The Warden has been resurrected as a spectral entity, and the prison is a trap designed specifically for the Primis crew.',
    crew: ['Primis — Tank Dempsey, Nikolai Belinski, Takeo Masaki, Edward Richtofen'],
    storyImpact: 'Critical',
    zombieController: 'The Warden (Dark Aether servant)',
  }, [
    { heading: 'The Trap',
      text: 'After the events of Revelations — where the Primis crew was trapped in a cycle, sent back in time to relive their journey — Richtofen devised a plan to break free. He directed the crew to Alcatraz, knowing that the pocket dimension\'s properties could be exploited. However, this was a trap. The Warden, empowered by the Dark Aether, has been waiting for Primis. The blood vials Richtofen collected from the MOTD crew were supposed to protect him, but the Warden has prepared countermeasures.' },
    { heading: 'Richtofen\'s Darkest Hour',
      text: 'For the first time, Richtofen\'s plan fails. The Kronorium — the book that has guided his every action — changes its text before his eyes. The future he was counting on no longer exists. A new version of Richtofen, from a post-Revelations timeline who has already lived through the cycle, arrives to replace him. This "post-Revelations Richtofen" knows what must be done, and it requires the original Richtofen\'s death.' },
  ], [
    { heading: 'Alcatraz Evolved',
      text: 'Blood of the Dead expands the Alcatraz layout significantly compared to MOTD. New areas include the Warden\'s office, a rooftop catwalk, the New Industries building, and expanded underground tunnels. The Spectral Shield — a buildable that can see and interact with spectral entities — replaces the old zombie shield. The atmosphere is more oppressive than ever: the Warden\'s ghostly voice taunts the players, the prison\'s structure shifts, and the dark Aether\'s corruption is visible as glowing red cracks in reality.' },
    { heading: 'The Magmagat and the Spork',
      text: 'The Blundergat returns and can be upgraded to the Magmagat — a lava-spewing variant. The Golden Spork, a fan-favorite melee weapon from MOTD, also returns through an elaborate quest. The Hell\'s Retriever is replaced by a new spectral weapon system that ties into the map\'s ghostly mechanics.' },
    { heading: 'Breaking the Cycle',
      text: 'The main Easter egg is one of the most emotionally devastating in Zombies. The crew must fight through the Warden\'s traps, confront the truth about the blood vials and the cycle, and ultimately face the Warden himself in a brutal boss fight on the roof. When the Warden is defeated, the post-Revelations Richtofen reveals the truth: the original Richtofen must die. He is put into the Warden\'s dark mechanism, and his soul is consumed. The replacement Richtofen takes his place. "I was the nicest one," the original whispers as he dies.' },
  ], [
    { heading: 'A New Richtofen, A New Plan',
      text: 'The original Primis Richtofen — who has been the protagonist since Origins — is dead. His replacement carries different knowledge and a different burden. This post-Revelations Richtofen has seen how the cycle ends if nothing changes, and he has come back to ensure a different outcome. The blood vials are destroyed, severing the crew\'s safety net.' },
    { heading: 'The Path to the End',
      text: 'Blood of the Dead is the turning point of the entire Aether saga. Everything before it was Richtofen\'s plan. Everything after it is Nikolai\'s. With the original Richtofen gone, Nikolai begins secretly reading the Kronorium and formulating the endgame — a plan that will require the deaths of everyone he loves. The crew escapes Alcatraz, and their next stops are Alpha Omega and Tag der Toten.' },
  ]),

  lore('ag-revelations', 'REVELATIONS', {
    setting: 'The House / The Aether — fragments of every previous map fused into a single, fractured reality, 2025+. Portions of Nacht, Der Eisendrache, Shangri-La, Mob of the Dead, Verrückt, Origins, and Kino float in a void connected by Aether energy streams.',
    crew: ['Primis — Tank Dempsey, Nikolai Belinski, Takeo Masaki, Edward Richtofen'],
    storyImpact: 'Critical',
    zombieController: 'The Shadow Man / The Apothicons',
  }, [
    { heading: 'The Shadow Man\'s Gambit',
      text: 'After Primis collected all four Ultimis souls in the Summoning Key (at The Giant, Der Eisendrache, Zetsubou No Shima, and Gorod Krovi), Richtofen brought the Key to "The House" in Agartha — the safe dimension where Maxis had been sheltering the children\'s souls. However, the Shadow Man — who had been trapped inside the Summoning Key since the events of Shadows of Evil — was released. He consumed Maxis, corrupted the House, and began pulling fragments of every dimension into a single, nightmarish arena.' },
    { heading: 'All Maps Become One',
      text: 'The Shadow Man\'s corruption merged pieces of Nacht der Untoten, Verrückt, Kino der Toten, Shangri-La, Mob of the Dead, Der Eisendrache, Origins, and other locations into a fractured landscape floating in the Aether. Each fragment retains its atmosphere and hazards, but they are connected by corruption tendrils, jump pads, and dimensional tears. The Apothicons are pouring through from the Dark Aether, attempting to consume everything.' },
  ], [
    { heading: 'A Greatest Hits Map',
      text: 'Revelations is a celebration of every Zombies map that came before it. Players traverse recognizable locations from the franchise\'s history, each twisted by the corruption. The spawn area is Der Eisendrache\'s courtyard, leading to Kino\'s stage, Shangri-La\'s temple, MOTD\'s cell block, Verrückt\'s asylum, Nacht\'s bunker, and Origins\' trenches. Each area has unique enemy types and environmental hazards from its source map.' },
    { heading: 'The Keeper Protector',
      text: 'A key mechanic is the Keeper Protector — a summoned Keeper ally that fights alongside the players. Building the ritual table and completing the summoning ritual calls forth a ghostly Keeper warrior that stomps zombies and provides cover. This is one of the few maps where players have a powerful NPC ally during regular gameplay.' },
    { heading: 'Defeating the Shadow Man',
      text: 'The main Easter egg is the climax of the BO3 Primis storyline. Players must collect the Kronorium, free the corrupted Sophia (Maxis\'s A.I.), power ancient Keeper altars, and eventually confront the Shadow Man in his fully powered Apothicon form. The final fight takes place inside the Apothicon — a massive creature whose stomach serves as a playable arena. After destroying the Shadow Man with the Summoning Key, Dr. Monty (a Keeper who has been guiding events from the shadows) intervenes.' },
  ], [
    { heading: 'Dr. Monty\'s Intervention',
      text: 'With the Shadow Man defeated and the Apothicon threat neutralized, Dr. Monty reveals the truth: the Primis crew doesn\'t belong in the "perfect world" he\'s been trying to create. Their very existence is a paradox. Rather than erase them, he sends them back in time — to the Great War, circa 1292 AD. They become the original Primis, the four champions who fought alongside the Keepers. The cycle closes.' },
    { heading: 'The Cycle',
      text: 'Revelations reveals the full scope of the time loop. Primis fights the Great War → is scattered through time → reunites at Origins → travels through The Giant, DE, ZNS, GK → arrives at Revelations → is sent back to the Great War. This cycle repeats endlessly, with minor variations each time. Breaking this cycle becomes the driving motivation for Blood of the Dead and the BO4 maps that follow. The ending is both triumphant (the Shadow Man is defeated) and tragic (the crew is trapped in an eternal loop).' },
  ]),

  lore('d63-lab', 'RICHTOFEN\'S LAB', {
    setting: 'A hidden laboratory operated by Dimension 63\'s version of Edward Richtofen, 1940s. Located beneath an undisclosed location, the lab contains Element 115 experiments, collected artifacts, and journals detailing Richtofen\'s growing understanding of the multiverse.',
    crew: ['Edward Richtofen (Dimension 63)'],
    storyImpact: 'Medium',
    zombieController: 'N/A (no active outbreak)',
  }, [
    { heading: 'Richtofen\'s Private Research',
      text: 'After the events of Origins, the Dimension 63 version of Richtofen became obsessed with understanding the Aether and the multiverse. He established a hidden laboratory where he conducted private experiments with Element 115, studied Keeper artifacts, and began writing in his personal journal. Unlike his Ultimis counterpart, this Richtofen was motivated not by megalomania but by a desperate desire to understand and fix the fracturing multiverse.' },
    { heading: 'Contact with the Keepers',
      text: 'Through his experiments, Richtofen made contact with Keeper entities who guided him toward the Kronorium — the book of all timelines. Reading it, he learned about the cycle, the Summoning Key, and the precise steps needed to collect the four Ultimis souls. The lab became his planning center, the place where the entire Primis journey through BO3 was mapped out.' },
  ], [
    { heading: 'A Planning Hub',
      text: 'The laboratory is not a playable map in the traditional sense — it represents the period between Origins and The Giant where Richtofen prepared for his dimension-hopping mission. During this time, he traveled to Dimension 63\'s Alcatraz to collect the blood vials from the MOTD crew (as insurance against death), acquired the Summoning Key through the events of Shadows of Evil, and coordinated with Maxis across dimensions.' },
    { heading: 'The Journals',
      text: 'Richtofen\'s lab journals detail his growing horror at what the Kronorium revealed. He learned that every version of himself across every dimension was destined to become a villain — except, possibly, this one. The burden of knowing the future while trying to change it weighed heavily on him. His journals contain sketches of the Summoning Key, coordinates for fracture points, and increasingly desperate notes about "making it right."' },
  ], [
    { heading: 'The Mission Begins',
      text: 'Everything Richtofen planned in this laboratory culminated in his arrival at The Giant, where he shot his Ultimis self and kicked off the Deceptio fracture. Every staff placement, every teleporter coordinate, every dimensional jump was calculated here. The lab represents Richtofen\'s last moment of safety before he committed himself to a path that would eventually demand his own death.' },
    { heading: 'The Shadow Man\'s Imprisonment',
      text: 'It was during this period that the Shadow Man was inadvertently trapped within the Summoning Key during the Shadows of Evil Easter egg. Richtofen knew the Key contained the Shadow Man but took it anyway — a calculated risk that would nearly doom all of reality in Revelations. The lab was where that fateful decision was made.' },
  ]),

  lore('ee-zero-base', 'ZERO BASE', {
    setting: 'A barren version of Earth where life never developed — an entire planet of empty rock, ocean, and atmosphere with no biosphere. Used as an untouchable staging ground by those who know of its existence.',
    crew: ['Various — used as a safe house by different factions'],
    storyImpact: 'Low',
    zombieController: 'None (no 115-based corruption)',
  }, [
    { heading: 'The Empty Earth',
      text: 'In the vast multiverse, one version of Earth exists where life never evolved. No plants, no animals, no humans — just raw geological processes under an empty sky. This dimension was discovered by entities who traverse the multiverse and recognized its value: a place completely free from Element 115 contamination and zombie outbreaks. A dimension that the Apothicons have no interest in, because there are no souls to consume.' },
    { heading: 'A Dimensional Safe Room',
      text: 'Zero Base was established as a staging ground — a safe house between dimensional jumps. Those who know its coordinates can teleport here to rest, plan, and resupply without fear of attack. Its existence is known to very few: select Keepers, Richtofen (who recorded it in the Kronorium), and eventually the Primis crew.' },
  ], [
    { heading: 'Strategic Value',
      text: 'Zero Base\'s significance is entirely strategic. It is a place of transit, not of action. Characters pass through it between maps, use it to store equipment, and retreat here when other dimensions become too dangerous. It appears in radio transmissions and Kronorium entries but is never a site of combat.' },
    { heading: 'The Calm Between Storms',
      text: 'In a saga defined by constant violence and escalating stakes, the Empty Earth represents the only true peace in the multiverse. Its barrenness is its beauty — a place where nothing has gone wrong because nothing has happened. It serves as a philosophical counterpoint to the corrupted dimensions the crew spends their time fighting through.' },
  ], [
    { heading: 'A Footnote in the Story',
      text: 'Zero Base\'s impact on the overall story is minimal but thematically important. It proves that in the infinite multiverse, there exist dimensions untouched by the corruption of Element 115 and the Dark Aether. This concept — that clean, uncorrupted realities are possible — directly foreshadows the ending of Tag der Toten, where Samantha and Eddie exit into a new, clean universe.' },
    { heading: 'Hope in Emptiness',
      text: 'The existence of the Empty Earth suggests that the multiverse, for all its corruption, still contains the possibility of starting over. It is a seed of hope in a storyline defined by tragedy. When Nikolai ultimately decides to destroy the multiverse at Tag der Toten, the Empty Earth is a reminder that new beginnings are possible — even if they require the end of everything that came before.' },
  ]),
];

export const MAP_LORE_BY_NODE: Record<string, MapLoreEntry> = {};
for (const entry of MAP_LORE) {
  MAP_LORE_BY_NODE[entry.nodeId] = entry;
}
