import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Send, CheckCircle, Menu, X } from 'lucide-react';
import './ContactPage.css';
import './HomePage.css'; /* reuse top bar styles */

export default function ContactPage() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="contact-page">
            {/* ── Top Navigation Bar (shared style with HomePage) ── */}
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
                    <Link to="/" className="home-topbar-link">Home</Link>
                    <Link to="/contact" className="home-topbar-link active">Contact</Link>
                    <Link to="/login" className="home-topbar-btn signin">Sign In</Link>
                    <Link to="/signup" className="home-topbar-btn signup">Sign Up</Link>
                </nav>
            </header>

            {/* ── Contact Content ── */}
            <main className="contact-main">
                <div className="contact-header">
                    <h1>Get in Touch</h1>
                    <p>Have questions about EduTrack? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="contact-grid">
                    {/* Contact Form */}
                    <div className="contact-form-card">
                        <h2>Send a Message</h2>

                        {submitted ? (
                            <div className="contact-success">
                                <div className="contact-success-icon">
                                    <CheckCircle size={48} />
                                </div>
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="contact-field">
                                    <label htmlFor="contact-name">Full Name</label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="contact-email">Email Address</label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="contact-message">Message</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        placeholder="How can we help you?"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="contact-submit-btn">
                                    <Send size={18} />
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="contact-info-card">
                        <h2>Contact Information</h2>

                        <div className="contact-info-item">
                            <div className="contact-info-icon purple">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3>Email</h3>
                                <p>support@edutrack.com</p>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-info-icon blue">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h3>Phone</h3>
                                <p>+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-info-icon green">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3>Address</h3>
                                <p>EduTrack Analytics Pvt. Ltd.<br />Tech Park, Hyderabad, India</p>
                            </div>
                        </div>

                        <div className="contact-hours">
                            <h3>🕐 Support Hours</h3>
                            <p>
                                Monday – Friday: 9:00 AM – 6:00 PM<br />
                                Saturday: 10:00 AM – 2:00 PM<br />
                                Sunday: Closed
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
