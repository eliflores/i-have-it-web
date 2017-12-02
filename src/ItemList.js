import React, { Component } from 'react';
import { Item } from './Item'
import './ItemList.css';
import PropTypes from 'prop-types';
import Grid from 'react-bootstrap/lib/Grid';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

export class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedItem: undefined,
        };
    }

    saveItem = (event) => {
        event.preventDefault();
        const itemQuantity = event.target.quantity.value;
        const itemId = event.target.id.value;
        this.props.saveItemHandler({id: itemId, quantity: itemQuantity}, () => {
            this.close();
        });
        
    }

    close = () => {
        this.setState({ showModal: false });
    }

    open = (item) => {
        this.setState({ showModal: true, selectedItem: item });
    }

    deleteItem = (itemId) => {
        this.props.deleteItemHandler(itemId);
    }

    propTypes = {
        items: PropTypes.object.isRequired,
        saveItemHandler: PropTypes.func.isRequired,
        deleteItemHandler: PropTypes.func.isRequired
    };

    renderItems = () => {
        return this.props.items && this.props.items.map(i => {
            return <Item key={i.id} name={i.name} quantity={i.quantity} onEditItem={() => this.open(i)} onDeleteItem={() => this.deleteItem(i.id)} />
        });
    };

    render() {
        const items = this.renderItems();
        const itemElement = this.state.selectedItem && (
            <span>
                <FormGroup>
                    <ControlLabel>Name:</ControlLabel> {this.state.selectedItem.name}
                </FormGroup>
                <FormGroup className='Item-quantity'>
                    <ControlLabel>Quantity: </ControlLabel>
                    <FormControl
                        name="quantity"
                        type="text"
                        placeholder="Enter quantity"
                        defaultValue={this.state.selectedItem.quantity}
                    />
                    <FormControl
                        name="id"
                        type="hidden"
                        defaultValue={this.state.selectedItem.id}
                    />
                </FormGroup>
            </span>
        );

        return (
            <div>
                <Grid>
                    {items}
                </Grid>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <form onSubmit={(event) => this.saveItem(event)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemElement}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit'>Save</Button>
                            <Button onClick={this.close}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}
