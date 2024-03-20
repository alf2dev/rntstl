'use client';
import { FC } from 'react';
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import {
  LockChairsInfoFragmentFragment,
  UserFragmentFragment,
} from '@/gql/graphql';
import { useRouter } from 'next/navigation';
import { useUser } from '../../providers/UserProvider';
import Link from 'next/link';
import { Button } from '@/app/components/Button';

type ConfirmRegistrationProps = {
  user: UserFragmentFragment | null | undefined;
  error: string | undefined;
  lockedChairs: readonly LockChairsInfoFragmentFragment[] | undefined;
};

export const ConfirmRegistration: FC<ConfirmRegistrationProps> = ({
  user,
  error,
  lockedChairs,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ defaultOpen: true });
  const router = useRouter();
  const { setUser } = useUser();

  if (!user && !error) {
    router.push('/');
    return <></>;
  }
  if (user) {
    setUser(user);
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={(isOpen) => {
          onOpenChange();
          if (!isOpen) router.push('/');
        }}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <div className="p-[30px]">
              {error && (
                <div className="flex flex-col [&>span]:text-3xl [&>span]:mb-2.5 [&>a]:mb-5">
                  <span>{error}</span>
                  <Link
                    className='flex justify-center items-center w-full cursor-pointer shadow-default text-lg max-w-[300px] px-5 py-2.5 rounded-st bg-primary text-white hover:opacity-80'
                    href="auth"
                  >
                    
                  </Link>
                </div>
              )}
              {user && (
                <div className="flex flex-col [&>span]:text-3xl [&>span]:mb-2.5 [&>a]:mb-5">
                  <span></span>
                  {!!lockedChairs?.length && (
                    <div className="flex flex-col [&>span]:text-3xl [&>span]:mb-2.5 [&>a]:mb-5">
                      <span></span>
                      <Link
                        href="checkout"
                        className='flex justify-center items-center w-full cursor-pointer shadow-default text-lg max-w-[300px] px-5 py-2.5 rounded-st bg-primary text-white hover:opacity-80'
                      >
                        
                      </Link>
                    </div>
                  )}
                </div>
              )}
              <Button
                onClick={onClose}
                variant='box'
              >
                Close
              </Button>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
