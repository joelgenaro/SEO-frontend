import "../styles/globals.scss";
import "../public/assets/css/bootstrap-purple.min.css";
import "../public/assets/css/icons.min.css";
import "../public/assets/css/app-purple.min.css";

import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "../reducers/rootReducer";

function MyApp({ Component, pageProps }) {
  // create redux

  const composeEnhancers =
    require("redux-devtools-extension").composeWithDevTools;

  const store = createStore(rootReducer, composeEnhancers(applyMiddleware()));

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
