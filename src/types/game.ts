export type GameType = "major" | "minor";
export type DataGroup = Array<Record<number, string | number>>;



export interface ParticipantsData {
    major: Array<ActiveParticipantsData>;
    minor: Array<ActiveParticipantsData>;
}

export interface PrizesData {
    major: Array<ActivePrizesData>;
    minor: Array<ActivePrizesData>;
}

export interface ActiveParticipantsData {
    company: string;
    entries: number;
    id: string;
    name: string;
    type: string;
}

export interface ActivePrizesData {
    id: string;
    image: string;
    name: string;
    quantity: number;
    type: string;
    user_id: string;
}