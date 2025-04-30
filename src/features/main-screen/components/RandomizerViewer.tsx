
import Navigation from "@features/main-screen/components/Navigation";
import VSTECSWhite from "@assets/logos/vstecs_white.png"
import ICTSummit from "@assets/logos/ict_summit_colored.png"
import Image from "next/image";

import Icon from "@components/Icon";
import { useAppContext } from "@store/AppContext";
import RandomText from "@features/main-screen/components/RandomText"


const RandomizerViewer = () => {
    const { isFullScreen, setIsFullScreen } = useAppContext();
 



    return (
        <div className="h-full w-full p-5">
            <Navigation />
      

            <div className=" h-[calc(100vh-5.8rem)] w-full flex flex-col items-center justify-center gap-5 overflow-y-auto py-2">
                {
                    isFullScreen ? (
                        <>
                            <div className="flex gap-5 items-center">
                                <Image src={VSTECSWhite} alt="VSTECS White Logo" className="w-full h-[4.5rem]" />
                                <div className="h-[6rem] w-[3px] bg-white"></div>
                                <Image src={ICTSummit} alt="ICT Summit Logo" className="w-full h-[4.6rem]" />
                            </div>

                            <div className="flex flex-col items-center">
                                <h1 className="relative text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
                                    <span className="absolute -left-1 -top-1 select-none text-yellow-500/10">FUTURE-PROOFING</span>
                                    <span className="relative bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text">
                                        FUTURE-PROOFING
                                    </span>
                                </h1>

                                <div className="mt-4 ">
                                    <h2 className="text-4xl font-bold text-white sm:text-5xl">YOUR INFRASTRUCTURE</h2>
                                    <div className="relative mt-4">
                                        <p className="text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-3xl font-medium text-transparent sm:text-4xl">
                                            FOR AN AI-DRIVEN WORLD
                                        </p>
                                    </div>
                                </div>


                                <div className="flex gap-5 mt-7">
                                    <div className="flex items-center">
                                        <Icon name="CalendarDays" className="text-cyan-400 h-7 w-7" />
                                        <p className="text-white text-xl font-bold ml-3">
                                            May 06, 2025
                                        </p>
                                    </div>

                                    <div className="flex items-center">
                                        <Icon name="MapPin" className="text-cyan-400 h-7 w-7" />
                                        <p className="text-white text-xl font-bold ml-3">
                                            Shangri-La at the Fort
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <RandomText />
                        </>
                    ) : (<p className="text-white text-center">Maximize the screen by clicking <span className="underline cursor-pointer" onClick={() => setIsFullScreen(true)}>here</span> or the button on top right corner</p>)
                }
            </div>
        </div>
    );
}

export default RandomizerViewer;