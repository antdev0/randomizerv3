import { useState } from "react";
import { Modal } from "@components/modal";
import { useModalContext } from "@store/ModalContext";
import { ActiveParticipantsData, ActivePrizesData, PrizesData } from "@/types/game";
import { WinnerService } from "@services/WinnerService";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import RobotAnimation from "@assets/lottie/robot-animation.json"

interface WinnerModalProps {
    selectedPrize: ActivePrizesData | null;
    selectedWinner: ActiveParticipantsData | null;
    user: Record<string, string | number> | null;
    selectedGame: string;
    deductPrizeQuantity: (prizeId: string, type: keyof PrizesData) => void;
    setAllRecordsToZero: (name: string, company: string) => void;
}

const WinnerModal = ({ isOpen }: { isOpen: boolean }) => {


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: RobotAnimation,

    };


    const { closeModal, modalData } = useModalContext();
    const {
        selectedPrize,
        selectedWinner,
        user,
        selectedGame,
        deductPrizeQuantity,
        setAllRecordsToZero

    } = modalData as WinnerModalProps;
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    const handleClose = () => {
        closeModal();
        setIsConfirmationModalOpen(false);
    }

    const handleSave = async () => {
        try {
            setSaveLoading(true);
            const res = await WinnerService.submitWinner(user?.id as string, {
                type: selectedGame as string,
                prize_list_id: selectedPrize?.id as string,
                participant_id: selectedWinner?.id as string,
            });

            deductPrizeQuantity(selectedPrize?.id as string, selectedGame as keyof PrizesData);


            if (res.data.type === "all" && res.data.status === "reached") {
                setAllRecordsToZero(selectedWinner?.name as string, selectedWinner?.company as string);
            }
            closeModal();
            toast.success("Winner saved successfully!");

        } catch (error) {
            toast.error("Failed to save winner");
            console.error(error);
        } finally {
            setSaveLoading(false);
        }
    }




    return (

        <>
            <Modal isOpen={isOpen} clickOutsideToClose={false} className="max-w-sm">
                <div className="py-5 flex flex-col items-center justify-center  ">
                    {/* <Icon name="Trophy" className="text-yellow-400 h-20 w-20 font-bold" /> */}
                    <Lottie options={defaultOptions} width={200} height={200} />
                    <div className="text-center mb-5">
                        <p className="text-gray-800 font-bold">Congratulations,</p>
                        <h1 className="font-bold text-3xl ">{selectedWinner?.name}</h1>
                        <p className="text-gray-600 text-lg">{selectedWinner?.company}</p>
                    </div>

                    <p className="text-center mb-5">For winning <span className="font-bold">{selectedPrize?.name}</span></p>

                    <div className="flex flex-col w-full">
                        <button
                            onClick={handleSave}
                            disabled={saveLoading}
                            className="bg-cyan-500  text-white py-3 rounded-lg font-bold inline-flex items-center justify-center  w-full">
                            {
                                saveLoading ? "Saving..." : "Save"
                            }
                        </button>

                        <button onClick={() => setIsConfirmationModalOpen(true)} className=" text-gray-500 border border-gray-200 py-3 rounded-lg font-bold inline-flex items-center justify-center mt-2  w-full">
                            Close
                        </button>
                    </div>
                </div>
            </Modal>

            {
                isConfirmationModalOpen && (
                    <div className="fixed top-0 left-0 h-screen w-screen bg-black/50 flex items-center justify-center z-[51]">
                        <div className="bg-white rounded-lg p-5 relative w-[25rem]">
                            <h1 className="font-bold text-xl">Confirmation</h1>
                            <p className="my-3">Are you sure you want to close with out saving the winner?</p>
                            <div className="flex gap-2 justify-end w-full">
                                <button onClick={() => setIsConfirmationModalOpen(false)} className=" text-gray-500 border border-gray-200 py-3 rounded-lg font-bold inline-flex items-center justify-center  px-7">
                                    No
                                </button>
                                <button onClick={handleClose} className="bg-cyan-500  text-white py-3 rounded-lg font-bold inline-flex items-center justify-center  px-7">
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }



        </>

    );
}

export default WinnerModal;