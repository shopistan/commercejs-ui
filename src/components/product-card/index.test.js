import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProductCard from './index';

Enzyme.configure({ adapter: new Adapter() });

const title = 'Lizards';


let wrapped = shallow(<ProductCard title={ title } image={ '' } />);

describe('ProductCard', () => {
  it('should render the ProductCard Component correctly', () => {
    expect(wrapped).toMatchSnapshot();
  })
  it('renders ProductCard children', () => {
    expect(wrapped.find('h4')).not.toBeUndefined();
  })

});
