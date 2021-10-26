/* eslint-disable react-native/no-raw-text */
import {Box, Text, VStack} from 'native-base';
import React from 'react';
import PropTypes from 'prop-types';

const Details = ({movie}) => {
  return (
    <VStack mt="3" bg="#f5f9ff">
      <Box>
        <Text bold color="#000000" textAlign="center" fontSize={18}>
          Description:
        </Text>
        <Text mt="2" fontSize={14} color="#454545">
          {movie.description}
        </Text>
      </Box>
      <Box mt="5">
        <Text bold fontSize={14} color="#000000">
          Date of issue:&nbsp;&nbsp;
          <Text mt="2" fontSize={12} color="#454545">
            {new Date(movie.year).toDateString()}
          </Text>
        </Text>
      </Box>
    </VStack>
  );
};

Details.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default Details;
