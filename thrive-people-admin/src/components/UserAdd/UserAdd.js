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
            style={styles.textFieldFullWidth}
          />
          <TextField
            hintText='first name'
            floatingLabelText='First Name'
            style={styles.textFieldHalfWidth}
          />
          <TextField
            hintText='last name'
            floatingLabelText='Last Name'
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
            secondary={true} 
            style={styles.button}
            onClick={this._loginButtonClick} />
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