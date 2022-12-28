import styles from "../../styles/Home.module.css";
import App from "../../components/App";
import Head from 'next/head'
import axios from "axios";
import { useDispatch } from "react-redux";
import React, { memo, useEffect } from "react";

const Search = ({ res, path, title }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "UPDATE_LINKS", payload: res.data });
    dispatch({ type: "UPDATE_DATA", payload: res.data.data });
    dispatch({ type: "UPDATE_LOADING", payload: false });
    dispatch({ type: "UPDATE_TITLE", payload: title });

    if (res.data.path == 'https://yes-here.online/api/getData') {
      dispatch({ type: "UPDATE_APIROUTE", payload: 'getData' });
    } else if (res.data.path == 'https://yes-here.online/api/getDataWithText') {
      dispatch({ type: "UPDATE_APIROUTE", payload: 'getDataWithText' });
    }
  }, [res, path, title])

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel='searchLink' href={`https://seo-frontend.netlify.app/search/${path}`} />
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
  let title = '';

  if (query.id == 'getData') {
    path = `${query.id}?page=${query.page}&country=${query.country}&city=${query.city}&town=${query.town}&locality=${query.locality}&sectorOne=${query.sectorOne}&sectorTwo=${query.sectorTwo}`;

    title += query.country ? query.country : '';
    title += query.city ? " - " + query.city : '';
    title += query.town ? " - " + query.town : '';
    title += query.locality ? " - " + query.locality : '';
    title += query.sectorOne ? " - " + query.sectorOne : '';
    title += query.sectorTwo ? " - " + query.sectorTwo : '';
  }
  if (query.id == 'getDataWithText') {
    path = `${query.id}?page=${query.page}&sector=${query.sector}&country=${query.country}`;

    title += query.sector ? query.sector : '';
    title += query.country ? " - " + query.country : '';
  }

  const response = await axios
    .get(
      `https://yes-here.online/api/${path}`
    );

  return {
    props: {
      res: response.data,
      path: path,
      title: title
    },
  };
}

export default memo(Search)