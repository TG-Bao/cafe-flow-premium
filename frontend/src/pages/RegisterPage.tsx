import React, { useState } from 'react';
import { registerUser } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowRight, User, Lock, Check } from 'lucide-react';

export const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) {
            setError('Mật khẩu nhập lại không khớp!');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await registerUser({ username, password });
            navigate('/login', { state: { fromRegister: true } });
        } catch (err) {
            setError('Tên đăng nhập đã tồn tại. Thử tên khác nhé!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', background: 'var(--bg-gradient)' }}>
            <div style={{ maxWidth: '420px', width: '100%', animation: 'fade-in 0.4s ease' }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', width: '72px', height: '72px', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white', boxShadow: '0 12px 30px rgba(141,110,99,0.35)' }}>
                        <UserPlus size={34} />
                    </div>
                    <h1 style={{ color: 'var(--secondary)', margin: '0 0 0.4rem', fontWeight: 900, fontSize: '1.9rem' }}>Tạo tài khoản mới</h1>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>Bắt đầu hành trình Cafe Flow của bạn ☕</p>
                </div>

                {/* Card */}
                <div className="glass-card" style={{ padding: '2rem', borderRadius: '28px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                        <div className="field-group">
                            <label className="field-label"><User size={13} /> Tên đăng nhập</label>
                            <div className="input-icon-wrap">
                                <span className="input-icon"><User size={16} /></span>
                                <input className="cute-input" type="text" placeholder="Chọn tên đăng nhập..." value={username} onChange={e => setUsername(e.target.value)} required autoFocus />
                            </div>
                        </div>

                        <div className="field-group">
                            <label className="field-label"><Lock size={13} /> Mật khẩu</label>
                            <div className="input-icon-wrap">
                                <span className="input-icon"><Lock size={16} /></span>
                                <input className="cute-input" type="password" placeholder="Tạo mật khẩu..." value={password} onChange={e => setPassword(e.target.value)} required />
                            </div>
                        </div>

                        <div className="field-group">
                            <label className="field-label"><Check size={13} /> Xác nhận mật khẩu</label>
                            <div className="input-icon-wrap">
                                <span className="input-icon"><Check size={16} /></span>
                                <input
                                    className={`cute-input ${confirm && password !== confirm ? 'error' : confirm && password === confirm ? 'success' : ''}`}
                                    type="password" placeholder="Nhập lại mật khẩu..."
                                    value={confirm} onChange={e => setConfirm(e.target.value)} required
                                />
                            </div>
                            {confirm && password !== confirm && <span className="input-error-msg">Mật khẩu không khớp</span>}
                        </div>

                        {error && (
                            <div style={{ background: '#FFF1F1', border: '1px solid #FFCDD2', borderRadius: 'var(--radius-sm)', padding: '0.7rem 1rem', color: '#C62828', fontSize: '0.85rem', fontWeight: 600 }}>
                                ⚠️ {error}
                            </div>
                        )}

                        <button type="submit" className="cute-btn" disabled={loading} style={{ width: '100%', justifyContent: 'center', height: '50px', fontSize: '1rem', marginTop: '0.5rem', borderRadius: '14px', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', opacity: loading ? 0.75 : 1 }}>
                            {loading ? 'Đang tạo tài khoản...' : <><span>Đăng Ký Ngay</span><ArrowRight size={20} /></>}
                        </button>
                    </form>
                </div>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                    Đã có tài khoản?{' '}
                    <Link to="/login" style={{ color: 'var(--secondary)', fontWeight: 800, textDecoration: 'none' }}>
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
};
