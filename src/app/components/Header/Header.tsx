'use client';
import { FC, ReactNode, memo, useEffect, useState } from 'react';
import { LeftHeader } from './LeftHeader';
import { RightHeader } from './RightHeader';
import { useResize } from '@/app/hooks/useResize';
import { User } from './components/User';
import classNames from 'classnames';
import { Cart } from './components/Cart';
import { useCart } from '@/app/providers/CartProvider';
import { usePathname } from 'next/navigation';
import { CloseMenu } from '@/app/helper/CloseMenu';

export interface HeaderProps {
  children?: ReactNode;
}

const HeaderComponent: FC<HeaderProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(true);
  useResize((width) => {
    setIsMobile(width <= 1100);
  });

  let timeout: NodeJS.Timeout;
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        if (window.scrollY > 10) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }, 10);
    };
  }, []);

  const { lockedChairs } = useCart();
  const pathname = usePathname();
  return (
    <header
      className={classNames(
        'fixed flex justify-between w-full h-[var(--header-height)] z-[9] transition-all duration-[0.2s] m-auto px-5 py-0 bg-white md:justify-center md:flex-col',
        { ['shadow-default']: isSticky },
      )}
    >
      <CloseMenu className="w-full h-[var(--header-height)]">
        <div className="flex justify-between items-center w-full h-full">
          <LeftHeader isRightHeader={isMobile} />
          <div>
          <div className="flex ">
            {!isMobile && <RightHeader usedClassNames={['']} />}
            <User />
          {!!lockedChairs?.length && pathname !== '/checkout' && <Cart />}
          </div>
          </div>
        </div>
      </CloseMenu>
    </header>
  );
};

export const Header = memo(HeaderComponent);
