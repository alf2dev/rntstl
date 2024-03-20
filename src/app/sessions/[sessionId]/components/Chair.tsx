import { ChairStatus } from '@/gql/graphql';
import React, { FC, memo, useCallback, useEffect } from 'react';
import { ChairsIcon, NameIcon } from './ChairsIcon';
import classNames from 'classnames';
import { useMutation } from '@apollo/client';
import { ChairType, LockedChairType } from '@/app/types/chair.types';
import { Spinner, Tooltip } from '@nextui-org/react';
import { lockChairDocument } from '@/app/gql/lock-chair-document';
import { useCart } from '@/app/providers/CartProvider';

export type ChairProps = {
  chair: ChairType;
  sessionId: number;
  loading?: boolean;
  onChange?: (lockedChairs: LockedChairType[]) => void;
  chairWidth: string;
  isActive: boolean;
};

const ChairComponent: FC<ChairProps> = ({
  chair: { Id, Status, RowNumber, PlaceNumber, Price },
  loading: initLoading,
  sessionId,
  onChange,
  chairWidth,
  isActive,
}) => {
  let svgName = NameIcon.placeFree;
  if (!initLoading) {
    svgName =
      Status === ChairStatus.Free
        ? NameIcon.placeFree
        : Status === ChairStatus.Locked
        ? NameIcon.placeSelect
        : Status === ChairStatus.Reserved
        ? NameIcon.placeReserve
        : NameIcon.placeOccupied;
  }

  const [lockChair, { data, loading, error }] = useMutation(lockChairDocument);
  const { refetchTime } = useCart();

  const lock = useCallback(
    (Status: ChairStatus) => {
      if (!onChange) return;
      const lock =
        Status === ChairStatus.Free
          ? true
          : Status === ChairStatus.Locked
          ? false
          : undefined;
      if (lock === undefined) return;

      lockChair({
        variables: {
          lockChairsInput: {
            chairs: [
              {
                id: Id,
                lock,
              },
            ],
            sessionId,
          },
        },
      });
    },
    [Id, lockChair, onChange, sessionId],
  );
  useEffect(() => {
    if (data?.lockChairs.length && onChange) {
      onChange(data.lockChairs);
    }
  }, [Id, data, onChange]);

  useEffect(() => {
    refetchTime();
  }, [data]);

  return (
    <Tooltip
      showArrow
      placement="bottom"
      classNames={{
        base: 'text-white bg-primelight relative p-2.5 rounded-st',
        arrow:
          '-translate-x-2/4 translate-y-0 rotate-45 skew-x-[0] skew-y-[0] top-[-0.25rem] w-2.5 h-2.5 absolute z-[99999999] bg-primelight scale-100 left-[49.1094px]',
      }}
      content={
        <div className="flex flex-col">
          <div className="grid grid-cols-2 [&>div]:flex [&>div]:flex-col [&>div]:items-center first:[&>div>span]:text-xss last:[&>div>span]:text-lg">
            <div>
              <span></span>
              <span>{RowNumber}</span>
            </div>
            <div>
              <span></span>
              <span>{PlaceNumber}</span>
            </div>
          </div>
          <div className="text-sm">
            <span></span>
            <span>{Price}</span>
          </div>
        </div>
      }
    >
      <div
        className={classNames(
          'relative transition-all duration-[0.3s] p-[3px] hover:opacity-60 [&>svg]:w-full h-full md:p-0.5 2xs:p-px',
          (Status !== ChairStatus.Free && Status !== ChairStatus.Locked) ||
            (!isActive && Status !== ChairStatus.Locked)
            ? 'cursor-not-allowed'
            : 'cursor-pointer',
          {
            ['bg-lightblue']: initLoading || loading,
          },
        )}
        style={{ width: chairWidth }}
        onClick={() => (isActive || Status === ChairStatus.Locked) && lock(Status)}
      >
        <ChairsIcon name={svgName} />
        {!!loading && (
          <Spinner
            color="primary"
            size="sm"
            className="absolute flex items-center justify-center w-full h-full left-0 top-0"
          />
        )}
      </div>
    </Tooltip>
  );
};
export const Chair = memo(ChairComponent);
