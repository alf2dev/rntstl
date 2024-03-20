import React, { FC, useEffect, useRef, useState } from 'react';
import Watch from './icons/watch.svg';

type TimerProps = {
  timeSeconds: Number;
  onTimeout?: () => void;
  onTick?: (seconds: number) => void;
};

const divisionValues = [60, 60];

const secondToTime = (seconds: number): string => {
  const result: string[] = [];
  let restTime = seconds;
  for (let i = 0; i < divisionValues.length + 1; ++i) {
    const value =
      i === divisionValues.length ? restTime : restTime % divisionValues[i];
    result.push(value.toString().padStart(2, '0'));
    restTime = (restTime - value) / divisionValues[i];
    if (restTime === 0 && i > 0) break;
  }
  return result.reverse().join(':');
};

export const Timer: FC<TimerProps> = ({ timeSeconds: timeSecondsObj, onTimeout, onTick }) => {
  let timeSeconds = timeSecondsObj.valueOf();
  if (timeSeconds < 0) timeSeconds = 0;
  const [time, setTime] = useState(secondToTime(timeSeconds));
  const intervalId = useRef<NodeJS.Timer | undefined>();
  useEffect(() => {
    if (timeSeconds > 0) {
      let time = timeSeconds;
      const tickTimer = () => {
        if (--time === 0) {
          clearInterval(intervalId.current);
          onTimeout && onTimeout();
        }
        setTime(secondToTime(time));
        onTick && onTick(time);
      };
      intervalId.current = setInterval(tickTimer, 1000);
    }
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [timeSecondsObj]);
  return (
    <div className="flex items-center [&>span]:text-lg [&>span]:w-12 [&>span]:mr-2.5 [&>svg]:h-5">
      <span>{time}</span>
      <Watch />
    </div>
  );
};
