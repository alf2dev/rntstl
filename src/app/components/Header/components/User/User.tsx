import React, { useRef } from 'react';
import UserSvg from '@/app/icons/name.svg';
import NoAuth from '@/app/icons/noAuth.svg';
import { useUser } from '@/app/providers/UserProvider';
import { ModalAuth } from '@/app/auth/components/ModalAuth/ModalAuth';
import Link from 'next/link';

type Props = {};

export const User = (props: Props) => {
  const { user } = useUser();
  const openRef = useRef<() => void>(() => {});
  return (
    <div className="flex items-center justify-center px-2.5 py-0">
      {user ? (
        <Link className="cursor-pointer hover:opacity-80 [&>svg]:w-8 [&>svg]:h-8" href="/auth">
          <UserSvg />
        </Link>
      ) : (
        <>
          <div
            className="cursor-pointer hover:opacity-80 [&>svg]:w-8 [&>svg]:h-8"
            onClick={() => {
              openRef.current();
            }}
          >
            <NoAuth />
          </div>
          <ModalAuth openRef={openRef} />
        </>
      )}
    </div>
  );
};
