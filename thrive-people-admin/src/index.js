import React from 'react'
import ReactDOM from 'react-dom'
import AppRoutes from './components/AppRoutes'
import NetworkLayer from './NetworkLayer'
import RelayStore from './RelayStore'

import { backendUrlGraphql } from '../constants.json'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

if (localStorage.getItem('token')) {
  const networkLayer = new NetworkLayer(
    backendUrlGraphql, {
      headers: {
        token: localStorage.getItem('token'),
      },
  })
  networkLayer.setToken(localStorage.getItem('token'))
  RelayStore.reset(networkLayer)
}
else {
  const networkLayer = new NetworkLayer(backendUrlGraphql, {})
  RelayStore.reset(networkLayer)
}

ReactDOM.render(
  <AppRoutes />,
  document.getElementById('root')
)
