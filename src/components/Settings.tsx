import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import type { Habit } from '../context/GameContext';
import { Plus, Trash2, Save, Edit2 } from 'lucide-react';

export const Settings: React.FC = () => {
    const { habits, updateHabits } = useGame();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Habit | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const areas: Habit['area'][] = ['Physical', 'Psyche', 'Intellect', 'Spiritual', 'Core'];

    const handleEdit = (habit: Habit) => {
        setEditingId(habit.name); // Using name as ID for now
        setEditForm({ ...habit });
    };

    const handleDelete = (name: string) => {
        if (window.confirm(`Are you sure you want to remove "${name}" from your tracking?`)) {
            updateHabits(habits.filter(h => h.name !== name));
        }
    };

    const handleSave = () => {
        if (!editForm) return;

        if (editingId) {
            // Update existing
            updateHabits(habits.map(h => h.name === editingId ? editForm : h));
        } else {
            // Create new
            if (habits.some(h => h.name === editForm.name)) {
                alert('A habit with this name already exists!');
                return;
            }
            updateHabits([...habits, editForm]);
        }

        setEditingId(null);
        setEditForm(null);
        setIsAdding(false);
    };

    const startAdd = () => {
        setEditForm({
            id: crypto.randomUUID(),
            name: '',
            description: '',
            area: 'Physical',
            pointsPerUnit: 1,
            unit: 'count',
            type: 'number',
            maxPerDay: 0,
            points: 0
        });
        setIsAdding(true);
        setEditingId(null);
    };

    return (
        <div className="min-h-screen bg-luxury-black text-slate-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-royal-blue" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                            Configuration
                        </h1>
                        <p className="text-lavender">Customize your tracking metrics.</p>
                    </div>
                    <button
                        onClick={startAdd}
                        disabled={isAdding}
                        className="flex items-center gap-2 px-4 py-2 bg-royal-blue hover:bg-blue-700 rounded transition-colors"
                    >
                        <Plus size={18} />
                        Add Metric
                    </button>
                </div>

                {/* Edit/Add Form */}
                {(editingId || isAdding) && editForm && (
                    <div className="mb-8 p-6 bg-slate-800 rounded-lg border border-royal-blue/30 animation-fade-in">
                        <h3 className="text-xl font-bold mb-4 text-royal-blue">
                            {isAdding ? 'New Metric' : 'Edit Metric'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Name</label>
                                <input
                                    value={editForm.name}
                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 focus:border-royal-blue outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Area</label>
                                <select
                                    value={editForm.area}
                                    onChange={e => setEditForm({ ...editForm, area: e.target.value as Habit['area'] })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 focus:border-royal-blue outline-none"
                                >
                                    {areas.map(a => <option key={a} value={a}>{a}</option>)}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-slate-400 mb-1">Description</label>
                                <input
                                    value={editForm.description}
                                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 focus:border-royal-blue outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Points per Unit</label>
                                <input
                                    type="number"
                                    value={editForm.pointsPerUnit}
                                    onChange={e => setEditForm({ ...editForm, pointsPerUnit: parseInt(e.target.value) || 0 })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 focus:border-royal-blue outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Unit Label</label>
                                <input
                                    value={editForm.unit}
                                    onChange={e => setEditForm({ ...editForm, unit: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 focus:border-royal-blue outline-none"
                                    placeholder="e.g. mins, rep, count"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => { setEditingId(null); setIsAdding(false); setEditForm(null); }}
                                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded transition-colors"
                            >
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}

                {/* List */}
                <div className="grid gap-4">
                    {habits.map((habit) => (
                        <div
                            key={habit.name}
                            className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-slate-500 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-1 h-12 rounded-full bg-${habit.area === 'Physical' ? 'red-500' :
                                    habit.area === 'Psyche' ? 'purple-500' :
                                        habit.area === 'Intellect' ? 'blue-500' :
                                            habit.area === 'Spiritual' ? 'indigo-500' : 'emerald-500'
                                    }`} />
                                <div>
                                    <h3 className="font-bold text-lg">{habit.name}</h3>
                                    <div className="flex items-center gap-4 text-sm text-slate-400">
                                        <span>{habit.area}</span>
                                        <span>•</span>
                                        <span>{habit.pointsPerUnit} pts / {habit.unit}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">{habit.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(habit)}
                                    className="p-2 hover:bg-slate-700 rounded-full text-blue-400 transition-colors"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(habit.name)}
                                    className="p-2 hover:bg-slate-700 rounded-full text-red-400 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
