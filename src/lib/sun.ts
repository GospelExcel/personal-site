export type SunTimes = { sunrise: Date; sunset: Date };

export function sunTimes(date: Date, lat: number, lng: number): SunTimes | null {
  const rad = Math.PI / 180;
  const yearStart = Date.UTC(date.getUTCFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - yearStart) / 86400000);
  const decl = -23.44 * rad * Math.cos(((2 * Math.PI) / 365) * (dayOfYear + 10));
  const latRad = lat * rad;
  const cosH = -Math.tan(latRad) * Math.tan(decl);
  if (cosH < -1 || cosH > 1) return null;
  const H = Math.acos(cosH) / rad;
  const solarNoonUTC = 12 - lng / 15;
  const midnight = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return {
    sunrise: new Date(midnight + (solarNoonUTC - H / 15) * 3600000),
    sunset: new Date(midnight + (solarNoonUTC + H / 15) * 3600000),
  };
}

export function isNight(now: Date, times: SunTimes): boolean {
  return now < times.sunrise || now >= times.sunset;
}
