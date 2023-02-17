import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },

  wrapper: {
    width: '100%',
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  avatarWrapper: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: -60,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },

  avatarIcon: {
    position: 'absolute',
    bottom: 14,
    right: -12,
  },

  title: {
    marginBottom: 32,
    textAlign: 'center',
    color: '#212121',
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.16,
  },

  form: {},

  input: {
    height: 50,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    color: '#212121',
    backgroundColor: '#F6F6F6',
    fontSize: 16,
    lineHeight: 19,
  },

  passwordLabel: {
    position: 'absolute',
    right: 16,
    top: 16,
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },

  btn: {
    height: 51,
    marginTop: 43,
    marginBottom: 16,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6C00',
  },

  btnLabel: {
    color: '#f0f8ff',
    fontSize: 16,
    lineHeight: 19,
  },

  link: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
});

export default styles;
