// src/screens/ScheduleScreen.js
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { SCHEDULE_TODAY } from '../data/mockData';

const { width } = Dimensions.get('window');

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function WeekCalendar({ selectedDay, onDaySelect }) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  return (
    <View style={styles.weekCalendar}>
      <View style={styles.weekHeader}>
        <TouchableOpacity style={styles.weekNavBtn}>
          <Ionicons name="chevron-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.monthLabel}>
          {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Text>
        <TouchableOpacity style={styles.weekNavBtn}>
          <Ionicons name="chevron-forward" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.daysRow}>
        {days.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString();
          const isSelected = selectedDay === i;

          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.dayCell,
                isSelected && styles.dayCellSelected,
                isToday && !isSelected && styles.dayCellToday,
              ]}
              onPress={() => onDaySelect(i)}
            >
              <Text style={[
                styles.dayName,
                isSelected && styles.dayNameSelected,
              ]}>
                {DAYS[i]}
              </Text>
              <Text style={[
                styles.dayNum,
                isSelected && styles.dayNumSelected,
                isToday && !isSelected && styles.dayNumToday,
              ]}>
                {d.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function ScheduleBlock({ item }) {
  return (
    <View style={[styles.schedBlock, { backgroundColor: item.color, borderLeftColor: item.borderColor }]}>
      <View style={styles.schedBlockLeft}>
        <Text style={styles.schedCourse}>{item.courseName}</Text>
        <Text style={styles.schedTopic} numberOfLines={1}>{item.topic}</Text>
        <View style={styles.schedMeta}>
          <Ionicons name="location-outline" size={11} color={COLORS.textSecondary} />
          <Text style={styles.schedMetaText}>{item.room}</Text>
          <Text style={styles.schedMetaDot}> · </Text>
          <Ionicons name="person-outline" size={11} color={COLORS.textSecondary} />
          <Text style={styles.schedMetaText}>{item.professor}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.schedBellBtn}>
        <Ionicons name="notifications-outline" size={16} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

export default function ScheduleScreen({ navigation }) {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today.getDay());

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.bigDate}>
          {String(today.getDate()).padStart(2, '0')}
        </Text>
        <View style={styles.headerRight}>
          <Text style={styles.dayOfWeek}>
            {today.toLocaleDateString('en-US', { weekday: 'short' })}
          </Text>
          <Text style={styles.monthYear}>
            {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Week Calendar */}
      <WeekCalendar selectedDay={selectedDay} onDaySelect={setSelectedDay} />

      {/* Schedule Label */}
      <View style={styles.scheduleLabel}>
        <Text style={styles.scheduleLabelText}>
          {DAY_NAMES[selectedDay]}'s Schedule
        </Text>
        <Text style={styles.scheduleCount}>{SCHEDULE_TODAY.length} classes</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {SCHEDULE_TODAY.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color={COLORS.lightGray} />
            <Text style={styles.emptyText}>No classes today</Text>
            <Text style={styles.emptySubtext}>Enjoy your free time!</Text>
          </View>
        ) : (
          SCHEDULE_TODAY.map(item => (
            <View key={item.id} style={styles.schedRow}>
              <View style={styles.timeCol}>
                <Text style={styles.schedTimeStart}>{item.startTime}</Text>
                <View style={styles.schedTimeLine} />
                <Text style={styles.schedTimeEnd}>{item.endTime}</Text>
              </View>
              <ScheduleBlock item={item} />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 10,
  },
  bigDate: { fontSize: 36, fontWeight: '900', color: COLORS.primary },
  headerRight: { flex: 1 },
  dayOfWeek: { fontSize: 12, fontWeight: '700', color: COLORS.textSecondary },
  monthYear: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  iconBtn: { padding: 4 },
  weekCalendar: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekNavBtn: { padding: 6 },
  monthLabel: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dayCell: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    minWidth: 38,
  },
  dayCellSelected: { backgroundColor: COLORS.primary },
  dayCellToday: { backgroundColor: COLORS.primarySoft },
  dayName: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600', marginBottom: 4 },
  dayNameSelected: { color: COLORS.white },
  dayNum: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  dayNumSelected: { color: COLORS.white },
  dayNumToday: { color: COLORS.primary },
  scheduleLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  scheduleLabelText: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  scheduleCount: { fontSize: 12, color: COLORS.textSecondary },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  schedRow: { flexDirection: 'row', marginBottom: 14, gap: 10 },
  timeCol: { alignItems: 'center', width: 46, paddingTop: 4 },
  schedTimeStart: { fontSize: 11, fontWeight: '700', color: COLORS.text },
  schedTimeLine: {
    flex: 1,
    width: 2,
    backgroundColor: COLORS.lightGray,
    marginVertical: 4,
    minHeight: 30,
  },
  schedTimeEnd: { fontSize: 11, color: COLORS.textSecondary },
  schedBlock: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 16,
    padding: 14,
    borderLeftWidth: 4,
    ...SHADOWS.small,
  },
  schedBlockLeft: { flex: 1 },
  schedCourse: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  schedTopic: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 8 },
  schedMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 2 },
  schedMetaText: { fontSize: 10, color: COLORS.textSecondary },
  schedMetaDot: { fontSize: 10, color: COLORS.textMuted },
  schedBellBtn: { padding: 4 },
  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyText: { fontSize: 16, fontWeight: '600', color: COLORS.gray },
  emptySubtext: { fontSize: 13, color: COLORS.textMuted },
});
