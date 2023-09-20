import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import {Hotel} from '../types';

export type StackParamList = {
  Home: {userId: string};

  Login: undefined;
  Registration: undefined;
  Profile: undefined;

  HotelDetails: {hotel: Hotel};
};

export type HomeScreeNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Home'
>;
export type LoginScreeNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Login'
>;

export type RegistrationScreeNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Registration'
>;

export type HotelDetailsScreeNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'HotelDetails'
>;

export type HotelDetailsScreenRouteProp = RouteProp<
  StackParamList,
  'HotelDetails'
>;
export type HomeScreenRouteProp = RouteProp<StackParamList, 'Home'>;
export type ProfileScreenRouteProp = RouteProp<StackParamList, 'Profile'>;
