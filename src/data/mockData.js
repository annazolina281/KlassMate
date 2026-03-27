// src/data/mockData.js

export const COURSES = [
  {
    id: '1', code: 'COE 002A', name: 'Introduction to Intellectual Property',
    section: 'CPE32S1', professor: 'TBA', room: 'Room TBA',
    color: '#E8F8EF', borderColor: '#27AE60', units: 1, grade: 'A',
    term: '2nd Sem SY 2025-2026',
    description: 'Introduction to intellectual property rights, patents, copyrights, trademarks, and their applications in engineering.',
    topics: ['Patents', 'Copyrights', 'Trademarks', 'Trade Secrets', 'IP in Engineering'],
    schedule: [{ day: 'Fri', time: '7:00 - 8:00' }],
  },
  {
    id: '2', code: 'CPE 012', name: 'Data and Digital Communications',
    section: 'CPE32S1', professor: 'TBA', room: 'Room 5306',
    color: '#EBF5FB', borderColor: '#2980B9', units: 3, grade: 'B+',
    term: '2nd Sem SY 2025-2026',
    description: 'Study of data communication systems, digital transmission techniques, and network fundamentals.',
    topics: ['Digital Signals', 'Modulation', 'Error Detection', 'Protocols', 'Bandwidth'],
    schedule: [{ day: 'Mon', time: '10:30 - 12:30' }, { day: 'Thu', time: '10:30 - 12:30' }],
  },
  {
    id: '3', code: 'CPE 013', name: 'Logic Circuits and Design',
    section: 'CPE22S1', professor: 'TBA', room: 'Room 4102',
    color: '#FDEDEC', borderColor: '#E74C3C', units: 3, grade: 'B',
    term: '2nd Sem SY 2024-2025',
    description: 'Fundamentals of digital logic design including combinational and sequential circuits.',
    topics: ['Boolean Algebra', 'Logic Gates', 'Flip-Flops', 'Counters', 'State Machines'],
    schedule: [{ day: 'Tue', time: '8:00 - 10:00' }, { day: 'Fri', time: '8:00 - 10:00' }],
  },
  {
    id: '4', code: 'CPE 019', name: 'Emerging Technologies 2 in CpE',
    section: 'CPE32S2', professor: 'TBA', room: 'Room 3201',
    color: '#F4ECF7', borderColor: '#8E44AD', units: 2, grade: 'A',
    term: '2nd Sem SY 2025-2026',
    description: 'Exploration of cutting-edge technologies relevant to Computer Engineering including AI, IoT, and blockchain.',
    topics: ['Artificial Intelligence', 'IoT', 'Blockchain', 'Cloud Computing', 'Edge Computing'],
    schedule: [{ day: 'Wed', time: '1:00 - 3:00' }],
  },
  {
    id: '5', code: 'CPE 020', name: 'Methods of Research',
    section: 'CPE32S3', professor: 'TBA', room: 'Room 2203',
    color: '#FEF5E7', borderColor: '#F39C12', units: 3, grade: 'A-',
    term: '2nd Sem SY 2025-2026',
    description: 'Research methodologies, technical writing, and data analysis techniques for engineering research.',
    topics: ['Research Design', 'Data Collection', 'Statistical Analysis', 'Technical Writing', 'Citation'],
    schedule: [{ day: 'Mon', time: '1:00 - 3:00' }, { day: 'Wed', time: '1:00 - 2:00' }],
  },
  {
    id: '6', code: 'CPE 025B', name: 'Software Design 2',
    section: 'CPE32S1', professor: 'TBA', room: 'Room 1208',
    color: '#E8F8EF', borderColor: '#27AE60', units: 3, grade: 'B+',
    term: '2nd Sem SY 2025-2026',
    description: 'Advanced software design principles, design patterns, and software architecture.',
    topics: ['Design Patterns', 'SOLID Principles', 'UML', 'Software Architecture', 'Testing'],
    schedule: [{ day: 'Tue', time: '4:30 - 6:30' }, { day: 'Fri', time: '4:30 - 6:30' }],
  },
  {
    id: '7', code: 'CPE 033', name: 'Human-Centered Innovation',
    section: 'CPE32S1', professor: 'TBA', room: 'Room 5300',
    color: '#FDEDEC', borderColor: '#E74C3C', units: 3, grade: 'A+',
    term: '2nd Sem SY 2025-2026',
    description: 'Human-centered design thinking, innovation processes, and user research methodologies.',
    topics: ['Design Thinking', 'User Research', 'Prototyping', 'Empathy Mapping', 'Innovation'],
    schedule: [{ day: 'Mon', time: '3:00 - 5:00' }, { day: 'Thu', time: '3:00 - 5:00' }],
  },
  {
    id: '8', code: 'CPE 113', name: 'Intelligent System Design',
    section: 'CPE32S1', professor: 'TBA', room: 'Room 3301',
    color: '#EBF5FB', borderColor: '#2980B9', units: 3, grade: 'B',
    term: '2nd Sem SY 2025-2026',
    description: 'Design and implementation of intelligent systems using machine learning and AI techniques.',
    topics: ['Machine Learning', 'Neural Networks', 'Expert Systems', 'Fuzzy Logic', 'NLP'],
    schedule: [{ day: 'Tue', time: '1:00 - 3:00' }, { day: 'Fri', time: '1:00 - 3:00' }],
  },
  {
    id: '9', code: 'CPE 404', name: 'Computer Networks 3',
    section: 'CPE32S1', professor: 'TBA', room: 'Room 5306',
    color: '#F4ECF7', borderColor: '#8E44AD', units: 3, grade: 'B+',
    term: '2nd Sem SY 2025-2026',
    description: 'Advanced networking concepts including network security, wireless networks, and network management.',
    topics: ['Network Security', 'Wireless Networks', 'VPN', 'SDN', 'Network Management'],
    schedule: [{ day: 'Mon', time: '8:00 - 10:00' }, { day: 'Thu', time: '8:00 - 10:00' }],
  },
  {
    id: '10', code: 'ECE 028', name: 'Feedback and Control Systems',
    section: 'CPE32S1', professor: 'TBA', room: 'Room 2304',
    color: '#FEF5E7', borderColor: '#F39C12', units: 3, grade: 'B',
    term: '2nd Sem SY 2025-2026',
    description: 'Study of feedback control systems, transfer functions, and stability analysis.',
    topics: ['Transfer Functions', 'Bode Plots', 'PID Controllers', 'Stability Analysis', 'Root Locus'],
    schedule: [{ day: 'Wed', time: '10:30 - 12:30' }, { day: 'Sat', time: '8:00 - 10:00' }],
  },
  {
    id: '11', code: 'GEC 008', name: 'Ethics',
    section: 'CPE32S1', professor: 'TBA', room: 'Room 1101',
    color: '#E8F8EF', borderColor: '#27AE60', units: 3, grade: 'A',
    term: '2nd Sem SY 2025-2026',
    description: 'Ethical theories and principles applied to engineering and technology practice.',
    topics: ['Ethical Theories', 'Engineering Ethics', 'Professional Responsibility', 'Case Studies'],
    schedule: [{ day: 'Tue', time: '11:00 - 12:30' }, { day: 'Thu', time: '11:00 - 12:30' }],
  },
  {
    id: '12', code: 'GEE 003', name: 'General Education Elective 3',
    section: 'CPE32S1', professor: 'TBA', room: 'Room 2101',
    color: '#EBF5FB', borderColor: '#2980B9', units: 3, grade: 'A-',
    term: '2nd Sem SY 2025-2026',
    description: 'General education elective covering broad academic and interdisciplinary topics.',
    topics: ['Critical Thinking', 'Communication', 'Social Responsibility', 'Leadership'],
    schedule: [{ day: 'Wed', time: '3:00 - 5:00' }],
  },
];

export const GRADE_BREAKDOWN = {
  '1': { prelim: 92, midterm: 94, finals: null, activities: [95, 88, 92], quizzes: [90, 95] },
  '2': { prelim: 85, midterm: 87, finals: null, activities: [80, 85, 88], quizzes: [82, 86] },
  '3': { prelim: 82, midterm: 84, finals: null, activities: [78, 82, 85], quizzes: [80, 84] },
  '4': { prelim: 91, midterm: 93, finals: null, activities: [90, 92, 94], quizzes: [88, 92] },
  '5': { prelim: 88, midterm: 90, finals: null, activities: [85, 88, 92], quizzes: [86, 90] },
  '6': { prelim: 86, midterm: 88, finals: null, activities: [82, 86, 90], quizzes: [84, 88] },
  '7': { prelim: 95, midterm: 97, finals: null, activities: [94, 96, 98], quizzes: [92, 96] },
  '8': { prelim: 83, midterm: 85, finals: null, activities: [80, 83, 86], quizzes: [81, 85] },
  '9': { prelim: 86, midterm: 88, finals: null, activities: [83, 86, 89], quizzes: [84, 88] },
  '10': { prelim: 82, midterm: 84, finals: null, activities: [79, 82, 85], quizzes: [80, 84] },
  '11': { prelim: 91, midterm: 93, finals: null, activities: [89, 91, 94], quizzes: [88, 92] },
  '12': { prelim: 88, midterm: 90, finals: null, activities: [86, 88, 92], quizzes: [85, 90] },
};

export const WEEKLY_SCHEDULE = {
  0: [],
  1: [
    { id: 'm1', courseId: '9', courseName: 'Computer Networks 3', code: 'CPE 404', topic: 'Network Security Fundamentals', startTime: '8:00', endTime: '10:00', room: 'Room 5306', professor: 'TBA', color: '#F4ECF7', borderColor: '#8E44AD' },
    { id: 'm2', courseId: '2', courseName: 'Data and Digital Communications', code: 'CPE 012', topic: 'Digital Modulation Techniques', startTime: '10:30', endTime: '12:30', room: 'Room 5306', professor: 'TBA', color: '#EBF5FB', borderColor: '#2980B9' },
    { id: 'm3', courseId: '5', courseName: 'Methods of Research', code: 'CPE 020', topic: 'Research Design and Methodology', startTime: '1:00', endTime: '3:00', room: 'Room 2203', professor: 'TBA', color: '#FEF5E7', borderColor: '#F39C12' },
    { id: 'm4', courseId: '7', courseName: 'Human-Centered Innovation', code: 'CPE 033', topic: 'Design Thinking Workshop', startTime: '3:00', endTime: '5:00', room: 'Room 5300', professor: 'TBA', color: '#FDEDEC', borderColor: '#E74C3C' },
  ],
  2: [
    { id: 't1', courseId: '3', courseName: 'Logic Circuits and Design', code: 'CPE 013', topic: 'Sequential Logic Design', startTime: '8:00', endTime: '10:00', room: 'Room 4102', professor: 'TBA', color: '#FDEDEC', borderColor: '#E74C3C' },
    { id: 't2', courseId: '11', courseName: 'Ethics', code: 'GEC 008', topic: 'Engineering Ethics Case Studies', startTime: '11:00', endTime: '12:30', room: 'Room 1101', professor: 'TBA', color: '#E8F8EF', borderColor: '#27AE60' },
    { id: 't3', courseId: '8', courseName: 'Intelligent System Design', code: 'CPE 113', topic: 'Introduction to Neural Networks', startTime: '1:00', endTime: '3:00', room: 'Room 3301', professor: 'TBA', color: '#EBF5FB', borderColor: '#2980B9' },
    { id: 't4', courseId: '6', courseName: 'Software Design 2', code: 'CPE 025B', topic: 'Design Patterns in Practice', startTime: '4:30', endTime: '6:30', room: 'Room 1208', professor: 'TBA', color: '#E8F8EF', borderColor: '#27AE60' },
  ],
  3: [
    { id: 'w1', courseId: '10', courseName: 'Feedback and Control Systems', code: 'ECE 028', topic: 'PID Controller Design', startTime: '10:30', endTime: '12:30', room: 'Room 2304', professor: 'TBA', color: '#FEF5E7', borderColor: '#F39C12' },
    { id: 'w2', courseId: '4', courseName: 'Emerging Technologies 2', code: 'CPE 019', topic: 'AI and Machine Learning Trends', startTime: '1:00', endTime: '3:00', room: 'Room 3201', professor: 'TBA', color: '#F4ECF7', borderColor: '#8E44AD' },
    { id: 'w3', courseId: '12', courseName: 'General Education Elective 3', code: 'GEE 003', topic: 'Leadership and Communication', startTime: '3:00', endTime: '5:00', room: 'Room 2101', professor: 'TBA', color: '#EBF5FB', borderColor: '#2980B9' },
  ],
  4: [
    { id: 'th1', courseId: '9', courseName: 'Computer Networks 3', code: 'CPE 404', topic: 'Wireless Network Protocols', startTime: '8:00', endTime: '10:00', room: 'Room 5306', professor: 'TBA', color: '#F4ECF7', borderColor: '#8E44AD' },
    { id: 'th2', courseId: '2', courseName: 'Data and Digital Communications', code: 'CPE 012', topic: 'Error Detection and Correction', startTime: '10:30', endTime: '12:30', room: 'Room 5306', professor: 'TBA', color: '#EBF5FB', borderColor: '#2980B9' },
    { id: 'th3', courseId: '11', courseName: 'Ethics', code: 'GEC 008', topic: 'Professional Responsibility', startTime: '11:00', endTime: '12:30', room: 'Room 1101', professor: 'TBA', color: '#E8F8EF', borderColor: '#27AE60' },
    { id: 'th4', courseId: '7', courseName: 'Human-Centered Innovation', code: 'CPE 033', topic: 'User Research Methods', startTime: '3:00', endTime: '5:00', room: 'Room 5300', professor: 'TBA', color: '#FDEDEC', borderColor: '#E74C3C' },
  ],
  5: [
    { id: 'f1', courseId: '1', courseName: 'Intro to Intellectual Property', code: 'COE 002A', topic: 'Patents and Copyright Law', startTime: '7:00', endTime: '8:00', room: 'Room TBA', professor: 'TBA', color: '#E8F8EF', borderColor: '#27AE60' },
    { id: 'f2', courseId: '3', courseName: 'Logic Circuits and Design', code: 'CPE 013', topic: 'State Machine Implementation', startTime: '8:00', endTime: '10:00', room: 'Room 4102', professor: 'TBA', color: '#FDEDEC', borderColor: '#E74C3C' },
    { id: 'f3', courseId: '8', courseName: 'Intelligent System Design', code: 'CPE 113', topic: 'Fuzzy Logic Systems', startTime: '1:00', endTime: '3:00', room: 'Room 3301', professor: 'TBA', color: '#EBF5FB', borderColor: '#2980B9' },
    { id: 'f4', courseId: '6', courseName: 'Software Design 2', code: 'CPE 025B', topic: 'Software Architecture Patterns', startTime: '4:30', endTime: '6:30', room: 'Room 1208', professor: 'TBA', color: '#E8F8EF', borderColor: '#27AE60' },
  ],
  6: [
    { id: 's1', courseId: '10', courseName: 'Feedback and Control Systems', code: 'ECE 028', topic: 'Stability Analysis Lab', startTime: '8:00', endTime: '10:00', room: 'Room 2304', professor: 'TBA', color: '#FEF5E7', borderColor: '#F39C12' },
  ],
};

export const TASKS = [
  { id: '1', title: 'CPE 033 - KlassMate Final Project', subtasks: ['Submit documentation', 'Prepare demo presentation'], courseId: '7', dueDate: '2026-01-31', priority: 'high', completed: false, estimatedTime: 180 },
  { id: '2', title: 'CPE 020 - Research Paper Draft', subtasks: ['Write Chapter 3', 'Add references'], courseId: '5', dueDate: '2026-01-28', priority: 'high', completed: false, estimatedTime: 120 },
  { id: '3', title: 'CPE 013 - Logic Design Problem Set', subtasks: [], courseId: '3', dueDate: '2026-01-25', priority: 'medium', completed: true, estimatedTime: 60 },
];

export const USER = {
  name: 'Albano', studentId: 'S1234567-890', email: 'albano@tip.edu.ph',
  program: 'BS Computer Engineering', yearLevel: 3, gpa: 3.25,
  creditsEarned: 85, totalCredits: 180, attendance: 92, tasksAndWork: 75, quiz: 88, avatar: null,
};

export const ONBOARDING_DATA = [
  { id: 1, title: 'Your classes just got a BFF!', subtitle: 'Track, remind, complete – all in one friendly KM.', emoji: '📚', bg: '#FDF0F0' },
  { id: 2, title: "Don't just attend... conquer!", subtitle: 'Stay on top of your schedule, one class at a time.', emoji: '🙋', bg: '#EBF5FB' },
  { id: 3, title: 'Swipe, tap, succeed!', subtitle: 'KM makes your day organized, simple and stress-free.', emoji: '📱', bg: '#E8F8EF' },
];
