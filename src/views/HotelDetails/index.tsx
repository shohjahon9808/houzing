import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ActivityIndicator, ScrollView} from 'react-native';
import {
  HotelDetailsScreeNavigationProp,
  HotelDetailsScreenRouteProp,
} from '../../routes/types';

import * as S from './styles';
import Rating from '../../components/Rating';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HotelDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    params: {hotel},
  } = useRoute<HotelDetailsScreenRouteProp>();
  useEffect(() => {
    // Check if the hotel is already a favorite when component mounts
    const checkFavoriteStatus = async () => {
      const favorites = JSON.parse(
        (await AsyncStorage.getItem('FAVORITES')) || '[]',
      );
      setIsFavorite(favorites.includes(hotel.id));
    };
    checkFavoriteStatus();
  }, [hotel.id]);
  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('FAVORITES');
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      const existingIndex = favorites.findIndex(
        favHotel => favHotel.id === hotel.id,
      );

      if (existingIndex >= 0) {
        // Remove hotel from favorites
        favorites.splice(existingIndex, 1);
      } else {
        // Add hotel to favorites
        favorites.push(hotel);
      }

      // Save the new list back to AsyncStorage
      await AsyncStorage.setItem('FAVORITES', JSON.stringify(favorites));

      setIsFavorite(existingIndex === -1);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const navigate = useNavigation<HotelDetailsScreeNavigationProp>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request({
          method: 'GET',
          url: 'https://us-real-estate.p.rapidapi.com/v3/property-detail',
          params: {
            property_id: hotel?.id,
          },
          headers: {
            'X-RapidAPI-Key':
              '1a23dc6cccmshf4a4a603d7b796cp17c559jsnf69b395a0722',
            'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
          },
        });
        if (response && response.data) {
          setData(response.data.data);
        } else {
          console.error('API returned unexpected structure:', response);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error('API call error:', err);
      }
    };

    fetchData();
  }, [hotel?.id]);

  const handleNavigateBack = () => {
    navigate.goBack();
  };

  if (loading) {
    return <ActivityIndicator style={{top: 20}} size="large" color="#52c0b4" />; // or any other loading component
  } // Add a loading component of your choice

  return (
    <ScrollView>
      <S.Container>
        <S.BackgroundImage source={hotel.image} resizeMode="cover">
          <S.Header>
            <TouchableOpacity activeOpacity={0.8} onPress={handleNavigateBack}>
              <S.BackIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFavorite}>
              <S.BookmarkIcon isFavorite={isFavorite} />
            </TouchableOpacity>
          </S.Header>
        </S.BackgroundImage>

        <S.LocationIconContainer>
          <S.LocationIcon />
        </S.LocationIconContainer>
        <S.ContentContainer>
          <S.Title>{hotel.name}</S.Title>
          <S.LocationName>{hotel.location}</S.LocationName>
          <Rating rating={hotel.rating} reviews={hotel.reviews} />

          <S.Description>
            {data?.description?.text
              ? data?.description?.text
              : 'No description'}
          </S.Description>
        </S.ContentContainer>

        <S.PricingContainer>
          <S.PricingTitle>Price</S.PricingTitle>
          <S.PricingBackground>
            <S.Pricing>${hotel.price}</S.Pricing>
          </S.PricingBackground>
        </S.PricingContainer>

        <S.BookButton>
          <S.BookButtonText>Book now</S.BookButtonText>
        </S.BookButton>
      </S.Container>
    </ScrollView>
  );
};

export default HotelDetails;
