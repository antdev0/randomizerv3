import { motion } from "framer-motion";
import { memo } from "react"

const AnimatedGlowElement = () => {
    // Static styles defined outside JSX for better performance
    const gradient1 =
        "conic-gradient(from 0deg, rgba(249, 115, 22, 0.2) 0%, transparent 50%, rgba(6, 182, 212, 0.2) 100%)";
    const gradient2 =
        "conic-gradient(from 180deg, rgba(59, 130, 246, 0.2) 0%, transparent 50%, rgba(139, 92, 246, 0.2) 100%)";

    return (
        <>
            <motion.div
                className="absolute top-1/4 right-0 w-96 h-96"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 20,
                    ease: "linear",
                    repeat: 0, // play once
                }}
            >
                <div
                    className="w-full h-full rounded-full blur-2xl"
                    style={{ background: gradient1 }}
                />
            </motion.div>

            <motion.div
                className="absolute bottom-1/4 left-0 w-80 h-80"
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0],
                }}
                transition={{
                    duration: 15,
                    ease: "linear",
                    repeat: 0, // play once
                }}
            >
                <div
                    className="w-full h-full rounded-full blur-2xl"
                    style={{ background: gradient2 }}
                />
            </motion.div>
        </>
    );
};

export default memo(AnimatedGlowElement);
