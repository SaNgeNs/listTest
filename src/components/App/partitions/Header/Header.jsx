import React, { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';
import './Header.less';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="Header">
      <LazyLoadImage
        className="Header__logo"
        src="https://internetmarketingteam.com/wp-content/uploads/2017/05/url-web-address-300x300.png"
        alt="logo"
        width="40px"
        height="40px"
      />
      {t('Logo')}
    </header>
  );
};

export default memo(Header);
