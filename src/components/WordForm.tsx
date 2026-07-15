interface WordFormProps {
    playerName: string;
    currentWord: string;
    error: string;
    isValidating: boolean;
    gameStarted: boolean;
    onPlayerNameChange: (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => void;
    onChange: (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => void;
    onSubmit: (
        event: React.FormEvent<HTMLFormElement>,
    ) => void;
}

export function WordForm({
                             playerName,
                             currentWord,
                             error,
                             isValidating,
                             gameStarted,
                             onPlayerNameChange,
                             onChange,
                             onSubmit,
                         }: WordFormProps) {
    return (
        <>
            <form
                className="game__form"
                onSubmit={onSubmit}
            >
                {!gameStarted && (
                    <div className="game__player-field">
                        <label htmlFor="playerName">
                            Nombre del jugador
                        </label>

                        <input
                            id="playerName"
                            type="text"
                            value={playerName}
                            onChange={onPlayerNameChange}
                            placeholder="Ejemplo: Alejandro"
                            autoComplete="name"
                            disabled={isValidating}
                            maxLength={20}
                        />
                    </div>
                )}

                {gameStarted && (
                    <div className="game__current-player">
                        <span>Jugador</span>
                        <strong>{playerName}</strong>
                    </div>
                )}

                <label htmlFor="word">
                    Tu palabra
                </label>

                <div className="game__form-controls">
                    <input
                        id="word"
                        type="text"
                        value={currentWord}
                        onChange={onChange}
                        placeholder="Escribí una palabra..."
                        autoComplete="off"
                        disabled={isValidating}
                        autoFocus={gameStarted}
                    />

                    <button
                        type="submit"
                        disabled={isValidating}
                    >
                        {isValidating ? (
                            <>
                <span
                    className="game__spinner"
                    aria-hidden="true"
                />
                                Validando
                            </>
                        ) : (
                            <>
                                Enviar
                                <span aria-hidden="true">➜</span>
                            </>
                        )}
                    </button>
                </div>
            </form>

            {error && (
                <div
                    className="game__error"
                    role="alert"
                >
                    <span aria-hidden="true">⚠️</span>
                    <p>{error}</p>
                </div>
            )}
        </>
    );
}