import { DocumentNode, gql } from "@apollo/client";

export const GET_ME: DocumentNode = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      password
      gender
      lookingFor
      about
      dob
      image
      gallery {
        name
        imageUrl
      }
      inbox {
        text
        userId
        read
        createdAt
      }
      outbox {
        text
        userId
        read
        createdAt
      }
      interests
      hobbies
      matches
      isToxic
    }
  }
`;

export const GET_USER: DocumentNode = gql`
  query user($userId: ID!) {
    user(userID: $userId) {
      _id
      firstName
      lastName
      email
      password
      gender
      lookingFor
      about
      dob
      image
      gallery {
        name
        imageUrl
      }
      inbox {
        text
        userId
        read
        createdAt
      }
      outbox {
        text
        userId
        read
        createdAt
      }
      interests
      hobbies
      matches
      isToxic
    }
  }
`;

export const GET_USERS: DocumentNode = gql`
  query users {
    users {
      _id
      firstName
      lastName
      email
      password
      gender
      lookingFor
      about
      dob
      image
      inbox {
        text
        userId
        read
        createdAt
      }
      outbox {
        text
        userId
        read
        createdAt
      }
      interests
      hobbies
      matches
      isToxic
    }
  }
`;
