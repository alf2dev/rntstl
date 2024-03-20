/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query SignIn($signInInput: SignInInput!) {\n    signIn(signInInput: $signInInput) {\n      ...userFragment\n    }\n  }\n": types.SignInDocument,
    "\n  query signUp($signUpInput: SignUpInput!) {\n    signUp(signUpInput: $signUpInput)\n  }\n": types.SignUpDocument,
    "\n  query SendRestorePassword(\n    $sendRestorePasswordInput: SendRestorePasswordInput!\n  ) {\n    sendRestorePassword(sendRestorePasswordInput: $sendRestorePasswordInput)\n  }\n": types.SendRestorePasswordDocument,
    "\n  mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {\n    changePassword(changePasswordInput: $changePasswordInput) {\n      ...userFragment\n    }\n  }\n": types.ChangePasswordDocument,
    "\n  mutation RestorePassword($restorePasswordInput: RestorePasswordInput!) {\n    restorePassword(restorePasswordInput: $restorePasswordInput) {\n      ...userFragment\n    }\n  }\n": types.RestorePasswordDocument,
    "\n  query Log($date: DateTime!) {\n    log(date: $date)\n  }\n": types.LogDocument,
    "\n  query SortedFilms($filter: FilterFilmInput) {\n    films(filter: $filter) {\n      ID\n      HighResImage\n      LowResImage\n      Name\n      StandartImage\n      sessions {\n        ID\n      }\n    }\n    sortedFilmIds\n  }\n": types.SortedFilmsDocument,
    "\n  mutation SetSortedFilmIds($ids: [Float!]!) {\n    setSortedFilmIds(ids: $ids)\n  }\n": types.SetSortedFilmIdsDocument,
    "\n  query RefetchFilmsAndSessions(\n    $cinemaSessionsIsCaching: Boolean\n    $filmsIsCaching: Boolean\n    $filter: FilterCinemaSessionInput\n  ) {\n    films(isCaching: $filmsIsCaching) {\n      ID\n    }\n    cinemaSessions(isCaching: $cinemaSessionsIsCaching, filter: $filter) {\n      ID\n    }\n  }\n": types.RefetchFilmsAndSessionsDocument,
    "\n  query Query {\n    signOut\n  }\n": types.QueryDocument,
    "\n  mutation EditUser($userData: UserEdit!) {\n    editUser(userData: $userData) {\n      user {\n        ...userFragment\n      }\n      isConfirmEmail\n    }\n  }\n": types.EditUserDocument,
    "\n  mutation ConfirmEditEmail($code: String!) {\n    confirmEditEmail(code: $code) {\n      ...userFragment\n    }\n  }\n": types.ConfirmEditEmailDocument,
    "\n  mutation Refund($refundedOrder: RefundedOrder!) {\n    refund(refundedOrder: $refundedOrder) {\n      ...ordersFragment\n    }\n  }\n": types.RefundDocument,
    "\n  query TicketOrders($filter: OrderFilter) {\n    orders(filter: $filter) {\n      ...ordersFragment\n    }\n  }\n": types.TicketOrdersDocument,
    "\n  query IsValidRestoreToken($token: String!) {\n    isValidRestoreToken(token: $token)\n  }\n": types.IsValidRestoreTokenDocument,
    "\n  query RecentOrders($filter: OrderFilter) {\n    orders(filter: $filter) {\n      ...ordersFragment\n    }\n  }\n": types.RecentOrdersDocument,
    "\n  query LockedChairsAndOrders($filter: OrderFilter) {\n    orders(filter: $filter) {\n      ...ordersFragment\n    }\n    lockedChairs {\n      ...lockChairsInfoFragment\n    }\n    sessionRemainTime\n  }\n": types.LockedChairsAndOrdersDocument,
    "\n  mutation PayBasket {\n    payBasket {\n      data\n      signature\n    }\n  }\n": types.PayBasketDocument,
    "\n  query FilmsOpengraphImage($filter: FilterFilmInput) {\n    films(filter: $filter) {\n      StandartImage\n    }\n  }\n": types.FilmsOpengraphImageDocument,
    "\n  query Films($filter: FilterFilmInput) {\n    films(filter: $filter) {\n      Age\n      Cast\n      ComingSoon\n      Description\n      Director\n      Duration\n      End\n      FilmLang\n      Genre\n      HighResImage\n      ID\n      LowResImage\n      Name\n      OriginalLang\n      PremiereEnd\n      PremiereStart\n      StandartImage\n      Start\n      Trailer\n      Slug\n      sessions {\n        FilmID\n        FilmName\n        FilmType\n        Finish\n        ID\n        OccupiedAmount\n        PlaceAmount\n        PlaceGroupName\n        Start\n      }\n    }\n  }\n": types.FilmsDocument,
    "\n  query CreateSessionIfNotExist {\n    createSessionIfNotExist\n  }\n": types.CreateSessionIfNotExistDocument,
    "\n  query filmList {\n    films {\n      Age\n      Cast\n      ComingSoon\n      Description\n      Director\n      Duration\n      End\n      FilmLang\n      Genre\n      HighResImage\n      ID\n      LowResImage\n      Name\n      OriginalLang\n      PremiereEnd\n      PremiereStart\n      StandartImage\n      Start\n      Trailer\n      Slug\n      sessions {\n        FilmID\n        FilmName\n        FilmType\n        Finish\n        ID\n        OccupiedAmount\n        PlaceAmount\n        PlaceGroupName\n        Start\n      }\n    }\n    sortedFilmIds\n  }\n": types.FilmListDocument,
    "\n  mutation LockChairs($lockChairsInput: LockChairsDto!) {\n    lockChairs(lockChairsInput: $lockChairsInput) {\n      id\n      status\n    }\n  }\n": types.LockChairsDocument,
    "\n  fragment lockChairsInfoFragment on LockedChairsInfo {\n    Barcode\n    CinemaSessionID\n    FilmName\n    ID\n    IsPayed\n    LockDate\n    PlaceName\n    PlaceNumber\n    RowNumber\n    Start\n    TicketID\n    Price\n    film {\n      Age\n      StandartImage\n    }\n    session {\n      FilmType\n      Finish\n      PlaceGroupName\n    }\n  }\n": types.LockChairsInfoFragmentFragmentDoc,
    "\n  fragment ordersFragment on Order {\n    _id\n    create_date\n    liqpayData\n    liqpaySignature\n    payment_id\n    remainsPayingSeconds\n    sessions {\n      age\n      chairs {\n        barcode\n        chairId\n        place\n        price\n        row\n        status\n        ticketID\n      }\n      filmId\n      filmName\n      filmType\n      finish\n      placeGroupName\n      remainsRefundSeconds\n      sessionId\n      standardImage\n      start\n    }\n    status\n    token\n    userId\n  }\n": types.OrdersFragmentFragmentDoc,
    "\n  fragment userFragment on User {\n    _id\n    birthDate\n    email\n    firstName\n    lastName\n    phone\n    isAdmin\n    isSuperAdmin\n  }\n": types.UserFragmentFragmentDoc,
    "\n  query User {\n    lockedChairs {\n      ...lockChairsInfoFragment\n    }\n    user {\n      ...userFragment\n    }\n    sessionRemainTime\n  }\n": types.UserDocument,
    "\n  query Order($filter: OrderFilter) {\n    orders(filter: $filter) {\n      ...ordersFragment\n    }\n  }\n": types.OrderDocument,
    "\n  query ConfirmRegistration($token: String!) {\n    confirmRegistration(token: $token) {\n      ...userFragment\n    }\n    lockedChairs {\n      ...lockChairsInfoFragment\n    }\n  }\n": types.ConfirmRegistrationDocument,
    "\n  query SessionRemainTime {\n    sessionRemainTime\n  }\n": types.SessionRemainTimeDocument,
    "\n  subscription ownChairsLocked($onlyOwn: Boolean) {\n    chairsLocked(onlyOwn: $onlyOwn) {\n      sessionId\n      id\n      status\n    }\n  }\n": types.OwnChairsLockedDocument,
    "\n  query LockedChairs {\n    lockedChairs {\n      ...lockChairsInfoFragment\n    }\n  }\n": types.LockedChairsDocument,
    "\n  subscription ChairsLocked($sessionId: Float!) {\n    chairsLocked(sessionId: $sessionId) {\n      id\n      status\n    }\n  }\n": types.ChairsLockedDocument,
    "\n  query CinemaSessionChairs($cinemaSessionChairsId: Int!) {\n    cinemaSessionChairs(id: $cinemaSessionChairsId) {\n      Id\n      PlaceNumber\n      Price\n      RowNumber\n      Status\n    }\n  }\n": types.CinemaSessionChairsDocument,
    "\n  mutation ClearBasket($sessionId: Float) {\n    clearBasket(sessionId: $sessionId)\n  }\n": types.ClearBasketDocument,
    "\n  query SessionOpengraphImage(\n    $filter: FilterCinemaSessionInput\n    $isCaching: Boolean\n  ) {\n    cinemaSessions(filter: $filter, isCaching: $isCaching) {\n      film {\n        StandartImage\n      }\n    }\n  }\n": types.SessionOpengraphImageDocument,
    "\n  query SessionInfo(\n    $sessionSchemaId: Int!\n    $filter: FilterCinemaSessionInput\n    $isCaching: Boolean\n  ) {\n    sessionSchema(id: $sessionSchemaId) {\n      Id\n      PlaceNumber\n      Price\n      RowNumber\n      Status\n    }\n    cinemaSessions(filter: $filter, isCaching: $isCaching) {\n      FilmID\n      FilmName\n      FilmType\n      Finish\n      ID\n      OccupiedAmount\n      PlaceAmount\n      PlaceGroupName\n      Start\n      film {\n        Slug\n        Age\n      }\n    }\n  }\n": types.SessionInfoDocument,
    "\n  query SitemapDynamicRoutes {\n    films {\n      Slug\n    }\n    cinemaSessions {\n      ID\n    }\n  }\n": types.SitemapDynamicRoutesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SignIn($signInInput: SignInInput!) {\n    signIn(signInInput: $signInInput) {\n      ...userFragment\n    }\n  }\n"): (typeof documents)["\n  query SignIn($signInInput: SignInInput!) {\n    signIn(signInInput: $signInInput) {\n      ...userFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query signUp($signUpInput: SignUpInput!) {\n    signUp(signUpInput: $signUpInput)\n  }\n"): (typeof documents)["\n  query signUp($signUpInput: SignUpInput!) {\n    signUp(signUpInput: $signUpInput)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SendRestorePassword(\n    $sendRestorePasswordInput: SendRestorePasswordInput!\n  ) {\n    sendRestorePassword(sendRestorePasswordInput: $sendRestorePasswordInput)\n  }\n"): (typeof documents)["\n  query SendRestorePassword(\n    $sendRestorePasswordInput: SendRestorePasswordInput!\n  ) {\n    sendRestorePassword(sendRestorePasswordInput: $sendRestorePasswordInput)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {\n    changePassword(changePasswordInput: $changePasswordInput) {\n      ...userFragment\n    }\n  }\n"): (typeof documents)["\n  mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {\n    changePassword(changePasswordInput: $changePasswordInput) {\n      ...userFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RestorePassword($restorePasswordInput: RestorePasswordInput!) {\n    restorePassword(restorePasswordInput: $restorePasswordInput) {\n      ...userFragment\n    }\n  }\n"): (typeof documents)["\n  mutation RestorePassword($restorePasswordInput: RestorePasswordInput!) {\n    restorePassword(restorePasswordInput: $restorePasswordInput) {\n      ...userFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Log($date: DateTime!) {\n    log(date: $date)\n  }\n"): (typeof documents)["\n  query Log($date: DateTime!) {\n    log(date: $date)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SortedFilms($filter: FilterFilmInput) {\n    films(filter: $filter) {\n      ID\n      HighResImage\n      LowResImage\n      Name\n      StandartImage\n      sessions {\n        ID\n      }\n    }\n    sortedFilmIds\n  }\n"): (typeof documents)["\n  query SortedFilms($filter: FilterFilmInput) {\n    films(filter: $filter) {\n      ID\n      HighResImage\n      LowResImage\n      Name\n      StandartImage\n      sessions {\n        ID\n      }\n    }\n    sortedFilmIds\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SetSortedFilmIds($ids: [Float!]!) {\n    setSortedFilmIds(ids: $ids)\n  }\n"): (typeof documents)["\n  mutation SetSortedFilmIds($ids: [Float!]!) {\n    setSortedFilmIds(ids: $ids)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RefetchFilmsAndSessions(\n    $cinemaSessionsIsCaching: Boolean\n    $filmsIsCaching: Boolean\n    $filter: FilterCinemaSessionInput\n  ) {\n    films(isCaching: $filmsIsCaching) {\n      ID\n    }\n    cinemaSessions(isCaching: $cinemaSessionsIsCaching, filter: $filter) {\n      ID\n    }\n  }\n"): (typeof documents)["\n  query RefetchFilmsAndSessions(\n    $cinemaSessionsIsCaching: Boolean\n    $filmsIsCaching: Boolean\n    $filter: FilterCinemaSessionInput\n  ) {\n    films(isCaching: $filmsIsCaching) {\n      ID\n    }\n    cinemaSessions(isCaching: $cinemaSessionsIsCaching, filter: $filter) {\n      ID\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Query {\n    signOut\n  }\n"): (typeof documents)["\n  query Query {\n    signOut\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditUser($userData: UserEdit!) {\n    editUser(userData: $userData) {\n      user {\n        ...userFragment\n      }\n      isConfirmEmail\n    }\n  }\n"): (typeof documents)["\n  mutation EditUser($userData: UserEdit!) {\n    editUser(userData: $userData) {\n      user {\n        ...userFragment\n      }\n      isConfirmEmail\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ConfirmEditEmail($code: String!) {\n    confirmEditEmail(code: $code) {\n      ...userFragment\n    }\n  }\n"): (typeof documents)["\n  mutation ConfirmEditEmail($code: String!) {\n    confirmEditEmail(code: $code) {\n      ...userFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Refund($refundedOrder: RefundedOrder!) {\n    refund(refundedOrder: $refundedOrder) {\n      ...ordersFragment\n    }\n  }\n"): (typeof documents)["\n  mutation Refund($refundedOrder: RefundedOrder!) {\n    refund(refundedOrder: $refundedOrder) {\n      ...ordersFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TicketOrders($filter: OrderFilter) {\n    orders(filter: $filter) {\n      ...ordersFragment\n    }\n  }\n"): (typeof documents)["\n  query TicketOrders($filter: OrderFilter) {\n    orders(filter: $filter) {\n      ...ordersFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsValidRestoreToken($token: String!) {\n    isValidRestoreToken(token: $token)\n  }\n"): (typeof documents)["\n  query IsValidRestoreToken($token: String!) {\n    isValidRestoreToken(token: $token)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RecentOrders($filter: OrderFilter) {\n    orders(filter: $filter) {\n      ...ordersFragment\n    }\n  }\n"): (typeof documents)["\n  query RecentOrders($filter: OrderFilter) {\n    orders(filter: $filter) {\n      ...ordersFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LockedChairsAndOrders($filter: OrderFilter) {\n    orders(filter: $filter) {\n      ...ordersFragment\n    }\n    lockedChairs {\n      ...lockChairsInfoFragment\n    }\n    sessionRemainTime\n  }\n"): (typeof documents)["\n  query LockedChairsAndOrders($filter: OrderFilter) {\n    orders(filter: $filter) {\n      ...ordersFragment\n    }\n    lockedChairs {\n      ...lockChairsInfoFragment\n    }\n    sessionRemainTime\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation PayBasket {\n    payBasket {\n      data\n      signature\n    }\n  }\n"): (typeof documents)["\n  mutation PayBasket {\n    payBasket {\n      data\n      signature\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FilmsOpengraphImage($filter: FilterFilmInput) {\n    films(filter: $filter) {\n      StandartImage\n    }\n  }\n"): (typeof documents)["\n  query FilmsOpengraphImage($filter: FilterFilmInput) {\n    films(filter: $filter) {\n      StandartImage\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Films($filter: FilterFilmInput) {\n    films(filter: $filter) {\n      Age\n      Cast\n      ComingSoon\n      Description\n      Director\n      Duration\n      End\n      FilmLang\n      Genre\n      HighResImage\n      ID\n      LowResImage\n      Name\n      OriginalLang\n      PremiereEnd\n      PremiereStart\n      StandartImage\n      Start\n      Trailer\n      Slug\n      sessions {\n        FilmID\n        FilmName\n        FilmType\n        Finish\n        ID\n        OccupiedAmount\n        PlaceAmount\n        PlaceGroupName\n        Start\n      }\n    }\n  }\n"): (typeof documents)["\n  query Films($filter: FilterFilmInput) {\n    films(filter: $filter) {\n      Age\n      Cast\n      ComingSoon\n      Description\n      Director\n      Duration\n      End\n      FilmLang\n      Genre\n      HighResImage\n      ID\n      LowResImage\n      Name\n      OriginalLang\n      PremiereEnd\n      PremiereStart\n      StandartImage\n      Start\n      Trailer\n      Slug\n      sessions {\n        FilmID\n        FilmName\n        FilmType\n        Finish\n        ID\n        OccupiedAmount\n        PlaceAmount\n        PlaceGroupName\n        Start\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CreateSessionIfNotExist {\n    createSessionIfNotExist\n  }\n"): (typeof documents)["\n  query CreateSessionIfNotExist {\n    createSessionIfNotExist\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query filmList {\n    films {\n      Age\n      Cast\n      ComingSoon\n      Description\n      Director\n      Duration\n      End\n      FilmLang\n      Genre\n      HighResImage\n      ID\n      LowResImage\n      Name\n      OriginalLang\n      PremiereEnd\n      PremiereStart\n      StandartImage\n      Start\n      Trailer\n      Slug\n      sessions {\n        FilmID\n        FilmName\n        FilmType\n        Finish\n        ID\n        OccupiedAmount\n        PlaceAmount\n        PlaceGroupName\n        Start\n      }\n    }\n    sortedFilmIds\n  }\n"): (typeof documents)["\n  query filmList {\n    films {\n      Age\n      Cast\n      ComingSoon\n      Description\n      Director\n      Duration\n      End\n      FilmLang\n      Genre\n      HighResImage\n      ID\n      LowResImage\n      Name\n      OriginalLang\n      PremiereEnd\n      PremiereStart\n      StandartImage\n      Start\n      Trailer\n      Slug\n      sessions {\n        FilmID\n        FilmName\n        FilmType\n        Finish\n        ID\n        OccupiedAmount\n        PlaceAmount\n        PlaceGroupName\n        Start\n      }\n    }\n    sortedFilmIds\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LockChairs($lockChairsInput: LockChairsDto!) {\n    lockChairs(lockChairsInput: $lockChairsInput) {\n      id\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation LockChairs($lockChairsInput: LockChairsDto!) {\n    lockChairs(lockChairsInput: $lockChairsInput) {\n      id\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment lockChairsInfoFragment on LockedChairsInfo {\n    Barcode\n    CinemaSessionID\n    FilmName\n    ID\n    IsPayed\n    LockDate\n    PlaceName\n    PlaceNumber\n    RowNumber\n    Start\n    TicketID\n    Price\n    film {\n      Age\n      StandartImage\n    }\n    session {\n      FilmType\n      Finish\n      PlaceGroupName\n    }\n  }\n"): (typeof documents)["\n  fragment lockChairsInfoFragment on LockedChairsInfo {\n    Barcode\n    CinemaSessionID\n    FilmName\n    ID\n    IsPayed\n    LockDate\n    PlaceName\n    PlaceNumber\n    RowNumber\n    Start\n    TicketID\n    Price\n    film {\n      Age\n      StandartImage\n    }\n    session {\n      FilmType\n      Finish\n      PlaceGroupName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ordersFragment on Order {\n    _id\n    create_date\n    liqpayData\n    liqpaySignature\n    payment_id\n    remainsPayingSeconds\n    sessions {\n      age\n      chairs {\n        barcode\n        chairId\n        place\n        price\n        row\n        status\n        ticketID\n      }\n      filmId\n      filmName\n      filmType\n      finish\n      placeGroupName\n      remainsRefundSeconds\n      sessionId\n      standardImage\n      start\n    }\n    status\n    token\n    userId\n  }\n"): (typeof documents)["\n  fragment ordersFragment on Order {\n    _id\n    create_date\n    liqpayData\n    liqpaySignature\n    payment_id\n    remainsPayingSeconds\n    sessions {\n      age\n      chairs {\n        barcode\n        chairId\n        place\n        price\n        row\n        status\n        ticketID\n      }\n      filmId\n      filmName\n      filmType\n      finish\n      placeGroupName\n      remainsRefundSeconds\n      sessionId\n      standardImage\n      start\n    }\n    status\n    token\n    userId\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment userFragment on User {\n    _id\n    birthDate\n    email\n    firstName\n    lastName\n    phone\n    isAdmin\n    isSuperAdmin\n  }\n"): (typeof documents)["\n  fragment userFragment on User {\n    _id\n    birthDate\n    email\n    firstName\n    lastName\n    phone\n    isAdmin\n    isSuperAdmin\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query User {\n    lockedChairs {\n      ...lockChairsInfoFragment\n    }\n    user {\n      ...userFragment\n    }\n    sessionRemainTime\n  }\n"): (typeof documents)["\n  query User {\n    lockedChairs {\n      ...lockChairsInfoFragment\n    }\n    user {\n      ...userFragment\n    }\n    sessionRemainTime\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Order($filter: OrderFilter) {\n    orders(filter: $filter) {\n      ...ordersFragment\n    }\n  }\n"): (typeof documents)["\n  query Order($filter: OrderFilter) {\n    orders(filter: $filter) {\n      ...ordersFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ConfirmRegistration($token: String!) {\n    confirmRegistration(token: $token) {\n      ...userFragment\n    }\n    lockedChairs {\n      ...lockChairsInfoFragment\n    }\n  }\n"): (typeof documents)["\n  query ConfirmRegistration($token: String!) {\n    confirmRegistration(token: $token) {\n      ...userFragment\n    }\n    lockedChairs {\n      ...lockChairsInfoFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SessionRemainTime {\n    sessionRemainTime\n  }\n"): (typeof documents)["\n  query SessionRemainTime {\n    sessionRemainTime\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ownChairsLocked($onlyOwn: Boolean) {\n    chairsLocked(onlyOwn: $onlyOwn) {\n      sessionId\n      id\n      status\n    }\n  }\n"): (typeof documents)["\n  subscription ownChairsLocked($onlyOwn: Boolean) {\n    chairsLocked(onlyOwn: $onlyOwn) {\n      sessionId\n      id\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LockedChairs {\n    lockedChairs {\n      ...lockChairsInfoFragment\n    }\n  }\n"): (typeof documents)["\n  query LockedChairs {\n    lockedChairs {\n      ...lockChairsInfoFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ChairsLocked($sessionId: Float!) {\n    chairsLocked(sessionId: $sessionId) {\n      id\n      status\n    }\n  }\n"): (typeof documents)["\n  subscription ChairsLocked($sessionId: Float!) {\n    chairsLocked(sessionId: $sessionId) {\n      id\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CinemaSessionChairs($cinemaSessionChairsId: Int!) {\n    cinemaSessionChairs(id: $cinemaSessionChairsId) {\n      Id\n      PlaceNumber\n      Price\n      RowNumber\n      Status\n    }\n  }\n"): (typeof documents)["\n  query CinemaSessionChairs($cinemaSessionChairsId: Int!) {\n    cinemaSessionChairs(id: $cinemaSessionChairsId) {\n      Id\n      PlaceNumber\n      Price\n      RowNumber\n      Status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ClearBasket($sessionId: Float) {\n    clearBasket(sessionId: $sessionId)\n  }\n"): (typeof documents)["\n  mutation ClearBasket($sessionId: Float) {\n    clearBasket(sessionId: $sessionId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SessionOpengraphImage(\n    $filter: FilterCinemaSessionInput\n    $isCaching: Boolean\n  ) {\n    cinemaSessions(filter: $filter, isCaching: $isCaching) {\n      film {\n        StandartImage\n      }\n    }\n  }\n"): (typeof documents)["\n  query SessionOpengraphImage(\n    $filter: FilterCinemaSessionInput\n    $isCaching: Boolean\n  ) {\n    cinemaSessions(filter: $filter, isCaching: $isCaching) {\n      film {\n        StandartImage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SessionInfo(\n    $sessionSchemaId: Int!\n    $filter: FilterCinemaSessionInput\n    $isCaching: Boolean\n  ) {\n    sessionSchema(id: $sessionSchemaId) {\n      Id\n      PlaceNumber\n      Price\n      RowNumber\n      Status\n    }\n    cinemaSessions(filter: $filter, isCaching: $isCaching) {\n      FilmID\n      FilmName\n      FilmType\n      Finish\n      ID\n      OccupiedAmount\n      PlaceAmount\n      PlaceGroupName\n      Start\n      film {\n        Slug\n        Age\n      }\n    }\n  }\n"): (typeof documents)["\n  query SessionInfo(\n    $sessionSchemaId: Int!\n    $filter: FilterCinemaSessionInput\n    $isCaching: Boolean\n  ) {\n    sessionSchema(id: $sessionSchemaId) {\n      Id\n      PlaceNumber\n      Price\n      RowNumber\n      Status\n    }\n    cinemaSessions(filter: $filter, isCaching: $isCaching) {\n      FilmID\n      FilmName\n      FilmType\n      Finish\n      ID\n      OccupiedAmount\n      PlaceAmount\n      PlaceGroupName\n      Start\n      film {\n        Slug\n        Age\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SitemapDynamicRoutes {\n    films {\n      Slug\n    }\n    cinemaSessions {\n      ID\n    }\n  }\n"): (typeof documents)["\n  query SitemapDynamicRoutes {\n    films {\n      Slug\n    }\n    cinemaSessions {\n      ID\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;