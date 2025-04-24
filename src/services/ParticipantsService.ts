import { api } from "./api";
// import { Payload } from "@/types/payload";

export interface Participant {
    name: string;
    company: string;
    entries: number;
    type: string
}

export const ParticipantsService = {


    fetchParticipants: async ({ userId }: { userId: string | number}) => {
        const data = await api.get(`/participants/${userId}`);
        return data;
    },

    batchInsertParticipants: async ({ userId, participants }: { userId: string | number, participants: Participant[] }) => {
        const data = await api.post(`/participants/${userId}/batch`, { participants });
        return data;
    },



}