import { Modal } from "@components/modal";
import { useModalContext } from "@store/ModalContext";

interface ModalData {
    handleDeletePrize: (prizeId: string) => void;
    prizeId: string;
    loading: boolean
}

const DeletePrizeModal = ({ isOpen }: { isOpen: boolean }) => {
    const { modalData } = useModalContext();
    const { handleDeletePrize, prizeId, loading } = modalData as ModalData;

    return (
        <Modal isOpen={isOpen} className="max-w-sm">
            <h1 className="font-bold text-xl">Delete Item</h1>
            <p className="mt-5">Are you sure you want to delete this item?</p>
            <div className="flex justify-end mt-5">
                <button
                    disabled={loading}
                    onClick={() => handleDeletePrize(prizeId)}
                    className="bg-red-500 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50">
                    {
                        loading ? "Deleting..." : "Delete"
                    }
                </button>
            </div>
        </Modal>
    );
}

export default DeletePrizeModal