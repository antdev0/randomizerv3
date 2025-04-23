"use client";

import { createContext, useReducer, ReactNode, useContext } from "react";


interface ModalContextProps {
    activeModal: string | null;
    modalData?: unknown;
    openModal: (modalName: string, payload?: unknown) => void;
    closeModal: () => void;
}

interface ModalState {
    activeModal: string | null;
    modalData?: unknown;
}

interface ModalAction {
    type: "OPEN" | "CLOSE";
    modal?: string;
    payload?: unknown;
}



const ModalContext = createContext<ModalContextProps | undefined>(undefined);

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
    switch (action.type) {
        case "OPEN":
            return { activeModal: action.modal || null, modalData: action.payload || null };
        case "CLOSE":
            return { activeModal: null, modalData: null };
        default:
            return state;
    }
};

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [state, dispatch] = useReducer(modalReducer, { activeModal: null });

    const openModal = (modalName: string, payload: unknown = null) =>
        dispatch({ type: "OPEN", modal: modalName, payload });

    const closeModal = () => dispatch({ type: "CLOSE" });

    return (
        <ModalContext.Provider value={{ activeModal: state.activeModal, modalData: state.modalData, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};


export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider");
    }
    return context;
};





export default ModalContext;