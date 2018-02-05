import React, {Component} from 'react';
import './App.css';
import {ItemList} from './ItemList'
import withApi from './AppDecorator'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    saveItemHandler = (item) => {
        return this.props.saveItem(item).then(() => {
            const currentItems = this.state.items.slice();
            const itemIndex = this.findItem(item.id);
            currentItems[itemIndex] = {...currentItems[itemIndex], ...item};
            this.setState({items: currentItems});
            return Promise.resolve();
        });
    };

    deleteItemHandler = (itemId) => {
        this.props.deleteItem(itemId)
            .then(() => {
                const currentItems = this.state.items.slice();
                const itemIndex = this.findItem(itemId);
                currentItems.splice(itemIndex, 1);
                this.setState({items: currentItems});
            });
    };

    addItemHandler = (item) => {
        return this.props.addItem(item)
            .then(res => {
                const currentItems = this.state.items.slice();
                currentItems.push(res);
                this.setState({items: currentItems});
                return Promise.resolve();
            });
    };

    findItem = (itemId) => {
        return this.state.items.findIndex(i => {
            return i.id == Number(itemId);
        });
    };

    componentDidMount() {
        this.props.fetchItems().then(res => {
            this.setState({items: res});
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                    <span className="App-title"> iHave It</span>
                </header>
                <ItemList
                    items={this.state.items}
                    saveItemHandler={this.saveItemHandler}
                    deleteItemHandler={this.deleteItemHandler}
                    addItemHandler={this.addItemHandler}
                />
                <footer className="App-footer">
                    <div className="container">
                        With <i className="fa fa-heart"></i>
                    </div>
                </footer>
            </div>
        );
    }
}

export default withApi(App);