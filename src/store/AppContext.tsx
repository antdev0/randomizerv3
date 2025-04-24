"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from "react";
import { useAuthContext } from "@store/AuthContext";
import { ParticipantsService } from "@services/ParticipantsService";
import { PrizesService } from "@services/PrizesService";
import logger from "@lib/logger";

export type GameType = keyof ParticipantsData;
export type DataGroup = Array<Record<string, string | number>>;

interface ParticipantsData {
    major: DataGroup;
    minor: DataGroup;
}

interface AppContextType {
    isFullScreen: boolean;
    setIsFullScreen: (val: boolean) => void;

    selectedGame: GameType;
    setSelectedGame: (val: GameType) => void;

    activeParticipants: DataGroup;
    setActiveParticipants: (val: DataGroup) => void;

    activePrizes: DataGroup;
    setActivePrizes: (val: DataGroup) => void;

    fetchParticipants: () => void;
    fetchPrizes: () => void;

    selectedPrize: Record<string, string | number> | null;
    setSelectedPrize: (val: Record<string, string | number> | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthContext();

    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<GameType>("minor");
    const [selectedPrize, setSelectedPrize] = useState<Record<string, string | number> | null>(null);

    const [participantsData, setParticipantsData] = useState<ParticipantsData | null>(null);
    const [prizesData, setPrizesData] = useState<ParticipantsData | null>(null);

    const [activeParticipants, setActiveParticipants] = useState<DataGroup>([]);
    const [activePrizes, setActivePrizes] = useState<DataGroup>([]);

    const [gameLoading, setGameLoading] = useState(true);

    const updateActiveData = useCallback(() => {
        if (participantsData) {
            setActiveParticipants(participantsData[selectedGame]);
        }
        if (prizesData) {
            setActivePrizes(prizesData[selectedGame]);
        }
    }, [participantsData, prizesData, selectedGame]);

    useEffect(() => {
        updateActiveData();
    }, [updateActiveData]);

    const fetchParticipants = useCallback(async () => {
        if (!user) return;
        try {
            const { data } = await ParticipantsService.fetchParticipants({ userId: user.id });
            setParticipantsData(data);
        } catch (err) {
            logger.error(err);
            throw new Error("Failed to fetch participants");
        }
    }, [user]);

    const fetchPrizes = useCallback(async () => {
        if (!user) return;
        try {
            const { data } = await PrizesService.fetchPrizes({ userId: user.id });
            setPrizesData(data);
        } catch (err) {
            logger.error(err);
            throw new Error("Failed to fetch prizes");
        }
    }, [user]);

    useEffect(() => {
        const initData = async () => {
            if (!user) return;
            setGameLoading(true);
            await Promise.allSettled([fetchParticipants(), fetchPrizes()]);
            setGameLoading(false);
        };
        initData();
    }, [user, fetchParticipants, fetchPrizes]);

    if (gameLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <AppContext.Provider
            value={{
                isFullScreen,
                setIsFullScreen,
                selectedGame,
                setSelectedGame,
                activeParticipants,
                setActiveParticipants,
                fetchParticipants,
                activePrizes,
                setActivePrizes,
                fetchPrizes,
                selectedPrize, setSelectedPrize
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export default AppContext;
