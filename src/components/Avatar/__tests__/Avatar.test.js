import React from 'react';
import { render, getNodeText } from '@testing-library/react';

import Avatar from '../Avatar';

describe('<Avatar />', () => {
  it('should render span with text: te', () => {
    const { container } = render(
      <Avatar
        nickname="test"
      />
    );

    expect(getNodeText(container.querySelector('.Avatar'))).toBe('te');
  });

  it('should render span with text: an', () => {
    const { container } = render(
      <Avatar />
    );

    expect(getNodeText(container.querySelector('.Avatar'))).toBe('an');
  });

  it('should render img', async () => {
    const imgUrl = "https://test.com/avatar.svg";

    const { container } = render(
      <Avatar
        avatar={imgUrl}
      />
    );

    expect(container.querySelector('.Avatar').src).toBe(imgUrl);
  });
});
