import styles from "../styles/Home.module.css";
import App from "../components/App";

//import Custom Style scss
const Home = () => {

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

export default Home
