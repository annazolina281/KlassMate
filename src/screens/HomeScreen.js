// src/screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Dimensions, TextInput, Modal, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';
import { SCHEDULE_TODAY, TASKS, USER } from '../data/mockData';

const { width } = Dimensions.get('window');

function ClassCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.classCard, { borderLeftColor: item.borderColor, backgroundColor: item.color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.classCardLeft}>
        <Text style={styles.className}>{item.courseName}</Text>
        <Text style={styles.classTopic} numberOfLines={1}>{item.topic}</Text>
        <View style={styles.classInfo}>
          <Ionicons name="location-outline" size={12} color={COLORS.textSecondary} />
          <Text style={styles.classInfoText}>{item.room}</Text>
          <Ionicons name="person-outline" size={12} color={COLORS.textSecondary} style={{ marginLeft: 8 }} />
          <Text style={styles.classInfoText}>{item.professor}</Text>
        </View>
      </View>
      <View style={styles.classCardRight}>
        <TouchableOpacity style={styles.bellBtn}>
          <Ionicons name="notifications-outline" size={16} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={onToggle} style={styles.taskCheckbox}>
        <Ionicons
          name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={22}
          color={task.completed ? COLORS.success : COLORS.gray}
        />
      </TouchableOpacity>
      <View style={styles.taskContent}>
        <Text style={[styles.taskTitle, task.completed && styles.taskTitleDone]}>
          {task.title}
        </Text>
        {task.subtasks.map((sub, i) => (
          <Text key={i} style={styles.subtask}>• {sub}</Text>
        ))}
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.taskDeleteBtn}>
        <Ionicons name="close" size={16} color={COLORS.gray} />
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState(TASKS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [activeTab, setActiveTab] = useState('classes'); // 'classes' | 'checklist'

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now().toString(),
      title: newTask.trim(),
      subtasks: [],
      priority: 'medium',
      completed: false,
      dueDate: new Date().toISOString().split('T')[0],
    };
    setTasks([...tasks, task]);
    setNewTask('');
    setShowAddModal(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {USER.name}! 👋</Text>
          <Text style={styles.dateText}>{dayName}, {dateStr}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.aiBtn}
            onPress={() => navigation.navigate('AIAssistant')}
            activeOpacity={0.85}
          >
            <Ionicons name="sparkles" size={16} color={COLORS.white} />
            <Text style={styles.aiBtnText}>KM AI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: COLORS.primarySoft }]}>
          <Ionicons name="book-outline" size={18} color={COLORS.primary} />
          <Text style={styles.statValue}>{SCHEDULE_TODAY.length}</Text>
          <Text style={styles.statLabel}>Classes Today</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#E8F8EF' }]}>
          <Ionicons name="checkmark-done-outline" size={18} color={COLORS.success} />
          <Text style={[styles.statValue, { color: COLORS.success }]}>
            {tasks.filter(t => t.completed).length}/{tasks.length}
          </Text>
          <Text style={styles.statLabel}>Tasks Done</Text>
        </View>
        <TouchableOpacity
          style={[styles.statCard, { backgroundColor: '#EBF5FB' }]}
          onPress={() => navigation.navigate('FocusMode')}
        >
          <Ionicons name="timer-outline" size={18} color={COLORS.info} />
          <Text style={[styles.statValue, { color: COLORS.info }]}>Focus</Text>
          <Text style={styles.statLabel}>Mode</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabSwitcher}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'classes' && styles.tabBtnActive]}
          onPress={() => setActiveTab('classes')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'classes' && styles.tabBtnTextActive]}>
            Today's Classes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'checklist' && styles.tabBtnActive]}
          onPress={() => setActiveTab('checklist')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'checklist' && styles.tabBtnTextActive]}>
            Checklist
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {activeTab === 'classes' ? (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Schedule</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
                <Text style={styles.seeAll}>Open schedule →</Text>
              </TouchableOpacity>
            </View>
            {SCHEDULE_TODAY.map(item => (
              <View key={item.id} style={styles.scheduleRow}>
                <View style={styles.timeColumn}>
                  <Text style={styles.timeStart}>{item.startTime}</Text>
                  <View style={styles.timeLine} />
                  <Text style={styles.timeEnd}>{item.endTime}</Text>
                </View>
                <ClassCard item={item} onPress={() => {}} />
              </View>
            ))}
          </View>
        ) : (
          <View>
            <View style={styles.checklistHeader}>
              <View style={styles.kmLogoSmall}>
                <Text style={styles.kmLogoText}>KM</Text>
              </View>
              <Text style={styles.checklistTitle}>TODAY'S{'\n'}CHECKLIST</Text>
            </View>
            <Text style={styles.taskSectionLabel}>Task:</Text>

            {tasks.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="checkmark-done-circle-outline" size={48} color={COLORS.lightGray} />
                <Text style={styles.emptyText}>All done! Add a new task.</Text>
              </View>
            ) : (
              tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))
            )}

            <TouchableOpacity style={styles.addTaskBtn} onPress={() => setShowAddModal(true)}>
              <Ionicons name="add" size={18} color={COLORS.textSecondary} />
              <Text style={styles.addTaskText}>+ Add Task</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Add Task Modal */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowAddModal(false)}
        >
          <View style={styles.addTaskModal}>
            <Text style={styles.modalTitle}>New Task</Text>
            <TextInput
              style={styles.taskInput}
              placeholder="What needs to be done?"
              placeholderTextColor={COLORS.gray}
              value={newTask}
              onChangeText={setNewTask}
              autoFocus
              multiline
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addBtn} onPress={addTask}>
                <Text style={styles.addBtnText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: COLORS.white,
  },
  greeting: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  dateText: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  aiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 4,
  },
  aiBtnText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  iconBtn: { position: 'relative', padding: 4 },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 3,
  },
  statValue: { fontSize: 15, fontWeight: '800', color: COLORS.primary },
  statLabel: { fontSize: 10, color: COLORS.textSecondary, fontWeight: '500' },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: { borderBottomColor: COLORS.primary },
  tabBtnText: { fontSize: 13, fontWeight: '600', color: COLORS.gray },
  tabBtnTextActive: { color: COLORS.primary },
  scrollView: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  seeAll: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
  scheduleRow: { flexDirection: 'row', marginBottom: 12, gap: 10 },
  timeColumn: { alignItems: 'center', width: 44 },
  timeStart: { fontSize: 10, color: COLORS.textSecondary, fontWeight: '600' },
  timeLine: { flex: 1, width: 1.5, backgroundColor: COLORS.lightGray, marginVertical: 4 },
  timeEnd: { fontSize: 10, color: COLORS.textSecondary, fontWeight: '600' },
  classCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 14,
    padding: 14,
    borderLeftWidth: 4,
    ...SHADOWS.small,
  },
  classCardLeft: { flex: 1 },
  className: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  classTopic: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 6 },
  classInfo: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  classInfoText: { fontSize: 10, color: COLORS.textSecondary },
  classCardRight: { alignItems: 'flex-end' },
  bellBtn: { padding: 4 },
  // Checklist
  checklistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.text,
  },
  kmLogoSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kmLogoText: { fontSize: 14, fontWeight: '900', color: COLORS.white },
  checklistTitle: { fontSize: 18, fontWeight: '900', color: COLORS.text, lineHeight: 22 },
  taskSectionLabel: { fontSize: 13, fontWeight: '700', color: COLORS.textSecondary, marginBottom: 10 },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    ...SHADOWS.small,
  },
  taskCheckbox: { marginRight: 10, marginTop: 1 },
  taskContent: { flex: 1 },
  taskTitle: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  taskTitleDone: { textDecorationLine: 'line-through', color: COLORS.gray },
  subtask: { fontSize: 11, color: COLORS.textSecondary, marginTop: 3 },
  taskDeleteBtn: { padding: 4 },
  addTaskBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    gap: 6,
  },
  addTaskText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '600' },
  emptyState: { alignItems: 'center', paddingVertical: 30, gap: 10 },
  emptyText: { fontSize: 13, color: COLORS.gray },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  addTaskModal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 16 },
  taskInput: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    fontSize: 14,
    color: COLORS.text,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  modalActions: { flexDirection: 'row', gap: 12 },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  cancelBtnText: { fontSize: 15, fontWeight: '600', color: COLORS.textSecondary },
  addBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  addBtnText: { fontSize: 15, fontWeight: '700', color: COLORS.white },
});
