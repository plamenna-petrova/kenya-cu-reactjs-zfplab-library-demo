import { useSelector } from 'react-redux';
import NavigationDrawer from "../components/navigation-drawer/NavigationDrawer";
import BackdropLoading from '../components/backdrop-loading/BackdropLoading';

const Demo = () => {
  const { isLoading, message: loadingMessageToSet } = useSelector((state) => state.loading);

  return (
    <>
      <NavigationDrawer />
      {isLoading && <BackdropLoading isBackdropLoadingOpen={isLoading} loadingMessage={loadingMessageToSet} />}
    </>
  );
}

export default Demo;

