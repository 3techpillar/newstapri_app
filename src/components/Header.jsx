import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions ,Linking , Alert, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(null);

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

 const openLink = (link) => {
  setUrl(link);   
  setOpen(false); 
 
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
         {url ? (
      <Modal visible={!!url} animationType="slide" onRequestClose={() => setUrl(null)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <TouchableOpacity style={styles.close} onPress={() => setUrl(null)}>
            <AntDesign name="close" size={28} color="black" />
          </TouchableOpacity>
          <WebView source={{ uri: url }} style={{ flex: 1 }} />
        </SafeAreaView>
      </Modal>
         ):(

      open && (
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
                <Image source ={ require('../assets/facebook.png')} size={28}  style={styles.socialIcon} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openLink("https://www.instagram.com/news_tapri_/")}>
                < Image source ={require('../assets/instagram.png')} size={28}  style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink("https://x.com/news_tapri?")}>
                < Image source ={require('../assets/twitter.png')} size={28}  style={styles.socialIcon} />
              </TouchableOpacity>

            <TouchableOpacity onPress={() => openLink("https://www.whatsapp.com")}>
                < Image source ={require('../assets/whatsapp.png')} size={28} style={styles.socialIcon} />
              </TouchableOpacity>
              
            </View>
            <Text style={styles.textItem}>Copyright © 2025 NewsTapri</Text>
          </View>
        </View>
      )
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
    top: 90,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingTop: 60,
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
    height: 95,
    // width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    elevation: 4,
    shadowColor: '#f0f0f0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // position: 'relative',
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
    top: 20,
  },
  socialContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    gap: 4,
    height: "78%",
    width: "70%",
    left:0,
  },
  socialIcon: {
    marginHorizontal: 10,
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginVertical: 10,
     top: "47%",
  },
  textItem :{
  right:0,
  
  },
});