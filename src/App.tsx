import {
    useEffect,
    useState,
} from 'react';
import type {
    ChangeEvent,
    FormEvent,
} from 'react';

import { GameHeader } from './components/GameHeader';
import { GameOver } from './components/GameOver';
import { GameStatus } from './components/GameStatus';
import { WordChain } from './components/WordChain';
import { WordForm } from './components/WordForm';
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

    const handleWordChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        setCurrentWord(event.target.value);
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
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

    const restartGame = () => {
        setCurrentWord('');
        setWords([]);
        setScore(0);
        setError('');
        setIsValidating(false);
        setTimeLeft(15);
        setGameStarted(false);
        setGameOver(false);
    };

    return (
        <main className="game">
            <section className="game__card">
                <GameHeader />

                <GameStatus
                    score={score}
                    timeLeft={timeLeft}
                />

                <WordChain
                    words={words}
                    gameOver={gameOver}
                />

                {gameOver ? (
                    <GameOver
                        wordCount={words.length}
                        score={score}
                        onRestart={restartGame}
                    />
                ) : (
                    <WordForm
                        currentWord={currentWord}
                        error={error}
                        isValidating={isValidating}
                        onChange={handleWordChange}
                        onSubmit={handleSubmit}
                    />
                )}
            </section>
        </main>
    );
}

export default App;