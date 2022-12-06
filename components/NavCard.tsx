import { GOOGLE_MAPS_API_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { setDestination } from '../slices/navSlice';
import NavFavorities from './NavFavorities';

const NavCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good morning, Thu Hoai</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to ?"
            nearbyPlacesAPI="GooglePlacesSearch"
            fetchDetails={true}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry?.location,
                  description: data.description,
                })
              );
              navigation.navigate('RideOptionsCard' as never);
            }}
            styles={{
              container: {
                backgroundColor: 'white',
                paddingTop: 20,
                flex: 0,
              },
              textInput: {
                fontSize: 18,
                borderRadius: 10,
                backgroundColor: '#dddddf',
              },
              textInputContainer: {
                paddingHorizontal: 20,
                paddingBottom: 0,
              },
            }}
            minLength={2}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
            debounce={400}
          />
        </View>

        <NavFavorities />
      </View>

      <View style={tw`flex-row justify-evenly mt-auto py-2 border-t border-gray-100`}>
        <TouchableOpacity
          style={tw`flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
          onPress={() => navigation.navigate('RideOptionsCard' as never)}
        >
          <Icon tvParallaxProperties name="car" type="font-awesome" color={'white'} size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`flex-row justify-between w-24 px-4 py-3 rounded-full`}>
          <Icon tvParallaxProperties name="fast-food-outline" type="ionicon" color={'black'} size={16} />
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavCard;
