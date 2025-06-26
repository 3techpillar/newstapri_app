import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import Header from '../components/Header'
import Posts from '../components/home/Posts'
import Trending from '../components/home/Trending'
import { SafeAreaView } from 'react-native-safe-area-context'


const Home = () => {



    return (
        <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView >
        <View>
          <Trending />
        </View>
        <Posts />
       
      </ScrollView>
    </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
