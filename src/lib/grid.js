import { WordNotFound } from './Game.js';
import center from './center.js';

let gridContainer = [];
let currentGame = null;
let despX = 0;
let despY = 0;

function calcDesp(wordPositions) {

    let maxRow = 0;
    let maxCol = 0;

    wordPositions.forEach(({ origin, direction, length }) => {
        const [startRow, startCol] = origin;

        for (let i = 0; i < length; i++) {

            let row = startRow + (direction === 'vertical' ? 0 : i);
            let col = startCol + (direction === 'horizontal' ? 0 : i);

            maxRow = Math.max(maxRow, row);
            maxCol = Math.max(maxCol, col);
        }
    });

    [despX, despY] = center(maxCol, maxRow, 10, 10);

    return [despX, despY];
}

function generateGrid(game) {
    let wordPositions = game.wordPositions;
    currentGame = game;


    gridContainer = document.getElementById('grid');
    let [despX, despY] = calcDesp(wordPositions);
    let printedContainers = [];

    gridContainer.innerHTML = '';

    wordPositions.forEach(({ origin, direction, length }) => {
        const [startRow, startCol] = origin;

        for (let i = 0; i < length; i++) {

            const letterContainer = document.createElement('div');
            letterContainer.classList.add('letter');

            let incRow = startRow + (direction === 'horizontal' ? i : 0);
            let incCol = startCol + (direction === 'vertical' ? i : 0);

            let dataset = `${incCol},${incRow}`;
            letterContainer.dataset.position = dataset;

            let finalCol = incCol + despX + 1;
            let finalRow = incRow + despY + 1;

            let gridArea = `${finalCol} / ${finalRow}`;

            letterContainer.style.gridArea = gridArea;

            if (!printedContainers.some(container => container.style.gridArea === gridArea)) {
                printedContainers.push(letterContainer);
                gridContainer.appendChild(letterContainer);
            }
        }
    });
}

function getDivBy(gridAreaValue) {
    const targetDiv = Array.from(gridContainer.children).find(
        (div) => div.style.gridArea === gridAreaValue
    );

    return targetDiv;
}

function placeOnGrid(word) {
    try {
        const wordPositions = currentGame.findWord(word);
        const { origin, direction } = wordPositions;

        const incCol = direction === 'horizontal' ? 1 : 0;
        const incRow = direction === 'vertical' ? 1 : 0;

        let [currentCol, currentRow] = [
            origin[0] + 1 + despY,
            origin[1] + 1 + despX
        ];

        word.split('').forEach((letter) => {
            const gridAreaValue = `${currentRow} / ${currentCol}`;
            const targetDiv = getDivBy(gridAreaValue);

            if (targetDiv) {
                targetDiv.textContent = letter;
            }

            currentCol += incCol;
            currentRow += incRow;
        });
    } catch (error) {
        if (error instanceof WordNotFound) {
            // throw error;
        }
    }
}

export { generateGrid, placeOnGrid };