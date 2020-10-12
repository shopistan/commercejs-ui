import React from 'react'

import { mount } from 'enzyme'
import ProductCard from './index'

const productCard = mount(
  <ProductCard sku="20" title="title here" image="image here" qauntity={20} />,
)

describe('ProductCard', () => {
  const title = productCard.prop('title')
  const image = productCard.prop('image')
  const sku = productCard.prop('sku')

  it('Image should not be undefined', () => {
    expect(image).toBeDefined()
  })

  it('renders ProductCard title', () => {
    const titleElem = productCard.find('h4[data-label="product-title"]')
    expect(titleElem.text()).toBe(title)
  })

  it('redirect to product detail page on anchor click', () => {
    const anchor = productCard.find('a[data-label="product-link"]')
    expect(anchor.props().href).toBe(`/product/${sku}`)
  })
})
