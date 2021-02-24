import { useReducer } from "react";

import { mockData } from "../mock/data";

const initialState = {
  data: mockData,
  filter: [],
};

const ADD_FILTER = "ADD_FILTER";
const REMOVE_FILTER = "REMOVE_FILTER";
const CLEAR_ALL_FILTERS = "CLEAR_ALL_FILTERS";

const reducer = (state, action) => {
  if (action.type === ADD_FILTER) {
    if (state.filter.indexOf(action.payload) === -1) {
      const newFilter = [...state.filter, action.payload];
      const newData = mockData.filter((item) =>
        [...item.languages, ...item.tools].some(
          (item) => newFilter.indexOf(item) !== -1
        )
      );
      return { data: newData, filter: newFilter };
    } else {
      return state;
    }
  }

  if (action.type === REMOVE_FILTER) {
    const newFilter = state.filter.filter((item) => item !== action.payload);
    if (newFilter.length !== 0) {
      const newData = mockData.filter((item) =>
        [...item.languages, ...item.tools].some(
          (item) => state.filter.indexOf(item) !== -1
        )
      );
      return { data: newData, filter: newFilter };
    } else {
      return { data: mockData, filter: newFilter };
    }
  }

  if (action.type === CLEAR_ALL_FILTERS) {
    return { data: mockData, filter: [] };
  }
};

export default function useSetFilteredData() {
  const [filteredData, dispatch] = useReducer(reducer, initialState);

  const addFilter = (filter) => {
    dispatch({
      type: ADD_FILTER,
      payload: filter,
    });
  };

  const removeFilter = (filter) => {
    dispatch({
      type: REMOVE_FILTER,
      payload: filter,
    });
  };

  const clearAllFilters = (filter) => {
    dispatch({
      type: CLEAR_ALL_FILTERS,
    });
  };

  return { filteredData, addFilter, removeFilter, clearAllFilters };
}
