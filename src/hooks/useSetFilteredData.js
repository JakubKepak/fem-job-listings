import { useReducer } from "react";

import { mockData } from "../mock/data";

const initialState = {
  data: mockData,
  filter: [],
};

const ADD_FILTER = "ADD_FILTER";

const reducer = (state, action) => {
  if (action.type === ADD_FILTER) {
    if (state.filter.indexOf(action.payload) === -1) {
      state.filter.push(action.payload);
      const newData = mockData.filter((item) =>
        [...item.languages, ...item.tools].some(
          (item) => state.filter.indexOf(item) !== -1
        )
      );
      return { data: newData, filter: state.filter };
    }
    return state;
  }
};

export default function useSetFilteredData() {
  const [filteredData, dispatch] = useReducer(reducer, initialState);

  console.log(filteredData);

  const addFilter = (filter) => {
    dispatch({
      type: ADD_FILTER,
      payload: filter,
    });
  };

  return { filteredData, addFilter };
}
