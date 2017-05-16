import React from 'react'

import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from '../../createRelayEnvironment'

import UserAdd from './UserAdd'

class index extends React.Component {
  render() {
    return(
      
      <QueryRenderer
        environment={environment}
        query={graphql`
          query indexUserAddQuery {
            viewer {
              ...UserAdd_viewer
            }
          }
        `}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return (
              <UserAdd viewer={props.viewer} />
            ) 
          }
          return <div>Loading</div>
        }}
      />
    )
  }
}

export default index