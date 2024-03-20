import { graphql } from '@/gql';

export const lockChairsInfoFragment = graphql(`
  fragment lockChairsInfoFragment on LockedChairsInfo {
    Barcode
    CinemaSessionID
    FilmName
    ID
    IsPayed
    LockDate
    PlaceName
    PlaceNumber
    RowNumber
    Start
    TicketID
    Price
    film {
      Age
      StandartImage
    }
    session {
      FilmType
      Finish
      PlaceGroupName
    }
  }
`);
