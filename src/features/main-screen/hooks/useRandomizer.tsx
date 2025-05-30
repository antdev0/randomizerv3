import { useState, useEffect } from "react";
import { useAppContext } from "@store/AppContext";
import { useModalContext } from "@store/ModalContext";
import { useAuthContext } from "@store/AuthContext";
import { useWinners } from "@hooks/useWinners";
import { useSound } from "@hooks/useSoundFx";




export const useRandomizer = () => {
    const { start, stop } = useSound();
    const { openModal } = useModalContext();
    const { user } = useAuthContext();
    const { setAllRecordsToZero, deductPrizeQuantity } = useWinners();
    const { selectedPrize, activeParticipants, setSelectedWinner, selectedGame } = useAppContext();
    const [disableStop, setDisableStop] = useState(true);
    const [rotatingIndex, setRotatingIndex] = useState(0);
    const [randimizingStarted, setRandimizingStarted] = useState(false);
    const [gameWarning, setGameWarning] = useState<string | null>(null);


    const startRandimizing = () => {
        setGameWarning(null);

        if (activeParticipants.length === 0) {
            setGameWarning("There are no participants in the game");
            return;
        }

        if (!selectedPrize) {
            setGameWarning("You must select a prize to start the game");
            return;
        }

        start();

        // Delay enabling stop by 0.5s
        setTimeout(() => {
            setDisableStop(false);
        }, 500);

        setRandimizingStarted(true);
    };

    const stopRandimizing = () => {

        if (activeParticipants.length > 0) {
            const randomIndex = Math.floor(Math.random() * activeParticipants.length);
            const selectedParticipant = activeParticipants[randomIndex];
            setSelectedWinner(selectedParticipant)
            openModal("winnerModal", {
                selectedPrize,
                selectedWinner: selectedParticipant,
                user,
                selectedGame,
                deductPrizeQuantity,
                setAllRecordsToZero
            });
        }
        stop();
        setDisableStop(true);
        setRandimizingStarted(false);
    }



    useEffect(() => {
        const interval = setInterval(() => {
            const newIndex = Math.floor(Math.random() * 6);
            setRotatingIndex(newIndex);
        }, 3000);

        return () => clearInterval(interval);
    }, []);


    return { rotatingIndex, startRandimizing, stopRandimizing, randimizingStarted, gameWarning, disableStop };
}

export default useRandomizer;