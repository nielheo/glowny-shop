import React, { Component } from 'react'

import {
  QueryRenderer,
  graphql,
} from 'react-relay'

import environment from '../../createRelayEnvironment'
import Users from './Users'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'


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

export default class index extends Component { 

  render() {
    return(
      <QueryRenderer
        environment={environment}
        query={graphql`
          query indexUsersQuery {
            viewer {
              ...Users_viewer
            }
          }
        `}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return (
              <section>
                <div style={styles.rowHeader}>
                  <div style={styles.column}>
                    Users
                  </div>
                  <div style={styles.columnRight}>
                    <RaisedButton 
                        label='Add User'
                        href='/users/add'
                        secondary={true} />
                  </div>
                </div>
                <Divider />
                <div style={styles.row}>
                  <Users viewer={props.viewer} />
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
