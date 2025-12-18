import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

let toastIdCounter = 0;
const toastListeners: Set<(toasts: Toast[]) => void> = new Set();
let toastsState: Toast[] = [];

export function showToast(message: string, type: ToastType = 'info') {
    const toast: Toast = {
        id: `toast-${toastIdCounter++}`,
        message,
        type,
    };

    toastsState = [...toastsState, toast];
    toastListeners.forEach(listener => listener(toastsState));

    setTimeout(() => {
        toastsState = toastsState.filter(t => t.id !== toast.id);
        toastListeners.forEach(listener => listener(toastsState));
    }, 3000);
}

export const ToastContainer: React.FC = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        toastListeners.add(setToasts);
        return () => { toastListeners.delete(setToasts); };
    }, []);

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className="luxury-card px-6 py-4 min-w-[300px] slide-up"
                    style={{
                        borderLeftWidth: '4px',
                        borderLeftColor: toast.type === 'success' ? '#40826D' : toast.type === 'error' ? '#7f1d1d' : '#4169E1'
                    }}
                >
                    <div className="flex items-center gap-3">
                        {toast.type === 'success' && <CheckCircle className="text-veridian" size={20} />}
                        {toast.type === 'error' && <XCircle className="text-red-500" size={20} />}
                        {toast.type === 'info' && <Info className="text-royal-blue" size={20} />}
                        <p className="text-royal-blue" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                            {toast.message}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
