import { useRef } from "react";

export const useSound = () => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<AudioBufferSourceNode | null>(null);
    const bufferRef = useRef<AudioBuffer | null>(null);
    const splashRef = useRef<HTMLAudioElement | null>(null);

    const loadAudio = async () => {
        // If AudioContext is not created yet, create it
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
        }

        // If the buffer is already cached, return early
        if (bufferRef.current) {
            return;
        }

        // Fetch the audio file if not cached yet
        try {
            const response = await fetch("/soundfx/drumroll.wav");
            const arrayBuffer = await response.arrayBuffer();
            bufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
        } catch (err) {
            console.error("Error loading audio:", err);
        }
    };

    const start = async () => {
        await loadAudio();
        if (!audioContextRef.current || !bufferRef.current) return;

        // Stop existing drumroll if playing
        sourceRef.current?.stop();
        sourceRef.current = null;

        const source = audioContextRef.current.createBufferSource();
        source.buffer = bufferRef.current;
        source.loop = true;
        source.loopStart = 0.2;
        source.loopEnd = 0.4;

        source.connect(audioContextRef.current.destination);
        source.start(0, 0.2); // start at 0.2s

        sourceRef.current = source;
    };

    const stop = () => {
        // Stop drumroll
        sourceRef.current?.stop();
        sourceRef.current = null;

        // Play winner splash
        if (!splashRef.current) {
            splashRef.current = new Audio("/soundfx/splash.wav");
        }

        splashRef.current.currentTime = 0;
        splashRef.current.play().catch((err) => {
            console.error("Winner sound play error:", err);
        });
    };

    return { start, stop };
};
