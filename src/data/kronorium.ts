export type StoryThread = 'aether' | 'chaos' | 'dark-aether';

export type TimelineNodeType =
  | 'title'
  | 'event'
  | 'dimension'
  | 'branchReason'
  | 'fracture'
  | 'endState'
  | 'waypoint';

export interface TimelineNode {
  id: string;
  nodeType: TimelineNodeType;
  label: string;
  x: number;
  y: number;
  
  color?: string;
  
  summary?: string;
  date?: string;
  location?: string;
  mapId?: string;
  
  crew?: string;
}

export interface TimelineEdge {
  id: string;
  source: string;
  target: string;
  
  sourceHandle?: 'right' | 'bottom' | 'top' | 'left';
  
  targetHandle?: 'left' | 'top' | 'bottom' | 'right';
  
  label?: string;
}

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

const EW = 240;   // event card width
const DW = 180;   // dimension header width
const FW = 160;   // fracture label width
const BW = 200;   // branch-reason width
const TW = 320;   // title width
const SW = 160;   // end-state width

const cx = (p: number, w: number) => p - w / 2;

const ROW_AGONIA      = -80;   // Agonia fracture sub-branch
const ROW_DECEPTIO    = 100;
const ROW_OD          = 280;   // Shared OD maps (Nacht, Verrückt)
const ROW_PRODITONE_F = 420;   // Proditone fracture sub-branch
const ROW_TRUE_TL     = 560;   // True Timeline
const ROW_CYCLE       = 800;
const ROW_D63         = 1000;
const ROW_BROKEN      = 1200;
const ROW_AGARTHA     = 1500;
const ROW_EMPTY       = 1750;
const ROW_GW          = 900;   // Great War — roughly centred

const STEP = 340;
const X = (n: number) => n * STEP + 200;

export const TIMELINE_NODES: TimelineNode[] = [

  { id: 'title', nodeType: 'title', label: 'THE BEGINNING OF TIME',
    x: cx(X(0), TW), y: ROW_GW },

  { id: 'great-war', nodeType: 'event', label: 'THE GREAT WAR',
    x: cx(X(1), EW), y: ROW_GW,
    date: '~1300 AD', location: 'Earth / Agartha borderlands',
    summary: 'The Apothicons breach reality and invade Earth. The Keepers recruit four human champions.',
  },

  { id: 'br-pablo-no',  nodeType: 'branchReason', label: 'PABLO DOESNT WRITE HIS JOURNAL',
    x: cx(X(2), BW), y: ROW_OD, color: '#7aa991' },
  { id: 'br-pablo-yes', nodeType: 'branchReason', label: 'PABLO WRITES HIS JOURNAL',
    x: cx(X(2), BW), y: ROW_D63, color: '#7aa991' },
  { id: 'br-no-life',   nodeType: 'branchReason', label: 'LIFE NEVER DEVELOPS ON EARTH',
    x: cx(X(2), BW), y: ROW_EMPTY, color: '#7aa991' },

  { id: 'dim-od',       nodeType: 'dimension', label: 'THE ORIGINAL DIMENSION',
    x: cx(X(3), DW), y: ROW_OD, color: '#00e5ff' },
  { id: 'dim-63',       nodeType: 'dimension', label: 'DIMENSION 63',
    x: cx(X(3), DW), y: ROW_D63, color: '#00e5ff' },
  { id: 'dim-agartha',  nodeType: 'dimension', label: 'AGARTHA',
    x: cx(X(7), DW), y: ROW_AGARTHA, color: '#00e5ff' },
  { id: 'dim-empty',    nodeType: 'dimension', label: 'EMPTY EARTH',
    x: cx(X(3), DW), y: ROW_EMPTY, color: '#00e5ff' },

  { id: 'nacht', nodeType: 'event', label: 'NACHT DER UNTOTEN',
    x: cx(X(4), EW), y: ROW_OD,
    date: 'June 4th, 1945', location: 'Abandoned bunker, Germany', mapId: 'nacht-der-untoten',
    summary: 'Anonymous soldiers seek shelter in an abandoned German bunker as the first zombie outbreak erupts. The earliest confirmed zombie encounter.',
    crew: 'Marines',
  },
  { id: 'verruckt', nodeType: 'event', label: 'VERRÜCKT',
    x: cx(X(5), EW), y: ROW_OD,
    date: 'September 6th, 1945', location: 'Wittenau Sanatorium, Berlin', mapId: 'verruckt',
    summary: 'A Group 935 sanatorium becomes overrun. The facility was used for classified teleporter experiments and early zombie containment studies.',
    crew: 'Marines',
  },

  { id: 'br-gruber',          nodeType: 'branchReason', label: 'GRUBER 8 CREATES DRAGONS',
    x: cx(X(6), BW), y: ROW_AGONIA, color: '#7aa991' },
  { id: 'br-richtofen-kills', nodeType: 'branchReason', label: 'RICHTOFEN KILLS MAXIS',
    x: cx(X(6), BW), y: ROW_DECEPTIO, color: '#7aa991' },
  { id: 'br-shi-overrun',     nodeType: 'branchReason', label: 'SHI NO NUMA IS OVERRUN',
    x: cx(X(6), BW), y: ROW_PRODITONE_F, color: '#7aa991' },
  { id: 'br-ultimis',         nodeType: 'branchReason', label: 'ULTIMIS IS FORMED',
    x: cx(X(6), BW), y: ROW_TRUE_TL, color: '#7aa991' },

  { id: 'frac-agonia',    nodeType: 'fracture', label: 'AGONIA FRACTURE',
    x: cx(X(7), FW), y: ROW_AGONIA, color: '#cc2222',
    summary: 'A fractured timeline where the Battle of Stalingrad never ends. Group 935 deploys dragons on the Eastern Front, and WWII rages indefinitely. Stalingrad becomes a three-way war between dragons, machines, and the undead.',
  },
  { id: 'frac-deceptio',  nodeType: 'fracture', label: 'DECEPTIO FRACTURE',
    x: cx(X(7), FW), y: ROW_DECEPTIO, color: '#cc2222',
    summary: 'A fractured timeline created when Primis Richtofen kills his Ultimis self at Der Riese. The act of deception triggers fractures across space and time as Primis begins collecting souls to set things right.',
  },
  { id: 'frac-proditone', nodeType: 'fracture', label: 'PRODITONE FRACTURE',
    x: cx(X(7), FW), y: ROW_PRODITONE_F, color: '#cc2222',
    summary: 'A fractured timeline where the Rising Sun Facility is overrun by the undead. Division 9 builds a new island facility and continues experiments with plant-based organisms, prisoners of war, and arachnids.',
  },
  { id: 'tl-true',        nodeType: 'fracture', label: 'THE TRUE TIMELINE',
    x: cx(X(7), FW), y: ROW_TRUE_TL, color: '#22cc44',
    summary: 'The original, unbroken sequence of events. Ultimis is formed and embarks on a globe-spanning journey from Shi No Numa to the Moon, culminating in Richtofen\'s Grand Scheme and the fracturing of Earth.',
  },

  { id: 'gorod-krovi', nodeType: 'event', label: 'GOROD KROVI',
    x: cx(X(8), EW), y: ROW_AGONIA,
    date: 'November 6th, 1945', location: 'Stalingrad, Soviet Union', mapId: 'gorod-krovi',
    summary: 'An alternate-universe Stalingrad where dragons battle zombies. The Primis crew retrieves Nikolai\'s soul fragment.',
    crew: 'Primis',
  },
  { id: 'five-agonia', nodeType: 'event', label: 'FIVE',
    x: cx(X(9), EW), y: ROW_AGONIA - 120,
    date: 'November 6th, 1963', location: 'The Pentagon, USA', mapId: 'five',
    summary: 'During JFK\'s meeting on the Cuban Missile Crisis, an outbreak erupts at the Pentagon. Kennedy, Nixon, Castro, and McNamara fight for survival.',
    crew: 'Celebrities',
  },
  

  { id: 'the-giant', nodeType: 'event', label: 'THE GIANT',
    x: cx(X(8), EW), y: ROW_DECEPTIO,
    date: 'October 13th, 1945', location: 'Der Riese Facility, Poland', mapId: 'the-giant',
    summary: 'Primis Richtofen arrives through a teleporter and kills his Ultimis self, triggering fractures across space and time. Primis fights the undead and sends a beacon to Maxis.',
    crew: 'Primis',
  },
  { id: 'der-eisendrache', nodeType: 'event', label: 'DER EISENDRACHE',
    x: cx(X(9), EW), y: ROW_DECEPTIO,
    date: 'November 5th, 1945', location: 'Austrian Castle, Alps', mapId: 'der-eisendrache',
    summary: 'The Primis crew arrives at a Nazi-occupied Austrian mountain fortress. Richtofen releases Ultimis Dempsey\'s soul. The Wrath of the Ancients bow is assembled.',
    crew: 'Primis',
  },

  { id: 'zetsubou', nodeType: 'event', label: 'ZETSUBOU NO SHIMA',
    x: cx(X(8), EW), y: ROW_PRODITONE_F,
    date: 'October 1st, 1945', location: 'Pohnpei Island, Pacific', mapId: 'zetsubou-no-shima',
    summary: 'The Primis crew is captured on a zombie-infested Japanese WWII island. Plant spores, flooded tunnels, and a spider boss guard 115 research.',
    crew: 'Primis',
  },

  { id: 'tt-shi-no-numa', nodeType: 'event', label: 'SHI NO NUMA',
    x: cx(X(8), EW), y: ROW_TRUE_TL,
    date: 'October 21st, 1945', location: 'Shi No Numa Facility, Japan', mapId: 'shi-no-numa',
    summary: 'Group 935 runs a 115-fueled research station in a Japanese swamp. Richtofen retrieves the Golden Rod artifact.',
    crew: 'Ultimis',
  },
  { id: 'tt-der-riese', nodeType: 'event', label: 'DER RIESE',
    x: cx(X(9), EW), y: ROW_TRUE_TL,
    date: 'October 28th, 1945', location: 'Der Riese Facility, Poland', mapId: 'der-riese',
    summary: 'Richtofen completes the teleporter network. Maxis and Samantha are trapped. Samantha bonds with the MPD.',
    crew: 'Ultimis',
  },
  { id: 'tt-shangri-la', nodeType: 'event', label: 'SHANGRI-LA',
    x: cx(X(10), EW), y: ROW_TRUE_TL,
    date: 'April 23rd, 1956', location: 'Ancient ruins, Himalayas', mapId: 'shangri-la',
    summary: 'A mythical city hidden in the Himalayas, corrupted by 115. The O4 crew acquires the Focusing Stone while trapped in a time loop.',
    crew: 'Ultimis',
  },
  { id: 'tt-kino', nodeType: 'event', label: 'KINO DER TOTEN',
    x: cx(X(11), EW), y: ROW_TRUE_TL,
    date: 'October 28th, 1963', location: 'Group 935 Theater, Berlin', mapId: 'kino-der-toten',
    summary: 'The O4 crew emerges in an abandoned Group 935 theater used for mind-control experiments on zombie subjects.',
    crew: 'Ultimis',
  },
  { id: 'tt-classified', nodeType: 'event', label: 'CLASSIFIED',
    x: cx(X(12), EW), y: ROW_TRUE_TL,
    date: 'November 5th, 1963', location: 'The Pentagon, USA',
    summary: 'Classified documents reveal the Pentagon\'s connection to Group 935 and the Broken Arrow program.',
    crew: 'Ultimis',
  },
  { id: 'tt-ascension', nodeType: 'event', label: 'ASCENSION',
    x: cx(X(13), EW), y: ROW_TRUE_TL,
    date: 'November 6th, 1963', location: 'Baikonur Cosmodrome, Soviet USSR', mapId: 'ascension',
    summary: 'A Group 935/Soviet cosmodrome houses MPD research. The O4 crew frees Gersh from the Casimir Mechanism.',
    crew: 'Ultimis',
  },
  { id: 'tt-call-dead', nodeType: 'event', label: 'CALL OF THE DEAD',
    x: cx(X(14), EW), y: ROW_TRUE_TL,
    date: 'March 17th, 2011', location: 'Siberian Facility, Russia', mapId: 'call-of-the-dead',
    summary: 'A film crew accidentally activates a 115 teleporter. The trapped O4 crew contacts Richtofen from a sealed control room to recover the Vril Device.',
    crew: 'Ultimis',
  },

  { id: 'tt-alpha-omega', nodeType: 'event', label: 'ALPHA OMEGA',
    x: cx(X(15), EW), y: ROW_TRUE_TL - 120,
    date: 'October 13th, 2025', location: 'Camp Edward, Nevada', mapId: 'alpha-omega',
    summary: 'Primis and Ultimis travel to Camp Edward to retrieve the Elemental Shard. After gaining Rushmore\'s trust and defeating Avogadro, they escape with the Shard.',
    crew: 'Primis & Ultimis',
  },
  { id: 'tt-moon', nodeType: 'event', label: 'MOON',
    x: cx(X(15), EW), y: ROW_TRUE_TL,
    date: 'October 13th, 2025', location: 'Griffin Station, The Moon', mapId: 'moon',
    summary: 'Richtofen swaps souls with Samantha in the MPD, gaining control of the zombies. Maxis convinces the others to fire the rockets at Earth, fracturing it.',
    crew: 'Ultimis',
  },
  { id: 'tt-nuketown', nodeType: 'event', label: 'NUKETOWN',
    x: cx(X(15), EW), y: ROW_TRUE_TL + 120,
    date: 'October 13th, 2025', location: 'Nuketown, Nevada',
    summary: 'As the Moon rockets impact Earth, a nuclear test town in Nevada is overrun by zombies. Survivors fight waves while Richtofen and Maxis battle for control of the undead. Perks rain from the sky via artillery drops.',
    crew: 'CIA/CDC',
  },

  { id: 'tt-tranzit', nodeType: 'event', label: 'TRANZIT',
    x: cx(X(16), EW), y: ROW_TRUE_TL,
    date: 'October 21st, 2035', location: 'Hanford, Washington', mapId: 'tranzit',
    summary: 'Post-nuclear Earth. Survivors board a looping bus through a radioactive wasteland. Maxis and Richtofen battle for control of the Hanford pylon.',
    crew: 'Victis',
  },
  { id: 'tt-die-rise', nodeType: 'event', label: 'DIE RISE',
    x: cx(X(17), EW), y: ROW_TRUE_TL,
    date: 'October 22nd, 2035', location: 'Collapsed skyscrapers, China', mapId: 'die-rise',
    summary: 'Survivors navigate crumbling skyscrapers. The N4 crew activates an Annihilator Pylon.',
    crew: 'Victis',
  },
  { id: 'tt-buried', nodeType: 'event', label: 'BURIED',
    x: cx(X(18), EW), y: ROW_TRUE_TL,
    date: 'December 31st, 2035', location: 'Purgatory Point, Angola', mapId: 'buried',
    summary: 'An underground ghost town is uncovered beneath a mining facility. The N4 crew activates the final Pylon. Maxis destroys the Earth to open a gateway to Agartha.',
    crew: 'Victis',
  },
  { id: 'tt-tag', nodeType: 'event', label: 'TAG DER TOTEN',
    x: cx(X(19), EW), y: ROW_TRUE_TL,
    date: '1965 (Pocket Dimension)', location: 'Siberian Facility',
    summary: 'The final battle. Primis Nikolai poisons both crews, Samantha kills him with a Welling, and she and Eddie exit the Dark Aether into a new universe. The multiverse is destroyed.',
    crew: 'Victis',
  },
  { id: 'tt-destroyed', nodeType: 'endState', label: 'MULTIVERSE DESTROYED',
    x: cx(X(20), SW), y: ROW_TRUE_TL, color: '#cc2222' },

  { id: 'd63-origins', nodeType: 'event', label: 'ORIGINS',
    x: cx(X(4), EW), y: ROW_D63,
    date: 'June 4th, 1918', location: 'Excavation Site 64, France', mapId: 'origins',
    summary: 'During WWI, Group 935 discovers buried Element 115 meteorites beneath the Somme. Ancient Panzer robots awaken. Richtofen first contacts the Aether entities.',
    crew: 'Primis',
  },
  { id: 'd63-motd', nodeType: 'event', label: 'MOTD',
    x: cx(X(5), EW), y: ROW_D63,
    date: 'December 31st, 1933', location: 'Alcatraz Island, USA', mapId: 'mob-of-the-dead',
    summary: 'Four mobsters attempt to escape Alcatraz on New Year\'s Eve. They are trapped in a purgatory loop by the undead Warden.',
    crew: 'Mob Crew',
  },

  { id: 'br-cycle',  nodeType: 'branchReason', label: 'MOBSTERS NEVER BREAK THE CYCLE',
    x: cx(X(6), BW), y: ROW_CYCLE, color: '#7aa991' },
  { id: 'br-broken', nodeType: 'branchReason', label: 'MOBSTERS BREAK THE CYCLE',
    x: cx(X(6), BW), y: ROW_BROKEN, color: '#7aa991' },

  { id: 'tl-cycle',  nodeType: 'fracture', label: 'CYCLE TIMELINE',
    x: cx(X(7), FW), y: ROW_CYCLE, color: '#cc2222',
    summary: 'In this timeline the mobsters of Alcatraz never break free. The cycle repeats endlessly — Sal, Finn, and Billy kill Al, die, and wake to do it again. Richtofen exploits the pocket dimension for his plans.',
  },
  { id: 'tl-broken', nodeType: 'fracture', label: 'BROKEN TIMELINE',
    x: cx(X(7), FW), y: ROW_BROKEN, color: '#22cc44',
    summary: 'Al finally prevails over the other mobsters, breaking the Alcatraz cycle. This allows Primis to later arrive at the pocket dimension in Blood of the Dead, where Primis Richtofen sacrifices himself to break free.',
  },

  { id: 'd63-lab', nodeType: 'event', label: 'RICHTOFENS LAB',
    x: cx(X(8), EW), y: ROW_CYCLE,
    date: '1940s', location: 'Richtofen\'s hidden laboratory',
    summary: 'Richtofen\'s personal laboratory where Element 115 experiments are conducted in secret.',
  },
  { id: 'd63-soe', nodeType: 'event', label: 'SHADOWS OF EVIL',
    x: cx(X(9), EW), y: ROW_CYCLE,
    date: 'April 25th, 1944', location: 'Morg City, USA', mapId: 'shadows-of-evil',
    summary: 'Four criminals in a 1940s noir city are manipulated by the Shadow Man into awakening a Rift. The Apothicons are being summoned.',
    crew: 'SoE Crew',
  },
  { id: 'd63-destroyed', nodeType: 'endState', label: 'UNIVERSE DESTROYED',
    x: cx(X(10), SW), y: ROW_CYCLE, color: '#cc2222' },

  { id: 'd63-blood', nodeType: 'event', label: 'BLOOD OF THE DEAD',
    x: cx(X(8), EW), y: ROW_BROKEN,
    date: 'July 4th, 1941', location: 'Alcatraz Island, USA', mapId: 'blood-of-the-dead',
    summary: 'Primis arrives at the Alcatraz pocket dimension. The Warden traps them in a cycle. Primis Richtofen is replaced by a post-Revelations version who breaks the cycle.',
    crew: 'Primis',
  },

  { id: 'ag-revelations', nodeType: 'event', label: 'REVELATIONS',
    x: cx(X(19), EW), y: ROW_AGARTHA,
    date: '2025+', location: 'The Aether — all dimensions combined', mapId: 'revelations',
    summary: 'The Shadow Man fuses all previous map environments into one fractured reality. The Primis crew confronts the Apothicon God.',
    crew: 'Primis',
  },
  { id: 'ag-children', nodeType: 'endState', label: 'CHILDREN ARE SAFE',
    x: cx(X(20), SW), y: ROW_AGARTHA, color: '#22cc44' },

  { id: 'ee-zero-base', nodeType: 'event', label: 'ZERO BASE',
    x: cx(X(4), EW), y: ROW_EMPTY,
    date: 'Unknown', location: 'Empty Earth',
    summary: 'A barren version of Earth where life never developed. Used as a safe staging ground by certain factions.',
  },
];

export const TIMELINE_EDGES: TimelineEdge[] = [
  { id: 'e-title',         source: 'title',        target: 'great-war' },

  { id: 'e-gw-od',         source: 'great-war',    target: 'br-pablo-no' },
  { id: 'e-gw-63',         source: 'great-war',    target: 'br-pablo-yes' },
  { id: 'e-gw-ag',         source: 'great-war',    target: 'dim-agartha' },
  { id: 'e-gw-ee',         source: 'great-war',    target: 'br-no-life' },

  { id: 'e-br-od',         source: 'br-pablo-no',  target: 'dim-od' },
  { id: 'e-br-63',         source: 'br-pablo-yes', target: 'dim-63' },
  { id: 'e-br-ee',         source: 'br-no-life',   target: 'dim-empty' },

  { id: 'e-od-nacht',      source: 'dim-od',        target: 'nacht' },
  { id: 'e-nacht-ver',     source: 'nacht',         target: 'verruckt' },

  { id: 'e-ver-gruber',    source: 'verruckt',      target: 'br-gruber',          sourceHandle: 'top' },
  { id: 'e-ver-richtofen', source: 'verruckt',      target: 'br-richtofen-kills', sourceHandle: 'top' },
  { id: 'e-ver-shi',       source: 'verruckt',      target: 'br-shi-overrun',     sourceHandle: 'bottom' },
  { id: 'e-ver-ultimis',   source: 'verruckt',      target: 'br-ultimis',         sourceHandle: 'bottom' },

  { id: 'e-gruber-ag',     source: 'br-gruber',          target: 'frac-agonia' },
  { id: 'e-br-dec',        source: 'br-richtofen-kills', target: 'frac-deceptio' },
  { id: 'e-shi-pro',       source: 'br-shi-overrun',     target: 'frac-proditone' },
  { id: 'e-br-tt',         source: 'br-ultimis',         target: 'tl-true' },

  { id: 'e-ag-gk',         source: 'frac-agonia',   target: 'gorod-krovi' },
  { id: 'e-gk-five',       source: 'gorod-krovi',   target: 'five-agonia' },

  { id: 'e-dec-giant',     source: 'frac-deceptio', target: 'the-giant' },
  { id: 'e-giant-eis',     source: 'the-giant',     target: 'der-eisendrache' },

  { id: 'e-pro-zet',       source: 'frac-proditone', target: 'zetsubou' },

  { id: 'e-tt-1',  source: 'tl-true',          target: 'tt-shi-no-numa' },
  { id: 'e-tt-2',  source: 'tt-shi-no-numa',   target: 'tt-der-riese' },
  { id: 'e-tt-3',  source: 'tt-der-riese',     target: 'tt-shangri-la' },
  { id: 'e-tt-4',  source: 'tt-shangri-la',    target: 'tt-kino' },
  { id: 'e-tt-5',  source: 'tt-kino',          target: 'tt-classified' },
  { id: 'e-tt-6',  source: 'tt-classified',    target: 'tt-ascension' },
  { id: 'e-tt-7',  source: 'tt-ascension',     target: 'tt-call-dead' },
  { id: 'e-tt-8',  source: 'tt-call-dead',     target: 'tt-moon' },
  { id: 'e-tt-8b', source: 'tt-call-dead',     target: 'tt-nuketown',     sourceHandle: 'bottom' },
  { id: 'e-tt-8c', source: 'tt-call-dead',     target: 'tt-alpha-omega',  sourceHandle: 'top' },
  { id: 'e-tt-9',  source: 'tt-moon',          target: 'tt-tranzit' },
  { id: 'e-tt-9b', source: 'tt-nuketown',      target: 'tt-tranzit',      sourceHandle: 'bottom' },
  { id: 'e-tt-9c', source: 'tt-alpha-omega',   target: 'tt-tranzit',      sourceHandle: 'bottom' },
  { id: 'e-tt-10', source: 'tt-tranzit',       target: 'tt-die-rise' },
  { id: 'e-tt-11', source: 'tt-die-rise',      target: 'tt-buried' },
  { id: 'e-tt-12', source: 'tt-buried',        target: 'tt-tag' },
  { id: 'e-tt-13', source: 'tt-tag',           target: 'tt-destroyed' },

  { id: 'e-63-origins',    source: 'dim-63',       target: 'd63-origins' },
  { id: 'e-63-motd',       source: 'd63-origins',  target: 'd63-motd' },
  { id: 'e-origins-giant', source: 'd63-origins',  target: 'the-giant', sourceHandle: 'top', targetHandle: 'top' },

  { id: 'e-motd-cycle',    source: 'd63-motd',     target: 'br-cycle' },
  { id: 'e-motd-broken',   source: 'd63-motd',     target: 'br-broken' },
  { id: 'e-br-cycle',      source: 'br-cycle',     target: 'tl-cycle' },
  { id: 'e-br-broken',     source: 'br-broken',    target: 'tl-broken' },

  { id: 'e-cyc-lab',       source: 'tl-cycle',     target: 'd63-lab' },
  { id: 'e-lab-soe',       source: 'd63-lab',      target: 'd63-soe' },
  { id: 'e-soe-dest',      source: 'd63-soe',      target: 'd63-destroyed' },

  { id: 'e-brk-blood',     source: 'tl-broken',    target: 'd63-blood' },

  { id: 'e-ag-rev',        source: 'dim-agartha',  target: 'ag-revelations' },
  { id: 'e-eis-zet',       source: 'der-eisendrache',  target: 'zetsubou' },
  { id: 'e-zet-gk',        source: 'zetsubou',         target: 'gorod-krovi' },
  { id: 'e-gk-rev',        source: 'gorod-krovi',      target: 'ag-revelations' },
  { id: 'e-rev-child',     source: 'ag-revelations', target: 'ag-children' },
  { id: 'e-cycle',         source: 'ag-revelations', target: 'great-war', sourceHandle: 'bottom', targetHandle: 'bottom', label: 'THE CYCLE' },
  { id: 'e-ee-zero',       source: 'dim-empty',    target: 'ee-zero-base' },
];

export const LORE_EVENTS: LoreEvent[] = [];
export const LORE_CONNECTIONS: LoreConnection[] = [];