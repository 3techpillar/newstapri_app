import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import axios from 'axios';
import { baseUrl } from '../utils/apiCofig';
import useAuthStore from '../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import GoogleLogin from '../components/googleAuth/GoogleLogin';
import Toast from 'react-native-toast-message';

const Signup = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore.getState()
  const navigation = useNavigation();

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

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
    if(name.length<3){
      Toast.show({
        type: 'error',
        text1: 'Name should be more than 3 character ',
         
      });
      return;

    }
    if(password.length<4){
      Toast.show({
        type:"error",
        text1:"password must be greater than 5 character and contain symobls"
      })
    }

    try {
      const res = await axios.post(`${baseUrl}/v1/auth/signup`, {
        username: name,
        email: email,
        password: password
      })

      const data = res.data;
      const { token, ...user } = data;

      login(user, token)

      setname('')
      setemail('')
      setPassword('')
      navigation.navigate("MyTabs", {
        screen: "Home",
        initial: true
      });



    } catch (error) {
      console.log("error while registering", error)

    }
  };


  return (
    <>
      <Header />
      <SafeAreaView style={styles.container}>
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
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f1fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '90%',
    backgroundColor: '#f8f896',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    gap: 14,
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

