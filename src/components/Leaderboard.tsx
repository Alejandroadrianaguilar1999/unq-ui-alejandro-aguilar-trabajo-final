interface LeaderboardProps {
    scores: number[];
}

export function Leaderboard({
                                scores,
                            }: LeaderboardProps) {
    return (
        <section className="game__leaderboard">
            <div className="game__leaderboard-heading">
                <span aria-hidden="true">🏅</span>

                <div>
          <span className="game__section-kicker">
            Récords locales
          </span>

                    <h2>Mejores puntajes</h2>
                </div>
            </div>

            {scores.length === 0 ? (
                <p className="game__leaderboard-empty">
                    Todavía no hay puntajes guardados.
                </p>
            ) : (
                <ol className="game__leaderboard-list">
                    {scores.map((score, index) => (
                        <li
                            className="game__leaderboard-item"
                            key={`${score}-${index}`}
                        >
              <span className="game__leaderboard-position">
                {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && `${index + 1}°`}
              </span>

                            <span>Puntaje</span>

                            <strong>{score}</strong>
                        </li>
                    ))}
                </ol>
            )}
        </section>
    );
}