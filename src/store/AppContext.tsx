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
import { GameType, ParticipantsData, PrizesData, ActiveParticipantsData, ActivePrizesData } from "@/types/game";


interface AppContextType {
    isFullScreen: boolean;
    setIsFullScreen: (val: boolean) => void;

    selectedGame: GameType;
    setSelectedGame: (val: GameType) => void;

    activeParticipants: ActiveParticipantsData[];
    setActiveParticipants: (val: ActiveParticipantsData[]) => void;

    activePrizes: ActivePrizesData[];
    setActivePrizes: (val: ActivePrizesData[]) => void;

    forCmsPrizes: ActivePrizesData[];
    setForCmsPrizes: (val: ActivePrizesData[]) => void;

    fetchParticipants: () => void;
    fetchPrizes: () => void;

    selectedPrize: ActivePrizesData | null;
    setSelectedPrize: (val: ActivePrizesData | null) => void;

    selectedWinner: ActiveParticipantsData | null;
    setSelectedWinner: (val: ActiveParticipantsData | null) => void;

    participantsData: ParticipantsData | null;
    setParticipantsData: (val: ParticipantsData) => void;

    prizesData: PrizesData | null;
    setPrizesData: (val: PrizesData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthContext();

    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<GameType>("minor");
    const [selectedPrize, setSelectedPrize] = useState<ActivePrizesData | null>(null);

    const [participantsData, setParticipantsData] = useState<ParticipantsData | null>(null);
    const [prizesData, setPrizesData] = useState<PrizesData | null>(null);

    const [activeParticipants, setActiveParticipants] = useState<ActiveParticipantsData[]>([]);
    const [activePrizes, setActivePrizes] = useState<ActivePrizesData[]>([]);
    const [forCmsPrizes, setForCmsPrizes] = useState<ActivePrizesData[]>([]);

    const [gameLoading, setGameLoading] = useState(true);

    const [selectedWinner, setSelectedWinner] = useState<ActiveParticipantsData | null>(null);

    const updateActiveData = useCallback(() => {
        if (participantsData) {
     
            setActiveParticipants(filterZeroEntriesParticipants(participantsData[selectedGame]));
        }
        if (prizesData) {
            setForCmsPrizes(prizesData[selectedGame]);
            setActivePrizes(filterZeroQuantityPrizes(prizesData[selectedGame]));
        }
    }, [participantsData, prizesData, selectedGame]);


    const filterZeroQuantityPrizes = (prizes: ActivePrizesData[]) => {
        return prizes.filter(prize => prize.quantity > 0);
    }

    const filterZeroEntriesParticipants = (participants: ActiveParticipantsData[]) => {
        return participants.filter(participant => participant.entries > 0);
    }



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
                selectedPrize, setSelectedPrize,
                selectedWinner, setSelectedWinner,
                participantsData, setParticipantsData,
                prizesData, setPrizesData,
                forCmsPrizes, setForCmsPrizes
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
