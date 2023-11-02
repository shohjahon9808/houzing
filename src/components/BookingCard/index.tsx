import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {RFPercentage} from 'react-native-responsive-fontsize';

import Rating from '../Rating';

import {Hotel} from '../../types';

import * as S from './styles';

interface IHotelCardProps {
  hotel: Hotel;
  itemIndex: number;
  scrollX: Animated.SharedValue<number>;
  handleClick: (hotel: Hotel) => void;
}

const CARD_WIDTH_OFFSET = RFPercentage(32);

const BookingCard = ({
                       hotel,
                       itemIndex,
                       handleClick,
                       scrollX,
                     }: IHotelCardProps) => {
  const inputRange = [
    (itemIndex - 1) * CARD_WIDTH_OFFSET,
    itemIndex * CARD_WIDTH_OFFSET,
    (itemIndex + 1) * CARD_WIDTH_OFFSET,
  ];

  const cardStyle = useAnimatedStyle(() => {
    return {
      // opacity: interpolate(scrollX.value, inputRange, [0.5, 1, 0.5]),
      transform: [
        {
          scale: interpolate(scrollX.value, inputRange, [0.8, 1, 0.8]),
        },
      ],
    };
  });


  return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => handleClick(hotel?.hotel)}>
        <S.AnimatedContainer style={cardStyle}>
          <S.Container source={hotel?.hotel?.image} resizeMode="cover">
            <S.PriceContainer>
              <S.Price>$ {hotel?.hotel?.price}</S.Price>
            </S.PriceContainer>

            <S.DetailsContainer>
              <S.DetailsContainerTitle>
                <View>
                  <S.Name>{hotel?.hotel?.name}</S.Name>
                  <S.Location>Name: {hotel.name}</S.Location>
                  <S.Location>Email: {hotel.email}</S.Location>
                  <S.Location>Check Out Date: {hotel.checkOutDate}</S.Location>
                  <S.Location>Check In Date: {hotel.checkInDate}</S.Location>
                </View>
              </S.DetailsContainerTitle>
            </S.DetailsContainer>
          </S.Container>
        </S.AnimatedContainer>
      </TouchableOpacity>
  );
};

export default BookingCard;
