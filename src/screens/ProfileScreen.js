// src/screens/ProfileScreen.js
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { USER } from '../data/mockData';

const { width } = Dimensions.get('window');

function StatPill({ label, value, color }) {
  return (
    <View style={[styles.statPill, { backgroundColor: (color || COLORS.primary) + '15' }]}>
      <Text style={[styles.statPillValue, { color: color || COLORS.primary }]}>{value}</Text>
      <Text style={styles.statPillLabel}>{label}</Text>
    </View>
  );
}

function RingProgress({ pct, color, label, size = 56 }) {
  return (
    <View style={[styles.ringContainer, { width: size, height: size }]}>
      {/* Simplified ring visualization */}
      <View style={[styles.ringOuter, { width: size, height: size, borderRadius: size / 2, borderColor: color + '33' }]}>
        <View style={styles.ringInner}>
          <Text style={[styles.ringValue, { color }]}>{pct}%</Text>
          <Text style={styles.ringLabel}>{label}</Text>
        </View>
      </View>
    </View>
  );
}

function DashboardItem({ icon, label, iconBg, onPress }) {
  return (
    <TouchableOpacity style={styles.dashItem} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.dashItemIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={18} color={COLORS.white} />
      </View>
      <Text style={styles.dashItemLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen({ navigation }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="settings-outline" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileBg} />
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitial}>{USER.name[0].toUpperCase()}</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={14} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{USER.name}</Text>
          <Text style={styles.profileId}>{USER.studentId}</Text>
          <Text style={styles.profileProgram}>{USER.program}</Text>
        </View>

        {/* Stats pills */}
        <View style={styles.statsRow}>
          <StatPill
            label="Credit Earns"
            value={`${USER.creditsEarned}/${USER.totalCredits}`}
            color={COLORS.primary}
          />
          <StatPill
            label="GPA"
            value={USER.gpa.toFixed(2)}
            color={COLORS.info}
          />
          <StatPill
            label="Year student"
            value={USER.yearLevel}
            color={COLORS.success}
          />
        </View>

        {/* Statistics Card */}
        <View style={styles.statsCard}>
          <View style={styles.statsCardHeader}>
            <View>
              <Text style={styles.statsCardTitle}>Statistics</Text>
              <Text style={styles.statsCardDate}>{today}</Text>
            </View>
            <TouchableOpacity style={styles.markAttendBtn}>
              <Text style={styles.markAttendText}>Mark Attend</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ringsRow}>
            <RingProgress pct={USER.attendance} color="#27AE60" label="Attendance" />
            <RingProgress pct={USER.tasksAndWork} color="#2980B9" label="Tasks & Work" />
            <RingProgress pct={USER.quiz} color="#E74C3C" label="Quiz" />
          </View>
        </View>

        {/* Dashboard */}
        <View style={styles.dashCard}>
          <Text style={styles.dashTitle}>Dashboard</Text>
          <DashboardItem
            icon="settings-outline"
            label="Setting"
            iconBg="#5DADE2"
            onPress={() => navigation.navigate('Settings')}
          />
          <View style={styles.dashDivider} />
          <DashboardItem
            icon="trophy-outline"
            label="Achievement"
            iconBg="#F39C12"
            onPress={() => {}}
          />
          <View style={styles.dashDivider} />
          <DashboardItem
            icon="shield-outline"
            label="Privacy"
            iconBg="#8E44AD"
            onPress={() => {}}
          />
        </View>

        {/* AI Assistant Button */}
        <TouchableOpacity
          style={styles.aiButton}
          onPress={() => navigation.navigate('AIAssistant')}
          activeOpacity={0.85}
        >
          <Ionicons name="sparkles" size={20} color={COLORS.white} />
          <View>
            <Text style={styles.aiButtonTitle}>KM AI Assistant</Text>
            <Text style={styles.aiButtonSub}>Ask your study questions</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.white} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        {/* Focus Mode Button */}
        <TouchableOpacity
          style={styles.focusButton}
          onPress={() => navigation.navigate('FocusMode')}
          activeOpacity={0.85}
        >
          <Ionicons name="timer-outline" size={20} color={COLORS.primary} />
          <View>
            <Text style={styles.focusButtonTitle}>Focus Mode</Text>
            <Text style={styles.focusButtonSub}>Start a Pomodoro session</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.primary} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        {/* Sign out */}
        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={() => navigation.replace('Login')}
        >
          <Ionicons name="log-out-outline" size={18} color={COLORS.error} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

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
  profileCard: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingBottom: 28,
    overflow: 'hidden',
    marginBottom: 2,
  },
  profileBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: COLORS.primarySoft,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: 36,
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: COLORS.white,
    ...SHADOWS.medium,
  },
  avatarInitial: { fontSize: 32, fontWeight: '900', color: COLORS.white },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profileName: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  profileId: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  profileProgram: { fontSize: 12, color: COLORS.primary, fontWeight: '600', marginTop: 4 },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: COLORS.white,
  },
  statPill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 3,
  },
  statPillValue: { fontSize: 16, fontWeight: '800' },
  statPillLabel: { fontSize: 10, color: COLORS.textSecondary, textAlign: 'center' },
  statsCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    ...SHADOWS.small,
    borderWidth: 1.5,
    borderColor: COLORS.primarySoft,
  },
  statsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statsCardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  statsCardDate: { fontSize: 10, color: COLORS.textMuted, marginTop: 2 },
  markAttendBtn: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  markAttendText: { fontSize: 11, fontWeight: '700', color: COLORS.white },
  ringsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  ringContainer: { alignItems: 'center', justifyContent: 'center' },
  ringOuter: {
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: { alignItems: 'center' },
  ringValue: { fontSize: 13, fontWeight: '800' },
  ringLabel: { fontSize: 9, color: COLORS.textSecondary, textAlign: 'center' },
  dashCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dashTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 14 },
  dashItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  dashItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashItemLabel: { flex: 1, fontSize: 14, color: COLORS.text, fontWeight: '500' },
  dashDivider: { height: 1, backgroundColor: COLORS.border, marginLeft: 48 },
  aiButton: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...SHADOWS.large,
  },
  aiButtonTitle: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  aiButtonSub: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  focusButton: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: COLORS.primarySoft,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary + '44',
  },
  focusButtonTitle: { fontSize: 15, fontWeight: '700', color: COLORS.primary },
  focusButtonSub: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  signOutBtn: {
    marginHorizontal: 16,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.error + '44',
  },
  signOutText: { fontSize: 14, fontWeight: '600', color: COLORS.error },
});
