import React from 'react'
import currencyFormatter from 'currency-formatter'
import Radium from 'radium'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as types from '../../actions/actionTypes.js'
import { withRouter } from 'react-router'

import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import {
  graphql,
  createFragmentContainer,
} from 'react-relay'
//import Toggle from 'material-ui/Toggle'
import UpdateProductActiveMutation from './UpdateProductActiveMutation'
import environment from '../../createRelayEnvironment'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'

class ProductItem extends React.Component 
{ 
  _isActiveClickHandler = (value, e) => {
    //this.props.setSnackbar(true, value + ' is ' + (e.target.checked ? 'checked' : 'not checked'))
    UpdateProductActiveMutation(environment, value.id, e.target.checked, 
      this._afterSaveSuccess(value.name + ' (' + value.sku + ') is ' + (e.target.checked ? 'set for sell' : 'set not for sell')))
  }

  _afterSaveSuccess = (message) => {
    this.props._updateHomeSnackbarAction(true, message)
  //  this.props.history.push('/product')
  } 
  
  render() {
    const { product } = this.props
    return(
        <TableRow hoverable={true}>
          <TableRowColumn>{product.sku}</TableRowColumn>
          <TableRowColumn>{product.name}</TableRowColumn>
          <TableRowColumn>{product.description}</TableRowColumn>
          <TableRowColumn>{currencyFormatter.format(product.price, {code: product.curr })}</TableRowColumn>
          <TableRowColumn>
            <Toggle 
              defaultToggled={product.isActive}
              onToggle={this._isActiveClickHandler.bind(this, product)}
            />
          </TableRowColumn>
          <TableRowColumn>
            <FlatButton label='...' href={'/product/edit/' + product.id }/>
          </TableRowColumn>
        </TableRow>
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

const productItemRedux = withRouter(connect(
  stateToProps,
  dispatchToProps,
)(Radium(ProductItem)))

export default createFragmentContainer(productItemRedux, {
  product: graphql`
    fragment ProductItem_product on Product {
      id
      sku
      name
      description
      curr
      price
      isActive
    }
  `,
})