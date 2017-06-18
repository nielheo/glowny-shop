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
import Product from './components/Product'
import ProductAdd from './components/ProductAdd'
import ProductEdit from './components/ProductEdit'
import Users from './components/Users'
import UserAdd from './components/UserAdd'
import UserEdit from './components/UserEdit'
import Forgot from './components/Forgot' 
import Material from './components/Material'

import {
//  cyan500, 
//  grey100,  grey500,
//  white, darkBlack, fullBlack, yellowA700,
 // fullBlack, red100, blue100,
} from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#00796B',
    primary2Color: '#009688',
    primary3Color: '#B2DFDB',
    accent1Color: '#FF5722',
    accent2Color: '#FFCCBC',
    accent3Color: '#E64A19',
    textColor: '#212121',
    alternateTextColor: '#FFFFFF',
    canvasColor: '#FFFFFF',
    borderColor: '#BDBDBD',
    /*
    //disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: fullBlack,
    //clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
    */
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
                  <Route path='/material' component={Material}/>
                  <Route path='/forgotpassword' component={Forgot}/>
                  <Route path='/404' component={NotFound}/>
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute path='/aboutus' component={AboutUs} />
                  <PrivateRoute path='/users/add' component={UserAdd} />
                  <PrivateRoute path='/users/edit/:userId' component={UserEdit} />
                  <PrivateRoute path='/users' component={Users} />
                  <PrivateRoute path='/product/add' component={ProductAdd} />
                  <PrivateRoute path='/product/edit/:id' component={ProductEdit} />
                  <PrivateRoute path='/product' component={Product} />
                  
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
      }} { ...this.props } />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }} { ...this.props } />
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
