interface GameStatusProps {
    score: number;
    timeLeft: number;
    wordCount: number;
    averageLength: number;
}

export function GameStatus({
                               score,
                               timeLeft,
                               wordCount,
                               averageLength,
                           }: GameStatusProps) {
    const isTimeRunningOut = timeLeft <= 5;
    const timerPercentage = (timeLeft / 15) * 100;

    return (
        <section className="game__status">
            <article className="game__status-card">
        <span
            className="game__status-icon"
            aria-hidden="true"
        >
          ⭐
        </span>

                <div>
          <span className="game__status-label">
            Puntaje
          </span>

                    <strong>{score}</strong>
                </div>
            </article>

            <article
                className={`game__status-card ${
                    isTimeRunningOut
                        ? 'game__status-card--danger'
                        : ''
                }`}
            >
        <span
            className="game__status-icon"
            aria-hidden="true"
        >
          ⏱️
        </span>

                <div className="game__timer-content">
                    <div className="game__timer-heading">
            <span className="game__status-label">
              Tiempo
            </span>

                        <strong>{timeLeft}s</strong>
                    </div>

                    <div
                        className="game__timer"
                        role="progressbar"
                        aria-label="Tiempo restante"
                        aria-valuemin={0}
                        aria-valuemax={15}
                        aria-valuenow={timeLeft}
                    >
                        <div
                            className="game__timer-bar"
                            style={{
                                width: `${timerPercentage}%`,
                            }}
                        />
                    </div>
                </div>
            </article>

            <article className="game__status-card">
        <span
            className="game__status-icon"
            aria-hidden="true"
        >
          📚
        </span>

                <div>
          <span className="game__status-label">
            Palabras
          </span>

                    <strong>{wordCount}</strong>
                </div>
            </article>

            <article className="game__status-card">
        <span
            className="game__status-icon"
            aria-hidden="true"
        >
          🔤
        </span>

                <div>
          <span className="game__status-label">
            Promedio
          </span>

                    <strong>{averageLength}</strong>
                </div>
            </article>
        </section>
    );
}