import { motion } from "framer-motion";
import GradientText from "./GradientText";
import Icon from "@components/Icon";
import VSTECSWhite from "@assets/logos/vstecs_white.png"
import CXO2025 from "@assets/logos/cxo-white.png"
import Image from "next/image";


const CXO2025Viewer = () => {
    return (
        <div className="max-w-7xl mx-auto">

            <div className="flex gap-5 items-center  justify-center mb-5">
                <Image src={VSTECSWhite} alt="VSTECS White Logo" className="w-[13rem] h-[4.5rem]" />
                <div className="h-[6rem] w-[3px] bg-white"></div>
                <Image src={CXO2025} alt="ICT Summit Logo" className="w-[16rem] h-[4rem]" />
            </div>


            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className=" flex flex-col items-center justify-center  px-6 lg:px-12 lg:text-base text-sm mb-7"
            >
                <div className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white  relative pointer-events-none  text-center mb-5 inline-flex flex-col gap-5 z-20">
                    <span className="relative text-3xl lg:text-4xl xl:text-5xl">
                        Navigating the Next Frontier of
                        <motion.div
                            className="absolute -inset-1 blur-xl"
                            style={{
                                background: "linear-gradient(90deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
                            }}
                            animate={{
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: 0,
                                ease: "easeInOut",
                            }}
                        />
                    </span>


                    <div>
                        <span className="relative inline-block mr-3">
                            <GradientText
                                className="tracking-tight font-bold"
                                colors={["#a3fefe", "#00d1d1", "#33e0e0"]}>
                                DIGITAL
                            </GradientText>
                            <motion.div
                                className="absolute -inset-2 blur-2xl"
                                style={{
                                    background: "linear-gradient(90deg, rgba(6, 182, 212, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)",
                                }}
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: 0,
                                    ease: "easeInOut",
                                }}
                            />
                        </span>

                        <span className="relative inline-block">
                            <GradientText
                                className="tracking-tight font-bold"
                                colors={["#f97316", "#ef4444", "#ec4899"]}>
                                TRANSFORMATION
                            </GradientText>

                            <motion.div
                                className="absolute -inset-2 blur-2xl"
                                style={{
                                    background: "linear-gradient(90deg, rgba(249, 115, 22, 0.3) 0%, rgba(239, 68, 68, 0.3) 100%)",
                                }}
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    delay: 0.5,
                                    repeat: 0,
                                    ease: "easeInOut",
                                }}
                            />
                        </span>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="inline-flex items-center px-4 py-2  bg-white/10 backdrop-blur-sm border border-white/20 rounded-full justify-center mx-auto">
                    <div className="text-white flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Icon name="Calendar" className="w-5 h-5 shrink-0 text-cxo-orange" />
                            <p>October 14-17, 2025</p>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-2">
                            <Icon name="MapPin" className="w-5 h-5 shrink-0 text-cxo-orange" />
                            <p>Shangri-La Boracay</p>
                        </div>
                    </div>
                </motion.div>





            </motion.div>


        </div>
    );
}

export default CXO2025Viewer;