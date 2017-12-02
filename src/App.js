import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Item } from './Item'
import { fetchItems } from './api-service';
import Grid from 'react-bootstrap/lib/Grid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  getItems = () => {
    return this.state.items.map(i => {
      return <Item key={i.id} name={i.name} quantity={i.quantity} />
    });
  };

  componentDidMount() {
    const items = fetchItems();
    this.setState({ items });
  }

  render() {
    const items = this.getItems();
    return (
      <div className="App container">
        <header className="App-header">
          <i className="fa fa-check-square-o" aria-hidden="true"></i>
          <span className="App-title"> iHave It</span>
        </header>
          <Grid>
            {items}
          </Grid>
        </div>
    );
  }
}

export default App;