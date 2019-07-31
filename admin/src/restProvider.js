import { stringify } from 'query-string';
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    DELETE,
    GET_MANY,
    GET_MANY_REFERENCE,
} from 'react-admin';

const apiUrl = process.env.REACT_APP_API_ENTRYPOINT;

export default (type, resource, params) => {
    let url = '';
    const options = {
        headers : new Headers({
            Accept: 'application/json',
        }),
    };

    let query;

    console.log(type)

    switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;

            query = {
                sort: stringify([field, order]),
                page,
                itemsPerPage: perPage,
            };
            url = `${apiUrl}/${resource}?${stringify(query)}`;
            break;
        }
        case GET_ONE:
            url = `${apiUrl}/${resource}/${params.id}`;
            break;
        case CREATE:
            url = `${apiUrl}/${resource}`;
            options.method = 'POST';
            options.headers = {
                'Content-Type': 'application/json'
            }

            const createData = { ...params.data };

            console.log(params.data)
            options.body = JSON.stringify(createData);
            break;
        case UPDATE:
            url = `${apiUrl}/${resource}/${params.id}`;
            options.method = 'PUT';
            options.headers = {
                'Content-Type': 'application/json'
            }

            const data = { ...params.data };
            data.updatedAt = new Date();

            options.body = JSON.stringify(data);
            break;
        case DELETE:
            url = `${apiUrl}/${resource}/${params.id}`;
            options.method = 'DELETE';
            break;
        case GET_MANY: {
            query = {
                filter: JSON.stringify({ id: params.ids }),
            };
            url = `${apiUrl}/${resource}?${stringify(query)}`;
            break;
        }
        case GET_MANY_REFERENCE: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([
                    (page - 1) * perPage,
                    page * perPage - 1,
                ]),
                filter: JSON.stringify({
                    ...params.filter,
                    [params.target]: params.id,
                }),
            };
            url = `${apiUrl}/${resource}?${stringify(query)}`;
            break;
        }
        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }

    return fetch(url, options)
        .then(res => res.json())
        .then(response => ({
                data: response,
                total: response.length
            }));
}