'use client';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Chair } from './Chair';
import { useApolloClient, useQuery } from '@apollo/client';
import { graphql } from '@/gql';
import { Subscription } from 'react-hook-form/dist/utils/createSubject';
import { ChairType, LockedChairType } from '@/app/types/chair.types';
import { useSelectedChairs } from './SelectedChairsProvider';
import { ChairStatus, SessionInfoQuery } from '@/gql/graphql';
import { ChairsIcon, NameIcon } from './ChairsIcon';
import { createSessionIfNotExistDocument } from '@/app/gql/create-session-if-notExist';

const reversedHolls = ['Зал №2', 'Зал №3', 'Зал №7', 'Зал №9'];

type ChairsProps = {
  chairs: ChairType[];
  session: SessionInfoQuery['cinemaSessions'][number];
  isActive: boolean;
};

const chairsLocked = graphql(`
  subscription ChairsLocked($sessionId: Float!) {
    chairsLocked(sessionId: $sessionId) {
      id
      status
    }
  }
`);

const cinemaSessionChairsClientDocument = graphql(`
  query CinemaSessionChairs($cinemaSessionChairsId: Int!) {
    cinemaSessionChairs(id: $cinemaSessionChairsId) {
      Id
      PlaceNumber
      Price
      RowNumber
      Status
    }
  }
`);

export const Chairs: FC<ChairsProps> = ({
  chairs: initChairs,
  session,
  isActive,
}) => {
  const [chairs, setChairs] = useState<ChairType[]>(initChairs);
  const { setSelectedChairs } = useSelectedChairs();

  useEffect(
    () =>
      setSelectedChairs(
        chairs.filter(({ Status }) => Status === ChairStatus.Locked),
      ),
    [chairs, setSelectedChairs],
  );

  const { chairsRowsPlaces, prices } = useMemo(() => {
    const pricesSet = new Set<number>();
    const chairsRowsPlaces = chairs.reduce<ChairType[][]>((result, chair) => {
      const { RowNumber, PlaceNumber } = chair;
      if (result.length < RowNumber) {
        result.push(...new Array(RowNumber - result.length).fill([]));
      }
      if (result[RowNumber - 1].length < PlaceNumber) {
        result[RowNumber - 1].push(
          ...new Array(PlaceNumber - result[RowNumber - 1].length),
        );
      }
      result[RowNumber - 1][PlaceNumber - 1] = chair;
      pricesSet.add(chair.Price);
      return result;
    }, []);
    return {
      chairsRowsPlaces: reversedHolls.includes(session.PlaceGroupName)
        ? chairsRowsPlaces.map((row) => row.reverse())
        : chairsRowsPlaces,
      prices: Array.from(pricesSet).sort((a, b) => a - b),
    };
  }, [chairs]);

  const { standardWidth, lastWidth } = useMemo(() => {
    let amount = 0;
    chairsRowsPlaces.forEach(
      (chairs) => (amount = chairs.length > amount ? chairs.length : amount),
    );
    const standardWidth = `calc(${100 / amount}%)`;
    const lastWidth = `calc(${100 / amount}% - ${
      1 / 2 - 1 / amount
    } * var(--last-margin))`;
    return { standardWidth, lastWidth };
  }, [chairsRowsPlaces]);

  const mutateChairs = useCallback((lockedChairs: LockedChairType[]) => {
    setChairs((chairs) => {
      return chairs.map((chair) => {
        const lockedIdIndex = lockedChairs.findIndex(
          ({ id }) => id === chair.Id,
        );
        if (lockedIdIndex !== -1) {
          return { ...chair, Status: lockedChairs[lockedIdIndex].status };
        }
        return chair;
      });
    });
  }, []);

  const client = useApolloClient();

  const chairsLockedSubscriptionRef = useRef<Subscription>();
  useEffect(() => {
    const subscribeChairsLocked = () =>
      client
        .subscribe({
          query: chairsLocked,
          variables: { sessionId: session.ID },
        })
        .subscribe({
          next(value) {
            value.data && mutateChairs(value.data.chairsLocked);
          },
        });

    let unsubscribe: Subscription | undefined;
    client
      .query({ query: createSessionIfNotExistDocument })
      .then(({ data: { createSessionIfNotExist } }) => {
        if (createSessionIfNotExist) {
          unsubscribe = subscribeChairsLocked();
        }
      });
    return () => {
      unsubscribe?.unsubscribe();
    };
  }, [client, mutateChairs, session.ID]);

  const { data } = useQuery(cinemaSessionChairsClientDocument, {
    variables: {
      cinemaSessionChairsId: session.ID,
    },
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    data && setChairs(data.cinemaSessionChairs);
  }, [data]);
  const chairsRowsLength = chairsRowsPlaces.length;

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[85%] px-[30px] py-0 md:px-5 md:py-0 md:max-w-full">
        <div className={'flex flex-col items-center'}>
          {chairsRowsPlaces.map((chairs, index) => {
            const isLastLarge =
              chairsRowsLength === index + 1 &&
              chairsRowsPlaces[index].length >
                chairsRowsPlaces[index - 1].length;
            return (
              <div
                key={index}
                className={
                  'relative flex items-center justify-center w-full first:mt-10 last:mt-10 md:first:mt-[30px] md:last:mt-[30px] [&:last-child>div>div:nth-child(even)]:mr-2 [&:last-child>div>div:last-child]:!mr-0'
                }
              >
                <span
                  className={
                    'absolute flex items-center justify-center text-base w-[30px] h-[30px] left-[-30px] md:text-sm md:w-5 md:h-5 md:-left-5'
                  }
                >
                  {index + 1}
                </span>
                {index === 0 ? (
                  <span className="absolute text-xl text-darkgray uppercase mx-0 my-[5px] -top-10 md:text-base md:top-[-30px]">
                    
                  </span>
                ) : (
                  ''
                )}
                {chairsRowsLength === index + 1 ? (
                  <span className="absolute text-xl text-darkgray uppercase mx-0 my-[5px] -top-10 md:text-base md:top-[-30px]">
                    
                  </span>
                ) : (
                  ''
                )}

                <div className="flex items-center justify-center w-full ">
                  {chairs.map((chair) => (
                    <Chair
                      key={chair.Id}
                      chair={chair}
                      chairWidth={isLastLarge ? standardWidth : lastWidth}
                      sessionId={session.ID}
                      loading={!data?.cinemaSessionChairs}
                      onChange={mutateChairs}
                      isActive={isActive}
                    />
                  ))}
                </div>
                <span
                  className={
                    'absolute flex items-center justify-center text-base w-[30px] h-[30px] right-[-30px] md:text-sm md:w-5 md:h-5 md:-right-5'
                  }
                >
                  {index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full max-w-[85%] mt-10 md:max-w-full md:mt-5">
        <div className="grid gap-2.5 grid-cols-4 [&>div]:flex [&>div]:items-center [&>div]:justify-center [&>div]:p-2.5 [&>div>svg]:w-[30px] [&>div>svg]:h-[25px] [&>div>svg]:mr-2.5 [&>div>span]:text-verydarkgray md:grid-cols-2 md:[&>div>svg]:w-[25px] md:[&>div>svg]:h-5">
          <div>
            <ChairsIcon name={NameIcon.placeFree} />
            <span></span>
          </div>
          <div>
            <ChairsIcon name={NameIcon.placeSelect} />
            <span></span>
          </div>
          <div>
            <ChairsIcon name={NameIcon.placeReserve} />
            <span></span>
          </div>
          <div>
            <ChairsIcon name={NameIcon.placeOccupied} />
            <span></span>
          </div>
        </div>
        {prices.length > 0 && (
          <div className="flex items-center justify-center mt-5 [&>div]:flex [&>div]:items-center [&>div]:justify-center [&>div]:p-2.5 md:flex-col">
            <div>
              <span
                className={`text-verydarkgray relative mr-[18px] after:content-[''] after:absolute after:right-[-15px] after:block after:h-px after:w-2.5 after:bg-verydarkgray after:top-2/4`}
              >
                
              </span>
              <span className="text-primary text-lg">{prices[0]}грн</span>
            </div>
            <div>
              <span
                className={`text-verydarkgray relative mr-[18px] after:content-[''] after:absolute after:right-[-15px] after:block after:h-px after:w-2.5 after:bg-verydarkgray after:top-2/4`}
              >
                
              </span>
              <span className="text-primary text-lg">
                {prices[prices.length - 1]}грн
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
