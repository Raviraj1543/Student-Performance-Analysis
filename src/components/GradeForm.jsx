import { useState } from 'react';
import { X } from 'lucide-react';
import { subjects, students } from '../data/mockData';
import './GradeForm.css';

export default function GradeForm({ onClose, onSave }) {
    const [form, setForm] = useState({
        studentId: '',
        subjectId: '',
        term: '3',
        score: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.studentId && form.subjectId && form.score) {
            onSave?.({
                ...form,
                studentId: Number(form.studentId),
                score: Number(form.score),
                term: Number(form.term),
            });
            onClose();
        }
    };

    return (
        <div className="grade-form-overlay" onClick={onClose}>
            <form className="grade-form" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                <div className="grade-form-header">
                    <h2>Add / Edit Grade</h2>
                    <button type="button" className="grade-form-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className="grade-form-body">
                    <div className="grade-form-group">
                        <label>Student</label>
                        <select value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })}>
                            <option value="">Select student...</option>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>{s.name} ({s.rollNo})</option>
                            ))}
                        </select>
                    </div>
                    <div className="grade-form-group">
                        <label>Subject</label>
                        <select value={form.subjectId} onChange={e => setForm({ ...form, subjectId: e.target.value })}>
                            <option value="">Select subject...</option>
                            {subjects.map(s => (
                                <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grade-form-group">
                        <label>Term</label>
                        <select value={form.term} onChange={e => setForm({ ...form, term: e.target.value })}>
                            <option value="0">Term 1</option>
                            <option value="1">Term 2</option>
                            <option value="2">Term 3</option>
                            <option value="3">Term 4</option>
                        </select>
                    </div>
                    <div className="grade-form-group">
                        <label>Score (0-100)</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="Enter score..."
                            value={form.score}
                            onChange={e => setForm({ ...form, score: e.target.value })}
                        />
                    </div>
                    <div className="grade-form-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Grade</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
