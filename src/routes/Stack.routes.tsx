import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faUser} from '@fortawesome/free-solid-svg-icons';

import Home from '../views/Home';
import Login from '../views/Login';
import HotelDetails from '../views/HotelDetails';
import Registration from '../views/Registration';
import {StackParamList} from './types';
import Profile from '../views/Profile';

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

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
        }

        // You can return any component that you like here!
        return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
      },
      tabBarLabel: undefined, // This line hides the tab label
    })}
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
  </Tab.Navigator>
);

const StackRoutes = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeTabs} options={{title: 'Home'}} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="HotelDetails" component={HotelDetails} />
    <Stack.Screen name="Registration" component={Registration} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);

export default StackRoutes;
