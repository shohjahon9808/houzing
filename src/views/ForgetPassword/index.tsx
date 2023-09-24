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
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleResetPassword = async values => {
    try {
      setLoading(true);
      await auth().sendPasswordResetEmail(values.email);
      navigation.navigate('Login');
      Alert.alert('Please check your email for password reset instructions.');
    } catch (error) {
      Alert.alert('Forget PasswordS Error', error.message);
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
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
          <ScrollView style={{paddingVertical: 150}}>
            <View>
              <Formik
                initialValues={{email: ''}}
                validationSchema={validationSchema}
                onSubmit={handleResetPassword}>
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
                          onPress={() => navigation.navigate('Login')}>
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
                        <S.BookButtonText>Reset Password</S.BookButtonText>
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

export default ForgetPassword;
