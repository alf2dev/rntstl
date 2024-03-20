'use client';
import { SessionInfoQuery } from '@/gql/graphql';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { SelectedChairsProvider } from './SelectedChairsProvider';
import Screen from '../icons/screen.svg';
import { Chairs } from './Chairs';
import { dateParser } from '@/app/helper/DateParser';
import { RightBar } from './RightBar';
import Link from 'next/link';
import { graphql } from '@/gql';
import { useMutation } from '@apollo/client';

export type SessionProps = {
  sessionSchema: SessionInfoQuery['sessionSchema'];
  session: SessionInfoQuery['cinemaSessions'][number];
};

const clearBasketDocument = graphql(`
  mutation ClearBasket($sessionId: Float) {
    clearBasket(sessionId: $sessionId)
  }
`);

export const SessionPage: FC<SessionProps> = ({ sessionSchema, session }) => {
  const { day, year, month, dateWeekFull, hours, minutes, isActiveInit } =
    useMemo(() => {
      const startTime = new Date(session.Start || '').getTime();
      const now = Date.now();
      // const now = new Date('2023-10-05 20:09:55').getTime();
      const isActiveInit = startTime > now;
      if (isActiveInit && startTime - now < 86400000) {
        setTimeout(() => {
          setIsActive(false);
          clearBasketMutation();
        }, startTime - now);
      }
      return {
        ...dateParser(session.Start),
        isActiveInit,
      };
    }, [session.Start]);

  const [isActive, setIsActive] = useState(isActiveInit);
  const [clearBasketMutation] = useMutation(clearBasketDocument, {
    variables: { sessionId: session.ID },
  });

  return (
    <SelectedChairsProvider>
      <div className="flex max-w-[1200px] my-[50px] lg:flex-col">
        <div className="flex flex-col items-center w-[66%] lg:w-full">
          <div className="flex justify-between items-center relative w-full mb-2.5 md:flex-col">
            <div className="flex flex-col [&>a]:flex [&>a:first-child]:text-lg [&>a>span]:mr-2.5 2xs:[&>div]:flex-col">
              <div className="flex md:flex-col">
                <Link
                  className='[&>span]:mr-2'
                  href={`/films/${session.film?.Slug}`}
                >
                  <span>{session.FilmName}</span>
                  <span>
                    {session.FilmType === '' ? '2D' : session.FilmType}
                  </span>
                  <span>{session.PlaceGroupName}</span>
                  <span className='text-primecancel'>({session.film?.Age}+)</span>
                </Link>
                {!isActive && (
                  <span className="text-primecancel">
                    
                  </span>
                )}
              </div>
              <div>
                <span>{`${hours}:${minutes} ${dateWeekFull} ${day}.${month}.${year}`}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center relative">
            <div className="w-full">
              <div className="absolute w-full">
                <Screen />
              </div>
              <div className="text-center mt-[10%] pb-2.5 md:relative">
                <span className="text-xl"></span>
              </div>
            </div>
            <Chairs
              chairs={sessionSchema}
              session={session}
              isActive={isActive}
            />
          </div>
        </div>
        {isActive && <RightBar session={session} />}
      </div>
    </SelectedChairsProvider>
  );
};
