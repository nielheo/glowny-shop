import React from 'react'

import {
  graphql,
  createFragmentContainer,
} from 'react-relay'
import ProductEditor from '../ProductEditor'

class ProductEdit extends React.Component {

  render() {
    const { products } = this.props.viewer
    return(
      products && products.length &&
      <ProductEditor product={products[0]} { ...this.props } />
    )
  }
}

export default createFragmentContainer(ProductEdit, {
  
  viewer: graphql`
    fragment ProductEdit_viewer on Viewer {
      products(shopCode:$shopCode, id: $id) {
        id
        sku
        name
        description
        curr
        price
        isActive
      }
    }
  `,
})