// This line is only needed for CodeSandbox
import '../../../src/setupTests.js';

import React from 'react';
import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import RemotePizza from '../RemotePizza';
import { fetchIngredients } from '../../services';

jest.mock('../../services');

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

test('download ingredients from internets', async () => {
  fetchIngredients.mockResolvedValue({ args: { ingredients } });

  const wrapper = mount(<RemotePizza />);

  wrapper
    .find({ children: 'Cook' })
    .props()
    .onClick();

  await waitForExpect(() => {
    wrapper.update();
    ingredients.forEach(ingredient => {
      expect(wrapper.text()).toMatch(ingredient);
    });
  });
});
