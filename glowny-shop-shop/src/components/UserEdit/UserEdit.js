import React from 'react'

import {
  graphql,
  createFragmentContainer,
} from 'react-relay'
import UserEditor from '../UserEditor/index'

class UserEdit extends React.Component {

  render() {
    return(
      <UserEditor { ...this.props } 
        roles={this.props.viewer.roles} 
        user={this.props.viewer.users[0]}>Edit</UserEditor>
    )
  }
}

export default createFragmentContainer(UserEdit, {
  
  viewer: graphql`
    fragment UserEdit_viewer on Viewer {
      roles(type: admin) {
        id
        title
        isSuper
      }
      users(type:admin, id:$userId, first: 1) {
        id
        email
        firstName
        lastName
        roles {
          id
          title
        }
      }
    }
  `,
})