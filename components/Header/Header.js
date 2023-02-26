import { Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../App';
import styles from './Header.styled';

const Header = ({ title, back, navigation }) => {
  const { logOut } = useAuth();

  return (
    <View style={styles.header}>
      {back && (
        <TouchableOpacity
          style={styles.btnLeft}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="rgba(33, 33, 33, 0.8)" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {title === 'Публикации' && (
        <TouchableOpacity
          style={styles.btnRight}
          onPress={logOut}
          activeOpacity={0.7}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
