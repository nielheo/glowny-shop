import React from 'react'

import {
  graphql,
  createFragmentContainer,
} from 'react-relay'
import ProductEditor from '../ProductEditor'
//import UserEditor from '../UserEditor/index'

class ProductAdd extends React.Component {
  render() {
    console.log(this.props.viewer.products)
    const { shops } = this.props.viewer
    return(
      <ProductEditor product={null} curr={shops && shops[0].systemCurr} />
    )
  }
}

export default createFragmentContainer(ProductAdd, {
  viewer: graphql`
    fragment ProductAdd_viewer on Viewer {
      shops(code:$shopCode) {
        id
        systemCurr
      }
    }
  `,
})