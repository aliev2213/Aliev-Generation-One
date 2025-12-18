import React from 'react';
import { LayoutDashboard, ClipboardList, BookOpen } from 'lucide-react';

interface NavigationProps {
    currentPage: 'dashboard' | 'daily-log' | 'journal';
    onNavigate: (page: 'dashboard' | 'daily-log' | 'journal') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
    const navItems = [
        { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'daily-log' as const, label: 'Daily Log', icon: ClipboardList },
        { id: 'journal' as const, label: 'Journal', icon: BookOpen },
    ];

    return (
        <nav className="bg-slate-900 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <h1
                        className="text-2xl font-bold italic tracking-wide"
                        style={{
                            fontFamily: "'Times New Roman', Times, serif",
                            color: '#4169E1',
                            textShadow: '0 0 10px rgba(65, 105, 225, 0.8), 0 0 20px rgba(65, 105, 225, 0.5)',
                            letterSpacing: '0.05em'
                        }}
                    >
                        Aliev: Generation One
                    </h1>

                    <div className="flex gap-2">
                        {navItems.map(item => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};
