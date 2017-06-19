import React from 'react'

import {
  QueryRenderer,
  graphql,
} from 'react-relay'
import environment from '../../createRelayEnvironment'
import Constants from '../../../constants'
import ProductEdit from './ProductEdit'

class index extends React.Component {
  render() {
    return(
      <QueryRenderer
        environment={environment}
        query={graphql`
          query indexProductEditQuery ($id: String!, $shopCode: String!) {
            viewer {
              ...ProductEdit_viewer
              products(shopCode:$shopCode, id: $id) {
                id
              }
            }
          }
        `}
        variables={{
          id: this.props.match.params.id,
          shopCode: Constants.shopCode,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return (
              <ProductEdit { ...this.props } viewer={props.viewer} />
            ) 
          }
          return <div>Loading</div>
        }}
      />
    )
  }
}

export default index