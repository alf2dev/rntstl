import { graphql, useFragment } from '@/gql';
import {
  SessionRemainTimeQuery,
  Exact,
  LockChairsInfoFragmentFragment,
} from '@/gql/graphql';
import {
  LazyQueryExecFunction,
  useApolloClient,
  useQuery,
} from '@apollo/client';
import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { lockChairsInfoFragment } from '../gql/lock-chairs-fragment';
import { Subscription } from 'react-hook-form/dist/utils/createSubject';
import { createSessionIfNotExistDocument } from '../gql/create-session-if-notExist';

type CartProviderProps = {
  children: ReactNode;
};

const sessionRemainTimeDocument = graphql(`
  query SessionRemainTime {
    sessionRemainTime
  }
`);

const chairsLockedSubscription = graphql(`
  subscription ownChairsLocked($onlyOwn: Boolean) {
    chairsLocked(onlyOwn: $onlyOwn) {
      sessionId
      id
      status
    }
  }
`);

const lockedChairsDocument = graphql(`
  query LockedChairs {
    lockedChairs {
      ...lockChairsInfoFragment
    }
  }
`);

const CartContext = createContext<{
  time: Number | undefined;
  setTime: Dispatch<SetStateAction<Number | undefined>>;
  refetchTime:
    | LazyQueryExecFunction<
        SessionRemainTimeQuery,
        Exact<{
          [key: string]: never;
        }>
      >
    | (() => void);
  lockedChairs: readonly LockChairsInfoFragmentFragment[] | null | undefined;
}>({
  time: undefined,
  setTime: () => {},
  refetchTime: () => {},
  lockedChairs: [],
});

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const { data: remainTimeData, refetch: refetchTime } = useQuery(
    sessionRemainTimeDocument,
    {
      onCompleted: (data) => {
        setTime(() => new Number(data.sessionRemainTime));
      },
    },
  );
  const [time, setTime] = useState<Number | undefined>(
    remainTimeData?.sessionRemainTime,
  );

  const { data, refetch } = useQuery(lockedChairsDocument, {
    fetchPolicy: 'cache-and-network',
  });
  const lockedChairs = useFragment(lockChairsInfoFragment, data?.lockedChairs);
  const client = useApolloClient();

  const chairsLockedSubscriptionRef = useRef<Subscription>();
  useEffect(() => {
    const subscribeChairsLocked = () =>
      client
        .subscribe({
          query: chairsLockedSubscription,
          variables: { onlyOwn: true },
        })
        .subscribe({
          next(value) {
            refetch();
            refetchTime();
          },
        });

    client
      .query({ query: createSessionIfNotExistDocument })
      .then(({ data: { createSessionIfNotExist } }) => {
        if (createSessionIfNotExist) {
          chairsLockedSubscriptionRef.current = subscribeChairsLocked();
        }
      });
    return () => {
      chairsLockedSubscriptionRef.current?.unsubscribe();
    };
  }, [client, refetch, refetchTime]);

  return (
    <CartContext.Provider value={{ time, setTime, refetchTime, lockedChairs }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
