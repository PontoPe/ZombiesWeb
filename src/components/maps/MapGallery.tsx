import { useState, useMemo } from 'react';
import type { GameId, CrewGroup, MapData } from '../../data/maps';
import { MAPS, GAMES, CREW_GROUPS } from '../../data/maps';
import MapCard from './MapCard';

const GAME_ORDER: GameId[] = ['waw', 'bo1', 'bo2', 'bo3', 'bo4'];

type SortBy = 'release' | 'alpha' | 'rating' | 'setup' | 'quest';

const SORT_LABELS: Record<SortBy, string> = {
  release: 'DATE',
  alpha:   'A–Z',
  rating:  'RATING',
  setup:   'SETUP',
  quest:   'QUEST',
};

interface Filters {
  games: GameId[];
  crewGroup: CrewGroup | '';
  maxQuestDiff: number;
  maxSetupDiff: number;
  minRating: number;
  mainQuestOnly: boolean;
  sortBy: SortBy;
}

const DEFAULT_FILTERS: Filters = {
  games: [],
  crewGroup: '',
  maxQuestDiff: 5,
  maxSetupDiff: 5,
  minRating: 0,
  mainQuestOnly: false,
  sortBy: 'release',
};

function isFiltered(f: Filters) {
  return (
    f.games.length > 0 ||
    f.crewGroup !== '' ||
    f.maxQuestDiff !== 5 ||
    f.maxSetupDiff !== 5 ||
    f.minRating !== 0 ||
    f.mainQuestOnly
  );
}

function sortMaps(maps: MapData[], sortBy: SortBy): MapData[] {
  return [...maps].sort((a, b) => {
    switch (sortBy) {
      case 'release': return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
      case 'alpha':   return a.title.localeCompare(b.title);
      case 'rating':  return b.communityRating - a.communityRating;
      case 'setup':   return a.setupDifficulty - b.setupDifficulty;
      case 'quest':   return (a.eeDifficulty ?? 0) - (b.eeDifficulty ?? 0);
    }
  });
}

export default function MapGallery() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [collapsed, setCollapsed] = useState<Set<GameId>>(new Set());

  // ── Apply filters ──────────────────────────────────────────────
  const filtered = useMemo(() => {
    return MAPS.filter(map => {
      if (filters.games.length > 0 && !filters.games.includes(map.game)) return false;
      if (filters.crewGroup && map.crewGroup !== filters.crewGroup) return false;
      if (filters.mainQuestOnly && !map.hasMainQuest) return false;
      if (map.eeDifficulty && map.eeDifficulty > filters.maxQuestDiff) return false;
      if (map.setupDifficulty > filters.maxSetupDiff) return false;
      if (map.communityRating < filters.minRating) return false;
      return true;
    });
  }, [filters]);

  // ── Group by game, apply sort within each group ───────────────
  const groups = useMemo(() => {
    return GAME_ORDER
      .map(game => ({
        game,
        maps: sortMaps(filtered.filter(m => m.game === game), filters.sortBy),
      }))
      .filter(g => g.maps.length > 0);
  }, [filtered, filters.sortBy]);

  // ── Helpers ───────────────────────────────────────────────────
  function toggleGame(g: GameId) {
    setFilters(f => ({
      ...f,
      games: f.games.includes(g) ? f.games.filter(x => x !== g) : [...f.games, g],
    }));
  }

  function toggleCollapse(g: GameId) {
    setCollapsed(s => {
      const next = new Set(s);
      next.has(g) ? next.delete(g) : next.add(g);
      return next;
    });
  }

  function resetFilters() {
    setFilters(f => ({ ...DEFAULT_FILTERS, sortBy: f.sortBy }));
  }

  const activeFilters = isFiltered(filters);
  const totalShown = filtered.length;

  return (
    <div className="gallery-root">

      {/* ════════════════════════════════════════ */}
      {/* FILTER BAR                               */}
      {/* ════════════════════════════════════════ */}
      <div className="filter-bar">

        {/* Game toggles */}
        <div className="filter-group">
          <span className="filter-group-label">GAME</span>
          <div className="filter-game-btns">
            {GAME_ORDER.map(g => (
              <button
                key={g}
                className={`game-btn ${filters.games.includes(g) ? 'active' : ''}`}
                style={filters.games.includes(g) ? { background: GAMES[g].color, borderColor: GAMES[g].color } : {}}
                onClick={() => toggleGame(g)}
              >
                {GAMES[g].short}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-divider" />

        {/* Crew */}
        <div className="filter-group">
          <span className="filter-group-label">CREW</span>
          <select
            className="filter-select"
            value={filters.crewGroup}
            onChange={e => setFilters(f => ({ ...f, crewGroup: e.target.value as CrewGroup | '' }))}
          >
            <option value="">All</option>
            {Object.entries(CREW_GROUPS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>

        <div className="filter-divider" />

        {/* Quest Difficulty */}
        <div className="filter-group">
          <span className="filter-group-label">MAX QUEST DIFF</span>
          <div className="filter-range-btns">
            {[1,2,3,4,5].map(n => (
              <button
                key={n}
                className={`range-btn ${filters.maxQuestDiff === n ? 'active' : ''}`}
                onClick={() => setFilters(f => ({ ...f, maxQuestDiff: n }))}
              >{n}</button>
            ))}
          </div>
        </div>

        <div className="filter-divider" />

        {/* Setup Difficulty */}
        <div className="filter-group">
          <span className="filter-group-label">MAX SETUP</span>
          <div className="filter-range-btns">
            {[1,2,3,4,5].map(n => (
              <button
                key={n}
                className={`range-btn ${filters.maxSetupDiff === n ? 'active' : ''}`}
                onClick={() => setFilters(f => ({ ...f, maxSetupDiff: n }))}
              >{n}</button>
            ))}
          </div>
        </div>

        <div className="filter-divider" />

        {/* Min rating */}
        <div className="filter-group">
          <span className="filter-group-label">MIN RATING</span>
          <div className="filter-range-btns">
            {[0, 3, 3.5, 4, 4.5].map(n => (
              <button
                key={n}
                className={`range-btn ${filters.minRating === n ? 'active' : ''}`}
                onClick={() => setFilters(f => ({ ...f, minRating: n }))}
              >{n === 0 ? 'All' : `${n}★`}</button>
            ))}
          </div>
        </div>

        <div className="filter-divider" />

        {/* Main Quest only toggle */}
        <div className="filter-group">
          <button
            className={`ee-toggle ${filters.mainQuestOnly ? 'active' : ''}`}
            onClick={() => setFilters(f => ({ ...f, mainQuestOnly: !f.mainQuestOnly }))}
          >
            MAIN QUEST ONLY
          </button>
        </div>

        <div className="filter-divider" />

        {/* Sort */}
        <div className="filter-group">
          <span className="filter-group-label">SORT</span>
          <div className="filter-range-btns">
            {(Object.keys(SORT_LABELS) as SortBy[]).map(val => (
              <button
                key={val}
                className={`range-btn ${filters.sortBy === val ? 'active' : ''}`}
                onClick={() => setFilters(f => ({ ...f, sortBy: val }))}
              >
                {SORT_LABELS[val]}
              </button>
            ))}
          </div>
        </div>

        {/* Reset filters */}
        {activeFilters && (
          <button className="filter-reset" onClick={resetFilters}>
            ✕ RESET
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="gallery-count">
        <span className="count-num">{totalShown}</span>
        <span className="count-label"> MAP{totalShown !== 1 ? 'S' : ''} FOUND</span>
        {activeFilters && <span className="count-filtered"> — FILTERED</span>}
      </p>

      {/* ════════════════════════════════════════ */}
      {/* GAME SECTIONS                            */}
      {/* ════════════════════════════════════════ */}
      {groups.length === 0 ? (
        <div className="no-results">
          <p>No maps match your filters.</p>
          <button onClick={resetFilters}>Clear filters</button>
        </div>
      ) : (
        groups.map(({ game, maps }) => {
          const isCollapsed = collapsed.has(game);
          const g = GAMES[game];
          return (
            <section key={game} className="game-section">
              <button
                className="section-header"
                onClick={() => toggleCollapse(game)}
                style={{ '--game-color': g.color } as React.CSSProperties}
              >
                <span className="section-collapse-icon">{isCollapsed ? '▶' : '▼'}</span>
                <span className="section-game-short" style={{ color: g.color }}>{g.short}</span>
                <span className="section-game-label">{g.label.toUpperCase()}</span>
                <span className="section-count">{maps.length} MAP{maps.length !== 1 ? 'S' : ''}</span>
              </button>

              {!isCollapsed && (
                <div className="map-grid">
                  {maps.map(map => (
                    <MapCard key={map.id} map={map} />
                  ))}
                </div>
              )}
            </section>
          );
        })
      )}

    </div>
  );
}
