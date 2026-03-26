// src/screens/SettingsScreen.js
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';

function SettingRow({ icon, iconBg, label, value, onPress, type = 'arrow', danger = false }) {
  return (
    <TouchableOpacity style={styles.settingRow} onPress={onPress} activeOpacity={type === 'toggle' ? 1 : 0.7}>
      <View style={[styles.settingIcon, { backgroundColor: iconBg || COLORS.lightGray }]}>
        <Ionicons name={icon} size={18} color={COLORS.white} />
      </View>
      <Text style={[styles.settingLabel, danger && { color: COLORS.error }]}>{label}</Text>
      {type === 'arrow' && (
        <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
      )}
      {type === 'toggle' && (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: COLORS.lightGray, true: COLORS.primary + '88' }}
          thumbColor={value ? COLORS.primary : COLORS.gray}
          ios_backgroundColor={COLORS.lightGray}
        />
      )}
      {type === 'value' && (
        <Text style={styles.settingValue}>{value}</Text>
      )}
    </TouchableOpacity>
  );
}

function SettingSection({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [focusSounds, setFocusSounds] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        <SettingSection title="Account">
          <SettingRow icon="person-outline" iconBg="#5DADE2" label="Personal Info" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="diamond-outline" iconBg="#F39C12" label="Upgrade to Premium" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="server-outline" iconBg="#8E44AD" label="Data Controls" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="archive-outline" iconBg="#27AE60" label="Archived Chats" onPress={() => {}} />
        </SettingSection>

        <SettingSection title="Notifications">
          <SettingRow
            icon="notifications-outline"
            iconBg={COLORS.primary}
            label="Push Notifications"
            type="toggle"
            value={notifications}
            onPress={() => setNotifications(!notifications)}
          />
          <View style={styles.rowDivider} />
          <SettingRow
            icon="alarm-outline"
            iconBg="#E74C3C"
            label="Class Reminders"
            type="toggle"
            value={reminders}
            onPress={() => setReminders(!reminders)}
          />
        </SettingSection>

        <SettingSection title="Focus Mode">
          <SettingRow
            icon="timer-outline"
            iconBg="#2980B9"
            label="Focus Duration"
            type="value"
            value="25 min"
            onPress={() => {}}
          />
          <View style={styles.rowDivider} />
          <SettingRow
            icon="cafe-outline"
            iconBg="#27AE60"
            label="Short Break"
            type="value"
            value="5 min"
            onPress={() => {}}
          />
          <View style={styles.rowDivider} />
          <SettingRow
            icon="musical-notes-outline"
            iconBg="#8E44AD"
            label="Focus Sounds"
            type="toggle"
            value={focusSounds}
            onPress={() => setFocusSounds(!focusSounds)}
          />
        </SettingSection>

        <SettingSection title="Appearance">
          <SettingRow
            icon="moon-outline"
            iconBg="#2C3E50"
            label="Dark Mode"
            type="toggle"
            value={darkMode}
            onPress={() => setDarkMode(!darkMode)}
          />
        </SettingSection>

        <SettingSection title="About">
          <SettingRow icon="help-circle-outline" iconBg="#5DADE2" label="Help Center" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="document-text-outline" iconBg="#7F8C8D" label="Terms of Use" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow icon="shield-checkmark-outline" iconBg="#27AE60" label="Privacy Policy" onPress={() => {}} />
          <View style={styles.rowDivider} />
          <SettingRow
            icon="information-circle-outline"
            iconBg="#95A5A6"
            label="App Version"
            type="value"
            value="1.0.0"
          />
        </SettingSection>

        <SettingSection title="">
          <SettingRow
            icon="log-out-outline"
            iconBg={COLORS.error}
            label="Log Out"
            danger
            onPress={() => navigation.replace('Login')}
          />
        </SettingSection>

        {/* App Info */}
        <View style={styles.appInfo}>
          <View style={styles.appLogo}>
            <Text style={styles.appLogoText}>KM</Text>
          </View>
          <Text style={styles.appName}>KlassMate</Text>
          <Text style={styles.appTagline}>Your Class Companion</Text>
          <Text style={styles.appVersion}>Version 1.0.0 · TIP Computer Engineering</Text>
        </View>

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
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  section: { marginTop: 20, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 12,
  },
  settingIcon: {
    width: 34,
    height: 34,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: COLORS.text },
  settingValue: { fontSize: 14, color: COLORS.textSecondary, fontWeight: '500' },
  rowDivider: { height: 1, backgroundColor: COLORS.border, marginLeft: 62 },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 30,
    gap: 4,
  },
  appLogo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  appLogoText: { fontSize: 16, fontWeight: '900', color: COLORS.white },
  appName: { fontSize: 18, fontWeight: '800', color: COLORS.primary },
  appTagline: { fontSize: 13, color: COLORS.textSecondary, fontStyle: 'italic' },
  appVersion: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
});
