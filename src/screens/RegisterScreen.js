/* eslint-disable react-native/no-raw-text */
//import {useQuery} from '@apollo/react-hooks';
import React, {useState} from 'react';
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
import PropTypes from 'prop-types';
import {useAuth} from '../context/AuthContext';

const initialState = {
  password: '',
  confirmPassword: '',
  mail: '',
  fullName: '',
};

const RegisterScreen = ({setLogin}) => {
  const [user, setUser] = useState(initialState);
  const {register} = useAuth();
  return (
    <Center flex={1} w="100%">
      <Stack
        space={2.5}
        alignSelf="center"
        px="4"
        mt="4"
        w={{
          base: '100%',
        }}>
        <Box alignItems="center">
          <Heading color="#ffffff">Register</Heading>
        </Box>
        {/*<Box>
          <FormControl mb="5">
            <FormControl.Label>
              <Text color="#ffffff">Full Name</Text>
            </FormControl.Label>
            <Input
              color="#ffffff"
              name="mail"
              value={user.fullName}
              placeholder="Full Name..."
              onChangeText={text => setUser({...user, fullName: text})}
            />
          </FormControl>
      </Box> */}
        <Box>
          <FormControl mb="5">
            <FormControl.Label>
              <Text color="#ffffff">Email</Text>
            </FormControl.Label>
            <Input
              color="#ffffff"
              name="mail"
              value={user.mail}
              placeholder="Email..."
              onChangeText={text => setUser({...user, mail: text})}
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
              name="password"
              value={user.password}
              type="password"
              placeholder="Password..."
              onChangeText={text => setUser({...user, password: text})}
            />
          </FormControl>
        </Box>
        {/* <Box>
          <FormControl mb="5">
            <FormControl.Label>
              <Text color="#ffffff">Confirm Password</Text>
            </FormControl.Label>
            <Input
              color="#ffffff"
              name="confirm_password"
              value={user.confirmPassword}
              type="password"
              placeholder="Confirm password..."
              onChangeText={text => setUser({...user, confirmPassword: text})}
            />
          </FormControl>
    </Box> */}
        <Box mb="5" alignItems="center">
          <Text color="#ffffff" onPress={() => setLogin(true)}>
            Do you already have a registered account?
          </Text>
        </Box>
        <Button bg="#7eb2c9" onPress={() => register(user.mail, user.password)}>
          <Text color="#ffffff">Save user</Text>
        </Button>
      </Stack>
    </Center>
  );
};

RegisterScreen.propTypes = {
  setLogin: PropTypes.func.isRequired,
};

export default RegisterScreen;
