import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export type GlobalStateProviderProps = {
  children: ReactNode;
};

const GlobalStateContext = createContext<{
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}>({ menuOpen: false, setMenuOpen: () => {} });

export const GlobalStateProvider: FC<GlobalStateProviderProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <GlobalStateContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
