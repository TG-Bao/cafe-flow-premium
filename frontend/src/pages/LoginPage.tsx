import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, ArrowRight, User, Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await loginUser({ username, password });
            login(data.username, data.token);
            navigate('/');
        } catch (err) {
            setError('Sai tài khoản hoặc mật khẩu. Thử lại nhé! 😅');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', background: 'var(--bg-gradient)' }}>
            <div style={{ maxWidth: '420px', width: '100%', animation: 'fade-in 0.4s ease' }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: 'var(--secondary)', width: '72px', height: '72px', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white', boxShadow: '0 12px 30px rgba(93,64,55,0.3)', animation: 'float 4s ease-in-out infinite' }}>
                        <Coffee size={36} />
                    </div>
                    <h1 style={{ color: 'var(--secondary)', margin: '0 0 0.4rem', fontWeight: 900, fontSize: '1.9rem' }}>Chào mừng trở lại!</h1>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>Tiếp tục hành trình Cafe Flow của bạn ☕</p>
                </div>

                {/* Card */}
                <div className="glass-card" style={{ padding: '2rem', borderRadius: '28px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                        <div className="field-group">
                            <label className="field-label"><User size={13} /> Tên đăng nhập</label>
                            <div className="input-icon-wrap">
                                <span className="input-icon"><User size={16} /></span>
                                <input className="cute-input" type="text" placeholder="Nhập tên đăng nhập..." value={username} onChange={e => setUsername(e.target.value)} required autoFocus />
                            </div>
                        </div>

                        <div className="field-group">
                            <label className="field-label"><Lock size={13} /> Mật khẩu</label>
                            <div className="input-icon-wrap">
                                <span className="input-icon"><Lock size={16} /></span>
                                <input className="cute-input" type="password" placeholder="Nhập mật khẩu..." value={password} onChange={e => setPassword(e.target.value)} required />
                            </div>
                        </div>

                        {error && (
                            <div style={{ background: '#FFF1F1', border: '1px solid #FFCDD2', borderRadius: 'var(--radius-sm)', padding: '0.7rem 1rem', color: '#C62828', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                ⚠️ {error}
                            </div>
                        )}

                        <button type="submit" className="cute-btn" disabled={loading} style={{ width: '100%', justifyContent: 'center', height: '50px', fontSize: '1rem', marginTop: '0.5rem', borderRadius: '14px', opacity: loading ? 0.75 : 1 }}>
                            {loading ? 'Đang xác thực...' : <><span>Đăng Nhập</span><ArrowRight size={20} /></>}
                        </button>
                    </form>
                </div>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                    Chưa có tài khoản?{' '}
                    <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 800, textDecoration: 'none' }}>
                        Đăng ký ngay ✨
                    </Link>
                </p>
            </div>
        </div>
    );
};
