/**
 * Stub del Planificador — fase futura.
 * No implementado en el MVP.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlanificadorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🌱</Text>
      <Text style={styles.title}>Planificador</Text>
      <Text style={styles.subtitle}>Próximamente</Text>
      <Text style={styles.desc}>
        Aquí podrás planificar tus actividades de siembra, poda y cosecha
        según el calendario biodinámico.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#FAFAFA',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  desc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});
