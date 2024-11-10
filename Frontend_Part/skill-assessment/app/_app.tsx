import { AuthProvider } from './context/authContext';
import '../globals.css';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify';
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AuthProvider>
  );
}

export default MyApp;
