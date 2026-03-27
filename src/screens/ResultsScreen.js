// src/screens/ResultsScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { COURSES, GRADE_BREAKDOWN, USER } from '../data/mockData';

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

function GradeBreakdownModal({ course, visible, onClose }) {
  if (!course) return null;
  const breakdown = GRADE_BREAKDOWN[course.id];
  if (!breakdown) return null;
  const gradeColor = getGradeColor(course.grade);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={[styles.modalHeader, { borderLeftColor: course.borderColor }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.modalCode}>{course.code}</Text>
              <Text style={styles.modalCourse}>{course.name}</Text>
            </View>
            <View style={[styles.gradeBig, { backgroundColor: gradeColor }]}>
              <Text style={styles.gradeBigText}>{course.grade}</Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Period Grades */}
            <Text style={styles.breakdownSection}>📊 Period Grades</Text>
            <View style={styles.periodRow}>
              <View style={[styles.periodCard, { backgroundColor: '#E8F8EF' }]}>
                <Text style={styles.periodLabel}>Prelim</Text>
                <Text style={[styles.periodValue, { color: COLORS.gradeA }]}>{breakdown.prelim}</Text>
              </View>
              <View style={[styles.periodCard, { backgroundColor: '#EBF5FB' }]}>
                <Text style={styles.periodLabel}>Midterm</Text>
                <Text style={[styles.periodValue, { color: COLORS.gradeB }]}>{breakdown.midterm}</Text>
              </View>
              <View style={[styles.periodCard, { backgroundColor: '#F4ECF7' }]}>
                <Text style={styles.periodLabel}>Finals</Text>
                <Text style={[styles.periodValue, { color: COLORS.gray }]}>
                  {breakdown.finals ?? 'TBA'}
                </Text>
              </View>
            </View>

            {/* Activities */}
            <Text style={styles.breakdownSection}>📝 Activities</Text>
            <View style={styles.scoresRow}>
              {breakdown.activities.map((score, i) => (
                <View key={i} style={styles.scoreChip}>
                  <Text style={styles.scoreChipLabel}>Act {i + 1}</Text>
                  <Text style={[styles.scoreChipValue, { color: score >= 90 ? COLORS.gradeA : score >= 80 ? COLORS.gradeB : COLORS.gradeC }]}>
                    {score}
                  </Text>
                  <View style={styles.scoreBar}>
                    <View style={[styles.scoreBarFill, { width: `${score}%`, backgroundColor: score >= 90 ? COLORS.gradeA : score >= 80 ? COLORS.gradeB : COLORS.gradeC }]} />
                  </View>
                </View>
              ))}
            </View>

            {/* Quizzes */}
            <Text style={styles.breakdownSection}>📋 Quizzes</Text>
            <View style={styles.scoresRow}>
              {breakdown.quizzes.map((score, i) => (
                <View key={i} style={styles.scoreChip}>
                  <Text style={styles.scoreChipLabel}>Quiz {i + 1}</Text>
                  <Text style={[styles.scoreChipValue, { color: score >= 90 ? COLORS.gradeA : score >= 80 ? COLORS.gradeB : COLORS.gradeC }]}>
                    {score}
                  </Text>
                  <View style={styles.scoreBar}>
                    <View style={[styles.scoreBarFill, { width: `${score}%`, backgroundColor: score >= 90 ? COLORS.gradeA : score >= 80 ? COLORS.gradeB : COLORS.gradeC }]} />
                  </View>
                </View>
              ))}
            </View>

            {/* Average */}
            const avg = Math.round((breakdown.prelim + breakdown.midterm + breakdown.activities.reduce((a, b) => a + b, 0) / breakdown.activities.length + breakdown.quizzes.reduce((a, b) => a + b, 0) / breakdown.quizzes.length) / 4);
            <View style={styles.avgRow}>
              <Text style={styles.avgLabel}>Running Average</Text>
              <Text style={[styles.avgValue, { color: gradeColor }]}>
                {Math.round((breakdown.prelim + breakdown.midterm) / 2)}
              </Text>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function CourseGradeRow({ course, onPress }) {
  const gradeColor = getGradeColor(course.grade);
  const breakdown = GRADE_BREAKDOWN[course.id];
  const avg = breakdown ? Math.round((breakdown.prelim + breakdown.midterm) / 2) : 0;

  return (
    <TouchableOpacity style={styles.gradeRow} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.gradeColorAccent, { backgroundColor: course.borderColor }]} />
      <View style={styles.gradeInfo}>
        <Text style={styles.gradeCode}>{course.code}</Text>
        <Text style={styles.gradeCourse}>{course.name}</Text>
        <View style={styles.gradeBarTrack}>
          <View style={[styles.gradeBarFill, { width: `${avg}%`, backgroundColor: gradeColor }]} />
        </View>
        <Text style={styles.gradeAvg}>Running avg: {avg}/100 · Tap to view breakdown</Text>
      </View>
      <View style={[styles.gradeBadge, { backgroundColor: gradeColor + '22' }]}>
        <Text style={[styles.gradeText, { color: gradeColor }]}>{course.grade}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ResultsScreen() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openBreakdown = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Results</Text>
        </View>

        {/* GPA Card */}
        <View style={styles.gpaCard}>
          <View style={styles.gpaDecorCircle1} />
          <View style={styles.gpaDecorCircle2} />
          <View style={styles.gpaHeader}>
            <View>
              <Text style={styles.gpaLabel}>Overall CGPA</Text>
              <Text style={styles.gpaValue}>{USER.gpa.toFixed(2)}</Text>
            </View>
            <View style={styles.semLabel}>
              <Text style={styles.semText}>2nd Sem SY 2025-2026</Text>
            </View>
          </View>
          <View style={styles.gpaStats}>
            <View style={styles.gpaStatItem}>
              <Text style={styles.gpaStatValue}>{USER.creditsEarned}/{USER.totalCredits}</Text>
              <Text style={styles.gpaStatLabel}>Credits Earned</Text>
            </View>
            <View style={styles.gpaStatDivider} />
            <View style={styles.gpaStatItem}>
              <Text style={styles.gpaStatValue}>{COURSES.length}</Text>
              <Text style={styles.gpaStatLabel}>Courses</Text>
            </View>
            <View style={styles.gpaStatDivider} />
            <View style={styles.gpaStatItem}>
              <Text style={styles.gpaStatValue}>{COURSES.filter(c => c.grade && c.grade !== 'F').length}</Text>
              <Text style={styles.gpaStatLabel}>Passing</Text>
            </View>
          </View>
          <View style={styles.creditTrackContainer}>
            <Text style={styles.creditTrackLabel}>Credit Progress: {USER.creditsEarned}/{USER.totalCredits}</Text>
            <View style={styles.creditTrack}>
              <View style={[styles.creditFill, { width: `${(USER.creditsEarned / USER.totalCredits) * 100}%` }]} />
            </View>
          </View>
        </View>

        {/* Tap hint */}
        <View style={styles.hintRow}>
          <Ionicons name="information-circle-outline" size={14} color={COLORS.textMuted} />
          <Text style={styles.hintText}>Tap any course to view grade breakdown</Text>
        </View>

        {/* Course grades */}
        <View style={styles.gradesList}>
          {COURSES.map(course => (
            <CourseGradeRow key={course.id} course={course} onPress={() => openBreakdown(course)} />
          ))}
        </View>
      </ScrollView>

      <GradeBreakdownModal
        course={selectedCourse}
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
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
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  gpaCard: {
    margin: 16, backgroundColor: COLORS.primary, borderRadius: 20,
    padding: 22, overflow: 'hidden', ...SHADOWS.large,
  },
  gpaDecorCircle1: { position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(255,255,255,0.1)' },
  gpaDecorCircle2: { position: 'absolute', bottom: -30, left: -30, width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.07)' },
  gpaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  gpaLabel: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 4 },
  gpaValue: { fontSize: 40, fontWeight: '900', color: COLORS.white },
  semLabel: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  semText: { fontSize: 10, color: COLORS.white, fontWeight: '600' },
  gpaStats: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 14, paddingVertical: 14, marginBottom: 16 },
  gpaStatItem: { flex: 1, alignItems: 'center' },
  gpaStatValue: { fontSize: 18, fontWeight: '800', color: COLORS.white },
  gpaStatLabel: { fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  gpaStatDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  creditTrackContainer: {},
  creditTrackLabel: { fontSize: 11, color: 'rgba(255,255,255,0.75)', marginBottom: 6 },
  creditTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3 },
  creditFill: { height: 6, backgroundColor: COLORS.white, borderRadius: 3 },
  hintRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 20, paddingBottom: 8 },
  hintText: { fontSize: 11, color: COLORS.textMuted },
  gradesList: { paddingHorizontal: 16, gap: 8 },
  gradeRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white,
    borderRadius: 14, padding: 14, ...SHADOWS.small,
  },
  gradeColorAccent: { width: 4, height: 44, borderRadius: 2, marginRight: 12 },
  gradeInfo: { flex: 1 },
  gradeCode: { fontSize: 10, fontWeight: '700', color: COLORS.textMuted, marginBottom: 2 },
  gradeCourse: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 6 },
  gradeBarTrack: { height: 4, backgroundColor: COLORS.lightGray, borderRadius: 2, marginBottom: 4 },
  gradeBarFill: { height: 4, borderRadius: 2 },
  gradeAvg: { fontSize: 10, color: COLORS.textMuted },
  gradeBadge: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, marginLeft: 10, alignItems: 'center' },
  gradeText: { fontSize: 16, fontWeight: '900' },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalCard: {
    backgroundColor: COLORS.white, borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 24, maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center', borderLeftWidth: 4,
    paddingLeft: 12, marginBottom: 20,
  },
  modalCode: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted },
  modalCourse: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginTop: 2 },
  gradeBig: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  gradeBigText: { fontSize: 20, fontWeight: '900', color: COLORS.white },
  breakdownSection: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 10, marginTop: 4 },
  periodRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  periodCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 14 },
  periodLabel: { fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 },
  periodValue: { fontSize: 22, fontWeight: '900' },
  scoresRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  scoreChip: { backgroundColor: COLORS.background, borderRadius: 12, padding: 12, minWidth: 80, alignItems: 'center' },
  scoreChipLabel: { fontSize: 10, color: COLORS.textMuted, marginBottom: 4 },
  scoreChipValue: { fontSize: 18, fontWeight: '800', marginBottom: 6 },
  scoreBar: { width: 50, height: 4, backgroundColor: COLORS.lightGray, borderRadius: 2 },
  scoreBarFill: { height: 4, borderRadius: 2 },
  avgRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.background, borderRadius: 14, padding: 16, marginTop: 4, marginBottom: 16,
  },
  avgLabel: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  avgValue: { fontSize: 24, fontWeight: '900' },
  closeBtn: {
    backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 14,
    alignItems: 'center', marginTop: 8,
  },
  closeBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
});
