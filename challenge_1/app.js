function GameState(value) {
  this.value = value;
}

const state = {
  X: new GameState('X'),
  O: new GameState('O'),
  Empty: new GameState('')
}

let currentTurn = state.X;

let board = [
  [state.Empty, state.Empty, state.Empty],
  [state.Empty, state.Empty, state.Empty],
  [state.Empty, state.Empty, state.Empty]
]

/**
 * Changes the board slot state with the provided newState if slot is empty
 * @param {*} colum
 * @param {*} row
 * @param {*} newState
 * @param {*} callback
 */
let setBoardSlot = (colum, row, newState, callback) => {
  if (newState instanceof GameState) {
    if (board[row][colum] === state.Empty) {
      board[row][colum] = newState;
      callback(null, newState.value);
    } else {
      callback(new Error('Taken Slot'));
    }
  } else {
    callback(new Error('newState is not a valid GameState'))
  }
}