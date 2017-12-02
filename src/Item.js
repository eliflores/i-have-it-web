import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Item.css';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

export class Item extends Component {
    propTypes = {
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        onEditItem: PropTypes.func.isRequired
    };

    render() {
        return (
            <Row className='Item show-grid'>
                <Col md={6} className='Col-name'>
                    <span className='Item-name'>{this.props.name}</span>
                </Col>
                <Col md={1} className='Col-quantity'>
                    <span className='Item-quantity'>{this.props.quantity}</span>
                </Col>
                <Col md={5} className='Col-actions'>
                    <Button bsStyle="info" className='fa fa-pencil fa-1 btn-sm' aria-hidden='true' onClick={this.props.onEditItem}></Button>
                    <Button bsStyle="danger" className='fa fa-window-close-o fa-1 btn-sm' aria-hidden='true'></Button>
                </Col>
            </Row>
        );
    }
};
