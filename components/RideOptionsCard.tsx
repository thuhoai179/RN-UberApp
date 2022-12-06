import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInfo } from '../slices/navSlice';

interface IRideOption {
  id: string;
  title: string;
  multiplier: number;
  image: string;
  price: number;
}

const data: IRideOption[] = [
  {
    id: '1',
    title: 'Uber A',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
    price: 50,
  },
  {
    id: '2',
    title: 'Uber B',
    multiplier: 1.5,
    image: 'https://links.papareact.com/5w8',
    price: 69,
  },
  {
    id: '3',
    title: 'Uber C',
    multiplier: 2,
    image: 'https://links.papareact.com/7pf',
    price: 99,
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<IRideOption | null>(null);
  const traveTimeInfo = useSelector(selectTravelTimeInfo)
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
          onPress={() => navigation.navigate('NavCard' as never)}
        >
          <Icon name="chevron-left" type="fontawesome" tvParallaxProperties />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride {traveTimeInfo?.distance?.text}</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={tw`flex-row justify-between items-center px-10 ${item.id === selected?.id ? 'bg-gray-200' : ''}`}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{ uri: item.image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`font-semibold text-xl`}>{item.title}</Text>
              <Text>{traveTimeInfo?.duration?.text} Travel time...</Text>
            </View>
            <Text style={tw`text-xl`}>{new Intl.NumberFormat("en-gb", {
              style: "currency",
              currency: "GBP"
            }).format(
              (traveTimeInfo?.duration?.value || 1 * item.multiplier * item.price) 
            )}</Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity disabled={!selected} style={tw`py-3 ${!selected ? "bg-gray-300" : 'bg-black'}`}>
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
