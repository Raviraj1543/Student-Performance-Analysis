import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpDown } from 'lucide-react';
import API from '../services/api';
import './StudentTable.css';

const avatarColors = [
    '#6366F1', '#8B5CF6', '#EC4899', '#3B82F6',
    '#10B981', '#F59E0B', '#EF4444', '#06B6D4',
];

export default function StudentTable() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('subject');
    const [sortDir, setSortDir] = useState('asc');
    const navigate = useNavigate();

    // ✅ FETCH DATA FROM BACKEND
    useEffect(() => {
        API.get('/performance')
            .then(res => {
                setStudents(res.data);
            })
            .catch(err => {
                console.log("Error fetching data:", err);
            });
    }, []);

    const handleSort = (key) => {
        if (sortBy === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortBy(key); setSortDir('asc'); }
    };

    const filtered = useMemo(() => {
        let list = [...students];

        if (search) {
            const q = search.toLowerCase();
            list = list.filter(s =>
                s.subject.toLowerCase().includes(q) ||
                String(s.studentId).includes(q)
            );
        }

        list.sort((a, b) => {
            let va, vb;

            switch (sortBy) {
                case 'subject':
                    va = a.subject;
                    vb = b.subject;
                    break;
                case 'marks':
                    va = a.marks;
                    vb = b.marks;
                    break;
                default:
                    va = a.id;
                    vb = b.id;
            }

            if (typeof va === 'string')
                return sortDir === 'asc'
                    ? va.localeCompare(vb)
                    : vb.localeCompare(va);

            return sortDir === 'asc' ? va - vb : vb - va;
        });

        return list;
    }, [students, search, sortBy, sortDir]);

    return (
        <div className="student-table-wrapper">
            <div className="student-table-header">
                <h3>Performance ({filtered.length})</h3>

                <div className="student-table-search">
                    <Search size={14} />
                    <input
                        placeholder="Search by subject or student ID..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table className="student-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('subject')}>
                                Subject <ArrowUpDown size={12} />
                            </th>
                            <th>Student ID</th>
                            <th onClick={() => handleSort('marks')}>
                                Marks <ArrowUpDown size={12} />
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((item, i) => (
                            <tr key={item.id}>
                                <td>
                                    <span
                                        className="student-table-avatar"
                                        style={{ background: avatarColors[i % avatarColors.length] }}
                                    >
                                        {item.subject[0]}
                                    </span>
                                    {item.subject}
                                </td>

                                <td>{item.studentId}</td>

                                <td>
                                    <strong>{item.marks}</strong>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}