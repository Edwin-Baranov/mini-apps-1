function GameState(value) {
  this.value = value;
}

const state = {
  X: new GameState('X'),
  O: new GameState('O'),
  Tie: new GameState('Tie')
  Empty: new GameState(''),
}

function Game() {
  this.winner = state.Empty;

  this.board = [
    [state.Empty, state.Empty, state.Empty],
    [state.Empty, state.Empty, state.Empty],
    [state.Empty, state.Empty, state.Empty]
  ];

  this.playerTurn = state.X;
  this.movesMade = 0;
}

/**
 * Tic Tac Toe game
 */
let currentGame = new Game();

/**
 * Changes the board slot state with the provided newState if slot is empty
 * @param {number} colum The colum of the board
 * @param {number} row The row of the board
 * @param {GameState} newState The state to be applied to board slot
 * @param {function} callback Callback that will be called with set state value
 */
let setBoardSlot = (colum, row, newState, callback) => {
  if (newState instanceof GameState) {
    if (board[row][colum] === state.Empty) {
      board[row][colum] = newState;
      movesMade++;
      detectEndConditions(colum, row, newState, swapPlayer);
      callback(null, newState.value);
    } else {
      callback(new Error('Taken Slot'));
    }
  } else {
    callback(new Error('newState is not a valid GameState'))
  }
}

let swapPlayer = () => {
  if (currentGame.playerTurn === state.X) {
    currentGame.playerTurn = state.O;
    return;
  }

  if (currentGame.playerTurn === state.O) {
    currentGame.playerTurn = state.X;
    return;
  }
}

let resetGame = () => {
  currentGame = new Game();
}

let detectEndConditions = (colum, row, checkState, callback) => {
  //check horizontal
  if (currentGame.board[row].every((columState) => {columState === checkState})) {
    currentGame.winner = checkState;
    callback();
    return;
  }

  //check vertical
  if (currentGame.board.every((rowStates) => {rowStates[colum] === checkState})) {
    currentGame.winner = checkState;
    callback();
    return;
  }
  //check diagonal if applicable
  if ((colum === 0 && row === 0) || (colum === 1 && row === 1) || (colum === 2 && row === 2) {
    //check diagonal right
    for (let i = 0; i < currentGame.board.length; i++) {
      if (currentGame.board[i][i] !== checkState) {
        callback();
        return;
      }
    }
    //check diagonal left
    for (let i = 0; i < currentGame.board.length; i++) {
      if (currentGame.board[i][currentGame.board.length - 1 - i] !== checkState) {
        callback();
        return;
      }
    }

    currentGame.winner = checkState;
    callback();
  }

  if (currentGame.movesMade >= 9 && currentGame.winner === state.Empty) {
    currentGame.winner = state.Tie;
    callback();
  }
}

/** TODO'S
 * ~~make board~~
 * ~~first move always starts with x~~
 * ~~detects a win or tie~~
 * display's appropriate message
 * ~~button resets the game for new round of gameplay~~
 */