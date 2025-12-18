import React from 'react';

interface SystemHUDProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const SystemHUD: React.FC<SystemHUDProps> = ({ title, children, className = '' }) => {
    return (
        <div className={`relative bg-slate-950/80 border border-slate-800 rounded-lg overflow-hidden flex flex-col backdrop-blur-sm shadow-xl ${className}`}>
            {/* HUD Header */}
            <div className="h-10 bg-gradient-to-r from-slate-900 via-slate-900 to-transparent border-b border-slate-800 flex items-center px-4 justify-between relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rotate-45 shadow-[0_0_5px_#3b82f6]" />
                    <span className="font-system font-bold text-blue-400 tracking-widest text-sm uppercase glow-text-blue">
                        {title}
                    </span>
                </div>
                {/* Decorative lines */}
                <div className="flex gap-1">
                    <div className="w-8 h-[2px] bg-slate-800" />
                    <div className="w-2 h-[2px] bg-blue-500/50" />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 relative z-10 overflow-hidden">
                {children}
            </div>

            {/* Background Grid Mesh */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>
    );
};
