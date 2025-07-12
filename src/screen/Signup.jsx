import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '../utils/apiCofig';
import useAuthStore from '../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import GoogleLogin from '../components/googleAuth/GoogleLogin';
import Toast from 'react-native-toast-message';

import { getApp } from '@react-native-firebase/app';
import { getMessaging } from '@react-native-firebase/messaging';

const Signup = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const [fcmToken, setfcmToken] = useState('')
  const { login } = useAuthStore.getState()
  const navigation = useNavigation();
  const platform = Platform.OS

  const app = getApp();
  const messaging = getMessaging(app);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  useEffect(() => {
    token()
  }, [fcmToken])

  const token = async () => {
    const token = await messaging.getToken();
    console.log("fcm token for device is", token)
    setfcmToken(token)

  }

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',

      });
      return;
    }
    else if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email format',

      });

      return;
    }
    if (name.length < 3) {
      Toast.show({
        type: 'error',
        text1: 'Name should be more than 3 character ',

      });
      return;

    }
    if (password.length < 4) {
      Toast.show({
        type: "error",
        text1: "password must be greater than 5 character and contain symobls"
      })
    }

    try {
      const res = await axios.post(`${baseUrl}/v1/auth/signup`, {
        username: name,
        email: email,
        password: password,
        platform,
        fcmToken
      })

      if (res.status === 200) {
        const data = res.data;
        console.log(" signup data",data)
        const { token, ...user } = data;

        login(user, token)

        setname('')
        setemail('')
        setPassword('')
        navigation.navigate("MyTabs", {
          screen: "Home",
          initial: true
        });
      } 
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "User already exist"
      })

    }
  };


  return (
    
      <SafeAreaView style={styles.container}>

       <Header />
       
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Enter your name (min 3 char ).."
            autoCorrect={false}
            value={name}
            onChangeText={setname}
            style={styles.input}
            placeholderTextColor="#999"

          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email.."
            autoCorrect={false}
            value={email}
            onChangeText={setemail}
            style={styles.input}
            placeholderTextColor="#999"
            keyboardType="email-address"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password.."
            autoCorrect={false}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>

            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <Text style={styles.loginLink}> Log In</Text>
            </TouchableOpacity>
          </View>
          <GoogleLogin />
        </View>
      </SafeAreaView>
    
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  
  },
  form: {
    backgroundColor: '#f0f0f0',
      padding: 30,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 16,
      gap: 15,
      width: '90%',
      alignSelf: 'center',
      marginTop: 60,
  },
  label: {
    fontSize: 15.5,
    fontWeight: '600',
    color: '#3a3a3a',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#aad3f2',
    fontSize: 15.5,
    color: '#333',
  },
  button: {
    backgroundColor: '#2e86de',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#444',
    fontSize: 14,
  },
  loginLink: {
    color: '#2e86de',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
});

