import React from 'react';
import { Heart, Zap, Smile } from 'lucide-react';

interface VitalsPanelProps {
    hp: number;
    energy: number;
    mood: string;
    onChange: (type: 'hp' | 'energy' | 'mood', value: number | string) => void;
}

export const VitalsPanel: React.FC<VitalsPanelProps> = ({ hp, energy, mood, onChange }) => {
    return (
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 backdrop-blur-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-700 pb-2 mb-4">Daily Vitals</h3>

            {/* HP Bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-bold uppercase">
                    <span className="flex items-center gap-1"><Heart size={12} className="text-red-500" /> HP</span>
                    <span>{hp}%</span>
                </div>
                <input
                    type="range"
                    min="0" max="100"
                    value={hp}
                    onChange={(e) => onChange('hp', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
            </div>

            {/* Energy Bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-bold uppercase">
                    <span className="flex items-center gap-1"><Zap size={12} className="text-yellow-500" /> Energy</span>
                    <span>{energy}%</span>
                </div>
                <input
                    type="range"
                    min="0" max="100"
                    value={energy}
                    onChange={(e) => onChange('energy', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
            </div>

            {/* Mood Selector */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-bold uppercase">
                    <span className="flex items-center gap-1"><Smile size={12} className="text-purple-500" /> Mood</span>
                    <span>{mood}</span>
                </div>
                <div className="flex justify-between gap-1">
                    {['💀', '😫', '😐', '🙂', '🔥'].map((m) => (
                        <button
                            key={m}
                            onClick={() => onChange('mood', m)}
                            className={`p-2 rounded hover:bg-slate-700 transition-colors ${mood === m ? 'bg-slate-700 ring-1 ring-blue-500' : 'bg-slate-800'}`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
