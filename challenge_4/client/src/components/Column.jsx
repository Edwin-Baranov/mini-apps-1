import Slot from './Slot.jsx';

class Column extends React.Component {
  renderSlot(x, y) {
    var slotIndex = x + (y * this.props.board.state.x);
    return <Slot index={slotIndex} board={this.props.board} key={`Slot_${slotIndex}`} />
  }

  render() {
    var result = [];
    for (var y = 0; y < this.props.board.state.y; y++) {
      result.push(this.renderSlot(this.props.x, y))
    }

    console.log('Making a column');
    return <div className="column" style={{display: 'inline-block'}} onClick={()=>{this.props.board.updateColumn(this.props.x)}}>
      {result}
    </div>
  }
}

export default Column;