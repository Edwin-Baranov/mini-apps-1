import Column from './Column.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: this.props.x,
      y: this.props.y,
      slots: Array(this.props.x * this.props.y).fill(null),
      down: this.props.x,
      diagonalRight: this.props.x + 1,
      diagonalLeft: this.props.x - 1,
      currentPlayer: 'black'
    }
  }

  setSlotState(index, value) {
    console.log(`updating slot ${index} with value ${value}`);

    let slotsCopy = [...this.state.slots]
    slotsCopy[index] = value;

    this.setState(
      {
        slots: slotsCopy
      },
      () => {this.checkFor4(index)}
    )
  }

  updateColumn(columnIndex) {
    console.log('updating column:', columnIndex)
    let bottomIndex = columnIndex + (this.state.x * (this.state.y - 1));
    console.log('bottom index:', bottomIndex);
    for (var i = bottomIndex; i >= 0; i -= this.state.x) {
      console.log(`Checking slot: ${i}`)
      if (!this.state.slots[i]) {
        this.setSlotState(i, this.state.currentPlayer);
        return;
      }
    }
  }

  checkFor4(index) {
    let mod = (number, modulo) => { return ((number % modulo) + modulo) % modulo};
    let checkRight = (checker) => { return mod((index + checker), this.state.x) !== 0};
    let checkLeft = (checker) => { return mod((index + checker), this.state.x) !== (this.state.x - 1)};
    let checkDown = (checker) => { return (index + checker) < (this.state.x * this.state.y)};
    let checkUp = (checker) => { return (index + checker) >= 0};
    let checkDownRight = (checker) => {return checkDown(checker) && checkRight(checker)};
    let checkUpLeft = (checker) => { return checkUp(checker) && checkLeft(checker)};
    let checkDownLeft = (checker) => { return checkDown(checker) && checkLeft(checker)};
    let checkUpRight = (checker) => { return checkUp(checker) && checkRight(checker)};

    let count;
    let checker;

    //right
    count = 1;
    checker = 1;
    while(checkRight(checker)) {
      console.log('Checking Right');
      if (this.state.slots[index + checker] === this.state.currentPlayer) {
        count++
        checker++
      } else {
        console.log('break');
        break;
      }
    };
    //left
    checker = -1;
    while(checkLeft(checker)) {
      console.log('Checking Left');
      if (this.state.slots[index + checker] === this.state.currentPlayer) {
        count++
        checker--
      } else {
        console.log('break');
        break;
      }
    };

    if(count >= 4) {
      console.log('WE HAVE A WINNER');
      return;
    } else {
      count = 1;
    }

    //down
    checker = this.state.down;
    while(checkDown(checker)) {
      console.log('Checking Down');
      if (this.state.slots[index + checker] === this.state.currentPlayer) {
        count++
        checker += this.state.down;
      } else {
        console.log('break');
        break;
      }
    };
    
    //up - Not necisary since there will never be a piece above you due to you 'falling'

    if(count >= 4) {
      console.log('WE HAVE A WINNER');
      return;
    } else {
      count = 1;
    }

    //diagonal down right
    checker = this.state.diagonalRight;
    while(checkDownRight(checker)) {
      console.log('Checking DownRight');
      if (this.state.slots[index + checker] === this.state.currentPlayer) {
        count++
        checker += this.state.diagonalRight;
      } else {
        console.log('break');
        break;
      }
    };

    //diagonal up left
    checker = -this.state.diagonalRight;
    while(checkUpLeft(checker)) {
      console.log('Checking UpLeft');
      if (this.state.slots[index + checker] === this.state.currentPlayer) {
        count++
        checker -= this.state.diagonalRight;
      } else {
        console.log('break');
        break;
      }
    };

    if(count >= 4) {
      console.log('WE HAVE A WINNER');
      return;
    } else {
      count = 1;
    }

    //diagonal down left
    checker = this.state.diagonalLeft;
    while(checkDownLeft(checker)) {
      console.log('Checking DownLeft');
      if (this.state.slots[index + checker] === this.state.currentPlayer) {
        count++
        checker += this.state.diagonalLeft;
      } else {
        console.log('break');
        break;
      }
    };

    //diagonal up right
    checker = -this.state.diagonalLeft;
    while(checkUpRight(checker)) {
      console.log('Checking UpRight');
      if (this.state.slots[index + checker] === this.state.currentPlayer) {
        count++
        checker -= this.state.diagonalLeft;
      } else {
        console.log('break');
        break;
      }
    };

    if(count >= 4) {
      console.log('WE HAVE A WINNER');
      return;
    } else {
      count = 1;
    }

    this.setState({ currentPlayer: this.state.currentPlayer === 'black' ? 'red' : 'black'})
  }

  renderColum(x) {
    return <Column x={x} board={this} key={`Column_${x}`} />
  }

  render() {
    console.log(`Making a ${this.state.x} by ${this.state.y} board`);
    var colums = [];
    for (var x = 0; x < this.state.x; x++) {
      colums.push(this.renderColum(x))
    }
    return <div className="board" style={{
      width: 'fit-content',
      margin: '0 auto',
      borderRadius: '25px',
      border: '2px solid #73AD21',
      padding: '20px'
    }
    }> {colums}</div >
  }
}

export default Board;