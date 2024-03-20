import { ImageResponse } from 'next/server';
import { graphql } from '@/gql';
import { apolloServerClient } from '@/apollo-server-client';
import Logo from '@/app/icons/logo.svg';
type SessionProps = {
  params: {
    sessionId: string;
  };
};

const cinemaSessionOpengraphImageDocument = graphql(`
  query SessionOpengraphImage(
    $filter: FilterCinemaSessionInput
    $isCaching: Boolean
  ) {
    cinemaSessions(filter: $filter, isCaching: $isCaching) {
      film {
        StandartImage
      }
    }
  }
`);


export const alt = '';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params: { sessionId } }: SessionProps) {
  const apolloClient = apolloServerClient();
  const { data } = await apolloClient.query({
    query: cinemaSessionOpengraphImageDocument,
    variables: {
      filter: { Ids: [+sessionId] },
      isCaching: true,
    },
  });
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data.cinemaSessions.length ? (
          <img
            src={`${process.env.HOST}/images/${data.cinemaSessions[0].film?.StandartImage}`}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Logo style={{
            width: '1100',
            height: '120',
          }}/>
        )}
      </div>
    ),
    {
      ...size,
    },
  );
}
