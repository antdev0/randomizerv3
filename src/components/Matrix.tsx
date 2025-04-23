"use client";
import { useEffect, useRef } from "react";

const Matrix = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;

        // Convert rem to pixels
        const getFontSize = () => {
            const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            return rootFontSize * 1; // 1rem = rootFontSize in px
        };

        let fontSize = getFontSize();
        let columns = Math.floor(window.innerWidth / fontSize);
        let drops = Array(columns).fill(0);

        // Resize canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            ctx.scale(dpr, dpr); // Prevents blurry/stretchy text

            fontSize = getFontSize();
            columns = Math.floor(window.innerWidth / fontSize);
            drops = Array(columns).fill(0);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const drawMatrix = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.03)"; // Slower fading effect
            ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

            ctx.fillStyle = "#ccc"; // Matrix color
            ctx.font = `${fontSize}px monospace`;

            drops.forEach((y, index) => {
                const text = Math.random() > 0.5 ? "0" : "1";
                const x = index * fontSize;
                ctx.fillText(text, x, y);

                if (y > canvas.height / dpr && Math.random() > 0.99) {
                    drops[index] = 0;
                } else {
                    drops[index] = y + fontSize;
                }
            });

            setTimeout(drawMatrix, 150); // Slow down the speed
        };

        drawMatrix();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "auto",
                zIndex: 0,
                pointerEvents: "none",
                opacity: 0.15,
            }}
        />
    );
};

export default Matrix;
