import { useState } from 'react';
import { validateWord } from './services/wordApi';
import './App.css';

function App() {
    const [currentWord, setCurrentWord] = useState('');
    const [words, setWords] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [error, setError] = useState('');
    const [isValidating, setIsValidating] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (isValidating) {
            return;
        }

        const word = currentWord.trim().toLocaleLowerCase('es');

        setError('');

        if (!word) {
            setError('Ingresá una palabra.');
            return;
        }

        if (words.includes(word)) {
            setError('La palabra ya fue utilizada.');
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
                        <strong>15</strong>
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

                <section className="game__next-word">
                    <p>Podés comenzar con cualquier palabra.</p>
                </section>

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
                            {isValidating ? 'Validando...' : 'Enviar'}
                        </button>
                    </div>
                </form>

                {error && (
                    <p className="game__error">
                        {error}
                    </p>
                )}
            </section>
        </main>
    );
}

export default App;