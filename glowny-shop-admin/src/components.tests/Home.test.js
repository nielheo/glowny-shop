import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Home from '../components/Home'

describe('Hello', () => {
  it('should render text', () => {
    const wrapper = shallow(<Home />)
    expect(wrapper).to.have.text('H o m e')
  })
})