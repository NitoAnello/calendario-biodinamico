import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getDayInfo, getMonthInfo } from '../lib/biodinamica';
import { DayTypeCard } from '../components/DayTypeCard';
import { MoonStatus } from '../components/MoonStatus';
import { MonthCalendar } from '../components/MonthCalendar';

export default function HomeScreen() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const todayInfo = useMemo(() => getDayInfo(today), []);
  const monthDays = useMemo(() => getMonthInfo(year, month), [year, month]);

  const prevMonth = () => {
    if (month === 0) { setYear((y) => y - 1); setMonth(11); }
    else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setYear((y) => y + 1); setMonth(0); }
    else setMonth((m) => m + 1);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DayTypeCard
        dayType={todayInfo.dayType}
        constellation={todayInfo.constellation}
        displayDate={today}
      />
      <MoonStatus
        ascending={todayInfo.ascending}
        moonPhase={todayInfo.moonPhase}
      />
      <MonthCalendar
        year={year}
        month={month}
        days={monthDays}
        today={today}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />
    </ScrollView>
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
});
