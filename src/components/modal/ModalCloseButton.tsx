
import Icon from "@components/Icon";
import { useModalContext } from "@store/ModalContext";
const ModalCloseButton = () => {
    const { closeModal } = useModalContext();
    return (
        <div className="absolute top-5 right-5">
            <button className="aspect-square w-7 h-7 rounded-full bg-gray-500/30 transition-colors flex items-center justify-center" onClick={closeModal}>
                <Icon name="X" size={16} className="text-gray-700" />
            </button>
        </div>
    );
}

export default ModalCloseButton;