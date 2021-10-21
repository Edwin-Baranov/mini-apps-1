import Column from './Column.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: this.props.x,
      y: this.props.y,
      slots: Array(this.props.x * this.props.y).fill(null)
    }
  }

  setSlotState(index, value) {
    console.log(`updating slot ${index} with value ${value}`)
    let slotsCopy = [...this.state.slots]
    slotsCopy[index] = value;
    this.setState({slots: slotsCopy})
  }

  updateColumn(columnIndex) {
    console.log('updating column:', columnIndex)
    let bottomIndex = columnIndex + (this.state.x * (this.state.y - 1));
    console.log('bottom index:', bottomIndex);
    for(var i = bottomIndex; i >= 0; i-= this.state.x) {
      console.log(`Checking slot: ${i}`)
      if (!this.state.slots[i]) {
        this.setSlotState(i, 'red');
        return;
      }
    }
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