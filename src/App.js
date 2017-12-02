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
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">iHave It</h1>
        </header>
        <div className="container">
          <Grid>
            {items}
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;