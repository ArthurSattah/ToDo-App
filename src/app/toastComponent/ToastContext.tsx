"use client"

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import './toastStyle.css'

export type ToastType = "success" | "error" | "info";

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (message: string, type: ToastType = "info") => {
        const id = ++toastId;
        setToasts((prev) => [...prev, { id, message, type }]);

        // Remove after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    };
    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="toast-container">
                {toasts.map((toast) => {
                    return (
                        <div key={toast.id}
                            className={`toast ${toast.type}`}
                            onClick={() => setToasts((prev) => prev.filter((curToast) => curToast.id !== toast.id))}>
                            {toast.message}
                        </div>
                    );
                }
                )}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
