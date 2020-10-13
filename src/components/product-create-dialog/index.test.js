import React from 'react'
import { mount } from 'enzyme'
import ProductAddDialog from './index'

// const changeEvent = (event) => {
//   console.log('event', event);
// }

// const simulateInput = (wrapper, selector, value) => {
//   const input = wrapper.find(selector).find('input')
//   input.prop('onChange')(changeEvent)
//   // { target: { value: value } }

//   return wrapper.find(selector).find('input');
// }

const handleClose = event => {
  console.log('event: ', event)
}

const product = {
  name: 'product.name',
  quantity: 10,
  sku: 'product.sku',
  email: 'product.email',
}

describe('ProductAddDialog', () => {
  const productDialog = mount(
    <ProductAddDialog product={product} open={true} onClose={handleClose} />,
  )

  it('product name binding', () => {
    const name = productDialog.find('input[name="name"]')
    expect(name.prop('value')).toEqual('product.name')
  })

  it('product quantity binding', () => {
    const quantity = productDialog.find('input[name="quantity"]')
    expect(quantity.prop('value')).toEqual(10)
  })

  it('product email binding', () => {
    const email = productDialog.find('input[name="email"]')
    expect(email.prop('value')).toEqual('product.email')
  })

  // it('product name input onChange', () => {
  //     const val = 25;

  //     const input = simulateInput(productDialog, '[data-label="quantity"]', val);

  //     expect(input.props().value).toEqual(val);
  // });
})
