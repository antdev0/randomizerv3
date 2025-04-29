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
    const { activeParticipants, fetchParticipants } = useAppContext();

   


    const handleBatchInsertParticipants = async (participants: Participant[]) => {
        if (user) {
            const res = await ParticipantsService.batchInsertParticipants({ userId: user.id, participants })
            if (res.status === 201) {
                toast.success("Participants added successfully");
                fetchParticipants();
            }
        }
    }


    return { activeParticipants, handleBatchInsertParticipants };
}

export default useParticipants;