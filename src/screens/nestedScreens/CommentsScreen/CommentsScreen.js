import { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

import { formatPostDate } from '../../../utils/formatPostDate';
import { db } from '../../../firebase/config';

import styles from './CommentsScreen.styled';

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [focused, setFocused] = useState(false);
  const { nickName, avatar, userId } = useSelector(state => state.auth);
  const { postId, photo } = route.params;

  useEffect(() => {
    getAllComments();
  }, []);

  const createComment = async () => {
    const date = formatPostDate(new Date());

    await addDoc(collection(db, `posts/${postId}/comments`), {
      comment,
      nickName,
      date,
      avatar,
      userId,
    });

    setComment('');
  };

  const getAllComments = async () => {
    const commentsQuery = query(
      collection(db, `posts/${postId}/comments`),
      orderBy('date')
    );
    onSnapshot(commentsQuery, data =>
      setAllComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    );
  };

  const keyboardHide = () => {
    setFocused(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.photoWrapper}>
          <Image source={{ uri: photo }} style={styles.photo} />
        </View>
        <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
          <FlatList
            style={styles.messageList}
            data={allComments}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  ...styles.messageContainer,
                  flexDirection: item.userId === userId ? 'row-reverse' : 'row',
                }}
              >
                <Image
                  style={{
                    ...styles.messageAvatar,
                    marginLeft: item.userId === userId ? 16 : 0,
                    marginRight: item.userId !== userId ? 16 : 0,
                  }}
                  source={{ uri: item.avatar }}
                />
                <View style={styles.message}>
                  <Text style={styles.messageText}>{item.comment}</Text>
                  <Text style={styles.messageDate}>{item.date}</Text>
                </View>
              </View>
            )}
          />
        </SafeAreaView>
        <View style={styles.form}>
          <TextInput
            style={{
              ...styles.input,
              borderColor: focused ? '#FF6C00' : '#E8E8E8',
              backgroundColor: focused ? '#FFFFFF' : '#F6F6F6',
            }}
            onFocus={() => {
              setFocused(true);
            }}
            onSubmitEditing={keyboardHide}
            placeholder="Комментировать"
            placeholderTextColor="#BDBDBD"
            onChangeText={value => setComment(value)}
            value={comment}
          />
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.9}
            onPress={createComment}
          >
            <AntDesign name="arrowup" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;
