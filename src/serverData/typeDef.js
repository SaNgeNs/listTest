import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Vendor {
    id: Int
    avatar: String
    nickname: String
    platforms: [String]
    created_at: Int
    products: Int
    rating: Float
    sales: Int
  }

  type Vendors {
    info: Info
    results: [Vendor]
  }
  
  type Info {
    count: Int
    pages: Int
    next: Int
    prev: Int
    current: Int
  }

  type ProductsCount {
    count: Int
  }
  
  type Query {
    getVendors(page: Int, perPage: Int, sort: String, nickname: String): Vendors
    getProductsCount: ProductsCount
  }
`;

export default typeDefs;
