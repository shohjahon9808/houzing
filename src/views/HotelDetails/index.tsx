import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {HotelDetailsScreeNavigationProp, HotelDetailsScreenRouteProp,} from '../../routes/types';

import * as S from './styles';
import Rating from '../../components/Rating';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookingModal from "../../components/Modal";

const HotelDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

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
  console.log(hotel.id);
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
    return <ActivityIndicator style={{top: 20}} size="large" color="#52c0b4"/>; // or any other loading component
  } // Add a loading component of your choice

  const handleBooking = (bookingData) => {
    // Save booking data and hotel data in AsyncStorage
    // You can use AsyncStorage or a state management solution

    // Add a property "type" to distinguish booking data
    const bookingDataWithFlag = {...bookingData, type: "booking"};

    // Fetch existing bookings from AsyncStorage
    AsyncStorage.getItem('BOOKINGS')
        .then((bookings) => {
          const existingBookings = bookings ? JSON.parse(bookings) : [];
          const updatedBookings = [...existingBookings, bookingDataWithFlag];

          // Save the updated list of bookings back to AsyncStorage
          return AsyncStorage.setItem('BOOKINGS', JSON.stringify(updatedBookings));
        })
        .then(() => {
          // Close the form
          setModalVisible(false);
        })
        .catch((error) => {
          console.error('Error saving booking:', error);
          // Handle error here
        });

    // Save the hotel data if it exists
    if (bookingData.hotel) {
      AsyncStorage.setItem('HOTEL_DATA', JSON.stringify(bookingData.hotel))
          .catch((error) => {
            console.error('Error saving hotel data:', error);
            // Handle error here
          });
    }
  };


  return (
      <ScrollView>
        <S.Container>
          <S.BackgroundImage source={hotel.image} resizeMode="cover">
            <S.Header>
              <TouchableOpacity activeOpacity={0.8} onPress={handleNavigateBack}>
                <S.BackIcon/>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleFavorite}>
                <S.BookmarkIcon isFavorite={isFavorite}/>
              </TouchableOpacity>
            </S.Header>
          </S.BackgroundImage>

          <S.LocationIconContainer>
            <S.LocationIcon/>
          </S.LocationIconContainer>
          <S.ContentContainer>
            <S.Title>{hotel.name}</S.Title>
            <S.LocationName>{hotel.location}</S.LocationName>
            <Rating rating={hotel.rating} reviews={hotel.reviews}/>
            <View style={{marginTop: 10}}>
              <S.LocationName> Year Built: {data?.description?.year_built}</S.LocationName>
              <S.LocationName>
                Garage Type: {data?.description?.garage_type ? data?.description?.garage_type : 'None Type'}
              </S.LocationName>

              <S.LocationName> Beds: {data?.description?.beds ? data?.description?.beds : '0'}</S.LocationName>
              <S.LocationName> Exterior: {data?.description?.exterior ? data?.description?.exterior : 'None Exterior'} </S.LocationName>
              <S.LocationName> Exterior: {data?.description?.type ? data?.description?.type.replace(/_/g, ' ') : 'None Exterior'} </S.LocationName>
            </View>
            <S.Description>
              {data?.description?.text
                  ? data?.description?.text
                  : 'No description'}
            </S.Description>
          </S.ContentContainer>

          <S.PricingContainer>
            <S.PricingTitle>Price</S.PricingTitle>
            <S.PricingBackground>
              <S.Pricing>
                ${hotel.price}
              </S.Pricing>
            </S.PricingBackground>
          </S.PricingContainer>

          <S.BookButton onPress={() => setModalVisible(true)}>
            <S.BookButtonText>Book now</S.BookButtonText>
          </S.BookButton>
          <BookingModal
              hotel={hotel}
              isModalVisible={isModalVisible}
              closeModal={() => setModalVisible(false)}
              handleBooking={handleBooking}
          />
        </S.Container>
    </ScrollView>
  );
};

export default HotelDetails;
