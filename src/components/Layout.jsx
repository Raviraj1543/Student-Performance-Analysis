import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './Layout.css';

export default function Layout({ children }) {
    const [search, setSearch] = useState('');
    const { currentUser, role } = useAuth();
    const userName = currentUser?.name || (role === 'teacher' ? 'Teacher' : 'Student');

    return (
        <div className="layout">
            <Sidebar role={role} userName={userName} />
            <Navbar onSearch={setSearch} searchValue={search} />
            <main className="layout-main">
                {children}
            </main>
        </div>
    );
}
