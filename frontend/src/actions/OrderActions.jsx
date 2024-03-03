import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERRORS,
} from "../constants/OrderConstants.jsx";

import axios from "axios";

//   Create

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
console.log(order);     
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/order/new",
      
      order,
      config,
    );
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };