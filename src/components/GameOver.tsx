interface GameOverProps {
    wordCount: number;
    score: number;
    onRestart: () => void;
}

export function GameOver({
                             wordCount,
                             score,
                             onRestart,
                         }: GameOverProps) {
    return (
        <section className="game__over">
            <div
                className="game__trophy"
                aria-hidden="true"
            >
                🏆
            </div>

            <span className="game__over-label">
        Tiempo terminado
      </span>

            <h2>Partida finalizada</h2>

            <p className="game__over-message">
                Lograste construir una cadena de{' '}
                <strong>{wordCount}</strong>{' '}
                {wordCount === 1 ? 'palabra' : 'palabras'}.
            </p>

            <div className="game__final-score">
                <span>Puntaje final</span>
                <strong>{score}</strong>
            </div>

            <button
                type="button"
                className="game__restart-button"
                onClick={onRestart}
            >
                <span aria-hidden="true">↻</span>
                Jugar nuevamente
            </button>
        </section>
    );
}