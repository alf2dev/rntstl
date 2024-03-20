import React, { FC, memo, useMemo } from 'react';
import { FilmsQuery } from '@/gql/graphql';
import type { SessionInfo } from '@/app/types/sessions.type';
import { dateParser } from '@/app/helper/DateParser';
import Link from 'next/link';

type FilmSessionsForDayProps = {
  sessions: FilmsQuery['films'][number]['sessions'];
};

export const FilmSessionsForDayComponent: FC<FilmSessionsForDayProps> = ({
  sessions,
}) => {
  const { sessionByDates, dates } = useMemo(() => {
    const sessionByDates = sessions.reduce<Record<string, SessionInfo[]>>(
      (acc, { ID, Start, FilmType, PlaceGroupName }) => {
        const date = Start.substring(0, 10);
        const time = Start.substring(11, 16);
        if (!acc[date]) acc[date] = [];
        acc[date].push({ ID, FilmType, time, PlaceGroupName });
        return acc;
      },
      {},
    );
    const dateTimeValue = (time: string) => parseInt(time.replace(/:|-/g, ''));

    Object.entries(sessionByDates).forEach(([key, value]) => {
      sessionByDates[key] = value.sort(
        (a, b) => dateTimeValue(a.time) - dateTimeValue(b.time),
      );
    });
    const dates = Object.keys(sessionByDates).sort(
      (a, b) => dateTimeValue(a) - dateTimeValue(b),
    );
    return { sessionByDates, dates };
  }, [sessions]);
  const parsedDates = useMemo(() => {
    return dates.map((date) => dateParser(date));
  }, [dates]);
  return (
    <div className='flex flex-col bg-gray min-w-[345px] max-h-[60vh] overflow-y-scroll px-5 py-2.5 rounded-st scrolbar xl:max-h-fit xl:overflow-y-auto md:min-w-fit'>
      <span className='text-2xl text-primary mb-5'>Розклад сеансів</span>
      {dates.map((date, index) => {
        const { day, month, dateWeek } = parsedDates[index];
        return (
          <div key={date} className='mb-5'>
            <div className='text-lg mb-2.5'>
              {`${day}.${month} ${dateWeek}`}
            </div>
            <div className='flex flex-wrap text-primary'>
              {sessionByDates[date].map(
                ({ ID, PlaceGroupName, FilmType, time }) => (
                  <Link key={ID} href={`/sessions/${ID}`} className='flex flex-col items-center w-[60px] mx-5 my-1.5'>
                    <span className='text-lg'>{time}</span>
                    <span className='text-sx'>
                      {PlaceGroupName.indexOf('VIP') !== -1 ? 'VIP ' : ''}
                      {FilmType === '' ? '2D' : FilmType}
                    </span>
                  </Link>
                ),
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const FilmSessionsForDay = memo(FilmSessionsForDayComponent);
