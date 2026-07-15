interface LeaderboardProps {
    scores: number[];
}

function getMedal(position: number) {
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
                                scores,
                            }: LeaderboardProps) {
    const bestScore = scores.at(0);

    return (
        <section className="game__leaderboard">
            <div className="game__leaderboard-header">
                <div className="game__leaderboard-icon" aria-hidden="true">
                    🏆
                </div>

                <div>
          <span className="game__section-kicker">
            Salón de la fama
          </span>

                    <h2>Mejores puntajes</h2>
                </div>
            </div>

            {bestScore !== undefined && (
                <div className="game__record">
                    <span>Récord actual</span>
                    <strong>{bestScore}</strong>
                    <small>puntos</small>
                </div>
            )}

            {scores.length === 0 ? (
                <div className="game__leaderboard-empty">
                    <span aria-hidden="true">👑</span>

                    <p>Todavía no hay campeones.</p>

                    <small>
                        Terminá una partida para registrar tu primer puntaje.
                    </small>
                </div>
            ) : (
                <ol className="game__leaderboard-list">
                    {scores.map((score, index) => (
                        <li
                            className={`game__leaderboard-item ${
                                index < 3
                                    ? `game__leaderboard-item--top-${index + 1}`
                                    : ''
                            }`}
                            key={`${score}-${index}`}
                        >
              <span className="game__leaderboard-position">
                {getMedal(index)}
              </span>

                            <div className="game__leaderboard-player">
                <span>
                  {index === 0
                      ? 'Campeón'
                      : `Posicion ${index + 1}`}
                </span>

                                <small>
                                    {index === 0
                                        ? 'Mejor marca local'
                                        : 'Puntaje guardado'}
                                </small>
                            </div>

                            <strong>{score}</strong>
                        </li>
                    ))}
                </ol>
            )}
        </section>
    );
}