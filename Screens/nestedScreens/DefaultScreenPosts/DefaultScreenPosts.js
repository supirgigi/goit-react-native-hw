import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './DefaultScreenPosts.styled';

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params.post]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <Image
          style={styles.userPhoto}
          source={require('../../../assets/images/user.png')}
        />
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        style={styles.postList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={{ uri: item.photo }} style={styles.img} />
            <Text style={styles.postTitle}>{item.title}</Text>
            <View style={styles.btnWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
                <Feather
                  style={styles.mapIcon}
                  name="message-circle"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.locationBtn}
                onPress={() =>
                  navigation.navigate('Map', {
                    location: item.coords,
                    title: item.title,
                  })
                }
              >
                <Feather
                  style={styles.locationIcon}
                  name="map-pin"
                  size={24}
                  color="black"
                />
                <Text style={styles.locationText}>{item.location}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default DefaultScreenPosts;
