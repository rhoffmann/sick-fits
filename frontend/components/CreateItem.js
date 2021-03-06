import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(data: {
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    }) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: 'Cool shoes',
    description: 'super stuff i love it',
    image: '',
    largeImage: '',
    price: 3000
  }

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;

    this.setState({
      [name]: val
    });
  }

  uploadFile = async (e) => {
    console.log('uploading file');
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');

    const res = await fetch('https://api.cloudinary.com/v1_1/dxudcod4m/image/upload', {
      method: 'POST',
      body: data
    });

    const file = await res.json();
    //console.log(file);

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  }

  render() {
    const { title, price, description, image } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error, called, data }) => (
          <Form onSubmit={async e => {
            e.preventDefault();
            const res = await createItem();
            //console.log(res);
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id }
            })
          }}>
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                file
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload a file"
                  onChange={this.uploadFile}
                />
                { image && <img src={image} width="200" alt="Upload Preview" />}
              </label>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  value={price}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter a Description"
                  value={description}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default CreateItem;