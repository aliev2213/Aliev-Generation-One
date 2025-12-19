export const RECOVERY_MILESTONES: Record<number, string> = {
    0: "The journey begins. Your dopamine receptors are down-regulated, expecting the chemical flood. The craving is a sign of healing starting.",
    1: "24 Hours: Anxiety and irritability peak as immediate THC levels drop. Your body is confused, but its natural balance is already verifying the absence.",
    2: "48 Hours: Physiological Awakening. Your nerve endings begin to re-sensitize. Insomnia is common as your sleep architecture fights to reset.",
    3: "Day 3: The Chemical Shift. Most circulating THC is eliminated from the blood. The physical 'need' begins to fade; the psychological battle takes center stage.",
    4: "Day 4: REM Rebound. Vivid, intense dreams return. Your brain is catching up on years of suppressed REM sleep and processing backlog emotions.",
    5: "Day 5: Cilia Activation. If you smoked, lung cilia are waking up. You may cough more, which is good—it means your lungs are finally self-cleaning.",
    7: "1 Week: Physical Freedom. Most intense physical withdrawal symptoms subside. Sleep patterns begin to normalize. You've survived the hardest physical week.",
    10: "Day 10: Clarity Glimpses. The 'brain fog' starts to thin. Complex thoughts become slightly easier to hold. Blood flow to the hippocampus improves.",
    14: "2 Weeks: Dopamine Reset. Your brain's natural reward system (nucleus accumbens) begins to upregulate receptors. Natural joys start to feel real again.",
    21: "3 Weeks: Habit Breaking. Validating your new identity. The neural pathways associated with the 'ritual' of using are weakening from disuse.",
    30: "1 Month: Baseline Restoration. Cannabinoid 1 (CB1) receptor density has returned to near-normal levels in most brain regions. You are technically reset.",
    60: "2 Months: Emotional Stability. Emotional regulation is stronger. You no longer need the substance to manage stress. You are free.",
    90: "3 Months: Full Integration. The 'new you' is just 'you'. Cognitive performance in memory and attention is statistically back to non-user baselines.",
};

export const FALLBACK_MILESTONE = "Keep pushing. Every single day cleans your system and strengthens your mind. You are forging a new reality.";

export function getRecoveryInsight(streak: number): string {
    // Return specific milestone or the closest previous one
    if (RECOVERY_MILESTONES[streak]) return RECOVERY_MILESTONES[streak];

    // Find closest previous milestone
    const dayKeys = Object.keys(RECOVERY_MILESTONES).map(Number).sort((a, b) => b - a);
    for (const day of dayKeys) {
        if (streak >= day) return RECOVERY_MILESTONES[day];
    }

    return FALLBACK_MILESTONE;
}
