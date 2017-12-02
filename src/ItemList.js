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
            <form>
                <FormGroup>
                    <ControlLabel>Name:</ControlLabel> {this.state.selectedItem.name}
                </FormGroup>
                <FormGroup className='Item-quantity'>
                    <ControlLabel>Quantity: </ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.selectedItem.quantity}
                        placeholder="Enter quantity"
                    />
                </FormGroup>
            </form>
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
