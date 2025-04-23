import { useAppContext, Participants } from "@store/AppContext";


export const useParticipants = () => {
    const { activeParticipants, setActiveParticipants } = useAppContext();

    const handleAddLocalParticipants = (payload: Participants) => {
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


    return { activeParticipants, handleAddLocalParticipants, updateExistingParticipant };
}

export default useParticipants;