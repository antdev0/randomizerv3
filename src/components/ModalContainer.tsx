"use client";
import { useModalContext } from "@store/ModalContext";
import PrizeListModal from "@features/prize-viewer/components/PrizeListModal";
import RaffleGameModal from "@features/main-screen/components/RaffleGameModal";

const ModalContainer = () => {
    const { activeModal } = useModalContext();

    const modals: Record<string, React.ReactNode> = {
        prizeListModal: <PrizeListModal isOpen={activeModal === "prizeListModal"} />,
        raffleGameModal: <RaffleGameModal isOpen={activeModal === "raffleGameModal"} />,
    };


    return activeModal && modals[activeModal] ? modals[activeModal] : null;
};

export default ModalContainer;
