'use client';
import React, { FC, useEffect, useMemo, useRef } from 'react';
import { ChairStatus, LockChairsInfoFragmentFragment } from '@/gql/graphql';
import { PayButton } from '@/app/components/PayButton/PayButton';
import { Timer } from '@/app/components/Timer';
import Image from 'next/image';
import Link from 'next/link';
import { dateParser } from '../helper/DateParser';
import { LockedChairs } from '@/app/components/LockedChairs/LockedChairs';
import { ChairType } from '@/app/types/chair.types';
import { useUser } from '@/app/providers/UserProvider';
import { ModalAuth } from '@/app/auth/components/ModalAuth/ModalAuth';
import { useCart } from '@/app/providers/CartProvider';
import { Button } from '@/app/components/Button';

type ActiveTicketsProps = {
  initSessionRemainTime: number;
  lockedChairsInit: readonly LockChairsInfoFragmentFragment[];
  hasOrders: boolean;
};

type AllLockedChairs = {
  sessionId: number;
  filmName: string;
  age?: number | null;
  standartImage?: number | null;
  start: string;
  totalSum: number;
  filmType: string;
  finish: string;
  placeGroupName: string;
  chairs: ChairType[];
};


export const ActiveTickets: FC<ActiveTicketsProps> = ({ lockedChairsInit, hasOrders }) => {
  const { lockedChairs, time, refetchTime } = useCart();
  
  useEffect(() => {
    refetchTime();
  }, []);

  const { sessionsChairs, orderSum } = useMemo<{
    sessionsChairs: AllLockedChairs[];
    orderSum: number;
  }>(() => {
    const chairsMap = new Map<number, AllLockedChairs>();
    let orderSum = 0;
    (lockedChairs || lockedChairsInit || []).forEach(
      ({
        CinemaSessionID,
        ID,
        IsPayed,
        FilmName,
        Start,
        RowNumber,
        PlaceNumber,
        Price,
        film,
        session,
      }) => {
        if (!IsPayed) {
          const { Age: age, StandartImage: standartImage } = film || {};
          let item: AllLockedChairs | undefined =
            chairsMap.get(CinemaSessionID);
          if (!item) {
            item = {
              sessionId: CinemaSessionID,
              filmName: FilmName,
              age,
              standartImage,
              start: Start,
              totalSum: 0,
              filmType: session?.FilmType || '2D',
              finish: session?.Finish || '',
              placeGroupName: session?.PlaceGroupName || '',
              chairs: [],
            };
            chairsMap.set(CinemaSessionID, item);
          }
          item.totalSum += Price;
          orderSum += Price;
          item.chairs.push({
            Id: ID,
            RowNumber,
            PlaceNumber,
            Price,
            Status: ChairStatus.Locked,
          });
        }
      },
      {},
    );
    return { sessionsChairs: Array.from(chairsMap.values()), orderSum };
  }, [lockedChairs]);

  const { starts, finishes } = useMemo(() => {
    return sessionsChairs.reduce<{
      starts: Record<string, ReturnType<typeof dateParser>>;
      finishes: Record<string, ReturnType<typeof dateParser>>;
    }>(
      (res, { start, finish }) => {
        res.starts[start] = dateParser(start);
        res.finishes[finish] = dateParser(finish);
        return res;
      },
      { starts: {}, finishes: {} },
    );
  }, [sessionsChairs]);

  const { user } = useUser();
  const openRef = useRef<() => void>(() => {});

  return (
    <>
      {!!sessionsChairs.length && (

        <div className="flex flex-col mb-[60px] p-2.5">
          <div className="mb-5">
            <Timer timeSeconds={time || 1} />
          </div>
          {sessionsChairs.map(
            ({
              sessionId,
              filmName,
              start,
              chairs,
              totalSum,
              age,
              filmType,
              finish,
              standartImage,
              placeGroupName,
            }) => (
              <div
                key={sessionId}
                className="flex justify-between mb-[30px] lg:flex-col"
              >
                <div className="flex 2xs:flex-col">
                  <div className="relative w-[100px] h-[150px] mr-5 2xs:mb-2 2xs:w-[100%] 2xs:h-[300px]">

                    <Image
                      src={`/images/${standartImage}`}
                      fill
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col max-w-[300px] first:[&>span]:text-xl lg:max-w-full">
                    <span>{filmName}</span>
                    <span>
                      :{' '}
                      {`${starts[start].hours}:${starts[start].minutes} - ${finishes[finish].hours}:${finishes[finish].minutes}`}
                    </span>
                    <span>
                      :{' '}
                      {`${starts[start].dateWeekFull} ${starts[start].day}.${starts[start].month}.${starts[start].year}`}
                    </span>
                    <span>{age}+</span>
                    <span>{filmType}</span>
                    <span>{placeGroupName}</span>
                  </div>
                </div>

                <div className="flex w-[350px] flex-col lg:w-full lg:mt-5">
                  <span></span>
                  <LockedChairs selectedChairs={chairs} sessionId={sessionId} />

                  <div className="flex flex-col items-end [&>a]:text-primelight [&>a]:text-sm [&>a]:hover:opacity-80">
                    <div className="text-base">
                      {totalSum}
                    </div>
                    <Link href={`/sessions/${sessionId}`}>
                     
                    </Link>
                  </div>
                </div>
              </div>
            ),
          )}
          <div className="flex flex-col items-end">
            <span className="text-lg mb-2.5">{orderSum}</span>
            {user ? (
              <div>
                <PayButton />
              </div>
            ) : (
              <div className="flex flex-col items-end max-w-[400px]">
                <span className="text-base text-primelight text-right">
                  
                </span>
                <Button
                  className="mt-5"
                  onClick={() => {
                    openRef.current();
                  }}
                >
                  
                </Button>
                <ModalAuth openRef={openRef} />
              </div>
            )}
          </div>
        </div>
      )}
      {!sessionsChairs.length && !hasOrders /* && !orders?.length */ && (
        <div className="mt-4 text-lg text-left">
          {' '}
          <Link href={'/'} className="text-primelight hover:opacity-70">
            
          </Link>
        </div>
      )}
    </>
  );
};
