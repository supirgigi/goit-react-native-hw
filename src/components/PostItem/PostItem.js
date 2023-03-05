import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  arrayRemove,
  arrayUnion,
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from 'firebase/firestore';

import { db } from '../../firebase/config';

import styles from './PostItem.styled';

const PostItem = ({ item, navigation, userId }) => {
  const [commentCount, setCommentCount] = useState([]);

  const { photo, title, id, coords, location, likedBy } = item;

  useEffect(() => {
    getCommentCount();
  }, []);

  const getCommentCount = async () => {
    onSnapshot(collection(db, `posts/${id}/comments`), data => {
      setCommentCount(data.size);
    });
  };

  const handleLike = async () => {
    const ref = doc(db, `posts/${id}`);
    if (likedBy.includes(userId)) {
      await updateDoc(ref, {
        likedBy: arrayRemove(userId),
      });
    } else {
      await updateDoc(ref, {
        likedBy: arrayUnion(userId),
      });
    }
  };

  return (
    <View style={styles.listItem}>
      <Image source={{ uri: photo }} style={styles.img} />
      <Text style={styles.postTitle}>{title}</Text>
      <View style={styles.postInfo}>
        <View style={styles.commentWrapper}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Comments', {
                postId: id,
                photo: photo,
              })
            }
          >
            <Feather
              style={styles.commentIcon}
              name="message-circle"
              size={24}
              color={commentCount > 0 ? '#FF6C00' : '#BDBDBD'}
            />
          </TouchableOpacity>
          <Text style={styles.socialsText}>{commentCount}</Text>
        </View>
        <View style={styles.likeWrapper}>
          <TouchableOpacity onPress={handleLike}>
            <Feather
              style={styles.likeIcon}
              name="thumbs-up"
              size={24}
              color={likedBy.includes(userId) ? '#FF6C00' : '#BDBDBD'}
            />
          </TouchableOpacity>
          <Text style={styles.socialsText}>{likedBy.length}</Text>
        </View>
        <View style={styles.locationWrapper}>
          <TouchableOpacity
            style={styles.locationBtn}
            onPress={() =>
              navigation.navigate('Map', {
                location: coords,
                title: title,
              })
            }
          >
            <Feather
              style={styles.locationIcon}
              name="map-pin"
              size={24}
              color="#BDBDBD"
            />
            <Text style={styles.locationText}>{location}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostItem;
