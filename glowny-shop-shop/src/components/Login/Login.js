import React from 'react'

import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
//import {yellow400} from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  container: {
    textAlign: 'left',
    top: 100,
    position: 'relative',
    maxWidth: 400,
    margin: 'auto',
    padding: 30,
    paddingBottom: 75,
    paddingTop: 50,
  },
  header: {
    fontSize: '2em',
  },
  button: {
    marginTop: 12,
    float: 'right',
  },
  link: {
    top: 20,
    color: '#4285f4',
    textDecoration: 'none',
    cursor: 'pointer',
    position: 'relative',
  },
}


class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  _updateField = (name, value) => {
    console.log(this)
    this.props.updateField(name, value)
  }

  _onClickHandler = () => {
    this.props.onLoginClicked()
  }

  render() {
    //const { onLoginClicked } = this.props
    console.log(this.props)
    return (
      <Paper style={styles.container}>
        <div style={styles.header} >Login</div>
        <TextField
          hintText='email'
          fullWidth={true}
          floatingLabelText='Email'
          errorText={ (this.props.buttonClicked && this.props.email.length === 0 && 'Enter an email')
            || this.props.emailError }
          value={this.props.email}
          onChange={this._updateField.bind(this, 'email')}
        />
        <TextField
          hintText='password'
          fullWidth={true}
          floatingLabelText='Password'
          errorText={ (this.props.buttonClicked && this.props.password.length === 0 && 'Enter a password')
            || this.props.passwordError }
          onChange={this._updateField.bind(this, 'password')}
          value={this.props.password}
          type='password'
        />
        <div >
          <Link style={styles.link} to='forgotpassword'>Forgot password?</Link>
          <RaisedButton 
            label='Login'
            //fullWidth={true} 
            disabled={this.props.buttonClicked}
            primary={true} 
            style={styles.button}
            onClick={this._onClickHandler} />
        </div>
      </Paper>
    )
  }
}

export default Login
