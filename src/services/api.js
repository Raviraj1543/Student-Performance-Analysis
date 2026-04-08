import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Add response interceptor for error handling
API.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.status, error.message);
        return Promise.reject(error);
    }
);

// ═══════════════════════════════════════════════════════
//  Auth API — Login / Signup
// ═══════════════════════════════════════════════════════

export async function loginUser(identifier, password) {
    const response = await API.post('/auth/login', { identifier, password });
    return response.data;
}

export async function signupUser(name, email, password, role) {
    const response = await API.post('/auth/signup', { name, email, password, role });
    return response.data;
}

export async function getAllUsers() {
    const response = await API.get('/auth/users');
    return response.data;
}

// ═══════════════════════════════════════════════════════
//  Students API — CRUD Operations
// ═══════════════════════════════════════════════════════

export async function getStudents() {
    const response = await API.get('/students');
    return response.data;
}

export async function getStudentById(id) {
    const response = await API.get(`/students/${id}`);
    return response.data;
}

export async function addStudent(student) {
    const response = await API.post('/students', student);
    return response.data;
}

export async function updateStudent(id, student) {
    const response = await API.put(`/students/${id}`, student);
    return response.data;
}

export async function deleteStudent(id) {
    const response = await API.delete(`/students/${id}`);
    return response.data;
}

// ═══════════════════════════════════════════════════════
//  Performance API — CRUD + Analytics
// ═══════════════════════════════════════════════════════

export async function getPerformanceData() {
    const response = await API.get('/performance');
    return response.data;
}

export async function getPerformanceById(id) {
    const response = await API.get(`/performance/${id}`);
    return response.data;
}

export async function addPerformance(data) {
    const response = await API.post('/performance', data);
    return response.data;
}

export async function updatePerformance(id, data) {
    const response = await API.put(`/performance/${id}`, data);
    return response.data;
}

export async function deletePerformance(id) {
    const response = await API.delete(`/performance/${id}`);
    return response.data;
}

export async function getStudentPerformance(studentId) {
    const response = await API.get(`/performance/student/${studentId}`);
    return response.data;
}

export async function getStudentAverage(studentId) {
    const response = await API.get(`/performance/average/${studentId}`);
    return response.data;
}

export async function getWeakSubject(studentId) {
    const response = await API.get(`/performance/weak/${studentId}`);
    return response.data;
}

export default API;