import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import 'react-native-gesture-handler';
// import Navigation from './Navigation/Navigation';
import { useDispatch } from 'react-redux';
// import SplashScreen from 'react-native-splash-screen';
import { settings, getVocabolaries, deviceId } from './store/action'

import CountryPicker from 'react-native-country-picker-modal'
// import { CountryCode, Country } from './src/types'


const App = () => {
    const dis = useDispatch();


    const [countryCode, setCountryCode] = useState('FR')
    const [country, setCountry] = useState(null)
    const [withCountryNameButton, setWithCountryNameButton] = useState(
        false,
    )
    const [withFlag, setWithFlag] = useState(true)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(false)
    const [withCallingCode, setWithCallingCode] = useState(false);


    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)
    }
    useEffect(() => {
        dis(settings())
        dis(deviceId())
        dis(getVocabolaries())
        // SplashScreen.hide();
    }, [])
    
    return <View>
        <Text>assssssssssssssss</Text>
        <CountryPicker
            {...{
                countryCode,
                withFilter,
                withFlag,
                withCountryNameButton,
                withAlphaFilter,
                withCallingCode,
                withEmoji,
                onSelect,
            }}
            visible
        />
    </View>
};

export default App;