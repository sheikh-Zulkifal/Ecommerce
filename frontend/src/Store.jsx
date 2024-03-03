import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import {
  productDetailsReducer,
  productReducer,
} from "./reducers/ProductReducer.jsx";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./reducers/UserReducer.jsx";
import { cartReducer } from "./reducers/CartReducer.jsx";
import { newOrderReducer } from "./reducers/OrderReducer.jsx";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
