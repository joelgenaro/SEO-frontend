import styles from "../../styles/Home.module.css";
import App from "../../components/App";
import { useSelector } from "react-redux";
import { NextSeo } from 'next-seo';

//import Custom Style scss
export default function Home() {
  let title = useSelector((state) => state.currentAuth.title);

  return (
    <div className={styles.container}>

      <NextSeo
        title={title}
        description={title}
      />
      <main>
        <App />
      </main>

      <footer className={styles.footer}>
        Powered by <span className={styles.logo}></span>
      </footer>
    </div>
  );
}
