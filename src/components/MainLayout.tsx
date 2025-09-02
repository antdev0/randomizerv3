import { useAppContext } from "@store/AppContext";
import PrizeViewer from "@features/prize-viewer/components/PrizeViewer"
import RandomizerViewer from "@/features/main-screen/components/RandomizerViewer";
import ContentViewer from "@features/game-content/components/ContentViewer";


interface MainLayoutProps {
    bg: string | null;
    children: React.ReactNode;
}

const MainLayout = ({ bg, children }: MainLayoutProps) => {


    const { isFullScreen } = useAppContext();


    return (
        <div
            className="w-screen h-screen  relative overflow-hidden"
            style={
                bg
                    ? {
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }
                    : {}
            }
        >
            {children}

            <div className="flex w-full h-full gap-3 p-3">
                <div className="w-1/3 h-full border border-white/30 rounded-lg relative overflow-hidden">
                    <PrizeViewer />
                </div>
                <div className={`${isFullScreen ? "w-2/3" : "w-1/3"} h-full border border-white/30 rounded-lg relative overflow-hidden`}>
                    <RandomizerViewer />
                </div>
                <div className={`w-1/3 h-full border border-white/30 rounded-lg relative overflow-hidden ${isFullScreen ? "hidden" : ""}`}>
                    <ContentViewer />
                </div>
            </div>
        </div>
    );
}

export default MainLayout;