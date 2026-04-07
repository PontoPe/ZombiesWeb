import type { MapData } from '../../data/maps';
import { GAMES } from '../../data/maps';

interface Props {
  map: MapData;
}

function DiffBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="diff-bar-track">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`diff-bar-pip ${i < value ? 'filled' : ''}`}
        />
      ))}
    </div>
  );
}

function StarRating({ value }: { value: number }) {
  const full  = Math.floor(value);
  const half  = value % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="star-row">
      {'★'.repeat(full)}
      {half ? '½' : ''}
      <span className="star-empty">{'★'.repeat(empty)}</span>
    </span>
  );
}

export default function MapCard({ map }: Props) {
  const game = GAMES[map.game];

  return (
    <a href={`/maps/${map.id}`} className="map-card">

      {/* ── Image / placeholder ── */}
      <div className="card-img">
        <span className="card-img-letter">{map.title[0]}</span>
        <div className="card-img-overlay" />
        {/* Badges top row */}
        <div className="card-badges">
          <span className="badge-game" style={{ background: game.color }}>
            {game.short}
          </span>
          {map.hasMainQuest && <span className="badge-ee">MQ</span>}
          {map.hasWonderWeapon && <span className="badge-ww">WW</span>}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="card-body">

        {/* Title */}
        <h3 className="card-title">{map.title}</h3>

        {/* Setting / date */}
        <p className="card-setting">
          {map.setting}
          <span className="card-date"> · {map.inUniverseDate}</span>
        </p>

        {/* Description */}
        <p className="card-desc">{map.description}</p>

        {/* Divider */}
        <div className="card-rule" />

        {/* Stats */}
        <div className="card-stats">
          <div className="stat-row">
            <span className="stat-label">QUEST</span>
            {map.eeDifficulty
              ? <DiffBar value={map.eeDifficulty} />
              : <span className="stat-na">N / A</span>}
          </div>
          <div className="stat-row">
            <span className="stat-label">SETUP</span>
            <DiffBar value={map.setupDifficulty} />
          </div>
          <div className="stat-row">
            <span className="stat-label">RATING</span>
            <StarRating value={map.communityRating} />
          </div>
        </div>

        {/* CTA */}
        <div className="card-cta">
          <span>ENTER MAP</span>
          <span className="cta-arrow">→</span>
        </div>

      </div>
    </a>
  );
}
