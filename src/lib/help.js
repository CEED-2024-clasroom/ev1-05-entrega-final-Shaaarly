import shuffleLetters from "./help_shuffle";
import { expand, lightbulb } from "./help_reveal";
import hammer from "./help_hammer";



function listenForHelp(GAME) {

    const shuffleButton = document.getElementById('shuffle');
    const lightbulbButton = document.getElementById('lightbulb');
    const expandButton = document.getElementById('expand');
    const hammerButton = document.getElementById('hammer');

    function shuffleAction(e) {
        e.stopPropagation();
        shuffleLetters();
    }
    function lightbulbAction(e) {
        e.stopPropagation();
        lightbulb(GAME);
    }
    function expandAction(e) {
        e.stopPropagation();
        expand(GAME);
    }
    function hammerAction(e) {
        e.stopPropagation();
        hammer(GAME);
    }



    shuffleButton.addEventListener('click', shuffleAction);

    lightbulbButton.addEventListener('click', lightbulbAction);

    expandButton.addEventListener('click', expandAction);

    hammerButton.addEventListener('click', hammerAction);
}

export default listenForHelp;