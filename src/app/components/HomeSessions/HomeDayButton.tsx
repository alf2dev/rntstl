import React, { FC, useMemo } from 'react';
import { dateParser } from '@/app/helper/DateParser';

type HomeDayButtonProps = {
  date: string;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const HomeDayButton: FC<HomeDayButtonProps> = ({ date, ...rest }) => {
  const { day, month, dateWeek } = useMemo(() => dateParser(date), [date]);
  return (
    <div {...rest}>
      <div className="text-base  transition-all duration-[0.15s] group-[]/active:text-xl group-[]/active:font-bold">
        {day}.{month}
      </div>
      <div className="text-xss group-[]/active:text-xs group-[]/active:font-bold">{dateWeek}</div>
    </div>
  );
};