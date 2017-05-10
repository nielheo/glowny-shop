import React from 'react'
import {
  graphql,
  createFragmentContainer
} from 'react-relay'

import UserList from './UserList'

class Users extends React.Component {
  render() {
    //let dispatch = this.props.dispatch
    //let fetchInProgress = String(this.props.store.get('fetching'));
    //let queryText;
    //let viewer = this.props.store.get('data').toObject()
    //console.log(this.props.store.data)
    console.log(this.props)
    return (
      <div>User List</div>
    )
  }
}

export default createFragmentContainer(Users,
  graphql`
    fragment index on Viewer {
      users(type: admin) {
        id
        firstName
        lastName
        email
      }

    }
  `
)
