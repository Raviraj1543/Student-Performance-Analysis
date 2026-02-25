import { getAllStudents } from '../data/mockData';
import StudentTable from '../components/StudentTable';

export default function TeacherStudents() {
    const students = getAllStudents();
    return (
        <div className="page-content">
            <h1 className="page-title">All Students</h1>
            <p className="page-subtitle">View and manage all enrolled students</p>
            <StudentTable students={students} />
        </div>
    );
}
