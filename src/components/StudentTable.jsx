import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpDown } from 'lucide-react';
import { getStudentAvg, getGradeLabel } from '../data/mockData';
import './StudentTable.css';

const avatarColors = [
    '#6366F1', '#8B5CF6', '#EC4899', '#3B82F6',
    '#10B981', '#F59E0B', '#EF4444', '#06B6D4',
];

export default function StudentTable({ students, onStudentClick }) {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortDir, setSortDir] = useState('asc');
    const navigate = useNavigate();

    const handleSort = (key) => {
        if (sortBy === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortBy(key); setSortDir('asc'); }
    };

    const filtered = useMemo(() => {
        let list = [...students];
        if (search) {
            const q = search.toLowerCase();
            list = list.filter(s =>
                s.name.toLowerCase().includes(q) ||
                s.email.toLowerCase().includes(q) ||
                s.rollNo.includes(q)
            );
        }
        list.sort((a, b) => {
            let va, vb;
            switch (sortBy) {
                case 'name': va = a.name; vb = b.name; break;
                case 'avg': va = getStudentAvg(a); vb = getStudentAvg(b); break;
                case 'attendance': va = a.attendance; vb = b.attendance; break;
                default: va = a.name; vb = b.name;
            }
            if (typeof va === 'string') return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
            return sortDir === 'asc' ? va - vb : vb - va;
        });
        return list;
    }, [students, search, sortBy, sortDir]);

    return (
        <div className="student-table-wrapper">
            <div className="student-table-header">
                <h3>Students ({filtered.length})</h3>
                <div className="student-table-search">
                    <Search size={14} color="var(--text-muted)" />
                    <input
                        placeholder="Search students..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table className="student-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('name')}>
                                Student <ArrowUpDown size={12} style={{ verticalAlign: 'middle', marginLeft: 4 }} />
                            </th>
                            <th>Section</th>
                            <th onClick={() => handleSort('avg')}>
                                Average <ArrowUpDown size={12} style={{ verticalAlign: 'middle', marginLeft: 4 }} />
                            </th>
                            <th>Grade</th>
                            <th onClick={() => handleSort('attendance')}>
                                Attendance <ArrowUpDown size={12} style={{ verticalAlign: 'middle', marginLeft: 4 }} />
                            </th>
                            <th>Assignments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((student, i) => {
                            const avg = getStudentAvg(student);
                            const grade = getGradeLabel(avg);
                            const completion = Math.round((student.assignments.completed / student.assignments.total) * 100);
                            return (
                                <tr
                                    key={student.id}
                                    onClick={() => onStudentClick ? onStudentClick(student) : navigate(`/teacher/student/${student.id}`)}
                                >
                                    <td>
                                        <span
                                            className="student-table-avatar"
                                            style={{ background: avatarColors[i % avatarColors.length] }}
                                        >
                                            {student.avatar}
                                        </span>
                                        <span className="student-table-name">
                                            {student.name}
                                            <span className="student-table-email">{student.email}</span>
                                        </span>
                                    </td>
                                    <td>{student.grade} - {student.section}</td>
                                    <td><strong>{avg}%</strong></td>
                                    <td><span className={`badge badge-${grade.color}`}>{grade.label}</span></td>
                                    <td>
                                        <span className={`badge ${student.attendance >= 90 ? 'badge-success' : student.attendance >= 80 ? 'badge-warning' : 'badge-error'}`}>
                                            {student.attendance}%
                                        </span>
                                    </td>
                                    <td>{completion}% ({student.assignments.completed}/{student.assignments.total})</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
