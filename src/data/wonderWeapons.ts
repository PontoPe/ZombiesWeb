// Wonder Weapon compendium — cross-game reference.
// Each entry covers acquisition, upgrade (PaP), effect, ammo, and map availability.

import type { GameId } from './maps';

export type WWType =
  | 'ray'        // ray guns / beam weapons
  | 'elemental'  // staffs, bows, elemental wands
  | 'explosive'  // grenade-style / launcher
  | 'melee'      // tomahawks, swords
  | 'plant'      // biological / organic
  | 'artifact'   // dark aether sentinel-tier
  | 'sonic'      // wave/sound based
  | 'ice'        // cryo
  | 'lightning'  // tesla
  | 'other';

export type AcquisitionMethod =
  | 'box'        // mystery box only
  | 'buildable'  // assembly of parts
  | 'wall'       // wall buy
  | 'ee-reward'  // easter egg step reward
  | 'ritual';    // map-specific ritual / ceremony

export interface WonderWeapon {
  id: string;
  name: string;
  /** Short alternate name / nickname */
  aka?: string;
  type: WWType;
  introducedIn: { mapId: string; mapTitle: string; game: GameId };
  /** Additional maps this WW (or a direct variant) appears on */
  alsoOn?: { mapId: string; mapTitle: string; note?: string }[];
  acquisition: AcquisitionMethod;
  acquisitionNote: string;
  papName?: string;
  papEffect: string;
  ammo: string;
  /** One-line damage profile */
  damage: string;
  description: string;
  /** Upgrade variants beyond standard PaP (e.g. elemental staff upgrades) */
  variants?: string[];
}

export const WONDER_WEAPONS: WonderWeapon[] = [

  // ══════════════ WORLD AT WAR ══════════════

  {
    id: 'wunderwaffe-dg2',
    name: 'Wunderwaffe DG-2',
    aka: 'Wunderwaffe',
    type: 'lightning',
    introducedIn: { mapId: 'shi-no-numa', mapTitle: 'Shi No Numa', game: 'waw' },
    alsoOn: [
      { mapId: 'der-riese', mapTitle: 'Der Riese' },
      { mapId: 'the-giant', mapTitle: 'The Giant' },
      { mapId: 'classified', mapTitle: 'Classified', note: 'Appears in Ultimis remake' },
    ],
    acquisition: 'box',
    acquisitionNote: 'Mystery Box only — low pull chance, no buildable path.',
    papName: 'Wunderwaffe DG-3 JZ',
    papEffect: 'Fires a chain-lightning bolt that arcs through every zombie in range. Upgraded version gets 3 mag / 24 reserve and faster recharge.',
    ammo: '3 / 15 (24 PaP)',
    damage: 'One-shot kills through walls and through the entire chain.',
    description: "Group 935's lightning cannon — the original wonder weapon. Forks between every zombie in a huge radius with a single trigger pull. Will kill the user if they are caught in the chain at low rounds.",
  },

  // ══════════════ BLACK OPS ══════════════

  {
    id: 'ray-gun',
    name: 'Ray Gun',
    type: 'ray',
    introducedIn: { mapId: 'nacht-der-untoten', mapTitle: 'Nacht der Untoten', game: 'waw' },
    alsoOn: [
      { mapId: 'kino-der-toten', mapTitle: 'Every map from WaW → BO4', note: 'Universal mystery box entry' },
    ],
    acquisition: 'box',
    acquisitionNote: "The iconic ray gun. Appears in the Mystery Box on every classic map.",
    papName: 'Porter\'s X2 Ray Gun',
    papEffect: 'Larger splash radius, green tracers, 200 reserve ammo. Splash still hurts the user — keep distance.',
    ammo: '20 / 160 (200 PaP)',
    damage: 'One-shot kill to ~round 15, consistent torso damage higher.',
    description: "The universal wonder weapon. Every Zombies player's first wonder weapon pull from the box — it became the benchmark every other WW is measured against.",
  },
  {
    id: 'thundergun',
    name: 'Thundergun',
    type: 'sonic',
    introducedIn: { mapId: 'kino-der-toten', mapTitle: 'Kino der Toten', game: 'bo1' },
    alsoOn: [
      { mapId: 'ascension', mapTitle: 'Ascension', note: 'Mystery Box' },
      { mapId: 'moon', mapTitle: 'Moon', note: 'Mystery Box' },
    ],
    acquisition: 'box',
    acquisitionNote: 'Mystery Box only. Rare pull — widely considered the best panic weapon in Zombies history.',
    papName: 'Zeus Cannon',
    papEffect: 'Doubles reserve ammo. Still a single clean shot per trigger — use for horde wipes and emergency revives.',
    ammo: '2 / 6 (12 PaP)',
    damage: 'Wipes every zombie in a cone regardless of round.',
    description: 'Compressed-air cannon that instantly obliterates every zombie in a wide cone. The definitive "oh no" button.',
  },
  {
    id: 'winters-howl',
    name: "Winter's Howl",
    type: 'ice',
    introducedIn: { mapId: 'five', mapTitle: 'Five', game: 'bo1' },
    alsoOn: [
      { mapId: 'classified', mapTitle: 'Classified', note: 'BO4 Five remake' },
    ],
    acquisition: 'box',
    acquisitionNote: 'Mystery Box only on Five and Classified.',
    papName: 'Winter\'s Fury',
    papEffect: 'Wider freeze cone, faster freeze, shattered zombies count as instakills.',
    ammo: '4 / 16 (24 PaP)',
    damage: 'Freezes then shatters — effective at all rounds if you can line up the cone.',
    description: 'Cryogenic launcher that freezes zombies solid. Shoot a frozen zombie with any weapon to shatter it for an instant kill.',
  },
  {
    id: 'gersch-device',
    name: 'Gersch Device',
    type: 'explosive',
    introducedIn: { mapId: 'ascension', mapTitle: 'Ascension', game: 'bo1' },
    alsoOn: [
      { mapId: 'moon', mapTitle: 'Moon', note: 'Mystery Box' },
    ],
    acquisition: 'box',
    acquisitionNote: 'Tactical grenade slot from the box. Returns via QED rolls on Moon.',
    papEffect: 'Not PaP-upgradable directly — spawns a black hole that pulls in all nearby zombies and kills them over a few seconds.',
    ammo: 'Tactical slot (grenade-style)',
    damage: 'Guaranteed wipe inside the singularity radius.',
    description: 'A weaponized containment breach of the Gersch device — opens a micro black hole. Excellent for clearing revive space.',
  },
  {
    id: 'vr11',
    name: 'V-R11',
    aka: 'Humanizer',
    type: 'ray',
    introducedIn: { mapId: 'call-of-the-dead', mapTitle: 'Call of the Dead', game: 'bo1' },
    acquisition: 'box',
    acquisitionNote: 'Mystery Box only. Shared with the Scavenger on Call of the Dead.',
    papName: 'V-R11 Lazarus',
    papEffect: 'Briefly turns zombies back into humans who run as decoys. Upgraded version drops a power-up on kill and heals downed players.',
    ammo: '1 / 4 (1 / 12 PaP)',
    damage: 'Not damage-focused — tactical transformation tool.',
    description: 'Experimental reverse-reanimation ray. The upgraded Lazarus variant is one of the only wonder weapons that can revive downed teammates at range.',
  },
  {
    id: 'scavenger',
    name: 'Scavenger',
    type: 'ray',
    introducedIn: { mapId: 'call-of-the-dead', mapTitle: 'Call of the Dead', game: 'bo1' },
    acquisition: 'box',
    acquisitionNote: 'Mystery Box only. Bolt-action rifle form — rare pull.',
    papName: 'Hyena Infra-Dead',
    papEffect: 'Explosive thermal-optic rounds with massive splash damage. Reserve doubles; one of the strongest single-target weapons in BO1.',
    ammo: '6 / 18 (6 / 30 PaP)',
    damage: 'Round 40+ one-shots with splash.',
    description: 'Bolt-action sniper that fires explosive cryo rounds. Pairs the ice-freeze effect with massive splash.',
  },
  {
    id: '31-79-jgb215',
    name: '31-79 JGb215',
    aka: 'Baby Gun',
    type: 'other',
    introducedIn: { mapId: 'shangri-la', mapTitle: 'Shangri-La', game: 'bo1' },
    acquisition: 'box',
    acquisitionNote: 'Mystery Box only on Shangri-La.',
    papName: 'Fractionalizer',
    papEffect: 'Wider beam, shrunken zombies become insta-kill stomps, and the upgrade carries more reserve.',
    ammo: '5 / 20 (40 PaP)',
    damage: 'Shrinks zombies into instakill targets you can stomp.',
    description: "Shrink ray that turns zombies into miniature, one-stomp versions of themselves. Unique to Shangri-La and rarely replicated since.",
  },
  {
    id: 'wave-gun',
    name: 'Wave Gun',
    aka: 'Zap Gun Dual Wield / Wave Gun',
    type: 'sonic',
    introducedIn: { mapId: 'moon', mapTitle: 'Moon', game: 'bo1' },
    acquisition: 'box',
    acquisitionNote: 'Mystery Box only. Also rolls as Zap Guns — a dual-wield variant of the same weapon.',
    papName: 'Wave Gun / Porter\'s Mark II Ray Gun (dual)',
    papEffect: 'Wave Gun swells and pops zombies in a large AoE. Zap Gun dual-wield fires chained lightning per hand.',
    ammo: 'Shared pool: 3 / 9 (3 / 18 PaP)',
    damage: 'Wave: AoE wipe. Zap: chain lightning per shot.',
    description: 'Dual-form sonic cannon. Switch between the AoE wave burst and a dual-wielded zap gun using the weapon switch button.',
  },
  {
    id: 'qed',
    name: 'QED',
    aka: 'Quantum Entanglement Device',
    type: 'explosive',
    introducedIn: { mapId: 'moon', mapTitle: 'Moon', game: 'bo1' },
    acquisition: 'box',
    acquisitionNote: 'Tactical grenade slot from the box. Random effects on throw.',
    papEffect: 'Not PaP-upgradable. Random outcomes: power-up drop, free perk, weapon swap, free Pack-a-Punch, or a huge zombie wipe.',
    ammo: 'Tactical slot',
    damage: 'Variable. Can insta-wipe a horde or do nothing.',
    description: 'Chaos grenade. Best thought of as a gamble: sometimes you get a Max Ammo, sometimes you get a sad fart.',
  },

  // ══════════════ BLACK OPS II ══════════════

  {
    id: 'sliquifier',
    name: 'Sliquifier',
    type: 'other',
    introducedIn: { mapId: 'die-rise', mapTitle: 'Die Rise', game: 'bo2' },
    acquisition: 'buildable',
    acquisitionNote: 'Build from four parts scattered across the Skyscraper: barrel, handle, glass tube, and gauge.',
    papName: 'Sliquifier',
    papEffect: 'Larger puddles, faster kill, bigger reserve.',
    ammo: '2 / 18 (2 / 30 PaP)',
    damage: 'Creates liquid puddles — zombies that touch them die and chain to any zombie they touch.',
    description: 'Bio-chemical goo cannon. Place a puddle in a training lane and every zombie that walks through it dies and infects the next one.',
  },
  {
    id: 'blundergat',
    name: 'Blundergat',
    type: 'explosive',
    introducedIn: { mapId: 'mob-of-the-dead', mapTitle: 'Mob of the Dead', game: 'bo2' },
    alsoOn: [
      { mapId: 'blood-of-the-dead', mapTitle: 'Blood of the Dead', note: 'Returns as a rebuilt variant' },
    ],
    acquisition: 'buildable',
    acquisitionNote: 'Obtained via the afterlife-path around the Warden\'s office, then returned to a weapon locker.',
    papName: 'Sweeper',
    papEffect: 'Acid rounds that devastate a large cone. The alternate Vitriolic Withering upgrade (via EE) is the strongest single weapon in BO2.',
    ammo: '2 / 10 (2 / 40 PaP)',
    damage: 'Acid cone one-shots at high rounds.',
    description: 'Dual-barrel blunderbuss firing explosive slugs. Upgrade to the Acidgat / Vitriolic Withering via the Easter Egg for insane damage.',
    variants: ['Acidgat', 'Vitriolic Withering (Acidgat PaP)'],
  },
  {
    id: 'paralyzer',
    name: 'Paralyzer',
    type: 'sonic',
    introducedIn: { mapId: 'buried', mapTitle: 'Buried', game: 'bo2' },
    acquisition: 'box',
    acquisitionNote: 'Mystery Box only on Buried.',
    papName: 'Paralyzer',
    papEffect: 'Not PaP-upgradable directly. Hold to levitate and freeze zombies mid-air; has infinite ammo but overheats.',
    ammo: 'Infinite (overheat)',
    damage: 'Freezes and lifts zombies — kills on prolonged hold.',
    description: 'Sonic disruption cannon. Hold the trigger to levitate zombies in a beam; release to drop them as crawlers. Uniquely has no reserve ammo.',
  },
  {
    id: 'elemental-staffs',
    name: 'Elemental Staffs',
    aka: 'Ice / Fire / Lightning / Wind Staves',
    type: 'elemental',
    introducedIn: { mapId: 'origins', mapTitle: 'Origins', game: 'bo2' },
    acquisition: 'buildable',
    acquisitionNote: 'Collect four gem fragments, a crystal, and a staff head for each of the four staffs. Assemble at the Crazy Place altars via the Giants.',
    papName: 'Upgraded Staff of X',
    papEffect: 'Each staff has a unique upgrade requiring a multi-step Easter Egg puzzle in the Crazy Place. Upgraded staves deal massive AoE and have unique ultimate abilities.',
    ammo: 'Per-staff (reloads via pickups or zombies)',
    damage: 'Upgraded: one-shot wipes into the high rounds.',
    description: "The pinnacle of BO2 wonder weapons. Four elemental staves — Ice (Ull's Arrow), Fire (Kagutsuchi's Blood), Lightning (Kimat's Bite), and Wind (Boreas' Fury) — each with its own upgrade quest.",
    variants: ['Ull\'s Arrow (Ice)', "Kagutsuchi's Blood (Fire)", "Kimat's Bite (Lightning)", "Boreas' Fury (Wind)"],
  },

  // ══════════════ BLACK OPS III ══════════════

  {
    id: 'apothicon-servant',
    name: 'Apothicon Servant',
    type: 'other',
    introducedIn: { mapId: 'shadows-of-evil', mapTitle: 'Shadows of Evil', game: 'bo3' },
    alsoOn: [
      { mapId: 'revelations', mapTitle: 'Revelations', note: 'Returns as a fixture of the BO3 finale' },
    ],
    acquisition: 'buildable',
    acquisitionNote: 'Collect four Summoning Key pieces via the district rituals, then assemble in the Ritual Room.',
    papName: 'Shadow Servant / Kor Marz Ma',
    papEffect: 'Wider vortex, chain-consumption between clusters, longer duration on upgrade.',
    ammo: '1 / 3 (1 / 6 PaP)',
    damage: 'Opens a vortex that devours every zombie in range.',
    description: 'Shadow Man\'s Apothicon relic — fires a dimensional rift that sucks zombies inside and consumes them. One of the strongest WWs in BO3.',
  },
  {
    id: 'wrath-of-the-ancients',
    name: 'Wrath of the Ancients',
    aka: 'Elemental Bows',
    type: 'elemental',
    introducedIn: { mapId: 'der-eisendrache', mapTitle: 'Der Eisendrache', game: 'bo3' },
    acquisition: 'ritual',
    acquisitionNote: 'Obtain the base bow via the castle ritual, then complete one of four elemental upgrade quests (Wolf, Fire, Void, Storm).',
    papEffect: 'Each upgraded bow has a unique ultimate charge effect and gains much higher ammo and damage.',
    ammo: 'Variable per bow; charge-based.',
    damage: 'Upgraded: train-wipes into the high rounds.',
    description: 'Medieval elemental bow. Each of the four upgrades has one of the most in-depth quests in Zombies history.',
    variants: ["Wolf Bow (Rune Prison)", "Fire Bow (Storm)", "Void Bow", "Storm Bow"],
  },
  {
    id: 'kt-4',
    name: 'KT-4',
    aka: 'Plant Gun',
    type: 'plant',
    introducedIn: { mapId: 'zetsubou-no-shima', mapTitle: 'Zetsubou No Shima', game: 'bo3' },
    acquisition: 'buildable',
    acquisitionNote: 'Grow plants in the three bunker gardens, assemble from parts fertilized by zombie blood.',
    papName: 'Masamune',
    papEffect: 'Fires concentrated acid rounds in a tight beam, large reserve, higher damage through rounds.',
    ammo: '4 / 12 (4 / 24 PaP)',
    damage: 'Acid-rounds one-shot into mid-high rounds.',
    description: 'Organic bio-weapon grown from hybrid plant matter. The Masamune upgrade is one of the most consistent high-round weapons in BO3.',
  },
  {
    id: 'gkz-45-mk3',
    name: 'GKZ-45 Mk3',
    type: 'ray',
    introducedIn: { mapId: 'gorod-krovi', mapTitle: 'Gorod Krovi', game: 'bo3' },
    acquisition: 'buildable',
    acquisitionNote: 'Feed the baby dragon three times with the appropriate items, then retrieve the weapon.',
    papName: 'GKZ-45 Mk3',
    papEffect: 'Dragon\'s breath alt-fire unlocks post-EE — briefly summons the dragon to incinerate an area.',
    ammo: '4 / 12',
    damage: 'Plasma rounds — high single-target damage.',
    description: 'Soviet plasma pistol bonded with dragon essence. Its alt-fire dragon breath is one of the most flashy WW abilities in the series.',
  },

  // ══════════════ BLACK OPS 4 ══════════════

  {
    id: 'sentinel-artifact',
    name: 'Sentinel Artifact',
    type: 'artifact',
    introducedIn: { mapId: 'voyage-of-despair', mapTitle: 'Voyage of Despair', game: 'bo4' },
    alsoOn: [
      { mapId: 'ix', mapTitle: 'IX' },
      { mapId: 'ancient-evil', mapTitle: 'Ancient Evil' },
    ],
    acquisition: 'ee-reward',
    acquisitionNote: 'Obtained through each Chaos map\'s main quest progression. One artifact per map with map-specific form (Kraken, Death of Orion, Hammer of Valhalla).',
    papName: 'Per-map',
    papEffect: 'Each map\'s artifact is a unique upgraded WW with its own firing behavior and ultimate.',
    ammo: 'Per-artifact',
    damage: 'High-tier damage, intended as the map\'s finisher weapon.',
    description: 'Chaos-story relic powered by the Elder Gods. Each map\'s artifact takes a different form: the Kraken, Death of Orion, or Hammer of Valhalla.',
    variants: ['Kraken (Voyage of Despair)', 'Death of Orion (IX)', 'Hammer of Valhalla (Ancient Evil)'],
  },
  {
    id: 'hells-retriever',
    name: "Hell's Retriever",
    type: 'melee',
    introducedIn: { mapId: 'mob-of-the-dead', mapTitle: 'Mob of the Dead', game: 'bo2' },
    alsoOn: [
      { mapId: 'blood-of-the-dead', mapTitle: 'Blood of the Dead' },
    ],
    acquisition: 'ritual',
    acquisitionNote: 'Feed three skulls in afterlife mode via the warden cells, then retrieve from the golden gate sequence.',
    papName: "Hell's Redeemer",
    papEffect: 'Upgrade via a second, longer ritual. Homing throws, more targets, insta-kill through the rounds.',
    ammo: 'Infinite (returns to hand)',
    damage: 'Throwable insta-kill throughout the game.',
    description: 'Demonic tomahawk that returns to your hand after each throw. The upgraded Redeemer variant is one of the strongest melee wonder weapons in the series.',
    variants: ["Hell's Redeemer (upgraded)"],
  },
  {
    id: 'alistairs-folly',
    name: "Alistair's Folly",
    aka: 'Mk2 Pistols',
    type: 'ray',
    introducedIn: { mapId: 'dead-of-the-night', mapTitle: 'Dead of the Night', game: 'bo4' },
    acquisition: 'buildable',
    acquisitionNote: 'Collect four elemental essences from each of the four supernatural bosses (werewolf, vampire, etc.) and return them to the reactor room.',
    papEffect: 'Fully assembled weapon switches between four elemental modes: fire, lightning, ice, and void.',
    ammo: 'Per-element',
    damage: 'High damage per element; void is the strongest.',
    description: 'Dual-wielded Mk2 pistols infused with four elements. Alistair Rhodes\' personal wonder weapon — each element has distinct behavior.',
  },
  {
    id: 'raik-84',
    name: 'RAIK-84',
    type: 'lightning',
    introducedIn: { mapId: 'tag-der-toten', mapTitle: 'Tag der Toten', game: 'bo4' },
    acquisition: 'box',
    acquisitionNote: 'Mystery Box only on Tag der Toten.',
    papName: 'RAI K-84',
    papEffect: 'Switches between a chain-lightning primary and a projected void-bomb alt-fire.',
    ammo: '40 / 120',
    damage: 'Chain lightning + AoE void burst.',
    description: 'Group 601 prototype tesla rifle. A direct spiritual successor to the Wunderwaffe — chains lightning between every nearby zombie.',
  },

];

/** Group by source game. */
export function wwByGame(): Record<GameId, WonderWeapon[]> {
  const out = { waw: [], bo1: [], bo2: [], bo3: [], bo4: [] } as Record<GameId, WonderWeapon[]>;
  for (const w of WONDER_WEAPONS) out[w.introducedIn.game].push(w);
  return out;
}
