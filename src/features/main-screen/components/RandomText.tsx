import { useState, useEffect, useMemo } from "react";
import Icon from "@components/Icon";
import { useRandomizer } from "@features/main-screen/hooks/useRandomizer";


const RandomText = () => {




    const { rotatingIndex, startRandimizing, randimizingStarted, stopRandimizing, gameWarning, disableStop } = useRandomizer();
    const baseLetters = useMemo(() => ["R", "A", "F", "F", "L", "E"], []);
    const [displayLetters, setDisplayLetters] = useState(baseLetters);

    useEffect(() => {
        if (randimizingStarted) {
            const interval = setInterval(() => {
                // Replace all letters with random characters A-Z
                const randomChars = baseLetters.map(() =>
                    String.fromCharCode(65 + Math.floor(Math.random() * 26))
                );
                setDisplayLetters(randomChars);
            }, 50);
            return () => clearInterval(interval);
        } else {
            // When stopped, reset to original "RAFFLE"
            setDisplayLetters(baseLetters);
        }
    }, [randimizingStarted, baseLetters]);


    return (
        <>

            <div className="flex gap-3 mt-3 text-white">
                {displayLetters.map((letter, index) => (
                    <div
                        key={index}
                        className="w-16 h-16 flex items-center justify-center text-3xl font-bold border rounded-lg border-white/50"
                    >
                        <span
                            className={`inline-block ${index === rotatingIndex ? "animate-spin-slow" : ""}`}
                        >
                            {letter}
                        </span>
                    </div>
                ))}
            </div>



            {gameWarning && <p className="text-red-500 ">{gameWarning}</p>}



            {
                randimizingStarted ? (
                    <button
                        disabled={disableStop}
                        onClick={stopRandimizing} className="bg-red-500 text-white px-7 py-3 rounded-lg font-bold inline-flex items-center gap-2 mt-4 disabled:cursor-not-allowed disabled:opacity-50">
                        <Icon name="Pause" />
                        Stop
                    </button>
                ) : (
                    <button onClick={startRandimizing} className="bg-cyan-500 text-white px-7 py-3 rounded-lg font-bold inline-flex items-center gap-2 mt-4">
                        <Icon name="Play" />
                        Start
                    </button>
                )
            }


        </>
    );
}

export default RandomText;