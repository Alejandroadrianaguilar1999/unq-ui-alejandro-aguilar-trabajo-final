interface GameStatusProps {
    score: number;
    timeLeft: number;
}

export function GameStatus({
                               score,
                               timeLeft,
                           }: GameStatusProps) {
    return (
        <section className="game__status">
            <article className="game__status-card">
                <span>Puntaje</span>
                <strong>{score}</strong>
            </article>

            <article className="game__status-card">
                <span>Tiempo</span>
                <strong>{timeLeft}</strong>
            </article>
        </section>
    );
}