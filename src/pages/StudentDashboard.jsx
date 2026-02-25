import { BookOpen, Target, CheckCircle, Clock } from 'lucide-react';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
    subjects, terms, getStudentAvg, getSubjectAvg,
    getGradeLabel, getLatestGrade
} from '../data/mockData';
import { getStudentRecommendations } from '../data/recommendations';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import ProgressRing from '../components/ProgressRing';
import RecommendationCard from '../components/RecommendationCard';
import './StudentDashboard.css';

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B'];

export default function StudentDashboard() {
    const { getCurrentStudentData } = useAuth();
    const currentStudent = getCurrentStudentData();

    if (!currentStudent) {
        return <div className="page-content"><h1 className="page-title">Student data not found</h1></div>;
    }

    const avg = getStudentAvg(currentStudent);
    const grade = getGradeLabel(avg);
    const completionRate = Math.round(
        (currentStudent.assignments.completed / currentStudent.assignments.total) * 100
    );
    const recommendations = getStudentRecommendations(currentStudent);

    // Radar chart data
    const radarData = subjects.map(sub => ({
        subject: sub.name,
        score: getSubjectAvg(currentStudent, sub.id),
        fullMark: 100,
    }));

    // Term-wise progress data
    const progressData = terms.map((term, i) => {
        const row = { term };
        subjects.forEach(sub => {
            row[sub.name] = currentStudent.grades[sub.id]?.[i] || 0;
        });
        return row;
    });

    return (
        <div className="page-content student-dashboard">
            {/* Welcome Banner */}
            <div className="welcome-banner">
                <h1>Welcome back, {currentStudent.name.split(' ')[0]}! 👋</h1>
                <p>Here's an overview of your academic performance this semester.</p>
                <span className="welcome-id">Student ID: {currentStudent.studentId}</span>
            </div>

            {/* Stats Row */}
            <div className="stats-grid">
                <StatCard icon={Target} label="Overall Average" value={`${avg}%`} trend="up" trendValue={`Grade: ${grade.label}`} color="#6366F1" />
                <StatCard icon={BookOpen} label="Subjects" value={subjects.length} trend="stable" trendValue="All enrolled" color="#3B82F6" />
                <StatCard icon={CheckCircle} label="Assignments" value={`${completionRate}%`} trend={completionRate >= 90 ? 'up' : 'down'} trendValue={`${currentStudent.assignments.completed}/${currentStudent.assignments.total}`} color="#10B981" />
                <StatCard icon={Clock} label="Attendance" value={`${currentStudent.attendance}%`} trend={currentStudent.attendance >= 90 ? 'up' : 'down'} trendValue={currentStudent.attendance >= 90 ? 'Excellent' : 'Needs improvement'} color="#F59E0B" />
            </div>

            {/* Subject Cards */}
            <div style={{ marginBottom: 8 }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: 16 }}>📚 Subject Performance</h2>
            </div>
            <div className="subjects-grid">
                {subjects.map(sub => {
                    const subAvg = getSubjectAvg(currentStudent, sub.id);
                    const subGrade = getGradeLabel(subAvg);
                    return (
                        <div key={sub.id} className="subject-card">
                            <span className="subject-card-icon">{sub.icon}</span>
                            <div className="subject-card-info">
                                <div className="subject-card-name">{sub.name}</div>
                                <div className="subject-card-avg">
                                    Latest: {getLatestGrade(currentStudent, sub.id)}% ·{' '}
                                    <span className={`badge badge-${subGrade.color}`}>{subGrade.label}</span>
                                </div>
                            </div>
                            <div className="subject-card-score" style={{ color: sub.color }}>
                                {subAvg}%
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="charts-row">
                <ChartCard title="Term-wise Progress" subtitle="Your scores across all terms">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={progressData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="term" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#94A3B8" />
                            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0' }} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                            {subjects.map((sub, i) => (
                                <Line
                                    key={sub.id}
                                    type="monotone"
                                    dataKey={sub.name}
                                    stroke={COLORS[i]}
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Strengths & Weaknesses" subtitle="Subject-wise performance radar">
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="#E2E8F0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                            <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                            <Radar
                                name="Score"
                                dataKey="score"
                                stroke="#6366F1"
                                fill="#6366F1"
                                fillOpacity={0.2}
                                strokeWidth={2}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Progress Rings */}
            <ChartCard title="Key Metrics" subtitle="At a glance performance indicators" style={{ marginBottom: 28 }}>
                <div className="progress-rings-row">
                    <ProgressRing value={avg} color="#6366F1" label="Overall Avg" />
                    <ProgressRing value={currentStudent.attendance} color="#10B981" label="Attendance" />
                    <ProgressRing value={completionRate} color="#3B82F6" label="Assignments" />
                    <ProgressRing
                        value={Math.round(subjects.reduce((s, sub) => s + (getSubjectAvg(currentStudent, sub.id) >= 70 ? 1 : 0), 0) / subjects.length * 100)}
                        color="#F59E0B"
                        label="Subjects Passed"
                    />
                </div>
            </ChartCard>

            {/* Recommendations */}
            <div style={{ marginTop: 28 }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: 16 }}>💡 Personalized Recommendations</h2>
                <div className="recs-grid">
                    {recommendations.map((rec, i) => (
                        <RecommendationCard key={i} recommendation={rec} />
                    ))}
                </div>
            </div>
        </div>
    );
}
