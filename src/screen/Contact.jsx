import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import ContactUsForm from './ContactUs';



const Contact = () => {

  const navigation =useNavigation();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>

      <View style={styles.card}>

        <Text style={styles.subheading}>News and Updates</Text>
        <Text style={styles.paragraph}>
          Welcome to <Text onPress ={()=> navigation.navigate ("Home")}> <Text style={styles.bold}>Newstapri</Text> </Text>, We are committed to keeping our users informed with the latest news and updates.
          Our platform will provide regular announcements about upcoming events and any important current news. 
          This ensures that you are always aware of the latest developments and can stay engaged with our community. 
          We strive to deliver accurate and timely information to enhance your overall experience.
        </Text>
      </View>
      <ContactUsForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2a38', 
    marginBottom: 24,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2e66f2',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontFamily:'serif'
  },
  bold: {
    fontWeight: 'bold',
    color: '#FF9149',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});

export default Contact;
