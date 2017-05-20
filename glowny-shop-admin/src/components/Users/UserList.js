import React from 'react'
import UserItem from './UserItem'
import Snackbar from 'material-ui/Snackbar'
import {
  graphql,
  createFragmentContainer,
} from 'react-relay'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table'

const styles = {
  emptyRow: {
    textAlign: 'center',
    width: '100%',
    color: '#999999',
    paddingTop: 20,
  },
}

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      snackbarOpen: false,
      snackbarMessage: '',
    }
  }

  _handleRequestClose = () => {
    this.setState({ snackbarOpen: false })
  }

  _handleSetSnackbar = (open, message) => {
    this.setState({
      snackbarOpen: open,
      snackbarMessage: message,
    })
  }

  render()  {
    const { users } = this.props
    return (
      <div>
        <Table fixedHeader={true} selectable={false}>
          <TableHeader displaySelectAll={false}
              adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Role(s)</TableHeaderColumn>
              <TableHeaderColumn>Active</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              users && users.map(user => 
                <UserItem key={user.id} user={user} setSnackbar={this._handleSetSnackbar} /> )
            }
          </TableBody>
        </Table>
        { (!users || !users.length) && 
          <div style={styles.emptyRow}>No data to display</div>
        }
        <Snackbar
            open={this.state.snackbarOpen}
            message={this.state.snackbarMessage}
            autoHideDuration={4000}
            onRequestClose={this._handleRequestClose}
          />
      </div>
    )
  }
}

export default createFragmentContainer(UserList, {
  users: graphql`
    fragment UserList_users on User @relay(plural: true) {
      id
      ...UserItem_user
    }
  `,
})