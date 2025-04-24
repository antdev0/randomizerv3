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
    const { activeParticipants, setActiveParticipants, fetchParticipants } = useAppContext();

    const handleAddLocalParticipants = (payload: Record<string, string | number>[]) => {
        setActiveParticipants([...activeParticipants, ...payload]);
    }

    const updateExistingParticipant = (participantId: string | number, newEntry: number) => {
        setActiveParticipants(activeParticipants.map(participant => {
            if (participant.id === participantId) {
                return { ...participant, entries: newEntry };
            }
            return participant;
        }));
    }

    const handleBatchInsertParticipants = async (participants: Participant[]) => {
        if (user) {
            const res = await ParticipantsService.batchInsertParticipants({ userId: user.id, participants })
            if (res.status === 201) {
                toast.success("Participants added successfully");
                fetchParticipants();
            }
        }
    }


    return { activeParticipants, handleAddLocalParticipants, updateExistingParticipant, handleBatchInsertParticipants };
}

export default useParticipants;