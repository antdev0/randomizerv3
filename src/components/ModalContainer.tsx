"use client";
import { useModalContext } from "@store/ModalContext";
import PrizeListModal from "@features/prize-viewer/components/PrizeListModal";
import RaffleGameModal from "@features/main-screen/components/RaffleGameModal";
import AddPrizeModal from "@features/game-content/components/AddPrizeModal";
import DeletePrizeModal from "@features/game-content/components/DeletePrizeModal";
import EditPrizeModal from "@features/game-content/components/EditPrizeModal";

const ModalContainer = () => {
    const { activeModal } = useModalContext();

    const modals: Record<string, React.ReactNode> = {
        prizeListModal: <PrizeListModal isOpen={activeModal === "prizeListModal"} />,
        raffleGameModal: <RaffleGameModal isOpen={activeModal === "raffleGameModal"} />,
        addPrizeModal: <AddPrizeModal isOpen={activeModal === "addPrizeModal"} />,
        deletePrizeModal: <DeletePrizeModal isOpen={activeModal === "deletePrizeModal"} />,
        editPrizeModal: <EditPrizeModal isOpen={activeModal === "editPrizeModal"} />,
    };


    return activeModal && modals[activeModal] ? modals[activeModal] : null;
};

export default ModalContainer;
