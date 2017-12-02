import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ItemList } from './ItemList'
import { fetchItems } from './api-service';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    const items = fetchItems();
    this.setState({ items });
  }

  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <i className="fa fa-check-square-o" aria-hidden="true"></i>
          <span className="App-title"> iHave It</span>
        </header>
        <ItemList items={this.state.items} />
      </div>
    );
  }
}

export default App;