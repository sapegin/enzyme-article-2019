// This line is only needed for CodeSandbox
import '../../../src/setupTests.js';

import React from 'react';
import { mount } from 'enzyme';
import nock from 'nock';
import waitForExpect from 'wait-for-expect';
import RemotePizza from '../RemotePizza';

const ingredients = ['bacon', 'tomato', 'mozzarella', 'pineapples'];

afterEach(() => {
  nock.restore();
});

test.skip('download ingredients from internets', async () => {
  const scope = nock('https://httpbin.org')
    .get('/anything')
    .reply(200, { args: { ingredients } });

  const wrapper = mount(<RemotePizza />);

  wrapper
    .find({ children: 'Cook' })
    .props()
    .onClick();

  await waitForExpect(() => {
    wrapper.update();
    expect(scope.isDone()).toBe(true);
    ingredients.forEach(ingredient => {
      expect(wrapper.text()).toMatch(ingredient);
    });
  });
});
