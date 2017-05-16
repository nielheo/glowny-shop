import React from 'react'

import {
  graphql,
  createFragmentContainer,
} from 'react-relay'
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

class UserAdd extends React.Component {
  constructor(props) {
    super(props)
    const roles = props.viewer.roles.filter(role => !role.isSuper).map(role => {
      return {
        ...role,
        checked: false,
        disabled: false,
      }
    })
    const superRoles = props.viewer.roles.filter(role => role.isSuper).map(role => {
      return {
        ...role,
        checked: false,
        disabled: false,
      }
    })
    this.state = {
      roles: roles,
      superRoles: superRoles,
      email: '',
      firstName: '',
      lastName: '',
    }
  }

  _handleSuperRoleClicked = (id, event) => {
    var roles = []
    this.state.roles.map(role => {
      roles.push({
        ...role,
        disabled: event.target.checked,
      })
    })
    var supers = []
    this.state.superRoles.map(role => {
      supers.push({
        ...role,
        checked: id === role.id ? event.target.checked : role.checked,
      })
    })

    this.setState({
      roles: roles,
      superRoles: supers,
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
    var input = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      type: 'admin',
      roles: this.state.superRoles.filter(s => s.checked).map(s => s.id)
        || this.state.roles.filter(s => s.checked).map(s => s.id)
    }
    AddUserMutation(environment, input)
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

export default createFragmentContainer(UserAdd, {
  viewer: graphql`
    fragment UserAdd_viewer on Viewer {
      roles(type: admin) {
        id
        title
        isSuper
      }
    }
  `
})