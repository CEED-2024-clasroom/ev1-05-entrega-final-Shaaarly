function hammer(GAME) {


    const letters = document.querySelectorAll('#grid .letter');
    const overlay = document.getElementById('black');

    overlay.classList.remove('hidden');
    letters.forEach((letter) => {
        letter.classList.add('on-top');
    });

    function endHammerHelp() {
        overlay.classList.add('hidden');
        letters.forEach(letter => letter.classList.remove('on-top'));
    }

    function clickHammer(e) {

        e.stopPropagation();

        if (e.target.id === 'black') {

            endHammerHelp();
            return;
        }

        if (e.target.classList.contains('on-top')) {

            let letterDiv = e.target;
            if (letterDiv.innerHTML !== '') {

                return;
            } else {
                const position = letterDiv.dataset.position;
                const [row, col] = position.split(',');
                let letter = GAME.letterAt(col, row);
                letterDiv.textContent = letter;

                endHammerHelp();
            }
        }
    }

    document.addEventListener('click', clickHammer);
}


export default hammer;