/**
 * lib/biodinamica.ts
 * Cálculos astronómicos para el calendario biodinámico.
 * Sistema María Thun / AABDA — luna sidérea con ayanamsa Lahiri.
 */
import * as Astronomy from 'astronomy-engine';

export type DayType = 'raiz' | 'flor' | 'fruto' | 'hoja';

export interface DayInfo {
  date: Date;
  dayType: DayType;
  constellation: string;
  ascending: boolean;
  moonPhase: number;       // 0–360 °
  moonIllumination: number; // 0–1
  siderealLon: number;     // longitud sidérea 0–360 °
}

// Ayanamsa Lahiri para 2025-2026
const AYANAMSA = 24.13;

/**
 * Límites de constelaciones en grados sidéreos (desde 0° Aries sidéreo).
 * Basado en los límites usados por María Thun y adoptados por el AABDA.
 * Tipo: Raíz (Tierra), Flor (Aire), Fruto (Fuego), Hoja (Agua)
 */
const CONSTELLATIONS: { name: string; start: number; type: DayType }[] = [
  { name: 'Aries',        start: 0,    type: 'fruto' },
  { name: 'Tauro',        start: 25,   type: 'raiz'  },
  { name: 'Géminis',      start: 57,   type: 'flor'  },
  { name: 'Cáncer',       start: 90,   type: 'hoja'  },
  { name: 'Leo',          start: 117,  type: 'fruto' },
  { name: 'Virgo',        start: 150,  type: 'raiz'  },
  { name: 'Libra',        start: 202,  type: 'flor'  },
  { name: 'Escorpio',     start: 225,  type: 'hoja'  },
  { name: 'Sagitario',    start: 248,  type: 'fruto' },
  { name: 'Capricornio',  start: 300,  type: 'raiz'  },
  { name: 'Acuario',      start: 328,  type: 'flor'  },
  { name: 'Piscis',       start: 353,  type: 'hoja'  },
];

function toSiderealLon(date: Date): number {
  const ecl = Astronomy.EclipticGeoMoon(date);
  return ((ecl.lon - AYANAMSA) + 360) % 360;
}

function getConstellation(lon: number): { name: string; type: DayType } {
  let result = CONSTELLATIONS[0];
  for (const c of CONSTELLATIONS) {
    if (lon >= c.start) result = c;
  }
  return result;
}

function moonDeclination(date: Date): number {
  const obs = new Astronomy.Observer(0, 0, 0);
  return Astronomy.Equator(Astronomy.Body.Moon, date, obs, true, true).dec;
}

/**
 * Calcula la información biodinâmica de un día.
 * Usa mediodía UTC para consistencia independiente de timezone.
 */
export function getDayInfo(date: Date): DayInfo {
  const noon = new Date(Date.UTC(
    date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0
  ));

  const lon = toSiderealLon(noon);
  const constellation = getConstellation(lon);

  // Luna ascendente: declinación mayor que ayer → sube en el cielo
  const decToday = moonDeclination(noon);
  const decYest  = moonDeclination(new Date(noon.getTime() - 86_400_000));
  const ascending = decToday > decYest;

  const moonPhase = Astronomy.MoonPhase(noon);
  const moonIllumination = (1 - Math.cos((moonPhase * Math.PI) / 180)) / 2;

  return {
    date: noon,
    dayType: constellation.type,
    constellation: constellation.name,
    ascending,
    moonPhase,
    moonIllumination,
    siderealLon: lon,
  };
}

/** Genera la info para todos los días del mes indicado. */
export function getMonthInfo(year: number, month: number): DayInfo[] {
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return Array.from({ length: daysInMonth }, (_, i) =>
    getDayInfo(new Date(Date.UTC(year, month, i + 1)))
  );
}
