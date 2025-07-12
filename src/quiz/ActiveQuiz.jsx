import { Alert, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import useAuthStore from '../store/useAuthStore'
import { baseUrl } from '../utils/apiCofig'
import { useNavigation } from '@react-navigation/native'






const ActiveQuiz = ({ route }) => {

    const { QuizAnswer } = route.params
    const user = useAuthStore((state) => state.user);
    const navigation = useNavigation();
    const { login } = useAuthStore.getState()

    const [selectedOptions, setSelectedOptions] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [earnedPoints, setEarnedPoints] = useState(0);
    const [isTimeStart, setIsTimeStart] = useState(true)
    const [timerDuration, setTimerDuration] = useState(20)

    const Timer = ({ totalDuration, start, handleFinish }) => {
  const [remainingTime, setRemainingTime] = useState(totalDuration);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (start && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            
          
            setTimeout(() => {
              handleFinish?.();
            }, 0);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [start]);

  return (
    <Text style={{ textAlign: 'center', fontSize: 18 }}>
      {remainingTime}s
    </Text>
  );
};



    const handleOptionSelect = (questionId, selectedOption) => {
        setSelectedOptions(prev => ({
            ...prev,
            [questionId]: selectedOption
        }));
    };

    const handleQuizSubmit = async () => {
      setIsTimeStart(false)

        const transformedAnswers = Object.entries(selectedOptions).map(
            ([questionId, selectedOption]) => ({
                questionId,
                selectedOption,
            })
        );


        try {
            const res = await axios.post(`${baseUrl}/v1/user-answers/bulk`, {
                userId: user._id,
                quizId: QuizAnswer._id,
                answers: transformedAnswers
            }
            )

            setEarnedPoints(res.data.pointsEarned);
            setModalVisible(true);
            login()

        } catch (error) {
            console.log("Submit error:", error.response?.data || error.message);
            Alert.alert("Submission Failed", "Please try again later.");
        }

    }

    const handleAfterSubmit = () => {
        setModalVisible(false)
        navigation.navigate("MyTabs", {
            screen: "Home",
            initial: true
        });
    }






    return (

        <ScrollView>
            <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 20, marginBottom: 10 }}>
                Best of Luck
            </Text>
            <Timer
                totalDuration={timerDuration}
                start={isTimeStart}
                handleFinish={handleQuizSubmit}
            />


            {QuizAnswer.questions?.map((question, qIndex) => (
                <View key={question._id} style={styles.questionBox}>
                    <Text style={styles.questionText}>{qIndex + 1}. {question.questionText}</Text>
                    {question.options.map((option, oIndex) => (
                        <TouchableOpacity
                            key={oIndex}
                            style={[
                                styles.optionButton,
                                selectedOptions[question._id] === option && styles.selectedOption
                            ]}
                            onPress={() => handleOptionSelect(question._id, option)}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
            <TouchableOpacity onPress={handleQuizSubmit} style={{ backgroundColor: '#4CAF50', padding: 14, margin: 20, borderRadius: 10 }}>
                <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
                    Submit Quiz
                </Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
                            आपने अर्जित किए {earnedPoints} अंक 🎉
                        </Text>

                        <TouchableOpacity
                            onPress={handleAfterSubmit}
                            style={{
                                backgroundColor: '#4CAF50',
                                paddingVertical: 12,
                                paddingHorizontal: 24,
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>ठीक है</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


        </ScrollView>

    )
}

export default ActiveQuiz
const styles = StyleSheet.create({
    questionBox: {
        margin: 16,
        marginBottom: 24,
        backgroundColor: '#FFFDF6',
        padding: 16,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    questionText: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
        color: '#333',
    },
    optionButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    selectedOption: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
})
