import { graphql, useFragment as getFragmentData } from '@/gql';
import { apolloServerClient } from '@/apollo-server-client';
import { ActiveTickets } from './ActiveTickets';
import { RecentOrders } from './RecentOrders';
import { ordersFragment } from '../gql/orders-fragment';
import { OrderStatus } from '@/gql/graphql';
import { lockChairsInfoFragment } from '../gql/lock-chairs-fragment';

const lockedChairsAndOrdersDocument = graphql(`
  query LockedChairsAndOrders($filter: OrderFilter) {
    orders(filter: $filter) {
      ...ordersFragment
    }
    lockedChairs {
      ...lockChairsInfoFragment
    }
    sessionRemainTime
  }
`);

export default async function Checkout() {
  const apolloClient = apolloServerClient();

  const { data } = await apolloClient.query({
    query: lockedChairsAndOrdersDocument,
    variables: {
      filter: {
        statuses: [OrderStatus.Created],
      },
    },
  });
  const orders = getFragmentData(ordersFragment, data?.orders);
  const lockedChairs = getFragmentData(
    lockChairsInfoFragment,
    data?.lockedChairs,
  );
  const hasOrders = !!orders.length

  return (
    <div className="w-full max-w-[1200px] my-[30px]">
      <span className="flex text-xl mb-5"></span>
      <ActiveTickets
        initSessionRemainTime={data.sessionRemainTime}
        lockedChairsInit={lockedChairs}
        hasOrders={hasOrders}
      />
      {hasOrders && <RecentOrders initOrders={orders} />}
    </div>
  );
}
