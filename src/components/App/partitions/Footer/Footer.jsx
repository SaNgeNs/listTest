import React, { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';

import './Footer.less';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="Footer">
      <LazyLoadImage
        className="Footer__logo"
        src="https://internetmarketingteam.com/wp-content/uploads/2017/05/url-web-address-300x300.png"
        alt="logo"
        width="40px"
        height="40px"
      />

      {t('Footer')}
    </footer>
  );
};

export default memo(Footer);
