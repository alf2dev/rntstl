import { apolloServerClient } from '@/apollo-server-client';
import { Header } from './components/Header';
import { Providers } from './providers/Providers';
import { Metadata } from 'next';
import { NormalizedCacheObject } from '@apollo/client';
import { graphql, useFragment as getFragmentData } from '@/gql';
import { userFragment } from './gql/user-fragment';
import { Reenie_Beanie, Montserrat } from 'next/font/google';
import DaysOne from 'next/font/local';
import './globals.css';
import { CloseMenu } from './helper/CloseMenu';

const reenieBeanie = Reenie_Beanie({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-reenie-beanie',
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700'],
  style: 'normal',
  variable: '--font-montserrat',
});

const daysOne = DaysOne({
  src: './fonts/DaysOne-Regular.woff2',
  variable: '--font-days-one',
});

export const userDocument = graphql(`
  query User {
    lockedChairs {
      ...lockChairsInfoFragment
    }
    user {
      ...userFragment
    }
    sessionRemainTime
  }
`);

export const metadata: Metadata = {
  title: {
    template: '%s | ',
    default: '',
    absolute: '',
  },
};

export const fetchCache = 'default-no-store';
export const revalidate = 1;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apolloClient = apolloServerClient();
  const { data } = await apolloClient.query({
    query: userDocument,
  });
  const user = getFragmentData(userFragment, data.user);
  const initApolloData: NormalizedCacheObject = apolloClient.cache.extract();
  return (
    <html lang="en">
      <body className={`${reenieBeanie.variable} ${montserrat.variable}`}>
        <Providers
          initApolloData={JSON.parse(JSON.stringify(initApolloData))}
          initUser={user}
        >
          <Header />
          <main>
            <CloseMenu className="flex flex-col justify-between items-center mt-[var(--header-height)] px-[60px] py-0 md:px-2.5 md:py-0 md:mb-[var(--header-height)]">
              {children}
            </CloseMenu>
          </main>
        </Providers>
      </body>
    </html>
  );
}
