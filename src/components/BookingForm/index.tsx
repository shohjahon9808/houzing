import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';

const BookingForm = ({onBook}) => {
    const [bookingData, setBookingData] = useState({});

    const handleBookNow = () => {
        // Save booking data and close the form
        onBook(bookingData);
    };

    return (
        <View>
            <TextInput
                placeholder="Name"
                onChangeText={(text) => setBookingData({...bookingData, name: text})}
            />
            <TextInput
                placeholder="Check-in Date"
                onChangeText={(text) => setBookingData({...bookingData, checkinDate: text})}
            />
            <TextInput
                placeholder="Check-out Date"
                onChangeText={(text) => setBookingData({...bookingData, checkoutDate: text})}
            />
            <Button title="Book Now" onPress={handleBookNow}/>
        </View>
    );
};

export default BookingForm;
