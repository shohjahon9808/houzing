import React, {useState} from 'react';

import CategoriesList from '../../components/CategoriesList';
import InputSearch from '../../components/InputSearch';
import HotelCardList from '../../components/HotelCardList';
import TopHotelList from '../../components/TopHotelsList';

import {Category} from '../../types';
import * as S from './styles';

import hotelMocks from '../../mocks/hotels';
import {Button, ScrollView, View} from 'react-native';
import axios from 'axios';

const CATEGORIES: Category[] = [
  {
    description: 'All Places',
    key: 'ALL',
  },
  {
    description: 'Popular',
    key: 'POPULAR',
  },
  {
    description: 'Top Rated',
    key: 'TOP_RATED',
  },
  {
    description: 'Featured',
    key: 'FEATURED',
  },
  {
    description: 'Luxury',
    key: 'LUXURY',
  },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    CATEGORIES[0],
  );

  const [userInfo, setUserInfo] = useState(null);

  const handleCategoryClick = (categoryKey: string) => {
    const categoryClicked = CATEGORIES.find(
      category => category.key === categoryKey,
    ) as Category;

    setSelectedCategory(categoryClicked);
  };

  // const [userId, setUserId] = useState(null);

  /*useEffect(() => {
                                                    // Function to fetch the userId from AsyncStorage
                                                    const getUserIdFromStorage = async () => {
                                                      try {
                                                        const storedUserId = await AsyncStorage.getItem('userId');
                                                        if (storedUserId) {
                                                          setUserId(storedUserId);
                                                        }
                                                      } catch (error) {
                                                        console.error('Error fetching userId from storage:', error);
                                                      }
                                                    };

                                                    getUserIdFromStorage();
                                                  }, []);
                                                */
  /*useEffect(() => {
                                                    if (userId) {
                                                      const fetchUserData = async () => {
                                                        try {
                                                          const userDocument = await firestore()
                                                            .collection('users')
                                                            .doc(userId)
                                                            .get();

                                                          if (userDocument.exists) {
                                                            const userData: UserData = userDocument.data() as UserData;
                                                            setUserInfo(userData);
                                                          } else {
                                                            console.log('No such document!');
                                                          }
                                                        } catch (error) {
                                                          console.error('Error fetching user data: ', error);
                                                        }
                                                      };

                                                      fetchUserData();
                                                    }
                                                  }, [userId]); // <-- `userId` is added to the dependency array*/

  const [data, setData] = useState(null);
  console.log(data);

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://realty-in-us.p.rapidapi.com/locations/v2/auto-complete',
      params: {
        input: 'new york',
        limit: '10',
      },
      headers: {
        'X-RapidAPI-Key': 'bc8a3c6271msh5c8dc2065bf6aa1p11098ajsn80f5ebc1d417',
        'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ScrollView>
      <S.Container>
        <S.Header>
          <S.Title>
            Find your house {'\n'}in <S.PlaceTitle>Paris</S.PlaceTitle>
          </S.Title>

          <S.UserIcon />
        </S.Header>

        <View>
          {/*<Button title="Fetch Data" onPress={fetchData} />*/}
          {/*  {data.map(item => (
            <Text key={item.id} style={{color: 'black'}}>
              {item.id}
            </Text>
          )) &&
            Array.isArray(data) &&
            data}*/}
        </View>

        {/*
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {userInfo ? (
            <>
              <Text>Welcome, {userInfo.fullName}!</Text>
              <Text>Your email: {userInfo.email}</Text>
               You can display other user information here if needed
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>*/}

        <S.InputContainer>
          <InputSearch placeholder="Search" />
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

        <S.HotelCardListContainer>
          <HotelCardList
            horizontal
            showsHorizontalScrollIndicator={false}
            hitSlop={{bottom: 5, left: 5, right: 5, top: 5}}
            hotelList={hotelMocks}
          />
        </S.HotelCardListContainer>

        <S.TopHotelListContainer>
          <S.TopHotelTitle>Top hotels</S.TopHotelTitle>
          <TopHotelList />
        </S.TopHotelListContainer>
      </S.Container>
    </ScrollView>
  );
};

export default Home;
