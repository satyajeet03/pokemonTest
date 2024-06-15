// pages/_app.js
  
import '../styles/globals.css';
import { LoadingProvider } from './LoadingContext';

function MyApp({ Component, pageProps }) {
  return (
    <LoadingProvider>
      <Component {...pageProps} />
    </LoadingProvider>
  );
}

export default MyApp;
