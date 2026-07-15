const LEADERBOARD_KEY = 'word-chain-leaderboard';
const MAX_SCORES = 10;

export function getLeaderboard(): number[] {
    const storedScores = localStorage.getItem(LEADERBOARD_KEY);

    if (!storedScores) {
        return [];
    }

    try {
        const parsedScores: unknown = JSON.parse(storedScores);

        if (!Array.isArray(parsedScores)) {
            return [];
        }

        return parsedScores.filter(
            (score): score is number =>
                typeof score === 'number' && Number.isFinite(score),
        );
    } catch {
        return [];
    }
}

export function saveScore(score: number): number[] {
    const currentScores = getLeaderboard();

    const updatedScores = [...currentScores, score]
        .sort((firstScore, secondScore) => secondScore - firstScore)
        .slice(0, MAX_SCORES);

    localStorage.setItem(
        LEADERBOARD_KEY,
        JSON.stringify(updatedScores),
    );

    return updatedScores;
}
