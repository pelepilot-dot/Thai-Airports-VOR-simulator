/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Map } from './components/Map';
import { Sidebar } from './components/Sidebar';
import { airports, Airport } from './data/airports';

export default function App() {
  const [selectedIcao, setSelectedIcao] = useState<string>('');
  const [isSimMode, setIsSimMode] = useState<boolean>(false);

  const selectedAirport = airports.find(a => a.icao === selectedIcao) || null;

  return (
    <div className="flex h-screen w-full bg-slate-100 overflow-hidden font-sans">
      <div className="w-96 flex-shrink-0 h-full flex flex-col shadow-xl z-10 relative">
        <div className="flex-1 overflow-hidden">
          <Sidebar 
            airports={airports} 
            selectedAirport={selectedAirport} 
            onSelectAirport={setSelectedIcao} 
            isSimMode={isSimMode}
            onToggleSimMode={() => setIsSimMode(!isSimMode)}
          />
        </div>
      </div>
      
      <div className="flex-1 h-full relative z-0">
        <Map 
          selectedAirport={selectedAirport} 
          airports={airports} 
          onSelectAirport={setSelectedIcao} 
          isSimMode={isSimMode}
          onCloseSimMode={() => setIsSimMode(false)}
        />
      </div>
    </div>
  );
}

