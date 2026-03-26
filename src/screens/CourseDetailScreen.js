// src/screens/CourseDetailScreen.js
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';

function getGradeColor(grade) {
  if (!grade) return COLORS.gray;
  const g = grade.replace('+', '').replace('-', '');
  if (g === 'A') return COLORS.gradeA;
  if (g === 'B') return COLORS.gradeB;
  if (g === 'C') return COLORS.gradeC;
  if (g === 'D') return COLORS.gradeD;
  if (g === 'F') return COLORS.gradeF;
  return COLORS.gray;
}

export default function CourseDetailScreen({ navigation, route }) {
  const { course } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Hero Header */}
      <View style={[styles.hero, { backgroundColor: course.color }]}>
        <View style={[styles.heroBorder, { borderColor: course.borderColor }]} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.heroContent}>
          <View style={[styles.heroColorDot, { backgroundColor: course.borderColor }]} />
          <Text style={styles.heroTitle}>{course.name}</Text>
          <Text style={styles.heroCode}>{course.code}</Text>
        </View>
        {course.grade && (
          <View style={[styles.gradeBadge, { backgroundColor: getGradeColor(course.grade) }]}>
            <Text style={styles.gradeBadgeText}>{course.grade}</Text>
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* Quick Info */}
        <View style={styles.quickInfoRow}>
          <View style={styles.infoChip}>
            <Ionicons name="person-outline" size={14} color={COLORS.primary} />
            <Text style={styles.infoChipText}>{course.professor}</Text>
          </View>
          <View style={styles.infoChip}>
            <Ionicons name="location-outline" size={14} color={COLORS.primary} />
            <Text style={styles.infoChipText}>{course.room}</Text>
          </View>
          <View style={styles.infoChip}>
            <Ionicons name="school-outline" size={14} color={COLORS.primary} />
            <Text style={styles.infoChipText}>{course.units} units</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About this Course</Text>
          <Text style={styles.description}>{course.description}</Text>
        </View>

        {/* Schedule */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Schedule</Text>
          {course.schedule.map((s, i) => (
            <View key={i} style={styles.scheduleRow}>
              <View style={[styles.dayBadge, { backgroundColor: COLORS.primarySoft }]}>
                <Text style={[styles.dayText, { color: COLORS.primary }]}>{s.day}</Text>
              </View>
              <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.schedTime}>{s.time}</Text>
            </View>
          ))}
        </View>

        {/* Topics */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Key Topics</Text>
          <View style={styles.topicsGrid}>
            {course.topics.map((topic, i) => (
              <View key={i} style={[styles.topicChip, { borderColor: course.borderColor + '55' }]}>
                <Text style={[styles.topicText, { color: course.borderColor }]}>{topic}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Ask AI Button */}
        <TouchableOpacity
          style={[styles.askAiBtn, { borderColor: COLORS.primary + '44' }]}
          onPress={() => navigation.navigate('AIAssistant')}
          activeOpacity={0.85}
        >
          <Ionicons name="sparkles" size={18} color={COLORS.primary} />
          <Text style={styles.askAiText}>Ask KM AI about {course.name}</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  hero: {
    padding: 20,
    paddingTop: 14,
    position: 'relative',
    overflow: 'hidden',
  },
  heroBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: 'transparent',
    borderLeftWidth: 6,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroContent: {},
  heroColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  heroTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  heroCode: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '600' },
  gradeBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeBadgeText: { fontSize: 18, fontWeight: '900', color: COLORS.white },
  quickInfoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoChipText: { fontSize: 12, color: COLORS.text, fontWeight: '600' },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    ...SHADOWS.small,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  description: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20 },
  scheduleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  dayBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    minWidth: 44,
    alignItems: 'center',
  },
  dayText: { fontSize: 12, fontWeight: '700' },
  schedTime: { fontSize: 13, color: COLORS.text, fontWeight: '500' },
  topicsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  topicChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    backgroundColor: COLORS.background,
  },
  topicText: { fontSize: 12, fontWeight: '600' },
  askAiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 4,
    backgroundColor: COLORS.primarySoft,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    gap: 10,
  },
  askAiText: { flex: 1, fontSize: 14, color: COLORS.primary, fontWeight: '600' },
});
