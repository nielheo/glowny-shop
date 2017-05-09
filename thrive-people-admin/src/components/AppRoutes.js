import React from 'react'
import {
  Router,
  IndexRoute,
  Route,
  Switch,
  Redirect,
  browserHistory,
  applyRouterMiddleware
} from 'react-router'
import useRelay from 'react-router-relay'
import { Provider } from 'react-redux'
import store from '../store/store.js'
//import {grey900, cyan500} from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { getUserToken } from '../components/Common/Cookies'

import RelayStore from '../RelayStore'
import NetworkLayer from '../NetworkLayer'
import { backendUrlGraphql } from '../../constants.json'
import Relay from 'react-relay'

//import EnsureLoggedInContainer from '../components/Common/EnsureLoggedInContainer'
import Layout from '../components/Layout'
import Home from '../components/Home'
import Login from '../components/Login'
import Logout from '../components/Logout'
import NotFound from '../components/NotFound'
import AboutUs from '../components/AboutUs'
import Users from '../components/Users'
import Forgot from '../components/Forgot' 

const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`,
}

const muiTheme = getMuiTheme({
  palette: {
    //textColor: grey900,
    //primary1Color: grey900,
    //accent1Color: cyan500,
  },
})

class AppRoutes extends React.Component {
  state = {
    isLoading: true,
    token: '',
  }

  componentDidMount() {
    this.getToken()
  }

  getToken = async () => {
    let token
    try {
      token = await localStorage.getItem('token')
    } catch (err) {
      token = ''
    }

    if (token && token.length > 0) {
      const networkLayer = new NetworkLayer(
        backendUrlGraphql, {
          headers: {
            token,
          },
      })
      networkLayer.setToken(token)
      RelayStore.reset(networkLayer)

    } else {
      const networkLayer = new NetworkLayer(backendUrlGraphql, {})
      RelayStore.reset(networkLayer)
    }

    this.setState({
      isLoading: false,
      token,
    })
    console.log('token:', token)
  }

  updateToken = (token) => {
    localStorage.setItem('token', token)

    if (token === '' || token === null) {
      const networkLayer = new NetworkLayer(backendUrlGraphql, {})
      RelayStore.reset(networkLayer)
      localStorage.clear()

    } else {
      const networkLayer = new NetworkLayer(
        backendUrlGraphql, {
          headers: {
            token: token,
          },
      })

      networkLayer.setToken(token)
      RelayStore.reset(networkLayer)

    }

    this.setState({
      token,
    })
    // Router.refresh
  }


  routes = (
    <div>
      <Route path='/login' component={Login} />
      <Route path='/logout' component={Logout} />
      <Route path='/forgotpassword' component={Forgot}/>
      <Route path='/404' component={NotFound}/>
      <PrivateRoute exact path='/' component={Home} />
      <PrivateRoute path='/aboutus' component={AboutUs} />
      <Route path='/users' component={Users} queries={ViewerQueries} />
      <PrivateNotFound to='/404'/>
    </div>
    ) 

  render() {
    

    return (
      /*!isLoggedIn && location.pathname !== '/login' ?
        <Redirect to='/login'/>
      :*/
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Layout>
             <Router
                history={browserHistory}
                render={applyRouterMiddleware(useRelay)}
                environment={RelayStore._env}
                onUpdate={() => window.scrollTo(0, 0)}
                routes={this.routes}
              />
            </Layout>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

const PrivateNotFound = ({to, ...rest }) => (
  <Route {...rest} render={props => (
    true//getUserToken() 
    ? (
      <Redirect to={{
        pathname: to,
        state: { from: props.location }
      }}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
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
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default AppRoutes