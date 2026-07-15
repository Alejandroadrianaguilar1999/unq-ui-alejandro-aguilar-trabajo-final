import { useState } from 'react';
import './App.css';

function App() {
    const [currentWord, setCurrentWord] = useState('');
    const [words, setWords] = useState<string[]>([]);

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const word = currentWord.trim().toLowerCase();

        if (!word) {
            return;
        }

        setWords((currentWords) => [
            ...currentWords,
            word,
        ]);

        setCurrentWord('');
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
                        <strong>0</strong>
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
                        />

                        <button type="submit">
                            Enviar
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default App;