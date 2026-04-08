import React from 'react';
import type { LabDocument, DocTemplate } from '../../data/labDocuments';

interface Props {
  doc: LabDocument;
  onClose: () => void;
  found: number;
  total: number;
}

export default function DocumentViewer({ doc, onClose, found, total }: Props) {
  const variant = React.useMemo(() => getDocVariant(doc), [doc.id, doc.template]);

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.shell} onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button style={styles.closeBtn} onClick={onClose} title="Close">
          ×
        </button>

        {/* Found counter */}
        <div style={styles.counter}>
          {found} / {total} DOCUMENTS FOUND
        </div>

        {/* Document card */}
        <div style={{ ...styles.paper, ...templateBg(doc.template), ...variant.paper }}>
          {/* Burned corners overlay */}
          <div style={{ ...styles.burns, ...variant.burns }} />

          {/* Stamp */}
          {doc.stamp && <div style={{ ...styles.stamp, ...variant.stamp }}>{doc.stamp}</div>}

          {/* Template content */}
          {doc.template === 'autopsy' && <AutopsyLayout doc={doc} />}
          {doc.template === 'blueprint' && <BlueprintLayout doc={doc} />}
          {doc.template === 'field-ops' && <FieldOpsLayout doc={doc} />}
          {doc.template === 'dossier' && <DossierLayout doc={doc} />}
          {doc.template === 'research' && <ResearchLayout doc={doc} />}

          {/* Margin notes */}
          {doc.marginNotes && doc.marginNotes.length > 0 && (
            <div style={{ ...styles.marginNotes, ...variant.marginNotes }}>
              {doc.marginNotes.map((note, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.marginNote,
                    ...variant.marginNote,
                    transform: `rotate(${marginNoteTilt(doc.id, i)}deg)`,
                  }}
                >
                  {note}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Template layouts ─────────────────────────────────────────

function AutopsyLayout({ doc }: { doc: LabDocument }) {
  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={styles.autopsyChrome}>
        <div style={styles.autopsyTag}>MEDICAL EXAMINATION FORM</div>
        <div style={styles.autopsyPunchRow}>
          <span style={styles.autopsyPunch} />
          <span style={styles.autopsyPunch} />
          <span style={styles.autopsyPunch} />
        </div>
      </div>
      <div style={styles.formHeader}>
        <span style={styles.formLabel}>Examiner: <em style={styles.handField}>{doc.examiner}</em></span>
        <span style={styles.formLabel}>Species: <em style={styles.handField}>{doc.species}</em></span>
      </div>
      <div style={styles.formHeader}>
        <span style={styles.formLabel}>Date: <em style={styles.handField}>{doc.date}</em></span>
        <span style={styles.formLabel}>Identification: <em style={styles.handField}>{doc.subject}</em></span>
      </div>
      <div style={styles.divider} />
      <p style={styles.handBody}>{doc.body}</p>
    </div>
  );
}

function BlueprintLayout({ doc }: { doc: LabDocument }) {
  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={styles.bpTitle}>{doc.title}</div>
      <div style={styles.bpMeta}>
        {doc.designer && <span>CONCEPT BY: {doc.designer.toUpperCase()}</span>}
        {doc.fileNo && <span style={{ marginLeft: 20 }}>{doc.fileNo}</span>}
      </div>
      <div style={styles.divider} />
      <p style={styles.bpBody}>{doc.body}</p>
      {doc.designer && (
        <div style={styles.bpSig}>— {doc.designer}</div>
      )}
    </div>
  );
}

function FieldOpsLayout({ doc }: { doc: LabDocument }) {
  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={styles.opsCarbonStrip}>CARBON COPY // ARCHIVE CHANNEL</div>
      <div style={styles.opsHeader}>GROUP 935 FIELD OPERATIONS MANUAL</div>
      <div style={styles.opsFileNo}>
        File #{doc.fileNo} ({doc.date})
      </div>
      <div style={styles.opsPunchLeft} />
      <div style={styles.opsPunchRight} />
      <div style={styles.divider} />
      <p style={styles.serifBody}>{doc.body}</p>
    </div>
  );
}

function DossierLayout({ doc }: { doc: LabDocument }) {
  const redactSeed = hashString(doc.id);
  const redactionA = 18 + (redactSeed % 26);
  const redactionB = 52 + (redactSeed % 18);

  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ ...styles.redactionBar, top: `${redactionA}%`, width: '62%' }} />
      <div style={{ ...styles.redactionBar, top: `${redactionB}%`, width: '48%', left: '44%' }} />
      <div style={styles.dosTitle}>{doc.title}</div>
      <div style={styles.dosFields}>
        {doc.species && <div style={styles.formLabel}>Type: <em style={styles.handField}>{doc.species}</em></div>}
        {doc.active && <div style={styles.formLabel}>Active: <em style={styles.handField}>{doc.active}</em></div>}
      </div>
      <div style={styles.divider} />
      <p style={styles.serifBody}>{doc.body}</p>
    </div>
  );
}

function ResearchLayout({ doc }: { doc: LabDocument }) {
  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      {doc.fileNo && <div style={styles.resFileNo}>{doc.fileNo}</div>}
      {doc.date && <div style={styles.resDate}>{doc.date}</div>}
      <div style={styles.divider} />
      <p style={styles.handBody}>{doc.body}</p>
    </div>
  );
}

// ── Template background helpers ──────────────────────────────

interface DocVariant {
  paper: React.CSSProperties;
  burns?: React.CSSProperties;
  stamp?: React.CSSProperties;
  marginNotes?: React.CSSProperties;
  marginNote?: React.CSSProperties;
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function marginNoteTilt(id: string, index: number): number {
  const hash = hashString(`${id}-${index}`);
  return ((hash % 36) - 18) / 10;
}

function getDocVariant(doc: LabDocument): DocVariant {
  const key = hashString(doc.id);

  if (doc.template === 'blueprint') {
    const blueprintVariants: DocVariant[] = [
      {
        paper: {
          boxShadow: '0 10px 42px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(130, 170, 220, 0.2)',
          transform: 'rotate(-0.35deg)',
        },
        stamp: {
          color: 'rgba(196, 84, 56, 0.24)',
          border: '3px solid rgba(196, 84, 56, 0.2)',
          transform: 'translate(-50%, -50%) rotate(-10deg)',
        },
      },
      {
        paper: {
          boxShadow: '0 12px 46px rgba(0, 0, 0, 0.58), inset 0 0 0 1px rgba(90, 130, 180, 0.22)',
          transform: 'rotate(0.4deg)',
        },
        stamp: {
          color: 'rgba(180, 66, 66, 0.23)',
          border: '3px solid rgba(180, 66, 66, 0.18)',
          transform: 'translate(-50%, -50%) rotate(-22deg)',
        },
      },
    ];

    return blueprintVariants[key % blueprintVariants.length];
  }

  const paperVariants: DocVariant[] = [
    {
      paper: {
        background: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.62' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E"),
          linear-gradient(155deg, #d8c9a5 0%, #cdb78f 45%, #b59f73 100%)
        `,
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(90, 65, 35, 0.18)',
        transform: 'rotate(-0.25deg)',
      },
      stamp: {
        color: 'rgba(155, 28, 28, 0.28)',
        border: '3px solid rgba(155, 28, 28, 0.22)',
      },
    },
    {
      paper: {
        background: `
          linear-gradient(rgba(110, 80, 30, 0.08) 1px, transparent 1px),
          linear-gradient(170deg, #e1d6b6 0%, #d3c19b 48%, #bfa781 100%)
        `,
        backgroundSize: '100% 26px, 100% 100%',
        boxShadow: '0 10px 44px rgba(0,0,0,0.48), inset 0 0 0 1px rgba(110, 80, 40, 0.2)',
        transform: 'rotate(0.5deg)',
      },
      burns: {
        background: `
          radial-gradient(ellipse at 0% 0%, rgba(55,22,8,0.5) 0%, transparent 32%),
          radial-gradient(ellipse at 100% 100%, rgba(55,22,8,0.55) 0%, transparent 34%),
          radial-gradient(circle at 72% 28%, rgba(145, 92, 40, 0.16) 0%, transparent 11%)
        `,
      },
      stamp: {
        color: 'rgba(118, 36, 20, 0.3)',
        border: '2px solid rgba(118, 36, 20, 0.25)',
        transform: 'translate(-50%, -50%) rotate(-11deg)',
      },
      marginNote: {
        color: '#684521',
      },
    },
    {
      paper: {
        background: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cg fill='none' stroke='%2366461f' stroke-opacity='0.08' stroke-width='1'%3E%3Cpath d='M0 8h120M0 40h120M0 72h120M0 104h120'/%3E%3C/g%3E%3C/svg%3E"),
          linear-gradient(140deg, #d1be97 0%, #c4ae86 52%, #b49a72 100%)
        `,
        boxShadow: '0 9px 38px rgba(0,0,0,0.53), inset 0 0 0 1px rgba(96, 64, 28, 0.22)',
        transform: 'rotate(-0.6deg)',
      },
      burns: {
        opacity: 0.82,
      },
      stamp: {
        color: 'rgba(96, 96, 24, 0.28)',
        border: '3px double rgba(96, 96, 24, 0.23)',
        transform: 'translate(-50%, -50%) rotate(-16deg)',
      },
      marginNotes: {
        borderTop: '1px dashed rgba(95, 65, 30, 0.4)',
      },
      marginNote: {
        fontSize: 16,
        opacity: 0.8,
      },
    },
    {
      paper: {
        background: `
          radial-gradient(circle at 18% 12%, rgba(255, 245, 220, 0.25) 0%, transparent 30%),
          radial-gradient(circle at 86% 85%, rgba(95, 55, 20, 0.12) 0%, transparent 34%),
          linear-gradient(165deg, #ccb58b 0%, #bea178 50%, #aa8a63 100%)
        `,
        boxShadow: '0 11px 46px rgba(0,0,0,0.56), inset 0 0 0 1px rgba(85, 58, 32, 0.2)',
        transform: 'rotate(0.2deg)',
      },
      burns: {
        background: `
          radial-gradient(ellipse at 0% 100%, rgba(42,20,8,0.72) 0%, transparent 40%),
          radial-gradient(ellipse at 100% 0%, rgba(42,20,8,0.65) 0%, transparent 34%),
          radial-gradient(circle at 35% 18%, rgba(150, 96, 42, 0.16) 0%, transparent 10%)
        `,
      },
      stamp: {
        color: 'rgba(142, 24, 44, 0.27)',
        border: '3px solid rgba(142, 24, 44, 0.2)',
        transform: 'translate(-50%, -50%) rotate(-24deg)',
      },
      marginNote: {
        color: '#603d18',
      },
    },
  ];

  return paperVariants[key % paperVariants.length];
}

function templateBg(t: DocTemplate): React.CSSProperties {
  if (t === 'blueprint') {
    return {
      background: `
        linear-gradient(rgba(20, 50, 80, 0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(20, 50, 80, 0.06) 1px, transparent 1px),
        linear-gradient(145deg, #1a3050 0%, #142840 40%, #0e1e30 100%)
      `,
      backgroundSize: '20px 20px, 20px 20px, 100% 100%',
      color: '#a0c4e0',
    };
  }
  return {};
}

// ── Styles ───────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
    cursor: 'pointer',
    animation: 'fadeIn 0.3s ease-out',
  },
  shell: {
    position: 'relative',
    maxWidth: 620,
    width: '90vw',
    maxHeight: '85vh',
    cursor: 'default',
  },
  closeBtn: {
    position: 'absolute',
    top: -36,
    right: 0,
    background: 'none',
    border: 'none',
    color: '#7a6a50',
    fontSize: 28,
    cursor: 'pointer',
    fontFamily: 'sans-serif',
    zIndex: 10,
  },
  counter: {
    position: 'absolute',
    top: -36,
    left: 0,
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 9,
    letterSpacing: '0.2em',
    color: '#4a3a22',
  },
  paper: {
    position: 'relative',
    background: `
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E"),
      linear-gradient(160deg, #d4c4a0 0%, #c8b48e 50%, #baa478 100%)
    `,
    color: '#2a1e0e',
    padding: '40px 44px',
    overflow: 'hidden',
    overflowX: 'hidden',
    overflowY: 'hidden',
    maxHeight: '80vh',
    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
  },
  burns: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 1,
    background: `
      radial-gradient(ellipse at 0% 0%, rgba(40,20,5,0.7) 0%, transparent 35%),
      radial-gradient(ellipse at 100% 0%, rgba(40,20,5,0.6) 0%, transparent 30%),
      radial-gradient(ellipse at 0% 100%, rgba(40,20,5,0.7) 0%, transparent 38%),
      radial-gradient(ellipse at 100% 100%, rgba(40,20,5,0.65) 0%, transparent 32%),
      radial-gradient(circle at 25% 30%, rgba(120,80,20,0.2) 0%, rgba(120,80,20,0.15) 6%, transparent 7%, transparent 10%, rgba(100,65,15,0.08) 11%, transparent 15%)
    `,
  },
  stamp: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-18deg)',
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 700,
    fontSize: 52,
    letterSpacing: '0.3em',
    color: 'rgba(155, 28, 28, 0.28)',
    border: '3px solid rgba(155, 28, 28, 0.22)',
    padding: '4px 20px',
    pointerEvents: 'none',
    zIndex: 5,
    whiteSpace: 'nowrap',
  },
  marginNotes: {
    position: 'relative',
    zIndex: 2,
    marginTop: 28,
    paddingTop: 16,
    borderTop: '1px solid rgba(100, 70, 30, 0.25)',
  },
  marginNote: {
    fontFamily: "'Caveat', cursive",
    fontSize: 17,
    color: '#5a3a18',
    lineHeight: 1.5,
    marginBottom: 6,
    opacity: 0.85,
  },

  // Shared
  divider: {
    height: 1,
    background: 'rgba(100, 70, 30, 0.3)',
    margin: '14px 0 18px',
  },

  // Form fields (autopsy, dossier)
  autopsyChrome: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 6,
    borderBottom: '1px dashed rgba(92, 58, 26, 0.45)',
  },
  autopsyTag: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.14em',
    color: '#5d4423',
  },
  autopsyPunchRow: {
    display: 'flex',
    gap: 6,
  },
  autopsyPunch: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'rgba(66, 46, 24, 0.3)',
    boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.35)',
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 8,
    flexWrap: 'wrap' as const,
  },
  formLabel: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11,
    color: '#4a3520',
    letterSpacing: '0.05em',
  },
  handField: {
    fontFamily: "'Caveat', cursive",
    fontSize: 17,
    fontStyle: 'normal',
    color: '#2a1e0e',
  },

  // Body text
  handBody: {
    fontFamily: "'Caveat', cursive",
    fontSize: 19,
    lineHeight: 1.55,
    color: '#2a1e0e',
    margin: 0,
    position: 'relative' as const,
    zIndex: 2,
  },
  serifBody: {
    fontFamily: "'EB Garamond', serif",
    fontSize: 15,
    lineHeight: 1.7,
    color: '#2a1e0e',
    margin: 0,
    position: 'relative' as const,
    zIndex: 2,
  },

  // Blueprint-specific
  bpTitle: {
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 700,
    fontSize: 26,
    letterSpacing: '0.08em',
    color: '#c0d8f0',
    textTransform: 'uppercase' as const,
    marginBottom: 4,
    position: 'relative' as const,
    zIndex: 2,
  },
  bpMeta: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 9,
    letterSpacing: '0.12em',
    color: '#6a90b0',
    marginBottom: 8,
    position: 'relative' as const,
    zIndex: 2,
  },
  bpBody: {
    fontFamily: "'Caveat', cursive",
    fontSize: 17,
    lineHeight: 1.55,
    color: '#90b8d8',
    margin: 0,
    position: 'relative' as const,
    zIndex: 2,
  },
  bpSig: {
    fontFamily: "'Caveat', cursive",
    fontSize: 22,
    color: '#90b8d8',
    textAlign: 'right' as const,
    marginTop: 20,
    opacity: 0.7,
    position: 'relative' as const,
    zIndex: 2,
  },

  // Field-ops specific
  opsHeader: {
    fontFamily: "'Cinzel', serif",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: '0.15em',
    color: '#3a2a14',
    textAlign: 'center' as const,
    marginBottom: 6,
    position: 'relative' as const,
    zIndex: 2,
  },
  opsCarbonStrip: {
    display: 'inline-block',
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 9,
    letterSpacing: '0.14em',
    color: '#5f4322',
    border: '1px solid rgba(80, 56, 28, 0.35)',
    padding: '2px 8px',
    marginBottom: 10,
    background: 'rgba(90, 62, 28, 0.08)',
    position: 'relative' as const,
    zIndex: 2,
  },
  opsFileNo: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11,
    color: '#5a4020',
    textAlign: 'center' as const,
    marginBottom: 4,
    position: 'relative' as const,
    zIndex: 2,
  },
  opsPunchLeft: {
    position: 'absolute' as const,
    left: -26,
    top: 60,
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: 'rgba(58, 40, 18, 0.34)',
    boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.35)',
    zIndex: 2,
  },
  opsPunchRight: {
    position: 'absolute' as const,
    right: -26,
    top: 60,
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: 'rgba(58, 40, 18, 0.34)',
    boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.35)',
    zIndex: 2,
  },

  // Dossier specific
  dosTitle: {
    fontFamily: "'Cinzel', serif",
    fontWeight: 700,
    fontSize: 22,
    color: '#2a1e0e',
    marginBottom: 10,
    position: 'relative' as const,
    zIndex: 2,
  },
  redactionBar: {
    position: 'absolute' as const,
    left: 0,
    height: 9,
    background: 'rgba(20, 20, 20, 0.28)',
    borderRadius: 2,
    transform: 'rotate(-0.6deg)',
    zIndex: 3,
    pointerEvents: 'none' as const,
  },
  dosFields: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
    marginBottom: 4,
    position: 'relative' as const,
    zIndex: 2,
  },

  // Research specific
  resFileNo: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 10,
    color: '#5a4020',
    letterSpacing: '0.15em',
    marginBottom: 4,
    position: 'relative' as const,
    zIndex: 2,
  },
  resDate: {
    fontFamily: "'Caveat', cursive",
    fontSize: 16,
    color: '#4a3520',
    marginBottom: 4,
    position: 'relative' as const,
    zIndex: 2,
  },
};
