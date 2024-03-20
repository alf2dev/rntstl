'use client';
import { FilmsQuery } from '@/gql/graphql';
import React, { useMemo, useState } from 'react';
import { FilmSessionsForDay } from './FilmSessionsForDay';
import { dateParser } from '@/app/helper/DateParser';
import { FilmLeftImage } from './FilmLeftImage';
import { useResize } from '@/app/hooks/useResize';
import {
  DesignStatus,
  DesignStatusEnum,
} from '@/app/components/DesignStatus/DesignStatus';

export type FilmContainerProps = {
  film: FilmsQuery['films'][number];
};

export const FilmContainer = ({ film }: FilmContainerProps) => {
  const { day, year, monthName } = useMemo(
    () => dateParser(film.Start),
    [film.Start],
  );
  const comingSoonDateNow = useMemo(() => {
    if (film.Start && Date.now() < new Date(film.Start).getTime()) {
      return true;
    }
    return false;
  }, [film.Start]);

  const [isMobile, setIsMobile] = useState(true);
  useResize((width) => {
    setIsMobile(width < 770);
  });
  return (
    <div className="flex max-w-[1200px] my-[30px] xl:flex-col md:mt-0">
      <div className="flex relative mr-10 xl:mr-0">
        {!isMobile && <FilmLeftImage film={film} />}
        <div className="text-primary">
          <div className="mt-2.5 mb-5 mx-0 md:[&>h1]:text-4xl">
            <h1 className="text-xl font-bold">{film.Name}</h1>
            {film.ComingSoon && comingSoonDateNow ? (
              <div className="text-[25px] leading-5 font-reenie">
                coming soon
              </div>
            ) : (
              ''
            )}
          </div>
          {isMobile && <FilmLeftImage film={film} />}
          <div className="flex flex-col [&>div]:flex [&>div]:mb-5 [&>div>span:first-child]:w-[150px] [&>div>span:first-child]:mr-2.5 [&>div>span:last-child]:w-[calc(100%-160px)] md:[&>div]:flex-wrap md:[&>div>span:first-child]:w-auto md:[&>div>span:last-child]:w-auto">
            <div>
              <span></span>
              {}
              <span>{`${day} ${monthName} ${year} р.`}</span>
            </div>
            <div>
              <span></span>
              <span>{film.Genre}</span>
            </div>
            <div>
              <span></span>
              <span>{film.Age}+</span>
            </div>
            <div>
              <span></span>
              <span>{film.Cast}</span>
            </div>
            <div>
              <span></span>
              <span>{film.Director}</span>
            </div>
            <div>
              <span></span>
              <span>{film.Duration} хв.</span>
            </div>
            <div>
              <span></span>
              <span>{film.FilmLang}</span>
            </div>
            <div>
              <div className="flex flex-col">
                <span className="mb-2.5"></span>
                <span className="w-full">{film.Description}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!!film.sessions.length && (
        <div>
          <DesignStatus status={DesignStatusEnum.EMPTY} />
          <FilmSessionsForDay sessions={film.sessions} />
        </div>
      )}
    </div>
  );
};
