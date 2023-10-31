import React, {useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import * as S from '../Login/styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  /* const MAX_RETRIES = 5;
     const INITIAL_DELAY_MS = 500;
   */
  /*const fetchUserProfileWithRetry = async (retryCount = 0) => {
    try {
      const userId = auth().currentUser.uid;
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setUsername(userData.username);
      } else {
        console.log('User not found in Firestore.');
      }
    } catch (error) {
      if (error.code === 'firestore/unavailable' && retryCount < MAX_RETRIES) {
        const delayMs = INITIAL_DELAY_MS * Math.pow(2, retryCount);
        setTimeout(() => fetchUserProfileWithRetry(retryCount + 1), delayMs);
      } else {
        console.error('Error fetching user data: ', error);
      }
    }
  };*/

  const saveProfile = async () => {
    // ... (your saveProfile function code)
  };

  return (
    <View style={{padding: 20, backgroundColor: 'white', flex: 1}}>
      <Text style={{marginBottom: 10}}>Email:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#DDD',
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={{marginBottom: 10}}>Username:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#DDD',
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={{marginBottom: 10}}>First Name:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#DDD',
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={{marginBottom: 10}}>Last Name:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#DDD',
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <S.BookButton onPress={saveProfile}>
        <S.BookButtonText>Save Profile</S.BookButtonText>
      </S.BookButton>
      <S.BookButton
        style={{
          backgroundColor: 'white',
          borderColor: 'red',
          borderWidth: 1,
        }}
        onPress={() => {
          Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => auth().signOut(),
              },
            ],
            {cancelable: false},
          );
        }}>
        <S.BookButtonText style={{color: 'red'}}>Sign out</S.BookButtonText>
      </S.BookButton>
    </View>
  );
};

export default Profile;
