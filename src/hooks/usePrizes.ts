import { useAppContext } from "@store/AppContext";
import { useAuthContext } from "@/store/AuthContext";
import { PrizesService } from "@services/PrizesService";
import { useState } from "react";
import toast from "react-hot-toast";
import logger from "@lib/logger";
import { useModalContext } from "@store/ModalContext";



export const usePrizes = () => {
    const { closeModal } = useModalContext();
    const { user } = useAuthContext();


    const { forCmsPrizes, selectedGame, fetchPrizes, setSelectedPrize, activePrizes } = useAppContext();
    const [loading, setLoading] = useState(false);


    const handleAddPrize = async (payload: Record<string, string | number>) => {
        if (!user) {
            toast.error("You must be logged in to add a prize.");
            return;
        }

        try {
            setLoading(true);
            await PrizesService.addPrize({ userId: user.id, prize: payload });

            fetchPrizes();
            closeModal();
            toast.success("Prize added successfully!");
        } catch (error) {
            toast.error("Failed to add prize");
            logger.error(error);
        } finally {
            setLoading(false);
        }
    };

  

    const handleUpdatePrize = async (payload: Record<string, string | number>) => {
        if (!user) {
            toast.error("You must be logged in to update a prize.");
            return;
        }

        try {
            setLoading(true);
            const res = await PrizesService.updatePrize({ userId: user.id, prize: payload });

            if (res.status === 200) {
                fetchPrizes();
                setSelectedPrize(null);
                closeModal();
                toast.success("Prize updated successfully!");
            }

        } catch (error) {
            toast.error("Failed to update prize");
            logger.error(error);
        } finally {
            setLoading(false);
        }
    };



    const handleDeletePrize = async (prizeId: string) => {
        if (!user) {
            toast.error("You must be logged in to delete a prize.");
            return;
        }

        try {
            setLoading(true);
            const res = await PrizesService.deletePrize(prizeId);
            if (res.status === 200) {
                fetchPrizes();
                setSelectedPrize(null);
                closeModal();
            }
        } catch (error) {
            toast.error("Failed to delete prize");
            logger.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { activePrizes, forCmsPrizes, handleAddPrize, loading, selectedGame, handleDeletePrize, handleUpdatePrize };
}

export default usePrizes;