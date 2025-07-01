import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Home from './src/screen/Home';
import Profile from './src/screen/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Quiz from './src/screen/Quiz';
import HomeIcon from 'react-native-vector-icons/Entypo';
import QuizIcon from 'react-native-vector-icons/MaterialIcons';
import ProfileIcon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import NewsDetail from './src/components/home/NewsDetail';
import Search from './src/screen/Search';
import SearchIcon from 'react-native-vector-icons/Feather';
import Signup from './src/screen/Signup';
import Signin from './src/screen/Signin';
import ActiveQuiz from './src/quiz/ActiveQuiz';
import QuizHistory from './src/ProfilePage/QuizHistory';
import Transactions from './src/ProfilePage/Transactions';
import Wallet from './src/ProfilePage/Wallet';
import About from './src/screen/About';
import Contact from './src/screen/Contact';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();




const MyTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveBackgroundColor: '#eeee', tabBarLabelStyle: { fontSize: 9, paddingVertical: 4 } }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => <HomeIcon name="home" size={30} color="black" />,
        }}
      />
      <Tab.Screen name='Search' component={Search} options={{
        headerShown: false,
        tabBarIcon: () => <SearchIcon name="search" size={30} color="black" />,
      }}
      />

      <Tab.Screen name="Quiz" component={Quiz}
        options={{
          headerShown: false,
          tabBarIcon: () => <QuizIcon name="quiz" size={30} color="black" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => <ProfileIcon name="user" size={30} color="black" />,
        }}
      />

    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
          <Stack.Screen name="NewsDetail" component={NewsDetail} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
          <Stack.Screen name="ActiveQuiz" component={ActiveQuiz} options={{ headerShown: false }} />
          <Stack.Screen name="QuizHistory" component={QuizHistory} options={{ headerShown: false }} />
          <Stack.Screen name="Transactions" component={Transactions} options={{ headerShown: false }} />
          <Stack.Screen name="About" component={About} options={{ headerShown: false }} />
          <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
          <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />



        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  )
}

export default App
