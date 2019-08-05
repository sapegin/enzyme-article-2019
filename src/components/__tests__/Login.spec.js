// This line is only needed for CodeSandbox
import '../../../src/setupTests.js';

import React from 'react';
import { mount } from 'enzyme';
import Login from '../Login';

// The only reliable way to test forms with Enzyme is to fire submit event on the form

test('submits username and password', () => {
  const username = 'me';
  const password = 'please';
  const onSubmit = jest.fn();
  const wrapper = mount(<Login onSubmit={onSubmit} />);

  wrapper
    .find({ 'data-testid': 'loginForm-username' })
    .simulate('change', { target: { value: username } });

  wrapper
    .find({ 'data-testid': 'loginForm-password' })
    .simulate('change', { target: { value: password } });

  wrapper.update();
  wrapper.find({ 'data-testid': 'loginForm' }).simulate('submit', {
    preventDefault: () => {},
  });

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    username,
    password,
  });
});
