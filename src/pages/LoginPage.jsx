import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, LogIn, Eye, EyeOff, User, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            const result = login(identifier.trim(), password);
            if (result.success) {
                navigate(result.role === 'teacher' ? '/teacher' : '/student');
            } else {
                setError(result.message);
            }
            setLoading(false);
        }, 500);
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-logo">
                    <div className="login-logo-icon">
                        <GraduationCap size={28} />
                    </div>
                    <h1>EduTrack</h1>
                </div>
                <p className="login-subtitle">
                    Student Performance Analytics Platform<br />
                    Sign in to your account
                </p>

                <form className="login-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="login-error">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <div className="login-field">
                        <label htmlFor="identifier">Student ID or Email</label>
                        <div className="login-input-wrapper">
                            <User size={18} className="login-input-icon" />
                            <input
                                id="identifier"
                                type="text"
                                placeholder="STU1-001 or email@school.edu"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="login-field">
                        <label htmlFor="password">Password</label>
                        <div className="login-input-wrapper">
                            <Lock size={18} className="login-input-icon" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="login-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? (
                            <span className="login-spinner"></span>
                        ) : (
                            <>
                                <LogIn size={18} />
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <div className="login-divider">
                    <span>New to EduTrack?</span>
                </div>

                <Link to="/signup" className="login-signup-link">
                    Create an Account
                </Link>

                <div className="login-demo-info">
                    <p><strong>Demo Credentials:</strong></p>
                    <p>Student: <code>STU1-001</code> / <code>student123</code></p>
                    <p>Faculty: <code>faculty@school.edu</code> / <code>faculty123</code></p>
                </div>

                <p className="login-footer">
                    © 2026 EduTrack Analytics · All rights reserved
                </p>
            </div>
        </div>
    );
}
