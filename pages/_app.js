import "../styles/globals.scss";
import "../public/assets/css/bootstrap-purple.min.css";
import "../public/assets/css/icons.min.css";
import "../public/assets/css/app-purple.min.css";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";

function MyApp({ Component, pageProps }) {
  // create redux
  const store = createStore(rootReducer);

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
