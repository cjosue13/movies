/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Box, Flex, HStack, Image, Text} from 'native-base';
import Details from '../Details/Details';

const MovieCard = ({movie}) => {
  const [open, setOpen] = useState(false);
  return (
    <HStack>
      <Box w="100%" mt="5" bg="#f5f9ff" p="4" borderRadius="md">
        <HStack>
          <Box>
            <Image
              borderRadius="md"
              source={{
                uri: movie.image,
                method: 'POST',
                headers: {
                  Pragma: 'no-cache',
                },
                body: 'Your Body goes here',
              }}
              resizeMode="cover"
              size="md"
              alt={`image-${movie.id}`}
            />
          </Box>
          <Box ml="5">
            <Text
              textAlign="center"
              color="#000000"
              mt="3"
              fontWeight="medium"
              fontSize={20}>
              {movie.title}
            </Text>
          </Box>
        </HStack>

        {open && <Details movie={movie} />}

        <Flex>
          <Text
            mt="2"
            fontSize={12}
            fontWeight="medium"
            color="#7eb2c9"
            textAlign="right"
            onPress={() => setOpen(!open)}>
            {open ? 'Close' : 'View more info'}
          </Text>
        </Flex>
      </Box>
    </HStack>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
