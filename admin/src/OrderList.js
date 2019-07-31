import React from 'react';
import { List, Datagrid, TextField, DateField, EditButton } from 'react-admin';

const OrderList = props => {
    return (
    <List {...props} title="Order List">
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <DateField source="createdAt" />
            <EditButton />
        </Datagrid>
    </List>
    )
};

export default OrderList;