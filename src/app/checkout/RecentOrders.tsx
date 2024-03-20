'use client';
import { graphql, useFragment } from '@/gql';
import { useQuery } from '@apollo/client';
import React, { FC } from 'react';
import { ContinuePayButton } from '../components/PayButton/ContinuePayButton';
import { Timer } from '@/app/components/Timer';
import Image from 'next/image';
import { ordersFragment } from '../gql/orders-fragment';
import { OrderStatus, OrdersFragmentFragment } from '@/gql/graphql';
import { dateParser } from '../helper/DateParser';

type RecentOrdersProps = {
  initOrders: readonly OrdersFragmentFragment[];
};

const recentOrdersDocument = graphql(`
  query RecentOrders($filter: OrderFilter) {
    orders(filter: $filter) {
      ...ordersFragment
    }
  }
`);

export const RecentOrders: FC<RecentOrdersProps> = ({ initOrders }) => {
  const { data, refetch } = useQuery(recentOrdersDocument, {
    variables: {
      filter: {
        statuses: [OrderStatus.Created],
      },
    },
    fetchPolicy: 'cache-and-network',
  });
  const orders = useFragment(ordersFragment, data?.orders);
  const filteredOrders = (orders || initOrders || []).filter(
    ({ remainsPayingSeconds }) => remainsPayingSeconds > 0,
  );
  return (
    !!filteredOrders.length && (
      <div className="bg-gray p-2.5 rounded-st">
        <span className="flex text-xl mb-5"></span>
        {filteredOrders.map(
          ({
            _id,
            liqpayData,
            liqpaySignature,
            remainsPayingSeconds,
            sessions,
            create_date,
          }) => (
            <div key={_id}>
              <div className="mb-5">
                <Timer
                  timeSeconds={new Number(remainsPayingSeconds || 1)}
                  onTimeout={() => {
                    refetch();
                  }}
                />
              </div>
              <div>
                {sessions.map(
                  ({
                    sessionId,
                    filmName,
                    start,
                    finish,
                    age,
                    filmType,
                    placeGroupName,
                    remainsRefundSeconds,
                    chairs,
                    standardImage,
                  }) => {
                    const { dateWeekFull, day, month, year } =
                      dateParser(start);
                    return (
                      <div
                        key={sessionId}
                        className="flex justify-between mb-[30px] lg:flex-col"
                      >
                        <div className="flex 2xs:flex-col">
                          <div className="relative w-[100px] h-[150px] mr-5 2xs:mb-2 2xs:w-[100%] 2xs:h-[300px]">
                            <Image
                              src={`/images/${standardImage}`}
                              fill
                              layout="fill"
                              objectFit="cover"
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col max-w-[300px] first:[&>span]:text-xl lg:max-w-full">
                            <span>{filmName}</span>
                            <span>
                              {start.substring(11, 16)} -{' '}
                              {finish.substring(11, 16)}
                            </span>
                            <span>
                              : {`${dateWeekFull} ${day}.${month}.${year}`}
                            </span>
                            <span>Вік: {age}+</span>
                            <span>Формат: {filmType}</span>
                            <span>{placeGroupName}</span>
                          </div>
                        </div>

                        <div className="flex w-[350px] flex-col lg:w-full lg:mt-5">
                          <span className="mb-5"></span>
                          <div className="flex flex-col">
                            {chairs.map(
                              ({
                                barcode,
                                chairId,
                                price,
                                row,
                                place,
                                ticketID,
                                status,
                              }) => (
                                <div
                                  key={ticketID}
                                  data-slot="chair"
                                  className="relative flex justify-between items-center shadow-default mb-5 p-2.5 rounded-st bg-white"
                                >
                                  <div
                                    data-slot="chairDetail"
                                    className="flex [&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:mr-5 first:[&>div>span]:text-2xl last:[&>div>span]:text-sx"
                                  >
                                    <div data-slot="row">
                                      <span>{row}</span>
                                      <span></span>
                                    </div>
                                    <div data-slot="place">
                                      <span>{place}</span>
                                      <span></span>
                                    </div>
                                  </div>
                                  <div data-slot="chairPrice">
                                    <span className="text-lg">{price}</span>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
              <ContinuePayButton
                data={liqpayData || ''}
                signature={liqpaySignature || ''}
              />
            </div>
          ),
        )}
      </div>
    )
  );
};
