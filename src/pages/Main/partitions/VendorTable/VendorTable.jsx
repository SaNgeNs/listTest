import React, { memo, useState } from 'react'
import { NavLink } from 'react-router-dom';
import TypesIcon from 'Components/TypesIcon';
import FromNow from 'Components/FromNow';
import Avatar from 'Components/Avatar';
import Tag from 'Components/Tag';
import { useTranslation } from 'react-i18next';

import './VendorTable.less';

const getColor = (number) => {
  switch (number) {
    case 0:
      return {
        bg: '#ffb302',
        shadow: '#ffe082',
        bgLink: '#fff8e1',
      };

    case 1:
      return {
        bg: '#90a4ae',
        shadow: '#cfd8dc',
        bgLink: '#eceff1',
      };

    case 2:
      return {
        bg: 'peru',
        shadow: '#e8b481',
        bgLink: '#fff3e7',
      };

    default:
      return null;
  }
};

export const VendorTable = ({
  vendorsList = [],
  sort = '-rating',
  onRequest = () => {},
}) => {
  const [ sortHight, setSortHight ] = useState(sort === '-rating');
  const { t, i18n: { language } } = useTranslation();
  const requestSort = () => {
    const sortName = !sortHight ? '-rating' : 'rating';
    setSortHight(!sortHight);
    onRequest(sortName);
  };

  return (
    <section className="VendorTable">
      <article
        className="VendorTable__item"
        style={{
          color: '#90a4ae',
          fontWeight: 'bold',
        }}
      >
        <p className="VendorTable__row">№</p>
        <p className="VendorTable__row">{t('Name')}</p>
        <p className="VendorTable__row VendorTable__row--btn" onClick={requestSort}>
          {t('Rating')}
          <svg
            viewBox="0 0 20 20"
            width="25"
            height="25"
            style={{
              transform: sortHight ? 'rotate(90deg)' : 'rotate(270deg)',
              transition: 'transform .5s cubic-bezier(.86,0,.07,1)',
            }}
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M15 9.693L12.307 7v2.232H5v.923h7.307v2.232L15 9.692z" />
          </svg>
        </p>
        <p className="VendorTable__row">{t('Sales')}</p>
        <p className="VendorTable__row">{t('Products')}</p>
        <p className="VendorTable__row">{t('Working period')}</p>
        <p className="VendorTable__row">{t('Platforms')}</p>
      </article>

      {vendorsList.map((item, index) => {
        const {
          nickname,
          avatar,
          rating,
          sales,
          products,
          created_at: created,
          platforms,
          id,
        } = item;

        const isPlatforms = platforms.length;
        const visiblePlatforms = isPlatforms ? platforms.slice(0, 4) : [];
        const isShowPlatformCount = isPlatforms ? platforms.slice(4).length || false : false;
        const color = getColor(index);

        return (
          <NavLink
            to={`${language}/${nickname}/`}
            key={id}
            className="VendorTable__item"
            style={color && {
              backgroundColor: color.bgLink,
            }}
          >
            <p className="VendorTable__row">
              <span
                className="VendorTable__rowCoin"
                style={color && {
                  backgroundColor: color.bg,
                  boxShadow: `inset 0 0 0 5px ${color.shadow}`,
                  color: '#fff',
                }}
              >
                {`${index + 1}${index > 2 ? '.' : ''}`}
              </span>
            </p>

            <p className="VendorTable__row">
              <Avatar
                nickname={nickname || ''}
                avatar={avatar}
                width="44"
                height="44"
                fontSize="14"
              />

              {nickname}
            </p>

            <p className="VendorTable__row">
              <Tag
                rating={rating}
              />
            </p>

            <p className="VendorTable__row">
              <span className="VendorTable__rowCount">
                {(sales && Number(sales).toLocaleString('en')) || 0}
              </span>
            </p>

            <p className="VendorTable__row">
              <span className="VendorTable__rowCount">
                {(products && Number(products).toLocaleString('en')) || 0}
              </span>
            </p>

            <p className="VendorTable__row">
              <FromNow
                timestamp={created}
              />
            </p>

            <p className="VendorTable__row">
              {isPlatforms ? (
                visiblePlatforms.map(platformId => (
                  <TypesIcon
                    key={platformId}
                    // typeId={platformId}
                    style={{
                      marginRight: '5px',
                    }}
                  />
                ))
              ) : '-'}

              {isShowPlatformCount && (
                <>
                  {`+${isShowPlatformCount}`}
                </>
              )}
            </p>
          </NavLink>
        );
      })}
    </section>
  );
};

export default memo(VendorTable);
