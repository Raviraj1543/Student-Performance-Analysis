import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './StatCard.css';

export default function StatCard({ icon: Icon, label, value, trend, trendValue, color }) {
    const trendIcons = { up: TrendingUp, down: TrendingDown, stable: Minus };
    const TrendIcon = trendIcons[trend] || Minus;

    return (
        <div className="stat-card">
            <div
                className="stat-card-icon"
                style={{ background: `${color}15`, color }}
            >
                <Icon size={24} />
            </div>
            <div className="stat-card-content">
                <div className="stat-card-label">{label}</div>
                <div className="stat-card-value">{value}</div>
                {trend && (
                    <div className={`stat-card-trend ${trend}`}>
                        <TrendIcon size={14} />
                        <span>{trendValue}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
