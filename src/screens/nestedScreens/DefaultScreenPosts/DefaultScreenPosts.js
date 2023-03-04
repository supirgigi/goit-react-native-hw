import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import PostItem from '../../../components/PostItem/PostItem';
import { db } from '../../../firebase/config';

import styles from './DefaultScreenPosts.styled';

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const { avatar, nickName, email, userId } = useSelector(state => state.auth);

  const getAllPosts = async () => {
    const commentsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc')
    );

    onSnapshot(commentsQuery, data => {
      setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image style={styles.userPhoto} source={{ uri: avatar }} />
        <View>
          <Text style={styles.userName}>{nickName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        style={styles.postList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PostItem item={item} navigation={navigation} userId={userId} />
        )}
      />
    </View>
  );
};

export default DefaultScreenPosts;
