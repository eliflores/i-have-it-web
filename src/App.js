import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import axios from 'axios'

const Patita = () => {
  return (
    <div>
      hola mundo feliz
  </div>
  );
}

class Greeting extends Component {
  render() {
    return (
      <span>
        <h1>Hello, {this.props.name}</h1>
        <h2>{this.props.content.food}</h2>
        <h2>{this.props.content.drink}</h2>
      </span>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.object
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greetings: [],
      goodbyes: "good bye",
      count: 0,
      stuff: {}
    };
  }

  getGreetings = () => {
    return this.state.greetings.map((g) => {
      return <Greeting key={g.id} name={g.name} content={g.content} />
    });
  };

  decreaseCount = (event, extraParam) => {
    console.log(`I am the extra param ${extraParam}`)
    this.setState({ count: this.state.count - 1 });
  };

  increaseCount = (event) => {
    console.log(`I am the event ${event}`)
    this.setState({ count: this.state.count + 1 });
  };

  componentDidMount() {
    console.log('I am mounted')
    const greetings = [
      {
        id: 1,
        name: 'Fernando',
        content: { food: 'pizza', drink: 'beer' }
      },
      {
        id: 2,
        name: 'Fernando',
        content: { food: 'crepe', drink: 'wine' }
      },
      {
        id: 3,
        name: 'Anita',
        content: { food: 'mole', drink: 'sunny side' }
      }
    ];

    const componentThis = this
    const stuff = axios.get('https://httpbin.org/get')
      .then((res) => {
        componentThis.setState({ greetings, stuff: res.data });
        console.log(`stuff=${componentThis.state.stuff}`)
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log('I am render')
    const greetings = this.getGreetings();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Patita />
        {greetings}
        <div>{this.state.goodbyes}</div>
        <button onClick={(event) => this.decreaseCount(event, 'extra-param')}>-</button>
        <button onClick={(event) => this.increaseCount(event)}>+</button>
        <div>count: {this.state.count}</div>
        <div>{this.state.stuff.url}</div>
      </div>
    );
  }
}

export default App;
