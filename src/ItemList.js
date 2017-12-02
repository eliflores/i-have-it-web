import React, { Component } from 'react';
import { Item } from './Item'
import PropTypes from 'prop-types';
import Grid from 'react-bootstrap/lib/Grid';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

export class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedItem: undefined
        };
    }

    close = () => {
        this.setState({ showModal: false });
    }

    open = (item) => {
        this.setState({ showModal: true, selectedItem: item });
    }

    propTypes = {
        items: PropTypes.object.isRequired
    };

    getItems = () => {
        return this.props.items.map(i => {
            return <Item key={i.id} name={i.name} quantity={i.quantity} onEditItem={() => this.open(i)} />
        });
    };

    render() {
        const items = this.getItems();
        const itemElement = this.state.selectedItem && (
            <span>
                Name: {this.state.selectedItem.name}
                Quantity: {this.state.selectedItem.quantity}
            </span>
        );

        return (
            <div>
                <Grid>
                    {items}
                </Grid>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {itemElement}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
