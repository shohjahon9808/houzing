import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HotelCardList from '../../components/HotelCardList';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  console.log(favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('FAVORITES');
        const parsedFavorites = storedFavorites
          ? JSON.parse(storedFavorites)
          : [];
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <View style={{padding: 20, backgroundColor: 'white', flex: 1}}>
      <HotelCardList
        horizontal
        showsHorizontalScrollIndicator={false}
        hitSlop={{bottom: 5, left: 5, right: 5, top: 5}}
        hotelList={favorites}
      />
    </View>
  );
};

export default Favorites;
