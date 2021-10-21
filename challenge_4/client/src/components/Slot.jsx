class Slot extends React.Component {
  render() {
    return <div className="slot" style={{width: '150px', height: '150px'}}>Index: {this.props.index}, State: {this.props.board.state.slots[this.props.index]}</div>
  }
}

export default Slot;