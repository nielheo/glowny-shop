import React from 'react'
import ProductItem from './ProductItem'
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

class ProductList extends React.Component {
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
    const { products } = this.props
    return (
      <div>
        <Table fixedHeader={true} selectable={false}>
          <TableHeader displaySelectAll={false}
              adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>SKU</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              <TableHeaderColumn>For Sell</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              products && products.map(product => 
                <ProductItem key={product.id} product={product} setSnackbar={this._handleSetSnackbar} /> )
            }
          </TableBody>
        </Table>
        { (!products || !products.length) && 
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

export default createFragmentContainer(ProductList, {
  products: graphql`
    fragment ProductList_products on Product @relay(plural: true) {
      id
      ...ProductItem_product
    }
  `,
})