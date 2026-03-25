import React, { useState } from 'react';
import type { Label } from '../api';
import { createLabel, updateLabel, deleteLabel } from '../api';
import { Tag, Plus, Trash2, Edit2, Check, X } from 'lucide-react';

interface SettingsPageProps {
    labels: Label[];
    refresh: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ labels, refresh }) => {
    const [newLabelName, setNewLabelName] = useState('');
    const [newLabelColor, setNewLabelColor] = useState('#FFB5E8');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [editColor, setEditColor] = useState('');

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLabelName) return;
        await createLabel({ name: newLabelName, color: newLabelColor });
        setNewLabelName('');
        refresh();
    };

    const handleUpdate = async (id: number) => {
        await updateLabel(id, { name: editName, color: editColor });
        setEditingId(null);
        refresh();
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Xóa nhãn này?')) {
            await deleteLabel(id);
            refresh();
        }
    };

    return (
        <div style={{ maxWidth: '760px' }}>
            {/* Header card */}
            <div className="glass-card page-header" style={{ padding: '1.5rem 2rem', marginBottom: '1.5rem' }}>
                <div>
                    <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Tag size={26} /> Quản Lý Nhãn
                    </h1>
                    <p className="page-subtitle">Phân loại công việc bằng màu sắc và nhãn tùy chỉnh.</p>
                </div>
                <span className="badge" style={{ background: 'var(--accent-light)', color: 'var(--secondary)' }}>{labels.length} nhãn</span>
            </div>

            {/* Create form */}
            <div className="glass-card fade-in" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--secondary)', margin: '0 0 1.25rem', fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={18} /> Tạo nhãn mới
                </h3>
                <form onSubmit={handleCreate}>
                    <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'var(--input-bg)', border: '2px solid var(--input-border)', borderRadius: 'var(--radius-md)', padding: '0.6rem 0.85rem' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Màu sắc</span>
                            <input type="color" value={newLabelColor} onChange={e => setNewLabelColor(e.target.value)}
                                style={{ width: '36px', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer', padding: 0, background: 'none' }} />
                        </div>
                        <input
                            className="cute-input"
                            style={{ flex: '1 1 180px' }}
                            placeholder="Tên nhãn... (VD: Học tập, Công việc)"
                            value={newLabelName}
                            onChange={e => setNewLabelName(e.target.value)}
                        />
                        <button type="submit" className="cute-btn" disabled={!newLabelName.trim()}>
                            <Plus size={18} /> Thêm nhãn
                        </button>
                    </div>
                </form>
            </div>

            {/* Labels list */}
            <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {labels.map(l => (
                        <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: '#fff', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--glass-border)', transition: 'var(--transition)' }}>
                            {editingId === l.id ? (
                                <div style={{ display: 'flex', gap: '0.75rem', flex: 1, flexWrap: 'wrap' }}>
                                    <input type="color" value={editColor} onChange={e => setEditColor(e.target.value)}
                                        style={{ width: '44px', height: '44px', border: '2px solid var(--glass-border)', borderRadius: '10px', cursor: 'pointer', padding: 2 }} />
                                    <input className="cute-input" style={{ flex: '1 1 160px' }} value={editName} onChange={e => setEditName(e.target.value)} />
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => handleUpdate(l.id)} className="cute-btn sm">
                                            <Check size={16} /> Lưu
                                        </button>
                                        <button onClick={() => setEditingId(null)} className="cute-btn sm outline">
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: l.color, boxShadow: `0 4px 12px ${l.color}55`, flexShrink: 0 }} />
                                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--secondary)' }}>{l.name}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                                        <button onClick={() => { setEditingId(l.id); setEditName(l.name); setEditColor(l.color); }}
                                            style={{ padding: '0.5rem 0.9rem', background: 'var(--accent-light)', border: 'none', borderRadius: '10px', color: 'var(--secondary)', cursor: 'pointer', transition: 'var(--transition)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '0.82rem' }}>
                                            <Edit2 size={15} /> Sửa
                                        </button>
                                        <button onClick={() => handleDelete(l.id)}
                                            style={{ padding: '0.5rem 0.9rem', background: '#FFF0F0', border: 'none', borderRadius: '10px', color: '#E57373', cursor: 'pointer', transition: 'var(--transition)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, fontSize: '0.82rem' }}>
                                            <Trash2 size={15} /> Xóa
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                    {labels.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">🏷️</div>
                            <h3>Chưa có nhãn nào</h3>
                            <p style={{ fontSize: '0.9rem', margin: 0 }}>Thêm nhãn để phân loại và tổ chức lịch trình của bạn!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
