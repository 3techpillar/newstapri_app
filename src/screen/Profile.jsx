import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal, TextInput, Alert } from 'react-native'
import useAuthStore from '../store/useAuthStore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { baseUrl } from '../utils/apiCofig';
import Signup from './Signup';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import { useCallback, useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';


const Profile = () => {

  const [editButton, seteditButton] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [updatedUserName,setupdatedUserName]=useState('')

  const user = useAuthStore((state) => state.user);
  const userId = user?._id;
  const refreshUser = useAuthStore((state) => state.refreshUser);
  const { logout } = useAuthStore();
  const { login } = useAuthStore.getState();
  const Newtoken = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigation = useNavigation();


  


  const handleLogout = () => {
    logout();
  };

  useFocusEffect(
    useCallback(() => {
      const fetchUserbyId = async () => {
        try {
          const res = await axios.get(`${baseUrl}/v1/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${Newtoken}`,
            },
          });
          const data = res.data;
          const { token: newToken, ...updatedUser } = data;
          login(updatedUser, newToken || Newtoken);
        } catch (error) {
          console.log("error in fetching user", error.response?.data?.message || error.message);
        }
      };

      if (userId) {
        fetchUserbyId();
      }

      return () => { };
    }, [userId, Newtoken])
  );


  if (!isAuthenticated) {
    return (
      <Signup />

    );
  }




  const handleEdit = () => {
    seteditButton(!editButton)
  }

  const openGallery = () => {
    
  launchImageLibrary(
    { mediaType: 'photo', quality: 1 },
    response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri;
        console.log("Selected image URI:", uri);
        setImageUri(uri);
      }
    }
  );
};

const updateProfile = async (e) => {
  e.preventDefault();

  if (!updatedUserName || updatedUserName.length < 8) {
    Toast.show({
      type: 'error',
      text1: 'Name must be at least 8 characters long',
    });
    return;
  }

  try {
    const res = await axios.put(
      `${baseUrl}/v1/user/update/${userId}`,
      {
        profilePicture: imageUri || user?.profilePicture,
        username: updatedUserName || user?.username,
      },
      {
        headers: {
          Authorization: `Bearer ${Newtoken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    await refreshUser();

    Toast.show({
      type: 'success',
      text1: 'Profile updated successfully',
    });

    seteditButton(false);
  } catch (error) {
    console.log("Update Error:", error.response?.data.message || error.message);
    Toast.show({
      type: 'error',
      text1: error.response?.data.message,
    });
  }
};



  return (


    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: user.profilePicture? user.profilePicture:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          }}
          style={styles.image}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user?.username}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        <TouchableOpacity onPress={handleEdit}>
          <EditIcon name="edit" size={30} color="black" />

        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QuizHistory')}>
          <Text style={styles.buttonText}>📘 Quiz History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.buttonText}>💳 My Transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Wallet')}>
          <Text style={styles.buttonText}>👛 Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>

     <Modal
  animationType="slide"
  transparent={true}
  visible={editButton}
  onRequestClose={() => seteditButton(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Edit Profile</Text>
      <TouchableOpacity onPress={openGallery}>
        <Image
          source={{
            uri: imageUri
              ? imageUri
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          }}
          style={styles.image1}
        />
        <Text style={{ textAlign: 'center', marginVertical: 8, color: 'blue' }}>Tap to change photo</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Enter new name"
        placeholderTextColor="gray"
        autoCorrect={false}
        style={styles.input}
        value={updatedUserName}
        onChangeText={setupdatedUserName}
        
      />
      <TouchableOpacity style={styles.modalButton} onPress={updateProfile}>
        <Text style={styles.modalButtonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => seteditButton(false)}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </ScrollView>



  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f9f9fb',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#dcdde1',
    backgroundColor: '#ecf0f1',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  userInfo: {
    flex: 1,
  },

  image1: {
  width: 120,
  height: 120,
  borderRadius: 60,
  alignSelf: 'center',
  marginTop: 10,
},
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  divider: {
    height: 1,
    backgroundColor: '#dcdde1',
    marginVertical: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    width: '90%',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#3498db',
    alignItems: 'center',
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalOption: {
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelText: {
    marginTop: 10,
    textAlign: 'center',
    color: 'red',
  },

});
