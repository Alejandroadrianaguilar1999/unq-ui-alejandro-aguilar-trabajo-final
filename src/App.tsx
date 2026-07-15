import './App.css';

function App() {
    return (
        <main className="game">
            <section className="game__card">
                <header className="game__header">
                    <p className="game__eyebrow">Trabajo Final Integrador</p>

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

                    <p className="game__empty-message">
                        Todavía no ingresaste ninguna palabra.
                    </p>
                </section>

                <section className="game__next-word">
                    <p>Podés comenzar con cualquier palabra.</p>
                </section>

                <form className="game__form">
                    <label htmlFor="word">Ingresá una palabra</label>

                    <div className="game__form-controls">
                        <input
                            id="word"
                            type="text"
                            placeholder="Ejemplo: casa"
                        />

                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default App;