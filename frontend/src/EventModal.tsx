import React, { useState, useEffect } from 'react';
import type { Event, Label } from './api';
import { X, Calendar, Clock, MapPin, Tag, AlertCircle, Trash2, Save, Check } from 'lucide-react';

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (event: Partial<Event>) => void;
    onDelete?: (id: number) => void;
    labels: Label[];
    initialData?: Partial<Event> | null;
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSave, onDelete, labels, initialData }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [importance, setImportance] = useState('Medium');
    const [labelId, setLabelId] = useState<number | undefined>(undefined);
    const [isFree, setIsFree] = useState(false);

    const toLocalISO = (iso?: string) => {
        if (!iso) return "";
        const date = new Date(iso);
        if (isNaN(date.getTime())) return "";
        const offset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() - offset).toISOString().slice(0, 16);
    };

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setContent(initialData.content || '');
            setLocation(initialData.location || '');
            setStartTime(toLocalISO(initialData.start_time));
            setEndTime(toLocalISO(initialData.end_time));
            setImportance(initialData.importance || 'Medium');
            setLabelId(initialData.label_id || undefined);
            setIsFree(initialData.is_free || false);
        } else {
            setTitle('');
            setContent('');
            setLocation('');
            const now = new Date();
            setStartTime(toLocalISO(now.toISOString()));
            setEndTime(toLocalISO(new Date(now.getTime() + 3600000).toISOString()));
            setImportance('Medium');
            setLabelId(undefined);
            setIsFree(false);
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...initialData,
            title, content, location,
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
            importance,
            label_id: labelId,
            is_free: isFree
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box fade-in" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ background: 'var(--primary)', width: '42px', height: '42px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                            <Calendar size={22} />
                        </div>
                        <div>
                            <h2 style={{ color: 'var(--secondary)', margin: 0, fontSize: '1.4rem', fontWeight: 900 }}>
                                {initialData?.id ? 'Chỉnh Sửa Lịch ✍️' : 'Thêm Lịch Mới ☕'}
                            </h2>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Sắp xếp ngày của bạn thật khéo nhé!</p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: 'var(--accent-light)', border: 'none', color: 'var(--secondary)', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'var(--transition)' }}>
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Title */}
                    <div className="field-group">
                        <label className="field-label"><Check size={13} /> Tiêu đề công việc</label>
                        <div className="input-icon-wrap">
                            <span className="input-icon"><Calendar size={16} /></span>
                            <input className="cute-input" placeholder="Hôm nay bạn làm gì?" value={title} onChange={e => setTitle(e.target.value)} required style={{ fontSize: '1rem', fontWeight: 600 }} />
                        </div>
                    </div>

                    {/* Time */}
                    <div className="form-row">
                        <div className="field-group">
                            <label className="field-label"><Clock size={13} /> Bắt đầu</label>
                            <input className="cute-input" type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} required />
                        </div>
                        <div className="field-group">
                            <label className="field-label"><Clock size={13} /> Kết thúc</label>
                            <input className="cute-input" type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} required />
                        </div>
                    </div>

                    {/* Location & Importance */}
                    <div className="form-row">
                        <div className="field-group">
                            <label className="field-label"><MapPin size={13} /> Địa điểm</label>
                            <div className="input-icon-wrap">
                                <span className="input-icon"><MapPin size={16} /></span>
                                <input className="cute-input" placeholder="Quán quen..." value={location} onChange={e => setLocation(e.target.value)} />
                            </div>
                        </div>
                        <div className="field-group">
                            <label className="field-label"><AlertCircle size={13} /> Độ ưu tiên</label>
                            <select className="cute-input" value={importance} onChange={e => setImportance(e.target.value)}>
                                <option value="Low">☕ Bình thường</option>
                                <option value="Medium">⚡ Quan trọng</option>
                                <option value="High">⏳ Khẩn cấp</option>
                            </select>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="field-group">
                        <label className="field-label">📝 Ghi chú</label>
                        <textarea className="cute-input" placeholder="Ghi chú thêm cho task này..." value={content} onChange={e => setContent(e.target.value)} rows={2} />
                    </div>

                    {/* Labels */}
                    {labels.length > 0 && (
                        <div className="field-group">
                            <label className="field-label"><Tag size={13} /> Nhãn phân loại</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <button type="button" onClick={() => setLabelId(undefined)}
                                    style={{ padding: '0.4rem 0.9rem', borderRadius: '20px', border: `2px solid ${labelId === undefined ? 'var(--primary)' : 'var(--glass-border)'}`, background: labelId === undefined ? 'var(--primary)' : '#fff', color: labelId === undefined ? '#fff' : 'var(--text-muted)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'var(--transition)' }}>
                                    Mặc định
                                </button>
                                {labels.map(l => (
                                    <button key={l.id} type="button" onClick={() => setLabelId(l.id)}
                                        style={{ padding: '0.4rem 0.9rem', borderRadius: '20px', border: `2px solid ${labelId === l.id ? l.color : 'var(--glass-border)'}`, background: labelId === l.id ? l.color : '#fff', color: labelId === l.id ? '#fff' : 'var(--text-muted)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'var(--transition)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.color, flexShrink: 0 }} />
                                        {l.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Free time toggle */}
                    <label className="cute-checkbox">
                        <input type="checkbox" className="cute-toggle" checked={isFree} onChange={e => setIsFree(e.target.checked)} />
                        <div>
                            <div style={{ fontWeight: 800, color: 'var(--secondary)', fontSize: '0.9rem' }}>Đánh dấu thời gian rảnh ✨</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ưu tiên gợi ý trống lịch</div>
                        </div>
                    </label>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
                        {initialData?.id && onDelete && (
                            <button type="button" onClick={() => { if (confirm('Xóa lịch này?')) onDelete(initialData.id!); }}
                                className="cute-btn danger sm" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                                <Trash2 size={18} />
                            </button>
                        )}
                        <button type="button" onClick={onClose} className="cute-btn outline" style={{ flex: '0 0 auto' }}>Hủy</button>
                        <button type="submit" className="cute-btn" style={{ flex: 1, justifyContent: 'center' }}>
                            <Save size={17} />
                            {initialData?.id ? 'Cập nhật' : 'Lưu lịch trình'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
