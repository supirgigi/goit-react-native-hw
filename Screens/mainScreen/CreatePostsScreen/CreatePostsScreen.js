import { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';

import styles from './CreatePostsScreen.styled';

const initialState = {
  title: '',
  location: '',
  photo: '',
};

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [state, setState] = useState({ ...initialState });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setState(prevState => ({
        ...prevState,
        photo: uri,
      }));
    }
  };

  const sendPhoto = async () => {
    const { coords } = await Location.getCurrentPositionAsync();
    navigation.navigate('DefaultScreen', { post: { ...state, coords } });
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
          <View style={styles.cameraWrapper}>
            <Camera
              style={styles.camera}
              ref={setCamera}
              type={CameraType.back}
            >
              {state.photo && (
                <View style={styles.photoWrapper}>
                  <Image source={{ uri: state.photo }} style={styles.photo} />
                </View>
              )}
              <TouchableOpacity style={styles.photoBtn} onPress={takePhoto}>
                <FontAwesome5 name="camera" size={24} color="white" />
              </TouchableOpacity>
            </Camera>
          </View>
          <Text style={styles.cameraLabel}>
            {state.photo ? 'Редактировать фото' : 'Загрузите фото'}
          </Text>

          <View style={styles.form}>
            <TextInput
              style={styles.titleInput}
              onSubmitEditing={() => Keyboard.dismiss()}
              onChangeText={value =>
                setState(prevState => ({
                  ...prevState,
                  title: value,
                }))
              }
              value={state.title}
              placeholder="Название..."
              placeholderTextColor="#BDBDBD"
            />
            <View style={{ position: 'relative' }}>
              <TextInput
                style={styles.locationInput}
                onSubmitEditing={() => Keyboard.dismiss()}
                onChangeText={value =>
                  setState(prevState => ({
                    ...prevState,
                    location: value,
                  }))
                }
                value={state.location}
                placeholder="Местность..."
                placeholderTextColor="#BDBDBD"
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
                backgroundColor: state.photo ? '#FF6C00' : '#F6F6F6',
              }}
              activeOpacity={0.9}
              onPress={sendPhoto}
            >
              <Text
                style={{
                  ...styles.btnLabel,
                  color: state.photo ? '#FFFFFF' : '#BDBDBD',
                }}
              >
                Опубликовать
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
