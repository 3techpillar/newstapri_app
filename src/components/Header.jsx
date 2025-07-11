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
    backgroundColor: '#ffffff', // clean white or replace with '#f8f9fa' for soft grey
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 70,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    marginRight: 8,
  },
  menuContainer: {
    position: 'absolute',
    top: 75, // below header
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10,
    zIndex: 1001,
    width: 160,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 10,
    color: '#1a1a1a',
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
