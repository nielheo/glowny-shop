import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import {
  BrowserRouter as Router,
} from 'react-router-dom'

import Login from '../components/Login/Login'


const muiTheme = getMuiTheme({
  palette: {
    //textColor: grey900,
    //primary1Color: grey900,
    //accent1Color: cyan500,
  },
})

const _updateField = () => {

} 

describe('Login', () => {
  it('should render text', () => {
    const context = { router: { isActive: (a, b) => true } };
    const wrapper = shallow(
      <MuiThemeProvider muiTheme={muiTheme}><Router>
        <Login updateField = {_updateField} />
      </Router></MuiThemeProvider>, { context })
    expect(wrapper).to.have.text('H o m e')
  })
})