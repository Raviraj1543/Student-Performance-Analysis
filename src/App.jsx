import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherStudents from './pages/TeacherStudents';
import ReportsPage from './pages/ReportsPage';
import StudentDetailPage from './pages/StudentDetailPage';
import StudentDashboard from './pages/StudentDashboard';
import StudentSubjects from './pages/StudentSubjects';
import StudentProgress from './pages/StudentProgress';
import StudentRecommendations from './pages/StudentRecommendations';
import StudentAssignments from './pages/StudentAssignments';

function ProtectedRoute({ allowedRole, children }) {
    const { currentUser, role } = useAuth();
    if (!currentUser) return <Navigate to="/login" replace />;
    if (role !== allowedRole) return <Navigate to="/login" replace />;
    return children;
}

export default function App() {
    const { currentUser, role } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={
                currentUser ? <Navigate to={role === 'teacher' ? '/teacher' : '/student'} replace /> : <LoginPage />
            } />
            <Route path="/signup" element={
                currentUser ? <Navigate to={role === 'teacher' ? '/teacher' : '/student'} replace /> : <SignupPage />
            } />
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Teacher Routes */}
            <Route path="/teacher" element={
                <ProtectedRoute allowedRole="teacher">
                    <Layout><TeacherDashboard /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/teacher/students" element={
                <ProtectedRoute allowedRole="teacher">
                    <Layout><TeacherStudents /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/teacher/reports" element={
                <ProtectedRoute allowedRole="teacher">
                    <Layout><ReportsPage /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/teacher/student/:id" element={
                <ProtectedRoute allowedRole="teacher">
                    <Layout><StudentDetailPage /></Layout>
                </ProtectedRoute>
            } />

            {/* Student Routes */}
            <Route path="/student" element={
                <ProtectedRoute allowedRole="student">
                    <Layout><StudentDashboard /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/student/subjects" element={
                <ProtectedRoute allowedRole="student">
                    <Layout><StudentSubjects /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/student/progress" element={
                <ProtectedRoute allowedRole="student">
                    <Layout><StudentProgress /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/student/recommendations" element={
                <ProtectedRoute allowedRole="student">
                    <Layout><StudentRecommendations /></Layout>
                </ProtectedRoute>
            } />
            <Route path="/student/assignments" element={
                <ProtectedRoute allowedRole="student">
                    <Layout><StudentAssignments /></Layout>
                </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
