import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

import { storage, db } from '../../../firebase/config';

import styles from './CreatePostsScreen.styled';
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg';

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [error, setError] = useState(null);
  const { nickName, userId } = useSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  const uploadPhotoToServer = async () => {
    const res = await fetch(photo);
    const file = await res.blob();
    const uniqId = Date.now().toString();
    const imageRef = ref(storage, `postImages/${uniqId}`);
    await uploadBytes(imageRef, file);
    const processedPhoto = await getDownloadURL(imageRef);
    return processedPhoto;
  };

  const takePhoto = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      const { coords } = await Location.getCurrentPositionAsync();
      await MediaLibrary.createAssetAsync(uri);
      setCoords(coords);
      setPhoto(uri);
    }
  };

  const sendPhoto = () => {
    if (!photo || !title || !location) {
      setError('Пожалуйста, заполните все поля!');
      return;
    }

    uploadPostToServer();
    navigation.navigate('DefaultScreen');
  };

  const uploadPostToServer = async () => {
    const createdAt = Date.now();
    const photo = await uploadPhotoToServer();

    await addDoc(collection(db, `posts`), {
      photo,
      title,
      location,
      coords,
      nickName,
      userId,
      createdAt,
      likedBy: [],
    });
  };

  const resetPost = () => {
    setPhoto(null);
    setTitle('');
    setLocation('');
    setCoords(null);
    setError(null);
  };

  const changeType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Нет доступа к камере</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' && 'padding'}
        >
          <View style={styles.cameraWrapper}>
            <Camera style={styles.camera} ref={setCamera} type={type}>
              <TouchableOpacity
                style={styles.photoBtn}
                onPress={takePhoto}
                onLongPress={changeType}
              >
                <FontAwesome5 name="camera" size={24} color="white" />
              </TouchableOpacity>
            </Camera>
            {photo && <Image source={{ uri: photo }} style={styles.photo} />}
          </View>
          <Text style={styles.cameraLabel}>
            {photo ? 'Редактировать фото' : 'Загрузите фото'}
          </Text>

          <View style={styles.form}>
            <TextInput
              style={styles.titleInput}
              onSubmitEditing={() => Keyboard.dismiss()}
              placeholder="Название..."
              placeholderTextColor="#BDBDBD"
              onChangeText={value => setTitle(value)}
              value={title}
            />
            <View style={{ position: 'relative' }}>
              <TextInput
                style={styles.locationInput}
                onSubmitEditing={() => Keyboard.dismiss()}
                placeholder="Местность..."
                placeholderTextColor="#BDBDBD"
                onChangeText={value => setLocation(value)}
                value={location}
              />
              <Feather
                style={styles.locationIcon}
                name="map-pin"
                size={24}
                color="black"
              />
            </View>

            <TouchableOpacity
              style={{
                ...styles.btn,
                backgroundColor: photo ? '#FF6C00' : '#F6F6F6',
              }}
              activeOpacity={0.9}
              onPress={sendPhoto}
            >
              <Text
                style={{
                  ...styles.btnLabel,
                  color: photo ? '#FFFFFF' : '#BDBDBD',
                }}
              >
                Опубликовать
              </Text>
            </TouchableOpacity>
            {error && <ErrorMsg error={error} />}
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity
              onPress={resetPost}
              style={{
                ...styles.trashBtn,
                backgroundColor: photo ? '#FF6C00' : '#F6F6F6',
              }}
            >
              <Feather
                name="trash"
                size={24}
                color={photo ? '#ffffff' : '#bdbdbd'}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
