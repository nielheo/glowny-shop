import React from 'react'

import {
  QueryRenderer,
  graphql,
} from 'react-relay'
import environment from '../../createRelayEnvironment'

import UserEdit from './UserEdit'

class index extends React.Component {
  render() {
    return(
      
      <QueryRenderer
        environment={environment}
        query={graphql`
          query indexUserEditQuery ($userId: String) {
            viewer {
              ...UserEdit_viewer
              users(type:admin, id: $userId) {
                id
              }
            }
          }
        `}
        variables={{
          userId: this.props.match.params.userId,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return (
              <UserEdit viewer={props.viewer} />
            ) 
          }
          return <div>Loading</div>
        }}
      />
    )
  }
}

export default index