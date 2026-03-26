// src/screens/AIAssistantScreen.js
// ⚠️ IMPORTANT: Replace YOUR_API_KEY_HERE with your actual Anthropic API key
// For production, move the API key to a secure backend server, never in client code.

import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  FlatList, KeyboardAvoidingView, Platform, ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';

const API_KEY = 'YOUR_API_KEY_HERE'; // 🔑 Replace with your Anthropic API key
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

const SYSTEM_PROMPT = `You are KM Bot, the AI study assistant built into KlassMate — a student productivity app for college students, especially Computer Engineering students at the Technological Institute of the Philippines.

Your role is to:
- Help students manage their time and avoid procrastination
- Answer academic questions about subjects like Computer Networks, Programming, Calculus, Physics, etc.
- Suggest study strategies, schedules, and focus techniques
- Motivate students who are stressed or overwhelmed
- Explain complex engineering concepts in a clear, approachable way
- Help with study planning, task prioritization, and deadline management

Keep your tone friendly, encouraging, and concise. Use emojis occasionally to make responses feel warm. When students seem overwhelmed, remind them to take it one step at a time. Always be supportive and student-focused.`;

const QUICK_PROMPTS = [
  { id: '1', text: 'Help me make a study plan 📅', icon: 'calendar-outline' },
  { id: '2', text: 'Explain TCP/IP for Networks class 🌐', icon: 'globe-outline' },
  { id: '3', text: "I'm procrastinating. Help! 😅", icon: 'timer-outline' },
  { id: '4', text: 'How do I manage deadlines better? ⏰', icon: 'checkmark-circle-outline' },
];

function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (dot, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: -5, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.delay(600),
        ])
      );
    };
    const anim = Animated.parallel([
      animate(dot1, 0),
      animate(dot2, 150),
      animate(dot3, 300),
    ]);
    anim.start();
    return () => anim.stop();
  }, []);

  return (
    <View style={styles.typingContainer}>
      <View style={styles.botAvatar}>
        <Ionicons name="sparkles" size={12} color={COLORS.white} />
      </View>
      <View style={styles.typingBubble}>
        {[dot1, dot2, dot3].map((dot, i) => (
          <Animated.View
            key={i}
            style={[styles.typingDot, { transform: [{ translateY: dot }] }]}
          />
        ))}
      </View>
    </View>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.messageRow, isUser && styles.messageRowUser]}>
      {!isUser && (
        <View style={styles.botAvatar}>
          <Ionicons name="sparkles" size={12} color={COLORS.white} />
        </View>
      )}
      <View style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.botBubble,
      ]}>
        <Text style={[
          styles.bubbleText,
          isUser ? styles.userBubbleText : styles.botBubbleText,
        ]}>
          {message.content}
        </Text>
        <Text style={[styles.timeText, isUser && { color: 'rgba(255,255,255,0.6)' }]}>
          {message.time}
        </Text>
      </View>
      {isUser && (
        <View style={styles.userAvatar}>
          <Ionicons name="person" size={12} color={COLORS.white} />
        </View>
      )}
    </View>
  );
}

export default function AIAssistantScreen({ navigation }) {
  const [messages, setMessages] = useState([
    {
      id: '0',
      role: 'assistant',
      content: "Hi! I'm KM Bot, your AI study assistant 👋\n\nI can help you with:\n• Study planning & time management\n• Academic questions & concepts\n• Beating procrastination\n• Dealing with exam stress\n\nWhat can I help you with today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const scrollToBottom = () => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const sendMessage = async (text) => {
    const messageText = (text || inputText).trim();
    if (!messageText || isLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      time: getTime(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);
    scrollToBottom();

    // Build conversation history for API
    const conversationHistory = updatedMessages
      .filter(m => m.id !== '0') // skip welcome message
      .map(m => ({ role: m.role, content: m.content }));

    try {
      const response = await fetch(CLAUDE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 600,
          system: SYSTEM_PROMPT,
          messages: conversationHistory,
        }),
      });

      const data = await response.json();

      if (data.content && data.content[0]) {
        const botMsg = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.content[0].text,
          time: getTime(),
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error(data.error?.message || 'Unknown error');
      }
    } catch (error) {
      const errMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: API_KEY === 'YOUR_API_KEY_HERE'
          ? "⚠️ API key not configured. Please add your Anthropic API key to AIAssistantScreen.js to enable AI responses."
          : `Sorry, I couldn't respond right now. Please check your connection and try again. (${error.message})`,
        time: getTime(),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.headerBotIcon}>
            <Ionicons name="sparkles" size={16} color={COLORS.white} />
          </View>
          <View>
            <Text style={styles.headerTitle}>KM Bot</Text>
            <Text style={styles.headerSub}>AI Study Assistant</Text>
          </View>
        </View>
        <View style={styles.onlineDot} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
          ListFooterComponent={isLoading ? <TypingIndicator /> : null}
        />

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <View style={styles.quickPromptsContainer}>
            <Text style={styles.quickPromptsLabel}>Quick questions:</Text>
            <View style={styles.quickPromptsGrid}>
              {QUICK_PROMPTS.map(p => (
                <TouchableOpacity
                  key={p.id}
                  style={styles.quickPromptBtn}
                  onPress={() => sendMessage(p.text.replace(/[^\w\s!?.,']+/g, '').trim())}
                  activeOpacity={0.7}
                >
                  <Ionicons name={p.icon} size={14} color={COLORS.primary} />
                  <Text style={styles.quickPromptText}>{p.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Input Box */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask KM Bot anything..."
            placeholderTextColor={COLORS.gray}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            onSubmitEditing={() => sendMessage()}
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!inputText.trim() || isLoading) && styles.sendBtnDisabled]}
            onPress={() => sendMessage()}
            disabled={!inputText.trim() || isLoading}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Ionicons name="send" size={18} color={COLORS.white} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  backBtn: { padding: 4 },
  headerCenter: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerBotIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  headerSub: { fontSize: 11, color: COLORS.success, fontWeight: '600' },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  messagesList: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 10,
    flexGrow: 1,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
    gap: 8,
  },
  messageRowUser: { flexDirection: 'row-reverse' },
  botAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    ...SHADOWS.small,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  userBubbleText: { color: COLORS.white },
  botBubbleText: { color: COLORS.text },
  timeText: { fontSize: 10, color: COLORS.textMuted, marginTop: 4, textAlign: 'right' },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  typingBubble: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray,
  },
  quickPromptsContainer: {
    paddingHorizontal: 14,
    paddingBottom: 8,
  },
  quickPromptsLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 8,
    fontWeight: '600',
  },
  quickPromptsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickPromptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primarySoft,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 5,
    borderWidth: 1,
    borderColor: COLORS.primary + '33',
  },
  quickPromptText: { fontSize: 12, color: COLORS.primary, fontWeight: '500' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
    maxHeight: 120,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.lightGray,
  },
});
