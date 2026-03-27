// src/screens/SignUpScreen.js
import React, { useState, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

// ✅ Field component defined OUTSIDE to prevent keyboard dismissal on re-render
const Field = ({ icon, placeholder, fieldKey, secure, showToggle, onToggle, keyboardType, value, onChangeText, error }) => (
  <View>
    <View style={[styles.inputWrapper, error && styles.inputWrapperError]}>
      <Ionicons name={icon} size={18} color={COLORS.gray} style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure && !showToggle}
        autoCapitalize="none"
        keyboardType={keyboardType || 'default'}
        autoCorrect={false}
        blurOnSubmit={false}
      />
      {secure && (
        <TouchableOpacity onPress={onToggle} style={styles.eyeBtn}>
          <Ionicons
            name={showToggle ? 'eye-outline' : 'eye-off-outline'}
            size={18}
            color={COLORS.gray}
          />
        </TouchableOpacity>
      )}
    </View>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is not valid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Must contain 8 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Must match both password';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validate()) navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join KlassMate and conquer your classes!</Text>

          <View style={styles.form}>
            <Field
              icon="person-outline" placeholder="Username" fieldKey="username"
              value={username} onChangeText={(t) => { setUsername(t); setErrors(e => ({ ...e, username: null })); }}
              error={errors.username}
            />
            <Field
              icon="mail-outline" placeholder="Email" fieldKey="email"
              keyboardType="email-address" value={email}
              onChangeText={(t) => { setEmail(t); setErrors(e => ({ ...e, email: null })); }}
              error={errors.email}
            />
            <Field
              icon="lock-closed-outline" placeholder="Password" fieldKey="password"
              secure showToggle={showPassword} onToggle={() => setShowPassword(v => !v)}
              value={password}
              onChangeText={(t) => { setPassword(t); setErrors(e => ({ ...e, password: null })); }}
              error={errors.password}
            />
            <Field
              icon="lock-closed-outline" placeholder="Re-type Password" fieldKey="confirmPassword"
              secure showToggle={showConfirm} onToggle={() => setShowConfirm(v => !v)}
              value={confirmPassword}
              onChangeText={(t) => { setConfirmPassword(t); setErrors(e => ({ ...e, confirmPassword: null })); }}
              error={errors.confirmPassword}
            />

            <TouchableOpacity style={styles.continueBtn} onPress={handleSignUp} activeOpacity={0.85}>
              <Text style={styles.continueBtnText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.loginRow}>
              <Text style={styles.loginLabel}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  container: { flexGrow: 1, paddingHorizontal: 28, paddingBottom: 40 },
  backBtn: { marginTop: 12, marginBottom: 24, width: 40 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.primary, marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 32 },
  form: { gap: 12 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background,
    borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 14,
  },
  inputWrapperError: { borderColor: COLORS.error },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 14, fontSize: 14, color: COLORS.text },
  eyeBtn: { padding: 4 },
  errorText: { fontSize: 11, color: COLORS.error, marginTop: 2, marginLeft: 4 },
  continueBtn: {
    backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 14,
    alignItems: 'center', marginTop: 8,
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  continueBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  loginLabel: { color: COLORS.textSecondary, fontSize: 13 },
  loginLink: { color: COLORS.primary, fontSize: 13, fontWeight: '700' },
});
