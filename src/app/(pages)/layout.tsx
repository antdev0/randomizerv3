import { AuthProvider } from "@store/AuthContext";
import PrivateRoute from "@components/PrivateRoute";
import { AppProvider } from "@store/AppContext";


export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AppProvider>
                <PrivateRoute>
                    {children}
                </PrivateRoute>
            </AppProvider>
        </AuthProvider>
    )
}