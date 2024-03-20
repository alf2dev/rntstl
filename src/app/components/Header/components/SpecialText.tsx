import React from 'react';
import { usePathname } from 'next/navigation';


const specialText = (pathname: string) => {
  if (pathname === '/') {
    return 'Cosmo';
  } else if (pathname.startsWith('/films/')) {
    return 'Film Info';
  } else if (pathname.startsWith('/sessions/')) {
    return 'buy Ticket';
  }
  return;
};

export const SpecialText = () => {
  const pathname = usePathname();
  const text = specialText(pathname);
  return text && <span className='p-2.5 ml-2 font-reenie text-5xl md:hidden'>{text}</span>;
};
