import React, { useState } from 'react';


interface SystemPromptProps {
    onComplete: (weedSmoked: boolean, journal: string) => void;
    onClose: () => void;
}

export const SystemPrompt: React.FC<SystemPromptProps> = ({ onComplete, onClose }) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [weedSmoked, setWeedSmoked] = useState<boolean | null>(null);
    const [journal, setJournal] = useState('');

    const handleWeedAnswer = (didSmoke: boolean) => {
        setWeedSmoked(didSmoke);
        setStep(2);
    };

    const handleSubmit = () => {
        if (weedSmoked === null) return;
        onComplete(weedSmoked, journal);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-lg bg-slate-900 border-2 border-blue-500/50 rounded-lg p-6 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                <div className="text-center mb-6">
                    <h2 className="text-blue-400 tracking-widest uppercase font-bold text-sm mb-2">System Notification</h2>
                    <h1 className="text-3xl font-bold text-white uppercase font-sans">Daily Status Report</h1>
                </div>

                {step === 1 && (
                    <div className="space-y-6">
                        <p className="text-xl text-center text-slate-200">Did you succumb to the smoke today?</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleWeedAnswer(false)}
                                className="p-4 bg-emerald-500/10 border border-emerald-500/50 hover:bg-emerald-500/20 text-emerald-400 font-bold rounded transition-all uppercase"
                            >
                                No (Resisted)
                            </button>
                            <button
                                onClick={() => handleWeedAnswer(true)}
                                className="p-4 bg-red-500/10 border border-red-500/50 hover:bg-red-500/20 text-red-400 font-bold rounded transition-all uppercase"
                            >
                                Yes (Relapsed)
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        <p className="text-xl text-center text-slate-200">Journal your day.</p>
                        <p className="text-sm text-center text-slate-400">Reflection is key to leveling up.</p>
                        <textarea
                            className="w-full h-32 bg-slate-950 border border-slate-700 rounded p-4 text-white resize-none focus:border-blue-500 outline-none font-mono"
                            placeholder="Write here..."
                            value={journal}
                            onChange={(e) => setJournal(e.target.value)}
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={!journal.trim()}
                            className="w-full btn bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] uppercase tracking-wide disabled:opacity-50"
                        >
                            Complete Report
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
