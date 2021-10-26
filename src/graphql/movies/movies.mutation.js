import {gql} from 'apollo-boost';

export const MOVIE_MUTATION = gql`
  mutation movie($input: inputMovie!) {
    createMovie(movie: $input) {
      id
      title
      year
      description
      image
    }
  }
`;
