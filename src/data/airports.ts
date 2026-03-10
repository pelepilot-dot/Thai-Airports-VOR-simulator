export interface Runway {
  id: string;
  length: number; // in meters
  heading: number; // in degrees
  offsetLat: number;
  offsetLon: number;
  ils?: string;
}

export interface VOR {
  id: string;
  name: string;
  freq: string;
  lat: number;
  lon: number;
}

export interface Airport {
  icao: string;
  name: string;
  lat: number;
  lon: number;
  runways: Runway[];
  vors: VOR[];
}

export const airports: Airport[] = [
  {
    icao: 'VTBS',
    name: 'Suvarnabhumi Airport',
    lat: 13.6811,
    lon: 100.747,
    runways: [
      { id: '01L/19R', length: 4000, heading: 10, offsetLat: 0, offsetLon: -0.015, ils: '01L: 109.5 / 19R: 109.9' },
      { id: '01R/19L', length: 4000, heading: 10, offsetLat: 0, offsetLon: 0.015, ils: '01R: 108.9 / 19L: 110.3' },
      { id: '01C/19C', length: 4000, heading: 10, offsetLat: 0, offsetLon: -0.030 } // New 3rd runway
    ],
    vors: [
      { id: 'SVB', name: 'Suvarnabhumi VOR/DME', freq: '111.4', lat: 13.68, lon: 100.75 }
    ]
  },
  {
    icao: 'VTBD',
    name: 'Don Mueang International Airport',
    lat: 13.9126,
    lon: 100.607,
    runways: [
      { id: '03L/21R', length: 3700, heading: 30, offsetLat: 0, offsetLon: -0.002, ils: '03L: 109.5 / 21R: 109.9' },
      { id: '03R/21L', length: 3500, heading: 30, offsetLat: 0, offsetLon: 0.002, ils: '03R: 108.9 / 21L: 110.3' }
    ],
    vors: [
      { id: 'BKK', name: 'Bangkok VOR/DME', freq: '117.7', lat: 13.89, lon: 100.61 }
    ]
  },
  {
    icao: 'VTSP',
    name: 'Phuket International Airport',
    lat: 8.1132,
    lon: 98.3169,
    runways: [
      { id: '09/27', length: 3000, heading: 90, offsetLat: 0, offsetLon: 0, ils: '09: 109.9 / 27: 109.5' }
    ],
    vors: [
      { id: 'PUT', name: 'Phuket VOR/DME', freq: '116.9', lat: 8.11, lon: 98.31 }
    ]
  },
  {
    icao: 'VTCC',
    name: 'Chiang Mai International Airport',
    lat: 18.7668,
    lon: 98.9626,
    runways: [
      { id: '18/36', length: 3100, heading: 180, offsetLat: 0, offsetLon: 0, ils: '18: 109.9 / 36: 109.5' }
    ],
    vors: [
      { id: 'CMA', name: 'Chiang Mai VOR/DME', freq: '114.1', lat: 18.76, lon: 98.96 }
    ]
  },
  {
    icao: 'VTCT',
    name: 'Mae Fah Luang - Chiang Rai International Airport',
    lat: 19.9516,
    lon: 99.8835,
    runways: [
      { id: '03/21', length: 3000, heading: 30, offsetLat: 0, offsetLon: 0 }
    ],
    vors: [
      { id: 'CEI', name: 'Chiang Rai VOR/DME', freq: '113.1', lat: 19.95, lon: 99.88 }
    ]
  },
  {
    icao: 'VTSS',
    name: 'Hat Yai International Airport',
    lat: 6.9332,
    lon: 100.393,
    runways: [
      { id: '08/26', length: 3050, heading: 80, offsetLat: 0, offsetLon: 0 }
    ],
    vors: [
      { id: 'HTY', name: 'Hat Yai VOR/DME', freq: '115.3', lat: 6.93, lon: 100.39 }
    ]
  },
  {
    icao: 'VTUD',
    name: 'Udon Thani International Airport',
    lat: 17.3863,
    lon: 102.788,
    runways: [
      { id: '12/30', length: 3048, heading: 120, offsetLat: 0, offsetLon: 0, ils: '12: 109.3 / 30: 109.9' }
    ],
    vors: [
      { id: 'UDN', name: 'Udon Thani VOR/DME', freq: '113.3', lat: 17.38, lon: 102.78 }
    ]
  },
  {
    icao: 'VTSG',
    name: 'Krabi International Airport',
    lat: 8.0987,
    lon: 98.9861,
    runways: [
      { id: '14/32', length: 3000, heading: 140, offsetLat: 0, offsetLon: 0 }
    ],
    vors: [
      { id: 'KBI', name: 'Krabi VOR/DME', freq: '114.3', lat: 8.10, lon: 98.99 }
    ]
  },
  {
    icao: 'VTSM',
    name: 'Samui International Airport',
    lat: 9.5483,
    lon: 100.062,
    runways: [
      { id: '17/35', length: 2100, heading: 170, offsetLat: 0, offsetLon: 0 }
    ],
    vors: [
      { id: 'SMU', name: 'Samui VOR/DME', freq: '112.5', lat: 9.55, lon: 100.06 }
    ]
  },
  {
    icao: 'VTBU',
    name: 'U-Tapao Rayong-Pattaya International Airport',
    lat: 12.6799,
    lon: 101.005,
    runways: [
      { id: '18/36', length: 3505, heading: 180, offsetLat: 0, offsetLon: 0, ils: '18: 110.3 / 36: 109.5' }
    ],
    vors: [
      { id: 'BUT', name: 'U-Tapao VOR/DME', freq: '114.7', lat: 12.68, lon: 101.01 }
    ]
  },
  {
    icao: 'VTUU',
    name: 'Ubon Ratchathani Airport',
    lat: 15.2505,
    lon: 104.87,
    runways: [
      { id: '05/23', length: 3000, heading: 50, offsetLat: 0, offsetLon: 0 }
    ],
    vors: [
      { id: 'UBT', name: 'Ubon Ratchathani VOR/DME', freq: '112.9', lat: 15.25, lon: 104.87 }
    ]
  },
  {
    icao: 'VTPP',
    name: 'Phitsanulok Airport',
    lat: 16.7697,
    lon: 100.279,
    runways: [
      { id: '14/32', length: 3000, heading: 140, offsetLat: 0, offsetLon: 0 }
    ],
    vors: [
      { id: 'PSL', name: 'Phitsanulok VOR/DME', freq: '113.9', lat: 16.77, lon: 100.28 }
    ]
  },
  {
    icao: 'VTPO',
    name: 'Sukhothai Airport',
    lat: 17.2372,
    lon: 99.8164,
    runways: [
      { id: '18/36', length: 2100, heading: 180, offsetLat: 0, offsetLon: 0 }
    ],
    vors: [
      { id: 'SKT', name: 'Sukhothai VOR/DME', freq: '112.3', lat: 17.24, lon: 99.82 }
    ]
  },
  {
    icao: 'VTCY',
    name: 'Mae Hong Son Airport',
    lat: 19.3003,
    lon: 97.975,
    runways: [
      { id: '11/29', length: 2000, heading: 110, offsetLat: 0, offsetLon: 0 }
    ],
    vors: [
      { id: 'MHS', name: 'Mae Hong Son VOR/DME', freq: '112.1', lat: 19.30, lon: 97.98 }
    ]
  },
  {
    icao: 'VTCI',
    name: 'Pai Airport',
    lat: 19.3708,
    lon: 98.4361,
    runways: [
      { id: '01/19', length: 1000, heading: 10, offsetLat: 0, offsetLon: 0 }
    ],
    vors: [] // No VOR
  },
  {
    icao: 'VTCP',
    name: 'Phrae Airport',
    lat: 18.1311,
    lon: 100.165,
    runways: [
      { id: '01/19', length: 1500, heading: 10, offsetLat: 0, offsetLon: 0 }
    ],
    vors: [] // No VOR
  },
  {
    icao: 'VTCN',
    name: 'Nan Nakhon Airport',
    lat: 18.8081,
    lon: 100.783,
    runways: [
      { id: '02/20', length: 2000, heading: 20, offsetLat: 0, offsetLon: 0 }
    ],
    vors: [] // No VOR
  },
  {
    icao: 'VTUL',
    name: 'Loei Airport',
    lat: 17.4389,
    lon: 101.723,
    runways: [
      { id: '01/19', length: 2100, heading: 10, offsetLat: 0, offsetLon: 0 }
    ],
    vors: [] // No VOR
  },
  {
    icao: 'VTCB',
    name: 'Phetchabun Airport',
    lat: 16.6775,
    lon: 101.193,
    runways: [
      { id: '01/19', length: 2100, heading: 10, offsetLat: 0, offsetLon: 0 }
    ],
    vors: [] // No VOR
  },
  {
    icao: 'VTBH',
    name: 'Sa Pran Nak Airport (Royal Thai Army Aviation Center)',
    lat: 14.949937,
    lon: 100.643472,
    runways: [{ id: '18/36', length: 1000, heading: 180, offsetLat: 0, offsetLon: 0 }],
    vors: []
  },
  {
    icao: 'VTSB',
    name: 'Surat Thani International Airport / Wing 7',
    lat: 9.1313,
    lon: 99.1385,
    runways: [{ id: '04/22', length: 3000, heading: 40, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'SUR', name: 'Surat Thani VOR/DME', freq: '113.5', lat: 9.13, lon: 99.14 }]
  },
  {
    icao: 'VTSF',
    name: 'Nakhon Si Thammarat Airport',
    lat: 8.5395,
    lon: 99.9445,
    runways: [{ id: '01/19', length: 2100, heading: 10, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'NST', name: 'Nakhon Si Thammarat VOR/DME', freq: '116.5', lat: 8.54, lon: 99.94 }]
  },
  {
    icao: 'VTST',
    name: 'Trang Airport',
    lat: 7.5088,
    lon: 99.6163,
    runways: [{ id: '08/26', length: 2100, heading: 80, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'TRG', name: 'Trang VOR/DME', freq: '112.7', lat: 7.51, lon: 99.62 }]
  },
  {
    icao: 'VTSC',
    name: 'Narathiwat Airport',
    lat: 6.5198,
    lon: 101.743,
    runways: [{ id: '02/20', length: 2500, heading: 20, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'NRT', name: 'Narathiwat VOR/DME', freq: '114.9', lat: 6.52, lon: 101.74 }]
  },
  {
    icao: 'VTSE',
    name: 'Chumphon Airport',
    lat: 10.7105,
    lon: 99.3614,
    runways: [{ id: '06/24', length: 2100, heading: 60, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'CHM', name: 'Chumphon VOR/DME', freq: '113.7', lat: 10.71, lon: 99.36 }]
  },
  {
    icao: 'VTSR',
    name: 'Ranong Airport',
    lat: 9.7775,
    lon: 98.5853,
    runways: [{ id: '02/20', length: 2000, heading: 20, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'RNG', name: 'Ranong VOR/DME', freq: '113.0', lat: 9.78, lon: 98.59 }]
  },
  {
    icao: 'VTUQ',
    name: 'Nakhon Ratchasima Airport / Korat RTAFB (Wing 1)',
    lat: 14.9331,
    lon: 102.079,
    runways: [{ id: '06/24', length: 3000, heading: 60, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'KRT', name: 'Korat VOR/DME', freq: '112.5', lat: 14.93, lon: 102.08 }]
  },
  {
    icao: 'VTUK',
    name: 'Khon Kaen Airport',
    lat: 16.4668,
    lon: 102.783,
    runways: [{ id: '03/21', length: 3050, heading: 30, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'KKN', name: 'Khon Kaen VOR/DME', freq: '112.7', lat: 16.47, lon: 102.78 }]
  },
  {
    icao: 'VTUO',
    name: 'Buriram Airport',
    lat: 15.2275,
    lon: 103.25,
    runways: [{ id: '04/22', length: 2100, heading: 40, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'BRM', name: 'Buriram VOR/DME', freq: '114.4', lat: 15.23, lon: 103.25 }]
  },
  {
    icao: 'VTUV',
    name: 'Roi Et Airport',
    lat: 16.1164,
    lon: 103.774,
    runways: [{ id: '18/36', length: 2100, heading: 180, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'RET', name: 'Roi Et VOR/DME', freq: '113.1', lat: 16.12, lon: 103.77 }]
  },
  {
    icao: 'VTUI',
    name: 'Sakon Nakhon Airport',
    lat: 17.1944,
    lon: 104.119,
    runways: [{ id: '05/23', length: 2600, heading: 50, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'SNO', name: 'Sakon Nakhon VOR/DME', freq: '114.5', lat: 17.19, lon: 104.12 }]
  },
  {
    icao: 'VTUW',
    name: 'Nakhon Phanom Airport',
    lat: 17.3844,
    lon: 104.643,
    runways: [{ id: '15/33', length: 2500, heading: 150, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'NPN', name: 'Nakhon Phanom VOR/DME', freq: '114.1', lat: 17.38, lon: 104.64 }]
  },
  {
    icao: 'VTBO',
    name: 'Trat Airport',
    lat: 12.2747,
    lon: 102.319,
    runways: [{ id: '05/23', length: 1800, heading: 50, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'TRT', name: 'Trat VOR/DME', freq: '113.2', lat: 12.27, lon: 102.32 }]
  },
  {
    icao: 'VTBP',
    name: 'Prachuap Khiri Khan Airport (Wing 5)',
    lat: 11.7844,
    lon: 99.8047,
    runways: [{ id: '18/36', length: 2000, heading: 180, offsetLat: 0, offsetLon: 0 }],
    vors: []
  },
  {
    icao: 'VTBK',
    name: 'Kamphaeng Saen Airport (Flying Training School)',
    lat: 14.1019,
    lon: 99.9169,
    runways: [{ id: '03/21', length: 2743, heading: 30, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'KPS', name: 'Kamphaeng Saen VOR/DME', freq: '114.6', lat: 14.10, lon: 99.92 }]
  },
  {
    icao: 'VTBL',
    name: 'Khok Kathiam Air Force Base (Wing 2)',
    lat: 14.8756,
    lon: 100.665,
    runways: [{ id: '01/19', length: 2000, heading: 10, offsetLat: 0, offsetLon: 0 }],
    vors: []
  },
  {
    icao: 'VTPI',
    name: 'Takhli Royal Thai Air Force Base (Wing 4)',
    lat: 15.2733,
    lon: 100.295,
    runways: [{ id: '18/36', length: 3000, heading: 180, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'TKL', name: 'Takhli VOR/DME', freq: '113.6', lat: 15.27, lon: 100.30 }]
  },
  {
    icao: 'VTPT',
    name: 'Tak Airport',
    lat: 16.8986,
    lon: 99.0547,
    runways: [{ id: '09/27', length: 1500, heading: 90, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'TAK', name: 'Tak VOR/DME', freq: '114.8', lat: 16.90, lon: 99.05 }]
  },
  {
    icao: 'VTPM',
    name: 'Mae Sot Airport',
    lat: 16.7003,
    lon: 98.5444,
    runways: [{ id: '09/27', length: 1500, heading: 90, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'MST', name: 'Mae Sot VOR/DME', freq: '114.2', lat: 16.70, lon: 98.54 }]
  },
  {
    icao: 'VTCL',
    name: 'Lampang Airport',
    lat: 18.2719,
    lon: 99.5042,
    runways: [{ id: '18/36', length: 1971, heading: 180, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'LPG', name: 'Lampang VOR/DME', freq: '113.7', lat: 18.27, lon: 99.50 }]
  },
  {
    icao: 'VTSH',
    name: 'Songkhla Airport (Naval Base)',
    lat: 7.1869,
    lon: 100.608,
    runways: [{ id: '14/32', length: 1500, heading: 140, offsetLat: 0, offsetLon: 0 }],
    vors: []
  },
  {
    icao: 'VTSK',
    name: 'Pattani Airport',
    lat: 6.7844,
    lon: 101.153,
    runways: [{ id: '08/26', length: 1400, heading: 80, offsetLat: 0, offsetLon: 0 }],
    vors: []
  },
  {
    icao: 'VTQK',
    name: 'Watthana Nakhon Air Base',
    lat: 13.7761,
    lon: 102.316,
    runways: [{ id: '09/27', length: 2800, heading: 90, offsetLat: 0, offsetLon: 0 }],
    vors: []
  },
  {
    icao: 'VTSY',
    name: 'Betong International Airport',
    lat: 5.785,
    lon: 101.143,
    runways: [{ id: '07/25', length: 1800, heading: 70, offsetLat: 0, offsetLon: 0 }],
    vors: []
  },
  {
    icao: 'VTCH',
    name: 'Mae Sariang Airport',
    lat: 18.1722,
    lon: 97.9317,
    runways: [{ id: '01/19', length: 1000, heading: 10, offsetLat: 0, offsetLon: 0 }],
    vors: []
  },
  {
    icao: 'VTUN',
    name: 'Nakhon Ratchasima Airport (Civil)',
    lat: 14.9331,
    lon: 102.313,
    runways: [{ id: '06/24', length: 2100, heading: 60, offsetLat: 0, offsetLon: 0 }],
    vors: []
  },
  {
    icao: 'VTBT',
    name: 'Bang Phra Airport',
    lat: 13.2217,
    lon: 100.958,
    runways: [{ id: '05/23', length: 1000, heading: 50, offsetLat: 0, offsetLon: 0 }],
    vors: []
  },
  {
    icao: 'VTPN',
    name: 'Nakhon Sawan Airport',
    lat: 15.6744,
    lon: 100.136,
    runways: [{ id: '01/19', length: 1500, heading: 10, offsetLat: 0, offsetLon: 0 }],
    vors: []
  },
  {
    icao: 'VTBN',
    name: 'Bhumibol Dam Airport',
    lat: 17.2367,
    lon: 99.0117,
    runways: [{ id: '01/19', length: 1000, heading: 10, offsetLat: 0, offsetLon: 0 }],
    vors: []
  },
  {
    icao: 'VTBW',
    name: 'Hua Hin Airport',
    lat: 12.6364,
    lon: 99.9506,
    runways: [{ id: '16/34', length: 2100, heading: 160, offsetLat: 0, offsetLon: 0 }],
    vors: [{ id: 'HHN', name: 'Hua Hin VOR/DME', freq: '112.4', lat: 12.63, lon: 99.95 }]
  },
  {
    icao: 'VTCO',
    name: 'Lamphun Airport',
    lat: 18.5583,
    lon: 99.025,
    runways: [{ id: '01/19', length: 1000, heading: 10, offsetLat: 0, offsetLon: 0 }],
    vors: []
  },
  {
    icao: 'VTCF',
    name: 'Chiang Kham Airport',
    lat: 19.5,
    lon: 100.283,
    runways: [{ id: '01/19', length: 1000, heading: 10, offsetLat: 0, offsetLon: 0 }],
    vors: []
  },
  {
    icao: 'VTSW',
    name: 'Phuket Airpark',
    lat: 8.0017,
    lon: 98.4317,
    runways: [{ id: '09/27', length: 500, heading: 90, offsetLat: 0, offsetLon: 0 }],
    vors: []
  }
];
