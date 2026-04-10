import React, { useEffect, useRef } from 'react';
import type { MapLoreEntry, StoryImpact } from '../../data/mapLore';

// ── Impact badge colours ─────────────────────────────────────
const IMPACT_COLOUR: Record<StoryImpact, string> = {
  Low:      '#5a7a5a',
  Medium:   '#7a7a3a',
  High:     '#c9a24a',
  Critical: '#cc4444',
};

interface Props {
  entry: MapLoreEntry;
  onClose: () => void;
}

export default function MapLoreModal({ entry, onClose }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);

  /* close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  /* close on backdrop click */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  const impactColor = IMPACT_COLOUR[entry.header.storyImpact];

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(5,4,2,0.88)',
        backdropFilter: 'blur(6px)',
        animation: 'loreFadeIn 0.2s ease-out',
      }}
    >
      <style>{`
        @keyframes loreFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes loreSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lore-modal::-webkit-scrollbar { width: 6px; }
        .lore-modal::-webkit-scrollbar-track { background: transparent; }
        .lore-modal::-webkit-scrollbar-thumb { background: #2e2416; border-radius: 3px; }
        .lore-modal::-webkit-scrollbar-thumb:hover { background: #4a3a22; }
      `}</style>

      <div
        className="lore-modal"
        style={{
          width: 'min(720px, 92vw)',
          maxHeight: '88vh',
          overflowY: 'auto',
          background: '#110e09',
          border: '1px solid #2e2416',
          borderTop: '2px solid #c9a24a',
          borderRadius: 3,
          padding: 0,
          animation: 'loreSlideUp 0.25s ease-out',
          boxShadow: '0 12px 60px rgba(0,0,0,0.7)',
        }}
      >
        {/* ── Close button ── */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'sticky',
            top: 0,
            float: 'right',
            zIndex: 10,
            margin: '12px 14px 0 0',
            background: '#17130d',
            border: '1px solid #2e2416',
            color: '#7a6a50',
            width: 30,
            height: 30,
            fontSize: 16,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
          }}
        >
          ✕
        </button>

        <div style={{ padding: '28px 36px 36px' }}>

          {/* ══════════════════════════════════════════════════
              SECTION 1 — HEADER / OVERVIEW
             ══════════════════════════════════════════════════ */}
          <div
            style={{
              fontSize: 8,
              color: '#c9a24a',
              letterSpacing: '0.22em',
              fontFamily: "'IBM Plex Mono', monospace",
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Intelligence Dossier
          </div>

          <h1
            style={{
              fontSize: 26,
              color: '#ede0c8',
              fontFamily: "'Cinzel', serif",
              fontWeight: 700,
              lineHeight: 1.2,
              margin: '0 0 20px',
              letterSpacing: '0.04em',
            }}
          >
            {entry.title}
          </h1>

          {/* Header grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px 28px',
              padding: '16px 20px',
              background: '#17130d',
              border: '1px solid #2e2416',
              borderRadius: 2,
              marginBottom: 28,
            }}
          >
            {/* Setting */}
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={labelStyle}>Setting</div>
              <div style={valueStyle}>{entry.header.setting}</div>
            </div>

            {/* Crew */}
            <div>
              <div style={labelStyle}>Crew</div>
              <div style={valueStyle}>
                {entry.header.crew.map((c, i) => (
                  <div key={i} style={{ marginBottom: 2 }}>• {c}</div>
                ))}
              </div>
            </div>

            {/* Zombie Controller */}
            <div>
              <div style={labelStyle}>Zombie Controller</div>
              <div style={valueStyle}>{entry.header.zombieController}</div>
            </div>

            {/* Story Impact */}
            <div>
              <div style={labelStyle}>Story Impact</div>
              <div
                style={{
                  display: 'inline-block',
                  fontSize: 10,
                  fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: impactColor,
                  border: `1px solid ${impactColor}50`,
                  padding: '3px 10px',
                  marginTop: 4,
                  borderRadius: 2,
                }}
              >
                {entry.header.storyImpact}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              SECTION 2 — PRELUDE (Before)
             ══════════════════════════════════════════════════ */}
          <SectionBlock
            number="II"
            title="Prelude"
            subtitle="What led to this map"
            subsections={entry.prelude}
          />

          {/* ══════════════════════════════════════════════════
              SECTION 3 — THE QUEST (During)
             ══════════════════════════════════════════════════ */}
          <SectionBlock
            number="III"
            title="The Quest"
            subtitle="What happens during gameplay"
            subsections={entry.quest}
          />

          {/* ══════════════════════════════════════════════════
              SECTION 4 — AFTERMATH (After)
             ══════════════════════════════════════════════════ */}
          <SectionBlock
            number="IV"
            title="Aftermath"
            subtitle="Impact on the overall story"
            subsections={entry.aftermath}
          />
        </div>
      </div>
    </div>
  );
}

// ── Shared styles ────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontSize: 8,
  color: '#7a6a50',
  letterSpacing: '0.16em',
  fontFamily: "'IBM Plex Mono', monospace",
  textTransform: 'uppercase',
  marginBottom: 4,
};

const valueStyle: React.CSSProperties = {
  fontSize: 13,
  color: '#c8b48e',
  fontFamily: "'EB Garamond', serif",
  lineHeight: 1.55,
};

// ── Section Block ────────────────────────────────────────────

function SectionBlock({
  number,
  title,
  subtitle,
  subsections,
}: {
  number: string;
  title: string;
  subtitle: string;
  subsections: { heading: string; text: string }[];
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
        <span
          style={{
            fontSize: 10,
            color: '#c9a24a60',
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: '0.08em',
          }}
        >
          {number}
        </span>
        <span
          style={{
            fontSize: 16,
            color: '#ede0c8',
            fontFamily: "'Cinzel', serif",
            fontWeight: 600,
            letterSpacing: '0.06em',
          }}
        >
          {title}
        </span>
      </div>
      <div
        style={{
          fontSize: 9,
          color: '#4a3a22',
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 14,
        }}
      >
        {subtitle}
      </div>

      <div style={{ height: 1, background: '#c9a24a18', marginBottom: 16 }} />

      {/* Subsections */}
      {subsections.map((sub, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 11,
              color: '#c9a24a',
              fontFamily: "'Cinzel', serif",
              fontWeight: 600,
              letterSpacing: '0.04em',
              marginBottom: 6,
            }}
          >
            {sub.heading}
          </div>
          <div
            style={{
              fontSize: 14,
              color: '#c8b48e',
              fontFamily: "'EB Garamond', serif",
              lineHeight: 1.7,
            }}
          >
            {sub.text}
          </div>
        </div>
      ))}
    </div>
  );
}
