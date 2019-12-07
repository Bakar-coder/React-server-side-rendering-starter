import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../store/reducers";
import axios from "axios";
const initialState = {};

export default req => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { cookie: req.get("cookie") || "" }
  });
  const { withExtraArgument } = thunk;
  const middleware = [withExtraArgument(axiosInstance)];
  const composeEnhancers = compose;
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
};
