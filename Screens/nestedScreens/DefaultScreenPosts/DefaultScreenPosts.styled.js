import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  userPhoto: {
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

  postList: {
    marginHorizontal: 16,
    maxWidth: 360,
  },

  listItem: {
    width: '100%',
    marginBottom: 32,
  },

  img: {
    height: 240,
    width: '100%',
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },

  postTitle: {
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    textAlign: 'left',
  },

  btnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  mapIcon: {
    color: '#bdbdbd',
    transform: [{ rotate: '-90deg' }],
  },

  locationBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationIcon: {
    color: '#bdbdbd',
    marginRight: 4,
  },

  locationText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: '#212121',
    fontFamily: 'Roboto-Regular',
  },
});

export default styles;
