
import { useState } from 'react';
import * as XLSX from 'xlsx';

import toast from 'react-hot-toast';
import { useAppContext } from '@store/AppContext';

interface ParticipantPayload {
    name: string;
    company: string;
    entries: number;
    type: string;
}

export const useReadExcel = () => {
    const { selectedGame } = useAppContext();
    const [fileName, setFileName] = useState<string>("");

    const [participants, setParticipants] = useState<ParticipantPayload[]>([]);

    const handleReadExcel = (file: File) => {
        // Validate file type
        if (!file.name.endsWith('.xlsx')) {
            setFileName("")
            setParticipants([])
            toast.error("Invalid file type. Please upload a .xlsx file.")
            return;
        }

        setFileName(file.name);

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = function () {
            const buffer = reader.result as ArrayBuffer;
            const workbook = XLSX.read(buffer, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const json = XLSX.utils.sheet_to_json<Record<string, string | number>>(worksheet);

            const validKeys = ['name', 'company', 'entries'];

            for (let i = 0; i < json.length; i++) {
                const row = json[i];
                const rowKeys = Object.keys(row);

                for (const key of rowKeys) {
                    if (!validKeys.includes(key)) {
                        setFileName("")
                        setParticipants([])
                        toast.error("Invalid excel header.")
                        // console.error(`Invalid key "${key}" found in row ${i + 1}.`);
                        return;
                    }
                }
            }
            setParticipants(
                json.map((row: Record<string, string | number>) => ({
                    name: String(row.name),
                    company: String(row.company),
                    entries: Number(row.entries),
                    type: selectedGame,
                }))
            );

        };
    };





    return { handleReadExcel, participants, fileName };
}

export default useReadExcel;