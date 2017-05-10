import React, { Component } from 'react';

import {
  QueryRenderer,
  graphql
} from 'react-relay';

import environment from './createRelayEnvironment';
import Feed from './Feed';
import Layout from './components/Layout'
import store from './store/store.js'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme({
  palette: {
    //textColor: grey900,
    //primary1Color: grey900,
    //accent1Color: cyan500,
  },
})


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <QueryRenderer
            environment={environment}

            query={graphql`
              query AppQuery {
                viewer {
                  users(type:admin) {
                    id
                  }
                }
              }
            `}

            render={({error, props}) => {
              if (error) {
                return <div>{error.message}</div>;
              } else if (props) {
                console.log(this.props)
                return (
                  <Layout>
                   </Layout>
                ) 
              }
              return <div>Loading</div>;
            }}
          />
        </MuiThemeProvider>
      </Provider>


    );
  }
}

export default App;
