import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';


const Contact = () => {

    return (
            <ScrollView style={styles.container}>
                <Text style={styles.heading}>Privacy Policy</Text>

                <View style={styles.card}>

                    <Text style={styles.subheading}>News and Updates</Text>
                    <Text style={styles.paragraph}>
                        We are committed ,  to keeping our users informed with the latest news and updates. Our platform will provide regular announcements about upcoming events and any important current news. This ensures that you are always aware of the latest developments and can stay engaged with our community. We strive to deliver accurate and timely information to enhance your overall experience.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.subheading}>Data Usage</Text>
                    <Text style={styles.paragraph}>
                        Your privacy is of utmost importance to us. We strictly adhere to a policy of not sharing your data with any third parties.
                        All the information you provide is used exclusively to improve your interaction with our platform. We do not sell, trade, or otherwise transfer your personal information to outside parties.
                        Your data is secure with us, and we utilize advanced security measures to protect it from unauthorized access.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.subheading}>Account Deletion</Text>
                    <Text style={styles.paragraph}>
                        We respect your right to control your personal information. If you wish to delete your account, you can submit a request at any time. Upon receiving your request, we will ensure that all your data is permanently removed from our systems within 30 days. This process is designed to provide you with peace of mind, knowing that your information is no longer stored or accessible on our platform.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.subheading}>Quizzes and Rewards</Text>
                    <Text style={styles.paragraph}>
                        Our platform offers engaging quizzes that allow you to earn points. These points can be converted into cash once certain conditions are met, such as reaching a minimum points threshold or balance requirement. Participation in these quizzes is completely free, and you do not need to invest any money to earn points. This feature is designed to reward our users for their knowledge and engagement, providing an opportunity to earn rewards without any financial commitment.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.subheading}>Contact Us</Text>
                    <Text style={styles.paragraph}>
                        If you have any questions or concerns about our privacy policy or how your data is handled, please do not hesitate to contact our support team. We are here to assist you and ensure that your experience with our platform is positive and secure. Your feedback is valuable to us, and we are committed to addressing any issues promptly and effectively.
                    </Text>
                </View>
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
        fontFamily: 'serif'
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
