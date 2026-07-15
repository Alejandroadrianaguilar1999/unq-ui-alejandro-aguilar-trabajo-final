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
                <div className="game__section-heading">
                    <div>
            <span className="game__section-kicker">
              Tablero
            </span>

                        <h2>Cadena de palabras</h2>
                    </div>

                    <span className="game__word-count">
            {words.length}{' '}
                        {words.length === 1 ? 'palabra' : 'palabras'}
          </span>
                </div>

                {words.length === 0 ? (
                    <div className="game__empty-state">
            <span
                className="game__empty-icon"
                aria-hidden="true"
            >
              🎮
            </span>

                        <p>Todavía no ingresaste ninguna palabra.</p>

                        <small>
                            Escribí una palabra válida para comenzar la partida.
                        </small>
                    </div>
                ) : (
                    <div className="game__words">
                        {words.map((word, index) => (
                            <div
                                className="game__word-item"
                                key={`${word}-${index}`}
                            >
                <span
                    className={`game__word ${
                        index === words.length - 1
                            ? 'game__word--current'
                            : ''
                    }`}
                >
                  {word}
                </span>

                                {index < words.length - 1 && (
                                    <span
                                        className="game__arrow"
                                        aria-hidden="true"
                                    >
                    ➜
                  </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {!gameOver && (
                <section className="game__mission">
          <span
              className="game__mission-icon"
              aria-hidden="true"
          >
            🎯
          </span>

                    <div>
            <span className="game__mission-label">
              Próximo desafío
            </span>

                        {requiredLetter ? (
                            <p>
                                Ingresá una palabra que comience con
                                <strong className="game__required-letter">
                                    {requiredLetter.toUpperCase()}
                                </strong>
                            </p>
                        ) : (
                            <p>Podés comenzar con cualquier palabra.</p>
                        )}
                    </div>
                </section>
            )}
        </>
    );
}