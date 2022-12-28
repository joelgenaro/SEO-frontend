import React, { memo, useEffect } from "react";
import styles from "../styles/Home.module.css";
import App from "../components/App";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const Home = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pageNumber = useSelector((state) => state.currentAuth.page);
  const apiRoute = useSelector((state) => state.currentAuth.apiRoute);

  useEffect(() => {
    dispatch({ type: "UPDATE_COUNTRIES", payload: data.countries });
    dispatch({ type: "UPDATE_LINKS", payload: data.data });
    dispatch({ type: "UPDATE_DATA", payload: data.data.data });
    dispatch({ type: "UPDATE_LOADING", payload: false });

    if (data.data.path == 'https://yes-here.online/api/index') {
      dispatch({ type: "UPDATE_APIROUTE", payload: 'index' });
    }
  }, [data])

  useEffect(() => {
    if (apiRoute == 'index') {
      router.push(
        `/?page=${pageNumber}`
      );
    }
  }, [pageNumber])

  return (
    <div className={styles.container}>
      <main>
        <App />
      </main>

      <footer className={styles.footer}>
        Powered by <span className={styles.logo}></span>
      </footer>
    </div>
  );
}
export async function getServerSideProps({ query }) {
  // Fetch data from external API
  let data = null;

  if (query.page) {
    const res = await fetch(`https://yes-here.online/api/index?page=${query.page}`)
    data = await res.json()
  } else {
    const res = await fetch(`https://yes-here.online/api/index`)
    data = await res.json()
  }

  // Pass data to the page via props
  return { props: { data } }
}

export default memo(Home)
