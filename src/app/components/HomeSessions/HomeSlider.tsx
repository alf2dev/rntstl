'use client';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import { FilmListQuery } from '@/gql/graphql';
import { FilmSlide } from './FilmSlide';
import Link from 'next/link';
import SwiperClass from 'swiper';
import Next from './icons/next.svg';
import Prev from './icons/prev.svg';
import classnames from 'classnames';
import { useResize } from '@/app/hooks/useResize';
import { debounce } from '@/app/helper/debounce';

import { usePathname } from 'next/navigation';
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import YouTube from 'react-youtube';
import { Film } from '@/app/gql/films-document';

export interface HomeSliderProps {
  films: Film[];
}

const mobileWidth = 769;

export const HomeSlider: FC<HomeSliderProps> = ({ films }) => {
  const swiperRef = useRef<SwiperClass | undefined>();
  const swiperNodeElementRef = useRef<
    (SwiperRef & { scrollHeight: number }) | null
  >(null);
  const isMobileActive = useRef(true);
  const heightMobileContainer = useRef(0);
  const scrollYMobile = useRef(0);

  const [slideStatus, setSlideStatus] = useState<[boolean, boolean]>([
    false,
    false,
  ]);
  const checkStatus = () => {
    const isBeginning = !swiperRef.current?.isBeginning;
    const isEnd = !swiperRef.current?.isEnd;
    setSlideStatus([isBeginning, isEnd]);
  };
  const clickNext = () => {
    if (!isMobileActive.current) {
      swiperRef.current?.slideNext();
      checkStatus();
    }
  };
  const clickPrev = () => {
    if (!isMobileActive.current) {
      swiperRef.current?.slidePrev();
      checkStatus();
    }
  };

  const onChangeScrollY = useCallback(
    debounce(() => {
      if (window.innerWidth < mobileWidth) {
        scrollYMobile.current = window.scrollY;
      }
    }),
    [],
  );

  useEffect(() => {
    checkStatus();
    if (isMobileActive.current && window.innerWidth < mobileWidth) {
      onChangeScrollY();
      window.addEventListener('scroll', onChangeScrollY);
    }
    return () => {
      window.removeEventListener('scroll', onChangeScrollY);
    };
  }, [onChangeScrollY]);

  useResize((width) => {
    const prevIsMobileActive = isMobileActive.current;
    isMobileActive.current = width < mobileWidth;
    if (isMobileActive.current) {
      heightMobileContainer.current =
        swiperNodeElementRef?.current?.scrollHeight || 0;
    }
    if (!isMobileActive.current) {
      swiperRef.current?.mousewheel.enable();
    }

    if (isMobileActive.current === prevIsMobileActive) return;

    if (swiperRef.current && swiperNodeElementRef.current) {
      const height = heightMobileContainer.current;
      swiperRef.current.allowTouchMove = !isMobileActive.current;

      if (!height) return;
      const heightItem = height / films.length;

      if (isMobileActive.current) {
        window.addEventListener('scroll', onChangeScrollY);
        const index = swiperRef.current.realIndex;
        swiperRef.current.mousewheel.disable();
        window.scrollTo({
          top: heightItem * index + window.scrollY + 80,
          behavior: 'instant',
        });
      } else {
        swiperRef.current.mousewheel.enable();
        window.removeEventListener('scroll', onChangeScrollY);
        const scrollPos = Math.round(
          (scrollYMobile.current / height) * films.length,
        );
        swiperRef.current.slideTo(scrollPos, 0);
      }
    }
  });
  const pathname = usePathname();

  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    onClose: () => setIdTrailer(undefined),
  });
  const [idTrailer, setIdTrailer] = useState<string>();
  const optsYouTube = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="relative w-full">
      <div
        className={classnames(
          'absolute top-[calc(50%-20px)] h-20 w-10 cursor-pointer transition-all duration-[0.3s] z-[9] px-2.5 py-5 rounded-st bg-white/40 md:hidden hover:opacity-60 -left-5',
          {
            ['hidden']: !slideStatus[0],
          },
        )}
        onClick={clickPrev}
      >
        <Prev />
      </div>
      <div
        className={classnames(
          'absolute top-[calc(50%-20px)] h-20 w-10 cursor-pointer transition-all duration-[0.3s] z-[9] px-2.5 py-5 rounded-st bg-white/40 md:hidden hover:opacity-60 -right-5',
          {
            ['hidden']: !slideStatus[1],
          },
        )}
        onClick={clickNext}
      >
        <Next />
      </div>
      <Swiper
        wrapperClass={'md:flex-col trarsform-important'}
        onInit={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={0}
        slidesPerView={'auto'}
        mousewheel={false}
        modules={[Mousewheel]}
        onSlideChange={() => checkStatus()}
        className={classnames(
          'flex h-[calc(100vh-var(--header-height)-var(--filter-height))] overflow-visible md:h-full 1hh:h-[calc(100vh-var(--header-height)-20px)] visible-important',
        )}
        ref={swiperNodeElementRef}
      >
        {films.map((film) => (
          <SwiperSlide key={film.ID} className={'w-auto-important'}>
            <div
              className={`w-[400px] h-full px-5 py-0 md:h-[680px] md:w-auto md:mb-[30px] md:p-0 1hh:w-[700px]`}
            >
              <FilmSlide
                film={film}
                onClickTrailer={(id) => {
                  setIdTrailer(id);
                  onOpen();
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        classNames={{
          body: 'py-6 ',
          base: 'max-w-[800px] h-[400px] border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]',
          header: 'border-b-[1px] border-[#292f46]',
          footer: 'border-t-[1px] border-[#292f46]',
          closeButton: 'hover:bg-white/5 active:bg-white/10',
        }}
      >
        <ModalContent>
          <YouTube
            videoId={idTrailer}
            opts={optsYouTube}
            className="h-[400px] w-full"
          />
        </ModalContent>
      </Modal>
      <div className="h-[var(--filter-height)] flex flex-row items-center justify-around 1hh:hidden font-bold text-lg hover:[&>a]:opacity-80">
        <Link
          href="/"
          className={`${
            pathname === '/' && 'border-solid border-b-4 border-primary'
          }`}
        >

        </Link>
        <Link
          href="/soon"
          className={`${
            pathname === '/soon' && 'border-solid border-b-4 border-primary'
          }`}
        >

        </Link>

      </div>
    </div>
  );
};
