import React from 'react'

import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'

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
    fontSize: '1.5em',
  },
  columnRight: {
    width: '50%',
    display: 'table-cell',
    textAlign: 'right',
  },
  textFieldFullWidth: {
    width: '100%',
  },
  textFieldHalfWidth: {
    width: '50%',
  },
}

class index extends React.Component {
  render() {
    return(
      <section>
        <div style={styles.rowHeader}>
          <div style={styles.column}>
            Add User
          </div>
        </div>
        <TextField
          hintText='email'
          floatingLabelText='Email'
          style={styles.textFieldFullWidth}
        />
        <TextField
          hintText='first name'
          floatingLabelText='First Name'
          style={styles.textFieldHalfWidth}
        />
        <TextField
          hintText='last name'
          floatingLabelText='Last Name'
          style={styles.textFieldHalfWidth}
        />
      </section>
    )
  }
}

export default index