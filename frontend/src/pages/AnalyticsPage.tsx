import React from 'react';
import type { Event, Label } from '../api';
import { BarChart3, PieChart, Activity, CheckCircle, Clock } from 'lucide-react';

interface AnalyticsPageProps {
    events: Event[];
    labels: Label[];
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ events, labels }) => {
    
    // Tính toán dữ liệu thống kê
    const totalEvents = events.length;
    const busyEvents = events.filter(e => !e.is_free).length;
    const freeEvents = events.filter(e => e.is_free).length;
    
    const labelStats = labels.map(l => ({
        name: l.name,
        color: l.color,
        count: events.filter(e => e.label_id === l.id).length
    })).filter(s => s.count > 0);

    const productivityScore = totalEvents > 0 ? Math.round((busyEvents / totalEvents) * 100) : 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
                <h1 style={{ color: 'var(--secondary)', margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Activity size={32} /> Phân Tích Năng Suất
                </h1>
                <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0' }}>Xem lại cách bạn đã sử dụng thời gian trong tháng qua.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '4px solid var(--primary)' }}>
                    <CheckCircle size={32} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                    <h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tổng công việc</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--secondary)' }}>{totalEvents}</div>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '4px solid var(--accent)' }}>
                    <Clock size={32} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
                    <h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Giờ bận rộn</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--secondary)' }}>{busyEvents}</div>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '4px solid gold' }}>
                    <Activity size={32} color="gold" style={{ marginBottom: '0.5rem' }} />
                    <h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Điểm năng suất</h3>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--secondary)' }}>{productivityScore}%</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h3 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <PieChart size={20} /> Tỷ lệ nhãn công việc
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {labelStats.map((s, idx) => (
                            <div key={idx}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 700 }}>
                                    <span>{s.name}</span>
                                    <span>{s.count} task</span>
                                </div>
                                <div style={{ width: '100%', height: '12px', background: 'var(--primary-light)', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ width: `${(s.count / totalEvents) * 100}%`, height: '100%', background: s.color, transition: 'width 1s ease' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <BarChart3 size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ color: 'var(--secondary)', margin: 0 }}>Trạng thái cân bằng</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '1rem 0' }}>
                        Bạn đang dành {busyEvents} phần cho công việc và {freeEvents} phần cho bản thân. 
                        {busyEvents > freeEvents * 2 ? ' Hãy dành thêm thời gian nghỉ ngơi nhé! ☕' : ' Bạn đang cân bằng rất tốt! ✨'}
                    </p>
                    <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: `conic-gradient(var(--primary) 0% ${productivityScore}%, var(--accent) ${productivityScore}% 100%)`, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'var(--shadow-soft)' }}>
                        <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 900, fontSize: '1.2rem', color: 'var(--secondary)' }}>
                            {busyEvents} : {freeEvents}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
