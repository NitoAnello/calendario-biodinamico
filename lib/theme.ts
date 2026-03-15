import { DayType } from './biodinamica';

export const DAY_TYPE_CONFIG: Record<
  DayType,
  { label: string; emoji: string; color: string; bg: string; light: string; description: string }
> = {
  raiz: {
    label: 'Raíz',
    emoji: '🥕',
    color: '#7B4F2E',
    bg: '#F2E2D0',
    light: '#FAF0E6',
    description: 'Día favorable para raíces, tubérculos y bulbos.',
  },
  flor: {
    label: 'Flor',
    emoji: '🌸',
    color: '#B8860B',
    bg: '#FFF9C4',
    light: '#FFFDE7',
    description: 'Día favorable para flores y plantas aromáticas.',
  },
  fruto: {
    label: 'Fruto',
    emoji: '🍎',
    color: '#B22222',
    bg: '#FFDDDD',
    light: '#FFF0F0',
    description: 'Día favorable para frutas, granos y semillas.',
  },
  hoja: {
    label: 'Hoja',
    emoji: '🍃',
    color: '#1B6B3A',
    bg: '#D4EDDA',
    light: '#F0FFF4',
    description: 'Día favorable para hojas, céspedes y verduras de hoja.',
  },
};

export function getMoonPhaseEmoji(phase: number): string {
  if (phase < 22.5)  return '🌑';
  if (phase < 67.5)  return '🌒';
  if (phase < 112.5) return '🌓';
  if (phase < 157.5) return '🌔';
  if (phase < 202.5) return '🌕';
  if (phase < 247.5) return '🌖';
  if (phase < 292.5) return '🌗';
  if (phase < 337.5) return '🌘';
  return '🌑';
}

export function getMoonPhaseName(phase: number): string {
  if (phase < 22.5)  return 'Luna Nueva';
  if (phase < 90)    return 'Creciente';
  if (phase < 112.5) return 'Cuarto Creciente';
  if (phase < 157.5) return 'Gibosa Creciente';
  if (phase < 202.5) return 'Luna Llena';
  if (phase < 247.5) return 'Gibosa Menguante';
  if (phase < 292.5) return 'Cuarto Menguante';
  if (phase < 337.5) return 'Menguante';
  return 'Luna Nueva';
}
