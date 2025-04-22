
import { api } from "./api";
import { Payload } from "@/types/payload";



export const AuthService = {
    fetchUsers: async () => {
        const data = await api.get(`/users`);
        return data;
    },

    login: async (payload: Payload) => {
        const data = await api.post(`/auth`, payload);
        return data;
    },

    verifyToken: async (token: string) => {
        const data = await api.get(`/auth`, { headers: { Authorization: `Bearer ${token}` } });
        return data;
    },

}