import React, { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';
import Loader from 'Components/Loading';
import { useQuery } from '@apollo/react-hooks';
import GET_PRODUCTS_COUNT from 'Queries/GetProductsCount';

import './VendorHeader.less';

export const VendorHeader = ({
  authorsCount = 0,
}) => {
  const { t, i18n: { language } } = useTranslation();
  const { error, loading, data } = useQuery(GET_PRODUCTS_COUNT);

  if (error) {
    return (
      <p>ERROR</p>
    );
  }

  if (loading) {
    return (
      <Loader />
    );
  }

  const {
    getProductsCount: {
      count,
    },
  } = data;

  return (
    <article className="VendorHeader">
      <h2 className="VendorHeader__title">{authorsCount.toLocaleString(language)} {t('Authors')}</h2>

      <p>Products count: {count}</p>
    </article>
  );
};

export default memo(VendorHeader);
