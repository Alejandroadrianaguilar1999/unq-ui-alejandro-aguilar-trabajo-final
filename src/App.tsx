import { useEffect, useState } from 'react';
import { validateWord } from './services/wordApi';
import {
    normalizeWord,
    respectsChain,
} from './utils/words';
import './App.css';

function App() {
    const [currentWord, setCurrentWord] = useState('');
    const [words, setWords] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [error, setError] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const lastWord = words.at(-1);
    const requiredLetter = lastWord?.at(-1);

    useEffect(() => {
        if (!gameStarted || gameOver) {
            return;
        }

        if (timeLeft === 0) {
            setGameOver(true);
            return;
        }

        const timerId = window.setTimeout(() => {
            setTimeLeft((currentTime) => currentTime - 1);
        }, 1000);

        return () => {
            window.clearTimeout(timerId);
        };
    }, [gameStarted, gameOver, timeLeft]);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (gameOver || isValidating) {
            return;
        }

        const word = normalizeWord(currentWord);

        setError('');

        if (!word) {
            setError('Ingresá una palabra.');
            return;
        }

        if (words.includes(word)) {
            setError('La palabra ya fue utilizada.');
            return;
        }

        const previousWord = words.at(-1);

        if (
            previousWord &&
            !respectsChain(previousWord, word)
        ) {
            setError(
                `La palabra debe comenzar con la letra "${previousWord
                    .at(-1)
                    ?.toUpperCase()}".`,
            );

            return;
        }

        try {
            setIsValidating(true);

            const exists = await validateWord(word);

            if (!exists) {
                setError('La palabra no existe.');
                return;
            }

            setWords((currentWords) => [
                ...currentWords,
                word,
            ]);

            setScore((currentScore) => {
                return currentScore + word.length;
            });

            setCurrentWord('');
            setGameStarted(true);
            setTimeLeft(15);
        } catch {
            setError(
                'No se pudo validar la palabra. Intentá nuevamente.',
            );
        } finally {
            setIsValidating(false);
        }
    };

    return (
        <main className="game">
            <section className="game__card">
                <header className="game__header">
                    <p className="game__eyebrow">
                        Trabajo Final Integrador
                    </p>

                    <h1>Palabras Encadenadas</h1>

                    <p className="game__description">
                        Formá la cadena más larga posible antes de que se termine el
                        tiempo.
                    </p>
                </header>

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
                                <strong>
                                    {requiredLetter.toUpperCase()}
                                </strong>
                            </p>
                        ) : (
                            <p>Podés comenzar con cualquier palabra.</p>
                        )}
                    </section>
                )}

                {gameOver ? (
                    <section className="game__over">
                        <h2>Partida finalizada</h2>

                        <p>
                            Palabras válidas: <strong>{words.length}</strong>
                        </p>

                        <p>
                            Puntaje final: <strong>{score}</strong>
                        </p>
                    </section>
                ) : (
                    <>
                        <form
                            className="game__form"
                            onSubmit={handleSubmit}
                        >
                            <label htmlFor="word">
                                Ingresá una palabra
                            </label>

                            <div className="game__form-controls">
                                <input
                                    id="word"
                                    type="text"
                                    value={currentWord}
                                    onChange={(event) => {
                                        setCurrentWord(event.target.value);
                                    }}
                                    placeholder="Ejemplo: casa"
                                    autoComplete="off"
                                    disabled={isValidating}
                                />

                                <button
                                    type="submit"
                                    disabled={isValidating}
                                >
                                    {isValidating
                                        ? 'Validando...'
                                        : 'Enviar'}
                                </button>
                            </div>
                        </form>

                        {error && (
                            <p className="game__error">
                                {error}
                            </p>
                        )}
                    </>
                )}
            </section>
        </main>
    );
}

export default App;