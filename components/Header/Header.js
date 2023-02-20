import { Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../App';
import styles from './Header.styled';

const Header = ({ title }) => {
  const { logOut } = useAuth();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {title === 'Публикации' && (
        <TouchableOpacity
          style={styles.btn}
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
