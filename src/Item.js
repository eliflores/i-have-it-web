import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Item.css';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export class Item extends Component {
    propTypes = {
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired
    };

    render() {
        return (
            <Row className='Item show-grid'>
                <Col xs={6} className='Col-name'>
                    <span className='Item-name'>{this.props.name}</span>
                </Col>
                <Col xs={1} className='Col-quantity'>
                    <span className='Item-quantity'>{this.props.quantity}</span>
                </Col>
                <Col xs={3} className='Col-actions'>Foo</Col>
            </Row>
        );
    }
};
