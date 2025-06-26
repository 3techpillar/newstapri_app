import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert,StyleSheet } from 'react-native';
import { GoogleSignin, statusCodes, GoogleLogoButton, } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { baseUrl } from '../../utils/apiCofig';
import useAuthStore from '../../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


const WEB_CLIENT_ID = '433385556397-9nhqv2g75dtpv11tf8tqkf41n2jb2vso.apps.googleusercontent.com';

export default function GoogleLogin() {
  const [gmail, setGmail] = useState(null);
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const navigation = useNavigation();

  useEffect(() => {
    configureGoogleSign();
  }, []);

  function configureGoogleSign() {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: false,
      scopes: ['profile', 'email'],
    });
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      setGmail(userInfo);
      const GoogleidToken = userInfo.data.idToken;
   
      const res = await axios.post(`${baseUrl}/v1/auth/google`, {
        name: userInfo?.user?.name || userInfo?.data?.user?.name,
        email: userInfo?.user?.email || userInfo?.data?.user?.email,
        googlePhotoUrl: userInfo?.user?.photo || userInfo?.data?.user?.photo,
      });
      console.log("res",res)
      
      const data = res.data;
      const { token, ...user } = data;
      login(user, token);

      navigation.navigate("MyTabs", {
        screen: "Home",
        initial: true
      });

    } catch (error) {
      console.log('Google SignIn Error:', error.code || '', error.message || error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Toast.show({
          type:"error",
          text1:'Google sign-in was cancelled.'
        })
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Toast.show({
          type:"error",
          text1:'Google sign-in is already in progress.'
        })
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
         Toast.show({
          type:"error",
          text1:'Google Play Services not available or outdated'
        })
      } else {
        setError(error.message || 'Something went wrong.');
      }
    }
  };

  return (
      <TouchableOpacity
        onPress={signIn}
        style={styles.Gbutton}
      >
        <Text style={styles.GbuttonText}>Sign in with Google</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Gbutton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  GbuttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
