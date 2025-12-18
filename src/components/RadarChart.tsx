
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import type { UserStats } from '../types';

interface StatsChartProps {
    stats: UserStats['stats'];
}

export const StatsChart: React.FC<StatsChartProps> = ({ stats }) => {
    const data = [
        { subject: 'STR', A: stats.physical.value, fullMark: 100 },
        { subject: 'INT', A: stats.intellect.value, fullMark: 100 },
        { subject: 'COR', A: stats.core.value, fullMark: 100 },
        { subject: 'PSY', A: stats.psyche.value, fullMark: 100 },
        { subject: 'SPI', A: stats.spiritual.value, fullMark: 100 },
    ];

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Background Grid Decorative */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] pointer-events-none" />

            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="rgba(59, 130, 246, 0.2)" strokeDasharray="3 3" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold', fontFamily: 'Rajdhani' }}
                    />
                    <Radar
                        name="Player"
                        dataKey="A"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="#3b82f6"
                        fillOpacity={0.3}
                        isAnimationActive={true}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};
