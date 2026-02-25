import './RecommendationCard.css';

export default function RecommendationCard({ recommendation }) {
    const { type, icon, title, description, actions } = recommendation;

    return (
        <div className={`rec-card ${type}`}>
            <div className="rec-card-top">
                <span className="rec-card-icon">{icon}</span>
                <div className="rec-card-meta">
                    <div className="rec-card-title">{title}</div>
                    <div className="rec-card-desc">{description}</div>
                </div>
            </div>
            {actions && actions.length > 0 && (
                <div className="rec-card-actions">
                    {actions.map((action, i) => (
                        <div key={i} className="rec-card-action">
                            {action}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
