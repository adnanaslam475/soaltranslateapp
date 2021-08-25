import React, { useEffect, useState } from 'react'
import {
    View, Text, TextInput,
    ActivityIndicator, ScrollView,
    Alert,
    Clipboard,
    ToastAndroid,
    TouchableOpacity, Dimensions
} from 'react-native'
import { Icon, Dialog, Input, Chip } from 'react-native-elements';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../styles'
import { useSelector } from 'react-redux';
import { app } from '../firebase';

const { width, height } = Dimensions.get('window');
const Vocabolaries = ({ route }) => {
    const state = useSelector(s => s.reducer)
    const [vocablaries, setVocablaries] = useState([]);
    const [voc, setVoc] = useState('');
    const [open, setopen] = useState(false);
    const [loading, setloading] = useState(true)
    const [editid, seteditId] = useState(null);
    // const [ids, setId] = useState([])


    useEffect(() => {
        let arr = [];
        app.database().ref('vocabolaries').orderByChild('language')
            .equalTo(`${route.params.name}`).get().then(res => {
                res.forEach(v => {
                    arr.push({
                        id: v.key,
                        text: v.toJSON().voc
                    })
                })

                setVocablaries(arr)
                setloading(false)
            }).catch(e => {
                Alert.alert("ERROR!!!",
                    "Network Error.", [{ text: "OK" }]);
                setloading(false)
            })
    }, [])

    const edit = (v, i) => {
        setopen(true);
        setVoc(v);
        seteditId(i)
    }

    const save = async () => {
        try {
            // if (editid.trim().length) {
            //     app.database().ref('languages').orderByChild('deviceId').update({
            //         ownwerId: state.deviceId,
            //         name: route.params?.name,
            //         voc
            //     })
            // } else {
            //     await app.database().ref('languages').push({
            //         ownwerId: 'asasasa',
            //         name: route.params?.name,
            //         voc
            //     })
            // }
            ToastAndroid.show("saved successfully", ToastAndroid.SHORT);
        } catch (e) {
            Alert.alert("ERROR!!!",
                "Cannot Translate...", [{ text: "OK" }]);
        }
    }

    return (
        <View style={{ height: '100%' }}>
            <Dialog
                visible={open}
                animationType='fade'
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
            {loading ? <ActivityIndicator color='lightblue'
                size='large'
                style={styles.loader} /> : <ScrollView>
                {vocablaries.map((v, i) => {
                    // console.log(v)
                    return (<TouchableOpacity key={v.id}
                        onPress={() => edit(v.text, v.id)}>
                        <Chip
                            title={v.text}
                            icon={{
                                name: "close",
                                type: "font-awesome",
                                color: "white",
                            }}
                            style={{
                                width: width * 0.01, margin: 0,
                                padding: 0, borderWidth: 1,
                            }}
                            containerStyle={{}}
                            iconRight
                        />
                        <Text>{v.text}</Text>
                    </TouchableOpacity>)
                }
                )}</ScrollView >}
            <Icon
                name='add'
                raised
                borderRadius={40}
                backgroundColor='blue'
                size={30}
                onPress={() => setopen(true)}
                containerStyle={{
                    ...styles.cont,
                }}
                style={{ ...styles.cont, }}
                color='#00aced' />
        </View>
    )
}

export default Vocabolaries
