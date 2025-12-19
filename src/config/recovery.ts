export const RECOVERY_MILESTONES: Record<number, string[]> = {
    0: [
        "The journey begins. Your dopamine receptors are down-regulated, expecting the chemical flood. The craving is a sign of healing starting.",
        "Day 0 is the foundation. You are deciding to break the cycle. The discomfort you feel is weakness leaving the body.",
        "Your brain is surprised by the lack of THC. This shock is necessary for the reset to begin. Stay strong."
    ],
    1: [
        "24 Hours: Anxiety and irritability peak as immediate THC levels drop. Your body is confused, but its natural balance is already verifying the absence.",
        "Day 1: Physical withdrawal is often the sharpest here. Hydrate and sweat. Your body is actively purging toxins.",
        "Day 1 Checkpoint: You've survived the first night. That is often the hardest hurdle. Momentum is building."
    ],
    2: [
        "48 Hours: Physiological Awakening. Your nerve endings begin to re-sensitize. Insomnia is common as your sleep architecture fights to reset.",
        "Day 2: Appetite receptors are resetting. Food might seem unappealing, but this is your metabolism finding its natural baseline.",
        "Day 2 Logic: The 'fog' is thickest now because your brain is trying to compensate for the missing chemical. This confusion is temporary."
    ],
    3: [
        "Day 3: The Chemical Shift. Most circulating THC is eliminated from the blood. The physical 'need' begins to fade; the psychological battle takes center stage.",
        "Day 3: Peak Irritability for many. Your amygdala (emotional center) is hyperactive without its dampener. Breathe through it.",
        "Day 3 Milestone: You are physically cleaner than you have been in a long time. The blood-barrier is clearing."
    ],
    4: [
        "Day 4: REM Rebound. Vivid, intense dreams return. Your brain is catching up on years of suppressed REM sleep and processing backlog emotions.",
        "Day 4: You might sweat at night. This is your skin detoxing. It's uncomfortable but a sign of rapid cleaning.",
        "Day 4 Reality: Emotions might feel sharper today. That numbness is gone. Welcome back to the real world."
    ],
    5: [
        "Day 5: Cilia Activation. If you smoked, lung cilia are waking up. You may cough more, which is good—it means your lungs are finally self-cleaning.",
        "Day 5: Mental clarity is flickering back. You might have moments of distinct sharpness amidst the fog.",
        "Day 5 Focus: The ritual is breaking. You are proving that you don't need the substance to survive the evening."
    ],
    7: [
        "1 Week: Physical Freedom. Most intense physical withdrawal symptoms subside. Sleep patterns begin to normalize. You've survived the hardest physical week.",
        "1 Week Milestone: You have done something most people can't—survive the first week. The THC metabolites are stored in fat, but your blood is clean.",
        "Day 7: Your wallet is fuller and your lungs are clearer. Use this energy to build a new habit."
    ],
    10: [
        "Day 10: Clarity Glimpses. The 'brain fog' starts to thin. Complex thoughts become slightly easier to hold. Blood flow to the hippocampus improves.",
        "Day 10: Energy levels are stabilizing. The lethargy of withdrawal is being replaced by natural stamina.",
        "Day 10: Vivid dreams continue as your subconscious processes years of backlog."
    ],
    14: [
        "2 Weeks: Dopamine Reset. Your brain's natural reward system (nucleus accumbens) begins to upregulate receptors. Natural joys start to feel real again.",
        "Day 14: You might catch yourself laughing at something small. That is natural dopamine. It's sweeter than the artificial kind.",
        "2 Weeks: The habit is weakening. The automatic thought to 'use' is becoming less loud."
    ],
    21: [
        "3 Weeks: Habit Breaking. Validating your new identity. The neural pathways associated with the 'ritual' of using are weakening from disuse.",
        "Day 21: They say it takes 21 days to form a habit. You have formed the habit of sobriety.",
        "3 Weeks Strategy: Watch out for 'The Pink Cloud'—feeling so good you think you can use 'just once'. Don't fall for it."
    ],
    30: [
        "1 Month: Baseline Restoration. Cannabinoid 1 (CB1) receptor density has returned to near-normal levels in most brain regions. You are technically reset.",
        "30 Days: You are a non-smoker. Psychologically, you have broken the monthly cycle. Your memory is statistically sharper.",
        "1 Month Power: Consider how much money you've saved and how many hours you've reclaimed."
    ],
    60: [
        "2 Months: Emotional Stability. Emotional regulation is stronger. You no longer need the substance to manage stress. You are free.",
        "60 Days: Your executive function (prefrontal cortex) is firing effectively. Planning for the future feels easier.",
        "2 Months: The 'old you' feels like a distant memory. Keep moving forward."
    ],
    90: [
        "3 Months: Full Integration. The 'new you' is just 'you'. Cognitive performance in memory and attention is statistically back to non-user baselines.",
        "90 Days: This is the gold standard for long-term recovery. Dopamine systems are fully repaired.",
        "3 Months: You have conquered the chemical. Now it is just a matter of life design."
    ],
};

export const FALLBACK_MILESTONES = [
    "Keep pushing. Every single day cleans your system and strengthens your mind. You are forging a new reality.",
    "Your brain is healing every second you say no.",
    "The urge is just a dying pathway in your brain screaming for survival. Starve it.",
    "Discipline is freedom. You are building an unshakeable will.",
    "Today is a victory. Don't let your guard down, but celebrate this strength."
];

export function getRecoveryInsight(streak: number, index: number = 0): string {
    let messages = FALLBACK_MILESTONES;

    // Direct hit
    if (RECOVERY_MILESTONES[streak]) {
        messages = RECOVERY_MILESTONES[streak];
    } else {
        // Find closest previous milestone
        const dayKeys = Object.keys(RECOVERY_MILESTONES).map(Number).sort((a, b) => b - a);
        for (const day of dayKeys) {
            if (streak >= day) {
                messages = RECOVERY_MILESTONES[day];
                break;
            }
        }
    }

    // Safety check if messages is empty (shouldn't happen)
    if (!messages || messages.length === 0) return FALLBACK_MILESTONES[0];

    // Cycle through messages based on index
    return messages[index % messages.length];
}
