import React, { useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getDayInfo } from '../../lib/biodinamica';
import { DayTypeCard } from '../../components/DayTypeCard';
import { MoonStatus } from '../../components/MoonStatus';
import { DAY_TYPE_CONFIG, getMoonPhaseName } from '../../lib/theme';

export default function DayDetailScreen() {
  const { date: dateStr } = useLocalSearchParams<{ date: string }>();

  const displayDate = useMemo(() => {
    if (!dateStr) return new Date();
    const [y, m, d] = (dateStr as string).split('-').map(Number);
    return new Date(y, m - 1, d);
  }, [dateStr]);

  const info = useMemo(() => getDayInfo(displayDate), [displayDate]);
  const cfg = DAY_TYPE_CONFIG[info.dayType];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DayTypeCard
        dayType={info.dayType}
        constellation={info.constellation}
        displayDate={displayDate}
      />
      <MoonStatus ascending={info.ascending} moonPhase={info.moonPhase} />

      {/* Astronomical detail */}
      <View style={[styles.detail, { borderColor: cfg.color }]}>
        <Text style={[styles.detailTitle, { color: cfg.color }]}>
          Datos Astronómicos
        </Text>
        <Row label="Constelación" value={info.constellation} />
        <Row label="Tipo de día" value={cfg.label} />
        <Row
          label="Luna"
          value={info.ascending ? 'Ascendente ↑' : 'Descendente ↓'}
        />
        <Row label="Fase lunar" value={`${getMoonPhaseName(info.moonPhase)} (${Math.round(info.moonPhase)}°)`} />
        <Row
          label="Iluminación"
          value={`${Math.round(info.moonIllumination * 100)} %`}
        />
        <Row
          label="Long. sidérea"
          value={`${info.siderealLon.toFixed(1)} °`}
        />
      </View>
    </ScrollView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    paddingVertical: 16,
    paddingBottom: 48,
  },
  detail: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 16,
    backgroundColor: '#FFF',
  },
  detailTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rowLabel: {
    fontSize: 14,
    color: '#666',
  },
  rowValue: {
    fontSize: 14,
    color: '#222',
    fontWeight: '600',
  },
});
