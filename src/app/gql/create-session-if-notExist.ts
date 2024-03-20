import { graphql } from '@/gql';

export const createSessionIfNotExistDocument = graphql(`
  query CreateSessionIfNotExist {
    createSessionIfNotExist
  }
`);
