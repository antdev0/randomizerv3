"use client";
import { useState, useMemo } from "react";

//ict summit 2025
import Ict2025Bg from "@assets/bg/ict_bg.png";
import Matrix from "@components/Matrix";

//cxo 2025
import CxoBackground from "@/components/themes/cxo-2025/CxoBackground"
import MainLayout from "@components/MainLayout";




export default function Randomizer() {
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

    const currentEvent = process.env.NEXT_PUBLIC_CURRENT_EVENT as string;

    const renderTheme = useMemo(() => {
        switch (currentEvent) {
            case "ict-summit-2025":
                setBackgroundImage(Ict2025Bg.src);
                return <Matrix />
            case "cxo-2025":
                setBackgroundImage(null);
                return <CxoBackground />
            default:
                return <div>No theme found</div>
        }
    }, [currentEvent]);

    return (
        <MainLayout bg={backgroundImage}>
            {renderTheme}
        </MainLayout>

    );
}
