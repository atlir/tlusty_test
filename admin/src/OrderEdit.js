import React from 'react';
import { Edit, SimpleForm, DisabledInput, TextInput, LongTextInput } from 'react-admin';


export default props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput label="Id" source="id" />
            <TextInput source="title" />
            <LongTextInput source="description" />
        </SimpleForm>
    </Edit>
)