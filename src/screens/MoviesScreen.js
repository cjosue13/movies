/* eslint-disable react-native/no-raw-text */
import {useQuery} from '@apollo/react-hooks';
import {Box, Heading, ScrollView, Stack} from 'native-base';
import React from 'react';
import MovieCard from '../components/MovieCard/MovieCard';
import {GET_ALL_MOVIES} from '../graphql/movies/movies.queries';
import PropTypes from 'prop-types';

const MoviesScreen = ({colorTitle}) => {
  const {data, loading, error} = useQuery(GET_ALL_MOVIES, {pollInterval: 500});

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <Box
      w={{
        base: '100%',
        md: '90%',
      }}
      mt="5"
      mb="5">
      <Heading textAlign="center" color={colorTitle}>
        List of Movies
      </Heading>

      <ScrollView
        w={{
          base: '100%',
          md: '90%',
        }}>
        <Stack
          space={2.5}
          alignSelf="center"
          px="4"
          safeArea
          mt="4"
          w={{
            base: '100%',
            md: '25%',
          }}>
          {!data?.movies && (
            <Box alignItems="center">
              <Heading w="100%" textAlign="center" size={20} color={colorTitle}>
                {'No data yet'}
              </Heading>
            </Box>
          )}
          {data.movies.map(movie => (
            <MovieCard key={`movie-${movie.id}`} movie={movie} />
          ))}
        </Stack>
      </ScrollView>
    </Box>
  );
};

MoviesScreen.propTypes = {
  colorTitle: PropTypes.string.isRequired,
};

export default MoviesScreen;
