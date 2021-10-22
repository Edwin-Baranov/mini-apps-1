class Slot extends React.Component {
  //Index: {this.props.index}, State: {this.props.board.state.slots[this.props.index]}
  render() {
    return <div className="slot" style={
      {
        width: '145px',
        height: '145px',
        margin: '2.5px',
        borderRadius: '72.5px',
        border: '2px solid #73AD21',
        backgroundColor: this.props.board.state.slots[this.props.index]
      }
    }>
    </div>
  }
}

export default Slot;