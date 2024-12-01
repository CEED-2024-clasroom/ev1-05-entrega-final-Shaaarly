import './styles/styles.css';
import './lib/fontawesome.js';
import { Game } from './lib/Game.js';
import { generateGrid } from './lib/grid.js';
import generateWheel from './lib/wheel.js';
import startGame from './lib/play.js';
import listenForHelp from './lib/help.js';

const GAME = new Game();

generateGrid(GAME);

generateWheel(GAME.letters);

startGame();

listenForHelp(GAME);