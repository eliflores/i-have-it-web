import React, {Component} from 'react';
import {Item} from './Item'
import './ItemList.css';
import PropTypes from 'prop-types';
import Grid from 'react-bootstrap/lib/Grid';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

export class ItemList extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        saveItemHandler: PropTypes.func.isRequired,
        deleteItemHandler: PropTypes.func.isRequired,
        addItemHandler: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedItem: undefined,
            action: 'edit',
        };
    }

    isEditingItem = () => {
        return this.state.action === 'edit';
    }

    saveItem = (event) => {
        event.preventDefault();
        const itemId = event.target.id.value;
        const itemQuantity = event.target.quantity.value;
        const itemName = event.target.name.value;
        const modalClose = () => this.close();

        if (this.isEditingItem()) {
            this.props.saveItemHandler({id: itemId, quantity: itemQuantity})
                .then(modalClose);

        } else {
            this.props.addItemHandler({name: itemName, quantity: itemQuantity})
                .then(modalClose);
        }
    }

    close = () => {
        this.setState({showModal: false});
    }

    open = (item, action) => {
        this.setState({showModal: true, selectedItem: item, action});
    }

    deleteItem = (itemId) => {
        this.props.deleteItemHandler(itemId);
    }

    editItem = (item) => {
        this.open(item, 'edit');
    }

    newItem = () => {
        this.open({name: '', quantity: ''}, 'add');
    }

    renderItems = () => {
        return this.props.items && this.props.items.map(i => {
            return (
                <Item key={i.id}
                      name={i.name}
                      quantity={i.quantity}
                      onEditItem={() => this.editItem(i)}
                      onDeleteItem={() => this.deleteItem(i.id)}/>
            );
        });
    };

    renderModalForm = () => {
        const selectedItem = {...this.state.selectedItem};
        return selectedItem && (
            <span>
                <FormGroup className='i-have-it-item-field'>
                    <ControlLabel>Name:</ControlLabel>
                    <FormControl
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        defaultValue={selectedItem.name}
                        disabled={this.isEditingItem()}
                    />
                </FormGroup>
                <FormGroup className='i-have-it-item-field'>
                    <ControlLabel>Quantity: </ControlLabel>
                    <FormControl
                        name="quantity"
                        type="text"
                        placeholder="Enter quantity"
                        defaultValue={selectedItem.quantity}
                    />
                    <FormControl
                        name="id"
                        type="hidden"
                        defaultValue={selectedItem.id}
                    />
                </FormGroup>
            </span>
        );
    }

    render() {
        const items = this.renderItems();
        const modalTitle = this.isEditingItem() ? 'Edit Item' : 'Add Item';
        const itemElement = this.renderModalForm();

        return (
            <div>
                <div>
                    <Button bsStyle="success" className='fa fa-check pull-center' aria-hidden='true'
                            onClick={this.newItem}> iHaveIt </Button>
                </div>
                <Grid>
                    {items}
                </Grid>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <form onSubmit={(event) => this.saveItem(event)}>
                        <Modal.Header closeButton>
                            <Modal.Title>  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>  {modalTitle}
                            </Modal.Title>
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
};
