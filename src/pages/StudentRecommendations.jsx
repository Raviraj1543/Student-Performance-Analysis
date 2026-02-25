import { useAuth } from '../context/AuthContext';
import { getStudentRecommendations } from '../data/recommendations';
import RecommendationCard from '../components/RecommendationCard';

export default function StudentRecommendations() {
    const { getCurrentStudentData } = useAuth();
    const currentStudent = getCurrentStudentData();

    if (!currentStudent) {
        return <div className="page-content"><h1 className="page-title">Student data not found</h1></div>;
    }

    const recommendations = getStudentRecommendations(currentStudent);

    const critical = recommendations.filter(r => r.type === 'critical');
    const warnings = recommendations.filter(r => r.type === 'warning');
    const info = recommendations.filter(r => r.type === 'info');
    const success = recommendations.filter(r => r.type === 'success');

    return (
        <div className="page-content">
            <h1 className="page-title">Personalized Recommendations</h1>
            <p className="page-subtitle">Actionable insights to improve your academic performance</p>

            {critical.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 14, color: 'var(--error-dark)' }}>
                        🚨 Needs Immediate Attention
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
                        {critical.map((r, i) => <RecommendationCard key={i} recommendation={r} />)}
                    </div>
                </div>
            )}

            {warnings.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 14, color: 'var(--warning-dark)' }}>
                        ⚠️ Areas for Improvement
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
                        {warnings.map((r, i) => <RecommendationCard key={i} recommendation={r} />)}
                    </div>
                </div>
            )}

            {info.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 14, color: 'var(--info-dark)' }}>
                        ℹ️ Things to Watch
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
                        {info.map((r, i) => <RecommendationCard key={i} recommendation={r} />)}
                    </div>
                </div>
            )}

            {success.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 14, color: 'var(--success-dark)' }}>
                        🌟 Keep It Up!
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
                        {success.map((r, i) => <RecommendationCard key={i} recommendation={r} />)}
                    </div>
                </div>
            )}

            {recommendations.length === 0 && (
                <div className="card" style={{ padding: 40, textAlign: 'center' }}>
                    <span style={{ fontSize: '3rem' }}>🎉</span>
                    <h3 style={{ marginTop: 12, fontWeight: 600 }}>You're doing great!</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>No specific recommendations at this time.</p>
                </div>
            )}
        </div>
    );
}
