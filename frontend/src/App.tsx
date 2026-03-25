import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { CalendarPage } from './pages/CalendarPage';
import { WorkflowPage } from './pages/WorkflowPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { FreeTimePage } from './pages/FreeTimePage';
import { SettingsPage } from './pages/SettingsPage';
import { useData } from './hooks/useData';
import './styles/design-system.css';
import './index.css';
import { useAuth, AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { LandingPage } from './pages/LandingPage';

const AppContent: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const { events, labels, loadData, loading } = useData();

    if (!isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', background: 'var(--bg-gradient)', fontWeight: 800 }}>Đang pha cà phê, đợi xíu nha... ☕</div>;

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/calendar" element={<CalendarPage events={events} labels={labels} refresh={loadData} />} />
                <Route path="/workflow" element={<WorkflowPage events={events} labels={labels} />} />
                <Route path="/free-time" element={<FreeTimePage events={events} />} />
                <Route path="/analytics" element={<AnalyticsPage events={events} labels={labels} />} />
                <Route path="/settings" element={<SettingsPage labels={labels} refresh={loadData} />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
