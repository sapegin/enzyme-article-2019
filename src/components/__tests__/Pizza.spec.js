// This line is only needed for CodeSandbox
import '../../../src/setupTests.js';

import React from 'react';
import { mount } from 'enzyme';
import Pizza from '../Pizza';

test('contains all ingredients', () => {
  const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];
  const wrapper = mount(<Pizza ingredients={ingredients} />);

  ingredients.forEach(ingredient => {
    expect(wrapper.text()).toMatch(ingredient);
  });
});
