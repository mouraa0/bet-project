import 'tailwindcss/tailwind.css';
import './css/app.css';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
