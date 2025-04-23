"use client";


import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthService } from '@services/AuthService';
import toast from 'react-hot-toast';

type AuthContextType = {
    authLoading: boolean;
    user: Record<string, string | number> | null
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {


    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState<Record<string, string | number> | null>(null);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                setAuthLoading(true);
                const token = localStorage.getItem('token');
                if (!token) {
                    setUser(null);
                    return;
                }
                const res = await AuthService.verifyToken(token);
                setUser(res.data.user);
            } catch (error) {
                setUser(null);
                toast.error('Unauthenticated');
                console.error(error);
            } finally {
                setAuthLoading(false);
            }
        };
        verifyUser();
    }, []);


    return (
        <AuthContext.Provider value={{ authLoading, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return context;
};

export default AuthContext;