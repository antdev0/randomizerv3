import { useAppContext } from "@store/AppContext";
import { GameType } from "@/types/game";


export const useNavigation = () => {
    const {
        setIsFullScreen, isFullScreen,
        selectedGame, setSelectedGame,
        setSelectedPrize
    } = useAppContext();


    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const changeSelectedGame = (game: GameType) => {
        setSelectedGame(game);
        setSelectedPrize(null);
    };

    return { toggleFullScreen, isFullScreen, selectedGame, changeSelectedGame  };
}

export default useNavigation;