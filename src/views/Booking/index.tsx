import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookingCardList from "../../components/BookingCardList";

const Booking = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fetch bookings data from AsyncStorage when the component mounts
        AsyncStorage.getItem('BOOKINGS')
            .then((bookingsData) => {
                if (bookingsData) {
                    const parsedBookings = JSON.parse(bookingsData);
                    // Filter the data to get only booking data
                    const filteredBookings = parsedBookings.filter((item) => item.type === "booking");
                    setBookings(filteredBookings);
                }
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
            });
    }, []);


    return (
        <View style={{padding: 20, backgroundColor: 'white', flex: 1}}>
            <BookingCardList
                horizontal
                showsHorizontalScrollIndicator={false}
                hitSlop={{bottom: 5, left: 5, right: 5, top: 5}}
                hotelList={bookings} // Pass the bookings data to HotelCardList
            />
        </View>
    );
};

export default Booking;
