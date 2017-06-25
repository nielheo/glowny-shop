import React from 'react'
import { withRouter } from 'react-router'

import {
  QueryRenderer,
  graphql,
} from 'react-relay'

import environment from '../../createRelayEnvironment'
import Products from './Products'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import Constants from '../../../constants'

const styles = {
  addButton: {
    float: 'right',
  },
  row: {
    display: 'table',
    width: '100%', /*Optional*/
    tableLayout: 'fixed', /*Optional*/
  },
  rowHeader: {
    display: 'table',
    width: '100%', /*Optional*/
    tableLayout: 'fixed', /*Optional*/
    marginBottom: 15,
  },
  column: {
    width: '50%',
    display: 'table-cell',
    paddingLeft: 10,
    fontSize: '1.4em',
  },
  columnRight: {
    width: '50%',
    display: 'table-cell',
    textAlign: 'right',
  },
}

class IndexPage extends React.Component {
  render() {
    console.log('/Product')
    return(
      <QueryRenderer
        environment={environment}
        query={graphql`
          query indexProductsQuery ($shopCode: String!) {
            viewer {
              ...Products_viewer
              products(shopCode:$shopCode) {
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
              <section>
                <div style={styles.rowHeader}>
                  <div style={styles.column}>
                    Products
                  </div>
                  <div style={styles.columnRight}>
                    <RaisedButton 
                        label='Add Product'
                        href='/product/add'
                        secondary={true} />
                  </div>
                </div>
                <Divider />
                <div style={styles.row}>
                  <Products viewer={props.viewer} />
                </div>
              </section>
            ) 
          }
          return <div>Loading</div>
        }}
      />
    )
  }
}

export default withRouter(IndexPage)
