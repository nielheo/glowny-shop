import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import store from './store/store.js'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { getUserToken } from './components/Common/Cookies'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import Logout from './components/Logout'
import NotFound from './components/NotFound'
import AboutUs from './components/AboutUs'
import Users from './components/Users'
import UserAdd from './components/UserAdd'
import UserEdit from './components/UserEdit'
import Forgot from './components/Forgot' 

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
          <Router>
            <Layout>
              <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                <Switch>
                  <Route path='/login' component={Login}/>
                  <Route path='/logout' component={Logout}/>
                  <Route path='/forgotpassword' component={Forgot}/>
                  <Route path='/404' component={NotFound}/>
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute path='/aboutus' component={AboutUs} />
                  <PrivateRoute path='/users/add' component={UserAdd} />
                  <PrivateRoute path='/users/edit/:userId' component={UserEdit} />
                  <PrivateRoute path='/users' component={Users} />
                  <PrivateNotFound to='/404'/>
                </Switch>
              </ReactCSSTransitionGroup>
            </Layout>
          </Router>
        </MuiThemeProvider>
      </Provider>


    )
  }
}

const PrivateNotFound = ({ to, ...rest }) => (
  <Route {...rest} render={props => (
    getUserToken() 
    ? (
      <Redirect to={{
        pathname: to,
        state: { from: props.location },
      }}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }}/>
    )
  )}/>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    getUserToken('User_Token') ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }}/>
    )
  )}/>
)

export default App
