import React, { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ColorHash from 'color-hash';
import './Avatar.less';

const colorHash = new ColorHash();

export const Avatar = ({
  avatar = '',
  nickname = '',
  width = 20,
  height = 20,
  style = {},
  fontSize = 9,
  alt = 'item',
  ...props
}) => {
  const authorName = nickname || 'anonymous';

  return avatar ? (
    <LazyLoadImage
      className="Avatar"
      src={avatar}
      alt={alt}
      width={`${width}px`}
      height={`${height}px`}
      style={{
        ...style,
      }}
    />
  ) : (
    <span
      className="Avatar"
      style={{
        backgroundColor: colorHash.hex(authorName),
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${fontSize}px`,
        ...style,
      }}
      { ...props }
    >
      {authorName.substr(0, 2)}
    </span>
  );
};

export default memo(Avatar);
