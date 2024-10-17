import { useContext } from 'react';
import FPContext from '../context/FPContext';

export const useFP = () => {
    const fpContext = useContext(FPContext);

    if (!fpContext) {
        throw new Error("The hook 'useFP' must be use with an FPProvider");
    }

    return fpContext;
}