import {
  ChairsLockedSubscription,
  LockChairsMutation,
  SessionInfoQuery,
} from '@/gql/graphql';

export type ChairType = SessionInfoQuery['sessionSchema'][number];

export type LockedChairType =
  | LockChairsMutation['lockChairs'][number]
  | ChairsLockedSubscription['chairsLocked'][number];
