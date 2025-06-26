import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { baseUrl } from '../../utils/apiCofig';
import useAuthStore from '../../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

GoogleSignin.configure({
	webClientId: '433385556397-9nhqv2g75dtpv11tf8tqkf41n2jb2vso.apps.googleusercontent.com',
	offlineAccess: true,
	scopes: ['profile', 'email'],
});

export default function GoogleLogin() {
	const [error, setError] = useState('');
	const { login } = useAuthStore.getState()
	const navigation = useNavigation();

	const handleGoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signOut(); 
    const userInfo = await GoogleSignin.signIn();

    console.log("Full userInfo:", userInfo);
    console.log("idtoken",userInfo.data.idToken)

   

    if (userInfo.data.idToken) {
      const res = await axios.post(
        `${baseUrl}/v1/auth/google`,
        {
          name: userInfo.data.name,
          email: userInfo.data.email,
          googlePhotoUrl: userInfo.data.photo,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = res.data;
      console.log("Response data", data);

      const { token, ...user } = data;
      login(user, token);

      navigation.navigate("MyTabs", {
        screen: "Home",
        initial: true,
      });
    }
  } catch (e) {
    console.log('Google Signin Error:', e.code, e.message);
    setError(e.message);
  }
};



	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<TouchableOpacity
				onPress={handleGoogleLogin}
				style={{ backgroundColor: '#4285F4', padding: 15, borderRadius: 8 }}
			>
				<Text style={{ color: '#fff' }}>Sign in with Google</Text>
			</TouchableOpacity>
		</View>
	);
}
