interface WordChainProps {
    words: string[];
    gameOver: boolean;
}

export function WordChain({
                              words,
                              gameOver,
                          }: WordChainProps) {
    const lastWord = words.at(-1);
    const requiredLetter = lastWord?.at(-1);

    return (
        <>
            <section className="game__chain">
                <h2>Cadena de palabras</h2>

                {words.length === 0 ? (
                    <p className="game__empty-message">
                        Todavía no ingresaste ninguna palabra.
                    </p>
                ) : (
                    <p className="game__words">
                        {words.join(' → ')}
                    </p>
                )}
            </section>

            {!gameOver && (
                <section className="game__next-word">
                    {requiredLetter ? (
                        <p>
                            La siguiente palabra debe comenzar con{' '}
                            <strong>{requiredLetter.toUpperCase()}</strong>
                        </p>
                    ) : (
                        <p>Podés comenzar con cualquier palabra.</p>
                    )}
                </section>
            )}
        </>
    );
}