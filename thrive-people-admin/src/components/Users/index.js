import React, { Component } from 'react';

import {
  QueryRenderer,
  graphql
} from 'react-relay'

import environment from '../../createRelayEnvironment'
import Users from './Users'

export default class index extends Component { 

  render() {
    return(
      <QueryRenderer
        environment={environment}
        query={graphql`
          query indexQuery {
            viewer {
              ...Users_viewer
            }
          }
        `}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return (
              <Users viewer={props.viewer} />
            ) 
          }
          return <div>Loading</div>;
        }}
      />
    )
  }
}
