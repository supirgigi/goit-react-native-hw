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
import * as ImagePicker from 'expo-image-picker';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

import { authSignUpUser } from '../../../redux/auth/authOperations';
import { storage } from '../../../firebase/config';
import UserAvatar from '../../../components/UserAvatar/UserAvatar';
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg';

import styles from './RegistrationScreen.styled';

const initialState = {
  email: '',
  password: '',
  nickname: '',
  avatar: null,
};

export default function RegistrationScreen({ navigation }) {
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
      dimensionsSubscription.remove();
    };
  }, []);

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setState(prevState => ({
        ...prevState,
        avatar: result.assets[0].uri,
      }));
    }
  };

  const removeAvatar = () => {
    setState(prevState => ({
      ...prevState,
      avatar: null,
    }));
  };

  const uploadPhotoToServer = async () => {
    let imageRef;

    if (state.avatar) {
      const res = await fetch(state.avatar);
      const file = await res.blob();
      const uniqId = Date.now().toString();
      imageRef = ref(storage, `userAvatars/${uniqId}`);
      await uploadBytes(imageRef, file);
    } else {
      imageRef = ref(storage, `userAvatars/avatar_placeholder.jpg`);
    }

    const processedPhoto = await getDownloadURL(imageRef);
    return processedPhoto;
  };

  const handleSubmit = async () => {
    const photo = await uploadPhotoToServer();
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser({ ...state, avatar: photo }));
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
              <UserAvatar
                avatar={state.avatar}
                onPick={pickAvatar}
                onRemove={removeAvatar}
              />
              <Text style={styles.title}>Регистрация</Text>
              <View
                style={{
                  width: dimensions,
                  marginBottom: isShowKeyboard ? -110 : 78,
                }}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: focused === 'nickname' ? '#FF6C00' : '#E8E8E8',
                    backgroundColor:
                      focused === 'nickname' ? '#FFFFFF' : '#F6F6F6',
                  }}
                  value={state.nickname}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setFocused('nickname');
                  }}
                  onChangeText={value =>
                    setState(prevState => ({
                      ...prevState,
                      nickname: value,
                    }))
                  }
                  onSubmitEditing={keyboardHide}
                  placeholder="Логин"
                  placeholderTextColor="#BDBDBD"
                />

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

                <View style={{ position: 'relative' }}>
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
                  <Text style={styles.btnLabel}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.link}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
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
