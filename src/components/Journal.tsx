import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { saveJournalEntry, getJournalEntries, getTodayKey } from '../utils/storage';

export const Journal: React.FC = () => {
    const [entry, setEntry] = useState(() => {
        const entries = getJournalEntries();
        const today = getTodayKey();
        const todayEntry = entries.find(e => e.date === today);
        return todayEntry ? todayEntry.content : '';
    });
    const [status, setStatus] = useState<'saved' | 'saving' | 'idle'>('idle');
    const [pointsEarned, setPointsEarned] = useState(0);

    const wordCount = entry.trim().split(/\s+/).filter(w => w.length > 0).length;

    // Auto-save effect
    useEffect(() => {
        const timer = setTimeout(() => {
            if (entry) {
                setStatus('saving');
                saveJournalEntry({
                    date: getTodayKey(),
                    content: entry,
                    wordCount,
                    pointsEarned: wordCount >= 50 ? 4 : 0,
                });

                // Show points notification if threshold just met
                if (wordCount >= 50 && pointsEarned === 0) {
                    setPointsEarned(4);
                    setTimeout(() => setPointsEarned(0), 3000);
                }

                setStatus('saved');
                setTimeout(() => setStatus('idle'), 2000);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [entry, wordCount]);

    const pastEntries = getJournalEntries().filter(e => e.date !== getTodayKey()).slice(0, 3);

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 p-8">
            <div className="max-w-4xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Daily Journal</h1>
                    <p className="text-slate-400">Reflect on your day. Earn 4 points for entries over 50 words.</p>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-slate-700">
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-400">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <span className={`text-sm font-mono ${wordCount >= 50 ? 'text-emerald-400' : 'text-slate-500'}`}>
                                {wordCount} words {wordCount >= 50 ? '✓' : `(${50 - wordCount} more needed)`}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 px-4 py-2 text-sm font-mono text-slate-400">
                            {status === 'saving' && <span>Saving...</span>}
                            {status === 'saved' && <span className="text-emerald-400">Saved</span>}
                        </div>
                    </div>

                    <textarea
                        value={entry}
                        onChange={(e) => setEntry(e.target.value)}
                        placeholder="What happened today? What are you grateful for? What did you learn?"
                        className="w-full h-[500px] bg-transparent p-6 text-slate-100 placeholder-slate-600 resize-none outline-none leading-relaxed"
                    />
                </div>

                {pointsEarned > 0 && (
                    <div className="mt-4 bg-gradient-to-r from-emerald-900/50 to-emerald-800/50 border border-emerald-500/50 rounded-lg p-4 flex items-center gap-3">
                        <Sparkles className="text-emerald-400" size={24} />
                        <div>
                            <p className="font-bold text-emerald-400">+{pointsEarned} Points Earned!</p>
                            <p className="text-sm text-slate-300">Your Psyche stat increased. Keep reflecting daily.</p>
                        </div>
                    </div>
                )}

                {pastEntries.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Recent Entries</h2>
                        <div className="space-y-3">
                            {pastEntries.map((entry, i) => (
                                <div key={i} className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors cursor-pointer">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-slate-400">{new Date(entry.date).toLocaleDateString()}</span>
                                        <span className="text-xs text-emerald-400 font-mono">+{entry.pointsEarned} pts</span>
                                    </div>
                                    <p className="text-slate-300 text-sm line-clamp-2">{entry.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
