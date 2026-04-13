import type { MapData } from '../../data/maps';
import { GAMES, MAP_THUMBNAILS } from '../../data/maps';

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
  const thumb = MAP_THUMBNAILS[map.id];

  return (
    <a href={`/maps/${map.id}`} className="map-card">

      
      <div className="card-img">
        {thumb
          ? <img className="card-img-photo" src={thumb} alt={map.title} loading="lazy" />
          : <span className="card-img-letter">{map.title[0]}</span>}
        <div className="card-img-overlay" />
        
        <div className="card-badges">
          <span className="badge-game" style={{ background: game.color }}>
            {game.short}
          </span>
          {map.hasMainQuest && <span className="badge-ee">MQ</span>}
          {map.hasWonderWeapon && <span className="badge-ww">WW</span>}
        </div>
      </div>

      
      <div className="card-body">

        
        <h3 className="card-title">{map.title}</h3>

        
        <p className="card-setting">
          {map.setting}
          <span className="card-date"> · {map.inUniverseDate}</span>
        </p>

        
        <p className="card-desc">{map.description}</p>

        
        <div className="card-rule" />

        
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

        
        <div className="card-cta">
          <span>ENTER MAP</span>
          <span className="cta-arrow">→</span>
        </div>

      </div>
    </a>
  );
}
