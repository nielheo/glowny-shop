import React from 'react'

import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import {
  graphql,
  createFragmentContainer,
} from 'react-relay'
//import Toggle from 'material-ui/Toggle'
//import UpdateUserActiveMutation from './UpdateUserActiveMutation'
//import environment from '../../createRelayEnvironment'
import FlatButton from 'material-ui/FlatButton'

class ProductItem extends React.Component 
{ 
  /*_isActiveClickHandler = (value, e) => {
    this.props.setSnackbar(true, value + ' is ' + (e.target.checked ? 'checked' : 'not checked'))
    UpdateUserActiveMutation(environment, value, e.target.checked)
  }
  */
  render() {
    const { product } = this.props
    return(
        <TableRow hoverable={true}>
          <TableRowColumn>{product.sku}</TableRowColumn>
          <TableRowColumn>{product.name}</TableRowColumn>
          <TableRowColumn>{product.description}</TableRowColumn>

          <TableRowColumn>
            <FlatButton label='...' href={'/product/edit/' + product.id }/>
          </TableRowColumn>
        </TableRow>
    )
  }

}

export default createFragmentContainer(ProductItem, {
  product: graphql`
    fragment ProductItem_product on Product {
      id
      sku
      name
      description
      curr
      price
    }
  `,
})