import React, { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const TypesIcon = ({
  // typeId = '',
  width = 20,
  height = 20,
  ...props
}) => {
  try {
    const { default: path } = require(`./iconTypes/type-wordpress.svg`); // find icon by typeId

    return (
      <LazyLoadImage
        src={path}
        alt='icon name'
        width={width}
        height={height}
        { ...props }
      />
    );
  } catch(error) {
    console.log('error ', error);
   return null;
  }
};

export default memo(TypesIcon);
