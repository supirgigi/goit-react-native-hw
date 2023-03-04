import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { getHeaderTitle } from '@react-navigation/elements';

import RegistrationScreen from '../screens/auth/RegistrationScreen/RegistrationScreen';
import LoginScreen from '../screens/auth/LoginScreen/LoginScreen';
import PostsScreen from '../screens/mainScreen/PostsScreen/PostsScreen';
import CreatePostsScreen from '../screens/mainScreen/CreatePostsScreen/CreatePostsScreen';
import ProfileScreen from '../screens/mainScreen/ProfileScreen/ProfileScreen';

import Header from '../components/Header/Header';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          alignItems: 'center',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: 'rgba(33, 33, 33, 0.8)',
        tabBarActiveBackgroundColor: '#FF6C00',
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            maxWidth: 70,
            height: 40,
            borderRadius: 20,
            alignSelf: 'center',
            marginRight: 16,
          },
          tabBarIcon: ({ size, color }) => {
            return <Feather name="grid" size={size} color={color} />;
          },
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: 'none' },
          unmountOnBlur: true,
          headerTitle: 'Создать публикацию',
          tabBarItemStyle: {
            maxWidth: 70,
            height: 40,
            borderRadius: 20,
            alignSelf: 'center',
            marginRight: 16,
          },
          header: ({ route, options, navigation }) => {
            const back = {
              title: 'Публикации',
            };
            const title = getHeaderTitle(options, route.name);
            return <Header title={title} navigation={navigation} back={back} />;
          },
          tabBarIcon: ({ size, color }) => {
            return <Feather name="plus" size={size} color={color} />;
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            maxWidth: 70,
            height: 40,
            borderRadius: 20,
            alignSelf: 'center',
          },
          tabBarIcon: ({ size, color }) => {
            return <Feather name="user" size={size} color={color} />;
          },
        }}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;
