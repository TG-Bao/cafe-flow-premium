import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    user: string | null;
    token: string | null;
    login: (username: string, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(localStorage.getItem('username'));
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const login = (username: string, token: string) => {
        setUser(username);
        setToken(token);
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
