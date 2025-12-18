export interface RankTier {
    name: string;
    minPoints: number;
    color: string;
    description: string;
}

export const RANK_TIERS: RankTier[] = [
    { name: 'Worthless Maggot', minPoints: -999999, color: '#7f1d1d', description: 'Rock bottom. You are failing at life.' },
    { name: 'Pathetic Loser', minPoints: 0, color: '#991b1b', description: 'Zero effort, zero results.' },
    { name: 'Struggling Worm', minPoints: 50, color: '#b91c1c', description: 'Barely trying, still pathetic.' },
    { name: 'Mediocre Drone', minPoints: 150, color: '#dc2626', description: 'Average is for losers.' },
    { name: 'Inconsistent Amateur', minPoints: 300, color: '#ea580c', description: 'Some effort, no discipline.' },
    { name: 'Developing Novice', minPoints: 500, color: '#f59e0b', description: 'Starting to show up.' },
    { name: 'Committed Apprentice', minPoints: 800, color: '#eab308', description: 'Building consistency.' },
    { name: 'Disciplined Student', minPoints: 1200, color: '#84cc16', description: 'Daily habits forming.' },
    { name: 'Rising Warrior', minPoints: 1700, color: '#22c55e', description: 'Momentum building.' },
    { name: 'Focused Champion', minPoints: 2300, color: '#10b981', description: 'Excellence becoming normal.' },
    { name: 'Elite Achiever', minPoints: 3000, color: '#06b6d4', description: 'Top 5% mindset.' },
    { name: 'Dominant Force', minPoints: 4000, color: '#3b82f6', description: 'Unstoppable consistency.' },
    { name: 'Legendary Master', minPoints: 5500, color: '#6366f1', description: 'Peak performance mode.' },
    { name: 'Ascended Titan', minPoints: 7500, color: '#8b5cf6', description: 'Beyond limits.' },
    { name: 'Immortal God', minPoints: 10000, color: '#a855f7', description: 'The 0.01%. Perfection personified.' },
];

export const MOTIVATIONAL_QUOTES = [
    { text: "It's not about how many times you can hit, it's about how many times you can get hit and keep moving forward.", author: "Rocky Balboa" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
    { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
    { text: "You are not your feelings. You are the observer of your feelings.", author: "Naval Ravikant" },
    { text: "Suffer the pain of discipline or suffer the pain of regret.", author: "Jim Rohn" },
    { text: "The race is long and in the end, it's only with yourself.", author: "Baz Luhrmann" },
    { text: "Every champion was once a contender who refused to give up.", author: "Rocky Balboa" },
    { text: "Your life does not get better by chance, it gets better by change.", author: "Jim Rohn" },
    { text: "The difference between who you are and who you want to be is what you do.", author: "Unknown" },
    { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
    { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
    { text: "Stop being a prisoner of your past. Become the architect of your future.", author: "Robin Sharma" },
    { text: "Either you run the day, or the day runs you.", author: "Jim Rohn" },
    { text: "Be so good they can't ignore you.", author: "Steve Martin" },
];

export function getRankFromPoints(totalPoints: number): RankTier {
    // Find the highest rank tier that the user has reached
    let currentRank = RANK_TIERS[0];

    for (const tier of RANK_TIERS) {
        if (totalPoints >= tier.minPoints) {
            currentRank = tier;
        } else {
            break;
        }
    }

    return currentRank;
}

export function getRandomQuote(): { text: string; author: string } {
    return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
}

export function getXPToNextRank(currentXP: number): { current: RankTier; next: RankTier | null; xpNeeded: number } {
    const currentRank = getRankFromPoints(currentXP);
    const currentIndex = RANK_TIERS.indexOf(currentRank);
    const nextRank = currentIndex < RANK_TIERS.length - 1 ? RANK_TIERS[currentIndex + 1] : null;
    const xpNeeded = nextRank ? nextRank.minPoints - currentXP : 0;

    return { current: currentRank, next: nextRank, xpNeeded };
}
