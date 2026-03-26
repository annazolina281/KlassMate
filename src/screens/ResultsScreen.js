// src/screens/ResultsScreen.js
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { COURSES, USER } from '../data/mockData';

const { width } = Dimensions.get('window');

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

function GradeBar({ grade }) {
  const gradeMap = { 'A+': 100, A: 95, 'A-': 90, 'B+': 87, B: 83, 'B-': 80, 'C+': 77, C: 73, 'C-': 70, D: 60, F: 0 };
  const pct = (gradeMap[grade] ?? 50) / 100;
  const color = getGradeColor(grade);

  return (
    <View style={styles.gradeBarTrack}>
      <View style={[styles.gradeBarFill, { width: `${pct * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

function CourseGradeRow({ course }) {
  const gradeColor = getGradeColor(course.grade);
  return (
    <View style={styles.gradeRow}>
      <View style={[styles.gradeColorAccent, { backgroundColor: course.borderColor }]} />
      <View style={styles.gradeInfo}>
        <Text style={styles.gradeCourse}>{course.name}</Text>
        <GradeBar grade={course.grade} />
        <Text style={styles.gradeCode}>{course.code}</Text>
      </View>
      <View style={[styles.gradeBadge, { backgroundColor: gradeColor + '22' }]}>
        <Text style={[styles.gradeText, { color: gradeColor }]}>{course.grade}</Text>
      </View>
    </View>
  );
}

export default function ResultsScreen({ navigation }) {
  const [semester, setSemester] = useState('Semester 1');
  const semesters = ['Semester 1', 'Semester 2', '1st Sem 2025'];

  const completedCourses = COURSES.filter(c => c.grade);
  const passedCourses = completedCourses.filter(c => c.grade && c.grade !== 'F');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Grades</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* GPA Card */}
        <View style={styles.gpaCard}>
          {/* Decorative circles */}
          <View style={styles.gpaDecorCircle1} />
          <View style={styles.gpaDecorCircle2} />

          <View style={styles.gpaHeader}>
            <View>
              <Text style={styles.gpaLabel}>Overall CGPA</Text>
              <Text style={styles.gpaValue}>{USER.gpa.toFixed(2)}</Text>
            </View>
            <View style={styles.semesterSelector}>
              <Text style={styles.semesterText}>{semester}</Text>
              <Ionicons name="chevron-down" size={14} color={COLORS.white} />
            </View>
          </View>

          <View style={styles.gpaStats}>
            <View style={styles.gpaStatItem}>
              <Text style={styles.gpaStatValue}>{USER.creditsEarned}/{USER.totalCredits}</Text>
              <Text style={styles.gpaStatLabel}>Credits earned</Text>
            </View>
            <View style={styles.gpaStatDivider} />
            <View style={styles.gpaStatItem}>
              <Text style={styles.gpaStatValue}>{completedCourses.length}</Text>
              <Text style={styles.gpaStatLabel}>Courses taken</Text>
            </View>
            <View style={styles.gpaStatDivider} />
            <View style={styles.gpaStatItem}>
              <Text style={styles.gpaStatValue}>{passedCourses.length}</Text>
              <Text style={styles.gpaStatLabel}>Passed</Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.creditsProgress}>
            <Text style={styles.creditsProgressLabel}>
              Credit Progress: {USER.creditsEarned}/{USER.totalCredits}
            </Text>
            <View style={styles.creditTrack}>
              <View
                style={[
                  styles.creditFill,
                  { width: `${(USER.creditsEarned / USER.totalCredits) * 100}%` }
                ]}
              />
            </View>
          </View>
        </View>

        {/* Grade heading */}
        <View style={styles.gradesHeader}>
          <Text style={styles.gradesTitle}>
            <Text style={styles.gradesTitleBold}>Grades: </Text>
            Final Grades ▾
          </Text>
        </View>

        {/* Course grades */}
        <View style={styles.gradesList}>
          {COURSES.map(course => (
            <CourseGradeRow key={course.id} course={course} />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  iconBtn: { padding: 4 },
  gpaCard: {
    margin: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 22,
    overflow: 'hidden',
    ...SHADOWS.large,
  },
  gpaDecorCircle1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  gpaDecorCircle2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  gpaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  gpaLabel: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 4 },
  gpaValue: { fontSize: 40, fontWeight: '900', color: COLORS.white },
  semesterSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  semesterText: { fontSize: 12, color: COLORS.white, fontWeight: '600' },
  gpaStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 16,
  },
  gpaStatItem: { flex: 1, alignItems: 'center' },
  gpaStatValue: { fontSize: 18, fontWeight: '800', color: COLORS.white },
  gpaStatLabel: { fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  gpaStatDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  creditsProgress: {},
  creditsProgressLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 6,
  },
  creditTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
  },
  creditFill: {
    height: 6,
    backgroundColor: COLORS.white,
    borderRadius: 3,
  },
  gradesHeader: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  gradesTitle: { fontSize: 15, color: COLORS.textSecondary, fontWeight: '500' },
  gradesTitleBold: { fontWeight: '700', color: COLORS.text },
  gradesList: { paddingHorizontal: 16, gap: 8 },
  gradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    ...SHADOWS.small,
  },
  gradeColorAccent: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  gradeInfo: { flex: 1 },
  gradeCourse: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 6 },
  gradeBarTrack: {
    height: 4,
    backgroundColor: COLORS.lightGray,
    borderRadius: 2,
    marginBottom: 4,
  },
  gradeBarFill: { height: 4, borderRadius: 2 },
  gradeCode: { fontSize: 10, color: COLORS.textMuted },
  gradeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginLeft: 10,
  },
  gradeText: { fontSize: 14, fontWeight: '900' },
});
