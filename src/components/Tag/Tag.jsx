import React, { memo } from 'react'

import './Tag.less';

export const Tag = ({
  rating = 0,
  from = 100,
}) => {
  const colorTag = () => {
    if (isNaN(rating)) return '#90a4ae';

    if (rating >= 0.75 * from) {
      return '#1ab744';
    } else if (rating >= 0.5 * from) {
      return '#2196f3';
    } else if (rating >= 0.25 * from) {
      return '#ff8f00';
    } else if (rating > 0 * from) {
      return '#d84315';
    }

    return '#90a4ae';
  };

  return (
    <span
      className="Tag"
      style={{
        backgroundColor: colorTag(),
      }}
    >
      {rating}<sup>/100</sup>
    </span>
  );
};

export default memo(Tag);
