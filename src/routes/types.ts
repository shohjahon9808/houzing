import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

import {Hotel} from '../types';

export type StackParamList = {
  Home: {userId: string};
  HomeTabs: {userId: string};

  Login: undefined;
  ForgetPassword: undefined;
  Registration: undefined;
  Profile: undefined;
  Favorites: undefined;

  HotelDetails: {hotel: Hotel};
};

export type HomeScreeNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Home',
  'HomeTabs'
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
export type ForgetPasswordScreenRouteProp = RouteProp<
  StackParamList,
  'ForgetPassword'
>;
export type HomeScreenRouteProp = RouteProp<StackParamList, 'Home'>;
export type ProfileScreenRouteProp = RouteProp<StackParamList, 'Profile'>;
