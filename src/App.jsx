import { Route, Routes } from 'react-router-dom';
import Demo from './pages/Demo';

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<Demo />}></Route>
    </Routes>
  );
}

export default App;