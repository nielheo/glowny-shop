import React from 'react'

import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Roles from './Roles'

import AddUserMutation from './AddUserMutation'
import environment from '../../createRelayEnvironment'

const styles = {
  addButton: {
    float: 'right',
  },
  rowHeader: {
    display: 'table',
    width: '100%', /*Optional*/
    tableLayout: 'fixed', /*Optional*/
    marginBottom: 15,
  },
  column: {
    width: '50%',
    display: 'table-cell',
    fontSize: '1.5em',
  },
  textFieldFullWidth: {
    width: '100%',
  },
  textFieldHalfWidth: {
    width: '50%',
  },
  container: {
    textAlign: 'left',
    position: 'relative',
    maxWidth: 650,
    margin: 'auto',
    padding: 25,
    paddingBottom: 75,
    paddingTop: 30,
  },
  button: {
    marginTop: 12,
    float: 'right',
    marginLeft: 12,
  },
  link: {
    top: 20,
    color: '#4285f4',
    textDecoration: 'none',
    cursor: 'pointer',
    position: 'relative',
    float: 'right',
    marginRight: 10,
  },
}

class index extends React.Component {
  constructor(props) {
    super(props)
    const {user} = props

    const superRoles = props.roles.filter(role => role.isSuper).map(role => {
      return {
        ...role,
        checked: user ? user.roles.filter(userRole => userRole.id === role.id).length > 0 : false,
        disabled: false,
      }
    })
    const roles = props.roles.filter(role => !role.isSuper).map(role => {
      return {
        ...role,
        checked: user ? user.roles.filter(userRole => userRole.id === role.id).length > 0 : false,
        disabled: superRoles.filter(superRole => superRole.checked).length > 0,
      }
    })
    
    this.state = {
      roles: roles,
      superRoles: superRoles,
      email: user && user.email,
      firstName: user && user.firstName,
      lastName: user && user.lastName,
    }
  }

  _handleSuperRoleClicked = (id, event) => {
    var roles = []
    this.state.roles.map(role => 
      roles.push({
        ...role,
        disabled: event.target.checked,
      })
    )
    var superRoles = []
    this.state.superRoles.map(role => 
      superRoles.push({
        ...role,
        checked: id === role.id ? event.target.checked : role.checked,
      }))
    

    this.setState({
      roles,
      superRoles,
    })
  }

  _handleRoleClicked = (id, event) => {
    var roles = []
    this.state.roles.map(role => {
      roles.push({
        ...role,
        checked: id === role.id ? event.target.checked : role.checked,
      })
    })

    this.setState({
      roles: roles,
    })
  }

  _handleValueChanged = (field, event) => {
    this.setState({
      [field]: event.target.value,
    })
  }

  _handleSubmit = () => {
    var roles = this.state.superRoles.filter(s => s.checked).map(s => s.id)
    if (roles.length === 0)
      roles = this.state.roles.filter(s => s.checked).map(s => s.id)
    console.log(this.state)
    console.log(roles)

    var input = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      type: 'admin',
      roles: roles
    }
    var a = AddUserMutation(environment, input)
    console.log(a)
  }

  render() {
    const { roles } = this.state
    const { superRoles } = this.state
    return(
      <Paper style={styles.container}>
          <div style={styles.rowHeader}>
            <div style={styles.column}>
              Add User
            </div>
          </div>
          <TextField
            hintText='email'
            floatingLabelText='Email'
            value={this.state.email}
            onChange={this._handleValueChanged.bind(this, 'email')}
            style={styles.textFieldFullWidth}
          />
          <TextField
            hintText='first name'
            floatingLabelText='First Name'
            value={this.state.firstName}
            onChange={this._handleValueChanged.bind(this, 'firstName')}
            style={styles.textFieldHalfWidth}
          />
          <TextField
            hintText='last name'
            floatingLabelText='Last Name'
            value={this.state.lastName}
            onChange={this._handleValueChanged.bind(this, 'lastName')}
            style={styles.textFieldHalfWidth}
          />
          <Roles 
              roles={roles} 
              superRoles={superRoles} 
              onSuperRoleChecked={this._handleSuperRoleClicked}
              onRoleChecked={this._handleRoleClicked} />
          <RaisedButton 
            label='Submit'
            //fullWidth={true} 
            onClick={this._handleSubmit}
            secondary={true} 
            style={styles.button} />
          <Link style={styles.link} to='/users'>Cancel</Link>
        </Paper>
    )
  }
}

export default index