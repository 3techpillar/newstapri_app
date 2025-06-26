import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { baseUrl } from '../utils/apiCofig'
import useAuthStore from '../store/useAuthStore'
import axios from 'axios'
import GoogleLogin from '../components/googleAuth/GoogleLogin'
import Toast from 'react-native-toast-message'

const Signin = () => {
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuthStore.getState()

    const navigation = useNavigation();

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };
    const handleLogin = async () => {
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'All fields are required',

            });
            return;
        }
        else if (!validateEmail(email)) {
            Toast.show({
                type: 'error',
                text1: 'Invalid email format',

            });

            return;
        }
        try {
            const res = await axios.post(`${baseUrl}/v1/auth/signin`, {
                email: email,
                password: password
            })
            const data = res.data;
            const { token, ...user } = data;


            login(user, token)
            setemail('')
            setPassword('')
            navigation.reset({
                index: 0,
                routes: [{ name: 'MyTabs' }],
            });

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: "Invalid credential ,try again ",

            });
            setemail('')
            setPassword('')
        }

    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Enter your email.."
                    autoCorrect={false}
                    value={email}
                    onChangeText={setemail}
                    style={styles.input}
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder="Enter your password.."
                    autoCorrect={false}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    placeholderTextColor="#999"
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>New user?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.loginLink}>Sign up</Text>
                    </TouchableOpacity>
                </View>
                <GoogleLogin />
            </View>
        </SafeAreaView>
    )
}

export default Signin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9f1fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: '85%',
        backgroundColor: '#ffffff',
        padding: 30,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        gap: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3a3a3a',
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#f9f9f9',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#aad3f2',
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#2e86de',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        color: '#444',
        fontSize: 14,
    },
    loginLink: {
        color: '#2e86de',
        fontWeight: '600',
        fontSize: 14,
    },
});