class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: Checkout
    }
  }

  changeView(component) {
    this.setState({ view: component });
  }

  render() {
    return this.state.view(this);
  }
}

const Checkout = (appRef) => {
  console.log('click');
  return <button onClick={() => { appRef.changeView(F1) }}>Checkout</button>;
}

const F1 = (appRef) => {
  return <>
    <h1>F1</h1>

    <form>
      <input type="text" placeholder="First Name"/><br />
      <input type="text" placeholder="Last Name"/><br />
      <button type="submit" onClick={() => {appRef.changeView(F2)}}>Next</button>
    </form>
  </>
}

const F2 = (appRef) => {
  return <>
    <h1>F2</h1>

    <form>
      <input type="text" placeholder="Line 1"/><br />
      <input type="text" placeholder="Line 2"/><br />
      <input type="text" placeholder="City"/>
      <input type="text" placeholder="State"/>
      <input type="text" placeholder="Zip Code"/><br />
      <button type="submit" onClick={() => {appRef.changeView(F3)}}>Next</button>
    </form>
  </>
}

const F3 = (appRef) => {
  return <>
    <h1>F3</h1>
  </>
}

ReactDOM.render(<App />, document.getElementById("app"));