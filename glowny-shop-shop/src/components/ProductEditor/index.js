import React from 'react'

import cc from 'currency-codes'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import AutoComplete from 'material-ui/AutoComplete'
import Toggle from 'material-ui/Toggle'
//import Roles from './Roles'

//import AddProductMutation from './AddProductMutation'
//import UpdateProductMutation from './UpdateProductMutation'
//import environment from '../../createRelayEnvironment'

const styles = {
  addButton: {
    float: 'right',
  },
  rowHeader: {
    display: 'table',
    width: '100%', /*Optional*/
    tableLayout: 'fixed', /*Optional*/
    marginBottom: 15,
  },
  row: {
    display: 'table',
    width: '100%', /*Optional*/
    tableLayout: 'fixed', /*Optional*/
  },
  columnLeft: {
    width: '50%',
    display: 'table-cell',
    fontSize: '1.5em',
    paddingRight: '2%',
  },
  columnRight: {
    width: '50%',
    display: 'table-cell',
    fontSize: '1.5em',
    paddingLeft: '2%',
  },
  textFieldFullWidth: {
    width: '100%',
  },
  textFieldHalfWidth: {
    width: '50%',
  },
  textFieldCurr: {
    width: 100,
    paddingRight: 20,
  },
  container: {
    textAlign: 'left',
    position: 'relative',
    width: '100%',
    margin: 'auto',
    padding: 20,
    paddingBottom: 75,
  },
  button: {
    marginTop: 12,
    float: 'right',
    marginLeft: 12,
  },
  link: {
    top: 20,
    color: '#4285f4',
    textDecoration: 'none',
    cursor: 'pointer',
    position: 'relative',
    float: 'right',
    marginRight: 10,
  },
  toggle: {
    display: 'block',
    width: 160,
    fontSize: '0.8em',
    marginTop: 40,
  },
}

class index extends React.Component {
  constructor(props) {
    super(props)

    const { product } = props
    console.log(product)
    this.state = {
      id: product && product.id,
      sku: product && product.sku,
      name: product && product.name,
      description: product && product.description,
      curr: product && product.curr,
      price: product && product.price,
      isActive: product && product.isActive,
      snackbarOpen: false,
      snackbarMessage: '', 
    }
  }

  _handleValueChanged = (field, event) => {
    this.setState({
      [field]: event.target.value,
    })
  }

  _afterSaveSuccess = (message) => {
    
    this.setState({
      snackbarOpen: true,
      snackBarMessage: message,
    })
    this.props.history.push('/users')
  }


  _handleSubmit = () => {
    /*var input = {
      id: this.state.id,
      sku: this.state.sku,
      name: this.state.name,
      description: this.state.description,
      curr: this.state.curr,
      price: this.state.price,
      isActive: this.state.isActive,
    }
    if (this.state.id) {
      input = {}
//      UpdateUserMutation(environment, input, this._afterSaveSuccess('User succesfully added'))
    } else {
      
      //AddProductMutation(environment, input, this._afterSaveSuccess('Product updated succesfully'))
    }*/
  }
  

  render() {
    //const { roles } = this.state
    //const { superRoles } = this.state
    console.log(this.state)
    return(
      <Paper style={styles.container}>
          { !this.state.id && 
          <div style={styles.rowHeader}>
              New Product
          </div>
          }
          <div style={styles.row}>
            <div style={styles.columnLeft}>
              <TextField
                hintText='Product Name'
                floatingLabelText='Product Name'
                value={this.state.name}
                onChange={this._handleValueChanged.bind(this, 'name')}
                style={styles.textFieldFullWidth}
              />
              <TextField
                hintText='SKU'
                floatingLabelText='SKU'
                value={this.state.sku}
                onChange={this._handleValueChanged.bind(this, 'sku')}
                style={styles.textFieldFullWidth}
              />
              <TextField
                hintText='Product Description'
                floatingLabelText='Description'
                value={this.state.description}
                onChange={this._handleValueChanged.bind(this, 'description')}
                multiLine={true}
                rows={3}
                rowsMax={5}
                style={styles.textFieldFullWidth}
              />
              <AutoComplete
                hintText='Currency'
                floatingLabelText='Currency'
                value={this.state.curr}
                dataSource={cc.codes()}
                searchText={this.state.curr}
                filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                openOnFocus={true}
                //style={styles.textFieldCurr}
              />
              <TextField
                hintText='Price'
                floatingLabelText='Price'
                value={this.state.price}
                onChange={this._handleValueChanged.bind(this, 'price')}
              />
              <Toggle
                label='Active'
                style={styles.toggle}
                defaultToggled={this.state.isActive}
              />
            </div>
            <div style={styles.columnRight}>
            -
            </div>
          </div>
          <RaisedButton 
            label='Submit'
            onClick={this._handleSubmit}
            secondary={true} 
            style={styles.button} />
          <Link style={styles.link} to='/product'>Cancel</Link>
          <Snackbar
            open={this.state.snackbarOpen}
            message={this.state.snackbarMessage}
            autoHideDuration={2500}
            onRequestClose={this.handleRequestClose}
          />
        </Paper>
    )
  }
}

export default index