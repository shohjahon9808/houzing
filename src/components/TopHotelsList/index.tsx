import React, {useEffect, useState} from 'react';
import {useTheme} from 'styled-components';

import * as S from './styles';
import axios from 'axios/index';
import {ActivityIndicator} from 'react-native';

const TopHotelList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const getRandomFloat = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const formatNumber = num => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'm';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };
  const mapApiDataToHotelType = apiData => {
    const randomRating = Math.round(getRandomFloat(1.0, 5.0) * 10) / 10;
    const randomReviews = formatNumber(getRandomInt(0, 10000));

    const mockHotelData = {
      rating: randomRating.toString(), // use the random rating
      reviews: randomReviews,
      imageGradient: require('../../assets/hotel1-gradient.jpeg'),
      details:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit',
    };
    return {
      ...mockHotelData,
      id: apiData.id,
      name: apiData?.location?.address?.line,
      location: `City: ${apiData?.location?.address?.city}`,
      price: apiData.description?.sold_price
        ? apiData.description?.sold_price
        : getRandomInt(0, 10000),
      image: apiData.primary_photo
        ? {uri: apiData.primary_photo.href}
        : require('../../assets/hotel1-gradient.jpeg'),
    };
  };
  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://us-real-estate.p.rapidapi.com/sold-homes',
      params: {
        offset: '0',
        limit: '42',
        state_code: 'MI',
        city: 'Detroit',
        sort: 'newest',
      },
      headers: {
        'X-RapidAPI-Key': '1a23dc6cccmshf4a4a603d7b796cp17c559jsnf69b395a0722',
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com',
      },
    };
    try {
      const response = await axios.request(options);
      const results = response.data.data?.results?.slice(0, 50);
      if (results && results.length) {
        const mappedResults = results.map(mapApiDataToHotelType);
        setData(mappedResults);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error(`Error fetching home data: ${error.message}`);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <ActivityIndicator style={{top: 20}} size="large" color="#52c0b4" />; // or any other loading component
  } // Add a loading component of your choice

  return (
    <S.Container
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}>
      {data.map(hotel => (
        <S.CardContainer key={hotel.id} source={hotel.image} resizeMode="cover">
          <S.Rating>
            <S.RatingIcon color={theme.colors.orange} />
            <S.RatingNumber>{hotel.rating}</S.RatingNumber>
          </S.Rating>
          <S.DetailsSection>
            <S.Title>{hotel.name}</S.Title>
            <S.Location>{hotel.location}</S.Location>
          </S.DetailsSection>
        </S.CardContainer>
      ))}
    </S.Container>
  );
};

export default TopHotelList;
