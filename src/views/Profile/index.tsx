import React, {useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import * as S from '../Login/styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const saveProfile = async () => {
    try {
      const userDoc = firestore().collection('users').doc(); // Use appropriate document reference
      await userDoc.set({
        firstName: firstName,
        lastName: lastName,
      });
      Alert.alert('Success', 'Profile updated successfully.');
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Could not save profile.');
    }
  };
  return (
    <View style={{padding: 20, backgroundColor: 'white', flex: 1}}>
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
