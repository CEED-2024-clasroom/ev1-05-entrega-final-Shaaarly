import Line from './Line.js';
import { getElementCenter, lengthAndAngle } from './line_position.js';
import { placeOnGrid } from './grid.js';

const wheelLetters = document.getElementsByClassName('wheel-letter');
const wheel = document.getElementById('wheel');
const html = document.documentElement;
let currentLine = null;
let selectedLetters = [];
let previousLetter = null;


function mouseMove(e) {
    if (currentLine && previousLetter) {

        let finalX = e.clientX;
        let finalY = e.clientY;

        let { x: startX, y: startY } = getElementCenter(previousLetter);

        const { length, angle } = lengthAndAngle([startX, startY], [finalX, finalY]);

        if (wheelLetters.length > selectedLetters.length) {
            currentLine.update(length, angle);
        }
    }

}

function updateLine(newLetter) {
    let { x: finalX, y: finalY } = getElementCenter(newLetter);
    let { x: startX, y: startY } = getElementCenter(previousLetter);

    let { length, angle } = lengthAndAngle([startX, startY], [finalX, finalY]);

    if (currentLine && currentLine.line) {
        currentLine.update(length, angle);
    }
}

function mouseEnter(e) {
    if (!previousLetter || this.classList.contains('selected')) return;

    const newLetter = e.target;

    if (!newLetter.classList.contains('wheel-letter')) return;

    updateLine(newLetter);

    if (!selectedLetters.some(letter => letter === newLetter)) {
        const { x: finalX, y: finalY } = getElementCenter(newLetter);
        newLetter.classList.add('selected');
        selectedLetters.push(newLetter.innerText);
        previousLetter = newLetter;
        currentLine = new Line(finalX + window.scrollX, finalY + window.scrollY);
        currentLine.create();

    }
}

function mouseUp() {
    for (const letter of wheelLetters) {
        letter.classList.remove('selected');
        letter.removeEventListener('mouseenter', mouseEnter);
    }

    document.querySelectorAll('.line').forEach(line => line.remove());

    let word = selectedLetters.join('');

    if (word) {
        html.removeEventListener('mousemove', mouseMove);
        placeOnGrid(word);
        word = '';
    }

    currentLine = null;
    selectedLetters = [];
    previousLetter = null;
    word = '';

    html.removeEventListener('mousemove', mouseMove);

}

function click(e) {
    if (e.target && e.target.classList.contains('wheel-letter')) {

        const selectedLetter = e.target;

        if (!selectedLetter.classList.contains('wheel-letter')) return;

        selectedLetters = [selectedLetter.innerText];

        selectedLetter.classList.add('selected');
        previousLetter = selectedLetter;

        let { x: startX, y: startY } = getElementCenter(selectedLetter);

        currentLine = new Line(startX + window.scrollX, startY + window.scrollY);

        currentLine.create();

        for (const nextLetter of wheelLetters) {
            nextLetter.addEventListener('mouseenter', mouseEnter);
        }

        html.addEventListener('mousemove', mouseMove);
        html.addEventListener('mouseup', mouseUp);
    }
}

function startGame() {
    wheel.addEventListener('mousedown', click);
    html.addEventListener('mouseup', mouseUp);
}

export default startGame;
