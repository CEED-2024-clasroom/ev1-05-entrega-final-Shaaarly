function revealRandomLetter(GAME) {

    const grid = document.getElementById('grid');
    const letterDivs = Array.from(grid.children);

    const emptyLetterDivs = letterDivs.filter(letterDiv => !letterDiv.textContent);

    if (emptyLetterDivs.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyLetterDivs.length);
    const randomLetterDiv = emptyLetterDivs[randomIndex];

    const position = randomLetterDiv.dataset.position;
    const [row, col] = position.split(',');
    let letter = GAME.letterAt(col, row);

    randomLetterDiv.textContent = letter;
}

function lightbulb(GAME) {
    revealRandomLetter(GAME);
}

function expand(GAME) {
    for (let i = 0; i < 5; i++) {
        revealRandomLetter(GAME);
    }
}


export { lightbulb, expand };