import styles from "../../styles/Home.module.css";
import App from "../../components/App";
import Head from 'next/head'
import axios from "axios";
import { useDispatch } from "react-redux";

const Search = ({ res, title }) => {
  const dispatch = useDispatch();

  dispatch({ type: "UPDATE_COUNTRIES", payload: res.countries });
  dispatch({ type: "UPDATE_LINKS", payload: res.data });
  dispatch({ type: "UPDATE_DATA", payload: res.data.data });
  dispatch({ type: "UPDATE_LOADING", payload: false });

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Head>
      <main>
        <App />
      </main>
      <footer className={styles.footer}>
        Powered by <span className={styles.logo}></span>
      </footer>
    </div >
  );
}

export async function getServerSideProps({ query }) {

  let path = '';
  let title = '800M';

  if (query.id == 'getData') {
    path = `${query.id}?page=${query.page}&country=${query.country}&city=${query.city}&town=${query.town}&locality=${query.locality}&sectorOne=${query.sectorOne}&sectorTwo=${query.sectorTwo}`;

    title += query.country ? " - " + query.country : '';
    title += query.city ? " - " + query.city : '';
    title += query.town ? " - " + query.town : '';
    title += query.locality ? " - " + query.locality : '';
    title += query.sectorOne ? " - " + query.sectorOne : '';
    title += query.sectorTwo ? " - " + query.sectorTwo : '';
  }
  if (query.id == 'getDataWithText') {
    path = `${query.id}?page=${query.page}&sector=${query.sector}&country=${query.country}`;

    title += query.sector ? " - " + query.sector : '';
    title += query.country ? " - " + query.country : '';
  }

  const response = await axios
    .get(
      `https://yes-here.online/api/${path}`
    );

  return {
    props: {
      res: response.data,
      title: title
    },
  };
}

export default Search