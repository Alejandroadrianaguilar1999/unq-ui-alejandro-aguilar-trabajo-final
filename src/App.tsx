import {
    useEffect,
    useRef,
    useState,
} from 'react';
import type {
    ChangeEventHandler,
    FormEventHandler,
} from 'react';

import { GameHeader } from './components/GameHeader';
import { GameOver } from './components/GameOver';
import { GameStatus } from './components/GameStatus';
import { Leaderboard } from './components/Leaderboard';
import { WordChain } from './components/WordChain';
import { WordForm } from './components/WordForm';
import { validateWord } from './services/wordApi';
import type {
    LeaderboardEntry,
} from './utils/leaderboard';
import {
    getLeaderboard,
    saveScore,
} from './utils/leaderboard';
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
    const [leaderboard, setLeaderboard] =
        useState<LeaderboardEntry[]>(getLeaderboard);
    const [playerName, setPlayerName] = useState('');

    const scoreSavedRef = useRef(false);

    useEffect(() => {
        if (!gameStarted || gameOver) {
            return;
        }

        if (timeLeft === 0) {
            setGameOver(true);

            if (!scoreSavedRef.current) {
                scoreSavedRef.current = true;
                setLeaderboard(
                    saveScore(playerName, score),
                );
            }

            return;
        }

        const timerId = window.setTimeout(() => {
            setTimeLeft((currentTime) => currentTime - 1);
        }, 1000);

        return () => {
            window.clearTimeout(timerId);
        };
    }, [gameStarted, gameOver, timeLeft, score]);

    const handleWordChange: ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        setCurrentWord(event.target.value);
    };

    const handlePlayerNameChange:
        React.ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        setPlayerName(event.target.value);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (
        event,
    ) => {
        event.preventDefault();

        if (gameOver || isValidating) {
            return;
        }

        const word = normalizeWord(currentWord);

        setError('');

        const normalizedPlayerName = playerName.trim();

        if (!normalizedPlayerName) {
            setError('Ingresá tu nombre antes de comenzar.');
            return;
        }

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

        scoreSavedRef.current = false;
    };

    return (
        <main className="game">
            <div className="game__layout">
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
                            playerName={playerName}
                            currentWord={currentWord}
                            error={error}
                            isValidating={isValidating}
                            gameStarted={gameStarted}
                            onPlayerNameChange={handlePlayerNameChange}
                            onChange={handleWordChange}
                            onSubmit={handleSubmit}
                        />
                    )}
                </section>

                <aside className="game__leaderboard-panel">
                    <Leaderboard entries={leaderboard} />
                </aside>
            </div>
        </main>
    );
}

export default App;