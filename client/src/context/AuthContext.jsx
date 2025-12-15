import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Validate token or just set user state (simplified for MVP)
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await axios.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setUser({ token: res.data.token });
    };

    const signup = async (email, password) => {
        await axios.post('/auth/signup', { email, password });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
