import 'tailwindcss/tailwind.css';
import Layout from '../components/Layout';
import './css/app.css';

function MyApp({ Layout, Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
