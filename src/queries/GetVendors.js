import gql from 'graphql-tag';

export const GetVendors = gql`
  query($page: Int, $perPage: Int, $sort: String, $nickname: String) {
    getVendors(page: $page, perPage: $perPage, sort: $sort, nickname: $nickname) {
      info {
        count
        pages
        next
        prev
        current
      }
      results {
        avatar
        nickname
        platforms
        id
        created_at
        products
        sales
        rating
      }
    }
  }
`;

export default GetVendors;
