import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Item.css';

export class Item extends Component {
    propTypes = {
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired
    };

    render() {
        return (
            <div className='Item'>
                <span className='Item-name'>{this.props.name}</span>
                <span>: </span>
                <span className='Item-quantity'>{this.props.quantity}</span>
            </div>
        );
    }
};
