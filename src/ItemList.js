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
            action: 'edit',
        };
    }

    saveItem = (event) => {
        event.preventDefault();
        const itemQuantity = event.target.quantity.value;
        const itemId = event.target.id.value;
        this.props.saveItemHandler({ id: itemId, quantity: itemQuantity }, () => {
            this.close();
        });

    }

    close = () => {
        this.setState({ showModal: false });
    }

    open = (item, action) => {
        this.setState({ showModal: true, selectedItem: item, action });
    }

    deleteItem = (itemId) => {
        this.props.deleteItemHandler(itemId);
    }

    editItem = (item) => {
        this.open(item, 'edit');
    }

    newItem = () => {
        this.open({ name: '', quantity: 0 }, 'add');
    }

    propTypes = {
        items: PropTypes.object.isRequired,
        saveItemHandler: PropTypes.func.isRequired,
        deleteItemHandler: PropTypes.func.isRequired
    };

    renderItems = () => {
        return this.props.items && this.props.items.map(i => {
            return (
                <Item key={i.id}
                    name={i.name}
                    quantity={i.quantity}
                    onEditItem={() => this.editItem(i)}
                    onDeleteItem={() => this.deleteItem(i.id)} />
            );
        });
    };

    render() {
        const items = this.renderItems();
        const editingItem = this.state.action == 'edit';
        const itemElement = this.state.selectedItem && (
            <span>
                <FormGroup className='i-have-it-item-field'>
                    <ControlLabel>Name:</ControlLabel>
                    <FormControl
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        defaultValue={this.state.selectedItem.name}
                        disabled={editingItem}
                    />
                </FormGroup>
                <FormGroup className='i-have-it-item-field'>
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
                <Button bsStyle="success" className='fa fa-plus pull-right' aria-hidden='true' onClick={this.newItem}></Button>
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
