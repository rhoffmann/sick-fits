import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";

import styled from "styled-components";

import Item from "./Item";
import Pagination from './Pagination';
import { perPage } from '../config';


export const ALL_ITEMS_QUERY = gql `
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div `
  text-align: center;
`;

const ItemsList = styled.div `
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
`;

export default class Items extends Component {
  render() {
    const { page } = this.props;
    return (
      <Center>
        <Pagination page={page}></Pagination>
        <Query query={ALL_ITEMS_QUERY} variables={{
          skip: page * perPage - perPage,
          // fetchPolicy: "network-only",
          first: perPage,
        }}>
          {
            ({error, data, loading}) => {
              {
                if(loading) return <p>loading...</p>;
                if (error) return <p>Error: {error.message}</p>;
                return (
                  <ItemsList>
                    {data.items.map(item => <Item key={item.id} item={item}/>)}
                  </ItemsList>
                );
              }
            }
          }
        </Query>
        <Pagination page={page}></Pagination>
      </Center>
    );
  }
}
