import "../styles/globals.scss";
// <!-- Bootstrap Css -->
//     <link href="assets/css/bootstrap-purple.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />

//     <!-- Icons Css-->
//     <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
//     <!-- App Css -->
//     <link href="assets/css/app-purple.min.css" id="app-style" rel="stylesheet" type="text/css" />
import "../public/assets/css/bootstrap-purple.min.css";
import "../public/assets/css/icons.min.css";
import "../public/assets/css/app-purple.min.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
