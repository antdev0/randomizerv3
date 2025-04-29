import { useModalContext } from "@store/ModalContext";
import { usePrizes } from "@hooks/usePrizes";
import Image from "next/image";
import Icon from "@components/Icon";



const Prizes = () => {
    const { openModal } = useModalContext();
    
    const { handleAddPrize, loading, selectedGame, forCmsPrizes, handleDeletePrize, handleUpdatePrize } = usePrizes();

    return (
        <div className="relative h-[calc(100vh-6.7rem)] w-full flex flex-col gap-5 overflow-y-auto py-2">
            <button onClick={() => openModal("addPrizeModal", { handleAddPrize, loading, selectedGame })} className="mt-3 cursor-pointer px-4 py-2 border border-white/30 text-white rounded  w-full">Add Prize</button>

            <div className="flex flex-col gap-2 border border-white/30 rounded-lg px-3 py-2 max-h-[80vh] overflow-scroll">
                {
                    forCmsPrizes.length === 0 ? <div className="text-white">No items added yet</div> : (
                        forCmsPrizes.map((prize, index) => (
                            <div key={index} className=" flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-gray-50/10 transition text-white">
                                <div className="flex gap-5">
                                    <div className="aspect-square w-[70px] shrink-0  rounded-lg overflow-hidden relative">
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
                                <div className="flex gap-2">
                                    <Icon
                                        onClick={() => openModal("editPrizeModal", { handleUpdatePrize, loading, selectedGame, selectedPrize: prize })}
                                        name="Pencil"
                                        className="text-blue-500 cursor-pointer"
                                        size={20} />
                                    <Icon
                                        name="Trash2"
                                        onClick={() => openModal("deletePrizeModal", { handleDeletePrize, prizeId: prize.id, loading })}
                                        className="text-red-500 cursor-pointer"
                                        size={20} />
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>

    );
}

export default Prizes;