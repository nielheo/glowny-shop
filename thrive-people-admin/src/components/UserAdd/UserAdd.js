import React from 'react'

import {
  graphql,
  createFragmentContainer,
} from 'react-relay'
import UserEditor from '../UserEditor/index'

class UserAdd extends React.Component {
  render() {
    console.log(this.props.viewer.roles)
    return(
      <UserEditor roles={this.props.viewer.roles} />
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