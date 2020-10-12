import React from 'react'
import { mount } from 'enzyme'
import ProductDetail from './index'

describe('ProductDetail', () => {
  it('image placeholder loaded', () => {
    const productDetail = mount(<ProductDetail />)
    const image = productDetail.find('img[data-image="main-image"]')
    expect(image.prop('src')).toEqual(
      'https://via.placeholder.com/450?text=Product+Image',
    )
  })
})
