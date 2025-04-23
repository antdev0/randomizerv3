
"use client";
import { useModalContext } from "@store/ModalContext";

const PrizeViewer = () => {
    const { openModal } = useModalContext();
    return (
        <div className="w-full h-full flex-col gap-5 flex items-center justify-center text-white px-10">
            <div className="aspect-square w-full relative cursor-pointer" onClick={() => openModal("prizeListModal")}>
                <img src="https://placehold.co/600x600" alt="" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-center font-bold text-2xl">Acerpure Cozy F4 </h1>
            <p>1 item left</p>
        </div>
    );
}

export default PrizeViewer;