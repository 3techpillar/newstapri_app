import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from 'react-native-vector-icons/Feather';
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

  const handleClick = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MyTabs' }],
    });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.left} onPress={handleClick}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />

        </TouchableOpacity>

        <TouchableOpacity onPress={() => setOpen(!open)}>
          <MenuIcon name="menu" size={28} color="black" />
        </TouchableOpacity>
      </SafeAreaView>

      {open && (
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={handleAbout}>
            <Text style={styles.menuItem}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleContact}>
            <Text style={styles.menuItem}>Contact</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
 backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 19,
    height: 90,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    
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
  
  menuContainer: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 999,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
  },
});