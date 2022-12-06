import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const data = [
  { id: '1', icon: 'home', location: 'Home', destination: 'Code street, London, UK' },
  {
    id: '2',
    icon: 'briefcase',
    location: 'Work',
    destination: 'London Eye',
  },
];

const NavFavorities = () => {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={[tw`bg-gray-200`, { height: 0.5 }]} />}
      renderItem={({ item }) => (
        <TouchableOpacity key={item.id} style={tw`flex-row items-center p-5`}>
          <Icon
            name={item.icon}
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            type="ionicon"
            color="white"
            size={18}
            tvParallaxProperties
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
            <Text style={tw`text-gray-500`}>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorities;

const styles = StyleSheet.create({});
