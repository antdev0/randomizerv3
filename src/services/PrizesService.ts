import { api } from "./api";



export const PrizesService = {


    fetchPrizes: async ({ userId }: { userId: string | number }) => {
        const data = await api.get(`/prize-list/${userId}`);
        return data;
    },

    addPrize: async ({ userId, prize }: { userId: string | number, prize: Record<string, string | number> }) => {
        const data = await api.post(`/prize-list/${userId}`, {
            ...prize,
            quantity: Number(prize.quantity),

        });
        return data;
    },

    deletePrize: async (prizeId: string | number) => {
        const data = await api.delete(`/prize-list/delete/${prizeId}`);
        return data;
    },

    updatePrize: async ({ userId, prize }: { userId: string | number, prize: Record<string, string | number> }) => {
        const data = await api.patch(`/prize-list/${userId}`, {
            ...prize,
            quantity: Number(prize.quantity),
        });
        return data;
    },




}