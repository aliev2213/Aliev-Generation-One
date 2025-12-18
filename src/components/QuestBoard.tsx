
import React, { useState } from 'react';
import { Plus, Check, Trash2, Crosshair, ChevronRight } from 'lucide-react';
import type { Quest, Attribute } from '../types';

interface QuestBoardProps {
    quests: Quest[];
    onAddQuest: (title: string, stat: Attribute, xp: number) => void;
    onCompleteQuest: (id: string) => void;
    onDeleteQuest: (id: string) => void;
}

export const QuestBoard: React.FC<QuestBoardProps> = ({ quests, onAddQuest, onCompleteQuest, onDeleteQuest }) => {
    const [newQuestTitle, setNewQuestTitle] = useState('');
    const [selectedStat, setSelectedStat] = useState<Attribute>('Physical');
    const [tab, setTab] = useState<'active' | 'completed'>('active');

    const handleAdd = () => {
        if (!newQuestTitle.trim()) return;
        onAddQuest(newQuestTitle, selectedStat, 20);
        setNewQuestTitle('');
    };

    const activeQuests = quests.filter(q => !q.completed);
    const completedQuests = quests.filter(q => q.completed);
    const displayQuests = tab === 'active' ? activeQuests : completedQuests;

    return (
        <div className="h-full flex flex-col p-4 bg-slate-950/50">

            {/* Input Area (Command Line style) */}
            <div className="flex gap-2 mb-6 bg-slate-900/80 p-1 rounded border border-slate-800 focus-within:border-blue-500/50 transition-colors">
                <input
                    type="text"
                    value={newQuestTitle}
                    onChange={(e) => setNewQuestTitle(e.target.value)}
                    placeholder="INITIATE NEW QUEST PROTOCOL..."
                    className="flex-1 bg-transparent px-3 py-2 text-blue-100 placeholder-slate-600/50 outline-none text-sm font-mono"
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
                <select
                    value={selectedStat}
                    onChange={(e) => setSelectedStat(e.target.value as Attribute)}
                    className="bg-slate-800 border-l border-slate-700 px-2 py-1 text-slate-300 text-xs outline-none font-mono uppercase"
                >
                    <option value="Physical">STR</option>
                    <option value="Psyche">PSY</option>
                    <option value="Intellect">INT</option>
                    <option value="Spiritual">SPI</option>
                    <option value="Core">COR</option>
                </select>
                <button
                    onClick={handleAdd}
                    className="bg-blue-600/20 hover:bg-blue-500/40 text-blue-400 px-3 py-1 transition-colors border-l border-slate-700"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-4 border-b border-slate-800">
                <button
                    onClick={() => setTab('active')}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all relative ${tab === 'active' ? 'text-blue-400' : 'text-slate-600 hover:text-slate-400'
                        }`}
                >
                    Active Missions
                    {tab === 'active' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_10px_#3b82f6]" />}
                </button>
                <button
                    onClick={() => setTab('completed')}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all relative ${tab === 'completed' ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'
                        }`}
                >
                    Completed Log
                    {tab === 'completed' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500 shadow-[0_0_10px_#10b981]" />}
                </button>
            </div>

            {/* Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {displayQuests.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-700 text-xs font-mono uppercase tracking-widest opacity-50">
                        <Crosshair size={32} className="mb-2 opacity-50" />
                        No Missions Detected
                    </div>
                )}

                {displayQuests.map(quest => (
                    <div
                        key={quest.id}
                        className="group relative bg-slate-900/40 border border-slate-800 hover:border-blue-500/30 p-3 flex items-center justify-between transition-all hover:bg-slate-900/60 overflow-hidden"
                    >
                        {/* Decorative Left Border */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatColor(quest.stat, true)} opacity-50`} />

                        <div className="flex items-center gap-3 relative z-10 pl-2">
                            <button
                                onClick={() => tab === 'active' && onCompleteQuest(quest.id)}
                                disabled={tab === 'completed'}
                                className={`w-5 h-5 flex items-center justify-center border transition-all ${tab === 'completed'
                                        ? 'border-emerald-500/50 text-emerald-500'
                                        : 'border-slate-600 hover:border-blue-400 text-transparent hover:text-blue-400'
                                    }`}
                            >
                                <Check size={12} />
                            </button>

                            <div>
                                <h4 className={`font-mono text-sm ${tab === 'completed' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                                    {quest.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 ${getStatColor(quest.stat)}`}>
                                        {quest.stat}
                                    </span>
                                    <span className="text-[9px] text-slate-500 font-mono">
                                        XP REWARD: {quest.xpReward}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Hover Actions */}
                        <div className="relative z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {tab === 'active' && <button onClick={() => onDeleteQuest(quest.id)} className="text-slate-600 hover:text-red-400 p-1"><Trash2 size={14} /></button>}

                            {/* Tech deco */}
                            <ChevronRight size={14} className="text-slate-700" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper for colors
const getStatColor = (stat: Attribute, isBorder = false) => {
    if (isBorder) {
        switch (stat) {
            case 'Physical': return 'bg-red-500';
            case 'Psyche': return 'bg-purple-500';
            case 'Intellect': return 'bg-blue-500';
            case 'Spiritual': return 'bg-indigo-500';
            case 'Core': return 'bg-emerald-500';
            default: return 'bg-slate-500';
        }
    }
    switch (stat) {
        case 'Physical': return 'text-red-400';
        case 'Psyche': return 'text-purple-400';
        case 'Intellect': return 'text-blue-400';
        case 'Spiritual': return 'text-indigo-400';
        case 'Core': return 'text-emerald-400';
        default: return 'text-slate-400';
    }
}
