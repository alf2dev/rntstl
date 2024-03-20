import React from 'react';
import CartIcon from '@/app/icons/cart.svg';
import Link from 'next/link';
import { useCart } from '@/app/providers/CartProvider';
import { Timer } from '@/app/components/Timer';

type Props = {};

export const Cart = (props: Props) => {
  const { time, lockedChairs } = useCart();

  return (
    <Link href="/checkout" className="flex flex-col items-start justify-center bg-white min-w-[130px] z-[999] transition-all duration-[0.3s] px-2.5 py-0 hover:opacity-80 md:flex-row md:items-center md:h-10 md:p-[5px] md:absolute md:top-[var(--header-height)] md:w-[210px] md:left-[calc(50%-105px)]">
      <div className="flex items-center justify-center md:mr-2.5 md:pr-2.5 [&>span]:text-lg [&>svg]:w-5 [&>svg]:mr-[5px]">
        <CartIcon />
        <span>{lockedChairs?.length}</span>
      </div>
      <div>
        <Timer timeSeconds={time || 0} />
      </div>
    </Link>
  );
};
