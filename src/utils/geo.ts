export function getDestinationPoint(lat: number, lon: number, distance: number, bearing: number): [number, number] {
  const R = 6371e3; // Earth radius in meters
  const phi1 = lat * Math.PI / 180;
  const lambda1 = lon * Math.PI / 180;
  const theta = bearing * Math.PI / 180;

  const phi2 = Math.asin(Math.sin(phi1) * Math.cos(distance / R) +
                       Math.cos(phi1) * Math.sin(distance / R) * Math.cos(theta));
  const lambda2 = lambda1 + Math.atan2(Math.sin(theta) * Math.sin(distance / R) * Math.cos(phi1),
                             Math.cos(distance / R) - Math.sin(phi1) * Math.sin(phi2));

  return [phi2 * 180 / Math.PI, lambda2 * 180 / Math.PI];
}

export function getBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const phi1 = lat1 * Math.PI / 180;
  const phi2 = lat2 * Math.PI / 180;
  const deltaLambda = (lon2 - lon1) * Math.PI / 180;

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) -
            Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
  const theta = Math.atan2(y, x);

  return (theta * 180 / Math.PI + 360) % 360;
}

export function getDistanceNM(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = lat1 * Math.PI / 180;
  const phi2 = lat2 * Math.PI / 180;
  const deltaPhi = (lat2 - lat1) * Math.PI / 180;
  const deltaLambda = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceMeters = R * c;
  return distanceMeters / 1852; // Convert to Nautical Miles
}
