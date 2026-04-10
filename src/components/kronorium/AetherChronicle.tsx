import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  CHRONICLE_ENTRIES,
  CHRONICLE_SECTIONS,
  CREW_META,
  type ChronicleEntry,
  type ChronicleSection,
  type Crew,
} from '../../data/aetherChronicle';

// ── Styles ──────────────────────────────────────────────────

const FONTS = {
  title: "'Cinzel', serif",
  mono: "'IBM Plex Mono', monospace",
  body: "'EB Garamond', serif",
};

const COLORS = {
  bg: '#0e0b07',
  surface: '#110e09',
  border: '#2e2416',
  borderFaint: '#1e1810',
  text: '#ede0c8',
  muted: '#7a6a50',
  dim: '#4a3a22',
  faint: '#2e2416',
  gold: '#c9a24a',
};

// ── Section nav pill ────────────────────────────────────────

function SectionNav({
  active,
  onSelect,
}: {
  active: ChronicleSection | 'all';
  onSelect: (s: ChronicleSection | 'all') => void;
}) {
  const items: { value: ChronicleSection | 'all'; label: string }[] = [
    { value: 'all', label: 'All Sections' },
    ...CHRONICLE_SECTIONS.map(s => ({ value: s.id, label: s.label })),
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {items.map(item => (
        <button
          key={item.value}
          onClick={() => onSelect(item.value)}
          style={{
            background: active === item.value ? COLORS.gold + '18' : 'transparent',
            border: `1px solid ${active === item.value ? COLORS.gold : COLORS.border}`,
            color: active === item.value ? COLORS.gold : COLORS.dim,
            padding: '6px 12px',
            fontFamily: FONTS.mono,
            fontSize: 9,
            letterSpacing: '0.1em',
            cursor: 'pointer',
            textAlign: 'left',
            textTransform: 'uppercase',
            transition: 'all 0.15s',
            width: '100%',
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

// ── Crew filter pills ───────────────────────────────────────

function CrewFilter({
  active,
  onSelect,
}: {
  active: Crew | 'all';
  onSelect: (c: Crew | 'all') => void;
}) {
  const items: { value: Crew | 'all'; label: string; color: string }[] = [
    { value: 'all', label: 'All', color: COLORS.text },
    { value: 'ultimis', label: 'Ultimis', color: CREW_META.ultimis.color },
    { value: 'primis', label: 'Primis', color: CREW_META.primis.color },
    { value: 'victis', label: 'Victis', color: CREW_META.victis.color },
  ];

  return (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {items.map(item => (
        <button
          key={item.value}
          onClick={() => onSelect(item.value)}
          style={{
            background: active === item.value ? item.color + '18' : 'transparent',
            border: `1px solid ${active === item.value ? item.color : COLORS.border}`,
            color: active === item.value ? item.color : COLORS.dim,
            padding: '4px 10px',
            fontFamily: FONTS.mono,
            fontSize: 8,
            letterSpacing: '0.12em',
            cursor: 'pointer',
            textTransform: 'uppercase',
            transition: 'all 0.15s',
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

// ── Search bar ──────────────────────────────────────────────

function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search timeline..."
      style={{
        width: '100%',
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        color: COLORS.text,
        padding: '7px 10px',
        fontFamily: FONTS.mono,
        fontSize: 10,
        letterSpacing: '0.06em',
        outline: 'none',
        boxSizing: 'border-box',
      }}
    />
  );
}

// ── Timeline entry card ─────────────────────────────────────

function EntryCard({
  entry,
  expanded,
  onToggle,
}: {
  entry: ChronicleEntry;
  expanded: boolean;
  onToggle: () => void;
}) {
  const crewColor = CREW_META[entry.crew].color;
  const crewLabel = CREW_META[entry.crew].label;

  return (
    <div
      onClick={onToggle}
      style={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {/* Card */}
      <div
        style={{
          background: expanded ? '#1a1510' : COLORS.surface,
          border: `1px solid ${expanded ? crewColor + '50' : COLORS.borderFaint}`,
          borderLeft: `2px solid ${crewColor}`,
          padding: '10px 14px',
          transition: 'all 0.15s',
          boxShadow: expanded
            ? `0 0 0 1px ${crewColor}20, 0 4px 16px #00000060`
            : '0 1px 4px #00000030',
        }}
      >
        {/* Date row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: entry.title ? 4 : 6,
          }}
        >
          <span
            style={{
              fontSize: 9,
              color: COLORS.muted,
              fontFamily: FONTS.mono,
              letterSpacing: '0.06em',
              flex: 1,
            }}
          >
            {entry.date}
          </span>
          {crewLabel && (
            <span
              style={{
                fontSize: 7,
                color: crewColor,
                fontFamily: FONTS.mono,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                opacity: 0.8,
              }}
            >
              {crewLabel}
            </span>
          )}
        </div>

        {/* Title */}
        {entry.title && (
          <div
            style={{
              fontSize: 13,
              color: COLORS.text,
              fontFamily: FONTS.title,
              fontWeight: 600,
              lineHeight: 1.3,
              marginBottom: 6,
            }}
          >
            {entry.title}
          </div>
        )}

        {/* Description */}
        <div
          style={{
            fontSize: expanded ? 13.5 : 12,
            color: expanded ? '#c8b48e' : COLORS.muted,
            fontFamily: expanded ? FONTS.body : FONTS.body,
            lineHeight: expanded ? 1.65 : 1.5,
            overflow: expanded ? 'visible' : 'hidden',
            display: expanded ? 'block' : '-webkit-box',
            WebkitLineClamp: expanded ? undefined : 2,
            WebkitBoxOrient: expanded ? undefined : ('vertical' as any),
          }}
        >
          {entry.description}
        </div>

        {/* Source */}
        {expanded && entry.source && (
          <div
            style={{
              marginTop: 10,
              fontSize: 8,
              color: COLORS.dim,
              fontFamily: FONTS.mono,
              letterSpacing: '0.06em',
              fontStyle: 'italic',
            }}
          >
            Source: {entry.source}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Section header ──────────────────────────────────────────

function SectionHeader({ label, subtitle }: { label: string; subtitle?: string }) {
  return (
    <div style={{ padding: '24px 0 12px', position: 'relative' }}>
      {subtitle && (
        <div
          style={{
            fontSize: 7,
            color: COLORS.dim,
            fontFamily: FONTS.mono,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          {subtitle}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: COLORS.gold,
            fontFamily: FONTS.title,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: COLORS.gold + '25',
          }}
        />
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────

export default function AetherChronicle() {
  const [sectionFilter, setSectionFilter] = useState<ChronicleSection | 'all'>('all');
  const [crewFilter, setCrewFilter] = useState<Crew | 'all'>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let entries = CHRONICLE_ENTRIES;

    if (sectionFilter !== 'all') {
      entries = entries.filter(e => e.section === sectionFilter);
    }
    if (crewFilter !== 'all') {
      entries = entries.filter(e => e.crew === crewFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      entries = entries.filter(
        e =>
          e.description.toLowerCase().includes(q) ||
          (e.title?.toLowerCase().includes(q) ?? false) ||
          e.date.toLowerCase().includes(q) ||
          (e.source?.toLowerCase().includes(q) ?? false)
      );
    }

    return entries;
  }, [sectionFilter, crewFilter, search]);

  // Group entries by section for display
  const grouped = useMemo(() => {
    const groups: { section: (typeof CHRONICLE_SECTIONS)[number]; entries: ChronicleEntry[] }[] = [];
    const sectionOrder = CHRONICLE_SECTIONS.map(s => s.id);

    if (sectionFilter !== 'all') {
      const sec = CHRONICLE_SECTIONS.find(s => s.id === sectionFilter)!;
      groups.push({ section: sec, entries: filtered });
    } else {
      for (const sec of CHRONICLE_SECTIONS) {
        const sectionEntries = filtered.filter(e => e.section === sec.id);
        if (sectionEntries.length > 0) {
          groups.push({ section: sec, entries: sectionEntries });
        }
      }
    }

    return groups;
  }, [filtered, sectionFilter]);

  const handleToggle = useCallback((id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  }, []);

  // Scroll to top when filters change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [sectionFilter, crewFilter, search]);

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'sans-serif' }}>
      {/* ── Left panel ── */}
      <div
        style={{
          width: 260,
          flexShrink: 0,
          background: COLORS.surface,
          borderRight: `1px solid ${COLORS.border}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Search */}
        <div style={{ padding: '16px 16px 12px', borderBottom: `1px solid ${COLORS.border}` }}>
          <div
            style={{
              fontSize: 8,
              color: COLORS.dim,
              letterSpacing: '0.22em',
              fontFamily: FONTS.mono,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Search
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Crew filter */}
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${COLORS.border}` }}>
          <div
            style={{
              fontSize: 8,
              color: COLORS.dim,
              letterSpacing: '0.22em',
              fontFamily: FONTS.mono,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Filter by Crew
          </div>
          <CrewFilter active={crewFilter} onSelect={setCrewFilter} />
        </div>

        {/* Section filter */}
        <div style={{ padding: '12px 16px', flex: 1, overflowY: 'auto' }}>
          <div
            style={{
              fontSize: 8,
              color: COLORS.dim,
              letterSpacing: '0.22em',
              fontFamily: FONTS.mono,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Section
          </div>
          <SectionNav active={sectionFilter} onSelect={setSectionFilter} />
        </div>

        {/* Stats */}
        <div
          style={{
            padding: '12px 16px',
            borderTop: `1px solid ${COLORS.border}`,
            fontSize: 9,
            color: COLORS.dim,
            fontFamily: FONTS.mono,
            letterSpacing: '0.06em',
          }}
        >
          {filtered.length} / {CHRONICLE_ENTRIES.length} entries
        </div>
      </div>

      {/* ── Timeline content ── */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          background: COLORS.bg,
          position: 'relative',
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: '8px 32px 80px',
            position: 'relative',
          }}
        >
          {/* Vertical center line */}
          <div
            style={{
              position: 'absolute',
              left: 16,
              top: 0,
              bottom: 0,
              width: 1,
              background: COLORS.border,
            }}
          />

          {grouped.map(group => (
            <div key={group.section.id}>
              <SectionHeader label={group.section.label} subtitle={group.section.subtitle} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {group.entries.map(entry => (
                  <div key={entry.id} style={{ position: 'relative', paddingLeft: 20 }}>
                    {/* Dot on the timeline line */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 12,
                        top: 14,
                        width: 9,
                        height: 9,
                        borderRadius: '50%',
                        background: entry.title ? CREW_META[entry.crew].color : COLORS.border,
                        border: `2px solid ${COLORS.bg}`,
                        zIndex: 1,
                      }}
                    />
                    <EntryCard
                      entry={entry}
                      expanded={expandedId === entry.id}
                      onToggle={() => handleToggle(entry.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: COLORS.dim,
                fontFamily: FONTS.mono,
                fontSize: 11,
                letterSpacing: '0.1em',
              }}
            >
              No entries match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
