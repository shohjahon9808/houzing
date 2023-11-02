import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart, faHome, faUser, faCalendar} from '@fortawesome/free-solid-svg-icons';

import Home from '../views/Home';
import Login from '../views/Login';
import HotelDetails from '../views/HotelDetails';
import Registration from '../views/Registration';
import {StackParamList} from './types';
import Profile from '../views/Profile';
import ForgetPassword from '../views/ForgetPassword';
import Favorites from '../views/Favorites';
import Booking from "../views/Booking";

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

// @ts-ignore
const HomeTabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = faHome;
        } else if (route.name === 'Profile') {
          iconName = faUser;
        } else if (route.name === 'Favorites') {
            iconName = faHeart;
        } else if (route.name === 'Booking') {
            iconName = faCalendar;
        }
        return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
      },
      tabBarLabel: undefined,
    })}
    // @ts-ignore
    tabBarOptions={{
      activeTintColor: '#52c0b4',
      inactiveTintColor: 'grey',
    }}>
    <Tab.Screen
      options={{title: 'Home', headerTitle: '', headerShown: false}}
      name="Home"
      component={Home}
    />
    <Tab.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Favorites" component={Favorites}/>
      <Stack.Screen name="Booking" component={Booking}/>
  </Tab.Navigator>
);

const StackRoutes = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <Stack.Screen
      name="HomeTabs"
      component={HomeTabs}
      options={{title: 'Home'}}
    />
    <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Favorites" component={Favorites}/>
      <Stack.Screen name="Booking" component={Booking}/>
      <Stack.Screen name="HotelDetails" component={HotelDetails}/>
    <Stack.Screen name="Registration" component={Registration} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
  </Stack.Navigator>
);

export default StackRoutes;
