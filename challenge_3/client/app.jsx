class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 0,
      firstName: '',
      lastName: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      zipCode: '',
      creditCardNum: '',
      expiryDate: '',
      cvv: '',
      billingZipCode: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  changeView() {
    this.setState({ view: this.state.view + 1 });
  }

  handleChange(values) {
    this.setState(values);
  }

  //Handler to remove default form behavior
  handleSubmit(event) {
    event.preventDefault();
    this.changeView();
  }

  render() {
    switch (this.state.view) {
      case 0:
        return <button onClick={ this.changeView }>Checkout</button>;
      case 1:
        return (<>
          <h1>F1</h1>

          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="First Name" name="FirstName" value={this.state.firstName} onChange={(event) => {this.handleChange({firstName: event.target.value})}} /><br />
            <input type="text" placeholder="Last Name" name="LastName" value={this.state.lastName} onChange={(event) => {this.handleChange({lastName: event.target.value})}} /><br />
            <button type="submit">Next</button>
          </form>
        </>)
      case 2:
        return <>
          <h1>F2</h1>

          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Line 1" name="Line1" value={this.state.line1} onChange={(event) => {this.handleChange({line1: event.target.value})}} /><br />
            <input type="text" placeholder="Line 2" name="Line2" value={this.state.line2} onChange={(event) => {this.handleChange({line2: event.target.value})}} /><br />
            <input type="text" placeholder="City" name="City" value={this.state.city} onChange={(event) => {this.handleChange({city: event.target.value})}} /><br />
            <input type="text" placeholder="State" name="State" value={this.state.state} onChange={(event) => {this.handleChange({state: event.target.value})}} /><br />
            <input type="text" placeholder="Zip Code" name="ZipCode" value={this.state.zipCode} onChange={(event) => {this.handleChange({zipCode: event.target.value})}} /><br />
            <button type="submit">Next</button>
          </form>
        </>
      case 3:
        return <>
        <h1>F3</h1>

        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Credit Card #" name="CreditCardNumber" value={this.state.creditCardNum} onChange={(event) => {this.handleChange({creditCardNum: event.target.value})}} /><br />
          <input type="text" placeholder="Expiry Date" name="ExpiryDate" value={this.state.expiryDate} onChange={(event) => {this.handleChange({expiryDate: event.target.value})}} /><br />
          <input type="text" placeholder="CVV" name="CVV" value={this.state.cvv} onChange={(event) => {this.handleChange({cvv: event.target.value})}} /><br />
          <input type="text" placeholder="Billing Zip Code" name="BillingZipCode" value={this.state.billingZipCode} onChange={(event) => {this.handleChange({billingZipCode: event.target.value})}} /><br />
          <button type="submit">Next</button>
        </form>
      </>
      case 4:
        return <>
        <h1>Summary</h1>

        <p>Name: {this.state.firstName} {this.state.lastName}</p>
        <p>Address: {this.state.line1} {this.state.line2} {this.state.city} {this.state.state} {this.state.zipCode}</p>
        <p>Credit Card: {this.state.creditCardNum}</p>
        <p>Expires:{this.state.expiryDate}</p>
        <p>CVV:{this.state.cvv}</p>
        <p>Billing:{this.state.billingZipCode}</p>
      </>
    }
  }
}

ReactDOM.render(<App />, document.getElementById("app"));