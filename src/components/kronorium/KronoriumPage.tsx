import React, { useState } from 'react';
import KronoriumTimeline from './KronoriumTimeline';
import KronoriumOverview from './KronoriumOverview';
import AetherChronicle from './AetherChronicle';
import SpiralTimeline from './SpiralTimeline';

type Tab = 'map' | 'chronicle';
type MapView = 'inDepth' | 'overview';
type ChronicleView = 'spiral' | 'list';

const TAB_META: { value: Tab; label: string }[] = [
  { value: 'map',       label: 'Map Timeline' },
  { value: 'chronicle', label: 'Chronicles Timeline' },
];

export default function KronoriumPage() {
  const [tab, setTab] = useState<Tab>('map');
  const [mapView, setMapView] = useState<MapView>('inDepth');
  const [chronicleView, setChronicleView] = useState<ChronicleView>('spiral');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      <div
        style={{
          display: 'flex',
          background: '#110e09',
          borderBottom: '1px solid #2e2416',
          flexShrink: 0,
          alignItems: 'center',
        }}
      >
        {TAB_META.map(t => {
          const active = tab === t.value;
          return (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              style={{
                flex: 1,
                padding: '10px 0',
                background: active ? '#1a1510' : 'transparent',
                border: 'none',
                borderBottom: active ? '2px solid #c9a24a' : '2px solid transparent',
                color: active ? '#c9a24a' : '#4a3a22',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {t.label}
            </button>
          );
        })}

       
        {tab === 'map' && (
          <div
            style={{
              display: 'flex',
              gap: 2,
              padding: '0 12px',
              flexShrink: 0,
              borderLeft: '1px solid #2e2416',
              height: '100%',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => setMapView('inDepth')}
              title="In-depth view"
              style={{
                padding: '5px 10px',
                background: mapView === 'inDepth' ? '#c9a24a18' : 'transparent',
                border: `1px solid ${mapView === 'inDepth' ? '#c9a24a' : '#2e2416'}`,
                color: mapView === 'inDepth' ? '#c9a24a' : '#4a3a22',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              In-depth
            </button>
            <button
              onClick={() => setMapView('overview')}
              title="Overview flowchart"
              style={{
                padding: '5px 10px',
                background: mapView === 'overview' ? '#c9a24a18' : 'transparent',
                border: `1px solid ${mapView === 'overview' ? '#c9a24a' : '#2e2416'}`,
                color: mapView === 'overview' ? '#c9a24a' : '#4a3a22',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              Overview
            </button>
          </div>
        )}

        
        {tab === 'chronicle' && (
          <div
            style={{
              display: 'flex',
              gap: 2,
              padding: '0 12px',
              flexShrink: 0,
              borderLeft: '1px solid #2e2416',
              height: '100%',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => setChronicleView('spiral')}
              title="Spiral view"
              style={{
                padding: '5px 10px',
                background: chronicleView === 'spiral' ? '#c9a24a18' : 'transparent',
                border: `1px solid ${chronicleView === 'spiral' ? '#c9a24a' : '#2e2416'}`,
                color: chronicleView === 'spiral' ? '#c9a24a' : '#4a3a22',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              ◎ Spiral
            </button>
            <button
              onClick={() => setChronicleView('list')}
              title="List view"
              style={{
                padding: '5px 10px',
                background: chronicleView === 'list' ? '#c9a24a18' : 'transparent',
                border: `1px solid ${chronicleView === 'list' ? '#c9a24a' : '#2e2416'}`,
                color: chronicleView === 'list' ? '#c9a24a' : '#4a3a22',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              ≡ List
            </button>
          </div>
        )}
      </div>

      
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {tab === 'map' ? (
          mapView === 'inDepth' ? (
            <KronoriumTimeline />
          ) : (
            <KronoriumOverview />
          )
        ) : chronicleView === 'spiral' ? (
          <SpiralTimeline />
        ) : (
          <AetherChronicle />
        )}
      </div>
    </div>
  );
}
