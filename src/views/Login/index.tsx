import React, {useState} from 'react';
import * as S from './styles';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputEmail from '../../components/InputEmail';
import InputPassword from '../../components/InputPassword';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {LoginScreeNavigationProp} from '../../routes/types';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BlurView} from '@react-native-community/blur';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigation<LoginScreeNavigationProp>();
  const [loading, setLoading] = useState(false);

  async function handleLogin(values) {
    try {
      setLoading(true);
      const response = await auth().signInWithEmailAndPassword(
        values.email,
        values.password,
      );

      if (response && response.user) {
        const userId = response.user.uid;

        // Optionally, check email verification status
        if (!response.user.emailVerified) {
          Alert.alert(
            'Email not verified',
            'Please verify your email before proceeding.',
          );
          return; // Exit the function
        }

        await AsyncStorage.setItem('userId', userId);

        // Save userId to AsyncStorage for persistent storage

        navigate.navigate('Home', {userId: userId});
      } else {
        Alert.alert('Login Error', 'No user data received. Please try again.');
      }
    } catch (error) {
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground
      source={require('../../../Assets/test.jpg')}
      style={{flex: 1, width: '100%', height: '100%'}}
      resizeMode={'cover'}>
      <BlurView style={{flex: 1}} blurType="light" blurAmount={1}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView keyboardShouldPersistTaps="handled" style={{top: 200}}>
            <View>
              <Formik
                initialValues={{fullName: '', email: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={handleLogin}>
                {({
                  handleBlur,
                  handleChange,
                  errors,
                  touched,
                  handleSubmit,
                }) => (
                  <S.Container>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      Houzing
                    </Text>

                    <S.InputContainer>
                      <InputEmail
                        placeholder="Email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                      />
                      {touched.email && errors.email && (
                        <Text
                          style={{
                            color: 'red',
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                          }}>
                          {errors.email}
                        </Text>
                      )}
                    </S.InputContainer>

                    <S.InputContainer>
                      <InputPassword
                        placeholder="Password"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry
                      />
                      {touched.password && errors.password && (
                        <Text
                          style={{
                            color: 'red',
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                          }}>
                          {errors.password}
                        </Text>
                      )}
                    </S.InputContainer>

                    <TouchableOpacity>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 15,
                          fontSize: 16,
                          color: 'white',
                        }}>
                        If you have not an account,{' '}
                        <Text
                          style={{fontWeight: 'bold'}}
                          onPress={() => navigate.navigate('Registration')}>
                          Registration
                        </Text>
                      </Text>
                    </TouchableOpacity>

                    <S.BookButton onPress={handleSubmit}>
                      {loading ? (
                        <ActivityIndicator
                          style={{paddingVertical: 24}}
                          color="#FFF"
                        />
                      ) : (
                        <S.BookButtonText>Login</S.BookButtonText>
                      )}
                    </S.BookButton>
                  </S.Container>
                )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </BlurView>
    </ImageBackground>
  );
};

export default Login;
