import { api } from "./api";


export const WinnerService = {
    submitWinner: async (userId: string | number, winner: Record<string, string | number>) => {
        const data = await api.post(`/winners/${userId}`, winner);
        return data;
    }
}