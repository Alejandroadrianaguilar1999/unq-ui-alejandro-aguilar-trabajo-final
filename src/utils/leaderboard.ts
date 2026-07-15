const LEADERBOARD_KEY = 'word-chain-leaderboard';
const MAX_SCORES = 10;

export interface LeaderboardEntry {
    name: string;
    score: number;
}

export function getLeaderboard(): LeaderboardEntry[] {
    const storedLeaderboard = localStorage.getItem(LEADERBOARD_KEY);

    if (!storedLeaderboard) {
        return [];
    }

    try {
        const parsedLeaderboard: unknown =
            JSON.parse(storedLeaderboard);

        if (!Array.isArray(parsedLeaderboard)) {
            return [];
        }

        return parsedLeaderboard
            .map((entry): LeaderboardEntry | null => {
                /*
                 * Permite recuperar puntajes guardados con la versión anterior,
                 * cuando el leaderboard almacenaba solamente números.
                 */
                if (
                    typeof entry === 'number' &&
                    Number.isFinite(entry)
                ) {
                    return {
                        name: 'Jugador',
                        score: entry,
                    };
                }

                if (
                    typeof entry === 'object' &&
                    entry !== null &&
                    'name' in entry &&
                    'score' in entry &&
                    typeof entry.name === 'string' &&
                    typeof entry.score === 'number' &&
                    Number.isFinite(entry.score)
                ) {
                    return {
                        name: entry.name,
                        score: entry.score,
                    };
                }

                return null;
            })
            .filter(
                (entry): entry is LeaderboardEntry =>
                    entry !== null,
            );
    } catch {
        return [];
    }
}

export function saveScore(
    name: string,
    score: number,
): LeaderboardEntry[] {
    const currentLeaderboard = getLeaderboard();

    const newEntry: LeaderboardEntry = {
        name: name.trim(),
        score,
    };

    const updatedLeaderboard = [
        ...currentLeaderboard,
        newEntry,
    ]
        .sort(
            (firstEntry, secondEntry) =>
                secondEntry.score - firstEntry.score,
        )
        .slice(0, MAX_SCORES);

    localStorage.setItem(
        LEADERBOARD_KEY,
        JSON.stringify(updatedLeaderboard),
    );

    return updatedLeaderboard;
}