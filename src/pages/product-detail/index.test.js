import React from 'react'
import { mount } from 'enzyme'
import ProductDetail from './index'

const simulateInput = (wrapper, selector, value) => {
  const input = wrapper.find(selector).find('input')
  input.simulate('change', { target: { value } })

  return wrapper.find(selector).find('input')
}

describe('ProductDetail', () => {
  it('image placeholder loaded', () => {
    const productDetail = mount(<ProductDetail />)
    const image = productDetail.find('img[data-image="main-image"]')
    expect(image.prop('src')).toEqual(
      'https://via.placeholder.com/450?text=Product+Image',
    )
  })

  it('start product quantity input', () => {
    const productDetail = mount(<ProductDetail />)
    const input = productDetail
      .find('[data-label="quantity-input"]')
      .find('input')

    expect(input.prop('value')).toEqual(0)
  })

  it('increment product quantity input', () => {
    const productDetail = mount(<ProductDetail />)

    const incrementBtn = productDetail.find('button[data-label="increase"]')
    incrementBtn.simulate('click')

    const input = productDetail
      .find('[data-label="quantity-input"]')
      .find('input')

    expect(input.prop('value')).toEqual(1)
  })

  it('decrement product quantity input', () => {
    const productDetail = mount(<ProductDetail />)

    const decrementBtn = productDetail.find('button[data-label="decrease"]')
    decrementBtn.simulate('click')

    const input = productDetail
      .find('[data-label="quantity-input"]')
      .find('input')

    expect(input.prop('value')).toEqual(0)
  })

  it('product quantity input onChange', () => {
    const productDetail = mount(<ProductDetail />)
    let val = 5
    const inputUp = simulateInput(
      productDetail,
      '[data-label="quantity-input"]',
      val,
    )
    expect(inputUp.props().value).toEqual(val)
  })
})
