import { DocumentNode, gql } from "@apollo/client";

export const ADD_USER: DocumentNode = gql`
  mutation addUser(
    $firstName: String!
    $email: String!
    $password: String!
    $gender: String!
    $lookingFor: String!
    $lastName: String!
  ) {
    addUser(
      firstName: $firstName
      email: $email
      password: $password
      gender: $gender
      lookingFor: $lookingFor
      lastName: $lastName
    ) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const LOGIN_USER: DocumentNode = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const ADD_PROFILE_IMG: DocumentNode = gql`
  mutation addProfileImg($image: String!) {
    addProfileImg(image: $image) {
      _id
      firstName
      lastName
      image
    }
  }
`;

export const ADD_GALLERY_IMG: DocumentNode = gql`
  mutation addGalleryImg($gallery: [GalleryInput!]!) {
    addGalleryImg(gallery: $gallery) {
      _id
      firstName
      lastName
      gallery {
        name
        imageUrl
      }
    }
  }
`;

export const ADD_DOB: DocumentNode = gql`
  mutation addDOB($dob: String!) {
    addDOB(dob: $dob) {
      _id
      firstName
      lastName
      dob
    }
  }
`;

export const ADD_INTEREST: DocumentNode = gql`
mutation addInterest($interests: [String!]!) {
  addInterest(interests: $interests) {
    _id
    firstName
    lastName
    interests
  }
}
`
export const ADD_HOBBIES: DocumentNode = gql`
  mutation addHobbies($hobbies: [String!]!) {
    addHobbies(hobbies: $hobbies) {
      _id
      firstName
      lastName
      hobbies
    }
  }
`;

export const ADD_ABOUT: DocumentNode = gql`
  mutation addAbout($about: String!) {
    addAbout(about: $about) {
      _id
      firstName
      lastName
      about
    }
  }
`;

export const REMOVE_INTEREST: DocumentNode = gql`
mutation removeInterest($interests: String!) {
  removeInterest(interests: $interests) {
    _id
    firstName
    lastName
    interests
  }
}
`

export const REMOVE_HOBBIES: DocumentNode = gql`
  mutation removeHobby($hobbies: String!) {
    removeHobby(hobbies: $hobbies) {
      _id
      firstName
      lastName
      hobbies
    }
  }
`;

export const ADD_IMAGE: DocumentNode = gql`
mutation addImage($imageUrl: String!) {
  addImage(imageURL: $imageUrl) {
    _id
    firstName
    lastName
    image
  }
}
`

export const ADD_MESSAGE: DocumentNode = gql`
  mutation addMessage($message: String!, $targetId: ID!) {
    addMessage(message: $message, targetID: $targetId) {
      _id
      firstName
      lastName
      outbox {
        text
        userId
        read
        createdAt
      }
    }
  }
`;

export const SAVE_MATCH: DocumentNode = gql`
  mutation saveMatch($matchId: ID!) {
    saveMatch(matchID: $matchId) {
      _id
      firstName
      lastName
    }
  }
`;

export const REMOVE_MATCH: DocumentNode = gql`
mutation removeMatch($matchId: ID!) {
  removeMatch(matchID: $matchId) {
    _id
    firstName
    lastName
  }
}
`;

export const SET_TOXIC: DocumentNode = gql`
mutation setToxic {
  setToxic {
    _id
    firstName
    lastName
    isToxic
  }
}
`