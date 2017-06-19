import React from 'react'

import {
  QueryRenderer,
  graphql,
} from 'react-relay'
import environment from '../../createRelayEnvironment'
import Constants from '../../../constants'
import ProductAdd from './ProductAdd'

class index extends React.Component {
  render() {
    return(
      <QueryRenderer
        environment={environment}
        query={graphql`
          query indexProductAddQuery ($shopCode: String!) {
            viewer {
              ...ProductAdd_viewer
              shops(code:$shopCode) {
                id
              }
            }
          }
        `}
        variables={{
          shopCode: Constants.shopCode,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return (
              <ProductAdd { ...this.props } viewer={props.viewer} />
            ) 
          }
          return <div>Loading</div>
        }}
      />
    )
  }
}

export default index