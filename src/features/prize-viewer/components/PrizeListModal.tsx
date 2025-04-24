import { useState, useEffect } from "react";
import { Modal } from "@components/modal";
import Icon from "@components/Icon";
import { useModalContext } from "@store/ModalContext";
import Image from "next/image";

interface ModalData {
    activePrizes: Record<string, string | number>[];
    setSelectedPrize: (val: Record<string, string | number> | null) => void;

}

const PrizeListModal = ({ isOpen }: { isOpen: boolean }) => {
    const [filteredPrize, setFilteredPrize] = useState<Record<string, string | number>[]>([]);
    const { modalData, closeModal } = useModalContext();
    const { activePrizes, setSelectedPrize } = modalData as ModalData;

    useEffect(() => {
        if (isOpen) {
            setFilteredPrize(activePrizes);
        }
    }, [activePrizes, isOpen]);

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFilteredPrize(activePrizes.filter(prize => String(prize.name).toLowerCase().includes(value.toLowerCase())));
    }

    const handleSetSelectedPrize = (prize: Record<string, string | number>) => {
        setSelectedPrize(prize);
        closeModal();
    }


    return (
        <Modal isOpen={isOpen} className="max-w-md">

            <h1 className="font-bold text-xl">Prize list</h1>
            <div className="border flex relative items-center px-2 gap-2 rounded-lg mt-2">
                <Icon name="Search" size={20} className="text-gray-700" />
                <input
                    type="text"
                    onChange={handleFilter}
                    placeholder="Search..."
                    className=" w-full py-3 unset appearance-none  bg-transparent  border-none outline-none focus:outline-none focus:ring-0 focus:border-none shadow-none" />
            </div>

            <div className="flex flex-col gap-3 mt-2">
                {
                    filteredPrize.length === 0 ? <div className="text-gray-700 text-center">No item found</div> : (
                        filteredPrize.map((prize, index) => (
                            <div key={index} 
                            onClick={() => handleSetSelectedPrize(prize)}
                            className="w-full border flex items-center gap-5 p-2 rounded-lg cursor-pointer hover:bg-gray-100/90 transition">
                                <div className="bg-gray-500 aspect-square rounded-lg w-[3.75rem] shrink-0 relative">
                                    <Image
                                        src={prize?.image as string}
                                        alt="Prize image"
                                        width={500}
                                        height={500}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    <p>{prize.name}</p>
                                    <p className="text-sm">QTY: {prize.quantity}</p>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </Modal>
    );
}

export default PrizeListModal;