import React from 'react';
import { FilmContainer } from './components/Film';
import type { Metadata } from 'next';
import { graphql } from '@/gql';
import { apolloServerClient } from '@/apollo-server-client';
import Link from 'next/link';

type Props = {
  params: {
    filmSlug: string;
  };
};

const filmsQueryDocument = graphql(`
  query Films($filter: FilterFilmInput) {
    films(filter: $filter) {
      Age
      Cast
      ComingSoon
      Description
      Director
      Duration
      End
      FilmLang
      Genre
      HighResImage
      ID
      LowResImage
      Name
      OriginalLang
      PremiereEnd
      PremiereStart
      StandartImage
      Start
      Trailer
      Slug
      sessions {
        FilmID
        FilmName
        FilmType
        Finish
        ID
        OccupiedAmount
        PlaceAmount
        PlaceGroupName
        Start
      }
    }
  }
`);

export async function generateMetadata({
  params: { filmSlug },
}: Props): Promise<Metadata> {
  const apolloClient = apolloServerClient();
  const { data } = await apolloClient.query({
    query: filmsQueryDocument,
    variables: { filter: { Slugs: [filmSlug] } },
  });

  const name = data?.films[0]?.Name;
  return {
    title: name || '',
    description: name
      ? ` ${name} `
      : '',
    openGraph: {
      title: `${name} | ` || '',
      description: name
      ? ` ${name} `
      : '',
      url: process.env.HOST,
      siteName: '',
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function Films({ params: { filmSlug } }: Props) {
  const apolloClient = apolloServerClient();
  const { data } = await apolloClient.query({
    query: filmsQueryDocument,
    variables: { filter: { Slugs: [filmSlug] } },
  });
  if (!data.films.length) {
    return (
      <div className="max-w-[600px] mt-[40px] text-center text-xl">
        {' '}
        <Link className="text-primelight hover:opacity-80" href={'/'}>
          
        </Link>{' '}
        
      </div>
    );
  }
  const film = data.films[0];

  return (
    <>
      <FilmContainer film={film} />
    </>
  );
}
