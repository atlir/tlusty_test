import React, {Component} from 'react';
import { Admin, Resource } from 'react-admin';
import parseHydraDocumentation from '@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation';
import { hydraClient, fetchHydra as baseFetchHydra  } from '@api-platform/admin';
import restProvider from './restProvider'
import OrderEdit from './OrderEdit';
import OrderList from './OrderList';
import Dashboard from './Dashboard';
import CreateOrder from './CreateOrder';
import ShowOrder from './ShowOrder';

export default class App extends Component {
    state = {
        api: null
    };

    async apiDocumentationParser(entrypoint) {
        return await parseHydraDocumentation(entrypoint).then( ({ api }) => ({ api }) );
    }

    fetchHydra(url) {
        return baseFetchHydra(url, {})
    }

    dataProvider(api) { 
        return hydraClient(api, this.fetchHydra); 
    }

    async componentDidMount() {
        const data = await this.apiDocumentationParser(process.env.REACT_APP_API_ENTRYPOINT);

        this.setState({
            api: data.api
        })
    }

    render() {
        if (this.state.api) {
            return (
                <Admin dashboard={Dashboard} api={this.state.api} dataProvider= { restProvider }>                
                    <Resource name="orders" show={ ShowOrder } create={ CreateOrder } list={ OrderList } edit={ OrderEdit } />
                </Admin>
            )
        } else {
            return <div>Loading...</div>
        }
        
    }
}
