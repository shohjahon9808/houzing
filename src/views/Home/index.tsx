import React, {useEffect, useState} from 'react';

import CategoriesList from '../../components/CategoriesList';
import InputSearch from '../../components/InputSearch';
import HotelCardList from '../../components/HotelCardList';
import TopHotelList from '../../components/TopHotelsList';
import {Category} from '../../types';
import * as S from './styles';
import {ActivityIndicator, ScrollView} from 'react-native';
import axios from 'axios';

const CATEGORIES: Category[] = [
  {
    description: 'For Sale',
    key: 'for_sale',
    url: 'https://us-real-estate.p.rapidapi.com/v2/for-sale',
  },
  {
    description: 'For Rent',
    key: 'for_rent',
    url: 'https://us-real-estate.p.rapidapi.com/v2/for-rent',
  },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
      CATEGORIES[0],
  );
  const [searchText, setSearchText] = useState('');
  const filterData = (text) => {
    if (text === '') {
      // If search input is empty, show all data
      setData(dataAll);
    } else {
      const filteredData = data.filter((item) => {
        return item.name.toLowerCase().includes(text.toLowerCase()) ||
            item.location.toLowerCase().includes(text.toLowerCase());
      });
      setData(filteredData);
    }
  };

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
      name: apiData?.location?.address?.line,
      location: `City: ${apiData?.location?.address?.city}  State: ${apiData?.location?.address?.state}`,
      id: apiData?.property_id,
      price: apiData.description?.sold_price
        ? apiData.description?.sold_price
        : getRandomInt(0, 10000),
      image: apiData.primary_photo
        ? {uri: apiData.primary_photo.href}
        : require('../../assets/hotel1-gradient.jpeg'),
    };
  };
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: selectedCategory.url,
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
      const results = response.data.data?.home_search?.results?.slice(0, 50);
      if (results && results.length) {
        const mappedResults = results.map(mapApiDataToHotelType);
        setData(mappedResults);
        setDataAll(mappedResults); // Store original data

      } else {
        setData([]);
        setDataAll([]);

      }
    } catch (error) {
      console.error(`Error fetching home data: ${error.message}`);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedCategory,]);
  const handleCategoryClick = (categoryKey: string) => {
    const categoryClicked = CATEGORIES.find(
      category => category.key === categoryKey,
    ) as Category;

    setSelectedCategory(categoryClicked);
    setIsLoading(true); // set loading to true when the category changes
  };
  return (
    <ScrollView>
      <S.Container>
        <S.Header>
          <S.Title>
            Browse homes {'\n'}in <S.PlaceTitle>Seoul South Korea</S.PlaceTitle>
          </S.Title>

          <S.UserIcon />
        </S.Header>

        <S.InputContainer>
          <InputSearch
              placeholder="Search homes..."
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                filterData(text);
              }}
          />
        </S.InputContainer>

        <S.CategoriesListContainer>
          <CategoriesList
            horizontal
            showsHorizontalScrollIndicator={false}
            hitSlop={{bottom: 5, left: 5, right: 5, top: 5}}
            categories={CATEGORIES}
            onSelect={handleCategoryClick}
            selectedCategory={selectedCategory}
          />
        </S.CategoriesListContainer>

        <S.HotelCardListContainer
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#52c0b4" /> // or any other loading component
          ) : (
            <HotelCardList
              horizontal
              showsHorizontalScrollIndicator={false}
              hitSlop={{bottom: 5, left: 5, right: 5, top: 5}}
              hotelList={data}
            />
          )}
        </S.HotelCardListContainer>

        <S.TopHotelListContainer style={{marginBottom: 40}}>
          <S.TopHotelTitle>Sold homes</S.TopHotelTitle>
          <TopHotelList />
        </S.TopHotelListContainer>
      </S.Container>
    </ScrollView>
  );
};

export default Home;
