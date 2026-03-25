import React, { useState } from 'react';
import type { Event, Label } from '../api';
import { Calendar, List, TrendingUp, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

interface WorkflowPageProps {
    events: Event[];
    labels: Label[];
}

export const WorkflowPage: React.FC<WorkflowPageProps> = ({ events, labels }) => {
    const [viewMode, setViewMode] = useState<'path' | 'table'>('path');
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD local
    
    // Lọc sự kiện trong ngày hôm nay và sắp xếp theo thời gian
    const todayEvents = events
        .filter(e => new Date(e.start_time).toLocaleDateString('en-CA') === today)
        .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

    const formatTime = (iso: string) => {
        return new Date(iso).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ color: 'var(--secondary)', margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <TrendingUp size={32} /> Lộ Trình Hôm Nay
                    </h1>
                    <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0' }}>Theo dõi dòng chảy công việc của bạn một cách trực quan.</p>
                </div>
                <div style={{ display: 'flex', background: 'var(--primary-light)', padding: '0.4rem', borderRadius: '12px', gap: '0.4rem' }}>
                    <button onClick={() => setViewMode('path')} className={`cute-btn ${viewMode === 'path' ? '' : 'outline'}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                        <TrendingUp size={16} /> Lộ trình
                    </button>
                    <button onClick={() => setViewMode('table')} className={`cute-btn ${viewMode === 'table' ? '' : 'outline'}`} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                        <List size={16} /> Danh sách
                    </button>
                </div>
            </div>

            {todayEvents.length === 0 ? (
                <div className="glass-card" style={{ padding: '5rem', textAlign: 'center' }}>
                    <Calendar size={64} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ color: 'var(--secondary)' }}>Hôm nay bạn chưa có lịch trình nào!</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Hãy thêm các task vào calendar để bắt đầu vẽ lộ trình nhé. ✨</p>
                </div>
            ) : viewMode === 'path' ? (
                <div style={{ position: 'relative', paddingLeft: '4rem' }}>
                    {/* Đường nối dọc */}
                    <div style={{ position: 'absolute', left: '2rem', top: '1rem', bottom: '1rem', width: '4px', background: 'linear-gradient(to bottom, var(--primary), var(--secondary))', borderRadius: '2px', opacity: 0.3 }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {todayEvents.map((e, index) => {
                            const label = labels.find(l => l.id === e.label_id);
                            return (
                                <div key={e.id} className="float-anim" style={{ position: 'relative', animationDelay: `${index * 0.1}s` }}>
                                    {/* Điểm nút */}
                                    <div style={{ position: 'absolute', left: '-2.6rem', top: '0.5rem', width: '20px', height: '20px', borderRadius: '50%', background: label?.color || 'var(--primary)', border: '4px solid white', boxShadow: 'var(--shadow-soft)', zIndex: 2 }}></div>
                                    
                                    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                        <div style={{ minWidth: '80px', textAlign: 'center' }}>
                                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--secondary)' }}>{formatTime(e.start_time)}</span>
                                            <div style={{ height: '1px', background: 'var(--accent)', margin: '0.3rem 0' }}></div>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatTime(e.end_time)}</span>
                                        </div>
                                        
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem' }}>
                                                <h3 style={{ margin: 0, color: 'var(--secondary)', fontSize: '1.2rem' }}>{e.title}</h3>
                                                {label && <span className="badge" style={{ background: label.color + '22', color: label.color }}>{label.name}</span>}
                                            </div>
                                            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                {e.location && <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {e.location}</span>}
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                    <AlertCircle size={14} color={e.importance === 'High' ? '#FF9A9E' : 'var(--accent)'} /> 
                                                    {e.importance === 'High' ? 'Khẩn cấp' : e.importance === 'Medium' ? 'Quan trọng' : 'Bình thường'}
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ opacity: 0.2 }}>
                                            <CheckCircle2 size={40} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="glass-card" style={{ padding: '1rem', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--primary-light)' }}>
                                <th style={{ padding: '1.5rem', color: 'var(--secondary)' }}>Thời gian</th>
                                <th style={{ padding: '1.5rem', color: 'var(--secondary)' }}>Công việc</th>
                                <th style={{ padding: '1.5rem', color: 'var(--secondary)' }}>Địa điểm</th>
                                <th style={{ padding: '1.5rem', color: 'var(--secondary)' }}>Nhãn</th>
                                <th style={{ padding: '1.5rem', color: 'var(--secondary)' }}>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayEvents.map(e => {
                                const label = labels.find(l => l.id === e.label_id);
                                return (
                                    <tr key={e.id} style={{ borderBottom: '1px solid #F0F0F0' }}>
                                        <td style={{ padding: '1.2rem' }}>
                                            <div style={{ fontWeight: 700 }}>{formatTime(e.start_time)}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#999' }}>đến {formatTime(e.end_time)}</div>
                                        </td>
                                        <td style={{ padding: '1.2rem', fontWeight: 600 }}>{e.title}</td>
                                        <td style={{ padding: '1.2rem', color: '#666' }}>{e.location || '—'}</td>
                                        <td style={{ padding: '1.2rem' }}>
                                            {label && <span className="badge" style={{ background: label.color + '22', color: label.color }}>{label.name}</span>}
                                        </td>
                                        <td style={{ padding: '1.2rem' }}>
                                            <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700 }}>ĐANG CHỜ</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
