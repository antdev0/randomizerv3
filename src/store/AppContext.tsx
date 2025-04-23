"use client";


import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useAuthContext } from "@store/AuthContext";
import { ParticipantsService } from '@services/ParticipantsService';
import logger from '@lib/logger';

type AppContextType = {
    isFullScreen: boolean;
    setIsFullScreen: (isFullScreen: boolean) => void;


    selectedGame: string;
    setSelectedGame: (selectedGame: GameType) => void;

    activeParticipants: Participants;
    setActiveParticipants: (activeParticipants: Participants) => void;

    fetchParticipants: () => void;



};

type GameType = keyof ParticipantsData;

export type Participants = Array<Record<string, string | number>>;


interface ParticipantsData {
    major: Participants;
    minor: Participants;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthContext();
    const [gameLoading, setGameLoading] = useState(true);
    const [participantsData, setParticipantsData] = useState<ParticipantsData | null>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<GameType>("minor");

    const [activeParticipants, setActiveParticipants] = useState<Participants>([]);

    useEffect(() => {
        if (participantsData) {
            setActiveParticipants(participantsData[selectedGame]);
        }
    }, [participantsData, selectedGame]);

    const fetchParticipants = useCallback(async () => {
        if (user) {
            try {
                const participants = await ParticipantsService.fetchParticipants({ userId: user.id });
                setParticipantsData(participants.data);
            } catch (error) {
                logger.error(error)
                throw new Error("Failed to fetch participants");
            }
        }
    }, [user]);



    useEffect(() => {
        if (user) {
            try {
                setGameLoading(true);
                fetchParticipants();
            } catch (error) {
                logger.error(error);
            } finally {
                setGameLoading(false);
            }

        }
    }, [user, fetchParticipants]);

    if (gameLoading) return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>

    return (
        <AppContext.Provider value={{
            isFullScreen,
            setIsFullScreen,
            selectedGame,
            setSelectedGame,
            activeParticipants,
            setActiveParticipants,
            fetchParticipants
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};




export default AppContext;