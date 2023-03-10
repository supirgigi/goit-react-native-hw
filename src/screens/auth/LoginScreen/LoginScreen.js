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
import { useDispatch, useSelector } from 'react-redux';

import { authSignInUser } from '../../../redux/auth/authOperations';
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg';

import styles from './LoginScreen.styled';

const initialState = {
  email: '',
  password: '',
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState({ ...initialState });
  const [dimensions, setDimensions] = useState(
    Dimensions.get('window').width - 16 * 2
  );
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [focused, setFocused] = useState('');

  const { error } = useSelector(state => state.auth);

  const dispatch = useDispatch();

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
    dispatch(authSignInUser({ ...state }));
    setState({ ...initialState });
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    setFocused('');
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={require('../../../../assets/images/bg.jpg')}
        >
          <KeyboardAvoidingView
            style={{ width: '100%' }}
            behavior={Platform.OS === 'ios' && 'padding'}
          >
            <View style={styles.wrapper}>
              <Text style={styles.title}>Войти</Text>
              <View
                style={{
                  width: dimensions,
                  marginBottom: isShowKeyboard ? -110 : 144,
                }}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: focused === 'email' ? '#FF6C00' : '#E8E8E8',
                    backgroundColor:
                      focused === 'email' ? '#FFFFFF' : '#F6F6F6',
                  }}
                  value={state.email}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setFocused('email');
                  }}
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

                <View>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor:
                        focused === 'password' ? '#FF6C00' : '#E8E8E8',
                      backgroundColor:
                        focused === 'password' ? '#FFFFFF' : '#F6F6F6',
                    }}
                    value={state.password}
                    secureTextEntry={isPasswordHidden}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setFocused('password');
                    }}
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
                  <Text style={styles.btnLabel}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.link}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text style={styles.linkText}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
                </TouchableOpacity>
                {error && <ErrorMsg error={error} />}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
