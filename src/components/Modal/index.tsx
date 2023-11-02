import React, {useState} from 'react';
import {Button, Modal, Text, TextInput, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as S from '../../views/Home/styles';

const BookingModal = ({isModalVisible, closeModal, handleBooking, hotel}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [checkInDate, setCheckInDate] = useState(new Date()); // Initialize with the current date and time
    const [checkOutDate, setCheckOutDate] = useState(new Date()); // Initialize with the current date and time
    const [showCheckInDatePicker, setShowCheckInDatePicker] = useState(false);
    const [showCheckOutDatePicker, setShowCheckOutDatePicker] = useState(false);

    const handleCheckInDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || checkInDate;
        setShowCheckInDatePicker(false);
        setCheckInDate(currentDate);
    };

    const handleCheckOutDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || checkOutDate;
        setShowCheckOutDatePicker(false);
        setCheckOutDate(currentDate);
    };

    const showCheckInDatePickerModal = () => {
        setShowCheckInDatePicker(true);
    };

    const showCheckOutDatePickerModal = () => {
        setShowCheckOutDatePicker(true);
    };

    const handleBookNow = () => {
        // Validate input data and perform booking
        if (name && email) {
            const bookingData = {
                name,
                email,
                checkInDate,
                checkOutDate,
                hotel
            };
            handleBooking(bookingData);
        }
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible}
        >
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end'}}>
                <View style={{backgroundColor: 'white', padding: 16, borderRadius: 8, width: '100%'}}>
                    <Text style={{textAlign: 'center', fontSize: 23, paddingBottom: 10}}>
                        <S.Title>
                            <S.PlaceTitle>Booking Form</S.PlaceTitle>
                        </S.Title>
                    </Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#DDD',
                            padding: 10,
                            marginBottom: 20,
                            borderRadius: 5,
                        }}
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#DDD',
                            padding: 10,
                            marginBottom: 20,
                            borderRadius: 5,
                        }}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <View style={{marginBottom: 20}}>
                        <Button title="Select Check-in Date" onPress={showCheckInDatePickerModal}/>
                        {showCheckInDatePicker && (
                            <DateTimePicker
                                value={checkInDate}
                                mode="datetime"
                                is24Hour={true}
                                display="default"
                                onChange={handleCheckInDateChange}
                            />
                        )}
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Button title="Select Check-out Date" onPress={showCheckOutDatePickerModal}/>
                        {showCheckOutDatePicker && (
                            <DateTimePicker
                                value={checkOutDate}
                                mode="datetime"
                                is24Hour={true}
                                display="default"
                                onChange={handleCheckOutDateChange}
                            />
                        )}
                    </View>
                    <View style={{marginBottom: 20}}>
                        <Button title="Close" onPress={closeModal}/>
                    </View>
                    <Button title="Book Now" onPress={handleBookNow}/>
                </View>
            </View>
        </Modal>
    );
};

export default BookingModal;
