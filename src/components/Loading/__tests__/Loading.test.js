import React from 'react';
import { render } from '@testing-library/react';

import Loading from '../Loading';

describe('<Loading />', () => {
  it('should render loader', () => {
    const { container } = render(
      <Loading />
    );

    expect(container.querySelectorAll('span')).toHaveLength(3);
    expect(container.querySelectorAll('p')).toHaveLength(1);
  });
});
