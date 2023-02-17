import { useState, useEffect } from 'react';

import styles from './LoginScreen.styled';

import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

const initialState = {
  email: '',
  password: '',
};

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get('window').width - 16 * 2
  );
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  useEffect(() => {
    const dimensionsSubscription = Dimensions.addEventListener(
      'change',
      ({ window }) => {
        setDimensions(window.width - 16 * 2);
      }
    );

    return () => {
      dimensionsSubscription?.remove();
    };
  }, []);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={require('../../assets/images/auth_bg.jpg')}
        >
          <KeyboardAvoidingView
            style={{ width: '100%' }}
            behavior={Platform.OS === 'ios' && 'padding'}
          >
            <View style={styles.wrapper}>
              <Text style={styles.title}>Войти</Text>
              <View
                style={{
                  ...styles.form,
                  width: dimensions,
                  marginBottom: isShowKeyboard ? -110 : 144,
                }}
              >
                <TextInput
                  style={styles.input}
                  value={state.email}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={value =>
                    setState(prevState => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                  placeholder="Адрес электронной почты"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="email-address"
                />

                <View>
                  <TextInput
                    style={styles.input}
                    value={state.password}
                    secureTextEntry={isPasswordHidden}
                    onFocus={() => setIsShowKeyboard(true)}
                    onChangeText={value =>
                      setState(prevState => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                  />

                  <Text
                    onPress={() => setIsPasswordHidden(prevState => !prevState)}
                    style={styles.passwordLabel}
                  >
                    {isPasswordHidden ? 'Показать' : 'Скрыть'}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.9}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnLabel}>Войти</Text>
                </TouchableOpacity>
                <Text style={styles.link}>
                  Нет аккаунта? Зарегистрироваться
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
