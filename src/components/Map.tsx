import { useEffect, Fragment } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Airport, Runway, VOR } from '../data/airports';
import { getDestinationPoint } from '../utils/geo';
import { VorSimulator } from './VorSimulator';

// Fix leaflet default icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom icon for VOR
const vorIcon = L.divIcon({
  className: 'custom-vor-icon',
  html: `<div style="background-color: #ef4444; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

function getRunwayCoordinates(lat: number, lon: number, runway: Runway): [[number, number], [number, number]] {
  const centerLat = lat + runway.offsetLat;
  const centerLon = lon + runway.offsetLon;
  
  const halfLength = runway.length / 2;
  
  const start = getDestinationPoint(centerLat, centerLon, halfLength, runway.heading + 180);
  const end = getDestinationPoint(centerLat, centerLon, halfLength, runway.heading);
  
  return [start, end];
}

function getExtendedCenterline(lat: number, lon: number, runway: Runway, extensionLength = 4000): [[number, number], [number, number]] {
  const centerLat = lat + runway.offsetLat;
  const centerLon = lon + runway.offsetLon;
  
  const halfLength = runway.length / 2;
  
  const start = getDestinationPoint(centerLat, centerLon, halfLength + extensionLength, runway.heading + 180);
  const end = getDestinationPoint(centerLat, centerLon, halfLength + extensionLength, runway.heading);
  
  return [start, end];
}

const getRunwayDirectionIcon = (heading: number) => L.divIcon({
  className: 'runway-direction-icon',
  html: `<div style="transform: rotate(${heading}deg); width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.8));">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
             <path d="M12 2v20M17 7l-5-5-5 5M17 17l-5 5-5-5"/>
           </svg>
         </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

interface MapProps {
  selectedAirport: Airport | null;
  airports: Airport[];
  onSelectAirport: (icao: string) => void;
  isSimMode: boolean;
  onCloseSimMode: () => void;
}

export function Map({ selectedAirport, airports, onSelectAirport, isSimMode, onCloseSimMode }: MapProps) {
  const defaultCenter: [number, number] = [13.7563, 100.5018]; // Bangkok
  const defaultZoom = 6;

  const center: [number, number] = selectedAirport 
    ? [selectedAirport.lat, selectedAirport.lon] 
    : defaultCenter;
  
  const zoom = selectedAirport ? 13 : defaultZoom;

  // Flatten all VORs for the simulator
  const allVors = airports.flatMap(a => a.vors);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {!isSimMode && <MapUpdater center={center} zoom={zoom} />}

        {airports.map(airport => (
          <Marker 
            key={airport.icao} 
            position={[airport.lat, airport.lon]}
            eventHandlers={{
              click: () => onSelectAirport(airport.icao)
            }}
          >
            <Tooltip 
              direction="bottom" 
              offset={[0, 10]} 
              opacity={1} 
              permanent 
              className="bg-white/90 border-slate-200 text-slate-800 font-bold text-xs px-1.5 py-0.5 rounded shadow-sm"
            >
              {airport.icao}
            </Tooltip>
            <Popup>
              <div className="font-sans">
                <h3 className="font-bold text-sm">{airport.name}</h3>
                <p className="text-xs text-slate-500">ICAO: {airport.icao}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedAirport && selectedAirport.runways.map(runway => (
          <Fragment key={runway.id}>
            <Polyline 
              positions={getExtendedCenterline(selectedAirport.lat, selectedAirport.lon, runway)}
              color="#3b82f6"
              weight={2}
              dashArray="5, 8"
              opacity={0.7}
              interactive={false}
            />
            <Polyline 
              positions={getRunwayCoordinates(selectedAirport.lat, selectedAirport.lon, runway)}
              color="#1e293b"
              weight={8}
              opacity={0.8}
            >
              <Popup>
                <div className="font-sans text-xs">
                  <strong>Runway:</strong> {runway.id}<br/>
                  <strong>Length:</strong> {runway.length}m<br/>
                  <strong>Heading:</strong> {runway.heading}&deg;
                  {runway.ils && (
                    <>
                      <br/>
                      <strong>ILS:</strong> {runway.ils}
                    </>
                  )}
                </div>
              </Popup>
            </Polyline>
            <Marker 
              position={[selectedAirport.lat + runway.offsetLat, selectedAirport.lon + runway.offsetLon]}
              icon={getRunwayDirectionIcon(runway.heading)}
              interactive={false}
            />
          </Fragment>
        ))}

        {selectedAirport && selectedAirport.vors.map(vor => (
          <Marker 
            key={vor.id} 
            position={[vor.lat, vor.lon]}
            icon={vorIcon}
          >
            {!isSimMode && (
              <Tooltip 
                direction="right" 
                offset={[10, 0]} 
                opacity={0.9} 
                permanent 
                className="bg-slate-800/90 border-slate-700 text-white font-mono text-[10px] px-1.5 py-0.5 rounded shadow-sm"
              >
                {vor.id} {vor.freq}
              </Tooltip>
            )}
            <Popup>
              <div className="font-sans text-xs">
                <strong>VOR/DME:</strong> {vor.name}<br/>
                <strong>ID:</strong> {vor.id}<br/>
                <strong>Freq:</strong> {vor.freq} MHz
              </div>
            </Popup>
          </Marker>
        ))}

        {isSimMode && (
          <VorSimulator 
            initialLat={center[0]} 
            initialLon={center[1]} 
            availableVors={allVors} 
            onClose={onCloseSimMode} 
          />
        )}
      </MapContainer>
    </div>
  );
}
