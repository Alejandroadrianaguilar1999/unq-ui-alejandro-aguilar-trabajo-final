export function GameHeader() {
    return (
        <header className="game__header">
            <div className="game__logo" aria-hidden="true">
                🔗
            </div>

            <p className="game__eyebrow">
                Desafío de palabras
            </p>

            <h1>Palabras Encadenadas</h1>

            <p className="game__description">
                Encadená palabras válidas y superá tu mejor puntaje antes de que
                termine el tiempo.
            </p>
        </header>
    );
}