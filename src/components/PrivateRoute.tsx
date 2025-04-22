"use client";
import { useAuthContext } from "@store/AuthContext";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { user, authLoading } = useAuthContext();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/');
        }
    }, [authLoading, user, router]);

    if (authLoading || !user) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default PrivateRoute;
