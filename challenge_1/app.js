/**
 * The information div reference from the DOM
 */
let infoDiv = document.getElementById('info');

/**
 * Changes the info div to show curent player's turn
 * @param {GameState} input GameState that represents current player
 */
let infoPlayerTurn = (input) => {
  infoDiv.innerHTML = `It is ${input.value} Player's Turn`;
}

/**
 * Changes the info div to show the end state of the game (Win or Tie)
 * @param {GameState} input GameState that represents the end of the game (X, O, Tie)
 */
let infoWin = (input) => {
  infoDiv.innerHTML = input === state.Tie ? 'Game has ended with a tie' : `PLAYER ${input.value} HAS WON!!!`;
}

/**
 * State class used for the game of Tic Tac Toe
 * @param {string} value Internal value of created state
 */
function GameState(value) {
  this.value = value;
}

/**
 * All states needed to represent players / board slots / and win states
 */
const state = {
  X: new GameState('[X]'),
  O: new GameState('[O]'),
  Tie: new GameState('[Tie]'),
  Empty: new GameState('[ ]')
}

/**
 * Tic Tac Toe game object constructor
 */
function Game() {
  this.winner = state.Empty;

  this.board = [
    [state.Empty, state.Empty, state.Empty],
    [state.Empty, state.Empty, state.Empty],
    [state.Empty, state.Empty, state.Empty]
  ];

  this.playerTurn = state.X;
  this.movesMade = 0;

  [].forEach.call(
    document.getElementsByClassName('boardSlot'),
    (slot) => { slot.innerHTML = state.Empty.value; }
  )

  infoPlayerTurn(this.playerTurn);
}

/**
 * The current Tic Tac Toe game being played
 */
let currentGame = new Game();

/**
 * Changes the board slot state with the provided newState if slot is empty
 * @param {number} colum The colum of the board
 * @param {number} row The row of the board
 * @param {function} callback Callback that will be called with set state's value
 */
let setBoardSlot = (colum, row, callback) => {
  if (!callback) { callback = () => { }; }

  if (currentGame.winner === state.Empty) {
    if (currentGame.board[row][colum] === state.Empty) {
      currentGame.board[row][colum] = currentGame.playerTurn;
      currentGame.movesMade++;

      callback(null, currentGame.playerTurn.value);
      detectEndConditions(colum, row, currentGame.playerTurn, swapPlayer, infoWin);
    } else {
      callback(new Error('Taken Slot'));
    }
  } else {
    callback(new Error('Game has ended'))
  }
}

/**
 * Dom button handler for board buttons
 * @param {number} colum The colum number of Dom button
 * @param {number} row The row number of the Dom button
 * @param {object} element The element reference of the Dom button; use this keyword
 */
let slotClickHandler = (colum, row, element) => {
  setBoardSlot(colum, row, (err, value) => {
    if (!err) {
      element.innerHTML = value;
    }
  })
}

/**
 * Function that swaps the state of the current player
 */
let swapPlayer = () => {
  if (currentGame.playerTurn === state.X) {
    currentGame.playerTurn = state.O;
    infoPlayerTurn(currentGame.playerTurn);
    return;
  }

  if (currentGame.playerTurn === state.O) {
    currentGame.playerTurn = state.X;
    infoPlayerTurn(currentGame.playerTurn);
    return;
  }
}

/**
 * Function that creates a new game
 */
let resetGame = () => {
  currentGame = new Game();
}

/**
 * Checks for any winning conditions at specified colum and row, If found will run next callback, else will run end callback
 * @param {number} colum The colum number of the board
 * @param {number} row The row number of the board
 * @param {GameState} checkState The type of state to check for on the board
 * @param {function} next Callback that is called when no game ending conditions are met
 * @param {function} end Callback that is called when a game ending condition is met
 */
let detectEndConditions = (colum, row, checkState, next, end) => {
  if (!next) { next = () => { }; }
  if (!end) { end = () => { }; }

  //check horizontal
  if (currentGame.board[row].every((columState) => { return columState === checkState })) {
    currentGame.winner = checkState;
    end(currentGame.winner);
    return;
  }

  //check vertical
  if (currentGame.board.every((rowStates) => { return rowStates[colum] === checkState })) {
    currentGame.winner = checkState;
    end(currentGame.winner);
    return;
  }

  //check diagonal right
  if ((colum === 0 && row === 0) || (colum === 1 && row === 1) || (colum === 2 && row === 2)) {
    let check = true;
    for (let i = 0; i < currentGame.board.length; i++) {
      if (currentGame.board[i][i] !== checkState) {
        check = false;
        break;
      }
    }

    if (check) {
      currentGame.winner = checkState;
      end(currentGame.winner);
      return;
    }
  }

  //check diagonal left
  if ((colum === 2 && row === 0) || (colum === 1 && row === 1) || (colum === 0 && row === 2)) {
    let check = true;
    for (let i = 0; i < currentGame.board.length; i++) {
      if (currentGame.board[i][currentGame.board.length - 1 - i] !== checkState) {
        check = false;
        break;
      }
    }

    if (check) {
      currentGame.winner = checkState;
      end(currentGame.winner);
      return;
    }
  }

  if (currentGame.movesMade >= 9) {
    currentGame.winner = state.Tie;
    end(currentGame.winner);
    return;
  }

  next();
}

console.log('GAME START!!!');