import React, { FC, useMemo } from 'react';
import { SessionInfoQuery } from '@/gql/graphql';
import { useSelectedChairs } from './SelectedChairsProvider';
import { useRouter } from 'next/navigation';
import VisualPlace from '../icons/visualPlace.svg';
import { LockedChairs } from '@/app/components/LockedChairs/LockedChairs';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Button } from '@/app/components/Button';

export type SelectedChairsProps = {
  session: SessionInfoQuery['cinemaSessions'][number];
};

export const SelectedChairs: FC<SelectedChairsProps> = ({
  session: { ID, film },
}) => {
  const { selectedChairs } = useSelectedChairs();
  const router = useRouter();
  const totalSum = useMemo(
    () =>
      selectedChairs.reduce((acc, { Price }) => {
        return acc + Price;
      }, 0),
    [selectedChairs],
  );
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const checkout = () => {
    if (selectedChairs.length) {
      if (film?.Age && film.Age >= 18) {
        onOpen();
      } else {
        router.push('/checkout');
      }
    }
  };
  return (
    <div>
      <div className="flex flex-col w-full">
        {!selectedChairs.length ? (
          <>
            <span className="text-center mb-5"></span>
            <div>
              <VisualPlace />
            </div>
          </>
        ) : (
          <span className="text-center mb-5"></span>
        )}

        <LockedChairs selectedChairs={selectedChairs} sessionId={ID} />
        {selectedChairs.length ? (
          <div
            className="flex justify-between items-center bg-primary text-white cursor-pointer transition-all duration-[0.3s] px-5 py-2.5 rounded-st hover:opacity-80 [&>span]:text-lg"
            onClick={checkout}
          >
            <span></span>
            <span>{totalSum}</span>
          </div>
        ) : (
          ''
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          <div>
            <ModalHeader className="text-primecancel text-xl">
              <span>
                
              </span>
            </ModalHeader>
            <ModalFooter>
              <Button
                onClick={() => {
                  router.push('/checkout');
                }}
                size="md"
                className="mb-2 bg-primecancel cursor-pointer"
              >
                
              </Button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};
