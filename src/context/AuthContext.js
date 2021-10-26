import React, {createContext, useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import PropTypes from 'prop-types';

import {useToast} from 'native-base';

export const AuthContext = createContext();
const toast = useToast();

/*GoogleSignin.configure({
  webClientId: '690037883824-gr66arcjamd1jab5ddpp38kesrc6scoc.apps.googleusercontent.com',
});*/
GoogleSignin.configure({
  webClientId:
    '690037883824-gr66arcjamd1jab5ddpp38kesrc6scoc.apps.googleusercontent.com',
  offlineAccess: true,
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        googleLogin: async () => {
          try {
            // Get the users ID token
            await GoogleSignin.hasPlayServices();
            const credential = await GoogleSignin.signIn();
            console.log(credential);

            // Create a Google credential with the token
            const googleCredential =
              auth.GoogleAuthProvider.credential(credential);

            // Sign-in the user with the credential
            await auth()
              .signInWithCredential(googleCredential)
              // Use it only when user Sign's up,
              // so create different social signup function
              // .then(() => {
              //   //Once the user creation has happened successfully, we can add the currentUser into firestore
              //   //with the appropriate details.
              //   // console.log('current User', auth().currentUser);
              //   firestore().collection('users').doc(auth().currentUser.uid)
              //   .set({
              //       fname: '',
              //       lname: '',
              //       email: auth().currentUser.email,
              //       createdAt: firestore.Timestamp.fromDate(new Date()),
              //       userImg: null,
              //   })
              //   //ensure we catch any errors at this stage to advise us if something does go wrong
              //   .catch(error => {
              //       console.log('Something went wrong with added user to firestore: ', error);
              //   })
              // })
              //we need to catch the whole sign up process if it fails too.
              .catch(error => {
                alert(error);
              });
          } catch (error) {
            alert(error);
          }
        },
        /* fbLogin: async () => {
          try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions([
              'public_profile',
              'email',
            ]);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(
              data.accessToken,
            );

            // Sign-in the user with the credential
            await auth()
              .signInWithCredential(facebookCredential)
              // Use it only when user Sign's up,
              // so create different social signup function
              // .then(() => {
              //   //Once the user creation has happened successfully, we can add the currentUser into firestore
              //   //with the appropriate details.
              //   console.log('current User', auth().currentUser);
              //   firestore().collection('users').doc(auth().currentUser.uid)
              //   .set({
              //       fname: '',
              //       lname: '',
              //       email: auth().currentUser.email,
              //       createdAt: firestore.Timestamp.fromDate(new Date()),
              //       userImg: null,
              //   })
              //   //ensure we catch any errors at this stage to advise us if something does go wrong
              //   .catch(error => {
              //       console.log('Something went wrong with added user to firestore: ', error);
              //   })
              // })
              //we need to catch the whole sign up process if it fails too.
              .catch(error => {
                console.log('Something went wrong with sign up: ', error);
              });
          } catch (error) {
            console.log({error});
          }
        },*/
        register: async (email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                //Once the user creation has happened successfully, we can add the currentUser into firestore
                //with the appropriate details.
                toast.show({
                  title: 'Registered user successfully.',
                  placement: 'bottom',
                });
              })
              //we need to catch the whole sign up process if it fails too.
              .catch(error => {
                alert(error);
              });
          } catch (e) {
            alert(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
            setUser(null);
          } catch (e) {
            alert(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
