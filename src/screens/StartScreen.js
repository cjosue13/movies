import {Box, Center, HStack, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import {useAuth} from '../context/AuthContext';
// import FavoriteScreen from './FavoriteScreen';
import MoviesScreen from './MoviesScreen';
import RegisterMovieScreen from './RegisterMovieScreen';

const StartScreen = () => {
  const [selected, setSelected] = useState(0);
  const {logout} = useAuth();
  return (
    <Box flex={1} bg="white" safeAreaTop>
      <Center flex={1}>
        {selected === 0 && <MoviesScreen colorTitle={'#000000'} />}
        {/* selected === 1 && <FavoriteScreen /> */}
        {selected === 1 && <RegisterMovieScreen />}
      </Center>
      <HStack bg="#01234c" alignItems="center" safeAreaBottom>
        <Pressable
          cursor="pointer"
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(0)}>
          <Center>
            <Text bold color="white" fontSize={18}>
              Movies
            </Text>
          </Center>
        </Pressable>
        {/* <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(1)}>
          <Center>
            <Text bold color="white" fontSize={18}>
              Favorites
            </Text>
          </Center>
        </Pressable> */}
        <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => setSelected(1)}>
          <Center>
            <Text bold color="white" fontSize={18}>
              Register Movie
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 2 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => logout()}>
          <Center>
            <Text bold color="white" fontSize={18}>
              Logout
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default StartScreen;
