import calculateLetterPositions from '../lib/letter_positions.js';

function generateWheel(letters) {

    const letterPositions = calculateLetterPositions(letters.length);

    const wheelContainer = document.getElementById('wheel');

    wheelContainer.innerHTML = '';

    let i = 0;
    for (const position of letterPositions) {

        let { left, top } = position;
        let wheelLetter = document.createElement('div');

        wheelLetter.classList.add('wheel-letter');
        wheelLetter.style.top = `${top}`;
        wheelLetter.style.left = `${left}`;

        wheelLetter.textContent = letters.charAt(i);

        wheelContainer.appendChild(wheelLetter);

        i++;
    }
}

export default generateWheel;