import { useState } from "react";
import { useAppContext } from "@store/AppContext";
import { ParticipantsService } from "@services/ParticipantsService";
import { useAuthContext } from "@/store/AuthContext";
import toast from "react-hot-toast";

export interface Participant {
    name: string;
    company: string;
    entries: number;
    type: string
}


export const useParticipants = () => {
    const { user } = useAuthContext();
    const [batchInsertLoading, setBatchInsertLoading] = useState(false);
    const { activeParticipants, fetchParticipants } = useAppContext();




    const handleBatchInsertParticipants = async (participants: Participant[]) => {
        try {
            if (user) {
                setBatchInsertLoading(true);
                const res = await ParticipantsService.batchInsertParticipants({ userId: user.id, participants })
                if (res.status === 201) {
                    toast.success("Participants added successfully");
                    fetchParticipants();
                }
            }
        } catch (error) {
            toast.error("Failed to add participants");
            console.error(error);
        } finally {
            setBatchInsertLoading(false);
        }
    }


    return { activeParticipants, handleBatchInsertParticipants, batchInsertLoading };
}

export default useParticipants;