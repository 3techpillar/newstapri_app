import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions ,Linking , Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useState } from 'react';

const { width } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);

  const handleAbout = () => {
    navigation.navigate('About');
    setOpen(false);
  };

  const handleContact = () => {
    navigation.navigate('Contact');
    setOpen(false);
  };
  const handlePrivacy = () => {
    navigation.navigate('Privacy');
    setOpen(false);
  };


  const handleClick = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MyTabs' }],
    });
  };

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Can't open this URL: " + url);
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.left} onPress={handleClick}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />

        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <MenuIcon name="menu" size={28} color="black" />
        </TouchableOpacity>
      </SafeAreaView>

      {open && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.close} onPress={() => setOpen(false)}>
            <AntDesign name="close" size={28} color="black" />
          </TouchableOpacity>
          <View style={styles.menuItemView}>
            <TouchableOpacity onPress={handleAbout}>
              <Text style={styles.menuItem}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleContact}>
              <Text style={styles.menuItem}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePrivacy}>
              <Text style={styles.menuItem}>Privacy</Text>
            </TouchableOpacity>

          </View>
          <View styles={styles.socialContainer}>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => openLink("https://www.facebook.com/checkpoint/disabled/")}>
                <MaterialCommunityIcons name='facebook' size={35} color="#3b5998" style={styles.socialIcon} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openLink("https://www.instagram.com/news_tapri_/")}>
                <MaterialCommunityIcons name="instagram" size={35} color="#C13584" style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink("https://x.com/news_tapri?")}>
                <MaterialCommunityIcons name="twitter" size={35} color="#1DA1F2" style={styles.socialIcon} />
              </TouchableOpacity>

            <TouchableOpacity onPress={() => openLink("https://www.whatsapp.com")}>
                <MaterialCommunityIcons name="whatsapp" size={35} color="#39d467" style={styles.socialIcon} />
              </TouchableOpacity>
              
            </View>
            <Text>Copyright © 2025 NewsTapri</Text>
          </View>
        </View>
      )}

    </>
  );
};

export default Header;
const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    width: "70%",
    height: "100%",
    top: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 999,
  },
  container: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 19,
    height: 80,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    elevation: 4,
    shadowColor: '#f0f0f0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    position: 'relative',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 50,
    resizeMode: 'contain',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    position: 'absolute',
    left: width / 2 - 40,
  },
  menuItemView: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    color: '#333',
    backgroundColor: "#F2F2F2"
  },
  close: {
    position: "absolute",
    right: 20,
    top: 20
  },
  socialContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    gap: 5,
    height: "85%",
  },
  socialIcon: {
    marginHorizontal: 10,
    height: "10%",
    width: "80%",
    top: "48%",
  },
});