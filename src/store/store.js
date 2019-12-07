import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import rootReducer from "./reducers";

const axiosInstance = axios.create({ baseURL: "/api" });
const { withExtraArgument } = thunk;
const initialState = window.INITIAL_STATE;
const middleware = [withExtraArgument(axiosInstance)];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
