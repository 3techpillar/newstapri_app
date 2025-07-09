import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import axios from 'axios'
import { baseUrl } from '../utils/apiCofig'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import useAuthStore from '../store/useAuthStore'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'



const Quiz = () => {
  const [activeQuiz, setActiveQuiz] = useState({})
  const [HasPlayed, setHasPlayed] = useState(false)

  

  const user = useAuthStore((state) => state.user);
  const userId = user?._id;

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchActiveQuiz = async () => {
      try {
        const res = await axios.get(`${baseUrl}/v1/quizzes/active-quizzes`)
        const data = res.data;
        setActiveQuiz(data.quizzes);
      } catch (error) {
        console.log("Internal server error", error)
      }
    }

    fetchActiveQuiz()
  }, [])

  

  

  const fetchPlayedUser = async (quizId) => {
    console.log(userId,quizId)
    
    try {
      const response = await axios.get(`${baseUrl}/v1/quizzes/played-user/${userId}/${quizId}`);
      const data = response.data;
      const alreadyPlayed = data.message === "You already played this quiz";
      setHasPlayed(alreadyPlayed);

      if (alreadyPlayed) {
        Toast.show({
          type: 'error',
          text1: 'You have already played this quiz.',
          text2: 'Try the next one!'
        });
        return;
      }

      navigation.navigate("ActiveQuiz", { QuizAnswer: activeQuiz });

    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      if (status === 400 && message === "You already played this quiz") {
        setHasPlayed(true);
        Toast.show({
          type: 'error',
          text1: 'You have already played this quiz.',
          text2: 'Try the next one!'
        });
      } else {

        Toast.show({
          type: 'error',
          text1: ' Login to play',

        });
        navigation.navigate('Signup')
      }
    }
  };

  return (
    <>
      <Header />

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>PLAY AND EARN REWARDS</Text>

        <View style={styles.grid}>
          {activeQuiz && activeQuiz.name ? (
            <TouchableOpacity style={styles.card} onPress={()=>fetchPlayedUser(activeQuiz._id)}>
              <Image source={{ uri: activeQuiz.banner }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{activeQuiz.name}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>{activeQuiz.description}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.loading}>Loading Quiz...</Text>
          )}
        </View>
      </ScrollView>

    </>
  )
}

export default Quiz;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f6f6f6',
    flex: 1,
    marginTop: 40
  },
  heading: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: "red",
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '50%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: '#666',
  },
  loading: {
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
    marginTop: 20,
    color: '#888',
  },
})
