import { lockChairDocument } from '@/app/gql/lock-chair-document';
import { ChairType } from '@/app/types/chair.types';
import { useMutation } from '@apollo/client';
import React, { FC, useState } from 'react';
import Delete from '@/app/icons/close.svg';
import { Spinner } from '@nextui-org/react';

type LockedChairsProps = {
  sessionId: number;
  selectedChairs: ChairType[];
};

export const LockedChairs: FC<LockedChairsProps> = ({
  sessionId,
  selectedChairs,
}) => {
  const [lockChair, { data, error }] = useMutation(lockChairDocument);
  const [loadings, setLoadings] = useState<Record<number, boolean>>({});
  const unselectChair = async (id: number) => {
    setLoadings((prev) => ({ ...prev, [id]: true }));
    lockChair({
      variables: {
        lockChairsInput: { sessionId, chairs: [{ id, lock: false }] },
      },
    }).finally(() => {
      setLoadings((prev) => ({ ...prev, [id]: false }));
    });
  };
  return (
    <div data-slot="chairs" className="flex flex-col">
      {selectedChairs.map(({ Id, PlaceNumber, RowNumber, Price }) => (
        <div
          key={Id}
          data-slot="chair"
          className="relative flex justify-between items-center shadow-default mb-5 p-2.5 rounded-st md:mr-[35px]"
        >
          <div
            data-slot="chairDetail"
            className="flex [&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:mr-5 first:[&>div>span]:text-2xl last:[&>div>span]:text-sx"
          >
            <div data-slot="row">
              <span>{RowNumber}</span>
              <span></span>
            </div>
            <div data-slot="place">
              <span>{PlaceNumber}</span>
              <span></span>
            </div>
          </div>
          <div data-slot="chairPrice">
            <span className="text-lg">{Price}</span>
          </div>
          <div
            className="absolute right-[-35px] p-[10px] cursor-pointer [&>svg]:w-[15px] [&>svg]:hover:-[15px]"
            onClick={() => unselectChair(Id)}
          >
            {loadings[Id] ? <Spinner color="primary" size='sm'/> : <Delete className='hover:opacity-80'/>}
          </div>
        </div>
      ))}
    </div>
  );
};
