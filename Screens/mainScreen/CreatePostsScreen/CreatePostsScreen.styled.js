import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  cameraWrapper: {
    height: 240,
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
  },

  camera: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  photoWrapper: {
    width: '100%',
    height: '100%',
  },

  photo: {
    width: '100%',
    height: '100%',
  },

  cameraLabel: {
    marginLeft: 16,
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
    color: '#bdbdbd',
  },

  photoBtn: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },

  form: {
    marginHorizontal: 16,
  },

  titleInput: {
    height: 50,
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
  },

  locationInput: {
    height: 50,
    paddingLeft: 28,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
  },

  locationIcon: {
    position: 'absolute',
    top: 13,
    color: '#bdbdbd',
  },

  btn: {
    height: 51,
    marginTop: 43,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnLabel: {
    color: '#f0f8ff',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Roboto-Regular',
  },
});

export default styles;
