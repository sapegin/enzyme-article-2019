// This line is only needed for CodeSandbox
import '../../../src/setupTests.js';

import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import waitForExpect from 'wait-for-expect';
import RemotePizza from '../RemotePizza';
import {act} from 'react-dom/test-utils'

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

afterAll(() => {
  fetchMock.restore();
});

test('download ingredients from internets', async () => {
  expect.assertions(4);

  fetchMock.restore().mock(/https:\/\/httpbin.org\/anything\?.*/, {
    body: { args: { ingredients } },
  });


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
