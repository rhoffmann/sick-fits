import React from 'react'

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export default function DeleteItem({ id, children }) {
  const handleDelete = (deleteItem, id) => async e => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this?')) {
      const res = await deleteItem(id);
      // Router.push();
    }
  }

  const handleUpdate = (cache, payload) => {
    // manually update cache on client
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // 1. read cache for items
    console.log(data);
    // 2. filte deleted item out
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
    // 3. put items back in cache
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  return (
    <Mutation
      mutation={DELETE_ITEM_MUTATION}
      variables={{ id: id }}
      update={handleUpdate}
    >
      {(deleteItem, { error }) => {
        return (
          <button onClick={handleDelete(deleteItem, id)}>{ children }</button>
        );
      }}
    </Mutation>
  )
}
