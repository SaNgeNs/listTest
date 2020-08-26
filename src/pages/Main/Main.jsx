import React from 'react';
import Helmet from 'react-helmet/lib/Helmet';
import { useQuery } from '@apollo/react-hooks';
import GET_VENDORS from 'Queries/GetVendors';
import Loader from 'Components/Loading';
import VendorHeader from './partitions/VendorHeader';
import SearchField from './partitions/SearchField';
import VendorTable from './partitions/VendorTable';

import './Main.less';

let FIELD_VALUE = '';
let TABLE_SORT = '-rating';

export const Main = () => {
  const { error, loading, data, fetchMore, refetch } = useQuery(GET_VENDORS, {
    variables: {
      page: 1,
      perPage: 10,
      sort: TABLE_SORT,
      nickname: FIELD_VALUE,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    return (
      <p>ERROR</p>
    );
  }

  if (!data) {
    return (
      <Loader />
    );
  }

  const {
    getVendors: {
      info: {
        next: nextPage,
        count: totalCount,
      },
      results,
    },
  } = data;

  return (
    <>
      <Helmet>
        <title>TEST</title>
        <meta property="og:title" content="test"/>
        <meta name="twitter:title" content="test"/>
        <meta name="og:image:alt" content="test"/>
        <link rel="canonical" href="https://test.com" />
        <meta property="og:url" content="https://test.com" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:site_name" content="test" />
      </Helmet>

      <div className="Main">
        <VendorHeader
          authorsCount={totalCount}
        />

        <SearchField
          onRequest={(value) => {
            FIELD_VALUE = value;
            refetch({
              page: 1,
              perPage: 10,
              sort: TABLE_SORT,
              nickname: value,
            });
          }}
        />
      </div>

      <VendorTable
        vendorsList={results}
        sort={TABLE_SORT}
        onRequest={(value) => {
          TABLE_SORT = value;
          refetch({
            page: 1,
            perPage: 10,
            sort: value,
            nickname: FIELD_VALUE,
          });
        }}
      />

      {nextPage && (
        <button
          className="Main__showMore"
          disabled={loading}
          onClick={() => (
            fetchMore({
              variables: {
                page: nextPage,
                perPage: 10,
                sort: TABLE_SORT,
                nickname: FIELD_VALUE,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;

                return {
                  getVendors: {
                    ...prev.getVendors,
                    info: {
                      ...prev.getVendors.info,
                      ...fetchMoreResult.getVendors.info,
                    },
                    results: [
                      ...prev.getVendors.results,
                      ...fetchMoreResult.getVendors.results,
                    ],
                  }
                };
              }
            })
          )}
        >
          {loading ? (
            <Loader />
          ) : 'Show More'}
        </button>
      )}
    </>
  );
};

export default Main;
