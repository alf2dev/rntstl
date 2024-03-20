'use client'
import {
  DesignStatus,
  DesignStatusEnum,
} from '@/app/components/DesignStatus/DesignStatus';
import React, { FC } from 'react';
import { SelectedChairs } from './SelectedChairs';
import { SessionInfoQuery } from '@/gql/graphql';
import { useSelectedChairs } from './SelectedChairsProvider';

type RightBarProps = {
  session: SessionInfoQuery['cinemaSessions'][number];
};

export const RightBar: FC<RightBarProps> = ({ session }) => {
    const {selectedChairs} = useSelectedChairs()
  return (
    <div className='w-[calc(33%_-_60px)] ml-[60px] lg:w-full lg:ml-0'>
      <DesignStatus status={selectedChairs.length ? DesignStatusEnum.PLACE : DesignStatusEnum.SEANCE} />
      <SelectedChairs session={session} />
    </div>
  );
};
