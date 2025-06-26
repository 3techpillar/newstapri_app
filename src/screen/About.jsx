import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>About Us</Text>

      <View style={styles.card}>

        <Text style={styles.subheading}>Welcome to Newstapri, a Leading Voice in Indian Media</Text>
        <Text style={styles.paragraph}>
          Welcome to <Text style={styles.bold}>Newstapri</Text>, where excellence and credibility define our approach to journalism.
          As a prominent name in Indian media, we are dedicated to setting the highest standards in the industry. Our extensive media
          coverage spans a wide array of topics, ensuring that we address every facet of contemporary life with precision and depth.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subheading}>Comprehensive Coverage Across Multiple Platforms</Text>
        <Text style={styles.paragraph}>
          At Newstapri, we operate dedicated 24/7 websites, each designed to provide comprehensive coverage in politics, economy, sports,
          entertainment, and more. Our websites are not just news sources; they are dynamic platforms that cater to the diverse interests
          of our audience. Whether it’s the latest political developments, in-depth economic analyses, live sports updates, or engaging
          entertainment stories, Newstapri delivers timely and relevant content to keep you informed and engaged.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subheading}>Innovation at the Heart of Our Mission</Text>
        <Text style={styles.paragraph}>
          Innovation drives our mission at Newstapri. We are committed to evolving and adapting to meet the ever-changing needs of modern
          audiences. By harnessing cutting-edge technologies and interactive platforms, we strive to enhance user engagement and satisfaction.
          Our innovative features, such as the Play Quiz, Earn, and Read to Earn programs, are designed to enrich the user experience.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subheading}>Commitment to Reliable and Independent Journalism</Text>
        <Text style={styles.paragraph}>
          In a rapidly evolving media landscape, Newstapri stands firm in its commitment to delivering reliable and independent journalism.
          We understand the importance of quality and integrity in the news we provide. Our editorial team is dedicated to upholding the
          highest standards of accuracy and fairness.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subheading}>A Beacon of Quality and Integrity</Text>
        <Text style={styles.paragraph}>
          As we navigate the complexities of the media world, Newstapri remains a beacon of quality and integrity. We take pride in our role
          as a trusted source of news and information and are dedicated to maintaining the highest standards of journalism.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5ea',
    padding: 16,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#813524', 
    marginBottom: 24,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0e0807',
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
    color: '#1565C0',
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

export default About;
