import React, { FC, useMemo, useState } from 'react';
import { HomeSessionDates } from './HomeSessionDates';
import { HomeSessionsForDay } from './HomeSessionsForDay';
import classnames from 'classnames';
import Image from 'next/image';
import { FilmListQuery } from '@/gql/graphql';
import type { SessionInfo } from '@/app/types/sessions.type';
import Link from 'next/link';
import PlayIcon from '../../icons/play.svg';
import DownIcon from './icons/down.svg';
import { FilmStatus } from '../FilmStatus';
import { Film } from '@/app/gql/films-document';
import { dateParser } from '@/app/helper/DateParser';

export type FilmSlideProps = {
  film: Film;
  onClickTrailer: (idTrailer: string) => void;
};

export const FilmSlide: FC<FilmSlideProps> = ({ film, onClickTrailer }) => {
  const { sessionByDates, dates } = useMemo(() => {
    const curDate = Date.now();
    const sessionByDates = film.sessions.reduce<Record<string, SessionInfo[]>>(
      (acc, { ID, Start, FilmType, PlaceGroupName }) => {
        if (new Date(Start).getTime() <= curDate) {
          return acc;
        }
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
  }, [film]);
  const [curDate, setCurDate] = useState(dates[0]);
  const [topPlace, setTopPlace] = useState(true);
  const [topPlaceSession, setTopPlaceSession] = useState(true);
  const { day, monthName, year } = useMemo(() => dateParser(film.Start), [film.Start]);

  const onMouseOut: React.MouseEventHandler<HTMLDivElement> = () => {
    setTopPlace(true);
    setTopPlaceSession(true);
  };

  return (
    <div
      className={classnames(
        'group h-full min-h-[500px] relative rounded-sm',
        film.isShortTemplate && !film.sessions.length
          ? 'group/short'
          : 'group/full',
      )}
      onMouseLeave={onMouseOut}
    >
      <div className="h-full p-5">
        <div className="flex group-[]/full:h-1/2 group-[]/short:h-[70%] 1hh:h-[250px]">
          <div className="absolute w-full h-full overflow-hidden transition-all duration-[0.3s] z-[999999] rounded-sm left-0 top-0 group-hover/full:w-[55%] group-hover/full:h-[calc(50%-20px)] group-hover/short:h-[70%] group-hover:z-[1] group-hover/full:left-5 group-hover/full:top-5">
            <Link
              className="absolute h-0 w-0 z-0 transition-all duration-[0.5s] group-hover:h-full group-hover:w-full group-hover:z-[99999999] group-hover:inset-0"
              href={`/films/${film.Slug}`}
            ></Link>
            <Image
              src={`/images/${film.HighResImage}`}
              className="z-0 object-cover"
              fill
              alt={`${film.Name}`}
            />
            {!!film.OriginalLang && (
              <div className="absolute px-2 py-1 right-0 bottom-[30px] z-[9999999] text-center text-base text-white bg-green group-hover:bottom-[50px] group-hover:w-full">
                
              </div>
            )}
            <FilmStatus film={film} />
            <div className="absolute w-full h-full overflow-hidden transition-all duration-[0.3s] z-[999999] rounded-sm left-0 top-0 bg-gradient-to-b from-transparent to-stone-900 group-hover:bg-transparent"></div>
          </div>
          <div className="absolute text-white bg-primary flex items-center justify-center w-[42px] group-[]/full:top-[calc(50%-40px)] group-[]/short:top-[calc(70%-40px)] group-[]/full:left-[calc(55%-11px)] group-[]/short:right-0 z-[9999] px-2 py-4 rounded-st 1hh:left-[calc(30%-10px)] 1hh:top-[225px]">
            <span>{film.Age}+</span>
          </div>
          {!!(!film.isShortTemplate || film.sessions.length) && (
            <div
              className={classnames(
                `flex flex-col items-center w-[35%] z-[99999] 1hh:w-1/5 1hh:left-[calc(30%_+_20px)]`,
                {
                  ['absolute w-[45%] right-0']: topPlace,
                },
              )}
            >
              {
                <HomeSessionDates
                  dates={dates}
                  onChange={(date) => {
                    setCurDate(date);
                    setTopPlace(true);
                  }}
                  curDate={curDate}
                  isFull={!topPlace}
                />
              }
              {dates.length > 3 && (
                <div
                  className={classnames(
                    `cursor-pointer mt-2.5 p-2.5 hover:opacity-60`,
                    {
                      ['hidden']: !topPlace,
                    },
                  )}
                  onClick={() => {
                    setTopPlace((v) => !v);
                    setTopPlaceSession(true);
                  }}
                >
                  <DownIcon className="h-4" />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="group-[]/full:h-1/2 group-[]/short:h-[30%] flex flex-col justify-between 1hh:justify-start">
          <div className="mt-2.5">
            <Link
              className="absolute text-white w-[calc(100%-40px)] text-center text-3xl font-bold transition-all duration-[0.3s] z-[999999] bottom-[80px] group-hover:text-primary group-hover:relative group-hover:w-auto group-hover:text-2xl group-hover:bottom-0"
              href={`/films/${film.Slug}`}
            >
              {film.Name}
            </Link>
            <div className="flex flex-col">
              <span className="text-xs group-[]/short:text-sm">
                {film.Genre}
              </span>
              <span className="text-xs group-[]/short:text-sm">
                {film.Duration}хв
              </span>
              {!!(film.isShortTemplate && !film.sessions.length) && (
                <span className='group-[]/short:text-sm'>У прокаті з: {`${day} ${monthName} ${year} року`}</span>
              )}
            </div>
          </div>
          <div className="relative 1hh:static">
            {!!(!film.isShortTemplate || film.sessions.length) && (
              <HomeSessionsForDay
                sessions={sessionByDates[curDate] || []}
                isFull={!topPlaceSession}
                onClick={() => {
                  setTopPlaceSession((v) => !v);
                  setTopPlace(true);
                }}
              />
            )}
            <div className="flex items-center justify-around group-[]/full:mt-5">
              <Link
                className="flex items-center justify-center hover:opacity-80"
                href={`/films/${film.Slug}`}
              >
                <div className="flex items-center justify-center w-9 h-9 shadow-default text-2xl p-2.5 rounded-st">
                  i
                </div>
                <span className="text-xs ml-3.5">Про фільм</span>
              </Link>
              {!!film.Trailer && (
                <div
                  className="flex items-center justify-center hover:opacity-80 cursor-pointer"
                  onClick={() => film.Trailer && onClickTrailer(film.Trailer)}
                >
                  <div className="flex items-center justify-center w-9 h-9 shadow-default text-2xl p-2.5 rounded-st">
                    <PlayIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs ml-3.5">Трейлер</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
