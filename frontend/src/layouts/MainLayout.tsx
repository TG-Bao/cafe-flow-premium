import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { Menu, Coffee } from 'lucide-react';

export const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when sidebar open on mobile
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobile, sidebarOpen]);

  return (
    <div className="app-layout">
      {/* Mobile Topbar */}
      {isMobile && (
        <div className="mobile-topbar">
          <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ background: 'var(--secondary)', color: 'white', padding: '0.3rem', borderRadius: '8px', display: 'flex' }}>
              <Coffee size={18} />
            </div>
            <span style={{ fontWeight: 900, color: 'var(--secondary)', fontSize: '1.1rem' }}>Cafe Flow</span>
          </div>
          <div style={{ width: 40 }} />
        </div>
      )}

      {/* Sidebar overlay (mobile only) */}
      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />

      {/* Main content */}
      <main className="main-content" style={{ padding: isMobile ? '1rem' : '2rem', overflowY: 'auto', maxHeight: isMobile ? 'calc(100vh - 60px)' : '100vh' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
