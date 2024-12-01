import calculateLetterPositions from "./letter_positions";

function shuffleLetters() {
    const letters = document.querySelectorAll('#wheel .wheel-letter');
    const lettersArray = Array.from(letters);

    lettersArray.sort(() => Math.random() - 0.5);

    const positions = calculateLetterPositions(lettersArray.length);

    lettersArray.forEach((letter, index) => {
        letter.style.left = positions[index].left;
        letter.style.top = positions[index].top;
    });
}

export default shuffleLetters;