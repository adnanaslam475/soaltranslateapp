import React, { useEffect } from 'react'
import { View, Text, } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage'


function Welcome({ navigation }) {
    useEffect(() => {
        if (AsyncStorage.getItem('lang') === null) {
            return;
        }
        else {
            navigation.navigate('')
        }
    }, [])

    const saveLanguage = async lang => {
        try {
            // console.log(lang)
            const res = await AsyncStorage.setItem('lang', lang);
            setLanguageCode(JSON.stringify(res.value));
        }
        catch (error) {
            console.log('cannto set 135')
        }
    }
    return (
        <View>
            <Text style={{}}>Welcome to Translation APP</Text>
            <Picker
                style={styles.picker}
                selectedValue={languageCode}
                onValueChange={lang => saveLanguage(lang)}
        >
                {Object.keys(Languages).map((key, i) => {
                    return (<Picker.Item key={i} label={Languages[key]} value={key} />)
                })}
            </Picker>
        </View>
    )
}
export default Welcome;