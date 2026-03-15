import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DayType } from '../lib/biodinamica';
import { DAY_TYPE_CONFIG } from '../lib/theme';

interface Props {
  dayType: DayType;
  constellation: string;
  displayDate: Date;
}

export function DayTypeCard({ dayType, constellation, displayDate }: Props) {
  const cfg = DAY_TYPE_CONFIG[dayType];

  const dayName = displayDate.toLocaleDateString('es-AR', { weekday: 'long' });
  const dateStr = displayDate.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={[styles.card, { backgroundColor: cfg.bg, borderColor: cfg.color }]}>
      <Text style={styles.dateLabel}>
        {dayName.charAt(0).toUpperCase() + dayName.slice(1)}, {dateStr}
      </Text>
      <Text style={styles.emoji}>{cfg.emoji}</Text>
      <Text style={[styles.typeName, { color: cfg.color }]}>
        {cfg.label.toUpperCase()}
      </Text>
      <Text style={[styles.constellation, { color: cfg.color }]}>
        Luna en {constellation}
      </Text>
      <Text style={styles.description}>{cfg.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 2,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  dateLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  typeName: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 4,
  },
  constellation: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});
