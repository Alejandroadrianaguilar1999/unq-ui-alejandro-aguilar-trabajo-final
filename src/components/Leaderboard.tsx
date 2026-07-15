import type {
    LeaderboardEntry,
} from '../utils/leaderboard';

interface LeaderboardProps {
    entries: LeaderboardEntry[];
}

function getMedal(position: number): string {
    if (position === 0) {
        return '🥇';
    }

    if (position === 1) {
        return '🥈';
    }

    if (position === 2) {
        return '🥉';
    }

    return `${position + 1}°`;
}

export function Leaderboard({
                                entries,
                            }: LeaderboardProps) {
    const bestEntry = entries.at(0);

    return (
        <section className="game__leaderboard">
            <div className="game__leaderboard-header">
                <div
                    className="game__leaderboard-icon"
                    aria-hidden="true"
                >
                    🏆
                </div>

                <div>
          <span className="game__section-kicker">
            Salón de la fama
          </span>

                    <h2>Mejores puntajes</h2>
                </div>
            </div>

            {bestEntry && (
                <div className="game__record">
                    <div>
                        <span>Récord actual</span>
                        <small>{bestEntry.name}</small>
                    </div>

                    <strong>{bestEntry.score}</strong>
                </div>
            )}

            {entries.length === 0 ? (
                <div className="game__leaderboard-empty">
                    <span aria-hidden="true">👑</span>

                    <p>Todavía no hay campeones.</p>

                    <small>
                        Terminá una partida para registrar el primer puntaje.
                    </small>
                </div>
            ) : (
                <ol className="game__leaderboard-list">
                    {entries.map((entry, index) => (
                        <li
                            className={`game__leaderboard-item ${
                                index < 3
                                    ? `game__leaderboard-item--top-${index + 1}`
                                    : ''
                            }`}
                            key={`${entry.name}-${entry.score}-${index}`}
                        >
              <span className="game__leaderboard-position">
                {getMedal(index)}
              </span>

                            <div className="game__leaderboard-player">
                                <span>{entry.name}</span>

                                <small>
                                    {index === 0
                                        ? 'Mejor marca local'
                                        : 'Puntaje guardado'}
                                </small>
                            </div>

                            <strong>{entry.score}</strong>
                        </li>
                    ))}
                </ol>
            )}
        </section>
    );
}