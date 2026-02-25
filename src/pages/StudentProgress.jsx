import { subjects, terms, getSubjectAvg, getStudentAvg } from '../data/mockData';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import ChartCard from '../components/ChartCard';
import ProgressRing from '../components/ProgressRing';

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B'];

export default function StudentProgress() {
    const { getCurrentStudentData } = useAuth();
    const currentStudent = getCurrentStudentData();

    if (!currentStudent) {
        return <div className="page-content"><h1 className="page-title">Student data not found</h1></div>;
    }

    const avg = getStudentAvg(currentStudent);

    const progressData = terms.map((term, i) => {
        const row = { term };
        let total = 0;
        subjects.forEach(sub => {
            const score = currentStudent.grades[sub.id]?.[i] || 0;
            row[sub.name] = score;
            total += score;
        });
        row['Overall'] = Math.round(total / subjects.length);
        return row;
    });

    // Term-over-term improvement
    const termAverages = progressData.map(d => d['Overall']);
    const improvement = termAverages.length >= 2 ? termAverages[termAverages.length - 1] - termAverages[0] : 0;

    return (
        <div className="page-content">
            <h1 className="page-title">Progress Tracker</h1>
            <p className="page-subtitle">Track your academic growth over time</p>

            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 28 }}>
                <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                    <ProgressRing value={avg} color="#6366F1" size={110} label="Current Average" />
                </div>
                <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                    <ProgressRing value={currentStudent.attendance} color="#10B981" size={110} label="Attendance Rate" />
                </div>
                <div className="card" style={{ padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '2.2rem', fontWeight: 700, color: improvement >= 0 ? 'var(--success-dark)' : 'var(--error-dark)' }}>
                        {improvement >= 0 ? '+' : ''}{improvement}%
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 8 }}>
                        Growth Since Term 1
                    </div>
                </div>
            </div>

            {/* Progress Chart */}
            <ChartCard title="Performance Over Time" subtitle="All subjects across terms" style={{ marginBottom: 28 }}>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="term" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#94A3B8" />
                        <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0' }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                        {subjects.map((sub, i) => (
                            <Line key={sub.id} type="monotone" dataKey={sub.name} stroke={COLORS[i]} strokeWidth={2} dot={{ r: 4 }} />
                        ))}
                        <Line type="monotone" dataKey="Overall" stroke="#1E293B" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* Term-wise Breakdown */}
            <div className="card" style={{ overflow: 'hidden' }}>
                <div className="card-header"><h3 className="card-title">Term-wise Breakdown</h3></div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)' }}>
                                    Subject
                                </th>
                                {terms.map(t => (
                                    <th key={t} style={{ padding: '12px 16px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)' }}>
                                        {t}
                                    </th>
                                ))}
                                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', background: 'var(--gray-50)', borderBottom: '1px solid var(--border-color)' }}>
                                    Average
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map(sub => {
                                const scores = currentStudent.grades[sub.id] || [];
                                const subAvg = getSubjectAvg(currentStudent, sub.id);
                                return (
                                    <tr key={sub.id}>
                                        <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>
                                            {sub.icon} {sub.name}
                                        </td>
                                        {scores.map((score, i) => (
                                            <td key={i} style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', textAlign: 'center', fontWeight: 500 }}>
                                                {score}
                                            </td>
                                        ))}
                                        <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', textAlign: 'center', fontWeight: 700, color: 'var(--primary-600)' }}>
                                            {subAvg}%
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
