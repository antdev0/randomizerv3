import { api } from "./api";
// import { Payload } from "@/types/payload";

export const ParticipantsService = {


    fetchParticipants: async ({ userId }: { userId: string | number}) => {
        const data = await api.get(`/participants/${userId}`);
        return data;
    },



}