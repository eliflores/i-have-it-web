import React from 'react';

import {fetchItems, saveItem, deleteItem, addItem} from './api-service';

export default function apiComponent(ComponentToDecorate) {
    return class extends React.Component {
        render() {
            const apiFunctions = {fetchItems, saveItem, deleteItem, addItem};
            return <ComponentToDecorate {...apiFunctions} {...this.props}/>
        }
    }
}

