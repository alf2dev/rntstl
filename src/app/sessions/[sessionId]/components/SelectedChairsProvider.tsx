import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { ChairType } from '@/app/types/chair.types';

export type SelectedChairsProviderProps = {
  children: ReactNode;
};

const SelectedChairsContext = createContext<{
  selectedChairs: ChairType[];
  setSelectedChairs: Dispatch<SetStateAction<ChairType[]>>;
}>({ selectedChairs: [], setSelectedChairs: () => {} });

export const SelectedChairsProvider: FC<SelectedChairsProviderProps> = ({
  children,
}) => {
  const [selectedChairs, setSelectedChairs] = useState<ChairType[]>([]);
  return (
    <SelectedChairsContext.Provider
      value={{ selectedChairs, setSelectedChairs }}
    >
      {children}
    </SelectedChairsContext.Provider>
  );
};

export const useSelectedChairs = () => useContext(SelectedChairsContext);
