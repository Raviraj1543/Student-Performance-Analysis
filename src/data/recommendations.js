// ═══════════════════════════════════════════════════════
//  Recommendations Engine
// ═══════════════════════════════════════════════════════

import { getSubjectAvg, getStudentAvg, getTrend, subjects } from './mockData';

export function getStudentRecommendations(student) {
    const recommendations = [];
    const avg = getStudentAvg(student);

    // Subject-specific recommendations
    subjects.forEach(sub => {
        const subAvg = getSubjectAvg(student, sub.id);
        const trend = getTrend(student.grades[sub.id]);

        if (subAvg < 60) {
            recommendations.push({
                type: 'critical',
                subject: sub.name,
                icon: sub.icon,
                title: `Needs Immediate Attention in ${sub.name}`,
                description: `Current average is ${subAvg}%. Consider scheduling extra tutoring sessions and practice exercises.`,
                actions: [
                    'Schedule one-on-one tutoring sessions',
                    'Complete additional practice worksheets',
                    'Review fundamental concepts from previous chapters',
                ],
            });
        } else if (subAvg < 70) {
            recommendations.push({
                type: 'warning',
                subject: sub.name,
                icon: sub.icon,
                title: `Room for Improvement in ${sub.name}`,
                description: `Current average is ${subAvg}%. With focused effort, significant improvement is achievable.`,
                actions: [
                    'Dedicate 30 extra minutes daily to this subject',
                    'Form a study group with peers',
                    'Attempt practice problems from reference books',
                ],
            });
        } else if (trend === 'down') {
            recommendations.push({
                type: 'info',
                subject: sub.name,
                icon: sub.icon,
                title: `Declining Performance in ${sub.name}`,
                description: `While the average (${subAvg}%) is decent, recent scores show a downward trend.`,
                actions: [
                    'Identify specific topics causing difficulty',
                    'Revisit class notes and recorded lectures',
                    'Discuss concerns with subject teacher',
                ],
            });
        } else if (subAvg >= 90) {
            recommendations.push({
                type: 'success',
                subject: sub.name,
                icon: sub.icon,
                title: `Excellent Performance in ${sub.name}!`,
                description: `Outstanding average of ${subAvg}%. Keep up the great work!`,
                actions: [
                    'Consider participating in subject olympiads',
                    'Help peers through study groups',
                    'Explore advanced topics beyond syllabus',
                ],
            });
        }
    });

    // Attendance recommendation
    if (student.attendance < 80) {
        recommendations.push({
            type: 'critical',
            subject: 'Attendance',
            icon: '📅',
            title: 'Low Attendance Alert',
            description: `Current attendance is ${student.attendance}%. Regular attendance is crucial for academic success.`,
            actions: [
                'Aim for at least 90% attendance',
                'Plan ahead for any unavoidable absences',
                'Catch up on missed classes immediately',
            ],
        });
    }

    // Assignment recommendation
    const completionRate = Math.round((student.assignments.completed / student.assignments.total) * 100);
    if (completionRate < 85) {
        recommendations.push({
            type: 'warning',
            subject: 'Assignments',
            icon: '📝',
            title: 'Assignment Completion Needs Improvement',
            description: `Only ${completionRate}% of assignments completed. Consistent submission is key to better grades.`,
            actions: [
                'Create a task calendar for assignment deadlines',
                'Break larger assignments into smaller tasks',
                'Communicate with teachers if facing difficulties',
            ],
        });
    }

    // Overall performance
    if (avg >= 85) {
        recommendations.push({
            type: 'success',
            subject: 'Overall',
            icon: '🌟',
            title: 'Outstanding Overall Performance',
            description: `Maintaining an impressive ${avg}% overall average. Continue this excellent trajectory!`,
            actions: [
                'Set higher personal goals for next term',
                'Consider leadership roles in study groups',
                'Explore extracurricular academic activities',
            ],
        });
    }

    return recommendations.sort((a, b) => {
        const priority = { critical: 0, warning: 1, info: 2, success: 3 };
        return priority[a.type] - priority[b.type];
    });
}

export function getClassRecommendations(students) {
    const recommendations = [];

    subjects.forEach(sub => {
        const avgScore = Math.round(
            students.reduce((sum, s) => sum + getSubjectAvg(s, sub.id), 0) / students.length
        );
        if (avgScore < 70) {
            recommendations.push({
                type: 'warning',
                subject: sub.name,
                icon: sub.icon,
                title: `Class Average Low in ${sub.name}`,
                description: `Class average is ${avgScore}%. Consider reviewing teaching methodology or providing additional resources.`,
            });
        }
    });

    const atRisk = students.filter(s => getStudentAvg(s) < 60);
    if (atRisk.length > 0) {
        recommendations.push({
            type: 'critical',
            subject: 'At-Risk Students',
            icon: '⚠️',
            title: `${atRisk.length} Student(s) Need Intervention`,
            description: `${atRisk.map(s => s.name).join(', ')} ${atRisk.length === 1 ? 'has' : 'have'} an overall average below 60%.`,
        });
    }

    return recommendations;
}
