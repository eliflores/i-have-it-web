import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ItemList } from './ItemList'
import { fetchItems, saveItem } from './api-service';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  saveItemHandler = (item, callback) => {
    saveItem(item).then(res => {
      callback();
      const currentItems = this.state.items.slice();
      const itemIndex = currentItems.findIndex(i => {
        return i.id == item.id
      });
      currentItems[itemIndex] = {...currentItems[itemIndex], ...item};
      this.setState({ items: currentItems });
    });
  }

  componentDidMount() {
    fetchItems().then(res => {
      this.setState({ items: res });
    });
  }

  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <i className="fa fa-check-square-o" aria-hidden="true"></i>
          <span className="App-title"> iHave It</span>
        </header>
        <ItemList items={this.state.items} saveItemHandler={this.saveItemHandler} />
      </div>
    );
  }
}

export default App;