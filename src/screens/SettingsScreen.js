// src/screens/SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { USER } from '../data/mockData';

function SettingRow({ icon, iconBg, label, value, onPress, type = 'arrow', danger = false }) {
  return (
    <TouchableOpacity style={styles.settingRow} onPress={type !== 'toggle' ? onPress : undefined} activeOpacity={type === 'toggle' ? 1 : 0.7}>
      <View style={[styles.settingIcon, { backgroundColor: iconBg || COLORS.lightGray }]}>
        <Ionicons name={icon} size={18} color={COLORS.white} />
      </View>
      <Text style={[styles.settingLabel, danger && { color: COLORS.error }]}>{label}</Text>
      {type === 'arrow' && <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />}
      {type === 'toggle' && (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: COLORS.lightGray, true: COLORS.primary + '88' }}
          thumbColor={value ? COLORS.primary : COLORS.gray}
          ios_backgroundColor={COLORS.lightGray}
        />
      )}
      {type === 'value' && <Text style={styles.settingValue}>{value}</Text>}
    </TouchableOpacity>
  );
}

function SettingSection({ title, children }) {
  return (
    <View style={styles.section}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

function EditProfileModal({ visible, onClose, onSave }) {
  const [name, setName] = useState(USER.name);
  const [email, setEmail] = useState(USER.email);
  const [studentId, setStudentId] = useState(USER.studentId);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <View style={styles.editField}>
            <Text style={styles.editLabel}>Name</Text>
            <TextInput style={styles.editInput} value={name} onChangeText={setName} placeholderTextColor={COLORS.gray} />
          </View>
          <View style={styles.editField}>
            <Text style={styles.editLabel}>Email</Text>
            <TextInput style={styles.editInput} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor={COLORS.gray} />
          </View>
          <View style={styles.editField}>
            <Text style={styles.editLabel}>Student ID</Text>
            <TextInput style={styles.editInput} value={studentId} onChangeText={setStudentId} placeholderTextColor={COLORS.gray} />
          </View>
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={() => { Alert.alert('✅ Saved', 'Profile updated successfully!'); onClose(); }}>
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [focusSounds, setFocusSounds] = useState(true);
  const [focusDuration, setFocusDuration] = useState(25);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleDarkMode = (val) => {
    setDarkMode(val);
    Alert.alert('🌙 Dark Mode', val ? 'Dark mode enabled! (Full implementation coming soon)' : 'Light mode enabled!');
  };

  const handleFocusDuration = () => {
    const options = [15, 20, 25, 30, 45, 60];
    Alert.alert(
      '⏱️ Focus Duration',
      'Select your preferred Pomodoro duration:',
      options.map(min => ({
        text: `${min} minutes${min === focusDuration ? ' ✓' : ''}`,
        onPress: () => setFocusDuration(min),
      }))
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        <SettingSection title="Account">
          <SettingRow icon="person-outline" iconBg="#5DADE2" label="Personal Info" onPress={() => setShowEditProfile(true)} />
          <View style={styles.rowDivider} />
          <SettingRow icon="diamond-outline" iconBg="#F39C12" label="Upgrade to Premium" onPress={() => Alert.alert('💎 Premium', 'Premium features coming soon! Stay tuned.')} />
          <View style={styles.rowDivider} />
          <SettingRow icon="server-outline" iconBg="#8E44AD" label="Data Controls" onPress={() => Alert.alert('📊 Data Controls', 'Your data is stored locally and securely on your device.')} />
          <View style={styles.rowDivider} />
          <SettingRow icon="archive-outline" iconBg="#27AE60" label="Archived Chats" onPress={() => Alert.alert('📦 Archived Chats', 'No archived chats yet.')} />
        </SettingSection>

        <SettingSection title="Notifications">
          <SettingRow icon="notifications-outline" iconBg={COLORS.primary} label="Push Notifications" type="toggle" value={notifications} onPress={() => { setNotifications(v => !v); Alert.alert('🔔 Notifications', !notifications ? 'Notifications enabled!' : 'Notifications disabled.'); }} />
          <View style={styles.rowDivider} />
          <SettingRow icon="alarm-outline" iconBg="#E74C3C" label="Class Reminders" type="toggle" value={reminders} onPress={() => { setReminders(v => !v); Alert.alert('⏰ Reminders', !reminders ? 'Class reminders enabled! You will be notified 15 mins before class.' : 'Class reminders disabled.'); }} />
        </SettingSection>

        <SettingSection title="Focus Mode">
          <SettingRow icon="timer-outline" iconBg="#2980B9" label="Focus Duration" type="value" value={`${focusDuration} min`} onPress={handleFocusDuration} />
          <View style={styles.rowDivider} />
          <SettingRow icon="cafe-outline" iconBg="#27AE60" label="Short Break" type="value" value="5 min" onPress={() => Alert.alert('☕ Short Break', 'Short break is set to 5 minutes.')} />
          <View style={styles.rowDivider} />
          <SettingRow icon="musical-notes-outline" iconBg="#8E44AD" label="Focus Sounds" type="toggle" value={focusSounds} onPress={() => { setFocusSounds(v => !v); Alert.alert('🎵 Focus Sounds', !focusSounds ? 'Focus sounds enabled!' : 'Focus sounds disabled.'); }} />
        </SettingSection>

        <SettingSection title="Appearance">
          <SettingRow icon="moon-outline" iconBg="#2C3E50" label="Dark Mode" type="toggle" value={darkMode} onPress={handleDarkMode} />
        </SettingSection>

        <SettingSection title="About">
          <SettingRow icon="help-circle-outline" iconBg="#5DADE2" label="Help Center" onPress={() => Alert.alert('❓ Help Center', 'For support, email: klassmate@tip.edu.ph')} />
          <View style={styles.rowDivider} />
          <SettingRow icon="document-text-outline" iconBg="#7F8C8D" label="Terms of Use" onPress={() => Alert.alert('📄 Terms of Use', 'By using KlassMate, you agree to use it for academic purposes.')} />
          <View style={styles.rowDivider} />
          <SettingRow icon="shield-checkmark-outline" iconBg="#27AE60" label="Privacy Policy" onPress={() => Alert.alert('🔒 Privacy Policy', 'Your data is kept private and never shared with third parties.')} />
          <View style={styles.rowDivider} />
          <SettingRow icon="information-circle-outline" iconBg="#95A5A6" label="App Version" type="value" value="1.0.0" />
        </SettingSection>

        <SettingSection title="">
          <SettingRow icon="log-out-outline" iconBg={COLORS.error} label="Log Out" danger onPress={() => Alert.alert('Log Out', 'Are you sure you want to log out?', [{ text: 'Cancel', style: 'cancel' }, { text: 'Log Out', style: 'destructive', onPress: () => navigation.replace('Login') }])} />
        </SettingSection>

        <View style={styles.appInfo}>
          <View style={styles.appLogo}>
            <Text style={styles.appLogoText}>KM</Text>
          </View>
          <Text style={styles.appName}>KlassMate</Text>
          <Text style={styles.appTagline}>Your Class Companion</Text>
          <Text style={styles.appVersion}>Version 1.0.0 · TIP Computer Engineering · 2nd Sem SY 2025-2026</Text>
        </View>
      </ScrollView>

      <EditProfileModal visible={showEditProfile} onClose={() => setShowEditProfile(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border, gap: 12 },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  section: { marginTop: 20, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, marginLeft: 4 },
  sectionCard: { backgroundColor: COLORS.white, borderRadius: 16, overflow: 'hidden', ...SHADOWS.small },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 13, gap: 12 },
  settingIcon: { width: 34, height: 34, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  settingLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: COLORS.text },
  settingValue: { fontSize: 14, color: COLORS.textSecondary, fontWeight: '500' },
  rowDivider: { height: 1, backgroundColor: COLORS.border, marginLeft: 62 },
  appInfo: { alignItems: 'center', paddingVertical: 30, gap: 4 },
  appLogo: { width: 52, height: 52, borderRadius: 26, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  appLogoText: { fontSize: 16, fontWeight: '900', color: COLORS.white },
  appName: { fontSize: 18, fontWeight: '800', color: COLORS.primary },
  appTagline: { fontSize: 13, color: COLORS.textSecondary, fontStyle: 'italic' },
  appVersion: { fontSize: 11, color: COLORS.textMuted, marginTop: 4, textAlign: 'center', paddingHorizontal: 20 },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: COLORS.white, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 20 },
  editField: { marginBottom: 14 },
  editLabel: { fontSize: 12, fontWeight: '700', color: COLORS.textSecondary, marginBottom: 6 },
  editInput: { backgroundColor: COLORS.background, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: COLORS.text },
  modalActions: { flexDirection: 'row', gap: 12, marginTop: 8 },
  cancelBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.border },
  cancelBtnText: { fontSize: 15, fontWeight: '600', color: COLORS.textSecondary },
  saveBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center', backgroundColor: COLORS.primary },
  saveBtnText: { fontSize: 15, fontWeight: '700', color: COLORS.white },
});
