import { FC } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ToastContainer } from 'react-toastify';
import NavigationDrawer from "../../components/navigation-drawer/NavigationDrawer";
import BackdropLoading from '../../components/backdrop-loading/BackdropLoading';
import 'react-toastify/dist/ReactToastify.css';

const Demo: FC = () => {
  const { isLoading, message: loadingMessageToSet } = useSelector((state: RootState) => state.loading);

  return (
    <div id="demo">
      <NavigationDrawer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {isLoading && <BackdropLoading isBackdropLoadingOpen={isLoading} loadingMessage={loadingMessageToSet} />}
    </div>
  );
}

export default Demo;