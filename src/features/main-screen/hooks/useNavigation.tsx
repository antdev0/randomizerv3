import { useAppContext } from "@store/AppContext";


export const useNavigation = () => {
    const {
        setIsFullScreen, isFullScreen,
        selectedGame, setSelectedGame
    } = useAppContext();


    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const changeSelectedGame = (game: string) => {
        setSelectedGame(game);
    };

    return { toggleFullScreen, isFullScreen, selectedGame, changeSelectedGame  };
}

export default useNavigation;