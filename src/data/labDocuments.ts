export type DocTemplate = 'autopsy' | 'blueprint' | 'field-ops' | 'dossier' | 'research';

export interface LabDocument {
  id: string;
  template: DocTemplate;
  title: string;
  fileNo?: string;
  date?: string;
  /** autopsy: examiner name */
  examiner?: string;
  /** autopsy/dossier: species/type */
  species?: string;
  /** autopsy: subject designation */
  subject?: string;
  /** blueprint: designer/signer */
  designer?: string;
  /** dossier: active years */
  active?: string;
  body: string;
  /** Handwritten margin scribbles */
  marginNotes?: string[];
  /** Rubber-stamp overlay text */
  stamp?: string;
}

// ── Full document pool ───────────────────────────────────────

export const LAB_DOCUMENTS: LabDocument[] = [
  // ── AUTOPSY REPORTS ────────────────────────────────────────

  {
    id: 'autopsy-hellhound',
    template: 'autopsy',
    title: 'Specimen — Hellhound',
    fileNo: 'GR935-AUT-0041',
    date: '12 March 1945',
    examiner: 'Dr. Ludvig Maxis',
    species: 'Canis lupus familiaris (mutated)',
    subject: 'Specimen H-7 "Fluffy"',
    body: 'Subject was Dr. Maxis\'s personal dog, used as test subject for MTD Teleporter Trial #151. Upon rematerialization, subject exhibited full-body ignition and extreme aggression. Internal temperature measured at 1200°C. No discernible pain response. Teeth and claws showed 115-crystalline growth patterns. Subject terminated after it breached containment and killed two technicians.',
    marginNotes: ['Fluffy was pregnant — what happened to the pups?', 'Richtofen seemed unsurprised'],
    stamp: 'TERMINATED',
  },
  {
    id: 'autopsy-nova-crawler',
    template: 'autopsy',
    title: 'Specimen — Nova 6 Crawler',
    fileNo: 'GR935-AUT-0097',
    date: '8 October 1963',
    examiner: 'Dr. Friedrich Steiner',
    species: 'Homo sapiens (irreversibly mutated)',
    subject: 'Batch NC-6 Subject 14',
    body: 'Repeated Nova 6 gas exposure combined with Element 115 injection produced quadrupedal locomotion, loss of higher brain function, and a toxic gas discharge on death. Subjects move low to the ground and can navigate ventilation systems. The gas cloud released upon termination is lethal to unprotected personnel within a 3-meter radius.',
    marginNotes: ['Gas masks mandatory in Theater sector', 'Kino project discontinued?'],
    stamp: 'CLASSIFIED',
  },
  {
    id: 'autopsy-astronaut',
    template: 'autopsy',
    title: 'Specimen — Cosmonaut Zombie',
    fileNo: 'GS-AUT-0012',
    date: '2 July 1969',
    examiner: 'Dr. Schuster',
    species: 'Homo sapiens (reanimated, vacuum-adapted)',
    subject: 'Griffin Station Crew Member #4',
    body: 'Subject reanimated inside pressurized EVA suit following exposure to MPD energy discharge. Helmet intact — removal resulted in instant decompression of remaining organic material. Subject exhibited telekinetic grasp ability, pulling victims toward it through an unknown 115-field mechanism. Suit appears to sustain the subject indefinitely in vacuum.',
    marginNotes: ['The MPD did this — not the 115', 'Samantha\'s doing?'],
  },

  // ── WEAPON BLUEPRINTS ──────────────────────────────────────

  {
    id: 'blueprint-ray-gun',
    template: 'blueprint',
    title: 'Ray Gun (Mk.I)',
    fileNo: 'GR935-WPN-0001',
    date: 'November 1942',
    designer: 'Dr. Ludvig Maxis',
    body: 'Fires a burst of green plasma energy between 220 and 230V. Powered by concentrated Element 115 atomic cells. Maximum rate of fire: 180 RPM. 115 tanks hold enough for 20 shots per cell. Reload must be fully completed — partial reload risks cold cell rupture. Plasma has been found in testing to destroy tanks in 2 shots. Splash damage can be quite deadly at close range.',
    marginNotes: ['code name: Little Resistance', 'reduce knockback — operators injuring themselves', '2nd generation being worked on by Dr. Porter'],
    stamp: 'CLASSIFIED',
  },
  {
    id: 'blueprint-wunderwaffe',
    template: 'blueprint',
    title: 'Wunderwaffe DG-2',
    fileNo: 'GR935-WPN-0002',
    date: 'January 1945',
    designer: 'Dr. Edward Richtofen',
    body: 'Discharges concentrated 115-amplified lightning in a chain arc pattern. A single bolt will jump between up to 10 targets within a 6-meter radius. The weapon channels energy through a vacuum tube array that must be replaced every 3 shots. Power source: miniaturized 115 reactor with estimated 30-minute operational lifespan per cell.',
    marginNotes: ['Maxis refused funding — I built it anyway', 'The DG-3 will be even better', 'Chain reaction radius — reduce? No. Increase.'],
    stamp: 'APPROVED',
  },
  {
    id: 'blueprint-thundergun',
    template: 'blueprint',
    title: 'Thundergun Prototype',
    fileNo: 'GR935-WPN-0015',
    date: 'March 1963',
    designer: 'Unknown (recovered from Theater facility)',
    body: 'Compressed air cannon utilizing 115-resonance chambers to generate directed kinetic blast waves. Effective range: 12 meters in a 40-degree cone. All targets within the blast zone are displaced at extreme velocity. No projectile — pure force. Two-second recharge cycle between shots. Ammunition capacity severely limited by chamber pressure tolerances.',
    marginNotes: ['found in Kino projection room', 'who designed this?', 'ammo is the only weakness'],
  },

  // ── FIELD OPERATIONS ───────────────────────────────────────

  {
    id: 'fieldops-der-riese',
    template: 'field-ops',
    title: 'Facility Status — Der Riese',
    fileNo: 'GR935-OPS-0389',
    date: '15 October 1945',
    body: 'Der Riese facility compromised. Dr. Maxis and his daughter Samantha are missing following MTD Teleporter incident in Lab B. Dr. Richtofen has assumed interim command. All mainframe teleporter links remain operational but calibration has drifted. Power grid stable. Note: containment in the lower levels has failed. Staff casualties now exceed 60%. Recommend full evacuation and demolition protocol.',
    marginNotes: ['Richtofen won\'t authorize evacuation', 'Where is Samantha?'],
    stamp: 'CLASSIFIED',
  },
  {
    id: 'fieldops-ascension',
    template: 'field-ops',
    title: 'Cosmodrome Field Report',
    fileNo: 'GR935-OPS-0412',
    date: '20 November 1963',
    body: 'Baikonur Cosmodrome site report: Soviet-operated under Group 935 advisement. Casimir Mechanism prototype installed in centrifuge tower. Luna landers functional for rapid zone transit. Gersh Device prototypes stored in secondary lab. Warning: primate subjects from Project Mercury have breached containment. They exhibit coordinated behavior and target perk-dispensing equipment specifically. Recommend lethal countermeasures.',
    marginNotes: ['The monkeys steal the perks — every time', 'Gersh is trapped inside his own device'],
  },
  {
    id: 'fieldops-griffin',
    template: 'field-ops',
    title: 'Griffin Station — Final Transmission',
    fileNo: 'GS-OPS-0001',
    date: '3 July 1969',
    body: 'This is Dr. Groph transmitting from Griffin Station, lunar surface. Richtofen has arrived and completed the soul transfer. He is now in control of the MPD. Samantha\'s consciousness has been displaced into Richtofen\'s body on Earth. The Vril generator is at capacity. Richtofen has ordered the activation of the missile array. He intends to fire on the Earth. We cannot stop him. This is our final transmission. God help us all.',
    stamp: 'EMERGENCY',
  },

  // ── ENEMY DOSSIERS ─────────────────────────────────────────

  {
    id: 'dossier-brutus',
    template: 'dossier',
    title: 'Brutus — "The Guard"',
    fileNo: 'GR935-DOS-0055',
    species: 'Prison Guard infected with Element 115',
    active: '1933 to unknown',
    body: 'Brutus does not have his own round but appears alongside regular zombies during standard waves. He attacks players with a heavy club and can lock Perk Machines, Icarus, the Mystery Box, and workbenches, forcing players to spend 2000 points to reactivate them. This cost increases by 2000 each time he locks within a round. Headshots remove his helmet quickly, exposing a critical weak point. Drops a random power-up on death.',
    marginNotes: ['aim for the head', 'The Warden was already dead when 115 reached Alcatraz'],
  },
  {
    id: 'dossier-panzer',
    template: 'dossier',
    title: 'Panzersoldat — Heavy Infantry',
    fileNo: 'GR935-DOS-0071',
    species: 'Mechanically augmented zombie (Group 935 Mk.IV suit)',
    active: '1918 to 1945',
    body: 'Panzersoldat units are zombie soldiers encased in experimental power armor designed by Group 935. First deployed during the Excavation at Site 64. Equipped with a flamethrower arm and an electrified grapple claw that pulls targets toward the unit. The armor is highly resistant to small arms fire. Recommended engagement: sustained automatic fire to the power core behind the faceplate, or high-explosive ordnance.',
    marginNotes: ['Origins version is worse — the claw drags you across the map', 'DE variant has no flamethrower, electric shock instead'],
  },
  {
    id: 'dossier-margwa',
    template: 'dossier',
    title: 'Margwa — Apothicon Vanguard',
    fileNo: 'KN-DOS-0003',
    species: 'Apothicon (extra-dimensional entity)',
    active: 'Pre-history to present',
    body: 'The Margwa is a three-headed Apothicon entity that serves as a heavy assault creature. Each head contains a glowing weak point that must be destroyed individually. Once all three heads are eliminated, the creature collapses. Margwas are incredibly durable and can down a player in two melee strikes. They are slow but relentless and will track the nearest player through any terrain.',
    marginNotes: ['Shotguns work best — one shell per head if close enough', 'They come through the Rift portals'],
  },

  // ── RESEARCH NOTES ─────────────────────────────────────────

  {
    id: 'research-115',
    template: 'research',
    title: 'Element 115 — Properties Journal',
    fileNo: 'GR935-RES-0001',
    date: '3 May 1939',
    body: 'The element we have designated Ununpentium — Element 115 — possesses properties that defy conventional physics. When exposed to high-energy electromagnetic fields, 115 samples produce a localized gravitational distortion. Living tissue exposed to concentrated 115 undergoes rapid cell death followed by reanimation of motor functions without higher brain activity. The implications are staggering. Maxis believes we can weaponize it. I believe we can transcend it.',
    marginNotes: ['The meteorites from Tunguska, Shi No Numa, and the Somme are all 115', 'It whispers to me', '— E. Richtofen'],
    stamp: 'TOP SECRET',
  },
  {
    id: 'research-teleporter',
    template: 'research',
    title: 'MTD Calibration — Trial Notes',
    fileNo: 'GR935-RES-0047',
    date: '20 January 1945',
    body: 'Mainframe Teleporter Device Trial #151. Living subject test — Dr. Maxis\'s dog Fluffy placed in chamber. Teleportation initiated. Subject vanished from origin chamber. Did not appear at destination. Power surge across all three terminals. Twenty seconds later, subject rematerialized in the mainframe pad — engulfed in flames, exhibiting extreme hostility. The teleporter works. But it changes what passes through it.',
    marginNotes: ['This was the day everything went wrong', 'Maxis still doesn\'t see it', 'The Aether is real'],
  },
  {
    id: 'research-mpd',
    template: 'research',
    title: 'Moon Pyramid Device — Analysis',
    fileNo: 'GS-RES-0009',
    date: '18 April 1968',
    body: 'The pyramid structure on the Moon — designated MPD — is not of human origin. Its construction predates any known civilization by at least 10,000 years. The device appears to function as an interface between our dimension and the Aether. When powered by 115 and fed with sufficient life force (souls), the MPD grants its occupant control over the zombie horde across all dimensions. Samantha Maxis currently occupies the device. We must find a way to extract her.',
    marginNotes: ['Richtofen doesn\'t want to extract her — he wants to replace her', 'The Vril energy readings are off the chart'],
  },
  {
    id: 'research-aether',
    template: 'research',
    title: 'Dimensional Rift Observations',
    fileNo: 'GR935-RES-0112',
    date: '6 August 1945',
    body: 'After repeated 115-powered teleportation events, we are now detecting stable dimensional rifts at three facilities. The rifts do not close naturally. Through them, we observe a dark mirror of our reality — structures that echo ours but twisted, decayed. Sounds emanate from the rifts: voices, screaming, and occasionally what appears to be laughter. Dr. Richtofen insists the voices are "The Keepers." I am not so certain.',
    marginNotes: ['I heard my own voice through the rift', 'The Dark Aether is watching us'],
    stamp: 'CLASSIFIED',
  },
  {
    id: 'research-agarthan',
    template: 'research',
    title: 'The Agarthan Device — Speculation',
    fileNo: 'KN-RES-0001',
    date: 'Unknown',
    body: 'If the legends are true, the Agarthan Device is capable of rewriting the fundamental rules of reality itself. It could sever the connection between our dimension and the Aether permanently — destroying Element 115, Agartha, and everything that depends on them. Including Dr. Monty. Including the cycle. Using it would mean erasing not just the threat, but every timeline, every version of ourselves that fought to reach this point. It is the ultimate sacrifice.',
    marginNotes: ['Nikolai knows what must be done', 'There is no other way', 'Goodbye, old friends'],
    stamp: 'FINAL',
  },
  {
    id: 'research-primis',
    template: 'research',
    title: 'Primis and Ultimis — Crew Analysis',
    fileNo: 'KN-RES-0004',
    date: 'Outside time',
    body: 'Two versions of the same four men. Ultimis: the original crew, broken by decades of 115 exposure and manipulation. Richtofen the schemer, Dempsey the soldier, Nikolai the drunk, Takeo the loyalist. Primis: their younger counterparts from the Great War era, recruited before corruption set in. Same faces, same names, utterly different men. The multiverse needs both versions to converge at the same point for the cycle to break.',
    marginNotes: ['Which versions are we?', 'Does it matter anymore?'],
  },
  {
    id: 'research-keeper',
    template: 'research',
    title: 'On the Nature of the Keepers',
    fileNo: 'GR935-RES-0200',
    date: 'Undated',
    body: 'The Keepers are ancient beings that exist across all dimensions simultaneously. They created Agartha as a nexus point between realities. A faction of Keepers was corrupted by prolonged 115 exposure and became the Apothicons — banished to the Dark Aether for their transgressions. The remaining Keepers appointed a human intermediary — Dr. Monty — to maintain order. But Monty has his own agenda. He is not our ally. He is our jailer.',
    marginNotes: ['Monty cannot be trusted', 'The children — Samantha and Eddie — are the key'],
    stamp: 'EYES ONLY',
  },
];

// ── Utility: pick N random documents ─────────────────────────

export function pickRandomDocuments(count: number): LabDocument[] {
  const shuffled = [...LAB_DOCUMENTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
