import Mock from 'Mock/data';

export const getVendors = async (_, args, context, info) => {
  const data = Mock.map(item => ({
    ...item,
    id: Math.random().toString().substr(2, 9),
  }));

  const sortData = args.sort === 'rating' ? data.reverse() : data;

  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    info: {
      next: !!args.nickname ? null : 1,
      prev: !!args.nickname ? null : 1,
      pages: 1,
      count: 3000,
      current: 1,
    },
    results: !!args.nickname ? sortData.slice(0, 2) : sortData,
  };
};

export default getVendors;
