import { useState } from 'react';
import { Users, TrendingUp, Award, AlertTriangle, Plus } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, Legend, PieChart, Pie, Cell, RadarChart, Radar,
    PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import {
    students as builtInStudents, subjects, getStudentAvg, getSubjectAvg, getTopStudents, getAtRiskStudents,
    getPerformanceDistribution, getSubjectPerformance, getTermTrends,
    getStudentCGPA, getLowestStudents, getWeakSubjects, getTopPerSubject, getGradeLabel,
    getAllStudents
} from '../data/mockData';
import { getClassRecommendations } from '../data/recommendations';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import StudentTable from '../components/StudentTable';
import RecommendationCard from '../components/RecommendationCard';
import GradeForm from '../components/GradeForm';
import './TeacherDashboard.css';

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B'];
const PIE_COLORS = ['#10B981', '#3B82F6', '#6366F1', '#F59E0B', '#EF4444', '#DC2626'];

export default function TeacherDashboard() {
    const [showGradeForm, setShowGradeForm] = useState(false);
    const students = getAllStudents();

    const classAvg = Math.round(students.reduce((s, st) => s + getStudentAvg(st), 0) / students.length);
    const topStudents = getTopStudents(5);
    const atRisk = getAtRiskStudents();
    const distribution = getPerformanceDistribution();
    const subjectPerf = getSubjectPerformance();
    const termTrends = getTermTrends();
    const classRecs = getClassRecommendations(students);
    const lowestStudents = getLowestStudents(3);
    const topPerSubject = getTopPerSubject();

    const rankColors = ['gold', 'silver', 'bronze', 'default', 'default'];

    return (
        <div className="page-content teacher-dashboard">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                    <h1 className="page-title">Faculty Dashboard</h1>
                    <p className="page-subtitle" style={{ marginBottom: 0 }}>Complete class performance overview and analytics</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowGradeForm(true)}>
                    <Plus size={18} /> Add Grade
                </button>
            </div>

            {/* Stats Row */}
            <div className="stats-grid">
                <StatCard icon={Users} label="Total Students" value={students.length} trend="stable" trendValue="Active" color="#6366F1" />
                <StatCard icon={TrendingUp} label="Class Average" value={`${classAvg}%`} trend="up" trendValue="+2.3% from last term" color="#3B82F6" />
                <StatCard icon={Award} label="Top Performer" value={topStudents[0]?.name.split(' ')[0]} trend="up" trendValue={`${getStudentAvg(topStudents[0])}%`} color="#10B981" />
                <StatCard icon={AlertTriangle} label="At Risk" value={atRisk.length} trend={atRisk.length > 2 ? 'down' : 'stable'} trendValue={atRisk.length > 2 ? 'Needs attention' : 'Manageable'} color="#EF4444" />
            </div>

            {/* Charts Row 1 */}
            <div className="charts-row">
                <ChartCard title="Subject Performance" subtitle="Average scores across all subjects">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={subjectPerf} barSize={32}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#94A3B8" />
                            <Tooltip
                                contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                            />
                            <Bar dataKey="average" radius={[6, 6, 0, 0]}>
                                {subjectPerf.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Grade Distribution" subtitle="Student performance spread">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={distribution}
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {distribution.map((_, i) => (
                                    <Cell key={i} fill={PIE_COLORS[i]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                            />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Charts Row 2 */}
            <div className="charts-row-2">
                <ChartCard title="Term-wise Trends" subtitle="Average scores across terms">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={termTrends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="term" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                            <YAxis domain={[40, 100]} tick={{ fontSize: 12 }} stroke="#94A3B8" />
                            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0' }} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                            {subjects.map((sub, i) => (
                                <Line
                                    key={sub.id}
                                    type="monotone"
                                    dataKey={sub.name}
                                    stroke={COLORS[i]}
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: COLORS[i] }}
                                    activeDot={{ r: 6 }}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Top Performers" subtitle="Highest overall averages">
                    <div className="top-students-list">
                        {topStudents.map((student, i) => (
                            <div key={student.id} className="top-student-item">
                                <div className={`top-student-rank ${rankColors[i]}`}>{i + 1}</div>
                                <div className="top-student-info">
                                    <div className="top-student-name">{student.name}</div>
                                    <div className="top-student-meta">{student.grade} - {student.section} · CGPA: {getStudentCGPA(student)}</div>
                                </div>
                                <div className="top-student-score">{getStudentAvg(student)}%</div>
                            </div>
                        ))}
                    </div>
                </ChartCard>
            </div>

            {/* Subject-wise Toppers */}
            <div style={{ marginBottom: 28 }}>
                <div className="section-header">
                    <h2>🏆 Subject-wise Toppers</h2>
                </div>
                <div className="toppers-grid">
                    {topPerSubject.map(({ subject, topStudent, topScore }) => (
                        <div key={subject.id} className="card topper-card">
                            <div className="topper-subject">
                                <span className="topper-icon">{subject.icon}</span>
                                <span className="topper-subject-name">{subject.name}</span>
                            </div>
                            <div className="topper-info">
                                <span className="topper-name">{topStudent.name}</span>
                                <span className="topper-score" style={{ color: subject.color }}>{topScore}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Per-Subject Attendance Table */}
            <div className="card faculty-table-card" style={{ marginBottom: 28, overflow: 'hidden' }}>
                <div className="card-header">
                    <h3 className="card-title">📊 Subject-wise Attendance & Marks</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="faculty-data-table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>ID</th>
                                {subjects.map(sub => (
                                    <th key={sub.id}>{sub.icon} {sub.name}<br /><small>Att% · Marks%</small></th>
                                ))}
                                <th>Overall %</th>
                                <th>CGPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => {
                                const avg = getStudentAvg(student);
                                const cgpa = getStudentCGPA(student);
                                return (
                                    <tr key={student.id}>
                                        <td className="student-name-cell">
                                            <strong>{student.name}</strong>
                                        </td>
                                        <td><code className="student-id-badge">{student.studentId}</code></td>
                                        {subjects.map(sub => {
                                            const subAtt = student.subjectAttendance?.[sub.id] || 0;
                                            const subAvg = getSubjectAvg(student, sub.id);
                                            return (
                                                <td key={sub.id} className="subject-data-cell">
                                                    <span className={`att-badge ${subAtt >= 85 ? 'good' : subAtt >= 75 ? 'warn' : 'bad'}`}>{subAtt}%</span>
                                                    <span className="marks-sep">·</span>
                                                    <span className={`marks-badge ${subAvg >= 80 ? 'good' : subAvg >= 60 ? 'warn' : 'bad'}`}>{subAvg}%</span>
                                                </td>
                                            );
                                        })}
                                        <td>
                                            <strong style={{ color: avg >= 80 ? '#059669' : avg >= 60 ? '#D97706' : '#DC2626' }}>{avg}%</strong>
                                        </td>
                                        <td>
                                            <span className="cgpa-badge">{cgpa}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Lowest Scorers + Weak Point Analysis */}
            <div style={{ marginBottom: 28 }}>
                <div className="section-header">
                    <h2>⚠️ Lowest Scorers & Weak Point Analysis</h2>
                </div>
                <div className="lowest-grid">
                    {lowestStudents.map(student => {
                        const weakSubs = getWeakSubjects(student);
                        const avg = getStudentAvg(student);
                        const grade = getGradeLabel(avg);
                        return (
                            <div key={student.id} className="card lowest-card">
                                <div className="lowest-header">
                                    <div className="lowest-avatar">{student.avatar}</div>
                                    <div>
                                        <h4>{student.name}</h4>
                                        <p className="lowest-meta">{student.studentId} · {student.grade}-{student.section}</p>
                                    </div>
                                    <div className="lowest-score">
                                        <span className={`badge badge-${grade.color}`}>{avg}%</span>
                                        <span className="lowest-cgpa">CGPA: {getStudentCGPA(student)}</span>
                                    </div>
                                </div>
                                <div className="lowest-weak-section">
                                    <h5>Weak Subjects (Need Focus):</h5>
                                    {weakSubs.map(ws => (
                                        <div key={ws.id} className="weak-subject-item">
                                            <span className="weak-icon">{ws.icon}</span>
                                            <span className="weak-name">{ws.name}</span>
                                            <div className="weak-bar-track">
                                                <div className="weak-bar-fill" style={{ width: `${ws.avg}%`, background: ws.avg >= 60 ? '#F59E0B' : '#EF4444' }}></div>
                                            </div>
                                            <span className="weak-score">{ws.avg}%</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="lowest-recommendations">
                                    <p>💡 <strong>Recommendation:</strong> Focus on {weakSubs[0]?.name} ({weakSubs[0]?.avg}%) — schedule extra tutoring and provide additional practice materials. Student attendance is {student.attendance}%{student.attendance < 80 ? ' (needs improvement)' : ''}.</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Class Recommendations */}
            {classRecs.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                    <div className="section-header">
                        <h2>⚡ Class Insights & Recommendations</h2>
                    </div>
                    <div className="grid-2">
                        {classRecs.map((rec, i) => (
                            <RecommendationCard key={i} recommendation={rec} />
                        ))}
                    </div>
                </div>
            )}

            {/* Student Table */}
            <StudentTable students={students} />

            {/* Grade Form Modal */}
            {showGradeForm && (
                <GradeForm onClose={() => setShowGradeForm(false)} onSave={(data) => console.log('Grade saved:', data)} />
            )}
        </div>
    );
}
