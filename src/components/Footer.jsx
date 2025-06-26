import { StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import InstaIcon from 'react-native-vector-icons/FontAwesome';
import FacebookIcon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <View style={styles.textContainer}>
          <Text style={styles.text}>ABOUT</Text>
          <Text style={styles.text}>LEGAL</Text>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() =>Linking.openURL('https://www.instagram.com/news_tapri_/')}>
            <InstaIcon name="instagram" size={30} color="#E1306C" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/people/Newstapri/61561631152579/')}>
            <FacebookIcon name="facebook" size={30} color="#4267B2" style={styles.iconSpacing} />
          </TouchableOpacity>




        </View>
      </View>
    </SafeAreaView>
  );
};

export default Footer;
const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: '#F8FAFC',
    position: 'relative',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  logo: {
    position: 'absolute',
    top: 10,
    left: 20,
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    gap: 24,
  },
  text: {
    fontSize: 12,
    color: '#555',
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconSpacing: {
    marginLeft: 16,
  },
});
