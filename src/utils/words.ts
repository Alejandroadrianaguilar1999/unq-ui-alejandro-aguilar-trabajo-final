export function normalizeWord(word: string): string {
    return word.trim().toLocaleLowerCase('es');
}

function normalizeLetter(letter: string): string {
    return letter
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase('es');
}

export function respectsChain(
    previousWord: string,
    newWord: string,
): boolean {
    const lastLetter = previousWord.at(-1);
    const firstLetter = newWord.at(0);

    if (!lastLetter || !firstLetter) {
        return false;
    }

    return (
        normalizeLetter(lastLetter) ===
        normalizeLetter(firstLetter)
    );
}