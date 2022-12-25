export function showStringLength(word, length) {
    if (!word.toString().length || !length)
        return (word);
    return (word.toString().substring(0, length) + "...");
}