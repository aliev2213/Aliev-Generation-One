import React from 'react';
import { Heart, Zap } from 'lucide-react';

interface CharacterCardProps {
    name: string;
    classType: string;
    level: number;
    hp: number;
    energy: number;
    mood: string;
    onVitalsChange: (type: 'hp' | 'energy' | 'mood', value: number | string) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ name, classType, level, hp, energy, mood, onVitalsChange }) => {
    return (
        <div className="relative w-full h-full min-h-[600px] rounded-xl overflow-hidden border border-blue-500/30 bg-slate-950 shadow-[0_0_20px_rgba(30,58,138,0.3)]">

            {/* Background Image / Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop"
                    alt="Character"
                    className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
            </div>

            {/* Content Content - Z-Indexed */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 space-y-6">

                {/* Header: Name & Class */}
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-widest font-system drop-shadow-lg">{name}</h2>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-blue-600/20 border border-blue-500/50 text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                            {classType}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">LVL.{level}</span>
                    </div>
                </div>

                {/* Vitals HUD */}
                <div className="space-y-4">

                    {/* HP BAR */}
                    <div className="group">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-red-400 mb-1 tracking-wider">
                            <span className="flex items-center gap-1"><Heart size={10} className="fill-red-500" /> Health</span>
                            <span>{hp}/100</span>
                        </div>
                        <div className="h-4 w-full bg-slate-900/80 rounded border border-slate-700 relative overflow-hidden">
                            {/* Input Overlay for Interaction */}
                            <input
                                type="range"
                                min="0" max="100"
                                value={hp}
                                onChange={(e) => onVitalsChange('hp', parseInt(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                            />
                            {/* Visual Bar */}
                            <div
                                className="h-full bg-gradient-to-r from-red-900 to-red-500 shadow-[0_0_10px_#ef4444] transition-all duration-300"
                                style={{ width: `${hp}%` }}
                            />
                        </div>
                    </div>

                    {/* ENERGY BAR */}
                    <div className="group">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-yellow-400 mb-1 tracking-wider">
                            <span className="flex items-center gap-1"><Zap size={10} className="fill-yellow-500" /> Energy</span>
                            <span>{energy}/100</span>
                        </div>
                        <div className="h-4 w-full bg-slate-900/80 rounded border border-slate-700 relative overflow-hidden">
                            <input
                                type="range"
                                min="0" max="100"
                                value={energy}
                                onChange={(e) => onVitalsChange('energy', parseInt(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                            />
                            <div
                                className="h-full bg-gradient-to-r from-yellow-900 to-yellow-500 shadow-[0_0_10px_#eab308] transition-all duration-300"
                                style={{ width: `${energy}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Status Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] animate-pulse" />
                            <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75" />
                        </div>
                        <span className="text-emerald-400 font-bold text-sm tracking-widest uppercase">System Online</span>
                    </div>

                    {/* Mood Selector (Mini) */}
                    <div className="flex gap-1">
                        {['💀', '😫', '😐', '🙂', '🔥'].map((m) => (
                            <button
                                key={m}
                                onClick={() => onVitalsChange('mood', m)}
                                className={`w-8 h-8 flex items-center justify-center rounded border transition-all ${mood === m
                                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_10px_#a855f7]'
                                    : 'bg-slate-900/50 border-slate-800 text-slate-600 hover:border-slate-600'
                                    }`}
                            >
                                <span className={mood === m ? '' : 'grayscale opacity-50'}>{m}</span>
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-blue-500/30 rounded-tl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-blue-500/30 rounded-br-xl pointer-events-none" />
        </div>
    );
};
