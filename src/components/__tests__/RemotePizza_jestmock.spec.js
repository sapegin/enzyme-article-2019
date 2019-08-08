// This line is only needed for CodeSandbox
import '../../../src/setupTests.js';

import React from 'react';
import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import RemotePizza from '../RemotePizza';
import { fetchIngredients } from '../../services';
import {act} from 'react-dom/test-utils'

jest.mock('../../services');

afterEach(() => {
  fetchIngredients.mockReset();
});

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

test('download ingredients from internets', async () => {
  expect.assertions(4);

  fetchIngredients.mockResolvedValue({ args: { ingredients } });

  const wrapper = mount(<RemotePizza />);

  await act(async () => {
    wrapper.find({ children: 'Cook' }).simulate('click');  
  })

  await waitForExpect(() => {
    wrapper.update();
    ingredients.forEach(ingredient => {
      expect(wrapper.text()).toMatch(ingredient);
    });
  });
});
