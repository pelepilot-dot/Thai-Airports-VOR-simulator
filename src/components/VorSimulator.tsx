import { useState, useEffect, useRef } from 'react';
import { Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { VOR } from '../data/airports';
import { getDestinationPoint, getBearing, getDistanceNM } from '../utils/geo';
import { Plane, Compass, Gauge, Power, Minus, Plus } from 'lucide-react';
import { RotaryKnob } from './RotaryKnob';

const aircraftIcon = L.divIcon({
  className: 'aircraft-icon',
  html: `<div style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.5));">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="#3b82f6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
             <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6 5-4 4-3-1-1 1 4 4 1-1-1-3 4-4 5 6l1.2-.7c.4-.2.7-.6.6-1.1z"/>
           </svg>
         </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

interface VorSimulatorProps {
  initialLat: number;
  initialLon: number;
  availableVors: VOR[];
  onClose: () => void;
}

export function VorSimulator({ initialLat, initialLon, availableVors, onClose }: VorSimulatorProps) {
  const map = useMap();
  
  const [pos, setPos] = useState<{lat: number, lon: number}>({ lat: initialLat, lon: initialLon });
  const [heading, setHeading] = useState<number>(360);
  const [speed, setSpeed] = useState<number>(120); // knots
  const [obs, setObs] = useState<number>(360);
  const [selectedVorId, setSelectedVorId] = useState<string>(availableVors[0]?.id || '');
  
  const lastTimeRef = useRef<number>(Date.now());
  const requestRef = useRef<number>();

  const selectedVor = availableVors.find(v => v.id === selectedVorId);

  // Simulation Loop
  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const dt = (now - lastTimeRef.current) / 1000; // seconds
      lastTimeRef.current = now;

      if (speed > 0) {
        setPos(currentPos => {
          // speed in knots -> meters per second
          const speedMs = speed * 0.514444;
          const distanceMeters = speedMs * dt;
          const [newLat, newLon] = getDestinationPoint(currentPos.lat, currentPos.lon, distanceMeters, heading);
          return { lat: newLat, lon: newLon };
        });
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    
    lastTimeRef.current = Date.now();
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [heading, speed]);

  // Center map on aircraft initially
  useEffect(() => {
    map.flyTo([initialLat, initialLon], 10);
  }, [initialLat, initialLon, map]);

  // Calculate VOR Instrument values
  let cdiDeflection = 0; // -10 to +10 (each dot is 2 degrees)
  let toFrom: 'TO' | 'FROM' | 'OFF' = 'OFF';
  let distance = 0;
  let bearingToStation = 0;

  if (selectedVor) {
    bearingToStation = getBearing(pos.lat, pos.lon, selectedVor.lat, selectedVor.lon);
    distance = getDistanceNM(pos.lat, pos.lon, selectedVor.lat, selectedVor.lon);
    
    let diff = bearingToStation - obs;
    // Normalize to -180 to +180
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    
    // Cone of confusion (close to station)
    if (distance < 0.5) {
      toFrom = 'OFF';
      cdiDeflection = 0;
    } else {
      if (Math.abs(diff) <= 90) {
        toFrom = 'TO';
        cdiDeflection = diff;
      } else {
        toFrom = 'FROM';
        if (diff > 0) {
          cdiDeflection = 180 - diff;
        } else {
          cdiDeflection = -180 - diff;
        }
      }
    }
    
    // Max deflection is usually 10 degrees
    cdiDeflection = Math.max(-10, Math.min(10, cdiDeflection));
  }

  // Update aircraft icon rotation dynamically
  const rotatedIcon = L.divIcon({
    className: 'aircraft-icon',
    html: `<div style="transform: rotate(${heading}deg); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.5));">
             <svg width="32" height="32" viewBox="0 0 512 512" fill="#3b82f6" stroke="#ffffff" stroke-width="16">
               <path d="M256 0 C265 0 272 10 272 25 L272 150 L480 280 L480 320 L272 270 L272 420 L320 460 L320 490 L256 470 L192 490 L192 460 L240 420 L240 270 L32 320 L32 280 L240 150 L240 25 C240 10 247 0 256 0 Z" />
             </svg>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  // Calculate 10 NM heading line end point (10 NM = 18520 meters)
  const headingLineEnd = getDestinationPoint(pos.lat, pos.lon, 18520, heading);

  return (
    <>
      <Polyline 
        positions={[[pos.lat, pos.lon], headingLineEnd]} 
        color="#3b82f6" 
        weight={2} 
        dashArray="5, 10" 
        opacity={0.8} 
        interactive={false}
      />
      <Marker position={[pos.lat, pos.lon]} icon={rotatedIcon} zIndexOffset={1000}>
        <Popup>Training Aircraft</Popup>
      </Marker>

      {/* Control Panel Overlay */}
      <div 
        className="absolute bottom-6 right-6 z-[1000] bg-slate-900/95 backdrop-blur text-white p-5 rounded-2xl shadow-2xl border border-slate-700 w-80 font-sans"
        onMouseDown={e => e.stopPropagation()}
        onDoubleClick={e => e.stopPropagation()}
        onWheel={e => e.stopPropagation()}
        onTouchStart={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Plane className="w-5 h-5 text-blue-400" />
            VOR Simulator
          </h3>
          <button onClick={onClose} className="p-1.5 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
            <Power className="w-4 h-4" />
          </button>
        </div>

        {/* VOR Instrument */}
        <div className="bg-slate-800 rounded-xl p-4 pb-2 mb-5 border border-slate-700 relative">
          <div className="text-center mb-2 text-xs font-medium text-slate-400 uppercase tracking-wider">HSI Indicator</div>
          
          <div className="relative w-48 h-48 mx-auto bg-slate-900 rounded-full border-4 border-slate-700 flex items-center justify-center mb-4 overflow-hidden shadow-inner">
            {/* Lubber Line (Top Center) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-yellow-400 z-30"></div>
            
            {/* Compass Rose (Rotates with -heading) */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{ transform: `rotate(${-heading}deg)` }}
            >
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                <div key={deg} className="absolute inset-0 flex justify-center text-[10px] font-mono text-slate-400 pt-1" style={{ transform: `rotate(${deg}deg)` }}>
                  {deg === 0 ? 'N' : deg === 90 ? 'E' : deg === 180 ? 'S' : deg === 270 ? 'W' : deg / 10}
                </div>
              ))}
              {/* Tick marks for every 10 degrees */}
              {Array.from({length: 36}).map((_, i) => (
                <div key={`tick-${i}`} className="absolute inset-0 flex justify-center pt-5" style={{ transform: `rotate(${i * 10}deg)` }}>
                  <div className={`w-0.5 ${i % 3 === 0 ? 'h-0' : 'h-1.5'} bg-slate-500`}></div>
                </div>
              ))}
            </div>

            {/* Course Pointer & CDI (Rotates with obs - heading) */}
            <div 
              className="absolute inset-0 z-10"
              style={{ transform: `rotate(${obs - heading}deg)` }}
            >
              {/* Course Pointer Arrow (Top) */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[12px] border-l-transparent border-r-transparent border-b-yellow-400"></div>
              {/* Course Pointer Line (Top half) */}
              <div className="absolute top-7 left-1/2 -translate-x-1/2 w-1.5 h-10 bg-yellow-400"></div>
              {/* Course Pointer Line (Bottom half) */}
              <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-1.5 h-10 bg-yellow-400"></div>
              
              {/* Center Dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full z-20"></div>
              
              {/* CDI Dots (2 degrees per dot, 5 dots each side) */}
              <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                {[-10, -8, -6, -4, -2, 2, 4, 6, 8, 10].map(dot => (
                  <div 
                    key={dot} 
                    className="absolute w-1.5 h-1.5 bg-slate-400 rounded-full"
                    style={{ transform: `translateX(${dot * 4}px)` }}
                  ></div>
                ))}
              </div>
              
              {/* CDI Needle */}
              <div 
                className="absolute top-1/2 left-1/2 w-1.5 h-16 bg-yellow-400 z-10"
                style={{ transform: `translate(calc(-50% + ${cdiDeflection * 4}px), -50%)` }}
              ></div>

              {/* TO/FROM Indicator */}
              {toFrom !== 'OFF' && (
                <div 
                  className="absolute top-1/2 left-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent"
                  style={{ 
                    borderBottom: toFrom === 'TO' ? '10px solid white' : '0',
                    borderTop: toFrom === 'FROM' ? '10px solid white' : '0',
                    transform: `translate(calc(-50% + 20px), ${toFrom === 'TO' ? '-12px' : '2px'})`
                  }}
                ></div>
              )}
            </div>
            
            {/* Aircraft Symbol (Fixed in center) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <Plane className="w-6 h-6 text-white drop-shadow-md" style={{ transform: 'rotate(-45deg)' }} />
            </div>
          </div>

          <div className="flex justify-between px-2">
            <RotaryKnob 
              value={obs} 
              onChange={setObs} 
              label="OBS" 
              colorClass="text-blue-400" 
            />
            <RotaryKnob 
              value={heading} 
              onChange={setHeading} 
              label="HDG" 
              icon={<Compass className="w-3 h-3"/>}
              colorClass="text-emerald-400" 
            />
          </div>
        </div>

        {/* Aircraft Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1"><Gauge className="w-3 h-3"/> Speed</span>
              <span className="font-mono">{speed} kts</span>
            </div>
            <input 
              type="range" min="0" max="300" value={speed} 
              onChange={e => setSpeed(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div>
            <div className="text-xs text-slate-400 mb-1">Tuned VOR</div>
            <select 
              value={selectedVorId}
              onChange={e => setSelectedVorId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm outline-none focus:border-blue-500"
            >
              {availableVors.length === 0 && <option value="">No VORs available</option>}
              {availableVors.map(v => (
                <option key={v.id} value={v.id}>{v.id} - {v.name} ({v.freq})</option>
              ))}
            </select>
          </div>

          {selectedVor && (
            <div className="bg-slate-800/50 rounded-lg p-3 text-xs font-mono text-slate-300 flex justify-between">
              <span>DIST: {distance.toFixed(1)} NM</span>
              <span>BRG: {Math.round(bearingToStation)}&deg;</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
