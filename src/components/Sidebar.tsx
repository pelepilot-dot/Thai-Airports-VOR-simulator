import { useState } from 'react';
import { Airport } from '../data/airports';
import { Plane, Navigation, MapPin, Info, Search, Play } from 'lucide-react';

interface SidebarProps {
  airports: Airport[];
  selectedAirport: Airport | null;
  onSelectAirport: (icao: string) => void;
  isSimMode: boolean;
  onToggleSimMode: () => void;
}

export function Sidebar({ airports, selectedAirport, onSelectAirport, isSimMode, onToggleSimMode }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAirports = airports.filter(airport => 
    airport.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    airport.icao.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-white border-r border-slate-200 flex flex-col overflow-hidden font-sans">
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
          <Plane className="w-6 h-6 text-blue-600" />
          Thai Airports
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Select an airport to view its runways and VOR stations.
        </p>
      </div>

      <div className="p-6 border-b border-slate-200 space-y-4">
        <div>
          <label htmlFor="airport-search" className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-2">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              id="airport-search"
              className="w-full pl-10 p-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900 text-sm"
              placeholder="Search by name or ICAO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="airport-select" className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-2">
            Select Airport
          </label>
          <select
            id="airport-select"
            className="w-full p-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900"
            value={selectedAirport?.icao || ''}
            onChange={(e) => onSelectAirport(e.target.value)}
          >
            <option value="" disabled>Choose an airport...</option>
            {filteredAirports.map(airport => (
              <option key={airport.icao} value={airport.icao}>
                {airport.icao} - {airport.name}
              </option>
            ))}
          </select>
          {filteredAirports.length === 0 && (
            <p className="text-xs text-red-500 mt-2">No airports found matching your search.</p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {selectedAirport ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-1">{selectedAirport.name}</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="w-4 h-4" />
                {selectedAirport.lat.toFixed(4)}, {selectedAirport.lon.toFixed(4)}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <Plane className="w-4 h-4 text-slate-400" />
                Runways
              </h3>
              {selectedAirport.runways.length > 0 ? (
                <ul className="space-y-2">
                  {selectedAirport.runways.map(runway => (
                    <li key={runway.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="font-medium text-slate-800">{runway.id}</div>
                      <div className="text-xs text-slate-500 mt-1 flex gap-4">
                        <span>Length: {runway.length}m</span>
                        <span>Heading: {runway.heading}&deg;</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 italic">No runway data available.</p>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-slate-400" />
                VOR Stations
              </h3>
              {selectedAirport.vors.length > 0 ? (
                <ul className="space-y-2">
                  {selectedAirport.vors.map(vor => (
                    <li key={vor.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="font-medium text-slate-800 flex items-center justify-between">
                        <span>{vor.id}</span>
                        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{vor.freq} MHz</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{vor.name}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 italic">No VOR data available.</p>
              )}
            </div>
            
            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm flex items-start gap-3">
              <Info className="w-5 h-5 shrink-0 mt-0.5" />
              <p>The map automatically centers on the selected airport. Runways are shown as dark lines, and VOR stations as red dots.</p>
            </div>

            <button
              onClick={onToggleSimMode}
              className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-colors ${
                isSimMode 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {isSimMode ? 'Exit VOR Simulator' : (
                <>
                  <Play className="w-4 h-4" />
                  Start VOR Simulator
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-4">
            <MapPin className="w-12 h-12 text-slate-300" />
            <p>Select an airport from the dropdown above to view its details.</p>
          </div>
        )}
      </div>
    </div>
  );
}
