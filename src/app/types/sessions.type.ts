import { FilmListQuery } from '@/gql/graphql';

export type FilmListSession =
  FilmListQuery['films'][number]['sessions'][number];
export type SessionInfo = Pick<
  FilmListSession,
  'ID' | 'FilmType' | 'PlaceGroupName'
> & {
  time: string;
};