// This line is only needed for CodeSandbox
import '../../../src/setupTests.js';

import React from 'react';
import { mount } from 'enzyme';
import ExpandCollapse from '../ExpandCollapse';

test('button expands and collapses the content', () => {
  const children = 'Hello world';
  const wrapper = mount(
    <ExpandCollapse excerpt="Information about dogs">{children}</ExpandCollapse>
  );

  expect(wrapper.text()).not.toMatch(children);

  wrapper.find({ children: 'Expand' }).simulate('click');

  expect(wrapper.text()).toMatch(children);

  wrapper.update();
  wrapper.find({ children: 'Collapse' }).simulate('click');

  expect(wrapper.text()).not.toMatch(children);
});
