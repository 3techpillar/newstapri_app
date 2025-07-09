import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/apiCofig';
import useAuthStore from '../store/useAuthStore';

const QuizHistory = () => {
  const user = useAuthStore((state) => state.user);
  const [quizHistory, setQuizHistory] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); 

  const fetchQuizHistory = async () => {
    try {
      const res = await axios.get(`${baseUrl}/v1/quizzes/quiz-history/${user._id}`);
      const data = res.data;
      setQuizHistory(data.history || []);
    } catch (error) {
      console.log('internal server error', error.message);
    }
  };

  useEffect(() => {
    fetchQuizHistory();
  }, [user._id]);

  return (
   
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Quiz History</Text>
      {quizHistory.length === 0 ? (
        <Text style={styles.emptyText}>No quiz history found.</Text>
      ) : (
        quizHistory.map((quiz, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.quizName}>{quiz.quizName}</Text>
            <Text style={styles.detail}>✅ Correct: {quiz.correctAnswers}</Text>
            <Text style={styles.detail}>❌ Incorrect: {quiz.incorrectAnswers}</Text>
            <Text style={styles.detail}>📋 Total Questions: {quiz.totalQuestions}</Text>
            <Text style={styles.score}>🏆 Score: {quiz.score}</Text>

            <TouchableOpacity
              onPress={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
            >
              <Text style={styles.viewMore}>
                {expandedIndex === index ? 'Hide Details ▲' : 'View More ▼'}
              </Text>
            </TouchableOpacity>

            {expandedIndex === index && quiz.questions?.length > 0 && (
              <View style={styles.detailBox}>
                {quiz.questions.map((q, qIndex) => (
                  <View key={qIndex} style={styles.questionBox}>
                    <Text style={styles.questionText}>{qIndex + 1}. {q.questionText}</Text>
                    <Text style={styles.answer}>Your Answer: {q.userAnswer}</Text>
                    <Text style={[styles.status, { color: q.isCorrect ? 'green' : 'red' }]}>
                      {q.isCorrect ? '✔️ Correct' : '❌ Incorrect'}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>

  );
};

export default QuizHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop:35,
    backgroundColor: '#f9fafb',
    
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 13,
    color: '#111827',
    textAlign: 'center',
    marginTop:12,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quizName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  score: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  viewMore: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#3b82f6',
    
  },
  detailBox: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },
  questionBox: {
    marginBottom: 12,
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 8,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  answer: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
  },
});
