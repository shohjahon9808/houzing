import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from 'styled-components/native';
import theme from './styles/theme';
import StackRoutes from './routes/Stack.routes';
import React, {useEffect, useState} from 'react';
import Login from './views/Login';
import auth from '@react-native-firebase/auth';
import Registration from './views/Registration';
import ForgetPassword from './views/ForgetPassword';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <GestureHandlerRootView style={style.rootContainer}>
      <SafeAreaView style={style.rootContainer}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            {user ? (
              <StackRoutes />
            ) : (
              <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registration" component={Registration} />
                <Stack.Screen
                  name="ForgetPassword"
                  component={ForgetPassword}
                />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const style = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default App;
