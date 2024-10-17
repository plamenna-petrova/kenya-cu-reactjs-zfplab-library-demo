import { createContext, useContext } from 'react';
import Tremol from '../assets/js/fp.js';

const FPContext = createContext();

export const FPProvider = ({ children }) => {
    const fp = new Tremol.FP();

    return (
        <FPContext.Provider value={fp}>
            {children}
        </FPContext.Provider>
    )
}

export default FPContext;