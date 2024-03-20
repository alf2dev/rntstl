'use client';
import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
} from 'react';
import { useGlobalState } from '@/app/providers/GlobalState';

type CloseMenuProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const CloseMenu: FC<CloseMenuProps> = ({
  children,
  onClick,
  ...restProps
}) => {
  const { menuOpen, setMenuOpen } = useGlobalState();

  return (
    <div
      onClick={(ev) => {
        if (menuOpen) setMenuOpen(false);
        onClick && onClick(ev);
      }}
      {...restProps}
    >
      {children}
    </div>
  );
};
