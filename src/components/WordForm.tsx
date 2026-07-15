import type {
    ChangeEvent,
    FormEvent,
} from 'react';

interface WordFormProps {
    currentWord: string;
    error: string;
    isValidating: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function WordForm({
                             currentWord,
                             error,
                             isValidating,
                             onChange,
                             onSubmit,
                         }: WordFormProps) {
    return (
        <>
            <form
                className="game__form"
                onSubmit={onSubmit}
            >
                <label htmlFor="word">
                    Ingresá una palabra
                </label>

                <div className="game__form-controls">
                    <input
                        id="word"
                        type="text"
                        value={currentWord}
                        onChange={onChange}
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
    );
}