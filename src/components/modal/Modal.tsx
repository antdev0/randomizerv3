"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useModalContext } from "@store/ModalContext";
import React from "react";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    className?: string;
}

const Modal = ({ children, isOpen, className }: ModalProps) => {
    const { closeModal } = useModalContext();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-50 p-5 bg-black/50"
                    onClick={closeModal}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <motion.div
                        className={`w-full bg-white rounded-lg p-5 relative ${className}`}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
