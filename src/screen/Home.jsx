import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import Header from '../components/Header'
import Posts from '../components/home/Posts'
import Trending from '../components/home/Trending'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthorizationStatus, getMessaging, requestPermission } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import { Platform, PermissionsAndroid } from 'react-native';
import { useEffect } from 'react'


const Home = () => {
 
useEffect(() => {
  const setupNotifications = async () => {
    const messaging = getMessaging(getApp());

    try {
      await messaging.registerDeviceForRemoteMessages();

      const authStatus = await requestPermission(messaging);
      const enabled =
       authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      console.log('🔐 Firebase Permission:', enabled, authStatus);

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message: 'We need this to send you updates.',
            buttonPositive: 'Allow',
          }
        );
        console.log('📲 POST_NOTIFICATIONS:', granted);
      }
    } catch (err) {
      console.error('❌ Notification permission error:', err);
    }
  };

  const timer = setTimeout(() => {
    setupNotifications();
  }, 1000); 
  return () => clearTimeout(timer);
}, []);




























    return (
        <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView >
        <View>
          <Trending />
        </View>
        <Posts />
       
      </ScrollView>
    </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
