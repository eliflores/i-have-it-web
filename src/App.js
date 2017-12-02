import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ItemList } from './ItemList'
import { fetchItems, saveItem, deleteItem, addItem } from './api-service';
import Button from 'react-bootstrap/lib/Button';

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
      const itemIndex = this.findItem(item.id);
      currentItems[itemIndex] = { ...currentItems[itemIndex], ...item };
      this.setState({ items: currentItems });
    });
  }

  deleteItemHandler = (itemId) => {
    deleteItem(itemId)
      .then(res => {
        const currentItems = this.state.items.slice();
        const itemIndex = this.findItem(itemId);
        currentItems.splice(itemIndex, 1);
        this.setState({ items: currentItems });
      });
  }

  addItemHandler = (item, callback) => {
    addItem(item)
      .then(res => {
        callback();
        const currentItems = this.state.items.slice();
        currentItems.push(res);
        this.setState({ items: currentItems });
      });
  }

  findItem = (itemId) => {
    return this.state.items.findIndex(i => {
      return i.id == itemId;
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
        <ItemList
          items={this.state.items}
          saveItemHandler={this.saveItemHandler}
          deleteItemHandler={this.deleteItemHandler}
          addItemHandler={this.addItemHandler}
        />
      </div>
    );
  }
}

export default App;