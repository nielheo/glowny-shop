import React from 'react'
import {
  graphql,
  createFragmentContainer
} from 'react-relay'



import UserList from './UserList'

class Users extends React.Component {
  render() {
    return (
      <UserList users={this.props.viewer.users} />
    )
  }
}

export default createFragmentContainer(Users, {
  viewer: graphql`
    fragment Users_viewer on Viewer {
      users(type: admin) {
        ...UserList_users
      }
    }
  `
})
