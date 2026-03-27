// src/screens/ScheduleScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { WEEKLY_SCHEDULE } from '../data/mockData';

const { width } = Dimensions.get('window');
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_LETTER = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function getWeekDates(baseDate) {
  const start = new Date(baseDate);
  start.setDate(baseDate.getDate() - baseDate.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function ScheduleBlock({ item, onBell }) {
  return (
    <View style={[styles.schedBlock, { backgroundColor: item.color, borderLeftColor: item.borderColor }]}>
      <View style={styles.schedBlockLeft}>
        <Text style={styles.schedCode}>{item.code}</Text>
        <Text style={styles.schedCourse}>{item.courseName}</Text>
        <Text style={styles.schedTopic} numberOfLines={1}>{item.topic}</Text>
        <View style={styles.schedMeta}>
          <Ionicons name="location-outline" size={11} color={COLORS.textSecondary} />
          <Text style={styles.schedMetaText}>{item.room}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.schedBellBtn} onPress={onBell}>
        <Ionicons name="notifications-outline" size={16} color={item.borderColor} />
      </TouchableOpacity>
    </View>
  );
}

export default function ScheduleScreen({ navigation }) {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today.getDay());
  const [weekOffset, setWeekOffset] = useState(0);

  // Compute base date for current week offset
  const baseDate = new Date(today);
  baseDate.setDate(today.getDate() + weekOffset * 7);
  const weekDates = getWeekDates(baseDate);

  const selectedDate = weekDates[selectedDay];
  const todaySchedule = WEEKLY_SCHEDULE[selectedDay] || [];

  const goToPrevWeek = () => setWeekOffset(w => w - 1);
  const goToNextWeek = () => setWeekOffset(w => w + 1);

  const handleBell = (item) => {
    Alert.alert(
      '🔔 Reminder Set',
      `You will be reminded 15 minutes before ${item.courseName} at ${item.startTime}.`,
      [{ text: 'OK' }]
    );
  };

  const isToday = (date) => date.toDateString() === today.toDateString();

  const monthLabel = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.bigDate}>{String(selectedDate.getDate()).padStart(2, '0')}</Text>
          <Text style={styles.dayName}>{DAYS_SHORT[selectedDay]}, {monthLabel}</Text>
        </View>
        <TouchableOpacity
          style={styles.notifBtn}
          onPress={() => Alert.alert('Notifications', 'All class reminders are active ✅')}
        >
          <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      {/* Week Navigator */}
      <View style={styles.weekNav}>
        <TouchableOpacity style={styles.weekNavBtn} onPress={goToPrevWeek}>
          <Ionicons name="chevron-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.weekLabel}>
          {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} –{' '}
          {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Text>
        <TouchableOpacity style={styles.weekNavBtn} onPress={goToNextWeek}>
          <Ionicons name="chevron-forward" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Day Selector */}
      <View style={styles.daysRow}>
        {weekDates.map((date, i) => {
          const isTodayDate = isToday(date);
          const isSelected = selectedDay === i;
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.dayCell,
                isSelected && styles.dayCellSelected,
                isTodayDate && !isSelected && styles.dayCellToday,
              ]}
              onPress={() => setSelectedDay(i)}
            >
              <Text style={[styles.dayLetter, isSelected && styles.dayLetterSelected]}>
                {DAYS_LETTER[i]}
              </Text>
              <Text style={[
                styles.dayNum,
                isSelected && styles.dayNumSelected,
                isTodayDate && !isSelected && styles.dayNumToday,
              ]}>
                {date.getDate()}
              </Text>
              {(WEEKLY_SCHEDULE[i] || []).length > 0 && (
                <View style={[styles.hasDot, { backgroundColor: isSelected ? COLORS.white : COLORS.primary }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Schedule count */}
      <View style={styles.scheduleLabel}>
        <Text style={styles.scheduleLabelText}>
          {DAYS_SHORT[selectedDay]}'s Schedule
        </Text>
        <Text style={styles.scheduleCount}>{todaySchedule.length} class{todaySchedule.length !== 1 ? 'es' : ''}</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {todaySchedule.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎉</Text>
            <Text style={styles.emptyText}>No classes today!</Text>
            <Text style={styles.emptySubtext}>Enjoy your free time or get ahead on tasks.</Text>
          </View>
        ) : (
          todaySchedule.map(item => (
            <View key={item.id} style={styles.schedRow}>
              <View style={styles.timeCol}>
                <Text style={styles.schedTimeStart}>{item.startTime}</Text>
                <View style={styles.schedTimeLine} />
                <Text style={styles.schedTimeEnd}>{item.endTime}</Text>
              </View>
              <ScheduleBlock item={item} onBell={() => handleBell(item)} />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 14, backgroundColor: COLORS.white,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  bigDate: { fontSize: 36, fontWeight: '900', color: COLORS.primary },
  dayName: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  notifBtn: { position: 'relative', padding: 6 },
  notifDot: { position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.error },
  weekNav: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 10, backgroundColor: COLORS.white,
  },
  weekNavBtn: { padding: 6, borderRadius: 20, backgroundColor: COLORS.background },
  weekLabel: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  daysRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12,
    paddingBottom: 12, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  dayCell: { alignItems: 'center', padding: 6, borderRadius: 14, minWidth: 40 },
  dayCellSelected: { backgroundColor: COLORS.primary },
  dayCellToday: { backgroundColor: COLORS.primarySoft },
  dayLetter: { fontSize: 10, color: COLORS.textMuted, fontWeight: '700', marginBottom: 4 },
  dayLetterSelected: { color: COLORS.white },
  dayNum: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  dayNumSelected: { color: COLORS.white },
  dayNumToday: { color: COLORS.primary },
  hasDot: { width: 4, height: 4, borderRadius: 2, marginTop: 3 },
  scheduleLabel: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 12,
  },
  scheduleLabelText: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  scheduleCount: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '600' },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  schedRow: { flexDirection: 'row', marginBottom: 14, gap: 10 },
  timeCol: { alignItems: 'center', width: 46, paddingTop: 4 },
  schedTimeStart: { fontSize: 11, fontWeight: '700', color: COLORS.text },
  schedTimeLine: { flex: 1, width: 2, backgroundColor: COLORS.lightGray, marginVertical: 4, minHeight: 24 },
  schedTimeEnd: { fontSize: 11, color: COLORS.textSecondary },
  schedBlock: {
    flex: 1, flexDirection: 'row', borderRadius: 16, padding: 14, borderLeftWidth: 4, ...SHADOWS.small,
  },
  schedBlockLeft: { flex: 1 },
  schedCode: { fontSize: 10, fontWeight: '700', color: COLORS.textSecondary, marginBottom: 2 },
  schedCourse: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  schedTopic: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 8 },
  schedMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  schedMetaText: { fontSize: 10, color: COLORS.textSecondary },
  schedBellBtn: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.white,
    alignItems: 'center', justifyContent: 'center', ...SHADOWS.small,
  },
  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyEmoji: { fontSize: 48 },
  emptyText: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  emptySubtext: { fontSize: 13, color: COLORS.textMuted, textAlign: 'center' },
});
