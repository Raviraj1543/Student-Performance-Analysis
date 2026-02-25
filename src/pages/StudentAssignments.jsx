import { useState } from 'react';
import { Clipboard, CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { subjects } from '../data/mockData';
import StatCard from '../components/StatCard';
import './StudentAssignments.css';

export default function StudentAssignments() {
    const { getCurrentStudentData } = useAuth();
    const student = getCurrentStudentData();
    const [filter, setFilter] = useState('all');
    const [submittedIds, setSubmittedIds] = useState([]);

    if (!student) {
        return <div className="page-content"><h1 className="page-title">Student data not found</h1></div>;
    }

    const assignments = student.assignmentsList || [];
    const today = new Date('2026-02-25');

    const getStatus = (a) => {
        if (a.submitted || submittedIds.includes(a.id)) return 'submitted';
        const due = new Date(a.dueDate);
        if (due < today) return 'overdue';
        return 'pending';
    };

    const allWithStatus = assignments.map(a => ({
        ...a,
        status: getStatus(a),
        subjectName: subjects.find(s => s.id === a.subjectId)?.name || 'Unknown',
        subjectIcon: subjects.find(s => s.id === a.subjectId)?.icon || '📝',
        subjectColor: subjects.find(s => s.id === a.subjectId)?.color || '#6366F1',
    }));

    const submitted = allWithStatus.filter(a => a.status === 'submitted');
    const pending = allWithStatus.filter(a => a.status === 'pending');
    const overdue = allWithStatus.filter(a => a.status === 'overdue');

    const filtered = filter === 'all' ? allWithStatus :
        filter === 'submitted' ? submitted :
            filter === 'pending' ? pending : overdue;

    const handleSubmit = (assignmentId) => {
        setSubmittedIds(prev => [...prev, assignmentId]);
    };

    return (
        <div className="page-content student-assignments">
            <h1 className="page-title">My Assignments</h1>
            <p className="page-subtitle">Track and submit your assignments</p>

            {/* Stats Row */}
            <div className="stats-grid">
                <StatCard
                    icon={Clipboard}
                    label="Total Assignments"
                    value={allWithStatus.length}
                    trend="stable"
                    trendValue="All subjects"
                    color="#6366F1"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Submitted"
                    value={submitted.length}
                    trend="up"
                    trendValue={`${Math.round((submitted.length / allWithStatus.length) * 100)}% complete`}
                    color="#10B981"
                />
                <StatCard
                    icon={Clock}
                    label="Pending"
                    value={pending.length}
                    trend={pending.length > 3 ? 'down' : 'stable'}
                    trendValue={pending.length > 0 ? 'Action needed' : 'All done!'}
                    color="#F59E0B"
                />
                <StatCard
                    icon={AlertCircle}
                    label="Overdue"
                    value={overdue.length}
                    trend={overdue.length > 0 ? 'down' : 'up'}
                    trendValue={overdue.length > 0 ? 'Cannot submit' : 'Great job!'}
                    color="#EF4444"
                />
            </div>

            {/* Progress Bar */}
            <div className="assignments-progress-card card">
                <div className="assignments-progress-header">
                    <h3>Completion Progress</h3>
                    <span className="assignments-progress-pct">{Math.round((submitted.length / allWithStatus.length) * 100)}%</span>
                </div>
                <div className="assignments-progress-bar">
                    <div
                        className="assignments-progress-fill"
                        style={{ width: `${(submitted.length / allWithStatus.length) * 100}%` }}
                    ></div>
                </div>
                <div className="assignments-progress-legend">
                    <span className="legend-submitted">✅ {submitted.length} Submitted</span>
                    <span className="legend-pending">⏳ {pending.length} Pending</span>
                    <span className="legend-overdue">❌ {overdue.length} Overdue</span>
                </div>
            </div>

            {/* Filters */}
            <div className="assignments-filters">
                {[
                    { key: 'all', label: 'All', count: allWithStatus.length },
                    { key: 'submitted', label: 'Submitted', count: submitted.length },
                    { key: 'pending', label: 'Pending', count: pending.length },
                    { key: 'overdue', label: 'Overdue', count: overdue.length },
                ].map(f => (
                    <button
                        key={f.key}
                        className={`assignments-filter-btn ${filter === f.key ? 'active' : ''}`}
                        onClick={() => setFilter(f.key)}
                    >
                        {f.label} <span className="filter-count">{f.count}</span>
                    </button>
                ))}
            </div>

            {/* Assignments List */}
            <div className="assignments-list">
                {filtered.length === 0 && (
                    <div className="card" style={{ padding: 40, textAlign: 'center' }}>
                        <span style={{ fontSize: '2.5rem' }}>🎉</span>
                        <h3 style={{ marginTop: 12, fontWeight: 600 }}>No assignments in this category</h3>
                    </div>
                )}
                {filtered.map(a => (
                    <div key={a.id} className={`assignment-card card ${a.status}`}>
                        <div className="assignment-card-left">
                            <span className="assignment-subject-icon">{a.subjectIcon}</span>
                            <div className="assignment-info">
                                <h4 className="assignment-title">{a.title}</h4>
                                <div className="assignment-meta">
                                    <span className="assignment-subject" style={{ color: a.subjectColor }}>{a.subjectName}</span>
                                    <span className="assignment-dot">·</span>
                                    <span className="assignment-due">Due: {new Date(a.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                        <div className="assignment-card-right">
                            {a.status === 'submitted' && (
                                <div className="assignment-status-badge submitted">
                                    <CheckCircle size={16} />
                                    <span>Submitted</span>
                                    {a.score && <span className="assignment-score">{a.score}/100</span>}
                                </div>
                            )}
                            {a.status === 'pending' && (
                                <button className="assignment-submit-btn" onClick={() => handleSubmit(a.id)}>
                                    <ArrowRight size={16} />
                                    Submit
                                </button>
                            )}
                            {a.status === 'overdue' && (
                                <div className="assignment-status-badge overdue">
                                    <AlertCircle size={16} />
                                    <span>Overdue</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
