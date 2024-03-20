import { graphql } from '@/gql';
import { FilmListQuery } from '@/gql/graphql';

export const filmsQueryDocument = graphql(`
  query filmList {
    films {
      Age
      Cast
      ComingSoon
      Description
      Director
      Duration
      End
      FilmLang
      Genre
      HighResImage
      ID
      LowResImage
      Name
      OriginalLang
      PremiereEnd
      PremiereStart
      StandartImage
      Start
      Trailer
      Slug
      sessions {
        FilmID
        FilmName
        FilmType
        Finish
        ID
        OccupiedAmount
        PlaceAmount
        PlaceGroupName
        Start
      }
    }
    sortedFilmIds
  }
`);

export type Film = FilmListQuery['films'][number] & {
  isShortTemplate?: boolean;
};
