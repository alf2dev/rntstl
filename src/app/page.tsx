import { graphql, useFragment as getFragmentData } from '@/gql';
import { userFragment } from './gql/user-fragment';
import 'swiper/css';
import { HomeSlider } from './components/HomeSessions/HomeSlider';
import { apolloServerClient } from '@/apollo-server-client';
import { Metadata } from 'next';
import { ConfirmRegistration } from './components/ConfirmRegistration/ConfirmRegistration';
import {
  FilmListQuery,
  LockChairsInfoFragmentFragment,
  UserFragmentFragment,
} from '@/gql/graphql';
import { lockChairsInfoFragment } from './gql/lock-chairs-fragment';
import { filmsQueryDocument } from './gql/films-document';

type HomeProps = {
  searchParams: { token?: string };
};

const confirmRegistrationDocument = graphql(`
  query ConfirmRegistration($token: String!) {
    confirmRegistration(token: $token) {
      ...userFragment
    }
    lockedChairs {
      ...lockChairsInfoFragment
    }
  }
`);

export async function generateMetadata(...args: any): Promise<Metadata> {
  return {
    title: '',
    description:
      '',
    openGraph: {
      title: '',
      description:
        '',
      url: process.env.HOST,
      siteName: '',
      images: [
        {
          url: `${process.env.HOST}/img/logo.png`,
          width: 362,
          height: 50,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function Home({ searchParams: { token } }: HomeProps) {
  const apolloClient = apolloServerClient();
  const { data } = await apolloClient.query({
    query: filmsQueryDocument,
  });
  const films = data.films.filter(({ sessions }) => sessions.length);
  const orderedFilms = data.sortedFilmIds.reduce<FilmListQuery['films']>(
    (acc, id) => {
      const index = films.findIndex(({ ID }) => ID === id);
      if (index !== -1) {
        const film = films.splice(index, 1);
        acc.push(film[0]);
      }
      return acc;
    },
    [],
  );

  let userData: UserFragmentFragment | null | undefined;
  let userError: string | undefined;
  let lockedChairs: readonly LockChairsInfoFragmentFragment[] | undefined;
  if (token) {
    try {
      const { data } = await apolloClient.query({
        query: confirmRegistrationDocument,
        variables: { token },
      });
      userData = getFragmentData(userFragment, data?.confirmRegistration);
      lockedChairs = getFragmentData(
        lockChairsInfoFragment,
        data?.lockedChairs,
      );
    } catch (error) {
      if (error instanceof Error) userError = error.message;
    }
  }
  return (
    <>
      {token && (
        <ConfirmRegistration
          user={userData}
          error={userError}
          lockedChairs={lockedChairs}
        />
      )}
      <HomeSlider films={[...orderedFilms, ...films]} />
    </>
  );
}
