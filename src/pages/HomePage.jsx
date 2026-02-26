import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, BarChart3, BookOpen, TrendingUp, Users, ClipboardCheck, Award, ArrowRight, Menu, X } from 'lucide-react';
import './HomePage.css';

export default function HomePage() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    return (
        <div className="home-page">
            {/* ── Top Navigation Bar ── */}
            <header className={`home-topbar ${scrolled ? 'scrolled' : ''}`}>
                <Link to="/" className="home-topbar-logo">
                    <div className="home-topbar-logo-icon">
                        <GraduationCap size={22} />
                    </div>
                    <span>EduTrack</span>
                </Link>

                <button
                    className="home-topbar-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <nav className={`home-topbar-nav ${menuOpen ? 'open' : ''}`}>
                    <Link to="/" className="home-topbar-link active">Home</Link>
                    <Link to="/contact" className="home-topbar-link">Contact</Link>
                    <Link to="/login" className="home-topbar-btn signin">Sign In</Link>
                    <Link to="/signup" className="home-topbar-btn signup">Sign Up</Link>
                </nav>
            </header>

            {/* ── Hero Section ── */}
            <section className="home-hero">
                <div className="home-hero-shapes">
                    <div className="home-hero-shape"></div>
                    <div className="home-hero-shape"></div>
                    <div className="home-hero-shape"></div>
                </div>
                <div className="home-hero-content">
                    <div className="home-hero-badge">
                        <Award size={16} />
                        #1 Student Analytics Platform
                    </div>
                    <h1>
                        Empower Learning with <span>Smart Analytics</span>
                    </h1>
                    <p className="home-hero-subtitle">
                        Track student performance, analyze grades, monitor attendance,
                        and generate insightful reports — all in one beautiful platform.
                    </p>
                    <div className="home-hero-actions">
                        <Link to="/signup" className="home-hero-btn primary">
                            Get Started Free
                            <ArrowRight size={18} />
                        </Link>
                        <Link to="/login" className="home-hero-btn secondary">
                            Sign In to Dashboard
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Stats Section ── */}
            <section className="home-stats">
                <div className="home-stats-grid">
                    <div className="home-stat">
                        <h3>500+</h3>
                        <p>Students Tracked</p>
                    </div>
                    <div className="home-stat">
                        <h3>50+</h3>
                        <p>Active Faculty</p>
                    </div>
                    <div className="home-stat">
                        <h3>98%</h3>
                        <p>Satisfaction Rate</p>
                    </div>
                    <div className="home-stat">
                        <h3>24/7</h3>
                        <p>Platform Access</p>
                    </div>
                </div>
            </section>

            {/* ── Features Section ── */}
            <section className="home-features">
                <div className="home-features-header">
                    <h2>Everything You Need</h2>
                    <p>
                        Powerful tools for teachers and students to track, analyze,
                        and improve academic performance.
                    </p>
                </div>
                <div className="home-features-grid">
                    <div className="home-feature-card">
                        <div className="home-feature-icon purple">
                            <BarChart3 size={24} />
                        </div>
                        <h3>Performance Analytics</h3>
                        <p>Visualize grades and CGPA trends with interactive charts and detailed breakdowns per subject.</p>
                    </div>
                    <div className="home-feature-card">
                        <div className="home-feature-icon blue">
                            <TrendingUp size={24} />
                        </div>
                        <h3>Progress Tracking</h3>
                        <p>Monitor academic improvement over time with semester-wise comparisons and growth indicators.</p>
                    </div>
                    <div className="home-feature-card">
                        <div className="home-feature-icon green">
                            <ClipboardCheck size={24} />
                        </div>
                        <h3>Attendance Management</h3>
                        <p>Track daily attendance records, identify patterns, and ensure students stay on track.</p>
                    </div>
                    <div className="home-feature-card">
                        <div className="home-feature-icon orange">
                            <BookOpen size={24} />
                        </div>
                        <h3>Assignment Tracking</h3>
                        <p>Manage submissions, enforce due dates, and keep all coursework organized in one place.</p>
                    </div>
                    <div className="home-feature-card">
                        <div className="home-feature-icon pink">
                            <Users size={24} />
                        </div>
                        <h3>Role-Based Access</h3>
                        <p>Separate dashboards for teachers and students with secure authentication and personalized views.</p>
                    </div>
                    <div className="home-feature-card">
                        <div className="home-feature-icon indigo">
                            <Award size={24} />
                        </div>
                        <h3>Smart Recommendations</h3>
                        <p>AI-powered insights to identify areas for improvement and recommend personalized study plans.</p>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="home-footer">
                <div className="home-footer-content">
                    <div className="home-footer-logo">
                        <div className="home-footer-logo-icon">
                            <GraduationCap size={18} />
                        </div>
                        <span>EduTrack</span>
                    </div>
                    <p>© 2026 EduTrack Analytics · All rights reserved</p>
                    <div className="home-footer-links">
                        <Link to="/contact">Contact</Link>
                        <Link to="/login">Sign In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
