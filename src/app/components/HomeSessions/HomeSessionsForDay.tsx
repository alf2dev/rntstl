import { FC } from 'react';
import type { SessionInfo } from '@/app/types/sessions.type';
import classnames from 'classnames';
import DownIcon from './icons/down.svg';
import Link from 'next/link';

interface SessionDatesProps {
  sessions: SessionInfo[];
  isFull: boolean;
  onClick: () => void;
}

export const HomeSessionsForDay: FC<SessionDatesProps> = ({
  sessions,
  isFull,
  onClick,
}) => {
  const filteredSessions =
    isFull || sessions.length < 7 ? sessions : sessions.slice(0, 7);
  return (
    <div
      className={classnames(
        'absolute w-full bottom-[65px] flex flex-col items-center min-h-[144px] rounded-st bg-gray text-prime px-5 py-2.5 transition-[max-height] duration-[0.3s]',
        {
          ['max-h-[800px] z-[99999]']: isFull,
        },
        '1hh:w-[calc(50%-20px)] 1hh:left-[calc(50%+20px)] 1hh:top-5',
      )}
    >
      <span className="text-lg mb-2.5 font-bold">Розклад сеансів</span>
      <div className="grid gap-3.5 grid-cols-4 grid-flow-dense px-2.5 py-0">
        {filteredSessions.map(({ ID, FilmType, time, PlaceGroupName }) => (
          <Link
            key={ID}
            href={`/sessions/${ID}`}
            className="flex flex-col items-center w-full hover:transition-all hover:duration-[0.3s] hover:opacity-80"
          >
            <span className="text-lg">{time}</span>
            <span className="text-xs">
              {PlaceGroupName.indexOf('VIP') !== -1 ? 'VIP ' : ''}
              {FilmType === '' ? '2D' : FilmType}
            </span>
          </Link>
        ))}
        {sessions.length > 7 && (
          <div
            className="flex flex-col items-center justify-center cursor-pointer hover:opacity-80"
            onClick={onClick}
          >
            <DownIcon
              className={`h-[15px] transition-all duration-[0.3s] ${
                isFull ? '-rotate-180' : '-rotate-0'
              } `}
            />
            <span className="text-xss ">{isFull ? 'Меньше' : 'Більше'}</span>
          </div>
        )}
      </div>
    </div>
  );
};
