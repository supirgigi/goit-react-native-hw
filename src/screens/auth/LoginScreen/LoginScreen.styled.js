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
    paddingTop: 32,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    backgroundColor: '#ffffff',
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

  input: {
    height: 50,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    color: '#212121',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
  },

  passwordLabel: {
    position: 'absolute',
    right: 16,
    top: 16,
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
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
    fontFamily: 'Roboto-Regular',
  },

  link: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  linkText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
  },
});

export default styles;
