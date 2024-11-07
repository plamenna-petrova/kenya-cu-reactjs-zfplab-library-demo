import { createContext } from 'react';
import Tremol from '../assets/js/fp.js';
import PropTypes from 'prop-types';

const FPContext = createContext();

export const FPProvider = ({ children }) => {
  const fp = new Tremol.FP();

  return (
    <FPContext.Provider value={fp}>
      {children}
    </FPContext.Provider>
  )
}

FPProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FPContext;