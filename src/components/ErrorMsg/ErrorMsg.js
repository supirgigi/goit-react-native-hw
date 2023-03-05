import { Text } from 'react-native';

import styles from './ErrorMsg.styled';

const ErrorMsg = ({ error }) => {
  return <Text style={styles.text}>{error}</Text>;
};

export default ErrorMsg;
