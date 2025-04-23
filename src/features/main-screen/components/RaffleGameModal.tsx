
import { Modal } from "@components/modal";
import { useModalContext } from "@store/ModalContext";

interface ModalData {
    selectedGame: string;
    changeSelectedGame: (game: string) => void;
}


const RaffleGameModal = ({ isOpen }: { isOpen: boolean }) => {




    const { modalData, closeModal } = useModalContext();
    const { selectedGame, changeSelectedGame } = modalData as ModalData;

    const handleChangeGame = (game: string) => {
        changeSelectedGame(game);
        closeModal()
    }

    return (
        <Modal isOpen={isOpen} className="max-w-sm">
            <div
                onClick={() => handleChangeGame("major")}
                className={`cursor-pointer border flex relative items-center px-2 gap-2 rounded-lg mt-2 py-4 justify-center font-bold ${selectedGame === "major" ? "bg-blue-500 text-white" : ""}`}>
                MAJOR RAFFLE
            </div>

            <div
                onClick={() => handleChangeGame("minor")}
                className={`cursor-pointer border flex relative items-center px-2 gap-2 rounded-lg mt-2 py-4 justify-center font-bold ${selectedGame === "minor" ? "bg-blue-500 text-white" : ""}`}>
                MINOR RAFFLE
            </div>
        </Modal>
    );
}

export default RaffleGameModal;