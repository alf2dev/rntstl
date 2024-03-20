import React, { FC, useMemo } from 'react';
import { FilmListQuery } from '@/gql/graphql';
import classnames from 'classnames';

type FilmStatusProps = {
  film: FilmListQuery['films'][number];
  className?: string;
};

const getTime = (date: string | Date) =>
  (typeof date === 'string' ? new Date(date) : date).getTime();

const lessDate = <T extends { Start: string }>(
  sessions: T[],
  fromDate?: Date,
): string | undefined => {
  const fromDateValue =
    fromDate instanceof Date ? getTime(fromDate) : undefined;

  const date = sessions.reduce<{ value: number; Start: string } | undefined>(
    (res, { Start }) => {
      const value = getTime(Start);
      if (!res) {
        if (fromDateValue && value >= fromDateValue) {
          return { value, Start };
        }
      } else if (
        value < res.value &&
        (fromDateValue ? value >= fromDateValue : true)
      ) {
        return { value, Start };
      }
      return res;
    },
    undefined,
  );
  return date?.Start;
};

export const FilmStatus: FC<FilmStatusProps> = ({ film, className }) => {
  const { posterText, posterClassName, posterStatus } = useMemo<{
    posterText: string;
    posterClassName: string;
    posterStatus: boolean;
  }>(() => {
    const { PremiereStart, PremiereEnd, Start, End, sessions, Name } = film;
    if (!PremiereStart || !PremiereEnd || !Start) {
      return { posterClassName: '', posterText: '', posterStatus: false };
    }
    const curDate = new Date(); // dateToNumber(utcToZonedTime(new Date(), 'Europe/Kiev'));
    curDate.setHours(0, 0, 0, 0);
    const startCurDay = getTime(curDate);
    curDate.setHours(23, 59, 59, 999);
    const endCurDay = getTime(curDate);
    const premiereEnd = getTime(PremiereEnd);
    if (premiereEnd < endCurDay) {
      return { posterText: '', posterClassName: '', posterStatus: false };
    }
    const posterClassName = 'bg-carmine/80';

    const premiereStart = getTime(PremiereStart);
    if (premiereStart > endCurDay && sessions.length) {
      if (premiereStart > getTime(Start)) {
        return {
          posterStatus: true,
          posterText: "Допрем'єрний",
          posterClassName: 'bg-primelight/80',
        };
      }
      return {
        posterStatus: true,
        posterText: 'Попередній продаж',
        posterClassName,
      };
    }
    const lessSessionDate = lessDate(sessions, new Date());

    if (
      lessSessionDate &&
      getTime(lessSessionDate) > endCurDay &&
      sessions.length &&
      endCurDay < getTime(Start) // Є сеанси, але не на сьогодні
    ) {
      return {
        posterStatus: true,
        posterText: 'Попередній продаж',
        posterClassName,
      };
    }
    if (premiereStart <= startCurDay && premiereEnd > endCurDay) {
      return {
        posterStatus: true,
        posterText: "Прем'єра",
        posterClassName: 'bg-violet/80',
      };
    }
    return {
      posterStatus: false,
      posterText: '',
      posterClassName: '',
    };
  }, [film.PremiereStart, film.PremiereEnd, film.sessions.length]);
  return (
    !!posterStatus && (
      <div
        className={classnames(
          className,
          'absolute w-full px-2 py-1 right-0 top-[30px] z-[9999999] text-center text-base text-white group-hover:w-full group-hover:text-sm',
          posterClassName,
        )}
      >
        {posterText}
      </div>
    )
  );
};
