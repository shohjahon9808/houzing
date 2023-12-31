import React, {useCallback} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent, ScrollViewProps,} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import {Hotel} from '../../types';
import {HomeScreeNavigationProp} from '../../routes/types';

import * as S from './styles';
import BookingCard from "../BookingCard";

const LAST_CARD_PADDING = 100;
const CARD_WIDTH_OFFSET = RFPercentage(30);

interface IHotelCardListProps extends ScrollViewProps {
  hotelList: Hotel[];
}

const BookingCardList = ({hotelList, ...rest}: IHotelCardListProps) => {
  const scrollX = useSharedValue(0);
  const navigate = useNavigation<HomeScreeNavigationProp>();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  const handleHotelClick = useCallback(
      hotel => {
        navigate.navigate('HotelDetails', {hotel});
      },
      [navigate],
  );

  return (
      <S.Container
          scrollEventThrottle={16}
          snapToInterval={CARD_WIDTH_OFFSET}
          disableScrollViewPanResponder={false}
          disableIntervalMomentum
          contentContainerStyle={{
            paddingRight: CARD_WIDTH_OFFSET - LAST_CARD_PADDING,
          }}
          onScroll={handleScroll}
          {...rest}>
        {hotelList.map((hotel, itemIndex) => (
            <BookingCard
                key={hotel.id}
                hotel={hotel}
                itemIndex={itemIndex}
                scrollX={scrollX}
                handleClick={handleHotelClick}
            />
        ))}
      </S.Container>
  );
};

export default BookingCardList;
