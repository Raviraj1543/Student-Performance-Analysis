import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Hash, MapPin, Target, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
    students, subjects, terms, getStudentAvg, getSubjectAvg,
    getGradeLabel, getTrend
} from '../data/mockData';
import { getStudentRecommendations } from '../data/recommendations';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import RecommendationCard from '../components/RecommendationCard';
import './StudentDetailPage.css';

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B'];

export default function StudentDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const student = students.find(s => s.id === Number(id));

    if (!student) {
        return (
            <div className="page-content">
                <h1 className="page-title">Student not found</h1>
                <button className="btn btn-primary" onClick={() => navigate('/teacher')}>Back to Dashboard</button>
            </div>
        );
    }

    const avg = getStudentAvg(student);
    const grade = getGradeLabel(avg);
    const completionRate = Math.round((student.assignments.completed / student.assignments.total) * 100);
    const recommendations = getStudentRecommendations(student);

    const radarData = subjects.map(sub => ({
        subject: sub.name,
        score: getSubjectAvg(student, sub.id),
        fullMark: 100,
    }));

    const progressData = terms.map((term, i) => {
        const row = { term };
        subjects.forEach(sub => {
            row[sub.name] = student.grades[sub.id]?.[i] || 0;
        });
        return row;
    });

    return (
        <div className="page-content student-detail">
            {/* Back button */}
            <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigate('/teacher')}
                style={{ marginBottom: 20 }}
            >
                <ArrowLeft size={16} /> Back to Dashboard
            </button>

            {/* Header */}
            <div className="detail-header">
                <div className="detail-avatar">{student.avatar}</div>
                <div className="detail-info">
                    <h1>{student.name}</h1>
                    <p>{student.grade} - Section {student.section}</p>
                    <div className="detail-meta">
                        <span><Mail size={14} /> {student.email}</span>
                        <span><Hash size={14} /> Roll #{student.rollNo}</span>
                        <span><MapPin size={14} /> Section {student.section}</span>
                    </div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <span className={`badge badge-${grade.color}`} style={{ fontSize: '1rem', padding: '6px 16px' }}>
                        Grade: {grade.label}
                    </span>
                </div>
            </div>

            {/* Stats */}
            <div className="detail-stats-grid">
                <StatCard icon={Target} label="Overall Average" value={`${avg}%`} trend="up" trendValue={`Grade ${grade.label}`} color="#6366F1" />
                <StatCard icon={Clock} label="Attendance" value={`${student.attendance}%`} trend={student.attendance >= 90 ? 'up' : 'down'} trendValue={student.attendance >= 90 ? 'Excellent' : 'Needs work'} color="#10B981" />
                <StatCard icon={CheckCircle} label="Assignments" value={`${completionRate}%`} trend={completionRate >= 90 ? 'up' : 'down'} trendValue={`${student.assignments.completed}/${student.assignments.total}`} color="#3B82F6" />
                <StatCard icon={TrendingUp} label="Best Subject" value={subjects.find(s => s.id === Object.entries(student.grades).sort((a, b) => b[1].reduce((x, y) => x + y, 0) / b[1].length - a[1].reduce((x, y) => x + y, 0) / a[1].length)[0][0])?.name.split(' ')[0] || 'N/A'} trend="up" trendValue="Strongest area" color="#F59E0B" />
            </div>

            {/* Charts */}
            <div className="detail-charts-row">
                <ChartCard title="Term Progress" subtitle="Score trends across terms">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={progressData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="term" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#94A3B8" />
                            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0' }} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                            {subjects.map((sub, i) => (
                                <Line key={sub.id} type="monotone" dataKey={sub.name} stroke={COLORS[i]} strokeWidth={2} dot={{ r: 4 }} />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Subject Radar" subtitle="Performance across subjects">
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="#E2E8F0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                            <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                            <Radar name="Score" dataKey="score" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} strokeWidth={2} />
                        </RadarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Subject Breakdown Table */}
            <div className="card" style={{ marginBottom: 28, overflow: 'hidden' }}>
                <div className="card-header"><h3 className="card-title">Subject Breakdown</h3></div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="detail-subjects-table">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Average</th>
                                <th>Grade</th>
                                <th>Trend</th>
                                <th>Term Scores</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map(sub => {
                                const subAvg = getSubjectAvg(student, sub.id);
                                const subGrade = getGradeLabel(subAvg);
                                const trend = getTrend(student.grades[sub.id]);
                                return (
                                    <tr key={sub.id}>
                                        <td><strong>{sub.icon} {sub.name}</strong></td>
                                        <td><strong>{subAvg}%</strong></td>
                                        <td><span className={`badge badge-${subGrade.color}`}>{subGrade.label}</span></td>
                                        <td>
                                            <span className={`badge ${trend === 'up' ? 'badge-success' : trend === 'down' ? 'badge-error' : 'badge-info'}`}>
                                                {trend === 'up' ? '↑ Improving' : trend === 'down' ? '↓ Declining' : '→ Stable'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="detail-term-scores">
                                                {student.grades[sub.id]?.map((score, i) => (
                                                    <span key={i} className="detail-term-score">T{i + 1}: {score}</span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <div>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: 16 }}>💡 Recommendations for {student.name.split(' ')[0]}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                        {recommendations.map((rec, i) => (
                            <RecommendationCard key={i} recommendation={rec} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
