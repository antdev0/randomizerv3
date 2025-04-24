import { Modal } from "@components/modal";
import { useConvertToBase64 } from "@hooks/useConvertToBase64";
import Image from "next/image";
import { useState } from "react";

import { useModalContext } from "@store/ModalContext";


interface ModalData {
    handleAddPrize: (payload: Record<string, string | number>) => void;
    loading: boolean;
    selectedGame: string;
}


const AddPrizeModal = ({ isOpen }: { isOpen: boolean }) => {
    const { base64, error, convertToBase64 } = useConvertToBase64();
    const { modalData } = useModalContext();

    const { handleAddPrize, loading, selectedGame } = modalData as ModalData;

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files ? e.target.files[0] : null;
        if (uploadedFile) {
            convertToBase64(uploadedFile);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddPrize({
            name,
            quantity,
            image: base64 as string,
            type: selectedGame,
        })
    };



    return (
        <Modal isOpen={isOpen} className="max-w-sm">
            <div className="aspect-square w-full bg-gray-500 rounded-lg relative">
                {/* Display Base64 Image using Next.js Image component */}
                {base64 ? (
                    <Image
                        src={base64}
                        alt="Uploaded prize image"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-lg"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-lg">
                        <span className="text-white">No image selected</span>
                    </div>
                )}

                {/* Allow the user to change image */}
                <label className="absolute inset-0 flex items-center justify-center cursor-pointer text-white bg-gray-800/50 rounded-lg">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg"
                        className="hidden"
                    />
                </label>
            </div>


            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <label htmlFor="prize-name" className="block text-sm font-semibold text-gray-700">Prize Name</label>
                    <input
                        id="prize-name"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        placeholder="Enter prize name"
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700">Quantity</label>
                    <input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        placeholder="Enter quantity"
                    />
                </div>

                <div className="mt-4">
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-md"
                    >
                        {
                            loading ? "Adding..." : "Add"
                        }
                    </button>
                </div>
            </form>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </Modal>
    );
}

export default AddPrizeModal;
