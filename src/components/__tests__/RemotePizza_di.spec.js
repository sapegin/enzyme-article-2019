// This line is only needed for CodeSandbox
import '../../../src/setupTests.js';

import React from 'react';
import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import RemotePizza from '../RemotePizza';

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

test('download ingredients from internets', async () => {
  expect.assertions(4);

  const fetchIngredients = () =>
    Promise.resolve({
      args: { ingredients },
    });
  const wrapper = mount(<RemotePizza fetchIngredients={fetchIngredients} />);

  wrapper.find({ children: 'Cook' }).simulate('click');

  await waitForExpect(() => {
    wrapper.update();
    ingredients.forEach(ingredient => {
      expect(wrapper.text()).toMatch(ingredient);
    });
  });
});
