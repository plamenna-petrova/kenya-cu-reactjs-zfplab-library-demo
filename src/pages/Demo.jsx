import { useSelector } from 'react-redux';
import NavigationDrawer from "../components/navigation-drawer/NavigationDrawer";
import BackdropLoading from '../components/backdrop-loading/BackdropLoading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Demo = () => {
  const { isLoading, message: loadingMessageToSet } = useSelector((state) => state.loading);

  return (
    <>
      <NavigationDrawer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ top: '80px', right: '20px' }} 
      />
      {isLoading && <BackdropLoading isBackdropLoadingOpen={isLoading} loadingMessage={loadingMessageToSet} />}
    </>
  );
}

export default Demo;