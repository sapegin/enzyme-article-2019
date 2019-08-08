// This line is only needed for CodeSandbox
import '../../../src/setupTests.js';

import React from 'react';
import { mount } from 'enzyme';
import nock from 'nock';
import waitForExpect from 'wait-for-expect';
import RemotePizza from '../RemotePizza';
import {act} from 'react-dom/test-utils'

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

afterEach(() => {
  nock.restore();
});

test('download ingredients from internets', async () => {
  // expect.assertions(5);

  const scope = nock('https://httpbin.org')
    .get('/anything')
    .query(true)
    .reply(200, { args: { ingredients } });

  const wrapper = mount(<RemotePizza />);

  await act(async () => {
    wrapper.find({ children: 'Cook' }).simulate('click');  
  })

  await act(async () => {
    await waitForExpect(() => {
      wrapper.update();
      expect(scope.isDone()).toBe(true);
      ingredients.forEach(ingredient => {
        expect(wrapper.text()).toMatch(ingredient);
      });
    });
  })
});
