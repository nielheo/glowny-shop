import React from 'react'
import { connect } from 'react-redux'
import { getGraph } from '../../actions/graphql.js'

import UserList from './UserList'

class Users extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(getGraph(`
      {
        viewer {
          users(type:admin) {
            id
            email
            firstName
            lastName
            isActive
            roles {
              id title
            }
          }
        }
      }`)
    );
  }

  render() {
    //let dispatch = this.props.dispatch
    //let fetchInProgress = String(this.props.store.get('fetching'));
    //let queryText;
    //let viewer = this.props.store.get('data').toObject()
    //console.log(this.props.store.data)
    const { users } = this.props.store.data
    //console.log(users)
    return (
      <UserList users={users} />
    )
  }
}

const mapStateToProps = (state) => ({
  store: state.queryReducer,
})

const usersRedux = connect(
  mapStateToProps,
)(Users)

export default usersRedux

