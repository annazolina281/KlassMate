// src/screens/FocusModeScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions, Vibration,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.72;
const STROKE_WIDTH = 10;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const MODES = {
  focus: { label: 'Focus', duration: 25 * 60, color: COLORS.primary },
  shortBreak: { label: 'Short Break', duration: 5 * 60, color: COLORS.success },
  longBreak: { label: 'Long Break', duration: 15 * 60, color: COLORS.info },
};

const TIPS = [
  "Put your phone face down to minimize distractions 📵",
  "Close unnecessary browser tabs before starting ✂️",
  "Keep a glass of water nearby for hydration 💧",
  "Set a clear goal before each Pomodoro 🎯",
  "The hardest part is starting — just begin! 🚀",
  "Break complex tasks into small, concrete steps 🧩",
  "Silence notifications and go into Do Not Disturb mode 🔕",
];

export default function FocusModeScreen({ navigation }) {
  const [mode, setMode] = useState('focus');
  const [secondsLeft, setSecondsLeft] = useState(MODES.focus.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const intervalRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const currentMode = MODES[mode];
  const progress = secondsLeft / currentMode.duration;

  useEffect(() => {
    if (isRunning) {
      // Pulse animation when running
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.04, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      ).start();

      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleTimerComplete = () => {
    Vibration.vibrate([500, 200, 500]);
    clearInterval(intervalRef.current);
    setIsRunning(false);
    if (mode === 'focus') {
      setSessions(s => s + 1);
    }
    setTipIndex((tipIndex + 1) % TIPS.length);
  };

  const switchMode = (newMode) => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setMode(newMode);
    setSecondsLeft(MODES[newMode].duration);
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSecondsLeft(currentMode.duration);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Focus Mode</Text>
        <View style={styles.sessionsBadge}>
          <Ionicons name="flame" size={14} color={COLORS.warning} />
          <Text style={styles.sessionsText}>{sessions}</Text>
        </View>
      </View>

      {/* Mode Selector */}
      <View style={styles.modeSwitcher}>
        {Object.entries(MODES).map(([key, val]) => (
          <TouchableOpacity
            key={key}
            style={[styles.modeBtn, mode === key && { backgroundColor: val.color }]}
            onPress={() => switchMode(key)}
          >
            <Text style={[styles.modeBtnText, mode === key && styles.modeBtnTextActive]}>
              {val.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Timer Circle */}
      <View style={styles.timerContainer}>
        <Animated.View style={[styles.timerOuter, { transform: [{ scale: pulseAnim }] }]}>
          {/* Background circle */}
          <View style={[styles.timerBg, { borderColor: currentMode.color + '22' }]} />
          {/* Progress ring using border trick */}
          <View style={[styles.timerRing, { borderColor: currentMode.color }]} />

          <View style={styles.timerInner}>
            <Text style={[styles.timerText, { color: currentMode.color }]}>
              {formatTime(secondsLeft)}
            </Text>
            <Text style={styles.timerModeLabel}>{currentMode.label}</Text>
            <Text style={styles.timerSubLabel}>
              {isRunning ? 'Stay focused! 💪' : secondsLeft === currentMode.duration ? 'Ready to start' : 'Paused'}
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlBtnSecondary} onPress={handleReset}>
          <Ionicons name="refresh" size={22} color={COLORS.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlBtnPrimary, { backgroundColor: currentMode.color }]}
          onPress={handleStartPause}
          activeOpacity={0.85}
        >
          <Ionicons
            name={isRunning ? 'pause' : 'play'}
            size={28}
            color={COLORS.white}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlBtnSecondary} onPress={() => setTipIndex((tipIndex + 1) % TIPS.length)}>
          <Ionicons name="bulb-outline" size={22} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Session dots */}
      <View style={styles.sessionDots}>
        {Array.from({ length: 4 }, (_, i) => (
          <View
            key={i}
            style={[
              styles.sessionDot,
              i < sessions % 4 && { backgroundColor: currentMode.color }
            ]}
          />
        ))}
      </View>
      <Text style={styles.sessionHint}>
        {sessions > 0
          ? `${sessions} session${sessions !== 1 ? 's' : ''} completed today 🎉`
          : 'Complete 4 Pomodoros to earn a long break'}
      </Text>

      {/* Tip Card */}
      <View style={styles.tipCard}>
        <View style={styles.tipIcon}>
          <Text style={styles.tipEmoji}>💡</Text>
        </View>
        <Text style={styles.tipText}>{TIPS[tipIndex]}</Text>
      </View>

      {/* Quick task reminder */}
      <View style={styles.taskReminder}>
        <Ionicons name="information-circle-outline" size={16} color={COLORS.textMuted} />
        <Text style={styles.taskReminderText}>
          Set a specific task before starting for best results
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: { padding: 4, marginRight: 12 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '800', color: COLORS.text },
  sessionsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9E7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
  },
  sessionsText: { fontSize: 13, fontWeight: '700', color: COLORS.warning },
  modeSwitcher: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: COLORS.background,
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  modeBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
  },
  modeBtnText: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary },
  modeBtnTextActive: { color: COLORS.white },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  timerOuter: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerBg: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: STROKE_WIDTH + 2,
  },
  timerRing: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: STROKE_WIDTH,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  timerInner: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  timerText: {
    fontSize: 58,
    fontWeight: '900',
    letterSpacing: -2,
    fontVariant: ['tabular-nums'],
  },
  timerModeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  timerSubLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 16,
  },
  controlBtnPrimary: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.large,
  },
  controlBtnSecondary: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sessionDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sessionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.lightGray,
  },
  sessionHint: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 16,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: COLORS.background,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tipIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF9E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipEmoji: { fontSize: 18 },
  tipText: { flex: 1, fontSize: 13, color: COLORS.textSecondary, lineHeight: 18 },
  taskReminder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    paddingHorizontal: 20,
  },
  taskReminderText: { fontSize: 11, color: COLORS.textMuted, textAlign: 'center', flex: 1 },
});
