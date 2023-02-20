import { useState, useEffect } from 'react';
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
import { AntDesign } from '@expo/vector-icons';

import { useAuth } from '../../../App';
import styles from './RegistrationScreen.styled';

const initialState = {
  email: '',
  password: '',
  login: '',
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get('window').width - 16 * 2
  );
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { logIn } = useAuth();

  useEffect(() => {
    const dimensionsSubscription = Dimensions.addEventListener(
      'change',
      ({ window }) => {
        setDimensions(window.width - 16 * 2);
      }
    );

    return () => {
      dimensionsSubscription.remove();
    };
  }, []);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
    logIn();
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
          source={require('../../../assets/images/auth_bg.jpg')}
        >
          <KeyboardAvoidingView
            style={{ width: '100%' }}
            behavior={Platform.OS === 'ios' && 'padding'}
          >
            <View style={styles.wrapper}>
              <View style={styles.avatarWrapper}>
                <AntDesign
                  style={styles.avatarIcon}
                  name="pluscircleo"
                  size={25}
                  color="#FF6C00"
                />
              </View>
              <Text style={styles.title}>Регистрация</Text>
              <View
                style={{
                  ...styles.form,
                  width: dimensions,
                  marginBottom: isShowKeyboard ? -110 : 78,
                }}
              >
                <TextInput
                  style={styles.input}
                  value={state.login}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={value =>
                    setState(prevState => ({
                      ...prevState,
                      login: value,
                    }))
                  }
                  onSubmitEditing={keyboardHide}
                  placeholder="Логин"
                  placeholderTextColor="#BDBDBD"
                />

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
                  onSubmitEditing={keyboardHide}
                  placeholder="Адрес электронной почты"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="email-address"
                />

                <View style={{ position: 'relative' }}>
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
                    onSubmitEditing={keyboardHide}
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
                  <Text style={styles.btnLabel}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.link}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
