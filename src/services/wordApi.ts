const API_URL = 'https://word-api-hmlg.vercel.app';

interface ValidateWordResponse {
    exists: boolean;
}

export async function validateWord(
    word: string,
): Promise<boolean> {
    const response = await fetch(
        `${API_URL}/api/validate?word=${encodeURIComponent(word)}`,
    );

    if (!response.ok) {
        throw new Error('No se pudo validar la palabra');
    }

    const data: ValidateWordResponse =
        await response.json();

    return data.exists;
}