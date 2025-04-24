
"use client";
import { useModalContext } from "@store/ModalContext";
import { usePrizes } from "@hooks/usePrizes";
import Image from "next/image";
import { useAppContext } from "@store/AppContext";



const PrizeViewer = () => {
    const { openModal } = useModalContext();
    const { selectedPrize, setSelectedPrize } = useAppContext();
    const { activePrizes } = usePrizes();


    return (
        <div className="w-full h-full flex-col gap-5 flex items-center justify-center text-white px-10">
            <div className="aspect-square w-full relative cursor-pointer" onClick={() => openModal("prizeListModal", { activePrizes, setSelectedPrize })}>

                <div className=" w-full h-full">
                    {
                        selectedPrize ? <Image
                            src={selectedPrize?.image as string}
                            alt="Prize image"
                            width={500}
                            height={500}
                            className="w-full h-full object-cover rounded-lg"
                        /> : (
                            <div className="bg-gray-100 w-full h-full flex items-center justify-center rounded-lg">
                                <span className="text-gray-700">No item selected</span>
                            </div>
                        )
                    }

                </div>
            </div>
            <h1 className="text-center font-bold text-2xl">{selectedPrize?.name ?? ""}</h1>
            <p>{selectedPrize?.quantity ? `${selectedPrize?.quantity} item${Number(selectedPrize?.quantity) > 1 ? "s" : ""} left ` : ""}</p>
        </div>
    );
}

export default PrizeViewer;