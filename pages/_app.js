import "../styles/globals.scss";
import "../public/assets/css/bootstrap-purple.min.css";
import "../public/assets/css/icons.min.css";
import "../public/assets/css/app-purple.min.css";

import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import App from 'next/app'

function MyApp({ Component, pageProps }) {
  // create redux
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
