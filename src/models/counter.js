export default {
  namespace: 'counter',
  state: { count: 0 },
  reducers: {
    add(state, action) {
      return { count: state.count + 1 };
    },
    sub(state, action) {
      return { count: state.count - 1 };
    },
  },
};
