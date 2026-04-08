import React, { useState, useRef, useEffect, useCallback } from 'react';

// ── Virtual filesystem ──────────────────────────────────────

type DirNode = { type: 'dir'; children: Record<string, DirNode | FileNode> };
type FileNode = { type: 'file'; content: string };
type FSNode = DirNode | FileNode;
type PathArr = string[];

const virtualFS: Record<string, DirNode> = {
  '/': {
    type: 'dir',
    children: {
      'readme.txt': {
        type: 'file',
        content:
          'GROUP 935 INTERNAL NETWORK — AUTHORIZED PERSONNEL ONLY\n' +
          'Dr. Edward Richtofen, Lead Researcher\n' +
          'Access Level: UMBRA\n\n' +
          'Type "help" for available commands.',
      },
      'subjects': {
        type: 'dir',
        children: {
          'tank_dempsey.log': {
            type: 'file',
            content:
              'SUBJECT: Cpl. "Tank" Dempsey — U.S. Marine Corps\n' +
              'STATUS: Memory wiped. Responds well to aggression stimuli.\n' +
              'NOTES: Keeps asking for beans. Remarkable resilience to 115 exposure.\n' +
              'Useful as frontline asset. Does not question orders... anymore.',
          },
          'nikolai_belinski.log': {
            type: 'file',
            content:
              'SUBJECT: Nikolai Belinski — Red Army\n' +
              'STATUS: Perpetually inebriated. Memory fragmented.\n' +
              'NOTES: Mentions wife(s) frequently. Unclear how many.\n' +
              'Possibly the only man alive who can outdrink a Panzersoldat.',
          },
          'takeo_masaki.log': {
            type: 'file',
            content:
              'SUBJECT: Takeo Masaki — Imperial Japanese Army\n' +
              'STATUS: Honor-bound. Refuses sedation.\n' +
              'NOTES: Suspects betrayal. He is correct, but does not know by whom.\n' +
              'His discipline makes him a valuable asset. His suspicion, a liability.',
          },
          'samantha.log': {
            type: 'file',
            content:
              'SUBJECT: Samantha Maxis\n' +
              'STATUS: ??? — LAST SEEN ENTERING MPD\n' +
              'NOTES: She is in the Aether. She controls them now.\n' +
              'Maxis, you fool. You should have kept her away from the device.\n' +
              'I can hear her laughing.',
          },
        },
      },
      'research': {
        type: 'dir',
        children: {
          'element_115.txt': {
            type: 'file',
            content:
              'ELEMENT 115 — DIVINIUM\n' +
              'Origin: Extraterrestrial meteorite impacts (Shi No Numa, Der Riese, Moon)\n' +
              'Properties: Reanimation of dead tissue, temporal displacement,\n' +
              'interdimensional rifts, power source for Wonder Weapons.\n\n' +
              'WARNING: Prolonged exposure causes auditory hallucinations,\n' +
              'paranoia, and an irresistible urge to collect power-ups.',
          },
          'mpdReport.txt': {
            type: 'file',
            content:
              'MOON PYRAMID DEVICE (M.P.D.)\n' +
              'Location: Griffin Station, Moon\n' +
              'Status: ACTIVE\n\n' +
              'The device is a gateway to the Aether. Whoever enters gains\n' +
              'control of the undead army. Maxis wanted to destroy it.\n' +
              'I have... other plans.',
          },
          'wonderWeapons.txt': {
            type: 'file',
            content:
              'WONDER WEAPON CATALOG:\n' +
              '  Ray Gun ........... Mk I plasma projector. Reliable. Iconic.\n' +
              '  Thundergun ........ Compressed air displacement cannon.\n' +
              '  Wunderwaffe DG-2 .. My masterpiece. Lightning in a box.\n' +
              '  Winter\'s Howl ..... Cryogenic. Effective but... inelegant.\n' +
              '  Wave Gun .......... Dual-wield microwave emitter.\n' +
              '  Apothicon Servant . Organic. I do not like looking at it.\n' +
              '  G.K.Z-45 Mk 3 .... Ask Gersh. Actually, don\'t. He\'s still upset.',
          },
        },
      },
      'logs': {
        type: 'dir',
        children: {
          'radio_01.txt': {
            type: 'file',
            content:
              '[STATIC] ...Entry 741021. Perhaps the station will hold.\n' +
              'The barrier is failing. We are running out of ammunition.\n' +
              'If anyone can hear this... do not trust Maxis.\n' +
              'Do not trust me either. [STATIC]',
          },
          'radio_02.txt': {
            type: 'file',
            content:
              '[STATIC] ...I have hidden the Vril Device. The Keepers must\n' +
              'not find it before I complete the cycle. The Kronorium speaks\n' +
              'of a way to set things right. But every page I turn reveals\n' +
              'a future worse than the last. [STATIC]',
          },
          'maxis_warning.txt': {
            type: 'file',
            content:
              'Edward,\n\n' +
              'I know what you have done. I know about the experiments.\n' +
              'I know about Griffin Station. When I find proof, and I will,\n' +
              'you will answer for all of it.\n\n' +
              'Do not come near Samantha again.\n\n' +
              '— Dr. Ludvig Maxis',
          },
        },
      },
      '.hidden': {
        type: 'dir',
        children: {
          'kronorium_excerpt.txt': {
            type: 'file',
            content:
              'THE KRONORIUM — FRAGMENT 63:19\n\n' +
              '"In the beginning, there was only the Aether.\n' +
              'The Keepers found the dark Aether and were corrupted.\n' +
              'They became the Apothicons. Thus the war began.\n' +
              'And in every cycle, the blood must be spilled again.\n\n' +
              'The one who reads these words will know:\n' +
              'the cycle can be broken. But the cost is everything."',
          },
          '.plan': {
            type: 'file',
            content:
              '1. Secure the Summoning Key\n' +
              '2. Acquire the blood vials\n' +
              '3. Kill the other Richtofens\n' +
              '4. Close the dimensional rift\n' +
              '5. ???\n' +
              '6. Accept that nothing I do will save them\n\n' +
              '...I am so tired of this cycle.',
          },
        },
      },
    },
  },
};

// ── FS helpers ──────────────────────────────────────────────

function getNode(pathArr: PathArr): FSNode | null {
  let node: FSNode = virtualFS['/'] as FSNode;
  for (const part of pathArr) {
    if (node.type !== 'dir' || !(part in node.children)) return null;
    node = node.children[part];
  }
  return node;
}

function getPathString(pathArr: PathArr): string {
  const path = pathArr.join('/');
  return `richtofen@GRP935:/${path ? path : ''}`;
}

// ── Zombies commands ────────────────────────────────────────

const PERK_JINGLES: Record<string, string[]> = {
  juggernog: [
    '♫ "When you need some help to get by..."',
    '♫ "Something to make you feel strong..."',
    '♫ "Reach for Juggernog tonight!" ♫',
    '',
    '  [JUGGERNOG] +100 HP. You feel invincible (you are not).',
  ],
  speedcola: [
    '♫ "Your hands are slow, your movement\'s sluggish..."',
    '♫ "Speed Cola speeds up your life!" ♫',
    '',
    '  [SPEED COLA] Reload speed x2. Terminal response: 1ms.',
  ],
  quickrevive: [
    '♫ "When everything\'s been dragging you down..."',
    '♫ "Grabs you by the hair, pulls you to the ground..."',
    '♫ "Quick Revive will bring you around!" ♫',
    '',
    '  [QUICK REVIVE] Solo: Self-revive active. You have 3.',
  ],
  doubletap: [
    '♫ "Cowboys can\'t shoot slow..."',
    '♫ "Or they\'ll end up below..."',
    '♫ "When they need some help, they reach for the drink they call..."',
    '♫ "Double Tap!" ♫',
    '',
    '  [DOUBLE TAP 2.0] Every bullet is now two bullets. Math.',
  ],
  staminup: [
    '♫ "Stamin-Up! Stamin-Up!" ♫',
    '',
    '  [STAMIN-UP] Sprint speed increased. Run like the wind.',
    '  (The wind does not have a zombie horde behind it.)',
  ],
  phdflopper: [
    '♫ "I fell off a building and I\'m fine..."',
    '♫ "PhD! PhD!" ♫',
    '',
    '  [PHD FLOPPER] No explosive damage. Dolphin dive = nuke.',
    '  Caution: Do not dolphin dive in the lab.',
  ],
  mule: [
    '♫ "Thrice the fun, thrice the guns..."',
    '♫ "Mule Kick!" ♫',
    '',
    '  [MULE KICK] Third weapon slot. Try not to forget which one.',
  ],
};

const MYSTERY_BOX_WEAPONS = [
  'Ray Gun',
  'Thundergun',
  'Wunderwaffe DG-2',
  'Monkey Bombs',
  'Galil',
  'Commando',
  'HAMR',
  'LSAT',
  'RPD',
  'Python',
  'Ballistic Knife',
  'Gersh Device',
  'Wave Gun',
  'Scavenger',
  'V-R11',
  'Blundergat',
  'Paralyzer',
  'Apothicon Servant',
  'G.K.Z-45 Mk 3',
  'Teddy Bear 🧸 — BOX MOVING!',
];

const ZOMBIE_QUOTES = [
  '"Fetch me their souls!" — Samantha Maxis',
  '"Dempsey, you fool! Stop shooting the crawlers!" — Richtofen',
  '"Nikolai has seen worse. ...Nikolai does not remember when." — Nikolai',
  '"The path of the warrior is paved with sacrifice." — Takeo',
  '"Carpenter! Finally, someone fixes something around here." — Dempsey',
  '"INSTA-KILL! Oh, how I love the feeling!" — Richtofen',
  '"I need vodka more than ammo. ...Maybe same amount." — Nikolai',
  '"The Emperor would not approve of these creatures." — Takeo',
  '"Ugh, I got the Teddy Bear AGAIN?!" — Every player ever',
  '"Max Ammo! But I just reloaded..." — Universal pain',
  '"GAME OVER, MAN! ...Wait, who has the most points?" — Dempsey',
  '"Do you know what the definition of insanity is? Doing the same Easter Egg and expecting it to be easier." — Richtofen',
  '"I will not go down without a fight! ...I went down." — Takeo',
];

const ROUND_ZOMBIE_COUNT = (round: number) => Math.round(0.08 * round * round + 2 * round + 8);

function processZombiesCommand(cmd: string, args: string[]): string[] | null {
  switch (cmd) {
    case 'perk': {
      const perkName = args[0]?.toLowerCase();
      if (!perkName) {
        return [
          'Usage: perk <name>',
          '',
          'Available perks:',
          '  juggernog, speedcola, quickrevive, doubletap,',
          '  staminup, phdflopper, mule',
        ];
      }
      const jingle = PERK_JINGLES[perkName];
      if (!jingle) return [`Unknown perk: "${args[0]}". Type "perk" to list perks.`];
      return jingle;
    }
    case 'box': {
      const weapon = MYSTERY_BOX_WEAPONS[Math.floor(Math.random() * MYSTERY_BOX_WEAPONS.length)];
      const cost = 950;
      const isTeddy = weapon.includes('Teddy Bear');
      return [
        `  [MYSTERY BOX] -${cost} points`,
        '  Spinning...',
        `  ▸ ${weapon}`,
        ...(isTeddy
          ? ['', '  *Samantha laughs maniacally*', '  The box vanishes in a beam of light...']
          : ['', `  Grabbed: ${weapon}. Good luck out there.`]),
      ];
    }
    case 'round': {
      const r = args[0] ? parseInt(args[0], 10) : null;
      if (!r || isNaN(r) || r < 1 || r > 255) {
        return ['Usage: round <1-255>'];
      }
      const count = ROUND_ZOMBIE_COUNT(r);
      const health = r <= 9 ? 150 + 100 * r : Math.round(150 * Math.pow(1.1, r));
      const speed = r >= 50 ? 'SPRINTING (all)' : r >= 10 ? 'Mixed run/sprint' : 'Mostly walkers';
      return [
        `  ═══ ROUND ${r} ═══`,
        `  Zombies:    ${count}`,
        `  HP each:    ${health.toLocaleString()}`,
        `  Movement:   ${speed}`,
        ...(r >= 100 ? ['', '  ⚠ You are insane. Good luck.'] : []),
        ...(r >= 200 ? ['  ⚠ Even Richtofen is concerned.'] : []),
      ];
    }
    case 'quote': {
      const q = ZOMBIE_QUOTES[Math.floor(Math.random() * ZOMBIE_QUOTES.length)];
      return [q];
    }
    case 'pack': {
      const weapon = args.join(' ');
      if (!weapon) return ['Usage: pack <weapon name>', '', 'Pack-a-Punch your weapon for 5000 points.'];
      const prefixes = ['Atomic', 'Armageddon', 'Doom', 'Infernal', 'Cosmic', 'Nightmare', 'Void'];
      const suffixes = ['of Destruction', 'MK IV', 'Decimator', 'Obliterator', 'XL', '9000', 'Omega'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      return [
        '  [PACK-A-PUNCH] -5000 points',
        '  *Electric sounds and dramatic lights*',
        `  ▸ ${weapon} → ${prefix} ${weapon} ${suffix}`,
        '  Damage: YES.',
      ];
    }
    case 'gobblegum': {
      const gums = [
        'Alchemical Antithesis — Every 10 points = 1 ammo',
        'Perkaholic — ALL PERKS. You feel like a god.',
        'Shopping Free — Everything is free for 60 seconds. RUN.',
        'Near Death Experience — Immortality (basically)',
        'Killing Time — All zombies freeze. Tea time.',
        'Round Robbin — Skip the round. No shame.',
        'Idle Eyes — Zombies ignore you. Finally, peace.',
        'Licensed Contractor — Rebuild barriers 2x faster. Thrilling.',
        'Sword Flay — Stronger melee. Knife goes BRRR.',
        'Danger Closest — Explosions tickle instead of kill.',
      ];
      const gum = gums[Math.floor(Math.random() * gums.length)];
      return [
        '  [DR. MONTY\'S GOBBLEGUM]',
        '  *Chews thoughtfully*',
        `  ▸ ${gum}`,
      ];
    }
    case 'revive': {
      const name = args[0] || 'Dempsey';
      return [
        `  Reviving ${name}...`,
        '  ████████████████████ 100%',
        `  ${name} is back up!`,
        `  "${name === 'Nikolai' ? 'Next time... bring vodka.' : 'I owe you one.'}"`,
      ];
    }
    case 'nuke': {
      return [
        '  ☢ N U K E ☢',
        '',
        '  *Blinding flash*',
        '  All zombies eliminated.',
        '  +400 points.',
        '',
        '  ...They\'ll be back.',
      ];
    }
    case 'powerup': {
      const powerups = [
        'MAX AMMO — Magazines full. Temporarily happy.',
        'INSTA-KILL — One hit kills for 30 seconds. RAMPAGE.',
        'DOUBLE POINTS — Cha-ching! x2 for 30 seconds.',
        'CARPENTER — All barriers rebuilt. Buys you 5 seconds.',
        'FIRE SALE — Mystery Box: 10 points everywhere. GO GO GO.',
        'DEATH MACHINE — Minigun time. BRRRRRRRT.',
        'BONFIRE SALE — Pack-a-Punch for 1000. Sprint.',
      ];
      const pu = powerups[Math.floor(Math.random() * powerups.length)];
      return [`  ▸ ${pu}`];
    }
    default:
      return null;
  }
}

// ── Help text ───────────────────────────────────────────────

const HELP_TEXT = [
  '═══════════════════════════════════════════',
  '  GROUP 935 TERMINAL — COMMAND REFERENCE',
  '═══════════════════════════════════════════',
  '',
  '  FILESYSTEM:',
  '    ls [-a]       List files (use -a for hidden)',
  '    cd <dir>      Change directory',
  '    cat <file>    Read file contents',
  '    clear         Clear terminal',
  '    exit          Close terminal',
  '',
  '  ZOMBIES:',
  '    perk [name]   Drink a perk (list: juggernog, speedcola, etc.)',
  '    box           Hit the Mystery Box',
  '    pack <weapon> Pack-a-Punch a weapon',
  '    round <1-255> Zombie count & stats for a round',
  '    gobblegum     Spin a random Gobblegum',
  '    quote         Random iconic zombies quote',
  '    revive [name] Revive a teammate',
  '    nuke          Tactical nuke. Kaboom.',
  '    powerup       Grab a random power-up',
  '',
  '  Type "help" anytime to see this again.',
  '═══════════════════════════════════════════',
];

// ── Terminal component ──────────────────────────────────────

interface LabTerminalProps {
  onClose: () => void;
}

export default function LabTerminal({ onClose }: LabTerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    '╔════════════════════════════════════════════╗',
    '   GROUP 935 — INTERNAL RESEARCH NETWORK ',
    '   Der Riese Facility · Node 7-Alpha     ',
    '   Clearance: UMBRA · Dr. E. Richtofen   ',
    '╚════════════════════════════════════════════╝',
    '',
    'Type "help" for available commands.',
  ]);
  const [cwd, setCwd] = useState<PathArr>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, []);
 
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        const args = input.split(/\s+/);
        if (args.length > 1) {
          const partial = args[args.length - 1];
          const node = getNode(cwd);
          if (node && node.type === 'dir') {
            const candidates = Object.keys(node.children).filter((n) =>
              n.startsWith(partial),
            );
            if (candidates.length === 1) {
              const newArgs = [...args];
              newArgs[newArgs.length - 1] = candidates[0];
              setInput(newArgs.join(' '));
            }
          }
        } else if (args.length === 1 && args[0].length > 0) {
          const commands = [
            'ls', 'cd', 'cat', 'help', 'clear',
            'perk', 'box', 'pack', 'round', 'gobblegum',
            'quote', 'revive', 'nuke', 'powerup',
          ];
          const partial = args[0];
          const candidates = commands.filter((c) => c.startsWith(partial));
          if (candidates.length === 1) {
            setInput(candidates[0] + ' ');
          }
        }
        return;
      }

      if (e.key !== 'Enter') return;

      const rawInput = input;
      const command = input.trim();
      const parts = command.split(/\s+/);
      const cmd = parts[0]?.toLowerCase() ?? '';
      const args = parts.slice(1);

      const newHistory = [...history, `${getPathString(cwd)} $ ${rawInput}`];

      // ── Filesystem commands ──
      const node = getNode(cwd);

      if (cmd === 'ls') {
        if (!node || node.type !== 'dir') {
          newHistory.push('Not a directory.');
        } else {
          const showAll = args.includes('-a');
          const files = Object.keys(node.children).filter(
            (name) => showAll || !name.startsWith('.'),
          );
          newHistory.push(files.join('  '));
        }
      } else if (cmd === 'cd') {
        if (!args[0]) {
          newHistory.push('Usage: cd <dir>');
        } else {
          const target = args[0].replace(/\/$/, '');
          if (target === '..' || target === '../') {
            if (cwd.length > 0) setCwd(cwd.slice(0, -1));
          } else if (target === '.') {
            // noop
          } else if (
            node &&
            node.type === 'dir' &&
            node.children[target] &&
            node.children[target].type === 'dir'
          ) {
            setCwd([...cwd, target]);
          } else {
            newHistory.push('No such directory.');
          }
        }
      } else if (cmd === 'cat') {
        if (!args[0]) {
          newHistory.push('Usage: cat <file>');
        } else if (
          node &&
          node.type === 'dir' &&
          node.children[args[0]] &&
          node.children[args[0]].type === 'file'
        ) {
          const content = (node.children[args[0]] as FileNode).content;
          newHistory.push(...content.split('\n'));
        } else {
          newHistory.push('No such file.');
        }
      } else if (cmd === 'help' || cmd === '?') {
        newHistory.push(...HELP_TEXT);
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd === 'exit' || cmd === 'quit') {
        onClose();
        return;
      } else if (cmd === '') {
        // empty enter
      } else {
        // ── Zombies commands ──
        const result = processZombiesCommand(cmd, args);
        if (result) {
          newHistory.push(...result);
        } else {
          newHistory.push(
            `'${command}' is not recognized as a Group 935 command.`,
            "Type 'help' for a list of commands.",
          );
        }
      }

      setHistory(newHistory);
      setInput('');
    },
    [input, history, cwd],
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.85)',
        cursor: 'default',
      }}
      onClick={(e) => {
        e.stopPropagation();
        inputRef.current?.focus();
      }}
    >
      {/* CRT overlay */}
      <div
        style={{
          width: '70%',
          maxWidth: 800,
          height: '70%',
          maxHeight: 560,
          background: '#0a0a08',
          border: '2px solid #1a3a1a',
          borderRadius: 6,
          boxShadow: '0 0 40px rgba(0, 255, 0, 0.08), inset 0 0 80px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Scanline effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Title bar */}
        <div
          style={{
            padding: '6px 12px',
            background: '#0d1a0d',
            borderBottom: '1px solid #1a3a1a',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            color: '#2a6a2a',
            letterSpacing: '0.15em',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <span>GROUP 935 TERMINAL — DER RIESE</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close terminal"
            style={{
              width: 22,
              height: 22,
              border: '1px solid #1a3a1a',
              borderRadius: 3,
              background: '#0a120a',
              color: '#4bd24b',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              lineHeight: 1,
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            X
          </button>
        </div>

        {/* Terminal body */}
        <div
          ref={terminalRef}
          style={{
            flex: 1,
            padding: '12px 16px',
            overflowY: 'auto',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            lineHeight: 1.6,
            color: '#33cc33',
            cursor: 'text',
          }}
          onClick={() => inputRef.current?.focus()}
        >
          <div style={{ marginBottom: 4 }}>
            {history.map((line, i) => (
              <div key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', minHeight: '1.2em' }}>
                {line}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 8, whiteSpace: 'nowrap', flexShrink: 0, color: '#22aa22' }}>
              {getPathString(cwd)} $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#33cc33',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                width: '100%',
                caretColor: '#33cc33',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
