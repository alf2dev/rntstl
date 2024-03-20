import 'swiper/css';
import { HomeSlider } from '@/app/components/HomeSessions/HomeSlider';
import { apolloServerClient } from '@/apollo-server-client';
import { Metadata } from 'next';
import { Film, filmsQueryDocument } from '@/app/gql/films-document';

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

export default async function Soon() {
  const apolloClient = apolloServerClient();
  const { data } = await apolloClient.query({
    query: filmsQueryDocument,
  });
  const date = Date.now();
  const films: Film[] = data.films
    .filter(({ ComingSoon, Start, sessions }) => {
      const start = Start ? new Date(Start).getTime() : undefined;
      if (!ComingSoon || (start && start <= date)) {
        return false;
      }
      return true;
    })
    .sort((film1, film2) => {
      return (
        new Date(film1.Start || '3000-01-01 00:00:00').getTime() -
        new Date(film2.Start || '3000-01-01 00:00:00').getTime()
      );
    })
    .map((film) => ({ ...film, isShortTemplate: true }));

  return <HomeSlider films={films} />;
}
