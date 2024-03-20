'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperProps, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper';

type SwiperWrapperProps = React.RefAttributes<SwiperRef> &
  SwiperProps & {
    swiperActive: (width: number) => boolean;
    swiperSlideClassName?: string;
  };

export const SwiperWrapper: FC<SwiperWrapperProps> = ({
  children,
  swiperActive,
  swiperSlideClassName,
  ...restProps
}) => {
  const [isRenderSwiper, setIsRenderSwiper] = useState(false);
  const swiperRef = useRef<SwiperClass | undefined>();
  useEffect(() => {
    const handleResize = (ev?: UIEvent) => {
      const width = window.innerWidth;
      const isActive = swiperActive(width);
      setIsRenderSwiper(isActive);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const childrenWrapper = (children: React.ReactNode) =>
    React.Children.map(children, (child, index) => (
      <SwiperSlide key={index} className={swiperSlideClassName}>
        {child}
      </SwiperSlide>
    ));
  return (
    <Swiper
      {...restProps}
      onInit={(swiper) => {
        swiperRef.current = swiper;
        restProps.onInit && restProps.onInit(swiper);
      }}
    >
      {childrenWrapper(children)}
    </Swiper>
  );
};

export default SwiperWrapper;
