'use client';
import React, { FC, useMemo } from 'react';
import classnames from 'classnames';
import { HomeDayButton } from './HomeDayButton';

export type HomeSessionDatesProps = {
  dates: string[];
  curDate: string;
  className?: string;
  onChange: (date: string) => void;
  isFull: boolean;
};

export const HomeSessionDates: FC<HomeSessionDatesProps> = ({
  dates,
  curDate,
  onChange,
  isFull,
}) => {
  const filteredDates = useMemo(() => {
    if (isFull || dates.length < 3) {
      return dates;
    } else {
      const index = dates.indexOf(curDate);
      const start = dates.length - index >= 3 ? index : dates.length - 3;
      return dates.slice(start, start + 3);
    }
  }, [isFull, curDate, dates]);
  return (
    <div
      className={classnames(
        'grid gap-y-3.5 justify-items-center items-center transition-all duration-[0.3s]',
        {
          ['group/datenative grid-cols-1']: !isFull,
          ['group/dateopen gap-5 absolute w-full grid-cols-3 p-5 rounded-sm left-0 top-0 bg-white/80']:
            isFull,
        },
      )}
    >
      {filteredDates.map((date) => (
        <HomeDayButton
          date={date}
          className={classnames(
            'flex flex-col items-center justify-center shadow-default text-primary cursor-pointer w-20 px-2.5 py-5 rounded-st bg-white group-[]/dateopen:w-full 1hh:p-2.5',
            {
              ['group/datenative:w-[90px] group/active']: date === curDate,
            },
          )}
          key={date}
          onClick={() => onChange(date)}
        />
      ))}
    </div>
  );
};
