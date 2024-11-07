import { useContext } from 'react';
import FPContext from '../context/FPContext';

export const useFP = () => {
  const fpContext = useContext(FPContext);

  if (!fpContext) {
    throw new Error("The hook 'useFP' must be used with FPProvider");
  }

  return fpContext;
}