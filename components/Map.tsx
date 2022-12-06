import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInfo } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '@env';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) {
      mapRef?.current?.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }
  }, [origin, destination]);

  useEffect(() => {
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin?.description}&destinations=${destination?.description}&key=${GOOGLE_MAPS_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInfo(data.rows[0].elements[0]));
        });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin?.location?.lat || 37.78825,
        longitude: origin?.location?.lng || -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {/* {origin && destination && ( */}
      <MapViewDirections
        origin={origin?.description || '35.78825'}
        destination={destination?.description || '-120.4324'}
        apikey={GOOGLE_MAPS_API_KEY}
        strokeWidth={3}
        strokeColor="black"
      />
      {/* )} */}
      {/* {origin?.location && ( */}
      <Marker
        coordinate={{
          latitude: origin?.location?.lat || 37.78825,
          longitude: origin?.location?.lng || -122.4324,
        }}
        title="Origin"
        description={origin?.description}
        identifier="origin"
      />
      {/* )} */}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
