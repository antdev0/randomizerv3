import Icon from "@components/Icon";
import { useNavigation } from "@features/main-screen/hooks/useNavigation"
import { useModalContext } from "@store/ModalContext";
const Navigation = () => {
    const { openModal } = useModalContext();

    const { toggleFullScreen, isFullScreen, selectedGame, changeSelectedGame } = useNavigation();


    return (
        <div className="flex  justify-between">
            <button
                onClick={() => openModal("raffleGameModal", { changeSelectedGame, selectedGame })}
                className="text-white border-b pb-1 px-2 inline-flex items-center gap-2">
                {selectedGame.charAt(0).toUpperCase() + selectedGame.slice(1)} Raffle <span><Icon name="ChevronRight" size={16} className="text-white" /></span>
            </button>
            <button onClick={toggleFullScreen}>

                <Icon name={isFullScreen ? "Minimize2" : "Maximize2"} size={20} className="text-white" />
            </button>
        </div>
    );
}

export default Navigation;