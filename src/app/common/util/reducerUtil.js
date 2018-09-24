export const createReducer = (intialState, fnMap) => {
  return (state = intialState, {type, payload}) => {
    const handler = fnMap[type];

    return handler ? handler(state, payload) : state
  }
}