import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import {
  productDetailsReducer,
  productReducer,
} from "./reducers/ProductReducer.jsx";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/UserReducer.jsx";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
