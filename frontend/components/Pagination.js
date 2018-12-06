import React from 'react';
import PaginationStyles from './styles/PaginationStyles';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import { Query } from 'react-apollo';

import Error from './ErrorMessage';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

export default function Pagination({ page }) {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <Error error={error}/>
        const { count } = data.itemsConnection.aggregate;
        const pages = Math.ceil(count / perPage);

        return (
          <PaginationStyles>
            <Head>
              <title>Sick Fits! &ndash; Page { page } of { pages }</title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: page - 1}
              }}
            >
              <a className="pref" aria-disabled={page <= 1}>Prev</a>
            </Link>
            <p>Page { page } of { pages }</p>
            <p>{ count } Items total</p>

            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: page + 1}
              }}
            >
              <a className="next" aria-disabled={page >= pages}>Next</a>
            </Link>

          </PaginationStyles>
        )
      }}
    </Query>
  )
}
