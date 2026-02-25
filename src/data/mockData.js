// ═══════════════════════════════════════════════════════
//  Mock Data — Student Performance Analytics
// ═══════════════════════════════════════════════════════

export const subjects = [
    { id: 's1', name: 'Mathematics', icon: '📐', color: '#6366F1' },
    { id: 's2', name: 'Physics', icon: '⚛️', color: '#8B5CF6' },
    { id: 's3', name: 'Chemistry', icon: '🧪', color: '#EC4899' },
    { id: 's4', name: 'English', icon: '📖', color: '#3B82F6' },
    { id: 's5', name: 'Computer Science', icon: '💻', color: '#10B981' },
    { id: 's6', name: 'History', icon: '🏛️', color: '#F59E0B' },
];

// ── Faculty user ──
export const facultyUser = {
    email: 'faculty@school.edu',
    password: 'faculty123',
    name: 'Ms. Priya Sharma',
    role: 'teacher',
};

// ── Assignment templates (shared across students) ──
const assignmentTemplates = [
    { id: 'a1', title: 'Linear Equations Worksheet', subjectId: 's1', dueDate: '2026-03-05' },
    { id: 'a2', title: 'Quadratic Functions Problem Set', subjectId: 's1', dueDate: '2026-03-15' },
    { id: 'a3', title: 'Trigonometry Practice', subjectId: 's1', dueDate: '2026-02-20' },
    { id: 'a4', title: 'Newton\'s Laws Lab Report', subjectId: 's2', dueDate: '2026-03-08' },
    { id: 'a5', title: 'Wave Motion Assignment', subjectId: 's2', dueDate: '2026-03-18' },
    { id: 'a6', title: 'Thermodynamics Quiz', subjectId: 's2', dueDate: '2026-02-18' },
    { id: 'a7', title: 'Organic Chemistry Reactions', subjectId: 's3', dueDate: '2026-03-10' },
    { id: 'a8', title: 'Periodic Table Analysis', subjectId: 's3', dueDate: '2026-03-20' },
    { id: 'a9', title: 'Chemical Bonding Essay', subjectId: 's3', dueDate: '2026-02-22' },
    { id: 'a10', title: 'Essay: Modern Literature', subjectId: 's4', dueDate: '2026-03-12' },
    { id: 'a11', title: 'Grammar & Composition', subjectId: 's4', dueDate: '2026-03-22' },
    { id: 'a12', title: 'Poetry Analysis', subjectId: 's4', dueDate: '2026-02-19' },
    { id: 'a13', title: 'Python Data Structures Project', subjectId: 's5', dueDate: '2026-03-14' },
    { id: 'a14', title: 'Algorithm Design Assignment', subjectId: 's5', dueDate: '2026-03-25' },
    { id: 'a15', title: 'Database Normalization', subjectId: 's5', dueDate: '2026-02-21' },
    { id: 'a16', title: 'World War II Research Paper', subjectId: 's6', dueDate: '2026-03-16' },
    { id: 'a17', title: 'Ancient Civilizations Report', subjectId: 's6', dueDate: '2026-03-28' },
    { id: 'a18', title: 'Renaissance Period Essay', subjectId: 's6', dueDate: '2026-02-23' },
];

function generateAssignments(completedCount) {
    // completedCount out of 18 total templates
    return assignmentTemplates.map((tmpl, i) => ({
        ...tmpl,
        submitted: i < completedCount,
        submittedDate: i < completedCount
            ? new Date(new Date(tmpl.dueDate).getTime() - Math.random() * 5 * 86400000).toISOString().split('T')[0]
            : null,
        score: i < completedCount ? Math.floor(60 + Math.random() * 40) : null,
    }));
}

export const students = [
    {
        id: 1, studentId: 'STU1-001', name: 'Aarav Sharma', email: 'aarav@school.edu', password: 'student123', avatar: 'AS',
        grade: '10th', section: 'A', rollNo: '001', attendance: 94,
        subjectAttendance: { s1: 95, s2: 92, s3: 96, s4: 93, s5: 97, s6: 90 },
        grades: { s1: [88, 92, 85, 90], s2: [76, 82, 79, 85], s3: [90, 88, 92, 95], s4: [85, 80, 88, 82], s5: [95, 98, 92, 96], s6: [72, 78, 75, 80] },
        assignments: { completed: 15, total: 18 },
        assignmentsList: generateAssignments(15),
    },
    {
        id: 2, studentId: 'STU1-002', name: 'Priya Patel', email: 'priya@school.edu', password: 'student123', avatar: 'PP',
        grade: '10th', section: 'A', rollNo: '002', attendance: 97,
        subjectAttendance: { s1: 98, s2: 96, s3: 97, s4: 98, s5: 96, s6: 97 },
        grades: { s1: [95, 92, 98, 96], s2: [88, 90, 92, 94], s3: [82, 85, 88, 86], s4: [92, 95, 90, 94], s5: [88, 90, 85, 92], s6: [90, 88, 92, 95] },
        assignments: { completed: 18, total: 18 },
        assignmentsList: generateAssignments(18),
    },
    {
        id: 3, studentId: 'STU1-003', name: 'Rohan Gupta', email: 'rohan@school.edu', password: 'student123', avatar: 'RG',
        grade: '10th', section: 'A', rollNo: '003', attendance: 82,
        subjectAttendance: { s1: 80, s2: 78, s3: 85, s4: 84, s5: 82, s6: 79 },
        grades: { s1: [65, 70, 68, 72], s2: [60, 65, 62, 68], s3: [72, 68, 75, 70], s4: [78, 82, 76, 80], s5: [70, 75, 72, 78], s6: [68, 72, 70, 75] },
        assignments: { completed: 12, total: 18 },
        assignmentsList: generateAssignments(12),
    },
    {
        id: 4, studentId: 'STU1-004', name: 'Ananya Singh', email: 'ananya@school.edu', password: 'student123', avatar: 'AS',
        grade: '10th', section: 'B', rollNo: '004', attendance: 91,
        subjectAttendance: { s1: 90, s2: 93, s3: 89, s4: 92, s5: 91, s6: 90 },
        grades: { s1: [80, 85, 82, 88], s2: [85, 88, 90, 92], s3: [78, 82, 80, 85], s4: [88, 85, 90, 92], s5: [82, 85, 88, 86], s6: [85, 88, 82, 90] },
        assignments: { completed: 16, total: 18 },
        assignmentsList: generateAssignments(16),
    },
    {
        id: 5, studentId: 'STU1-005', name: 'Dev Mehta', email: 'dev@school.edu', password: 'student123', avatar: 'DM',
        grade: '10th', section: 'B', rollNo: '005', attendance: 78,
        subjectAttendance: { s1: 75, s2: 72, s3: 80, s4: 82, s5: 76, s6: 74 },
        grades: { s1: [55, 60, 58, 65], s2: [50, 55, 52, 58], s3: [62, 58, 65, 60], s4: [70, 68, 72, 75], s5: [58, 62, 60, 65], s6: [55, 60, 58, 62] },
        assignments: { completed: 10, total: 18 },
        assignmentsList: generateAssignments(10),
    },
    {
        id: 6, studentId: 'STU1-006', name: 'Kavya Reddy', email: 'kavya@school.edu', password: 'student123', avatar: 'KR',
        grade: '10th', section: 'A', rollNo: '006', attendance: 96,
        subjectAttendance: { s1: 97, s2: 95, s3: 98, s4: 96, s5: 97, s6: 95 },
        grades: { s1: [92, 95, 90, 94], s2: [90, 92, 88, 95], s3: [95, 92, 98, 96], s4: [88, 90, 92, 95], s5: [90, 92, 95, 98], s6: [92, 95, 90, 94] },
        assignments: { completed: 17, total: 18 },
        assignmentsList: generateAssignments(17),
    },
    {
        id: 7, studentId: 'STU1-007', name: 'Arjun Nair', email: 'arjun@school.edu', password: 'student123', avatar: 'AN',
        grade: '10th', section: 'B', rollNo: '007', attendance: 88,
        subjectAttendance: { s1: 87, s2: 85, s3: 90, s4: 89, s5: 88, s6: 86 },
        grades: { s1: [75, 78, 80, 82], s2: [72, 75, 78, 80], s3: [80, 78, 82, 85], s4: [82, 85, 80, 88], s5: [78, 80, 82, 85], s6: [75, 78, 80, 82] },
        assignments: { completed: 14, total: 18 },
        assignmentsList: generateAssignments(14),
    },
    {
        id: 8, studentId: 'STU1-008', name: 'Shreya Joshi', email: 'shreya@school.edu', password: 'student123', avatar: 'SJ',
        grade: '10th', section: 'A', rollNo: '008', attendance: 93,
        subjectAttendance: { s1: 94, s2: 91, s3: 95, s4: 93, s5: 94, s6: 92 },
        grades: { s1: [82, 85, 88, 90], s2: [78, 80, 82, 85], s3: [85, 88, 90, 92], s4: [90, 92, 88, 95], s5: [85, 88, 90, 92], s6: [82, 85, 88, 90] },
        assignments: { completed: 17, total: 18 },
        assignmentsList: generateAssignments(17),
    },
    {
        id: 9, studentId: 'STU1-009', name: 'Vikram Kumar', email: 'vikram@school.edu', password: 'student123', avatar: 'VK',
        grade: '10th', section: 'B', rollNo: '009', attendance: 75,
        subjectAttendance: { s1: 72, s2: 70, s3: 78, s4: 76, s5: 73, s6: 71 },
        grades: { s1: [48, 52, 55, 58], s2: [45, 50, 48, 52], s3: [55, 52, 58, 55], s4: [62, 65, 60, 68], s5: [50, 52, 55, 58], s6: [48, 52, 50, 55] },
        assignments: { completed: 8, total: 18 },
        assignmentsList: generateAssignments(8),
    },
    {
        id: 10, studentId: 'STU1-010', name: 'Diya Iyer', email: 'diya@school.edu', password: 'student123', avatar: 'DI',
        grade: '10th', section: 'A', rollNo: '010', attendance: 98,
        subjectAttendance: { s1: 99, s2: 97, s3: 98, s4: 98, s5: 99, s6: 97 },
        grades: { s1: [98, 96, 95, 98], s2: [95, 92, 98, 96], s3: [92, 95, 90, 94], s4: [96, 98, 95, 98], s5: [98, 96, 98, 100], s6: [95, 92, 98, 96] },
        assignments: { completed: 18, total: 18 },
        assignmentsList: generateAssignments(18),
    },
    {
        id: 11, studentId: 'STU1-011', name: 'Rahul Verma', email: 'rahul@school.edu', password: 'student123', avatar: 'RV',
        grade: '10th', section: 'B', rollNo: '011', attendance: 85,
        subjectAttendance: { s1: 84, s2: 82, s3: 87, s4: 86, s5: 85, s6: 83 },
        grades: { s1: [70, 72, 75, 78], s2: [68, 70, 72, 75], s3: [75, 72, 78, 80], s4: [80, 78, 82, 85], s5: [72, 75, 78, 80], s6: [70, 72, 75, 78] },
        assignments: { completed: 13, total: 18 },
        assignmentsList: generateAssignments(13),
    },
    {
        id: 12, studentId: 'STU1-012', name: 'Meera Kapoor', email: 'meera@school.edu', password: 'student123', avatar: 'MK',
        grade: '10th', section: 'A', rollNo: '012', attendance: 92,
        subjectAttendance: { s1: 93, s2: 90, s3: 94, s4: 92, s5: 93, s6: 91 },
        grades: { s1: [85, 88, 82, 90], s2: [82, 85, 88, 90], s3: [88, 90, 85, 92], s4: [85, 88, 90, 92], s5: [88, 90, 92, 95], s6: [82, 85, 88, 90] },
        assignments: { completed: 16, total: 18 },
        assignmentsList: generateAssignments(16),
    },
    {
        id: 13, studentId: 'STU1-013', name: 'Sahil Chopra', email: 'sahil@school.edu', password: 'student123', avatar: 'SC',
        grade: '10th', section: 'B', rollNo: '013', attendance: 80,
        subjectAttendance: { s1: 78, s2: 76, s3: 82, s4: 81, s5: 79, s6: 77 },
        grades: { s1: [60, 62, 65, 68], s2: [55, 58, 60, 62], s3: [65, 62, 68, 70], s4: [72, 75, 70, 78], s5: [62, 65, 68, 70], s6: [58, 62, 60, 65] },
        assignments: { completed: 11, total: 18 },
        assignmentsList: generateAssignments(11),
    },
    {
        id: 14, studentId: 'STU1-014', name: 'Nisha Agarwal', email: 'nisha@school.edu', password: 'student123', avatar: 'NA',
        grade: '10th', section: 'A', rollNo: '014', attendance: 95,
        subjectAttendance: { s1: 96, s2: 94, s3: 97, s4: 95, s5: 96, s6: 93 },
        grades: { s1: [90, 92, 88, 94], s2: [88, 90, 85, 92], s3: [92, 90, 95, 92], s4: [94, 92, 96, 95], s5: [90, 92, 88, 94], s6: [88, 90, 92, 95] },
        assignments: { completed: 17, total: 18 },
        assignmentsList: generateAssignments(17),
    },
    {
        id: 15, studentId: 'STU1-015', name: 'Karan Malhotra', email: 'karan@school.edu', password: 'student123', avatar: 'KM',
        grade: '10th', section: 'B', rollNo: '015', attendance: 87,
        subjectAttendance: { s1: 86, s2: 84, s3: 89, s4: 88, s5: 87, s6: 85 },
        grades: { s1: [78, 80, 76, 82], s2: [75, 78, 72, 80], s3: [80, 78, 82, 85], s4: [82, 80, 85, 88], s5: [78, 80, 82, 85], s6: [75, 78, 80, 82] },
        assignments: { completed: 15, total: 18 },
        assignmentsList: generateAssignments(15),
    },
];

export const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];

// ── Helper Functions ──
export function getStudentAvg(student) {
    const allGrades = Object.values(student.grades).flat();
    return Math.round(allGrades.reduce((a, b) => a + b, 0) / allGrades.length);
}

export function getSubjectAvg(student, subjectId) {
    const g = student.grades[subjectId];
    return g ? Math.round(g.reduce((a, b) => a + b, 0) / g.length) : 0;
}

export function getLatestGrade(student, subjectId) {
    const g = student.grades[subjectId];
    return g ? g[g.length - 1] : 0;
}

export function getGradeLabel(score) {
    if (score >= 90) return { label: 'A+', color: 'success' };
    if (score >= 80) return { label: 'A', color: 'success' };
    if (score >= 70) return { label: 'B', color: 'info' };
    if (score >= 60) return { label: 'C', color: 'warning' };
    if (score >= 50) return { label: 'D', color: 'warning' };
    return { label: 'F', color: 'error' };
}

export function getTrend(grades) {
    if (grades.length < 2) return 'stable';
    const recent = grades[grades.length - 1];
    const prev = grades[grades.length - 2];
    if (recent > prev + 2) return 'up';
    if (recent < prev - 2) return 'down';
    return 'stable';
}

export function getClassAvg(subjectId) {
    const total = students.reduce((sum, s) => sum + getSubjectAvg(s, subjectId), 0);
    return Math.round(total / students.length);
}

export function getTopStudents(n = 5) {
    return [...students].sort((a, b) => getStudentAvg(b) - getStudentAvg(a)).slice(0, n);
}

export function getAtRiskStudents() {
    return students.filter(s => getStudentAvg(s) < 65 || s.attendance < 80);
}

export function getPerformanceDistribution() {
    const dist = { 'A+ (90-100)': 0, 'A (80-89)': 0, 'B (70-79)': 0, 'C (60-69)': 0, 'D (50-59)': 0, 'F (<50)': 0 };
    students.forEach(s => {
        const avg = getStudentAvg(s);
        if (avg >= 90) dist['A+ (90-100)']++;
        else if (avg >= 80) dist['A (80-89)']++;
        else if (avg >= 70) dist['B (70-79)']++;
        else if (avg >= 60) dist['C (60-69)']++;
        else if (avg >= 50) dist['D (50-59)']++;
        else dist['F (<50)']++;
    });
    return Object.entries(dist).map(([name, value]) => ({ name, value }));
}

export function getSubjectPerformance() {
    return subjects.map(sub => ({
        name: sub.name,
        average: getClassAvg(sub.id),
        highest: Math.max(...students.map(s => getSubjectAvg(s, sub.id))),
        lowest: Math.min(...students.map(s => getSubjectAvg(s, sub.id))),
        color: sub.color,
    }));
}

export function getTermTrends() {
    return terms.map((term, i) => {
        const row = { term };
        subjects.forEach(sub => {
            const termGrades = students.map(s => s.grades[sub.id]?.[i] || 0);
            row[sub.name] = Math.round(termGrades.reduce((a, b) => a + b, 0) / termGrades.length);
        });
        return row;
    });
}

// ── CGPA Calculation (10-point scale) ──
export function getGradePoint(score) {
    if (score >= 90) return 10;
    if (score >= 80) return 9;
    if (score >= 70) return 8;
    if (score >= 60) return 7;
    if (score >= 50) return 6;
    if (score >= 40) return 5;
    return 0;
}

export function getStudentCGPA(student) {
    const subjectGPs = subjects.map(sub => getGradePoint(getSubjectAvg(student, sub.id)));
    return (subjectGPs.reduce((a, b) => a + b, 0) / subjectGPs.length).toFixed(2);
}

// ── Lowest students & weak point analysis ──
export function getLowestStudents(n = 3) {
    return [...students].sort((a, b) => getStudentAvg(a) - getStudentAvg(b)).slice(0, n);
}

export function getWeakSubjects(student) {
    return subjects
        .map(sub => ({ ...sub, avg: getSubjectAvg(student, sub.id) }))
        .sort((a, b) => a.avg - b.avg)
        .slice(0, 3);
}

export function getTopPerSubject() {
    return subjects.map(sub => {
        const sorted = [...students].sort((a, b) => getSubjectAvg(b, sub.id) - getSubjectAvg(a, sub.id));
        return {
            subject: sub,
            topStudent: sorted[0],
            topScore: getSubjectAvg(sorted[0], sub.id),
        };
    });
}

// ── Get ALL students (built-in + registered from localStorage) ──
export function getAllStudents() {
    const registered = JSON.parse(localStorage.getItem('registeredStudents') || '[]');
    return [...students, ...registered];
}

// ── Next student ID generator (atomic counter) ──
export function getNextStudentId() {
    // Initialize counter from existing data if first time
    let counter = parseInt(localStorage.getItem('_stuIdCounter') || '0', 10);
    if (counter === 0) {
        // Seed from built-in + registered students
        const registered = JSON.parse(localStorage.getItem('registeredStudents') || '[]');
        const allIds = [...students.map(s => s.studentId), ...registered.map(s => s.studentId)];
        counter = allIds.reduce((max, id) => {
            const num = parseInt(id.split('-')[1], 10);
            return num > max ? num : max;
        }, 0);
    }
    counter++;
    localStorage.setItem('_stuIdCounter', String(counter));
    return `STU1-${String(counter).padStart(3, '0')}`;
}

// ── Find student by studentId or email ──
export function findUserByCredentials(identifier, password) {
    // Check built-in faculty
    if ((identifier === facultyUser.email || identifier.toLowerCase() === 'faculty') && password === facultyUser.password) {
        return { ...facultyUser, role: 'teacher' };
    }

    // Check registered faculty
    const regFaculty = JSON.parse(localStorage.getItem('registeredFaculty') || '[]');
    const faculty = regFaculty.find(
        f => (f.email === identifier || f.facultyId === identifier) && f.password === password
    );
    if (faculty) return { ...faculty, role: 'teacher' };

    // Check built-in students + registered students
    const allStudents = [...students, ...JSON.parse(localStorage.getItem('registeredStudents') || '[]')];
    const student = allStudents.find(
        s => (s.studentId === identifier || s.email === identifier) && s.password === password
    );
    if (student) return { ...student, role: 'student' };

    return null;
}

// ── Next faculty ID generator (atomic counter) ──
export function getNextFacultyId() {
    let counter = parseInt(localStorage.getItem('_facIdCounter') || '0', 10);
    if (counter === 0) {
        const registered = JSON.parse(localStorage.getItem('registeredFaculty') || '[]');
        counter = registered.reduce((max, f) => {
            const num = parseInt(f.facultyId.split('-')[1], 10);
            return num > max ? num : max;
        }, 0);
    }
    counter++;
    localStorage.setItem('_facIdCounter', String(counter));
    return `FAC-${String(counter).padStart(3, '0')}`;
}
