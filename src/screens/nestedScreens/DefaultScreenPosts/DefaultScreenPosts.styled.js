import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  userPhoto: {
    marginRight: 8,
    width: 60,
    height: 60,
    borderRadius: 16,
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
    fontFamily: 'Roboto-Regular',
  },

  postList: {
    marginHorizontal: 16,
    maxWidth: 360,
  },
});

export default styles;
