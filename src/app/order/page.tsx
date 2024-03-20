import { apolloServerClient } from '@/apollo-server-client';
import { graphql, useFragment as getFragmentData } from '@/gql';
import { ordersFragment } from '../gql/orders-fragment';
import { Order } from '../auth/components/Profile/TicketsTab/Order';
import { OrderProvider } from '../auth/components/Profile/TicketsTab/OrderProvider';
import Link from 'next/link';
import { useMemo } from 'react';
import { OrderChairStatus } from '@/gql/graphql';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

type OrderPageProps = {
  searchParams: { id: string };
};

const orderDocument = graphql(`
  query Order($filter: OrderFilter) {
    orders(filter: $filter) {
      ...ordersFragment
    }
  }
`);

export default async function OrderPage({
  searchParams: { id },
}: OrderPageProps) {
  const regex = /[0-9A-Fa-f]{24}/g;
  if(!id.match(regex)) {
    redirect('/');
  }
  const apolloClient = apolloServerClient();
  const { data } = await apolloClient.query({
    query: orderDocument,
    variables: { filter: { ids: [id] } },
  });
  const orders = getFragmentData(ordersFragment, data.orders);
  const isSuccess = !orders.length
    ? false
    : orders[0].sessions.reduce((res, session) => {
        if (!res) return false;
        return session.chairs.reduce((res, chair) => {
          if (!res) return false;
          return chair.status === OrderChairStatus.Bought;
        }, true);
      }, true);

  if (!isSuccess) {
    redirect('/checkout');
  }
  return (
    <div className="flex flex-col my-10">

    </div>
  );
}
