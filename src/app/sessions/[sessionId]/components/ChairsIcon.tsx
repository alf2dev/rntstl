import { FC } from 'react';
import styles from '../css/ChairsIcon.module.css';

export enum NameIcon {
  placeFree = 'placeFree',
  placeSelect = 'placeSelect',
  placeReserve = 'placeReserve',
  placeOccupied = 'placeOccupied',
}

export interface SVGProps {
  name: NameIcon;
}

export const ChairsIcon: FC<SVGProps> = ({ name }) => {
  const className = styles[name];
  const svgProps = { className, xmlns: 'http://www.w3.org/2000/svg' };

  return (
    <svg {...svgProps} viewBox="0 0 35.81 29.89">
      <path
        d="M1022.62,87.11a3.26,3.26,0,0,1,3.26-3.26h21.3a3.26,3.26,0,0,1,3.26,3.26v23.38h-27.82Z"
        transform="translate(-1018.63 -83.41)"
      />
      <path
        d="M1019.07,97.17a1.48,1.48,0,0,1,1.48-1.48h1.78a1.48,1.48,0,0,1,1.48,1.48V109a1.48,1.48,0,0,1-1.48,1.48h-1.78a1.48,1.48,0,0,1-1.48-1.48Z"
        transform="translate(-1018.63 -83.41)"
      />
      <path
        d="M1049.26,96.24a1.48,1.48,0,0,1,1.48-1.48h1.77a1.48,1.48,0,0,1,1.48,1.48v12.43a1.47,1.47,0,0,1-1.48,1.47h-1.77a1.47,1.47,0,0,1-1.48-1.47Z"
        transform="translate(-1018.63 -83.41)"
      />
      <path
        d="M1022.62,109a1.48,1.48,0,0,1,1.48-1.48H1049a1.48,1.48,0,0,1,1.48,1.48v2.37a1.48,1.48,0,0,1-1.48,1.48H1024.1a1.48,1.48,0,0,1-1.48-1.48Z"
        transform="translate(-1018.63 -83.41)"
      />
    </svg>
  );
};
