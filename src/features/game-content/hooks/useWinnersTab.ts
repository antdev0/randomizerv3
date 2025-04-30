import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "@/store/AuthContext";
import { WinnerService } from "@services/WinnerService";
import { WinnersData, ActiveWinnersData } from "@/types/game";

import * as XLSX from 'xlsx';
export type GroupedWinner = {

    [prizeId: string]: {
        prize: {
            id: string;
            name: string;
        };
        winners: ActiveWinnersData[];
    };
};

export const useWinnersTab = () => {

    const { user } = useAuthContext();


    const [fetchLoading, setFetchLoading] = useState(true);
    const [winnersData, setWinnersData] = useState<WinnersData | null>(null);

    const fetchWinners = useCallback(async () => {
        try {
            setFetchLoading(true);
            const res = await WinnerService.fetchWinners(user?.id as string);
            setWinnersData(res.data);
        } catch (error) {
            toast.error("Failed to fetch winners");
            console.error(error);

        } finally {
            setFetchLoading(false);
        }
    }, [user]);


    useEffect(() => {
        if (!user) return;
        fetchWinners();
    }, [fetchWinners, user]);

 

    const groupedWinnersMinor: GroupedWinner = (winnersData?.minor || []).reduce((acc, winner) => {
        const prizeId = winner.prize_list_id;
        if (!acc[prizeId]) {
            acc[prizeId] = {
                prize: winner.prize_list,
                winners: [],
            };
        }
        acc[prizeId].winners.push(winner);
        return acc;
    }, {} as GroupedWinner);


    const exportWinners = (
        winners: Array<{ name: string; company: string; prize_list?: { name: string } }>,
        filename: string
    ) => {
        if (!winners || winners.length === 0) return;

        // Transforming winners to include relevant columns
        const transformed = winners.map((winner) => ({
            Name: winner.name,
            Company: winner.company,
            "Prize Name": winner.prize_list?.name || "N/A",
        }));

        // Creating a worksheet from the transformed data
        const worksheet = XLSX.utils.json_to_sheet(transformed);

        // Creating a workbook from the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Winners");

        // Writing the workbook directly to Excel format
        XLSX.writeFile(workbook, filename); // Direct export to file
    };

    const exportToXlsx = () => {
        if (winnersData) {
            exportWinners(winnersData.major, `${user?.username}-major-winners.xlsx`);
            exportWinners(winnersData.minor, `${user?.username}-minor-winners.xlsx`);
        }
    };

    const groupedWinnersMajor: GroupedWinner = (winnersData?.major || []).reduce((acc, winner) => {
        const prizeId = winner.prize_list_id;
        if (!acc[prizeId]) {
            acc[prizeId] = {
                prize: winner.prize_list,
                winners: [],
            };
        }
        acc[prizeId].winners.push(winner);
        return acc;
    }, {} as GroupedWinner);


    return {exportToXlsx, fetchLoading, groupedWinnersMajor, groupedWinnersMinor};
}

export default useWinnersTab