import { useState } from 'react';
import { Download, FileText, Printer } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, Legend
} from 'recharts';
import {
    students as builtInStudents, subjects, getStudentAvg, getSubjectAvg,
    getClassAvg, getPerformanceDistribution, getSubjectPerformance, getAllStudents
} from '../data/mockData';
import ChartCard from '../components/ChartCard';
import StudentTable from '../components/StudentTable';
import './ReportsPage.css';

const PIE_COLORS = ['#10B981', '#3B82F6', '#6366F1', '#F59E0B', '#EF4444', '#DC2626'];

export default function ReportsPage() {
    const students = getAllStudents();
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [selectedSection, setSelectedSection] = useState('all');

    const filteredStudents = students.filter(s => {
        if (selectedSection !== 'all' && s.section !== selectedSection) return false;
        return true;
    });

    const distribution = getPerformanceDistribution();
    const subjectPerf = getSubjectPerformance();

    // Subject-wise top & bottom
    const subjectStats = subjects.map(sub => ({
        ...sub,
        classAvg: getClassAvg(sub.id),
        topScore: Math.max(...students.map(s => getSubjectAvg(s, sub.id))),
        bottomScore: Math.min(...students.map(s => getSubjectAvg(s, sub.id))),
    }));

    // Overall stats
    const overallAvg = Math.round(filteredStudents.reduce((s, st) => s + getStudentAvg(st), 0) / filteredStudents.length);
    const passRate = Math.round(filteredStudents.filter(s => getStudentAvg(s) >= 50).length / filteredStudents.length * 100);
    const avgAttendance = Math.round(filteredStudents.reduce((s, st) => s + st.attendance, 0) / filteredStudents.length);

    return (
        <div className="page-content reports-page">
            <h1 className="page-title">Reports & Analytics</h1>
            <p className="page-subtitle">Generate and download comprehensive performance reports</p>

            {/* Controls */}
            <div className="report-controls">
                <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)}>
                    <option value="all">All Sections</option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                </select>
                <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                    <option value="all">All Subjects</option>
                    {subjects.map(s => (
                        <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                    ))}
                </select>
            </div>

            {/* Export bar */}
            <div className="report-export-bar">
                <p>📊 Report ready for {filteredStudents.length} students · {selectedSection === 'all' ? 'All Sections' : `Section ${selectedSection}`}</p>
                <div className="report-export-actions">
                    <button className="btn btn-secondary btn-sm">
                        <Printer size={16} /> Print
                    </button>
                    <button className="btn btn-primary btn-sm">
                        <Download size={16} /> Export PDF
                    </button>
                    <button className="btn btn-accent btn-sm">
                        <FileText size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="report-summary-grid">
                <div className="report-summary-card">
                    <h3>Overview</h3>
                    <div className="report-summary-list">
                        <div className="report-summary-item">
                            <span>Class Average</span>
                            <span style={{ color: 'var(--primary-600)' }}>{overallAvg}%</span>
                        </div>
                        <div className="report-summary-item">
                            <span>Pass Rate</span>
                            <span style={{ color: 'var(--success-dark)' }}>{passRate}%</span>
                        </div>
                        <div className="report-summary-item">
                            <span>Avg Attendance</span>
                            <span style={{ color: 'var(--info-dark)' }}>{avgAttendance}%</span>
                        </div>
                        <div className="report-summary-item">
                            <span>Total Students</span>
                            <span>{filteredStudents.length}</span>
                        </div>
                    </div>
                </div>

                <div className="report-summary-card">
                    <h3>Top Subjects</h3>
                    <div className="report-summary-list">
                        {subjectStats.sort((a, b) => b.classAvg - a.classAvg).slice(0, 4).map(sub => (
                            <div key={sub.id} className="report-summary-item">
                                <span>{sub.icon} {sub.name}</span>
                                <span style={{ color: sub.color }}>{sub.classAvg}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="report-summary-card">
                    <h3>Grade Distribution</h3>
                    <div className="report-summary-list">
                        {distribution.map((d, i) => (
                            <div key={d.name} className="report-summary-item">
                                <span>{d.name}</span>
                                <span style={{ color: PIE_COLORS[i] }}>{d.value} students</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div style={{ marginBottom: 28 }}>
                <ChartCard title="Subject Comparison" subtitle="Average, highest, and lowest scores per subject">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={subjectPerf} barSize={20}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#94A3B8" />
                            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0' }} />
                            <Legend wrapperStyle={{ fontSize: 12 }} />
                            <Bar dataKey="highest" name="Highest" fill="#10B981" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="average" name="Average" fill="#6366F1" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="lowest" name="Lowest" fill="#EF4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Student table */}
            <StudentTable students={filteredStudents} />
        </div>
    );
}
