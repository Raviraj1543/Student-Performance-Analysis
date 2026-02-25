import { Search, Bell, Settings } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onSearch, searchValue }) {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <header className="navbar">
            <div className="navbar-left">
                <div className="navbar-search">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search students, subjects..."
                        value={searchValue || ''}
                        onChange={(e) => onSearch?.(e.target.value)}
                    />
                </div>
            </div>

            <div className="navbar-right">
                <span className="navbar-date">{today}</span>
                <button className="navbar-icon-btn" title="Notifications">
                    <Bell size={20} />
                    <span className="navbar-badge"></span>
                </button>
                <button className="navbar-icon-btn" title="Settings">
                    <Settings size={20} />
                </button>
            </div>
        </header>
    );
}
