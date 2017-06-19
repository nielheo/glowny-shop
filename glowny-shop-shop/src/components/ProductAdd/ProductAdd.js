import React from 'react'

import {
  graphql,
  createFragmentContainer,
} from 'react-relay'
//import UserEditor from '../UserEditor/index'

class UserAdd extends React.Component {
  render() {
    console.log(this.props.viewer.products)
    return(
      <div>Product Add</div>
    )
  }
}

export default createFragmentContainer(UserAdd, {
  viewer: graphql`
    fragment ProductAdd_viewer on Viewer {
      shops(code:$shopCode) {
        id
        systemCurr
      }
    }
  `,
})