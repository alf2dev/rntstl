import { graphql } from '@/gql';

export const ordersFragment = graphql(`
  fragment ordersFragment on Order {
    _id
    create_date
    liqpayData
    liqpaySignature
    payment_id
    remainsPayingSeconds
    sessions {
      age
      chairs {
        barcode
        chairId
        place
        price
        row
        status
        ticketID
      }
      filmId
      filmName
      filmType
      finish
      placeGroupName
      remainsRefundSeconds
      sessionId
      standardImage
      start
    }
    status
    token
    userId
  }
`);
