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
    // Stoicism & Discipline
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
    { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
    { text: "No man is free who is not master of himself.", author: "Epictetus" },
    { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
    { text: "The best revenge is not to be like your enemy.", author: "Marcus Aurelius" },
    { text: "Dignity grows with the ability to say no to oneself.", author: "Ajahn Brahm" },
    { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },

    // Modern Grit & Focus
    { text: "I don't stop when I'm tired. I stop when I'm done.", author: "David Goggins" },
    { text: "The only easy day was yesterday.", author: "Navy SEALs" },
    { text: "Your level of success will rarely exceed your level of personal development.", author: "Jim Rohn" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
    { text: "If you want to fly, you have to give up the things that weigh you down.", author: "Toni Morrison" },
    { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
    { text: "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'", author: "Muhammad Ali" },
    { text: "Focus is about saying no.", author: "Steve Jobs" },

    // Psychology & Mindset
    { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
    { text: "The mind is everything. What you think you become.", author: "Buddha" },
    { text: "Change your thoughts and you change your world.", author: "Norman Vincent Peale" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
    { text: "Knowing is not enough; we must apply. Willing is not enough; we must do.", author: "Bruce Lee" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "Success is stumbling from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { text: "The temptation to quit will be greatest just before you are about to succeed.", author: "Chinese Proverb" },
    { text: "A river cuts through rock not because of its power but because of its persistence.", author: "Jim Watkins" },
    { text: "The standard you walk past is the standard you accept.", author: "David Morrison" },
    { text: "At the end of the day, we can endure much more than we think we can.", author: "Frida Kahlo" },
    { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { text: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong" },
    { text: "Don't wish it were easier. Wish you were better.", author: "Jim Rohn" },
    { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
    { text: "Masters of their own fate are not those who control the world, but those who control themselves.", author: "Unknown" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Don't wait. The time will never be just right.", author: "Napoleon Hill" },
    { text: "Great things are not done by impulse, but by a series of small things brought together.", author: "Vincent Van Gogh" },
    { text: "Show up, do the work, and go home.", author: "Austin Kleon" },
    { text: "Amateurs sit and wait for inspiration, the rest of us just get up and go to work.", author: "Stephen King" }
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
