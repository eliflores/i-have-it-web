import React, { Component } from 'react';
import { Item } from './Item'
import PropTypes from 'prop-types';
import Grid from 'react-bootstrap/lib/Grid';

export class ItemList extends Component {
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
            <Grid>
                {items}
            </Grid>
        );
    }
}
