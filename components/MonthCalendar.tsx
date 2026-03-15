import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { DayInfo } from '../lib/biodinamica';
import { DAY_TYPE_CONFIG } from '../lib/theme';

const { width } = Dimensions.get('window');
const SIDE_PAD = 32; // 16px each side
const CELL_SIZE = Math.floor((width - SIDE_PAD) / 7);

const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

interface Props {
  year: number;
  month: number;
  days: DayInfo[];
  today: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

export function MonthCalendar({ year, month, days, today, onPrevMonth, onNextMonth }: Props) {
  const router = useRouter();

  // Week starts Monday. JS getDay(): 0=Sun, 1=Mon...
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const cells: (DayInfo | null)[] = [...Array(offset).fill(null), ...days];
  while (cells.length % 7 !== 0) cells.push(null);

  const isToday = (d: DayInfo) =>
    d.date.getUTCFullYear() === today.getFullYear() &&
    d.date.getUTCMonth() === today.getMonth() &&
    d.date.getUTCDate() === today.getDate();

  const handlePress = (d: DayInfo) => {
    const yy = d.date.getUTCFullYear();
    const mm = String(d.date.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.date.getUTCDate()).padStart(2, '0');
    router.push(`/day/${yy}-${mm}-${dd}`);
  };

  return (
    <View style={styles.container}>
      {/* Month navigation header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onPrevMonth} style={styles.navBtn}>
          <Text style={styles.navArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthName}>
          {MONTH_NAMES[month]} {year}
        </Text>
        <TouchableOpacity onPress={onNextMonth} style={styles.navBtn}>
          <Text style={styles.navArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Weekday labels */}
      <View style={styles.row}>
        {WEEKDAYS.map((d) => (
          <View key={d} style={[styles.cell, { width: CELL_SIZE, height: CELL_SIZE * 0.7 }]}>
            <Text style={styles.weekdayLabel}>{d}</Text>
          </View>
        ))}
      </View>

      {/* Day grid */}
      {chunk(cells, 7).map((row, ri) => (
        <View key={ri} style={styles.row}>
          {row.map((cell, ci) => {
            if (!cell) {
              return (
                <View
                  key={ci}
                  style={[styles.cell, { width: CELL_SIZE, height: CELL_SIZE }]}
                />
              );
            }
            const cfg = DAY_TYPE_CONFIG[cell.dayType];
            const today_ = isToday(cell);
            return (
              <TouchableOpacity
                key={ci}
                activeOpacity={0.7}
                style={[
                  styles.cell,
                  {
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: cfg.bg,
                    borderRadius: 6,
                  },
                  today_ && { borderWidth: 2, borderColor: cfg.color },
                ]}
                onPress={() => handlePress(cell)}
              >
                <Text style={styles.dayEmoji}>{cfg.emoji}</Text>
                <Text style={[styles.dayNumber, { color: cfg.color }, today_ && styles.bold]}>
                  {cell.date.getUTCDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      {/* Legend */}
      <View style={styles.legend}>
        {(Object.entries(DAY_TYPE_CONFIG) as [string, typeof DAY_TYPE_CONFIG[keyof typeof DAY_TYPE_CONFIG]][]).map(
          ([, val]) => (
            <View key={val.label} style={styles.legendItem}>
              <Text style={styles.legendEmoji}>{val.emoji}</Text>
              <Text style={[styles.legendLabel, { color: val.color }]}>{val.label}</Text>
            </View>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  navBtn: {
    padding: 8,
  },
  navArrow: {
    fontSize: 28,
    color: '#555',
    lineHeight: 32,
  },
  monthName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
  },
  weekdayLabel: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
  },
  dayEmoji: {
    fontSize: 13,
  },
  dayNumber: {
    fontSize: 11,
    fontWeight: '600',
  },
  bold: {
    fontWeight: '900',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  legendItem: {
    alignItems: 'center',
  },
  legendEmoji: {
    fontSize: 16,
  },
  legendLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});
