import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Clock, LayoutDashboard, GitBranch, BarChart3, Settings2, Coffee, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose, isMobile = false }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Tổng Quan', path: '/' },
    { icon: <Calendar size={20} />, label: 'Lịch Trình', path: '/calendar' },
    { icon: <GitBranch size={20} />, label: 'Lộ Trình', path: '/workflow' },
    { icon: <Clock size={20} />, label: 'Giờ Rảnh', path: '/free-time' },
    { icon: <BarChart3 size={20} />, label: 'Thống Kê', path: '/analytics' },
    { icon: <Settings2 size={20} />, label: 'Cài Đặt', path: '/settings' },
  ];

  const handleNavClick = () => {
    if (isMobile && onClose) onClose();
  };

  return (
    <aside
      className={`sidebar ${isMobile && isOpen ? 'open' : ''}`}
      style={{
        width: '260px',
        height: '100vh',
        padding: '1.5rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--glass-border)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        position: isMobile ? 'fixed' : 'sticky',
        top: 0,
        flexShrink: 0,
        overflowY: 'auto',
        zIndex: isMobile ? 199 : 1,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--secondary)', color: 'white', padding: '0.45rem', borderRadius: '10px', display: 'flex', flexShrink: 0 }}>
            <Coffee size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--secondary)', margin: 0, letterSpacing: '-0.5px' }}>Cafe Flow</h1>
            <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hành trình ✨</span>
          </div>
        </div>
        {isMobile && (
          <button onClick={onClose} style={{ background: 'var(--primary-light)', border: 'none', borderRadius: '8px', padding: '0.4rem', cursor: 'pointer', color: 'var(--secondary)', display: 'flex' }}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            {item.icon}
            <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem', marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.75rem', background: 'var(--accent-light)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 900, fontSize: '1rem',
          }}>
            {user?.[0]?.toUpperCase() || 'U'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontWeight: 800, color: 'var(--secondary)', fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user}</p>
            <button
              onClick={logout}
              style={{ background: 'none', border: 'none', padding: 0, color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', marginTop: '2px' }}
            >
              Đăng xuất 🚪
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
