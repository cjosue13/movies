/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {client} from './src/graphql/client';
import {ApolloProvider} from '@apollo/react-hooks';
import {NativeBaseProvider} from 'native-base';
import {AuthProvider} from './src/context/AuthContext';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <NativeBaseProvider>
      <ApolloProvider client={client}>
        <AuthProvider>
          <HomeScreen />
        </AuthProvider>
      </ApolloProvider>
    </NativeBaseProvider>
  );
};

export default App;
