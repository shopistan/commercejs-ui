import React from 'react'
import { mount } from 'enzyme'

import ProductCard from '../../components/product-card'

describe('Home', () => {
  const products = [
    {
      sku: '10',
      qauntity: 100,
      name: 'test-prod',
      image: 'image.jpg',
    },
    {
      sku: '20',
      qauntity: 20,
      name: 'test-prod',
      image: 'image.jpg',
    },
    {
      sku: '30',
      qauntity: 25,
      name: 'test-prod',
      image: 'iamge.jpg',
    },
  ]

  it('populate ProductCard with products array', () => {
    products.forEach(({ sku, name, image, qauntity }) => {
      const productCard = mount(
        <ProductCard
          title={name}
          sku={`/product/${sku}`}
          image={image}
          qauntity={qauntity}
        />,
      )

      expect(productCard.prop('sku')).toBe(`/product/${sku}`)
      expect(productCard.prop('title')).toBe(name)
      expect(productCard.prop('image')).toBe(image)
      expect(productCard.prop('qauntity')).toBe(qauntity)
    })
  })
})
