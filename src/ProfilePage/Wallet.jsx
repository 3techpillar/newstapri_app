import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import { baseUrl } from '../utils/apiCofig';
import axios from 'axios';
import { Modal } from 'react-native';
import Toast from 'react-native-toast-message';


const Wallet = () => {
    const user = useAuthStore((state) => state.user);
    const refreshUser = useAuthStore((state) => state.refreshUser);

    const [inputBar, setinputBar] = useState(false);
    const [point, setPoint] = useState('');
    const [upiId, setupiId] = useState('');
    const [mobileNumber, setmobileNumber] = useState('')
    const [Amount, setAmount] = useState('')
    const [showtransfer, setshowtransfer] = useState(false)

    const handleReedem = async () => {
        if (point < 200) {
            Toast.show({
                type: 'error',
                text1: 'Minimum required points is 200'
            })
            return;
        }
        try {
            const res = await axios.post(`${baseUrl}/v1/transaction/redeem`, {
                userId: user._id,
                points: point
            })
            Toast.show({
                type: 'success',
                text1: res.data.message,

            });
            setinputBar(false);
            setPoint('')

            await refreshUser()

        } catch (error) {
            console.log("internal server error,Try again", error)


        }
    }

    const handleAmountRedeem = async () => {

        if (Amount < 10) {
            Toast.show({
                type: 'error',
                text1: 'Amount must be greater than 10',

            });
            return;

        }
        if (!Amount || !upiId || !mobileNumber) {
            Toast.show({
                type: 'error',
                text1: 'All fields are required',

            });
            return;

        }
        try {
            const res = await axios.post(`${baseUrl}/v1/transaction/requestAmountRedeem`,
                {
                    userId: user._id,
                    amount: Amount,
                    bankAccount: upiId,
                }
            )

            if(res.status === 200){
                setshowtransfer(false)
                setAmount('')
                setupiId('')
                setmobileNumber('')
            }

            await refreshUser()

        } catch (error) {
             console.log("internal server error,Try again", error);

        }

    }

    const handleReedemButton = () => {
        setinputBar(!inputBar)


    }
    const handleTransferButton = () => {
        setshowtransfer(!showtransfer)
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Wallet</Text>

            <View style={styles.cardContainer}>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>My Balance</Text>
                    <Text style={styles.balance}>₹{user.totalAmount}</Text>
                    <TouchableOpacity style={styles.button} onPress={handleTransferButton}>
                        <Text style={styles.buttonText}>Transfer Money</Text>
                    </TouchableOpacity>
                    <Text style={styles.caption}>minimum transfer money ₹10</Text>
                </View>


                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Earned Points</Text>
                    <Text style={styles.points}>🔥 {user?.points || 0}</Text>
                    <TouchableOpacity style={styles.button} onPress={handleReedemButton}>
                        <Text style={styles.buttonText}>Redeem</Text>
                    </TouchableOpacity>
                    <Text style={styles.caption}>minimum redeem points 200</Text>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={inputBar}
                onRequestClose={() => setinputBar(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Enter points to redeem</Text>
                        <TextInput
                            placeholder="Enter points"
                             placeholderTextColor="gray" 
                            keyboardType="numeric"
                            autoCorrect={false}
                            style={styles.input}
                            value={point}
                            onChangeText={setPoint}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={handleReedem}>
                            <Text style={styles.modalButtonText}>Confirm Redeem</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setinputBar(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>



            <Modal
                animationType="slide"
                transparent={true}
                visible={showtransfer}
                onRequestClose={() => setshowtransfer(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>redeem Amount</Text>
                        <TextInput
                            placeholder="Enter amount (minimum amount 10)"
                             placeholderTextColor="red" 
                            keyboardType="numeric"
                            autoCorrect={false}
                            style={styles.input}
                            value={Amount}
                            onChangeText={setAmount}
                        />

                        <TextInput
                            placeholder="Enter mobile number"
                             placeholderTextColor="gray" 
                            keyboardType="numeric"
                            autoCorrect={false}
                            style={styles.input}
                            value={mobileNumber}
                            onChangeText={setmobileNumber}
                        />
                        <TextInput
                            placeholder="Enter your upi Id"
                             placeholderTextColor="gray" 
                            autoCorrect={false}
                            style={styles.input}
                            value={upiId}
                            onChangeText={setupiId}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={handleAmountRedeem} >
                            <Text style={styles.modalButtonText}>Transfer Money</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setshowtransfer(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>

    );
};

export default Wallet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f6fc',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'wrap',
    },
    card: {
        backgroundColor: '#fff',
        width: '48%',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
        color: '#2c3e50',
    },
    balance: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
    },
    points: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#1e3799',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    caption: {
        fontSize: 13,
        color: '#7f8c8d',
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
    },
    modalButton: {
        backgroundColor: '#1e3799',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 10,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cancelText: {
        color: '#e74c3c',
        marginTop: 6,
    },
});
