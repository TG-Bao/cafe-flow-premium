import React from 'react';
import type { Event } from '../api';
import { Clock, Coffee, Zap } from 'lucide-react';

interface FreeTimePageProps {
    events: Event[];
}

export const FreeTimePage: React.FC<FreeTimePageProps> = ({ events }) => {
    
    // Hàm tính toán khoảng trống trong ngày từ 00:00 đến 23:59
    const getDailyGaps = () => {
        const daysToShow = 7; // Hiển thị 7 ngày tới
        const gaps: { day: string, slots: { start: string, end: string }[] }[] = [];
        
        for (let i = 0; i < daysToShow; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const dateStr = date.toLocaleDateString('en-CA'); // YYYY-MM-DD local
            
            // Lấy sự kiện trong ngày này (không bao gồm chính các sự kiện 'rảnh' đã có)
            const dayEvents = events
                .filter(e => new Date(e.start_time).toLocaleDateString('en-CA') === dateStr && !e.is_free)
                .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
            
            const daySlots: { start: string, end: string }[] = [];
            // Sử dụng setHours để mốc thời gian là địa phương
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            let lastEnd = startOfDay.getTime();
            
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            const dayEnd = endOfDay.getTime();
            
            dayEvents.forEach(event => {
                const eventStart = new Date(event.start_time).getTime();
                const eventEnd = new Date(event.end_time).getTime();
                
                // Nếu khoảng trống > 30 phút thì tính là 1 slot rảnh
                if (eventStart - lastEnd > 30 * 60 * 1000) {
                    daySlots.push({
                        start: new Date(lastEnd).toISOString(),
                        end: new Date(eventStart).toISOString()
                    });
                }
                lastEnd = Math.max(lastEnd, eventEnd);
            });
            
            // Khoảng trống cuối cùng tới hết ngày
            if (dayEnd - lastEnd > 30 * 60 * 1000) {
                daySlots.push({
                    start: new Date(lastEnd).toISOString(),
                    end: new Date(dayEnd).toISOString()
                });
            }
            
            if (daySlots.length > 0) {
                gaps.push({ day: date.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' }), slots: daySlots });
            }
        }
        return gaps;
    };

    const formatTime = (iso: string) => {
        return new Date(iso).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    };

    const dailyGaps = getDailyGaps();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ color: 'var(--secondary)', margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Coffee size={32} /> Khoảng Nghỉ Cho Bạn
                    </h1>
                    <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0' }}>Hệ thống tự động tìm các khoảng trống trong lịch trình của bạn. ✨</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {dailyGaps.map((dayGap, idx) => (
                    <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ color: 'var(--primary)', borderBottom: '2px solid var(--primary-light)', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <Zap size={20} fill="var(--accent)" color="var(--accent)" /> {dayGap.day}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {dayGap.slots.map((slot, sIdx) => (
                                <div key={sIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-gradient)', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                        <Clock size={16} color="var(--primary)" />
                                        <span style={{ fontWeight: 700, color: 'var(--secondary)' }}>{formatTime(slot.start)} — {formatTime(slot.end)}</span>
                                    </div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', background: 'white', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>RẢNH</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="glass-card" style={{ padding: '1.5rem', background: 'var(--secondary)', color: 'white', textAlign: 'center' }}>
                <p style={{ margin: 0, fontWeight: 700 }}>"Đừng quên dành thời gian cho bản thân nhé! ☕✨"</p>
            </div>
        </div>
    );
};
