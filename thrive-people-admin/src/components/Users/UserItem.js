import React from 'react'

import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import {
  graphql,
  createFragmentContainer
} from 'react-relay'
import Toggle from 'material-ui/Toggle'
import UpdateUserActiveMutation from './UpdateUserActiveMutation'
import environment from '../../createRelayEnvironment'

class UserItem extends React.Component 
{ 
  _isActiveClickHandler = (value, e) => {
    this.props.setSnackbar(true, value + ' is ' + (e.target.checked ? 'checked' : 'not checked'))
    UpdateUserActiveMutation(environment, value, e.target.checked)
  }
  
  render() {
    const { user } = this.props
    return(
        <TableRow>
          <TableRowColumn>{user.firstName}</TableRowColumn>
          <TableRowColumn>{user.lastName}</TableRowColumn>
          <TableRowColumn>{user.email}</TableRowColumn>
          <TableRowColumn>{ user.roles && user.roles.map(role => role.title).join('; ')}</TableRowColumn>
          <TableRowColumn>
            <Toggle defaultToggled={user.isActive} 
                onClick={this._isActiveClickHandler.bind(this, user.id)}/>
          </TableRowColumn>
        </TableRow>
    )
  }

}

export default createFragmentContainer(UserItem, {
  user: graphql`
    fragment UserItem_user on User {
      id
      firstName
      lastName
      email
      isActive
      roles {
        id
        title
      }
    }
  `
})