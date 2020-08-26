import React, { memo } from 'react';
import './Field.less';

export const Field = ({
  icon = null,
  children,
  ...props
}) => {
  return (
    <label className="Field" htmlFor={props.id}>
      {icon}

      <input
        className="Field__input"
        { ...props }
      />

      {children}
    </label>
  );
};

export default memo(Field);
