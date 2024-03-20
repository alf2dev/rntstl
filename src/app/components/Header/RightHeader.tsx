import { FC } from 'react';
import Instagram from './icons/instagram.svg';
import classnames from 'classnames';
import Facebook from './icons/facebook.svg';
import Email from '@/app/icons/email.svg';
import Phone from '@/app/icons/phone.svg';
import Mark from '@/app/icons/mark.svg';

export interface RightHeaderProps {
  usedClassNames?: string[];
  onClickLink?: () => void;
}

export const RightHeader: FC<RightHeaderProps> = ({ usedClassNames = [], onClickLink = () => {} }) => {
  return (
    <div className={classnames('flex items-center justify-between min-w-[30%] lg:flex-col lg:items-start', ...usedClassNames)}>
      <div className='flex [&>a]:flex [&>a]:items-center [&>a]:justify-center [&>a]:w-10 [&>a]:h-10 [&>a]:shadow-default [&>a]:mr-5 [&>a]:p-2.5 [&>a]:rounded-[100%] [&>a>svg]:h-full [&>a>svg]:max-w-[30px] lg:mb-5 hover:[&>a]:opacity-80'>
        <a onClick={onClickLink} href="https://www.instagram.com/kinoman.cosmo" target="_blank" rel="noopener noreferrer">
          <Instagram />
        </a>
        <a onClick={onClickLink} href="https://www.facebook.com/kinoman.ua/" target="_blank" rel="noopener noreferrer">
          <Facebook />
        </a>
        <a onClick={onClickLink} href="mailto:info@kinoman.ua" rel="noopener noreferrer">
          <Email />
        </a>
        <a onClick={onClickLink} href="tel:+380674492592" rel="noopener noreferrer">
          <Phone />
        </a>
        <a onClick={onClickLink} href="https://maps.app.goo.gl/vRvYCQyv9oHXUPXbA" target="_blank">
              <Mark />
        </a>
      </div>
      {/* <div className="flex items-center justify-center h-10 shadow-default px-[5px] py-0 rounded-st [&>div]:text-xs [&>div]:px-2 [&>div]:py-2.5 [&>div]:rounded-st">
        <div>UA</div>
        <div className="text-white bg-gradient-to-br from-primelight via-primary to-black">EN</div>
      </div> */}
    </div>
  );
};