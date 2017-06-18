import React from 'react'
import {
  graphql,
  createFragmentContainer,
} from 'react-relay'

import ProductList from './ProductList'
//import Constants from '../../../constants'

class Products extends React.Component {
  render() {
    return (
      <ProductList products={this.props.viewer.products} />
    )
  }
}

//const shopCode = Constants.shopCode

export default createFragmentContainer(Products, {
  viewer: graphql`
    fragment Products_viewer on Viewer {
      products(shopCode: $shopCode) {
        id
        ...ProductList_products
      }
    }
  `,
})
