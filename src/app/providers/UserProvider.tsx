import { UserFragmentFragment } from '@/gql/graphql';
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export type UserProviderProps = {
  children: ReactNode;
  initUser: UserFragmentFragment | null | undefined;
};

const UserContext = createContext<{
  user: UserFragmentFragment | null | undefined;
  setUser: Dispatch<SetStateAction<UserFragmentFragment | null | undefined>>;
}>({ user: null, setUser: () => {} });

export const UserProvider: FC<UserProviderProps> = ({ children, initUser }) => {
  const [user, setUser] = useState<UserFragmentFragment | null | undefined>(initUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
