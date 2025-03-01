import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export default props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="short" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);