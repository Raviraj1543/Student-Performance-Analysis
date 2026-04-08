import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as apiLogin, signupUser as apiSignup } from '../services/api';
import { students, facultyUser, findUserByCredentials, getNextStudentId, getNextFacultyId, subjects } from '../data/mockData';

const AuthContext = createContext(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === null) {
        // Return a default value to prevent crashes during initial render
        return {
            currentUser: null,
            role: null,
            login: () => ({ success: false, message: 'Auth not ready' }),
            signup: () => ({ success: false, message: 'Auth not ready' }),
            logout: () => { },
            getCurrentStudentData: () => null,
        };
    }
    return context;
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const saved = localStorage.getItem('authUser');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });
    const [role, setRole] = useState(() => {
        try {
            const saved = localStorage.getItem('authUser');
            return saved ? JSON.parse(saved).role : null;
        } catch {
            return null;
        }
    });

    async function login(identifier, password) {
        // Try backend API first
        try {
            const data = await apiLogin(identifier, password);
            if (data.success) {
                const user = {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    studentId: data.studentId,
                    facultyId: data.facultyId,
                    department: data.department,
                };
                setCurrentUser(user);
                setRole(user.role);
                localStorage.setItem('authUser', JSON.stringify(user));
                return { success: true, role: user.role };
            } else {
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (err) {
            console.warn('Backend login failed, falling back to local auth:', err.message);
        }

        // Fallback to local/mock auth
        const user = findUserByCredentials(identifier, password);
        if (!user) return { success: false, message: 'Invalid credentials. Please check your Student ID/Email and password.' };

        setCurrentUser(user);
        setRole(user.role);
        localStorage.setItem('authUser', JSON.stringify(user));
        return { success: true, role: user.role };
    }

    async function signup(name, email, password, signupRole) {
        // Try backend API first
        try {
            const data = await apiSignup(name, email, password, signupRole);
            if (data.success) {
                return {
                    success: true,
                    studentId: data.studentId,
                    facultyId: data.facultyId,
                    message: data.message,
                };
            } else {
                return { success: false, message: data.message || 'Signup failed' };
            }
        } catch (err) {
            console.warn('Backend signup failed, falling back to local auth:', err.message);
        }

        // Fallback to local/mock auth
        // Check for duplicate email across all user types
        const allStudents = [...students, ...JSON.parse(localStorage.getItem('registeredStudents') || '[]')];
        const allFaculty = [facultyUser, ...JSON.parse(localStorage.getItem('registeredFaculty') || '[]')];
        if (allStudents.find(s => s.email === email) || allFaculty.find(f => f.email === email)) {
            return { success: false, message: 'Email already registered.' };
        }

        if (signupRole === 'student') {
            const studentId = getNextStudentId();
            const newStudent = {
                id: Date.now(),
                studentId,
                name,
                email,
                password,
                avatar: name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
                grade: '10th',
                section: 'A',
                rollNo: studentId.split('-')[1],
                attendance: 0,
                subjectAttendance: subjects.reduce((acc, sub) => ({ ...acc, [sub.id]: 0 }), {}),
                grades: subjects.reduce((acc, sub) => ({ ...acc, [sub.id]: [0, 0, 0, 0] }), {}),
                assignments: { completed: 0, total: 18 },
                assignmentsList: [],
                role: 'student',
            };

            const registered = JSON.parse(localStorage.getItem('registeredStudents') || '[]');
            registered.push(newStudent);
            localStorage.setItem('registeredStudents', JSON.stringify(registered));
            return { success: true, studentId };
        }

        if (signupRole === 'teacher') {
            const facultyId = getNextFacultyId();
            const newFaculty = {
                id: Date.now(),
                facultyId,
                name,
                email,
                password,
                role: 'teacher',
            };

            const registered = JSON.parse(localStorage.getItem('registeredFaculty') || '[]');
            registered.push(newFaculty);
            localStorage.setItem('registeredFaculty', JSON.stringify(registered));
            return { success: true, facultyId };
        }

        return { success: false, message: 'Invalid role.' };
    }

    function logout() {
        setCurrentUser(null);
        setRole(null);
        localStorage.removeItem('authUser');
    }

    function getCurrentStudentData() {
        if (!currentUser || role !== 'student') return null;
        const found = students.find(s => s.studentId === currentUser.studentId);
        if (found) return found;
        const registered = JSON.parse(localStorage.getItem('registeredStudents') || '[]');
        return registered.find(s => s.studentId === currentUser.studentId) || null;
    }

    return (
        <AuthContext.Provider value={{ currentUser, role, login, signup, logout, getCurrentStudentData }}>
            {children}
        </AuthContext.Provider>
    );
}
