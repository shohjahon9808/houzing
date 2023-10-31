import React, {useState} from 'react';
import * as S from './styles';
import InputEmail from '../../components/InputEmail';
import InputPassword from '../../components/InputPassword';
import {useNavigation} from '@react-navigation/native';
import {RegistrationScreeNavigationProp} from '../../routes/types';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import InputFullName from '../../components/InputFullName';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
const Registration = () => {
  const navigate = useNavigation<RegistrationScreeNavigationProp>();
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (
    values: {
      email: string;
      password: string;
      confirmPassword: string;
      firstName: any;
      lastName: any;
    },
    resetForm,
  ) => {
    try {
      setLoading(true);

      const response = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );

      const user = auth().currentUser;
      if (user) {
        await user.sendEmailVerification();

        // Notify the user to check their email
        Alert.alert(
          'A verification email has been sent.',
          'Please check your email and verify your account.',
        );
        resetForm();
        const verificationCheck = setInterval(async () => {
          await user.reload();

          if (user.emailVerified) {
            clearInterval(verificationCheck);
            await firestore().collection('users').doc(response.user.uid).set({
              fullName: values.fullName,
              email: values.email,
            });

            navigate.navigate('HomeTabs', {userId: response.user.uid});
          }
        }, 10000);

        // Optionally, stop checking after a certain period
        setTimeout(() => {
          clearInterval(verificationCheck);
          if (!user.emailVerified) {
            Alert.alert(
              'Verification Timeout',
              'Please verify your email and log in again.',
            );
          }
        }, 5 * 60 * 1000); // Stop checking after 5 minutes
      }
    } catch (error) {
      Alert.alert('Registration Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../Assets/test.jpg')}
      style={{width: '100%', height: '100%'}}>
      <BlurView style={{flex: 1}} blurType="light" blurAmount={5}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{paddingVertical: 150}}>
            <Formik
              initialValues={{fullName: '', email: '', password: ''}}
              onSubmit={(values, {resetForm}) =>
                handleRegistration(values, resetForm)
              }
              validationSchema={validationSchema}>
              {({handleChange, handleBlur, handleSubmit, errors, touched}) => (
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
                      onBlur={handleBlur('email')}
                      onChangeText={handleChange('email')}
                      placeholder="Email"
                    />
                  </S.InputContainer>
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

                  <S.InputContainer>
                    <InputFullName
                      onChangeText={handleChange('fullName')}
                      placeholder="First name"
                      onBlur={handleBlur('fullName')}
                    />
                  </S.InputContainer>
                  {touched.fullName && errors.fullName && (
                    <Text
                      style={{
                        color: 'red',
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                      }}>
                      {errors.fullName}
                    </Text>
                  )}

                  <S.InputContainer>
                    <InputFullName
                      onChangeText={handleChange('fullName')}
                      placeholder="Last name"
                      onBlur={handleBlur('fullName')}
                    />
                  </S.InputContainer>
                  {touched.fullName && errors.fullName && (
                    <Text
                      style={{
                        color: 'red',
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                      }}>
                      {errors.fullName}
                    </Text>
                  )}

                  <S.InputContainer>
                    <InputPassword
                      onBlur={handleBlur('password')}
                      onChangeText={handleChange('password')}
                      placeholder="Password"
                      secureTextEntry={true}
                    />
                  </S.InputContainer>
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

                  <S.InputContainer>
                    <InputPassword
                      onBlur={handleBlur('password')}
                      onChangeText={handleChange('password')}
                      placeholder="Re-enter Password"
                      secureTextEntry={true}
                    />
                  </S.InputContainer>
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

                  <TouchableOpacity>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: 15,
                        fontSize: 16,
                        color: 'white',
                      }}>
                      If you have an account,{' '}
                      <Text
                        style={{fontWeight: 'bold'}}
                        onPress={() => navigate.navigate('Login')}>
                        Log in
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
                      <S.BookButtonText>Registration</S.BookButtonText>
                    )}
                  </S.BookButton>
                </S.Container>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </BlurView>
    </ImageBackground>
  );
};

export default Registration;
