import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, FileBarChart, BookOpen,
    TrendingUp, Award, LogOut, GraduationCap, Clipboard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const teacherLinks = [
    { to: '/teacher', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/teacher/students', icon: Users, label: 'Students' },
    { to: '/teacher/reports', icon: FileBarChart, label: 'Reports' },
];

const studentLinks = [
    { to: '/student', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/student/subjects', icon: BookOpen, label: 'Subjects' },
    { to: '/student/progress', icon: TrendingUp, label: 'Progress' },
    { to: '/student/assignments', icon: Clipboard, label: 'Assignments' },
    { to: '/student/recommendations', icon: Award, label: 'Recommendations' },
];

export default function Sidebar({ role, userName }) {
    const navigate = useNavigate();
    const { logout, currentUser } = useAuth();
    const links = role === 'teacher' ? teacherLinks : studentLinks;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <GraduationCap size={20} />
                </div>
                <div className="sidebar-brand">
                    <h1>EduTrack</h1>
                    <span>Analytics Platform</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <span className="sidebar-section-label">
                    {role === 'teacher' ? 'Administration' : 'My Learning'}
                </span>
                {links.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.end}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <link.icon size={20} />
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                {currentUser?.studentId && (
                    <div className="sidebar-student-id">
                        ID: {currentUser.studentId}
                    </div>
                )}
                <div
                    className="sidebar-user"
                    onClick={handleLogout}
                    title="Logout"
                >
                    <div
                        className="sidebar-user-avatar"
                        style={{
                            background: role === 'teacher'
                                ? 'linear-gradient(135deg, #6366F1, #8B5CF6)'
                                : 'linear-gradient(135deg, #10B981, #3B82F6)'
                        }}
                    >
                        {userName?.split(' ').map(w => w[0]).join('').slice(0, 2) || (role === 'teacher' ? 'TC' : 'ST')}
                    </div>
                    <div className="sidebar-user-info">
                        <h4>{userName || (role === 'teacher' ? 'Teacher' : 'Student')}</h4>
                        <span>{role === 'teacher' ? 'Administrator' : 'Student'}</span>
                    </div>
                    <LogOut size={16} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
                </div>
            </div>
        </aside>
    );
}
