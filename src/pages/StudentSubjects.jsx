import { subjects, getSubjectAvg, getClassAvg, getGradeLabel } from '../data/mockData';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import ChartCard from '../components/ChartCard';

export default function StudentSubjects() {
    const { getCurrentStudentData } = useAuth();
    const currentStudent = getCurrentStudentData();

    if (!currentStudent) {
        return <div className="page-content"><h1 className="page-title">Student data not found</h1></div>;
    }

    const subjectData = subjects.map(sub => ({
        name: sub.name,
        icon: sub.icon,
        myScore: getSubjectAvg(currentStudent, sub.id),
        classAvg: getClassAvg(sub.id),
        color: sub.color,
    }));

    return (
        <div className="page-content">
            <h1 className="page-title">Subject Analysis</h1>
            <p className="page-subtitle">Compare your performance with class averages</p>

            <ChartCard title="Your Scores vs Class Average" subtitle="Subject-by-subject comparison">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={subjectData} barSize={24}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#94A3B8" />
                        <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0' }} />
                        <Bar dataKey="myScore" name="Your Score" fill="#6366F1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="classAvg" name="Class Average" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginTop: 28 }}>
                {subjectData.map(sub => {
                    const diff = sub.myScore - sub.classAvg;
                    const grade = getGradeLabel(sub.myScore);
                    return (
                        <div key={sub.name} className="card" style={{ padding: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                <span style={{ fontSize: '1.5rem' }}>{sub.icon}</span>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{sub.name}</div>
                                    <span className={`badge badge-${grade.color}`}>{grade.label}</span>
                                </div>
                                <div style={{ marginLeft: 'auto', fontSize: '1.4rem', fontWeight: 700, color: sub.color }}>{sub.myScore}%</div>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                Class Average: {sub.classAvg}% ·
                                <span style={{ color: diff >= 0 ? 'var(--success-dark)' : 'var(--error-dark)', fontWeight: 600 }}>
                                    {' '}{diff >= 0 ? '+' : ''}{diff}% {diff >= 0 ? 'above' : 'below'}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
