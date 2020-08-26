import React, { useState, useEffect, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import IconSearch from 'Images/search.svg';
import { useTranslation } from 'react-i18next';
import useDebounce from 'Hooks/useDebounce';
import Field from 'Components/Field';

export const SearchField = ({
  onRequest = () => {},
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [firstRender, setFirstRender] = useState(true);
  const debouncedSearch = useDebounce(value, 500);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  useEffect(() => {
    if (!firstRender) {
      onRequest(value);
    }
  }, [debouncedSearch]);

  return (
    <Field
      icon={
        <LazyLoadImage
          src={IconSearch}
          alt="search"
          style={{
            position: 'absolute',
            left: '20px',
            top: '10px',
          }}
        />
      }
      id="search"
      type="text"
      placeholder={t('Enter any text')}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};

export default memo(SearchField);
