import React from 'react';
import { render } from '@testing-library/react';

import Tag from '../Tag';

describe('<Tag />', () => {
  it('should render span with background color: rgb(26, 183, 68)', () => {
    const { container } = render(
      <Tag
        rating={75}
        from={100}
      />
    );

    expect(container.querySelector('.Tag').style.backgroundColor).toBe('rgb(26, 183, 68)');
  });

  it('should render span with background color: rgb(33, 150, 243)', () => {
    const { container } = render(
      <Tag
        rating={50}
        from={100}
      />
    );

    expect(container.querySelector('.Tag').style.backgroundColor).toBe('rgb(33, 150, 243)');
  });

  it('should render span with background color: rgb(255, 143, 0)', () => {
    const { container } = render(
      <Tag
        rating={25}
        from={100}
      />
    );

    expect(container.querySelector('.Tag').style.backgroundColor).toBe('rgb(255, 143, 0)');
  });

  it('should render span with background color: rgb(216, 67, 21)', () => {
    const { container } = render(
      <Tag
        rating={10}
        from={100}
      />
    );

    expect(container.querySelector('.Tag').style.backgroundColor).toBe('rgb(216, 67, 21)');
  });

  it('should render span with background color: rgb(144, 164, 174)', () => {
    const { container } = render(
      <Tag
        rating={0}
        from={100}
      />
    );

    expect(container.querySelector('.Tag').style.backgroundColor).toBe('rgb(144, 164, 174)');
  });

  it('should render span with default background color: rgb(144, 164, 174)', () => {
    const { container } = render(
      <Tag />
    );

    expect(container.querySelector('.Tag').style.backgroundColor).toBe('rgb(144, 164, 174)');
  });

  it('should render span with default background color if rating !== number: rgb(144, 164, 174)', () => {
    const { container } = render(
      <Tag
        rating="not number"
      />
    );

    expect(container.querySelector('.Tag').style.backgroundColor).toBe('rgb(144, 164, 174)');
  });
});
