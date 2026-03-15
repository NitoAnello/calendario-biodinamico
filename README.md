# Calendario Biodinámico

App móvil Expo para el calendario biodinámico AABDA.

## Dependencias

- `astronomy-engine` — cálculos astronómicos sidéreos
- `expo-router` — navegación
- `expo-location` — geolocalización
- `date-fns` + `date-fns-tz` — manejo de fechas

## Correr en desarrollo

```bash
npm install
npx expo start
```

## Estructura

```
app/
  index.tsx          # Home: tipo de día + luna + calendario mensual
  day/[date].tsx     # Detalle de cualquier día
components/
  DayTypeCard.tsx    # Tarjeta de tipo de día (Raíz/Flor/Fruto/Hoja)
  MoonStatus.tsx     # Estado lunar (fase + ascendente/descendente)
  MonthCalendar.tsx  # Grilla mensual coloreada navegable
lib/
  biodinamica.ts     # Cálculos astronómicos (ayanamsa Lahiri, sistema M. Thun)
  lib/theme.ts       # Colores, emojis y nombres
Calendarios/         # PDFs de referencia AABDA para calibración
```
