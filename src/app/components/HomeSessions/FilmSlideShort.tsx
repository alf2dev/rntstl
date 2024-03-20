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

export type FilmSlideProps = {
  film: FilmListQuery['films'][number];
};

export const FilmSlideShort: FC<FilmSlideProps> = ({ film }) => {

  return (
    <div className="group h-full min-h-[500px] relative rounded-sm">
      <div className="h-full p-5">
        <div className="flex h-3/6 1hh:h-[250px]">
          <div className="absolute w-full h-full overflow-hidden transition-all duration-[0.3s] z-[999999] rounded-sm left-0 top-0 group-hover:w-[55%] group-hover:h-[calc(50%_-_20px)] group-hover:z-[1] group-hover:left-5 group-hover:top-5">
            <Link
              className="absolute h-0 w-0 z-0 transition-all duration-[0.5s] group-hover:h-full group-hover:w-full group-hover:z-[9999999] group-hover:inset-0"
              href={`/films/${film.Slug}`}
            ></Link>
            <Image
              src={`/images/${film.HighResImage}`}
              className="z-0 object-cover"
              fill
              alt={`${film.Name}`}
            />
            <div className="absolute w-full h-full overflow-hidden transition-all duration-[0.3s] z-[999999] rounded-sm left-0 top-0 bg-gradient-to-b from-transparent to-stone-900 group-hover:bg-transparent"></div>
          </div>
          <div className="absolute text-white bg-primary flex items-center justify-center w-[42px] top-[calc(50%_-_40px)] left-[calc(55%_-_11px)] z-[9999] px-2 py-4 rounded-st 1hh:left-[calc(30%_-_10px)] 1hh:top-[225px]">
            <span>{film.Age}+</span>
          </div>
          
        </div>
        <div className="h-3/6 flex flex-col justify-between 1hh:justify-start">
          <div className="mt-2.5">
            <span className="absolute text-white w-[calc(100%-40px)] text-center text-3xl font-bold transition-all duration-[0.3s] z-[999999] bottom-[50px] group-hover:text-primary group-hover:relative group-hover:w-auto group-hover:text-2xl group-hover:bottom-0">
              {film.Name}
            </span>
            <div className="flex flex-col">
              <span className="text-xs">{film.Genre}</span>
              <span className="text-xs">{film.Duration}хв</span>
            </div>
          </div>
          <div className="relative 1hh:static">
            <div className="flex items-center justify-around mt-5">
              <Link
                className="flex items-center justify-center"
                href={`/films/${film.Slug}`}
              >
                <div className="flex items-center justify-center w-9 h-9 shadow-default text-2xl p-2.5 rounded-st">
                  i
                </div>
                <span className="text-xs ml-3.5">Про фільм</span>
              </Link>
              <Link className="flex items-center justify-center" href="/">
                <div className="flex items-center justify-center w-9 h-9 shadow-default text-2xl p-2.5 rounded-st">
                  <PlayIcon className="w-5 h-5" />
                </div>
                <span className="text-xs ml-3.5">Трейлер</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
