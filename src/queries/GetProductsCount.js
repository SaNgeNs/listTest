import gql from 'graphql-tag';

export const GetProductsCount = gql`{
  getProductsCount {
    count
  }
}`;

export default GetProductsCount;
