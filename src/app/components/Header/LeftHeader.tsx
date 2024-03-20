'use client';
import { FC, useEffect, useState } from 'react';
import Logo from '@/app/icons/logo.svg';
import Link from 'next/link';
import classNames from 'classnames';
import { RightHeader } from './RightHeader';
import { useUser } from '@/app/providers/UserProvider';
import UserSvg from '@/app/icons/name.svg';
import Visa from './icons/visa.svg';
import MasterCard from './icons/mastercard.svg';
import { SpecialText } from './components/SpecialText';
import { useGlobalState } from '@/app/providers/GlobalState';

export interface LeftHeaderProps {
  isRightHeader?: boolean;
}

export const LeftHeader: FC<LeftHeaderProps> = ({ isRightHeader }) => {
  const { menuOpen, setMenuOpen } = useGlobalState();
  useEffect(() => {
    const keyDownHandler = (e: globalThis.KeyboardEvent) => {
      if (e.code === 'Escape') {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    // clean up
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
  const { user } = useUser();

  const closeProp = { onClick: () => setMenuOpen(false) };

  return (
    <div className="flex relative h-full md:w-full">
      <div className="flex items-center z-[999999]">
        <div className="flex items-center justify-center mr-[60px] md:mr-5">
          <div
            className={
              'relative cursor-pointer bg-white w-10 h-[25px] flex flex-col justify-around m-0 [&>div]:w-full [&>div]:h-[5px] [&>div]:ease-in-out [&>div]:duration-300 [&>div]:rounded-st [&>div]:bg-gradient-to-br from-primelight via-primary to-black'
            }
            onClick={() => setMenuOpen((v) => !v)}
          >
            {[1, 2, 3].map((value) => (
              <div
                key={value}
                className={classNames({
                  ['relative']: value === 1 && !menuOpen,
                  ['absolute rotate-45 top-3']: value === 1 && menuOpen,
                  ['relative mx-0 my-[5px]']: value === 2 && !menuOpen,
                  ['absolute rotate-[135deg] m-0 top-3']:
                    value === 2 && menuOpen,
                  ['relative !w-6/12']: value === 3 && !menuOpen,
                  ['hidden']: value === 3 && menuOpen,
                })}
              ></div>
            ))}
          </div>
        </div>
        <Link
          href="/"
          className="leading-[0] max-h-[30px] [&>svg]:h-full [&>svg]:w-full"
        >
          <Logo />
        </Link>
        <SpecialText />
      </div>
      <div
        className={classNames(
          'absolute min-h-screen z-[99999] transition-all duration-[0.3s] shadow-default pt-[var(--header-height)] pb-0 px-5 top-0 bg-white',
          {
            ['invisible w-[250px] opacity-0 -left-full']: !menuOpen,
            ['visible w-[calc(100%+60px)] opacity-100 -left-5 md:w-screen md:[&<html]:overflow-hidden']:
              menuOpen,
          },
        )}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          if (menuOpen) {
            event.stopPropagation();
          }
        }}
      >
        <div className="px-0 py-2.5">
          <Link
            href="/auth"
            className="flex items-center [&>svg]:w-10 [&>svg]:h-10 [&>svg]:mr-2.5"
            {...closeProp}
          >
            <UserSvg />
            {!user ? (
              <span></span>
            ) : (
              <div className="flex flex-col">
                {user.firstName && user.lastName ? (
                  <span>
                    {user.lastName} {user.firstName}
                  </span>
                ) : (
                  <span>{user.email}</span>
                )}
                <span className="text-sm">Особистий кабінет</span>
              </div>
            )}
          </Link>
        </div>
        <div className="flex flex-col [&>a]:text-2xl [&>a]:px-0 [&>a]:py-[15px] [&>a:has(+a)]:border-b-[color:var(--prime-color)] [&>a:has(+a)]:border-b [&>a:has(+a)]:border-solid hover:[&>a]:opacity-80">
          <Link {...closeProp} href="/">
            
          </Link>
          <Link {...closeProp} href="/soon">
            
          </Link>
          {/* <Link {...closeProp} href="/">
            Акції та новини
          </Link> */}
          <Link {...closeProp} href="/about">
            
          </Link>
          <Link {...closeProp} href="/faq">
            
          </Link>
        </div>
        {isRightHeader && (
          <RightHeader
            usedClassNames={['']}
            onClickLink={() => setMenuOpen(false)}
          />
        )}
        <div className="flex flex-col [&>a]:mb-2 hover:[&>a]:opacity-80">
          <Link {...closeProp} href="/terms">
            
          </Link>
          <Link {...closeProp} href="/privacy-policy">
            
          </Link>
        </div>
        <div className="flex [&>a]:mr-4 hover:[&>a]:opacity-70 [&>a>svg]:w-[60px]">
          <a href="https://www.visa.com.ua" target="_blank">
            <Visa />
          </a>
          <a href="https://www.mastercard.ua" target="_blank">
            <MasterCard />
          </a>
        </div>
      </div>
    </div>
  );
};
