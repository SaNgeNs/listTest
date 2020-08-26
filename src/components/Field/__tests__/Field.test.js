import React from 'react';
import { render, getNodeText } from '@testing-library/react';

import Field from '../Field';

describe('<Field />', () => {
  it('should render input', () => {
    const { container } = render(
      <Field />
    );

    expect(container.querySelector('.Field__input').tagName.toLowerCase()).toBe('input');
  });

  it('should render icon and children', () => {
    const { container } = render(
      <Field
        icon={<span>test icon</span>}
      >
        <div>test children</div>
      </Field>
    );

    expect(getNodeText(container.querySelector('span'))).toBe('test icon');
    expect(getNodeText(container.querySelector('div'))).toBe('test children');
  });
});
