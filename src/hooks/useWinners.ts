
import { useAppContext } from "@store/AppContext";
import { ParticipantsData, PrizesData } from "@/types/game";



export const useWinners = () => {

    const { participantsData, setParticipantsData, prizesData, setPrizesData, setSelectedPrize, selectedPrize } = useAppContext();


    const setAllRecordsToZero = (name: string, company: string) => {
        if (participantsData) {
            // Create a new object with updated values for major and minor
            const updatedData: ParticipantsData = {
                major: participantsData.major.map((participant) =>
                    participant.name === name && participant.company === company
                        ? { ...participant, entries: 0 }
                        : participant
                ),
                minor: participantsData.minor.map((participant) =>
                    participant.name === name && participant.company === company
                        ? { ...participant, entries: 0 }
                        : participant
                ),
            };

            // Now set the participantsData to the new updatedData
            setParticipantsData(updatedData);
        }
    };

    const deductPrizeQuantity = (prizeId: string, type: keyof PrizesData) => {
        if (prizesData) {
            const updatedTypePrizes = prizesData[type].map((prize) => {
                if (prize.id === prizeId) {
                    return { ...prize, quantity: prize.quantity - 1 };
                }
                return prize;
            });

            setPrizesData({
                ...prizesData,
                [type]: updatedTypePrizes,
            });

            if (selectedPrize?.id === prizeId) {
                const newQuantity = selectedPrize.quantity - 1;
                if (newQuantity === 0) {
                    setSelectedPrize(null);
                } else {
                    setSelectedPrize({
                        ...selectedPrize,
                        quantity: newQuantity,
                    });
                }
            }
        }
    };


    return { setAllRecordsToZero, deductPrizeQuantity };
}

export default useWinners;