import { useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';

import styles from './PostsScreen.styled';

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image
          style={styles.img}
          source={require('../../../assets/images/user.png')}
        />
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

export default PostsScreen;
