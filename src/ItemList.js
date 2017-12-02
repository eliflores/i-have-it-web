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
            showModal: false
        };
    }

    close = () => {
        this.setState({ showModal: false });
    }

    open = () => {
        this.setState({ showModal: true });
    }

    propTypes = {
        items: PropTypes.object.isRequired
    };

    getItems = () => {
        console.log(`This is the items ${this.props.items}`);
        return this.props.items.map(i => {
            console.log(`This is the item name ${i.name}`);
            console.log(`This is the item name ${i.quantity}`);
            return <Item key={i.id} name={i.name} quantity={i.quantity} />
        });
    };

    render() {
        const items = this.getItems();
        return (
            <div>
                <Grid>
                    {items}
                </Grid>
                <Button onClick={this.open}>Open</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Foo Bla
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
