import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MenuIcon from 'react-native-vector-icons/Feather';
import { useState } from 'react';


const { width, height } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();
  const [open, setopen] = useState(false)

  const handleAbout = () => {
    navigation.navigate('About')
    setopen(false)
  }

  const handleContact = () => {
    navigation.navigate('Contact')
    setopen(false);
  }

  const handleClick = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MyTabs' }],
    });
  };

  return (
    <>
    <SafeAreaView style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity onPress={handleClick}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setopen(!open)}>
        <MenuIcon name="menu" size={25} color="black" />
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
}
export default Header;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    
    width: 80,
    height: 40,
    resizeMode: 'contain',
  },
  menuContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 9999,
    width: 100,
    marginTop: 10,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 6,
    elevation: 3,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 8,
  },
});
