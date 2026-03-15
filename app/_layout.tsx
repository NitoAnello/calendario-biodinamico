import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#FAFAFA' },
          headerTintColor: '#333',
          headerTitleStyle: { fontWeight: '700' },
          headerBackTitle: 'Atrás',
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'Calendario Biodinámico' }}
        />
        <Stack.Screen
          name="day/[date]"
          options={{ title: 'Detalle del Día' }}
        />
      </Stack>
    </>
  );
}
