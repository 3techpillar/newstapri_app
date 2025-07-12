import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import Header from '../components/Header';
import Posts from '../components/home/Posts';
import Trending from '../components/home/Trending';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform, PermissionsAndroid } from 'react-native';
import { useEffect } from 'react';
import { getApp } from '@react-native-firebase/app';
import { getMessaging, AuthorizationStatus } from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

const Home = () => {
  useEffect(() => {
    let unsubscribeOnMessage = () => { };
    let unsubscribeTokenRefresh = () => { };

    const setupNotifications = async () => {
      try {
        console.log('🚀 Starting notification setup...');
        const app = getApp();
        const messaging = getMessaging(app);

        if (!messaging.isDeviceRegisteredForRemoteMessages) {
          await messaging.registerDeviceForRemoteMessages();
          console.log('📱 Device registered for remote messages');
        }

        const authStatus = await messaging.requestPermission({
          sound: true,
          announcement: true,
          badge: true,
          carPlay: true,
          criticalAlert: true,
          provisional: false,
        });

        const enabled =
          authStatus === AuthorizationStatus.AUTHORIZED ||
          authStatus === AuthorizationStatus.PROVISIONAL;

        console.log('🔐 Firebase Permission:', enabled, authStatus);

        if (!enabled) {
          Alert.alert(
            'Notification Permission Denied',
            'Please enable notifications in Settings to receive updates.'
          );
          return;
        }

        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'Notification Permission',
              message: 'We need permission to send you important updates.',
              buttonPositive: 'Allow',
              buttonNegative: 'Deny',
            }
          );
          console.log('📲 POST_NOTIFICATIONS:', granted);

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('⚠️ POST_NOTIFICATIONS denied');
            return;
          }
        }

        if (Platform.OS === 'android') {
          try {
            await notifee.createChannel({
              id: 'default',
              name: 'Default Channel',
              importance: AndroidImportance.HIGH,
              sound: 'default',
              vibration: true,
            });
            console.log('📢 Notification channel created');
          } catch (channelError) {
            console.log('⚠️ Channel creation error:', channelError);
          }
        }

        unsubscribeOnMessage = messaging.onMessage(async remoteMessage => {
          console.log('📩 Foreground message received:', JSON.stringify(remoteMessage, null, 2));
          try {
            await notifee.displayNotification({
              title: remoteMessage.notification?.title || 'New Notification',
              body: remoteMessage.notification?.body || 'You have a new message',
              android: {
                channelId: 'default',
                smallIcon: 'ic_launcher',
                color: '#FF6B6B',
                pressAction: {
                  id: 'default',
                },
              },
              ios: {
                sound: 'default',
                badgeCount: 1,
              },
            });
            console.log('✅ Notification displayed successfully');
          } catch (displayError) {
            console.log('❌ Notification display error:', displayError);
          }
        });

          const initialNotification = await messaging.getInitialNotification();
          if (initialNotification) {
            console.log('🧊 Notification opened from quit state:', JSON.stringify(initialNotification, null, 2));
          }

          unsubscribeTokenRefresh = messaging.onTokenRefresh(newToken => {
            console.log('🔄 FCM Token refreshed:', newToken);
            
          });

          console.log('✅ Notification setup completed successfully');
        } catch (error) {
          console.error('❌ Notification setup error:', error);
          Alert.alert('Setup Error', `Failed to setup notifications: ${error.message}`);
        }
      };

      const setupTimer = setTimeout(() => {
        setupNotifications();
      }, 1000);

      return () => {
        clearTimeout(setupTimer);
        unsubscribeOnMessage?.();
        unsubscribeTokenRefresh?.();
      };
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
    backgroundColor: '#f0f0f0',
    
  },
});
