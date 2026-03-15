import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getMoonPhaseEmoji, getMoonPhaseName } from '../lib/theme';

interface Props {
  ascending: boolean;
  moonPhase: number;
}

export function MoonStatus({ ascending, moonPhase }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.emoji}>{getMoonPhaseEmoji(moonPhase)}</Text>
        <Text style={styles.label}>{getMoonPhaseName(moonPhase)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.item}>
        <Text style={styles.arrow}>{ascending ? '↑' : '↓'}</Text>
        <Text style={styles.label}>
          Luna {ascending ? 'Ascendente' : 'Descendente'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  item: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    height: 44,
    backgroundColor: '#DDD',
  },
  emoji: {
    fontSize: 30,
    marginBottom: 4,
  },
  arrow: {
    fontSize: 30,
    marginBottom: 4,
    color: '#444',
  },
  label: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
    fontWeight: '500',
  },
});
