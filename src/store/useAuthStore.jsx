import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../utils/apiCofig';

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,


  loadUserFromStorage: () => {
    (async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const storedToken = await AsyncStorage.getItem('token');

        if (storedUser && storedToken) {
          set({
            user: JSON.parse(storedUser),
            token: storedToken,
            isAuthenticated: true,
          });
        }
      } catch (err) {
        console.log('Error loading user from storage', err);
      }
    })();
  },

  login: async (userData, token) => {
    try {
      if (!userData) {
        console.log('Missing user');
        return;
      }

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('token', token);

      set({
        user: userData,
        token: token,
        isAuthenticated: true,
      });

      console.log('User saved successfully');
    } catch (err) {
      console.log(' Error saving user', err);
    }
  },

  logout: () => {
    (async () => {
      try {
        await AsyncStorage.multiRemove(['user', 'token']);
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      } catch (err) {
        console.log('Error during logout', err);
      }
    })();
  },
  refreshUser: async () => {
    const { user, token, login } = get();
    const userId = user?._id;

    if (!userId || !token) {
      console.log('User ID or token missing');
      return;
    }

    try {
      const res = await axios.get(`${baseUrl}/v1/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      const { token: newToken, ...updatedUser } = data;
      login(updatedUser, newToken || token);
      console.log('User refreshed');
    } catch (err) {
      console.log('Error refreshing user', err.response?.data?.message || err.message);
    }
  },




  

}));




export default useAuthStore;
