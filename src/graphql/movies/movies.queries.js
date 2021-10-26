import {gql} from 'apollo-boost';

export const GET_ALL_MOVIES = gql`
  query getByInventory {
    movies: getMovies {
      id
      title
      year
      description
      image
    }
  }
`;
