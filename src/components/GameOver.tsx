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
            <h2>Partida finalizada</h2>

            <p>
                Palabras válidas: <strong>{wordCount}</strong>
            </p>

            <p>
                Puntaje final: <strong>{score}</strong>
            </p>

            <button
                type="button"
                className="game__restart-button"
                onClick={onRestart}
            >
                Jugar nuevamente
            </button>
        </section>
    );
}