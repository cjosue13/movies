/* eslint-disable react-native/no-raw-text */
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
} from 'native-base';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useAuth} from '../context/AuthContext';

const initialState = {
  mail: '',
  password: '',
};

const LoginScreen = ({setLogin}) => {
  const [user, setUser] = useState(initialState);
  const {login} = useAuth();
  return (
    <Center flex={1} w="100%">
      <Stack
        space={2.5}
        alignSelf="center"
        px="4"
        safeArea
        mt="4"
        w={{
          base: '100%',
        }}>
        <Box alignItems="center">
          <Heading alignText="center" color="#ffffff">
            LogIn
          </Heading>
        </Box>
        <Box>
          <FormControl mb="5">
            <FormControl.Label>
              <Text color="#ffffff">Email</Text>
            </FormControl.Label>
            <Input
              value={user.mail}
              onChangeText={text => setUser({...user, mail: text})}
              color="#ffffff"
              placeholder="Email..."
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl mb="5">
            <FormControl.Label>
              <Text color="#ffffff">Password</Text>
            </FormControl.Label>
            <Input
              color="#ffffff"
              placeholder="Password..."
              value={user.password}
              type="password"
              onChangeText={text => setUser({...user, password: text})}
            />
          </FormControl>
        </Box>

        <Box mb="5" mt="5" alignItems="center">
          <Text color="#ffffff" onPress={() => setLogin(false)}>
            You do not have an account yet?
          </Text>
        </Box>

        <Button bg="#7eb2c9" onPress={() => login(user.mail, user.password)}>
          <Text color="#ffffff">Log In</Text>
        </Button>
      </Stack>
    </Center>
  );
};

LoginScreen.propTypes = {
  setLogin: PropTypes.func.isRequired,
};

export default LoginScreen;
