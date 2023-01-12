const shuffleLetters = (letters) => {
    let scramble = letters
    for (let i = scramble.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [scramble[i], scramble[j]] = [scramble[j], scramble[i]];
    }

    return scramble
};

export default shuffleLetters;