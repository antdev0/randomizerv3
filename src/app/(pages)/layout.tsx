import { AuthProvider } from "@store/AuthContext";
import PrivateRoute from "@components/PrivateRoute";


export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <PrivateRoute>
                {children}
            </PrivateRoute>
        </AuthProvider>
    )
}