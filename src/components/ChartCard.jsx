import './ChartCard.css';

export default function ChartCard({ title, subtitle, children, controls }) {
    return (
        <div className="chart-card">
            <div className="chart-card-header">
                <div>
                    <div className="chart-card-title">{title}</div>
                    {subtitle && <div className="chart-card-subtitle">{subtitle}</div>}
                </div>
                {controls && <div className="chart-card-controls">{controls}</div>}
            </div>
            <div className="chart-card-body">
                {children}
            </div>
        </div>
    );
}
