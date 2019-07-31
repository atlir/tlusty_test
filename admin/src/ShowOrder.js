import React from 'react';
import { Show, SimpleShowLayout, TextField, DateField } from 'react-admin';

export default props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="short" />
            <TextField source="description" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </SimpleShowLayout>
    </Show>
);