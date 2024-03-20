import { ImageResponse } from 'next/server';
import { graphql } from '@/gql';
import { apolloServerClient } from '@/apollo-server-client';
import Logo from '@/app/icons/logo.svg';
type Props = {
  params: {
    filmSlug: string;
  };
};
const filmsOpengraphImageDocument = graphql(`
  query FilmsOpengraphImage($filter: FilterFilmInput) {
    films(filter: $filter) {
      StandartImage
    }
  }
`);

export const alt = '';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params: { filmSlug } }: Props) {
  const apolloClient = apolloServerClient();
  const { data } = await apolloClient.query({
    query: filmsOpengraphImageDocument,
    variables: { filter: { Slugs: [filmSlug] } },
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
        {data.films.length ? (
          <img
            src={`${process.env.HOST}/images/${data.films[0].StandartImage}`}
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
