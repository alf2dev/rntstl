import { graphql } from '@/gql';
import React, { useMemo } from 'react';
import { apolloServerClient } from '@/apollo-server-client';
import { SessionPage } from './components/SessionPage';
import Link from 'next/link';
import type { Metadata } from 'next';
import { dateParser } from '@/app/helper/DateParser';

type SessionProps = {
  params: {
    sessionId: string;
  };
};


const cinemaSessionChairsDocument = graphql(`
  query SessionInfo(
    $sessionSchemaId: Int!
    $filter: FilterCinemaSessionInput
    $isCaching: Boolean
  ) {
    sessionSchema(id: $sessionSchemaId) {
      Id
      PlaceNumber
      Price
      RowNumber
      Status
    }
    cinemaSessions(filter: $filter, isCaching: $isCaching) {
      FilmID
      FilmName
      FilmType
      Finish
      ID
      OccupiedAmount
      PlaceAmount
      PlaceGroupName
      Start
      film {
        Slug
        Age
      }
    }
  }
`);

export async function generateMetadata({
  params: { sessionId },
}: SessionProps): Promise<Metadata> {
  const apolloClient = apolloServerClient();
  const { data } = await apolloClient.query({
    query: cinemaSessionChairsDocument,
    variables: {
      sessionSchemaId: +sessionId,
      filter: { Ids: [+sessionId] },
      isCaching: true,
    },
    fetchPolicy: 'network-only',
  });
  if (!data.cinemaSessions.length) {
    return {
      title: '',
      description:
        '',
    };
  }
  const { day, year, month, dateWeekFull, hours, minutes } = dateParser(
    data.cinemaSessions[0].Start,
  );

  return {
    title:
      `${data.cinemaSessions[0].FilmName} на ${hours}:${minutes} ${dateWeekFull} ${day}.${month}.${year}` ||
      '',
    description: data.cinemaSessions[0].FilmName
      ? `${data.cinemaSessions[0].FilmName}  ${hours}:${minutes} ${dateWeekFull} ${day}.${month}.${year}`
      : '',
    openGraph: {
      title:
        `${data.cinemaSessions[0].FilmName} на ${hours}:${minutes} ${dateWeekFull} ${day}.${month}.${year}` ||
        '',
      description: data.cinemaSessions[0].FilmName
        ? `${data.cinemaSessions[0].FilmName}  ${hours}:${minutes} ${dateWeekFull} ${day}.${month}.${year}`
        : '',
      url: process.env.HOST,
      siteName: '',
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function Session({ params: { sessionId } }: SessionProps) {
  const apolloClient = apolloServerClient();
  const id = +sessionId;
  const { data } = isNaN(id)
    ? { data: undefined }
    : await apolloClient.query({
        query: cinemaSessionChairsDocument,
        variables: {
          sessionSchemaId: +sessionId,
          filter: { Ids: [+sessionId] },
          isCaching: true,
        },
        fetchPolicy: 'network-only',
      });
  return !!(data && data.cinemaSessions.length) ? (
    <SessionPage
      sessionSchema={data.sessionSchema}
      session={data.cinemaSessions[0]}
    />
  ) : (
    <div className="max-w-[600px] mt-[40px] text-center text-xl">
      {' '}
      <Link className="text-primelight hover:opacity-80" href={'/'}>
        
      </Link>{' '}
      
    </div>
  );
}
