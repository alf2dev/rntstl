import { graphql } from "@/gql";

export const lockChairDocument = graphql(`
  mutation LockChairs($lockChairsInput: LockChairsDto!) {
    lockChairs(lockChairsInput: $lockChairsInput) {
      id
      status
    }
  }
`);