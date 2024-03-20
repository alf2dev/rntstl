import Image from 'next/image';
import React, { FC, memo } from 'react';
import { FilmsQuery } from '@/gql/graphql';
import Play from '@/app/icons/play.svg';
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import YouTube from 'react-youtube';
import { FilmStatus } from '@/app/components/FilmStatus';

type FilmLeftImageProps = {
  film: FilmsQuery['films'][number];
};

const FilmLeftImageComponent: FC<FilmLeftImageProps> = ({ film }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const optsYouTube = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div className="flex flex-col items-center mr-10 mb-5 md:mr-0">
      <div className="relative w-[250px] h-[400px] overflow-hidden rounded-[15px]">
        <Image
          src={`/images/${film.StandartImage}`}
          fill
          layout="fill"
          objectFit="cover"
          alt=""
        />
        <FilmStatus film={film} />
        {!!film.OriginalLang && (
          <div className="absolute px-2 py-1 right-0 bottom-[30px] z-[9999999] text-center text-base text-white bg-green group-hover:bottom-[50px] group-hover:w-full">
            
          </div>
        )}
      </div>
      {!!film.Trailer && (
        <div
          className="flex items-center justify-around w-[90%] h-10 max-w-[250px] shadow-default text-primary mt-[15px] px-[5px] py-0 rounded-st cursor-pointer hover:opacity-80 [&>svg]:w-5 [&>svg]:h-5"
          onClick={() => onOpen()}
        >
          <span></span>
          <Play />
        </div>
      )}
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
          {!!film.Trailer && (
            <YouTube
              videoId={film.Trailer}
              opts={optsYouTube}
              className="h-[400px] w-full"
            />
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export const FilmLeftImage = memo(FilmLeftImageComponent);
