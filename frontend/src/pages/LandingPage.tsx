import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Calendar, Zap, Layout, ArrowRight, CheckCircle, Smartphone, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
            {/* Hero Section */}
            <section style={{ padding: '6rem 2rem', textAlign: 'center', background: 'var(--bg-gradient)', position: 'relative' }}>
                <div className="float-anim" style={{ background: 'var(--primary)', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'white', boxShadow: 'var(--shadow-glow)' }}>
                    <Coffee size={40} />
                </div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--secondary)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                    Hòa quyện Cà phê & <br/><span style={{ color: 'var(--primary)' }}>Năng suất làm việc</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                    Ứng dụng quản lý lịch trình cá nhân hóa, giúp bạn tối ưu hóa thời gian rảnh và theo dõi lộ trình công việc mỗi ngày một cách sinh động nhất.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    {isAuthenticated ? (
                        <Link to="/calendar" className="cute-btn" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                            Vào Lịch Của Bạn <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" className="cute-btn" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                Bắt đầu ngay 🚀
                            </Link>
                            <Link to="/register" className="cute-btn outline" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: 'transparent' }}>
                                Tạo tài khoản
                            </Link>
                        </>
                    )}
                </div>
            </section>

            {/* Features Info */}
            <section style={{ padding: '4rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <FeatureCard 
                    icon={<Calendar color="var(--primary)" />} 
                    title="Quản lý Lịch thông minh" 
                    desc="Giao diện Calendar trực quan, dễ dàng theo dõi tab tháng/tuần/ngày với tone màu Nâu cao cấp."
                />
                <FeatureCard 
                    icon={<Zap color="var(--accent)" />} 
                    title="Tìm giờ rảnh tự động" 
                    desc="Hệ thống tự động quét lịch trình và gợi ý những khoảng thời gian bạn đang rảnh để nghỉ ngơi."
                />
                <FeatureCard 
                    icon={<Layout color="var(--secondary)" />} 
                    title="Lộ trình Workflow" 
                    desc="Vẽ đường đi từ công việc này sang công việc khác, giúp bạn hình dung một ngày bận rộn một cách nghệ thuật."
                />
            </section>

            {/* Guide Section */}
            <section style={{ padding: '6rem 2rem', background: 'white', borderRadius: '50px 50px 0 0', marginTop: '4rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '4rem' }}>Hướng dẫn sử dụng ✨</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <GuideStep number="1" title="Đăng ký tài khoản" desc="Mỗi người dùng sẽ có một cơ sở dữ liệu riêng biệt. Hãy tạo tài khoản để bắt đầu lưu trữ lịch trình cá nhân." />
                        <GuideStep number="2" title="Lên lịch công việc" desc="Sử dụng nút 'Thêm Lịch' để tạo công việc. Bạn có thể chọn nhãn (Label) để phân loại như Học tập, Công việc, hay Giải trí." />
                        <GuideStep number="3" title="Xem Lộ trình (Workflow)" desc="Vào tab Lộ trình để xem các task được kết nối với nhau bằng những đường cong mượt mà, giúp theo trình tự thời gian." />
                        <GuideStep number="4" title="Phân tích năng suất" desc="Đừng quên kiểm tra tab Thống kê để xem bạn bận rộn vào khung giờ nào nhất và điều chỉnh lối sống cân bằng hơn." />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--secondary)' }}>
                    <Smartphone size={20} /> <ShieldCheck size={20} /> <CheckCircle size={20} />
                </div>
                <p>© 2026 Cafe Flow Premium - Lên lịch bằng cả trái tim ☕❤️</p>
            </footer>
        </div>
    );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
    <div className="glass-card" style={{ padding: '2rem', textAlign: 'left', transition: 'all 0.3s' }}>
        <div style={{ marginBottom: '1rem' }}>{icon}</div>
        <h3 style={{ color: 'var(--secondary)', marginBottom: '0.75rem', fontWeight: 800 }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
    </div>
);

const GuideStep: React.FC<{ number: string, title: string, desc: string }> = ({ number, title, desc }) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ 
            minWidth: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary)', 
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: '1.5rem', fontWeight: 900, boxShadow: 'var(--shadow-glow)'
        }}>
            {number}
        </div>
        <div>
            <h4 style={{ fontSize: '1.4rem', color: 'var(--secondary)', marginBottom: '0.5rem', fontWeight: 800 }}>{title}</h4>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
        </div>
    </div>
);
