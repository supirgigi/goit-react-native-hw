import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  img: {
    marginRight: 8,
  },

  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginLeft: 16,
    marginTop: 32,
    marginBottom: 32,
  },

  userName: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '700',
    color: '#212121',
    fontFamily: 'Roboto-Bold',
  },

  userEmail: {
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
  },
});

export default styles;
