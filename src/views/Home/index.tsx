import React, {useEffect, useState} from 'react';

import CategoriesList from '../../components/CategoriesList';
import InputSearch from '../../components/InputSearch';
import HotelCardList from '../../components/HotelCardList';
import TopHotelList from '../../components/TopHotelsList';

import {Category} from '../../types';
import * as S from './styles';

import hotelMocks from '../../mocks/hotels';
import {ScrollView} from 'react-native';
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
  const handleCategoryClick = (categoryKey: string) => {
    const categoryClicked = CATEGORIES.find(
      category => category.key === categoryKey,
    ) as Category;

    setSelectedCategory(categoryClicked);
  };

  const [data, setData] = useState(null);
  const fetchData = async () => {
    const options = {
      method: 'POST',
      url: 'https://realty-in-us.p.rapidapi.com/properties/v3/list',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '4fa2a4ead5msh05a711b38e6f099p18dbdajsn1de61eec28ae',
        'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
      },
      data: {
        limit: 200,
        offset: 0,
        postal_code: '90004',
        status: ['for_sale', 'ready_to_build'],
        sort: {
          direction: 'desc',
          field: 'list_date',
        },
      },
    };
    try {
      const response = await axios.request(options);
      const results = response.data.data?.home_search?.results?.slice(0, 50);

      if (results && results.length) {
        setData(results);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error(`Error fetching home data: ${error.message}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView>
      <S.Container>
        <S.Header>
          <S.Title>
            Browse homes {'\n'}in <S.PlaceTitle>Seoul South Korea</S.PlaceTitle>
          </S.Title>

          <S.UserIcon />
        </S.Header>

        {/*<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {data ? (
            data.map(item => (
              <View key={item.property_id}>
                <Text>{item.property_id}</Text>
                <Image
                  source={{uri: item.primary_photo.href}}
                  style={{width: 70, height: 70}}
                />
              </View>
            ))
          ) : (
            <Text>...Loading</Text>
          )}
        </View>*/}

        <S.InputContainer>
          <InputSearch placeholder="Address, School, City, Zip or Neighborhood" />
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

        <S.TopHotelListContainer style={{marginBottom: 40}}>
          <S.TopHotelTitle>Top hotels</S.TopHotelTitle>
          <TopHotelList />
        </S.TopHotelListContainer>
      </S.Container>
    </ScrollView>
  );
};

export default Home;

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
