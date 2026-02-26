import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, UserPlus, Eye, EyeOff, User, Mail, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './SignupPage.css';

export default function SignupPage() {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(null);
        setLoading(true);

        setTimeout(() => {
            const result = signup(name.trim(), email.trim(), password, 'student');
            if (result.success) {
                setSuccess(result.studentId);
            } else {
                setError(result.message);
            }
            setLoading(false);
        }, 600);
    };

    if (success) {
        return (
            <div className="login-page">
                <div className="signup-card">
                    <div className="signup-success">
                        <div className="signup-success-icon">
                            <CheckCircle size={48} />
                        </div>
                        <h2>Account Created!</h2>
                        <p>Your unique Student ID is:</p>
                        <div className="signup-student-id">{success}</div>
                        <p className="signup-success-note">
                            Please save this ID. You can use it or your email to log in along with your password.
                        </p>
                        <button className="login-btn" onClick={() => navigate('/login')}>
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="login-page">
            <div className="signup-card">
                <div className="login-logo">
                    <div className="login-logo-icon">
                        <GraduationCap size={28} />
                    </div>
                    <h1>EduTrack</h1>
                </div>
                <p className="login-subtitle">
                    Create your student account<br />
                    Fill in your details to register
                </p>

                <div className="signup-info-note">
                    <span>ℹ️</span> Faculty accounts are created by the administrator only.
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="login-error">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <div className="login-field">
                        <label htmlFor="name">Full Name</label>
                        <div className="login-input-wrapper">
                            <User size={18} className="login-input-icon" />
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="login-field">
                        <label htmlFor="email">Email Address</label>
                        <div className="login-input-wrapper">
                            <Mail size={18} className="login-input-icon" />
                            <input
                                id="email"
                                type="email"
                                placeholder="you@school.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="login-field">
                        <label htmlFor="signup-password">Password</label>
                        <div className="login-input-wrapper">
                            <Lock size={18} className="login-input-icon" />
                            <input
                                id="signup-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
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
                                <UserPlus size={18} />
                                Create Student Account
                            </>
                        )}
                    </button>
                </form>

                <div className="login-divider">
                    <span>Already have an account?</span>
                </div>

                <Link to="/login" className="login-signup-link">
                    Sign In Instead
                </Link>

                <p className="login-footer">
                    © 2026 EduTrack Analytics · All rights reserved
                </p>
            </div>
        </div>
    );
}
