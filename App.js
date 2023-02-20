import { createContext, useState, useContext, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import useRoute from './router';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  const routing = useRoute(isLoggedIn);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      <NavigationContainer onReady={onLayoutRootView}>
        {routing}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
