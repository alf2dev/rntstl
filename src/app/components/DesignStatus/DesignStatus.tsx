import React, { FC } from 'react';
import SeanceStatus from './icons/seanceStatus.svg';
import SeanceStatusActive from './icons/seanceStatusActive.svg';
import PlaceVisual from './icons/placeVisual.svg';
import PlaceVisualActive from './icons/placeVisualActive.svg';
import Card from './icons/card.svg';
import CheckMarkRound from './icons/checkMarkRound.svg';
import ArrowRight from '@/app/icons/arrowRight.svg';

type DesignStatusProps = {
  status: DesignStatusEnum;
};

export enum DesignStatusEnum {
  EMPTY = 0,
  SEANCE = 1,
  PLACE = 2,
  CARD = 3,
}

export const DesignStatus: FC<DesignStatusProps> = ({ status }) => {
  return (
    <div className="flex items-center justify-center mt-5 mb-[30px]">
      <div className={'relative flex flex-col justify-center w-[50px] h-[60px] [&>span]:text-xss [&>span]:text-center [&>svg]:w-full [&>svg]:h-full'}>
        {status > 1 ? (
          <div className="absolute w-4 h-4 top-[-25px] left-[calc(50%-8px)] [&>svg]:w-full [&>svg]:h-full">
            <CheckMarkRound />
          </div>
        ) : (
          ''
        )}
        {status < 1 ? <SeanceStatus /> : <SeanceStatusActive />}
        <span></span>
      </div>
      <div className="w-[15px] mx-5 my-0">
        <ArrowRight />
      </div>
      <div className={'relative flex flex-col justify-center w-[50px] h-[60px] [&>span]:text-xss [&>span]:text-center [&>svg]:w-full [&>svg]:h-full'}>
        {status > 2 ? (
          <div className="absolute w-4 h-4 top-[-25px] left-[calc(50%-8px)] [&>svg]:w-full [&>svg]:h-full">
            <CheckMarkRound />
          </div>
        ) : (
          ''
        )}
        {status < 2 ? <PlaceVisual /> : <PlaceVisualActive />}
        <span></span>
      </div>

      <div className="w-[15px] mx-5 my-0">
        <ArrowRight />
      </div>
      <div className={'relative flex flex-col justify-center w-[50px] h-[60px] [&>span]:text-xss [&>span]:text-center [&>svg]:w-full [&>svg]:h-full'}>
        {status < 3 ? <Card /> : <Card />}
        <span></span>
      </div>

      {/*  */}
    </div>
  );
};
