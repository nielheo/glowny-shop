import React from 'react'
import Radium from 'radium'

import cc from 'currency-codes'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
//import Snackbar from 'material-ui/Snackbar'
import AutoComplete from 'material-ui/AutoComplete'
//import Toggle from 'material-ui/Toggle'
//import Roles from './Roles'

//import AddProductMutation from './AddProductMutation'
//import UpdateProductMutation from './UpdateProductMutation'
//import environment from '../../createRelayEnvironment'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    //alignItems: 'stretch',
    marginBottom: 20,
    '@media (max-width: 640px)': {
      flexDirection: 'column',
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex: 6,
    marginLeft: 15,
    marginRight: 15,
  },
  columnRight: {
    display: 'flex',
    flexDirection: 'column',
    flex: 6,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'flex-end',
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
  rowHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#00796B',
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

  _handleNewRequest = (choosenRequest) => {
    console.log(choosenRequest)
    this.setState({
      curr: choosenRequest,
    });
  };
  

  render() {
    //const { roles } = this.state
    //const { superRoles } = this.state
    //console.log(this.state)
    return(
      <div style={styles.container}>
        { !this.state.id && 
        <div style={styles.rowHeader}>
            New Product
        </div>
        }
        <div style={styles.row}>
          <div style={styles.column}>
            <TextField
              hintText='Product Name'
              floatingLabelText='Product Name'
              value={this.state.name}
              onChange={this._handleValueChanged.bind(this, 'name')}
              fullWidth={true}
            />
            <TextField
              hintText='SKU'
              floatingLabelText='SKU'
              value={this.state.sku}
              onChange={this._handleValueChanged.bind(this, 'sku')}
              fullWidth={true}
            />
            <TextField
              hintText='Product Description'
              floatingLabelText='Description'
              value={this.state.description}
              onChange={this._handleValueChanged.bind(this, 'description')}
              multiLine={true}
              rows={3}
              rowsMax={5}
              fullWidth={true}
            />
            <div style={styles.row}>
              <AutoComplete
                hintText='Currency'
                floatingLabelText='Currency'
                value={this.state.curr}
                dataSource={cc.codes()}
                //onUpdateInput={this._handleUpdateInput}
                onNewRequest={this._handleNewRequest}
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
            </div>
          </div>
          <div style={styles.column}>
            
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.column}>
            <div style={styles.item}>
              
              <RaisedButton 
                label='Submit'
                //fullWidth={true} 
                onClick={this._handleSubmit}
                secondary={true} 
                style={styles.button} />
              <Link style={styles.link} to='/product'>Cancel</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(index)