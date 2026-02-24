import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from './Api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth musi być używany wewnątrz AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (token && user) {
            try {
                const response = await authAPI.getUser();
                setUser(response.data.user);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            } catch (error) {
                if (error.response?.status === 401) {
                    logout();
                }
            }
        }
    };

    const login = async (email, haslo) => {
        try {
            const response = await authAPI.login(email, haslo);
            const { token } = response.data;
            localStorage.setItem('token', token);

            const userResponse = await authAPI.getUser();
            const user = userResponse.data.user;

            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const register = async (email, haslo, imie, nazwisko) => {
        try {
            const response = await authAPI.register(email, haslo, imie, nazwisko);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const isAuthenticated = () => !!user;
    const isAdmin = () => user?.rola === 'administrator';
    const isUser = () => user?.rola === 'uzytkownik';

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, isAdmin, isUser }}>
            {children}
        </AuthContext.Provider>
    );
};