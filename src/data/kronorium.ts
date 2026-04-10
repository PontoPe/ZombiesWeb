export type StoryThread = 'aether' | 'chaos' | 'dark-aether';

export type TimelineNodeType =
  | 'title'
  | 'event'
  | 'dimension'
  | 'branchReason'
  | 'fracture'
  | 'endState';

export interface TimelineNode {
  id: string;
  nodeType: TimelineNodeType;
  label: string;
  x: number;
  y: number;
  /** Accent colour override — red/green for fractures & end-states, #7aa991 for branch reasons */
  color?: string;
  /* Only populated for 'event' nodes (clickable map cards) */
  summary?: string;
  date?: string;
  location?: string;
  mapId?: string;
}

export interface TimelineEdge {
  id: string;
  source: string;
  target: string;
  /** Override source handle position: 'right' (default), 'bottom', 'top' */
  sourceHandle?: 'right' | 'bottom' | 'top';
  /** Override target handle position: 'left' (default), 'top', 'bottom' */
  targetHandle?: 'left' | 'top' | 'bottom';
}

/* Legacy — kept so other pages still compile */
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

// ══════════════════════════════════════════════════════════════
//  HORIZONTAL FLOWCHART DATA  (matches Aether timeline diagram)
// ══════════════════════════════════════════════════════════════

// Card dimensions
const EW = 240;   // event card width
const DW = 180;   // dimension header width
const FW = 160;   // fracture label width
const BW = 200;   // branch-reason width
const TW = 320;   // title width
const SW = 160;   // end-state width

// Centre a node of width w at horizontal position p
const cx = (p: number, w: number) => p - w / 2;

// ── Row centres (y-axis) — vertical lanes ───────────────────
const ROW_DECEPTIO  = 0;
const ROW_OD        = 230;
const ROW_PRODITONE = 460;
const ROW_CYCLE     = 740;
const ROW_D63       = 940;
const ROW_BROKEN    = 1140;
const ROW_AGARTHA   = 1420;
const ROW_EMPTY     = 1650;
const ROW_GW        = 800;   // Great War — roughly centred

// ── Column centres (x-axis) — flow direction ────────────────
const STEP = 340;
const X = (n: number) => n * STEP + 200;

// Col  0 = Title
// Col  1 = Great War
// Col  2 = Branch reasons → dimensions
// Col  3 = Dimension headers
// Col  4 = Sub-branches / D63 Origins / AG Revelations / EE Zero
// Col  5 = Fracture labels / D63 MOTD / AG Children
// Col  6 = Map 1 (Gorod, Zetsubou) / D63 br-cycle/br-broken
// Col  7 = Map 2 (Five) / D63 tl-cycle/tl-broken
// Col  8 = Nacht merge / D63 lab, blood
// Col  9 = Verrückt / D63 SoE
// Col 10 = Branch reasons at Verrückt / D63 destroyed
// Col 11 = Deceptio/True TL labels
// Col 12–14 = Deceptio maps (Giant, Schatten, Eisendrache)
// Col 12–26 = True Timeline maps (Shi No Numa → Destroyed)

export const TIMELINE_NODES: TimelineNode[] = [

  // ─── Title ────────────────────────────────────────────────
  { id: 'title', nodeType: 'title', label: 'THE BEGINNING OF TIME',
    x: cx(X(0), TW), y: ROW_GW },

  // ─── Root ─────────────────────────────────────────────────
  { id: 'great-war', nodeType: 'event', label: 'THE GREAT WAR',
    x: cx(X(1), EW), y: ROW_GW,
    date: '~1300 AD', location: 'Earth / Agartha borderlands',
    summary: 'The Apothicons breach reality and invade Earth. The Keepers recruit four human champions.',
  },

  // ─── Branch reasons → Dimensions (col 2) ─────────────────
  { id: 'br-pablo-no',  nodeType: 'branchReason', label: 'PABLO DOESNT WRITE HIS JOURNAL',
    x: cx(X(2), BW), y: ROW_OD, color: '#7aa991' },
  { id: 'br-pablo-yes', nodeType: 'branchReason', label: 'PABLO WRITES HIS JOURNAL',
    x: cx(X(2), BW), y: ROW_D63, color: '#7aa991' },
  { id: 'br-no-life',   nodeType: 'branchReason', label: 'LIFE NEVER DEVELOPS ON EARTH',
    x: cx(X(2), BW), y: ROW_EMPTY, color: '#7aa991' },

  // ─── Dimension headers (col 3) ────────────────────────────
  { id: 'dim-od',       nodeType: 'dimension', label: 'THE ORIGINAL DIMENSION',
    x: cx(X(3), DW), y: ROW_OD, color: '#00e5ff' },
  { id: 'dim-63',       nodeType: 'dimension', label: 'DIMENSION 63',
    x: cx(X(3), DW), y: ROW_D63, color: '#00e5ff' },
  { id: 'dim-agartha',  nodeType: 'dimension', label: 'AGARTHA',
    x: cx(X(3), DW), y: ROW_AGARTHA, color: '#00e5ff' },
  { id: 'dim-empty',    nodeType: 'dimension', label: 'EMPTY EARTH',
    x: cx(X(3), DW), y: ROW_EMPTY, color: '#00e5ff' },

  // ═══ THE ORIGINAL DIMENSION ═══════════════════════════════

  // Sub-branch reasons (col 4)
  { id: 'br-gruber',      nodeType: 'branchReason', label: 'GRUBER 8 CREATES DRAGONS',
    x: cx(X(4), BW), y: ROW_DECEPTIO, color: '#7aa991' },
  { id: 'br-shi-overrun', nodeType: 'branchReason', label: 'SHI NO NUMA IS OVERRUN',
    x: cx(X(4), BW), y: ROW_PRODITONE, color: '#7aa991' },

  // Fracture labels (col 5)
  { id: 'frac-agonia',    nodeType: 'fracture', label: 'AGONIA FRACTURE',
    x: cx(X(5), FW), y: ROW_DECEPTIO, color: '#cc2222' },
  { id: 'frac-proditone', nodeType: 'fracture', label: 'PRODITONE FRACTURE',
    x: cx(X(5), FW), y: ROW_PRODITONE, color: '#cc2222' },

  // Agonia path (cols 6–7)
  { id: 'gorod-krovi', nodeType: 'event', label: 'GOROD KROVI',
    x: cx(X(6), EW), y: ROW_DECEPTIO,
    date: '1943 (alternate)', location: 'Stalingrad, Soviet Union', mapId: 'gorod-krovi',
    summary: 'An alternate-universe Stalingrad where dragons battle zombies. The Primis crew retrieves Nikolai\'s soul fragment.',
  },
  { id: 'five-agonia', nodeType: 'event', label: 'FIVE',
    x: cx(X(7), EW), y: ROW_DECEPTIO,
    date: 'October 1963', location: 'The Pentagon, USA', mapId: 'five',
    summary: 'During JFK\'s meeting on the Cuban Missile Crisis, an outbreak erupts at the Pentagon. Kennedy, Nixon, Castro, and McNamara fight for survival.',
  },

  // Proditone path (col 6)
  { id: 'zetsubou', nodeType: 'event', label: 'ZETSUBOU NO SHIMA',
    x: cx(X(6), EW), y: ROW_PRODITONE,
    date: '2025', location: 'Pacific research island', mapId: 'zetsubou-no-shima',
    summary: 'The Primis crew is captured on a zombie-infested Japanese WWII island. Plant spores, flooded tunnels, and a spider boss guard 115 research.',
  },

  // Merge → Nacht, Verrückt (cols 8–9)
  { id: 'nacht', nodeType: 'event', label: 'NACHT DER UNTOTEN',
    x: cx(X(8), EW), y: ROW_OD,
    date: '1945', location: 'Abandoned bunker, Germany', mapId: 'nacht-der-untoten',
    summary: 'Anonymous soldiers seek shelter in an abandoned German bunker as the first zombie outbreak erupts. The earliest confirmed zombie encounter.',
  },
  { id: 'verruckt', nodeType: 'event', label: 'VERRÜCKT',
    x: cx(X(9), EW), y: ROW_OD,
    date: '1945', location: 'Wittenau Sanatorium, Berlin', mapId: 'verruckt',
    summary: 'A Group 935 sanatorium becomes overrun. The facility was used for classified teleporter experiments and early zombie containment studies.',
  },

  // Branch reasons at Verrückt (col 10)
  { id: 'br-richtofen-kills', nodeType: 'branchReason', label: 'RICHTOFEN KILLS MAXIS',
    x: cx(X(10), BW), y: ROW_DECEPTIO, color: '#7aa991' },
  { id: 'br-ultimis',         nodeType: 'branchReason', label: 'ULTIMIS IS FORMED',
    x: cx(X(10), BW), y: ROW_PRODITONE, color: '#7aa991' },

  // Fracture / TL labels (col 11)
  { id: 'frac-deceptio', nodeType: 'fracture', label: 'DECEPTIO FRACTURE',
    x: cx(X(11), FW), y: ROW_DECEPTIO, color: '#cc2222' },
  { id: 'tl-true',       nodeType: 'fracture', label: 'THE TRUE TIMELINE',
    x: cx(X(11), FW), y: ROW_PRODITONE, color: '#22cc44' },

  // ─── Deceptio path (cols 12–14) ───────────────────────────
  { id: 'the-giant', nodeType: 'event', label: 'THE GIANT',
    x: cx(X(12), EW), y: ROW_DECEPTIO,
    date: '1945', location: 'Der Riese Facility, Poland', mapId: 'the-giant',
    summary: 'Richtofen completes the Matter Transference Device. Maxis and Samantha are trapped inside an MTD. Samantha bonds with the MPD and becomes the controller of the undead.',
  },
  { id: 'der-schatten', nodeType: 'event', label: 'DER SCHATTEN',
    x: cx(X(13), EW), y: ROW_DECEPTIO,
    date: '1945 (alternate)', location: 'Shadows realm',
    summary: 'An alternate shadow dimension pulled from the fracture.',
  },
  { id: 'der-eisendrache', nodeType: 'event', label: 'DER EISENDRACHE',
    x: cx(X(14), EW), y: ROW_DECEPTIO,
    date: '1945 (alternate)', location: 'Austrian Castle, Alps', mapId: 'der-eisendrache',
    summary: 'The Primis crew arrives at a Nazi-occupied Austrian mountain fortress. Richtofen releases Ultimis Dempsey\'s soul. The Wrath of the Ancients bow is assembled.',
  },

  // ─── True Timeline path (cols 12–26) ─────────────────────
  { id: 'tt-shi-no-numa', nodeType: 'event', label: 'SHI NO NUMA',
    x: cx(X(12), EW), y: ROW_PRODITONE,
    date: 'July 1943', location: 'Shi No Numa Facility, Japan', mapId: 'shi-no-numa',
    summary: 'Group 935 runs a 115-fueled research station in a Japanese swamp. Richtofen retrieves the Golden Rod artifact.',
  },
  { id: 'tt-der-riese', nodeType: 'event', label: 'DER RIESE',
    x: cx(X(13), EW), y: ROW_PRODITONE,
    date: '1945', location: 'Der Riese Facility, Poland', mapId: 'der-riese',
    summary: 'Richtofen completes the teleporter network. Maxis and Samantha are trapped. Samantha bonds with the MPD.',
  },
  { id: 'tt-shangri-la', nodeType: 'event', label: 'SHANGRI-LA',
    x: cx(X(14), EW), y: ROW_PRODITONE,
    date: 'Unknown (time loop)', location: 'Ancient ruins, Himalayas', mapId: 'shangri-la',
    summary: 'A mythical city hidden in the Himalayas, corrupted by 115. The O4 crew is trapped in a time loop.',
  },
  { id: 'tt-kino', nodeType: 'event', label: 'KINO DER TOTEN',
    x: cx(X(15), EW), y: ROW_PRODITONE,
    date: '1963', location: 'Group 935 Theater, Berlin', mapId: 'kino-der-toten',
    summary: 'The O4 crew emerges in an abandoned Group 935 theater used for mind-control experiments on zombie subjects.',
  },
  { id: 'tt-classified', nodeType: 'event', label: 'CLASSIFIED',
    x: cx(X(16), EW), y: ROW_PRODITONE,
    date: '1963', location: 'The Pentagon, USA',
    summary: 'Classified documents reveal the Pentagon\'s connection to Group 935 and the Broken Arrow program.',
  },
  { id: 'tt-ascension', nodeType: 'event', label: 'ASCENSION/FIVE',
    x: cx(X(17), EW), y: ROW_PRODITONE,
    date: '1963', location: 'Baikonur Cosmodrome, Soviet USSR', mapId: 'ascension',
    summary: 'A Group 935/Soviet cosmodrome houses MPD research. The O4 crew frees Gersh from the Casimir Mechanism.',
  },
  { id: 'tt-broken-arrow', nodeType: 'event', label: 'BROKEN ARROW LAB',
    x: cx(X(18), EW), y: ROW_PRODITONE,
    date: '1963', location: 'Broken Arrow Facility, USA',
    summary: 'The US Broken Arrow program attempts to weaponise Element 115 independently of Group 935.',
  },
  { id: 'tt-call-dead', nodeType: 'event', label: 'CALL OF THE DEAD',
    x: cx(X(19), EW), y: ROW_PRODITONE,
    date: '1963', location: 'Soviet film studio, Siberia', mapId: 'call-of-the-dead',
    summary: 'A film crew accidentally activates a 115 teleporter. The trapped O4 crew contacts Richtofen from a sealed control room.',
  },
  { id: 'tt-alpha-omega', nodeType: 'event', label: 'ALPHA OMEGA',
    x: cx(X(20), EW), y: ROW_PRODITONE,
    date: '2025', location: 'Nuketown Bunker, Nevada', mapId: 'alpha-omega',
    summary: 'The crew reaches a bunker beneath the Nuketown test site. Rushmore AI and the trapped Avogadro threaten to destabilise everything.',
  },
  { id: 'tt-moon', nodeType: 'event', label: 'MOON/NUKETOWN',
    x: cx(X(21), EW), y: ROW_PRODITONE,
    date: '1969', location: 'Griffin Station, The Moon', mapId: 'moon',
    summary: 'The O4 crew reaches Griffin Station. Richtofen swaps souls with Samantha and fires the rockets at Earth, destroying civilisation.',
  },
  { id: 'tt-tranzit', nodeType: 'event', label: 'TRANZIT',
    x: cx(X(22), EW), y: ROW_PRODITONE,
    date: '2035', location: 'Hanford, Washington', mapId: 'tranzit',
    summary: 'Post-nuclear Earth. Survivors board a looping bus through a radioactive wasteland. Maxis and Richtofen battle for control of the Hanford pylon.',
  },
  { id: 'tt-die-rise', nodeType: 'event', label: 'DIE RISE',
    x: cx(X(23), EW), y: ROW_PRODITONE,
    date: '2035', location: 'Collapsed skyscrapers, China', mapId: 'die-rise',
    summary: 'Survivors navigate crumbling skyscrapers. The N4 crew activates an Annihilator Pylon.',
  },
  { id: 'tt-buried', nodeType: 'event', label: 'BURIED',
    x: cx(X(24), EW), y: ROW_PRODITONE,
    date: '2035', location: 'Gideon, Nevada (underground)', mapId: 'buried',
    summary: 'An underground ghost town is uncovered beneath Nevada. The N4 crew activates the final Pylon.',
  },
  { id: 'tt-victis', nodeType: 'event', label: 'VICTIS HIDEOUT',
    x: cx(X(25), EW), y: ROW_PRODITONE,
    date: '2035', location: 'Undisclosed',
    summary: 'The Victis crew retreats to a hidden safe-house after the events of Buried. Their fate hangs in the balance.',
  },
  { id: 'tt-destroyed', nodeType: 'endState', label: 'UNIVERSE DESTROYED',
    x: cx(X(26), SW), y: ROW_PRODITONE, color: '#cc2222' },

  // ═══ DIMENSION 63 ═════════════════════════════════════════

  { id: 'd63-origins', nodeType: 'event', label: 'ORIGINS',
    x: cx(X(4), EW), y: ROW_D63,
    date: 'September 1917', location: 'Excavation Site 64, France', mapId: 'origins',
    summary: 'During WWI, Group 935 discovers buried Element 115 meteorites beneath the Somme. Ancient Panzer robots awaken. Richtofen first contacts the Aether entities.',
  },
  { id: 'd63-motd', nodeType: 'event', label: 'MOTD',
    x: cx(X(5), EW), y: ROW_D63,
    date: '1934 (endless loop)', location: 'Alcatraz Island, USA', mapId: 'mob-of-the-dead',
    summary: 'Four mobsters attempt to escape Alcatraz on New Year\'s Eve. They are trapped in a purgatory loop by the undead Warden.',
  },

  // Branch reasons (col 6)
  { id: 'br-cycle',  nodeType: 'branchReason', label: 'MONSTERS NEVER BREAK THE CYCLE',
    x: cx(X(6), BW), y: ROW_CYCLE, color: '#7aa991' },
  { id: 'br-broken', nodeType: 'branchReason', label: 'MONSTERS BREAK THE CYCLE',
    x: cx(X(6), BW), y: ROW_BROKEN, color: '#7aa991' },

  // Timeline labels (col 7)
  { id: 'tl-cycle',  nodeType: 'fracture', label: 'CYCLE TIMELINE',
    x: cx(X(7), FW), y: ROW_CYCLE, color: '#cc2222' },
  { id: 'tl-broken', nodeType: 'fracture', label: 'BROKEN TIMELINE',
    x: cx(X(7), FW), y: ROW_BROKEN, color: '#22cc44' },

  // Cycle path (cols 8–10)
  { id: 'd63-lab', nodeType: 'event', label: 'RICHTOFENS LAB',
    x: cx(X(8), EW), y: ROW_CYCLE,
    date: '1940s', location: 'Richtofen\'s hidden laboratory',
    summary: 'Richtofen\'s personal laboratory where Element 115 experiments are conducted in secret.',
  },
  { id: 'd63-soe', nodeType: 'event', label: 'SHADOWS OF EVIL',
    x: cx(X(9), EW), y: ROW_CYCLE,
    date: '1940', location: 'Morg City, USA', mapId: 'shadows-of-evil',
    summary: 'Four criminals in a 1940s noir city are manipulated by the Shadow Man into awakening a Rift. The Apothicons are being summoned.',
  },
  { id: 'd63-destroyed', nodeType: 'endState', label: 'UNIVERSE DESTROYED',
    x: cx(X(10), SW), y: ROW_CYCLE, color: '#cc2222' },

  // Broken path (col 8)
  { id: 'd63-blood', nodeType: 'event', label: 'BLOOD OF THE DEAD',
    x: cx(X(8), EW), y: ROW_BROKEN,
    date: '2035', location: 'Alcatraz Island, USA', mapId: 'blood-of-the-dead',
    summary: 'Post-apocalyptic Alcatraz ruled by a zombified Warden. Primis arrives to free Ultimis Richtofen\'s soul.',
  },

  // ═══ AGARTHA ══════════════════════════════════════════════

  { id: 'ag-revelations', nodeType: 'event', label: 'REVELATIONS',
    x: cx(X(4), EW), y: ROW_AGARTHA,
    date: '2025+', location: 'The Aether — all dimensions combined', mapId: 'revelations',
    summary: 'The Shadow Man fuses all previous map environments into one fractured reality. The Primis crew confronts the Apothicon God.',
  },
  { id: 'ag-children', nodeType: 'endState', label: 'CHILDREN ARE SAFE',
    x: cx(X(5), SW), y: ROW_AGARTHA, color: '#22cc44' },

  // ═══ EMPTY EARTH ══════════════════════════════════════════

  { id: 'ee-zero-base', nodeType: 'event', label: 'ZERO BASE',
    x: cx(X(4), EW), y: ROW_EMPTY,
    date: 'Unknown', location: 'Empty Earth',
    summary: 'A barren version of Earth where life never developed. Used as a safe staging ground by certain factions.',
  },
];

// ── Edges ────────────────────────────────────────────────────

export const TIMELINE_EDGES: TimelineEdge[] = [
  // Root
  { id: 'e-title',         source: 'title',        target: 'great-war' },

  // Great War → dimension branches
  { id: 'e-gw-od',         source: 'great-war',    target: 'br-pablo-no' },
  { id: 'e-gw-63',         source: 'great-war',    target: 'br-pablo-yes' },
  { id: 'e-gw-ag',         source: 'great-war',    target: 'dim-agartha' },
  { id: 'e-gw-ee',         source: 'great-war',    target: 'br-no-life' },

  { id: 'e-br-od',         source: 'br-pablo-no',  target: 'dim-od' },
  { id: 'e-br-63',         source: 'br-pablo-yes', target: 'dim-63' },
  { id: 'e-br-ee',         source: 'br-no-life',   target: 'dim-empty' },

  // ── Original Dimension ──────────────────────────────────
  { id: 'e-od-gruber',     source: 'dim-od',       target: 'br-gruber' },
  { id: 'e-od-shi',        source: 'dim-od',       target: 'br-shi-overrun' },
  { id: 'e-gruber-ag',     source: 'br-gruber',    target: 'frac-agonia' },
  { id: 'e-shi-pro',       source: 'br-shi-overrun', target: 'frac-proditone' },

  // Agonia path
  { id: 'e-ag-gk',         source: 'frac-agonia',   target: 'gorod-krovi' },
  { id: 'e-gk-five',       source: 'gorod-krovi',   target: 'five-agonia' },
  { id: 'e-five-nacht',    source: 'five-agonia',   target: 'nacht' },

  // Proditone path
  { id: 'e-pro-zet',       source: 'frac-proditone', target: 'zetsubou' },
  { id: 'e-zet-nacht',     source: 'zetsubou',       target: 'nacht' },

  // Merge → Verrückt
  { id: 'e-nacht-ver',     source: 'nacht',         target: 'verruckt' },

  // Verrückt → branch reasons
  { id: 'e-ver-richtofen', source: 'verruckt',      target: 'br-richtofen-kills' },
  { id: 'e-ver-ultimis',   source: 'verruckt',      target: 'br-ultimis' },
  { id: 'e-br-dec',        source: 'br-richtofen-kills', target: 'frac-deceptio' },
  { id: 'e-br-tt',         source: 'br-ultimis',    target: 'tl-true' },

  // Deceptio path
  { id: 'e-dec-giant',     source: 'frac-deceptio', target: 'the-giant' },
  { id: 'e-giant-sch',     source: 'the-giant',     target: 'der-schatten' },
  { id: 'e-sch-eis',       source: 'der-schatten',  target: 'der-eisendrache' },

  // True Timeline path
  { id: 'e-tt-1',  source: 'tl-true',          target: 'tt-shi-no-numa' },
  { id: 'e-tt-2',  source: 'tt-shi-no-numa',   target: 'tt-der-riese' },
  { id: 'e-tt-3',  source: 'tt-der-riese',     target: 'tt-shangri-la' },
  { id: 'e-tt-4',  source: 'tt-shangri-la',    target: 'tt-kino' },
  { id: 'e-tt-5',  source: 'tt-kino',          target: 'tt-classified' },
  { id: 'e-tt-6',  source: 'tt-classified',    target: 'tt-ascension' },
  { id: 'e-tt-7',  source: 'tt-ascension',     target: 'tt-broken-arrow' },
  { id: 'e-tt-8',  source: 'tt-broken-arrow',  target: 'tt-call-dead' },
  { id: 'e-tt-9',  source: 'tt-call-dead',     target: 'tt-alpha-omega' },
  { id: 'e-tt-10', source: 'tt-alpha-omega',   target: 'tt-moon' },
  { id: 'e-tt-11', source: 'tt-moon',          target: 'tt-tranzit' },
  { id: 'e-tt-12', source: 'tt-tranzit',       target: 'tt-die-rise' },
  { id: 'e-tt-13', source: 'tt-die-rise',      target: 'tt-buried' },
  { id: 'e-tt-14', source: 'tt-buried',        target: 'tt-victis' },
  { id: 'e-tt-15', source: 'tt-victis',        target: 'tt-destroyed' },

  // ── Dimension 63 ───────────────────────────────────────
  { id: 'e-63-origins',    source: 'dim-63',       target: 'd63-origins' },
  { id: 'e-63-motd',       source: 'd63-origins',  target: 'd63-motd' },

  // Cycle / Broken branches
  { id: 'e-motd-cycle',    source: 'd63-motd',     target: 'br-cycle' },
  { id: 'e-motd-broken',   source: 'd63-motd',     target: 'br-broken' },
  { id: 'e-br-cycle',      source: 'br-cycle',     target: 'tl-cycle' },
  { id: 'e-br-broken',     source: 'br-broken',    target: 'tl-broken' },

  // Cycle path
  { id: 'e-cyc-lab',       source: 'tl-cycle',     target: 'd63-lab' },
  { id: 'e-lab-soe',       source: 'd63-lab',      target: 'd63-soe' },
  { id: 'e-soe-dest',      source: 'd63-soe',      target: 'd63-destroyed' },

  // Broken path
  { id: 'e-brk-blood',     source: 'tl-broken',    target: 'd63-blood' },

  // ── Agartha ────────────────────────────────────────────
  { id: 'e-ag-rev',        source: 'dim-agartha',  target: 'ag-revelations' },
  { id: 'e-rev-child',     source: 'ag-revelations', target: 'ag-children' },

  // ── Empty Earth ────────────────────────────────────────
  { id: 'e-ee-zero',       source: 'dim-empty',    target: 'ee-zero-base' },
];

// ── Legacy exports (keep other pages compiling) ─────────────
export const LORE_EVENTS: LoreEvent[] = [];
export const LORE_CONNECTIONS: LoreConnection[] = [];