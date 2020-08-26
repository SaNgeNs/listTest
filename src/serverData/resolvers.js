import {
  getVendors,
  getProductsCount,
} from './api';

export const resolvers = {
  Query: {
    getVendors,
    getProductsCount,
  },
};

export default resolvers;
