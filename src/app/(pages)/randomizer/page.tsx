"use client";

import BG from "@assets/bg/ict_bg.png";
import Matrix from "@components/Matrix";
import { useAppContext } from "@store/AppContext";
import PrizeViewer from "@features/prize-viewer/components/PrizeViewer"
import RandomizerViewer from "@/features/main-screen/components/RandomizerViewer";
import ContentViewer from "@features/game-content/components/ContentViewer";




export default function Randomizer() {


    const { isFullScreen } = useAppContext();
    return (
        <div
            className="w-screen h-screen p-3 relative overflow-hidden"
            style={{
                backgroundImage: `url(${BG.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Matrix />

            <div className="flex w-full h-full gap-3">
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
