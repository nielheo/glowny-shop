import React, { Component } from 'react';

import {
  QueryRenderer,
  graphql
} from 'react-relay';

import environment from './createRelayEnvironment';
import Feed from './Feed';

import store from './store/store.js'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Layout from './components/Layout'
import Home from './components/Home'
//import Login from './components/Login'
//import Logout from './components/Logout'
//import NotFound from './components/NotFound'
//import AboutUs from './components/AboutUs'
import Users from './components/Users/Users'
//import Forgot from './components/Forgot' 

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
                  ...Users_viewer
                }
                
              }
            `}

            render={({error, props}) => {
              if (error) {
                return <div>{error.message}</div>;
              } else if (props) {
                console.log(props.viewer)
                return (
                  <Layout>
                    <Users viewer={props.viewer} />
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
