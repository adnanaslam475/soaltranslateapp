import React, { useEffect, useState } from 'react'
import {
    View, Text, TextInput,
    ActivityIndicator,
    Alert,
    TouchableOpacity, Dimensions
} from 'react-native'
import { Icon, Dialog, Input } from 'react-native-elements';
import { styles } from '../styles'
// import { useSelector } from 'react-redux';
import { app } from '../firebase';

const { width, height } = Dimensions.get('window');
const Vocabolaries = ({ route, navigation }) => {
    // const [loading, isLoading] = useState(true);
    const [vocablaries, setVocablaries] = useState([]);
    const [voc, setVoc] = useState('');
    const [open, setopen] = useState(false)
    console.log(route.params?.name)


    useEffect(() => {
        const arr = [];
        app.database().ref('vocabolaries').orderByChild('language')
            .equalTo(`${route.params.name}`).get().then(res => {
                res.forEach(v => {
                    console.log('==>', v.toJSON())
                    arr.push(v.toJSON().voc)
                })
            }).catch(e => {
                Alert.alert("ERROR!!!",
                    "Network Error.", [{ text: "OK" }]);
            })
    }, [])

    const save = async () => {
        try {
            const res = await app.database().ref('languages').push({
                ownwerId: 'asasasa',
                name: route.params?.name,
                voc
            })
        } catch (e) {
            Alert.alert("ERROR!!!",
                "Cannot Translate...", [{ text: "OK" }]);
        }
    }
    return (
        <View style={{ height: '100%', }}>
            <Dialog
                visible={open}
                style={{ borderRadius: 10, }}
                onBackdropPress={() => setopen(false)}>
                <Input placeholder='Enter vocabolary..' maxLength={30}
                    style={{ ...styles.mpzero }}
                    onChangeText={t => setvoc(t)} value={voc} />
                <TouchableOpacity style={{
                    ...styles.btn,
                    width: width * 0.4
                }}
                    onPress={save}>
                    <Text style={{ color: 'white' }}>Ok</Text>
                </TouchableOpacity>
            </Dialog>

            <View style={{display:'inline-block',}}>
                
            </View>
        </View>
    )
}

export default Vocabolaries
