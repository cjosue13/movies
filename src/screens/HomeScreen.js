/* eslint-disable react-native/no-raw-text */
import {Box, Center, HamburgerIcon, Menu, Pressable} from 'native-base';
import React, {useState} from 'react';
import LoginScreen from './LoginScreen';
import MoviesScreen from './MoviesScreen';
import RegisterScreen from './RegisterScreen';
import auth from '@react-native-firebase/auth';
import {useAuth} from '../context/AuthContext';
import StartScreen from './StartScreen';

const HomeScreen = () => {
  const [option, setOption] = useState('movies');
  const [login, setLogin] = useState(true);
  const {user, setUser} = useAuth();

  auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
      /*user.getIdToken().then(function (idToken) {  
      });*/
    }
  });

  if(user){
    return <StartScreen />
  }

  return (
    <Center bg="#01234c" flex={1} px="3">
      <Box h="90%" w="100%" alignItems="flex-start">
        <Menu
          closeOnSelect
          w="190"
          trigger={triggerProps => {
            return (
              <Pressable {...triggerProps}>
                <HamburgerIcon color="#ffffff" />
              </Pressable>
            );
          }}>
          <Menu.OptionGroup defaultOption="movies" title="Options" type="radio">
            <Menu.ItemOption
              onPress={() => {
                if (option !== 'movies') setOption('movies');
              }}
              value="movies">
              Movies
            </Menu.ItemOption>
            <Menu.ItemOption
              onPress={() => {
                if (option !== 'login/signin') setOption('login/signin');
              }}
              value="login/signin">
              LogIn/SignIn
            </Menu.ItemOption>
          </Menu.OptionGroup>
        </Menu>
        {option !== 'movies' ? (
          login ? (
            <LoginScreen setLogin={setLogin} />
          ) : (
            <RegisterScreen setLogin={setLogin} />
          )
        ) : (
          <MoviesScreen colorTitle={'#ffffff'} />
        )}
      </Box>
    </Center>
  );
};

export default HomeScreen;
