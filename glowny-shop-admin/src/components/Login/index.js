import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as types from '../../actions/actionTypes.js'
//import jwt_decode from 'jwt-decode'
import { setUserToken } from '../Common/Cookies'
import debounce from 'lodash.debounce'
import { backendUrlAuth } from '../../../constants.json'

import Login from './Login'


class index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emailError: '',
      passwordError: '',
      email: '',
      password: '',
      buttonClick: false,
    }
    this._login = debounce(this._login, 1500)
  }

  _loginButtonClick = () => {
    this.setState({ buttonClicked: true })
    if (this.state.email !== '' && this.state.password !== '') {
      console.log('Loggining in')
      this.props._updateHomeOnProgressAction(true)
      this._login()
    } 
  }

  _login = async () => {
    try { 
      await fetch(backendUrlAuth, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'email=' + this.state.email + '&password=' + this.state.password + '&site=admin', 
      })
      .then((response) => {
        this.props._updateHomeOnProgressAction(false)
        if ((response.status >= 400 && response.status < 600)) {
          this.setState({
            emailError: ' ',
            passwordError: 'Invalid login. Try again.',
            buttonClicked: false,
          })
          throw new Error('Bad response from server');
        }
        return response.json().then(response => {
          if(response.success && response.token) {
            //var decoded = jwt_decode(response.token)
            //console.log(decoded)
            setUserToken(response.token)
            this.props.history.push('/')
          } else {
            this.setState({
              emailError: ' ',
              passwordError: 'Invalid login. Try again.',
              buttonClicked: false,
            })
            throw new Error('Bad response from server');
          }
        })
      })
    } 
    catch (err) {
      this.props._updateHomeOnProgressAction(false)
      console.log(err)
      //this._changeLoadingStatus(false);
     // response = null;

      this.setState({
          emailError: ' ',
          passwordError: 'Invalid login. Try again.',
          buttonClicked: false,
      })
      throw new Error('Bad response from server');
    }
  }

  _updateField = (name, value) => {
    this.setState({
      [name]: value.target.value,
      emailError: '',
      passwordError: '',
      buttonClicked: false,
    })
    
  }

  render() {
    return (
      <Login 
        updateField={this._updateField} 
        onLoginClicked={this._loginButtonClick}
        {...this.props} {...this.state} />
    )
  }
}

const _updateHomeOnProgressAction = (onProgress) => ({
  type: types.UPDATE_HOME_ON_PROGRESS,
  onProgress: onProgress,
})

const dispatchToProps = (dispatch) => ({
  _updateHomeOnProgressAction: bindActionCreators(_updateHomeOnProgressAction, dispatch),
})

const stateToProps = (state) => ({
  onProgress: state.homeReducer.onProgress,
})

const loginRedux = connect(
  stateToProps,
  dispatchToProps,
)(index);

export default loginRedux
