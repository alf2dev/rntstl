import { graphql } from '@/gql';

export const userFragment = graphql(`
  fragment userFragment on User {
    _id
    birthDate
    email
    firstName
    lastName
    phone
    isAdmin
    isSuperAdmin
  }
`);
