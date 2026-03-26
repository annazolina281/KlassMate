// src/screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import {
  View, Text, Animated, StyleSheet, Dimensions,
} from 'react-native';
import { COLORS } from '../theme/colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background circle decoration */}
      <View style={styles.bgCircleTop} />
      <View style={styles.bgCircleBottom} />

      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        {/* Logo Ring */}
        <View style={styles.logoRing}>
          <View style={styles.logoInner}>
            <Text style={styles.logoKM}>KM</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.textContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.appName}>Klass Mate</Text>
        <Text style={styles.tagline}>Your Class Companion.</Text>
      </Animated.View>

      {/* Copyright */}
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Text style={styles.copyright}>Copyright © 2025 Klass Mate.</Text>
        <Text style={styles.copyright}>All Right Reserved</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgCircleTop: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: COLORS.primarySoft,
  },
  bgCircleBottom: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.primarySoft,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoRing: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  logoInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoKM: {
    fontSize: 38,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 2,
  },
  textContainer: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  copyright: {
    fontSize: 11,
    color: COLORS.textMuted,
    lineHeight: 16,
  },
});
