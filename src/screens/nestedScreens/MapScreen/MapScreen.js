import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import styles from './MapScreen.styled';

const MapScreen = ({ route }) => {
  const { longitude, latitude } = route.params.location;
  const { title } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker title={title} coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};

export default MapScreen;
