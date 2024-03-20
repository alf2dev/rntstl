/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Chair = {
  __typename?: 'Chair';
  id: Scalars['Int']['output'];
  status: ChairStatus;
};

export type ChairDto = {
  id: Scalars['Float']['input'];
  lock: Scalars['Boolean']['input'];
};

export type ChairInfo = {
  __typename?: 'ChairInfo';
  id: Scalars['Int']['output'];
  sessionId: Scalars['Int']['output'];
  status: ChairStatus;
};

export enum ChairStatus {
  Free = 'FREE',
  Locked = 'LOCKED',
  Reserved = 'RESERVED',
  Sold = 'SOLD'
}

export type ChangePasswordInput = {
  password: Scalars['String']['input'];
};

export type CinemaSession = {
  __typename?: 'CinemaSession';
  FilmID: Scalars['Float']['output'];
  FilmName: Scalars['String']['output'];
  FilmType: Scalars['String']['output'];
  Finish: Scalars['String']['output'];
  ID: Scalars['Float']['output'];
  OccupiedAmount: Scalars['Float']['output'];
  PlaceAmount: Scalars['Float']['output'];
  PlaceGroupName: Scalars['String']['output'];
  Start: Scalars['String']['output'];
  film?: Maybe<Film>;
};

export type CinemaSessionChair = {
  __typename?: 'CinemaSessionChair';
  Id: Scalars['Int']['output'];
  PlaceNumber: Scalars['Int']['output'];
  Price: Scalars['Int']['output'];
  RowNumber: Scalars['Int']['output'];
  Status: ChairStatus;
};

export type Film = {
  __typename?: 'Film';
  Age?: Maybe<Scalars['Int']['output']>;
  Cast?: Maybe<Scalars['String']['output']>;
  ComingSoon?: Maybe<Scalars['Boolean']['output']>;
  Description?: Maybe<Scalars['String']['output']>;
  Director?: Maybe<Scalars['String']['output']>;
  Duration?: Maybe<Scalars['Int']['output']>;
  End?: Maybe<Scalars['String']['output']>;
  FilmLang?: Maybe<Scalars['String']['output']>;
  Genre?: Maybe<Scalars['String']['output']>;
  HighResImage?: Maybe<Scalars['Int']['output']>;
  ID: Scalars['Int']['output'];
  LowResImage?: Maybe<Scalars['Int']['output']>;
  Name?: Maybe<Scalars['String']['output']>;
  OriginalLang?: Maybe<Scalars['Boolean']['output']>;
  PremiereEnd?: Maybe<Scalars['String']['output']>;
  PremiereStart?: Maybe<Scalars['String']['output']>;
  Slug?: Maybe<Scalars['String']['output']>;
  StandartImage?: Maybe<Scalars['Int']['output']>;
  Start?: Maybe<Scalars['String']['output']>;
  Trailer?: Maybe<Scalars['String']['output']>;
  sessions: Array<CinemaSession>;
};

export type FilterCinemaSessionInput = {
  Finish?: InputMaybe<Scalars['String']['input']>;
  Ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  Start?: InputMaybe<Scalars['String']['input']>;
  filmIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type FilterFilmInput = {
  End?: InputMaybe<Scalars['String']['input']>;
  Ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  NotEnded?: InputMaybe<Scalars['Boolean']['input']>;
  Slugs?: InputMaybe<Array<Scalars['String']['input']>>;
  Start?: InputMaybe<Scalars['String']['input']>;
};

export type LockChairsDto = {
  chairs: Array<ChairDto>;
  sessionId: Scalars['Float']['input'];
};

export type LockedChairsInfo = {
  __typename?: 'LockedChairsInfo';
  Barcode: Scalars['String']['output'];
  CinemaSessionID: Scalars['Int']['output'];
  FilmName: Scalars['String']['output'];
  ID: Scalars['Int']['output'];
  IsPayed: Scalars['Boolean']['output'];
  LockDate: Scalars['String']['output'];
  PlaceName: Scalars['String']['output'];
  PlaceNumber: Scalars['Int']['output'];
  Price: Scalars['Float']['output'];
  RowNumber: Scalars['Int']['output'];
  Start: Scalars['String']['output'];
  TicketID: Scalars['Int']['output'];
  film?: Maybe<Film>;
  session?: Maybe<CinemaSession>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: User;
  clearBasket: Scalars['Boolean']['output'];
  confirmEditEmail: User;
  editUser: UserEdited;
  lockChairs: Array<Chair>;
  payBasket: PayData;
  refund?: Maybe<Order>;
  restorePassword: User;
  setSortedFilmIds: Scalars['Boolean']['output'];
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};


export type MutationClearBasketArgs = {
  sessionId?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationConfirmEditEmailArgs = {
  code: Scalars['String']['input'];
};


export type MutationEditUserArgs = {
  userData: UserEdit;
};


export type MutationLockChairsArgs = {
  lockChairsInput: LockChairsDto;
};


export type MutationRefundArgs = {
  refundedOrder: RefundedOrder;
};


export type MutationRestorePasswordArgs = {
  restorePasswordInput: RestorePasswordInput;
};


export type MutationSetSortedFilmIdsArgs = {
  ids: Array<Scalars['Float']['input']>;
};

export type Order = {
  __typename?: 'Order';
  _id: Scalars['String']['output'];
  create_date: Scalars['String']['output'];
  liqpayData?: Maybe<Scalars['String']['output']>;
  liqpaySignature?: Maybe<Scalars['String']['output']>;
  payment_id?: Maybe<Scalars['Float']['output']>;
  remainsPayingSeconds: Scalars['Float']['output'];
  sessions: Array<OrderSession>;
  status: OrderStatus;
  token: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type OrderChair = {
  __typename?: 'OrderChair';
  barcode: Scalars['String']['output'];
  chairId: Scalars['Float']['output'];
  place: Scalars['Float']['output'];
  price: Scalars['Float']['output'];
  row: Scalars['Float']['output'];
  status: OrderChairStatus;
  ticketID: Scalars['Float']['output'];
};

export enum OrderChairStatus {
  Bought = 'BOUGHT',
  Failed = 'FAILED',
  NotPaidYet = 'NOT_PAID_YET',
  PaidNotBought = 'PAID_NOT_BOUGHT',
  Refund = 'REFUND'
}

export type OrderFilter = {
  fromDate?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  statuses?: InputMaybe<Array<OrderStatus>>;
  toDate?: InputMaybe<Scalars['String']['input']>;
};

export type OrderSession = {
  __typename?: 'OrderSession';
  age: Scalars['Float']['output'];
  chairs: Array<OrderChair>;
  filmId: Scalars['Float']['output'];
  filmName: Scalars['String']['output'];
  filmType: Scalars['String']['output'];
  finish: Scalars['String']['output'];
  placeGroupName: Scalars['String']['output'];
  remainsRefundSeconds: Scalars['Float']['output'];
  sessionId: Scalars['Float']['output'];
  standardImage: Scalars['Float']['output'];
  start: Scalars['String']['output'];
};

export enum OrderStatus {
  Completed = 'COMPLETED',
  Created = 'CREATED',
  ErrorChecksums = 'ERROR_CHECKSUMS',
  Failed = 'FAILED',
  Finished = 'FINISHED',
  FullRefund = 'FULL_REFUND',
  PartialRefund = 'PARTIAL_REFUND',
  Timeout = 'TIMEOUT'
}

export type PayData = {
  __typename?: 'PayData';
  data: Scalars['String']['output'];
  signature: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  cinemaSessionChairs: Array<CinemaSessionChair>;
  cinemaSessions: Array<CinemaSession>;
  confirmRegistration?: Maybe<User>;
  createSessionIfNotExist: Scalars['Boolean']['output'];
  films: Array<Film>;
  hasSessions: Scalars['Boolean']['output'];
  isValidRestoreToken: Scalars['Boolean']['output'];
  lockedChairs: Array<LockedChairsInfo>;
  log: Scalars['String']['output'];
  orders: Array<Order>;
  sendRestorePassword: Scalars['Boolean']['output'];
  sessionRemainTime: Scalars['Float']['output'];
  sessionSchema: Array<CinemaSessionChair>;
  signIn?: Maybe<User>;
  signOut: Scalars['Boolean']['output'];
  signUp?: Maybe<Scalars['String']['output']>;
  sortedFilmIds: Array<Scalars['Float']['output']>;
  user?: Maybe<User>;
};


export type QueryCinemaSessionChairsArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCinemaSessionsArgs = {
  filter?: InputMaybe<FilterCinemaSessionInput>;
  isCaching?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryConfirmRegistrationArgs = {
  token: Scalars['String']['input'];
};


export type QueryFilmsArgs = {
  filter?: InputMaybe<FilterFilmInput>;
  isCaching?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryIsValidRestoreTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryLogArgs = {
  date: Scalars['DateTime']['input'];
};


export type QueryOrdersArgs = {
  filter?: InputMaybe<OrderFilter>;
};


export type QuerySendRestorePasswordArgs = {
  sendRestorePasswordInput: SendRestorePasswordInput;
};


export type QuerySessionSchemaArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySignInArgs = {
  signInInput: SignInInput;
};


export type QuerySignUpArgs = {
  signUpInput: SignUpInput;
};

export type RefundedOrder = {
  id: Scalars['String']['input'];
  sessions: Array<RefundedSessions>;
};

export type RefundedSessions = {
  chairIds: Array<Scalars['Float']['input']>;
  sessionId: Scalars['Float']['input'];
};

export type RestorePasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SendRestorePasswordInput = {
  email: Scalars['String']['input'];
};

export type SignInInput = {
  emailOrPhone: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chairsLocked: Array<ChairInfo>;
};


export type SubscriptionChairsLockedArgs = {
  onlyOwn?: InputMaybe<Scalars['Boolean']['input']>;
  sessionId?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  birthDate?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  isAdmin: Scalars['Boolean']['output'];
  isSuperAdmin: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
};

export type UserEdit = {
  birthDate?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UserEdited = {
  __typename?: 'UserEdited';
  isConfirmEmail?: Maybe<Scalars['Boolean']['output']>;
  user: User;
};

export type SignInQueryVariables = Exact<{
  signInInput: SignInInput;
}>;


export type SignInQuery = { __typename?: 'Query', signIn?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null };

export type SignUpQueryVariables = Exact<{
  signUpInput: SignUpInput;
}>;


export type SignUpQuery = { __typename?: 'Query', signUp?: string | null };

export type SendRestorePasswordQueryVariables = Exact<{
  sendRestorePasswordInput: SendRestorePasswordInput;
}>;


export type SendRestorePasswordQuery = { __typename?: 'Query', sendRestorePassword: boolean };

export type ChangePasswordMutationVariables = Exact<{
  changePasswordInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) };

export type RestorePasswordMutationVariables = Exact<{
  restorePasswordInput: RestorePasswordInput;
}>;


export type RestorePasswordMutation = { __typename?: 'Mutation', restorePassword: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) };

export type LogQueryVariables = Exact<{
  date: Scalars['DateTime']['input'];
}>;


export type LogQuery = { __typename?: 'Query', log: string };

export type SortedFilmsQueryVariables = Exact<{
  filter?: InputMaybe<FilterFilmInput>;
}>;


export type SortedFilmsQuery = { __typename?: 'Query', sortedFilmIds: Array<number>, films: Array<{ __typename?: 'Film', ID: number, HighResImage?: number | null, LowResImage?: number | null, Name?: string | null, StandartImage?: number | null, sessions: Array<{ __typename?: 'CinemaSession', ID: number }> }> };

export type SetSortedFilmIdsMutationVariables = Exact<{
  ids: Array<Scalars['Float']['input']> | Scalars['Float']['input'];
}>;


export type SetSortedFilmIdsMutation = { __typename?: 'Mutation', setSortedFilmIds: boolean };

export type RefetchFilmsAndSessionsQueryVariables = Exact<{
  cinemaSessionsIsCaching?: InputMaybe<Scalars['Boolean']['input']>;
  filmsIsCaching?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<FilterCinemaSessionInput>;
}>;


export type RefetchFilmsAndSessionsQuery = { __typename?: 'Query', films: Array<{ __typename?: 'Film', ID: number }>, cinemaSessions: Array<{ __typename?: 'CinemaSession', ID: number }> };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', signOut: boolean };

export type EditUserMutationVariables = Exact<{
  userData: UserEdit;
}>;


export type EditUserMutation = { __typename?: 'Mutation', editUser: { __typename?: 'UserEdited', isConfirmEmail?: boolean | null, user: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
    ) } };

export type ConfirmEditEmailMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type ConfirmEditEmailMutation = { __typename?: 'Mutation', confirmEditEmail: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) };

export type RefundMutationVariables = Exact<{
  refundedOrder: RefundedOrder;
}>;


export type RefundMutation = { __typename?: 'Mutation', refund?: (
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrdersFragmentFragment': OrdersFragmentFragment } }
  ) | null };

export type TicketOrdersQueryVariables = Exact<{
  filter?: InputMaybe<OrderFilter>;
}>;


export type TicketOrdersQuery = { __typename?: 'Query', orders: Array<(
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrdersFragmentFragment': OrdersFragmentFragment } }
  )> };

export type IsValidRestoreTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type IsValidRestoreTokenQuery = { __typename?: 'Query', isValidRestoreToken: boolean };

export type RecentOrdersQueryVariables = Exact<{
  filter?: InputMaybe<OrderFilter>;
}>;


export type RecentOrdersQuery = { __typename?: 'Query', orders: Array<(
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrdersFragmentFragment': OrdersFragmentFragment } }
  )> };

export type LockedChairsAndOrdersQueryVariables = Exact<{
  filter?: InputMaybe<OrderFilter>;
}>;


export type LockedChairsAndOrdersQuery = { __typename?: 'Query', sessionRemainTime: number, orders: Array<(
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrdersFragmentFragment': OrdersFragmentFragment } }
  )>, lockedChairs: Array<(
    { __typename?: 'LockedChairsInfo' }
    & { ' $fragmentRefs'?: { 'LockChairsInfoFragmentFragment': LockChairsInfoFragmentFragment } }
  )> };

export type PayBasketMutationVariables = Exact<{ [key: string]: never; }>;


export type PayBasketMutation = { __typename?: 'Mutation', payBasket: { __typename?: 'PayData', data: string, signature: string } };

export type FilmsOpengraphImageQueryVariables = Exact<{
  filter?: InputMaybe<FilterFilmInput>;
}>;


export type FilmsOpengraphImageQuery = { __typename?: 'Query', films: Array<{ __typename?: 'Film', StandartImage?: number | null }> };

export type FilmsQueryVariables = Exact<{
  filter?: InputMaybe<FilterFilmInput>;
}>;


export type FilmsQuery = { __typename?: 'Query', films: Array<{ __typename?: 'Film', Age?: number | null, Cast?: string | null, ComingSoon?: boolean | null, Description?: string | null, Director?: string | null, Duration?: number | null, End?: string | null, FilmLang?: string | null, Genre?: string | null, HighResImage?: number | null, ID: number, LowResImage?: number | null, Name?: string | null, OriginalLang?: boolean | null, PremiereEnd?: string | null, PremiereStart?: string | null, StandartImage?: number | null, Start?: string | null, Trailer?: string | null, Slug?: string | null, sessions: Array<{ __typename?: 'CinemaSession', FilmID: number, FilmName: string, FilmType: string, Finish: string, ID: number, OccupiedAmount: number, PlaceAmount: number, PlaceGroupName: string, Start: string }> }> };

export type CreateSessionIfNotExistQueryVariables = Exact<{ [key: string]: never; }>;


export type CreateSessionIfNotExistQuery = { __typename?: 'Query', createSessionIfNotExist: boolean };

export type FilmListQueryVariables = Exact<{ [key: string]: never; }>;


export type FilmListQuery = { __typename?: 'Query', sortedFilmIds: Array<number>, films: Array<{ __typename?: 'Film', Age?: number | null, Cast?: string | null, ComingSoon?: boolean | null, Description?: string | null, Director?: string | null, Duration?: number | null, End?: string | null, FilmLang?: string | null, Genre?: string | null, HighResImage?: number | null, ID: number, LowResImage?: number | null, Name?: string | null, OriginalLang?: boolean | null, PremiereEnd?: string | null, PremiereStart?: string | null, StandartImage?: number | null, Start?: string | null, Trailer?: string | null, Slug?: string | null, sessions: Array<{ __typename?: 'CinemaSession', FilmID: number, FilmName: string, FilmType: string, Finish: string, ID: number, OccupiedAmount: number, PlaceAmount: number, PlaceGroupName: string, Start: string }> }> };

export type LockChairsMutationVariables = Exact<{
  lockChairsInput: LockChairsDto;
}>;


export type LockChairsMutation = { __typename?: 'Mutation', lockChairs: Array<{ __typename?: 'Chair', id: number, status: ChairStatus }> };

export type LockChairsInfoFragmentFragment = { __typename?: 'LockedChairsInfo', Barcode: string, CinemaSessionID: number, FilmName: string, ID: number, IsPayed: boolean, LockDate: string, PlaceName: string, PlaceNumber: number, RowNumber: number, Start: string, TicketID: number, Price: number, film?: { __typename?: 'Film', Age?: number | null, StandartImage?: number | null } | null, session?: { __typename?: 'CinemaSession', FilmType: string, Finish: string, PlaceGroupName: string } | null } & { ' $fragmentName'?: 'LockChairsInfoFragmentFragment' };

export type OrdersFragmentFragment = { __typename?: 'Order', _id: string, create_date: string, liqpayData?: string | null, liqpaySignature?: string | null, payment_id?: number | null, remainsPayingSeconds: number, status: OrderStatus, token: string, userId: string, sessions: Array<{ __typename?: 'OrderSession', age: number, filmId: number, filmName: string, filmType: string, finish: string, placeGroupName: string, remainsRefundSeconds: number, sessionId: number, standardImage: number, start: string, chairs: Array<{ __typename?: 'OrderChair', barcode: string, chairId: number, place: number, price: number, row: number, status: OrderChairStatus, ticketID: number }> }> } & { ' $fragmentName'?: 'OrdersFragmentFragment' };

export type UserFragmentFragment = { __typename?: 'User', _id: string, birthDate?: string | null, email: string, firstName?: string | null, lastName?: string | null, phone: string, isAdmin: boolean, isSuperAdmin: boolean } & { ' $fragmentName'?: 'UserFragmentFragment' };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', sessionRemainTime: number, lockedChairs: Array<(
    { __typename?: 'LockedChairsInfo' }
    & { ' $fragmentRefs'?: { 'LockChairsInfoFragmentFragment': LockChairsInfoFragmentFragment } }
  )>, user?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null };

export type OrderQueryVariables = Exact<{
  filter?: InputMaybe<OrderFilter>;
}>;


export type OrderQuery = { __typename?: 'Query', orders: Array<(
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrdersFragmentFragment': OrdersFragmentFragment } }
  )> };

export type ConfirmRegistrationQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ConfirmRegistrationQuery = { __typename?: 'Query', confirmRegistration?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null, lockedChairs: Array<(
    { __typename?: 'LockedChairsInfo' }
    & { ' $fragmentRefs'?: { 'LockChairsInfoFragmentFragment': LockChairsInfoFragmentFragment } }
  )> };

export type SessionRemainTimeQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionRemainTimeQuery = { __typename?: 'Query', sessionRemainTime: number };

export type OwnChairsLockedSubscriptionVariables = Exact<{
  onlyOwn?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type OwnChairsLockedSubscription = { __typename?: 'Subscription', chairsLocked: Array<{ __typename?: 'ChairInfo', sessionId: number, id: number, status: ChairStatus }> };

export type LockedChairsQueryVariables = Exact<{ [key: string]: never; }>;


export type LockedChairsQuery = { __typename?: 'Query', lockedChairs: Array<(
    { __typename?: 'LockedChairsInfo' }
    & { ' $fragmentRefs'?: { 'LockChairsInfoFragmentFragment': LockChairsInfoFragmentFragment } }
  )> };

export type ChairsLockedSubscriptionVariables = Exact<{
  sessionId: Scalars['Float']['input'];
}>;


export type ChairsLockedSubscription = { __typename?: 'Subscription', chairsLocked: Array<{ __typename?: 'ChairInfo', id: number, status: ChairStatus }> };

export type CinemaSessionChairsQueryVariables = Exact<{
  cinemaSessionChairsId: Scalars['Int']['input'];
}>;


export type CinemaSessionChairsQuery = { __typename?: 'Query', cinemaSessionChairs: Array<{ __typename?: 'CinemaSessionChair', Id: number, PlaceNumber: number, Price: number, RowNumber: number, Status: ChairStatus }> };

export type ClearBasketMutationVariables = Exact<{
  sessionId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type ClearBasketMutation = { __typename?: 'Mutation', clearBasket: boolean };

export type SessionOpengraphImageQueryVariables = Exact<{
  filter?: InputMaybe<FilterCinemaSessionInput>;
  isCaching?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SessionOpengraphImageQuery = { __typename?: 'Query', cinemaSessions: Array<{ __typename?: 'CinemaSession', film?: { __typename?: 'Film', StandartImage?: number | null } | null }> };

export type SessionInfoQueryVariables = Exact<{
  sessionSchemaId: Scalars['Int']['input'];
  filter?: InputMaybe<FilterCinemaSessionInput>;
  isCaching?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SessionInfoQuery = { __typename?: 'Query', sessionSchema: Array<{ __typename?: 'CinemaSessionChair', Id: number, PlaceNumber: number, Price: number, RowNumber: number, Status: ChairStatus }>, cinemaSessions: Array<{ __typename?: 'CinemaSession', FilmID: number, FilmName: string, FilmType: string, Finish: string, ID: number, OccupiedAmount: number, PlaceAmount: number, PlaceGroupName: string, Start: string, film?: { __typename?: 'Film', Slug?: string | null, Age?: number | null } | null }> };

export type SitemapDynamicRoutesQueryVariables = Exact<{ [key: string]: never; }>;


export type SitemapDynamicRoutesQuery = { __typename?: 'Query', films: Array<{ __typename?: 'Film', Slug?: string | null }>, cinemaSessions: Array<{ __typename?: 'CinemaSession', ID: number }> };

export const LockChairsInfoFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"lockChairsInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LockedChairsInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Barcode"}},{"kind":"Field","name":{"kind":"Name","value":"CinemaSessionID"}},{"kind":"Field","name":{"kind":"Name","value":"FilmName"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"IsPayed"}},{"kind":"Field","name":{"kind":"Name","value":"LockDate"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceName"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"RowNumber"}},{"kind":"Field","name":{"kind":"Name","value":"Start"}},{"kind":"Field","name":{"kind":"Name","value":"TicketID"}},{"kind":"Field","name":{"kind":"Name","value":"Price"}},{"kind":"Field","name":{"kind":"Name","value":"film"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Age"}},{"kind":"Field","name":{"kind":"Name","value":"StandartImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"FilmType"}},{"kind":"Field","name":{"kind":"Name","value":"Finish"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceGroupName"}}]}}]}}]} as unknown as DocumentNode<LockChairsInfoFragmentFragment, unknown>;
export const OrdersFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ordersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"create_date"}},{"kind":"Field","name":{"kind":"Name","value":"liqpayData"}},{"kind":"Field","name":{"kind":"Name","value":"liqpaySignature"}},{"kind":"Field","name":{"kind":"Name","value":"payment_id"}},{"kind":"Field","name":{"kind":"Name","value":"remainsPayingSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"chairs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"barcode"}},{"kind":"Field","name":{"kind":"Name","value":"chairId"}},{"kind":"Field","name":{"kind":"Name","value":"place"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"row"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"ticketID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"filmId"}},{"kind":"Field","name":{"kind":"Name","value":"filmName"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"finish"}},{"kind":"Field","name":{"kind":"Name","value":"placeGroupName"}},{"kind":"Field","name":{"kind":"Name","value":"remainsRefundSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"standardImage"}},{"kind":"Field","name":{"kind":"Name","value":"start"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<OrdersFragmentFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperAdmin"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signInInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignInInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signInInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signInInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperAdmin"}}]}}]} as unknown as DocumentNode<SignInQuery, SignInQueryVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"signUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signUpInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signUpInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signUpInput"}}}]}]}}]} as unknown as DocumentNode<SignUpQuery, SignUpQueryVariables>;
export const SendRestorePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SendRestorePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendRestorePasswordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendRestorePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendRestorePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sendRestorePasswordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendRestorePasswordInput"}}}]}]}}]} as unknown as DocumentNode<SendRestorePasswordQuery, SendRestorePasswordQueryVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changePasswordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"changePasswordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changePasswordInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperAdmin"}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const RestorePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestorePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"restorePasswordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RestorePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restorePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"restorePasswordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"restorePasswordInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperAdmin"}}]}}]} as unknown as DocumentNode<RestorePasswordMutation, RestorePasswordMutationVariables>;
export const LogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Log"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"log"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}]}]}}]} as unknown as DocumentNode<LogQuery, LogQueryVariables>;
export const SortedFilmsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SortedFilms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterFilmInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"films"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"HighResImage"}},{"kind":"Field","name":{"kind":"Name","value":"LowResImage"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"StandartImage"}},{"kind":"Field","name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sortedFilmIds"}}]}}]} as unknown as DocumentNode<SortedFilmsQuery, SortedFilmsQueryVariables>;
export const SetSortedFilmIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetSortedFilmIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setSortedFilmIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode<SetSortedFilmIdsMutation, SetSortedFilmIdsMutationVariables>;
export const RefetchFilmsAndSessionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RefetchFilmsAndSessions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cinemaSessionsIsCaching"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filmsIsCaching"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterCinemaSessionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"films"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isCaching"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filmsIsCaching"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cinemaSessions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isCaching"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cinemaSessionsIsCaching"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}}]}}]} as unknown as DocumentNode<RefetchFilmsAndSessionsQuery, RefetchFilmsAndSessionsQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signOut"}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const EditUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserEdit"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isConfirmEmail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperAdmin"}}]}}]} as unknown as DocumentNode<EditUserMutation, EditUserMutationVariables>;
export const ConfirmEditEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmEditEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmEditEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperAdmin"}}]}}]} as unknown as DocumentNode<ConfirmEditEmailMutation, ConfirmEditEmailMutationVariables>;
export const RefundDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Refund"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refundedOrder"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefundedOrder"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refund"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refundedOrder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refundedOrder"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ordersFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ordersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"create_date"}},{"kind":"Field","name":{"kind":"Name","value":"liqpayData"}},{"kind":"Field","name":{"kind":"Name","value":"liqpaySignature"}},{"kind":"Field","name":{"kind":"Name","value":"payment_id"}},{"kind":"Field","name":{"kind":"Name","value":"remainsPayingSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"chairs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"barcode"}},{"kind":"Field","name":{"kind":"Name","value":"chairId"}},{"kind":"Field","name":{"kind":"Name","value":"place"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"row"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"ticketID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"filmId"}},{"kind":"Field","name":{"kind":"Name","value":"filmName"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"finish"}},{"kind":"Field","name":{"kind":"Name","value":"placeGroupName"}},{"kind":"Field","name":{"kind":"Name","value":"remainsRefundSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"standardImage"}},{"kind":"Field","name":{"kind":"Name","value":"start"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<RefundMutation, RefundMutationVariables>;
export const TicketOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TicketOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ordersFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ordersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"create_date"}},{"kind":"Field","name":{"kind":"Name","value":"liqpayData"}},{"kind":"Field","name":{"kind":"Name","value":"liqpaySignature"}},{"kind":"Field","name":{"kind":"Name","value":"payment_id"}},{"kind":"Field","name":{"kind":"Name","value":"remainsPayingSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"chairs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"barcode"}},{"kind":"Field","name":{"kind":"Name","value":"chairId"}},{"kind":"Field","name":{"kind":"Name","value":"place"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"row"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"ticketID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"filmId"}},{"kind":"Field","name":{"kind":"Name","value":"filmName"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"finish"}},{"kind":"Field","name":{"kind":"Name","value":"placeGroupName"}},{"kind":"Field","name":{"kind":"Name","value":"remainsRefundSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"standardImage"}},{"kind":"Field","name":{"kind":"Name","value":"start"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<TicketOrdersQuery, TicketOrdersQueryVariables>;
export const IsValidRestoreTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsValidRestoreToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isValidRestoreToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<IsValidRestoreTokenQuery, IsValidRestoreTokenQueryVariables>;
export const RecentOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecentOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ordersFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ordersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"create_date"}},{"kind":"Field","name":{"kind":"Name","value":"liqpayData"}},{"kind":"Field","name":{"kind":"Name","value":"liqpaySignature"}},{"kind":"Field","name":{"kind":"Name","value":"payment_id"}},{"kind":"Field","name":{"kind":"Name","value":"remainsPayingSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"chairs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"barcode"}},{"kind":"Field","name":{"kind":"Name","value":"chairId"}},{"kind":"Field","name":{"kind":"Name","value":"place"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"row"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"ticketID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"filmId"}},{"kind":"Field","name":{"kind":"Name","value":"filmName"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"finish"}},{"kind":"Field","name":{"kind":"Name","value":"placeGroupName"}},{"kind":"Field","name":{"kind":"Name","value":"remainsRefundSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"standardImage"}},{"kind":"Field","name":{"kind":"Name","value":"start"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<RecentOrdersQuery, RecentOrdersQueryVariables>;
export const LockedChairsAndOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LockedChairsAndOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ordersFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lockedChairs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"lockChairsInfoFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sessionRemainTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ordersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"create_date"}},{"kind":"Field","name":{"kind":"Name","value":"liqpayData"}},{"kind":"Field","name":{"kind":"Name","value":"liqpaySignature"}},{"kind":"Field","name":{"kind":"Name","value":"payment_id"}},{"kind":"Field","name":{"kind":"Name","value":"remainsPayingSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"chairs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"barcode"}},{"kind":"Field","name":{"kind":"Name","value":"chairId"}},{"kind":"Field","name":{"kind":"Name","value":"place"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"row"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"ticketID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"filmId"}},{"kind":"Field","name":{"kind":"Name","value":"filmName"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"finish"}},{"kind":"Field","name":{"kind":"Name","value":"placeGroupName"}},{"kind":"Field","name":{"kind":"Name","value":"remainsRefundSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"standardImage"}},{"kind":"Field","name":{"kind":"Name","value":"start"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"lockChairsInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LockedChairsInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Barcode"}},{"kind":"Field","name":{"kind":"Name","value":"CinemaSessionID"}},{"kind":"Field","name":{"kind":"Name","value":"FilmName"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"IsPayed"}},{"kind":"Field","name":{"kind":"Name","value":"LockDate"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceName"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"RowNumber"}},{"kind":"Field","name":{"kind":"Name","value":"Start"}},{"kind":"Field","name":{"kind":"Name","value":"TicketID"}},{"kind":"Field","name":{"kind":"Name","value":"Price"}},{"kind":"Field","name":{"kind":"Name","value":"film"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Age"}},{"kind":"Field","name":{"kind":"Name","value":"StandartImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"FilmType"}},{"kind":"Field","name":{"kind":"Name","value":"Finish"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceGroupName"}}]}}]}}]} as unknown as DocumentNode<LockedChairsAndOrdersQuery, LockedChairsAndOrdersQueryVariables>;
export const PayBasketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PayBasket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payBasket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"signature"}}]}}]}}]} as unknown as DocumentNode<PayBasketMutation, PayBasketMutationVariables>;
export const FilmsOpengraphImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FilmsOpengraphImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterFilmInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"films"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"StandartImage"}}]}}]}}]} as unknown as DocumentNode<FilmsOpengraphImageQuery, FilmsOpengraphImageQueryVariables>;
export const FilmsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Films"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterFilmInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"films"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Age"}},{"kind":"Field","name":{"kind":"Name","value":"Cast"}},{"kind":"Field","name":{"kind":"Name","value":"ComingSoon"}},{"kind":"Field","name":{"kind":"Name","value":"Description"}},{"kind":"Field","name":{"kind":"Name","value":"Director"}},{"kind":"Field","name":{"kind":"Name","value":"Duration"}},{"kind":"Field","name":{"kind":"Name","value":"End"}},{"kind":"Field","name":{"kind":"Name","value":"FilmLang"}},{"kind":"Field","name":{"kind":"Name","value":"Genre"}},{"kind":"Field","name":{"kind":"Name","value":"HighResImage"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"LowResImage"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"OriginalLang"}},{"kind":"Field","name":{"kind":"Name","value":"PremiereEnd"}},{"kind":"Field","name":{"kind":"Name","value":"PremiereStart"}},{"kind":"Field","name":{"kind":"Name","value":"StandartImage"}},{"kind":"Field","name":{"kind":"Name","value":"Start"}},{"kind":"Field","name":{"kind":"Name","value":"Trailer"}},{"kind":"Field","name":{"kind":"Name","value":"Slug"}},{"kind":"Field","name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"FilmID"}},{"kind":"Field","name":{"kind":"Name","value":"FilmName"}},{"kind":"Field","name":{"kind":"Name","value":"FilmType"}},{"kind":"Field","name":{"kind":"Name","value":"Finish"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"OccupiedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceAmount"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceGroupName"}},{"kind":"Field","name":{"kind":"Name","value":"Start"}}]}}]}}]}}]} as unknown as DocumentNode<FilmsQuery, FilmsQueryVariables>;
export const CreateSessionIfNotExistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CreateSessionIfNotExist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSessionIfNotExist"}}]}}]} as unknown as DocumentNode<CreateSessionIfNotExistQuery, CreateSessionIfNotExistQueryVariables>;
export const FilmListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"filmList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"films"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Age"}},{"kind":"Field","name":{"kind":"Name","value":"Cast"}},{"kind":"Field","name":{"kind":"Name","value":"ComingSoon"}},{"kind":"Field","name":{"kind":"Name","value":"Description"}},{"kind":"Field","name":{"kind":"Name","value":"Director"}},{"kind":"Field","name":{"kind":"Name","value":"Duration"}},{"kind":"Field","name":{"kind":"Name","value":"End"}},{"kind":"Field","name":{"kind":"Name","value":"FilmLang"}},{"kind":"Field","name":{"kind":"Name","value":"Genre"}},{"kind":"Field","name":{"kind":"Name","value":"HighResImage"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"LowResImage"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"OriginalLang"}},{"kind":"Field","name":{"kind":"Name","value":"PremiereEnd"}},{"kind":"Field","name":{"kind":"Name","value":"PremiereStart"}},{"kind":"Field","name":{"kind":"Name","value":"StandartImage"}},{"kind":"Field","name":{"kind":"Name","value":"Start"}},{"kind":"Field","name":{"kind":"Name","value":"Trailer"}},{"kind":"Field","name":{"kind":"Name","value":"Slug"}},{"kind":"Field","name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"FilmID"}},{"kind":"Field","name":{"kind":"Name","value":"FilmName"}},{"kind":"Field","name":{"kind":"Name","value":"FilmType"}},{"kind":"Field","name":{"kind":"Name","value":"Finish"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"OccupiedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceAmount"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceGroupName"}},{"kind":"Field","name":{"kind":"Name","value":"Start"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"sortedFilmIds"}}]}}]} as unknown as DocumentNode<FilmListQuery, FilmListQueryVariables>;
export const LockChairsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LockChairs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lockChairsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LockChairsDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lockChairs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lockChairsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lockChairsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<LockChairsMutation, LockChairsMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lockedChairs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"lockChairsInfoFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sessionRemainTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"lockChairsInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LockedChairsInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Barcode"}},{"kind":"Field","name":{"kind":"Name","value":"CinemaSessionID"}},{"kind":"Field","name":{"kind":"Name","value":"FilmName"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"IsPayed"}},{"kind":"Field","name":{"kind":"Name","value":"LockDate"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceName"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"RowNumber"}},{"kind":"Field","name":{"kind":"Name","value":"Start"}},{"kind":"Field","name":{"kind":"Name","value":"TicketID"}},{"kind":"Field","name":{"kind":"Name","value":"Price"}},{"kind":"Field","name":{"kind":"Name","value":"film"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Age"}},{"kind":"Field","name":{"kind":"Name","value":"StandartImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"FilmType"}},{"kind":"Field","name":{"kind":"Name","value":"Finish"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceGroupName"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperAdmin"}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const OrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Order"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ordersFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ordersFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"create_date"}},{"kind":"Field","name":{"kind":"Name","value":"liqpayData"}},{"kind":"Field","name":{"kind":"Name","value":"liqpaySignature"}},{"kind":"Field","name":{"kind":"Name","value":"payment_id"}},{"kind":"Field","name":{"kind":"Name","value":"remainsPayingSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"chairs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"barcode"}},{"kind":"Field","name":{"kind":"Name","value":"chairId"}},{"kind":"Field","name":{"kind":"Name","value":"place"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"row"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"ticketID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"filmId"}},{"kind":"Field","name":{"kind":"Name","value":"filmName"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"finish"}},{"kind":"Field","name":{"kind":"Name","value":"placeGroupName"}},{"kind":"Field","name":{"kind":"Name","value":"remainsRefundSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"standardImage"}},{"kind":"Field","name":{"kind":"Name","value":"start"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<OrderQuery, OrderQueryVariables>;
export const ConfirmRegistrationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConfirmRegistration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmRegistration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lockedChairs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"lockChairsInfoFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperAdmin"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"lockChairsInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LockedChairsInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Barcode"}},{"kind":"Field","name":{"kind":"Name","value":"CinemaSessionID"}},{"kind":"Field","name":{"kind":"Name","value":"FilmName"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"IsPayed"}},{"kind":"Field","name":{"kind":"Name","value":"LockDate"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceName"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"RowNumber"}},{"kind":"Field","name":{"kind":"Name","value":"Start"}},{"kind":"Field","name":{"kind":"Name","value":"TicketID"}},{"kind":"Field","name":{"kind":"Name","value":"Price"}},{"kind":"Field","name":{"kind":"Name","value":"film"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Age"}},{"kind":"Field","name":{"kind":"Name","value":"StandartImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"FilmType"}},{"kind":"Field","name":{"kind":"Name","value":"Finish"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceGroupName"}}]}}]}}]} as unknown as DocumentNode<ConfirmRegistrationQuery, ConfirmRegistrationQueryVariables>;
export const SessionRemainTimeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SessionRemainTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionRemainTime"}}]}}]} as unknown as DocumentNode<SessionRemainTimeQuery, SessionRemainTimeQueryVariables>;
export const OwnChairsLockedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ownChairsLocked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"onlyOwn"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chairsLocked"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"onlyOwn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"onlyOwn"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<OwnChairsLockedSubscription, OwnChairsLockedSubscriptionVariables>;
export const LockedChairsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LockedChairs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lockedChairs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"lockChairsInfoFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"lockChairsInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LockedChairsInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Barcode"}},{"kind":"Field","name":{"kind":"Name","value":"CinemaSessionID"}},{"kind":"Field","name":{"kind":"Name","value":"FilmName"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"IsPayed"}},{"kind":"Field","name":{"kind":"Name","value":"LockDate"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceName"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"RowNumber"}},{"kind":"Field","name":{"kind":"Name","value":"Start"}},{"kind":"Field","name":{"kind":"Name","value":"TicketID"}},{"kind":"Field","name":{"kind":"Name","value":"Price"}},{"kind":"Field","name":{"kind":"Name","value":"film"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Age"}},{"kind":"Field","name":{"kind":"Name","value":"StandartImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"FilmType"}},{"kind":"Field","name":{"kind":"Name","value":"Finish"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceGroupName"}}]}}]}}]} as unknown as DocumentNode<LockedChairsQuery, LockedChairsQueryVariables>;
export const ChairsLockedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChairsLocked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chairsLocked"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ChairsLockedSubscription, ChairsLockedSubscriptionVariables>;
export const CinemaSessionChairsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CinemaSessionChairs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cinemaSessionChairsId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cinemaSessionChairs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cinemaSessionChairsId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"Price"}},{"kind":"Field","name":{"kind":"Name","value":"RowNumber"}},{"kind":"Field","name":{"kind":"Name","value":"Status"}}]}}]}}]} as unknown as DocumentNode<CinemaSessionChairsQuery, CinemaSessionChairsQueryVariables>;
export const ClearBasketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClearBasket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearBasket"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}]}]}}]} as unknown as DocumentNode<ClearBasketMutation, ClearBasketMutationVariables>;
export const SessionOpengraphImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SessionOpengraphImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterCinemaSessionInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isCaching"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cinemaSessions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"isCaching"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isCaching"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"film"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"StandartImage"}}]}}]}}]}}]} as unknown as DocumentNode<SessionOpengraphImageQuery, SessionOpengraphImageQueryVariables>;
export const SessionInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SessionInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionSchemaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterCinemaSessionInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isCaching"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sessionSchema"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionSchemaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"Price"}},{"kind":"Field","name":{"kind":"Name","value":"RowNumber"}},{"kind":"Field","name":{"kind":"Name","value":"Status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cinemaSessions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"isCaching"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isCaching"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"FilmID"}},{"kind":"Field","name":{"kind":"Name","value":"FilmName"}},{"kind":"Field","name":{"kind":"Name","value":"FilmType"}},{"kind":"Field","name":{"kind":"Name","value":"Finish"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"OccupiedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceAmount"}},{"kind":"Field","name":{"kind":"Name","value":"PlaceGroupName"}},{"kind":"Field","name":{"kind":"Name","value":"Start"}},{"kind":"Field","name":{"kind":"Name","value":"film"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Slug"}},{"kind":"Field","name":{"kind":"Name","value":"Age"}}]}}]}}]}}]} as unknown as DocumentNode<SessionInfoQuery, SessionInfoQueryVariables>;
export const SitemapDynamicRoutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SitemapDynamicRoutes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"films"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cinemaSessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}}]}}]} as unknown as DocumentNode<SitemapDynamicRoutesQuery, SitemapDynamicRoutesQueryVariables>;