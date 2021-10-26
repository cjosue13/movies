/* eslint-disable react-native/no-raw-text */
import {Heading, HStack, Spinner} from 'native-base';
import React from 'react';

const Loading = () => {
  return (
    <HStack space={2} alignItems="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="#01234c" fontSize="md">
        Loading
      </Heading>
    </HStack>
  );
};

export default Loading;
