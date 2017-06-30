import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as types from '../../actions/actionTypes.js'
import { withRouter } from 'react-router'

import cc from 'currency-codes'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import AutoComplete from 'material-ui/AutoComplete'
import Toggle from 'material-ui/Toggle'
import Dialog from 'material-ui/Dialog'
//import Roles from './Roles'

import AddProductMutation from './AddProductMutation'
import UpdateProductMutation from './UpdateProductMutation'
import environment from '../../createRelayEnvironment'
import Constants from '../../../constants'
import { getId } from '../Common/Cookies'

import VariantList from './VariantList'
import VariantEditor from './VariantEditor'

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
    marginBottom: 12,
    '@media (max-width: 640px)': {
      flexDirection: 'column',
    },
  },
  subTitle: {
    fontSize: '16px',
    marginTop: 12,
    borderBottom: '1px solid #009688',
    paddingBottom: 8,
    width: '100%',
    //marginBottom: 6,
    fontWeight: '600',
    color: '#009688',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex: 6,
    marginLeft: 20,
    marginRight: 20,
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
  toggle: {
    fontSize: 16,
  },
}

class index extends React.Component {
  constructor(props) {
    super(props)

    const { product } = props
    //console.log(product)
    this.state = {
      id: product && product.id,
      sku: product && product.sku,
      name: product && product.name,
      description: product && product.description,
      curr: product && product.curr,
      price: product && product.price,
      isActive: product && product.isActive || false,
      snackbarOpen: false,
      snackbarMessage: '', 
      buttonClicked: false,
      variants: [{ index: 0, name: 'Variant 1' }, 
        { index: 1, name: 'Variant 2' }, 
        { index: 2, name: 'Variant 3' }],
      variantEditIndex: -1,
      openVariantModal: false,
      variantModalTitle: '',
    }
  }

  _handleValueChanged = (field, event) => {
    this.setState({
      [field]: event.target.value,
    })
  }

  _afterSaveSuccess = (message) => {
    this.props._updateHomeSnackbarAction(true, message)
    this.props.history.push('/product')
  } 

  _formValidate = () => {
    if ((!this.state.sku || this.state.sku.trim() === '')
        || (!this.state.name || this.state.name.trim() === '')
        || (!this.state.description || this.state.description.trim() === '')
        || (!this.state.curr || this.state.curr.trim() === ''))
      return false
    else
      return true
  }

  _handleSubmit = () => {
    this.setState({ buttonClicked: true })

    if (!this._formValidate())
      return

    var input = {
      id: this.state.id,
      //shopCode: Constants.shopCode,
      sku: this.state.sku,
      name: this.state.name,
      description: this.state.description,
      curr: this.state.curr,
      price: this.state.price,
      isActive: this.state.isActive,
      userId: getId(),
    }
    if (this.state.id) {
      UpdateProductMutation(environment, input, this._afterSaveSuccess('Product succesfully updated'))
    } else {
      input['shopCode'] = Constants.shopCode
      AddProductMutation(environment, input, this._afterSaveSuccess('Product succesfully added'))
    }
  }

  _handleCancel = () => {
    this.props.history.push('/product')
  }

  _handleNewRequest = (choosenRequest) => {
    this.setState({
      curr: choosenRequest,
    });
  };

  _handleActiveToggled = (_, toggled) => {
    this.setState({
      isActive: toggled,
    })
  }

  _handleAddVariant = () => {
    this.setState({
      variantModalTitle: 'Add Variant',
      openVariantModal: true,
      variantForEdit: {
        index: -9,
        name: '',
        variants: ['S', 'M'],
      },
    })
  } 

  _handleVariantClose = () => {
    this.setState({
      openVariantModal: false,
      variantEditIndex: -1,
    })
  }

  _handleStartEditVariant = (index) => {
    this.setState({
      variantEditIndex: index,
      variantModalTitle: 'Edit Variant',
      openVariantModal: true,
    })
  }

  _handleCancelEditVariant = () => {
    this.setState({
      variantEditIndex: -1,
    })
  }
  
  render() {
    const variantActions = [
      <FlatButton
        label="Cancel"
        //primary={true}
        onTouchTap={this._handleVariantClose}
      />,
      <FlatButton
        label="Submit"
        secondary={true}
        //disabled={true}
        onTouchTap={this._handleVariantClose}
      />,
    ];
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
              errorText={this.state.buttonClicked 
                && (!this.state.name || this.state.name.trim() === '') 
                && 'required' }
              onChange={this._handleValueChanged.bind(this, 'name')}
              fullWidth={true}
            />
            <TextField
              hintText='SKU'
              floatingLabelText='SKU'
              value={this.state.sku}
              errorText={this.state.buttonClicked 
                && (!this.state.sku || this.state.sku.trim() === '') 
                && 'required' }
              onChange={this._handleValueChanged.bind(this, 'sku')}
              fullWidth={true}
            />
            <TextField
              hintText='Product Description'
              floatingLabelText='Description'
              value={this.state.description}
              errorText={this.state.buttonClicked 
                && (!this.state.description || this.state.description.trim() === '') 
                && 'required' }
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
                errorText={this.state.buttonClicked 
                  && (!this.state.price || this.state.price.trim() === '') 
                  && 'required' }
                onChange={this._handleValueChanged.bind(this, 'price')}
              />
              
            </div>
            <div style={styles.row}>
              <Toggle
                label={this.state.isActive ? 'For sell' : 'Not for sell' }
                toggled={this.state.isActive}
                onToggle={this._handleActiveToggled}
                style={styles.toggle}
                //defaultToggled={true}
                labelPosition="right"
              //  style={styles.toggle}
              />
            </div>
          </div>
          <div style={styles.column}>
            <div style={styles.row}>
              <div style={styles.subTitle}>
                Variants
              </div>
            </div>
            <div style={styles.row}>
              <VariantList variants={this.state.variants} 
                editIndex={this.state.variantEditIndex} 
                onStartEdit={this._handleStartEditVariant}
                onCancelEdit={this._handleCancelEditVariant}
              />
            </div>
            <div style={styles.row}>
              <FlatButton 
                label='Add Variant'
                onClick={this._handleAddVariant}
                secondary={true}
                disabled={this.state.variantEditIndex !== -1}
                //style={styles.button}
              />
            </div>
            <Dialog
              title={this.state.variantModalTitle}
              actions={variantActions}
              modal={true}
              //autoDetectWindowHeight={true}
              open={this.state.openVariantModal}
              variant={this.state.variantForEdit}
            >
              <VariantEditor variant={this.state.variantForEdit} />
            </Dialog>
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.column}>
            <div style={styles.item}>
              
              <RaisedButton 
                label='Submit'
                //fullWidth={true} 
                onTouchTap={this._handleSubmit}
                secondary={true} 
                style={styles.button} />
              <FlatButton 
                label='Cancel'
                onTouchTap={this._handleCancel}
                style={styles.button}
              />
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const _updateHomeSnackbarAction = (open, message) => ({
  type: types.UPDATE_HOME_SNACKBAR,
  snackbarOpen: open,
  snackbarMessage: message,
})

const dispatchToProps = (dispatch) => ({
  _updateHomeSnackbarAction: bindActionCreators(_updateHomeSnackbarAction, dispatch),
})

const stateToProps = (state) => ({
  onProgress: state.homeReducer.onProgress,
})

const indexRedux = withRouter(connect(
  stateToProps,
  dispatchToProps,
)(Radium(index)))

export default indexRedux