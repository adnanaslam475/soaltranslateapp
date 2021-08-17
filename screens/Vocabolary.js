import React, { useEffect, useState } from 'react'
import {
    View, Text, TouchableOpacity, BackHandler,
    Alert, Dimensions, ScrollView
} from 'react-native'
import { styles } from '../styles';
import { Icon, Dialog, Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { app } from '../firebase';

const { width, height } = Dimensions.get('window');

const Vocabolary = ({ navigation }) => {
    const dispatch = useDispatch();
    const state = useSelector(s => s.reducer);
    const [search, setsearch] = useState('');
    const [voc, setvoc] = useState('')
    const [language, setLanguage] = useState('');
    const [open, setopen] = useState(false);
    const [msg, setmsg] = useState('');
    const [names, setNames] = useState([])

    useEffect(() => {
        let arr = []
        app.database().ref('vocabolaries').get().then(res => {
            res.forEach(v => {
                console.log(v)
                arr.push(v.toJSON().language)
            })
            setNames(arr)
            console.log('adnan', arr);
        }).catch(e => {
            Alert.alert("ERROR!!!", "Network Error...",
                [{ text: "OK" }]);
        })
    }, [])
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => setopen(false));
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => setopen(false));
        };
    }, []);


    let matchingStrings = [];
    useEffect(() => {
        let previousarr = []
        if (search.trim().length == 0) {
            previousarr = names
        }
        names.forEach((list) => {
            if (list.toLocaleLowerCase().search(search.toLocaleLowerCase()) > -1) {
                matchingStrings.push(list)
            }
        })
        setNames(search.trim().length ? matchingStrings : previousarr)
    }, [search])

    const add = async () => {
        try {
            console.log('here...')
            if (names.includes(language)) {
                console.log('here')
                setmsg('language already exists')
            }
            else if (!language || !voc) {
                setmsg('please complete fields')
            }
            else if (language && !voc) {
                setmsg('please Enter atleast one vocabolary')
            }
            else {
                setmsg('')
                await app.database().ref('vocabolaries').push({
                    deviceId: state.deviceId,
                    language,
                    voc
                })
                setNames(p => [...p, language])
                setopen(false)
            }
        } catch (e) {
            Alert.alert("ERROR!!!", "Somthing Went Wrong...",
                [{ text: "OK" }]);
        }
    }

    return (
        <ScrollView >
            <View style={{
                height,position: 'relative'
            }}>
                <Dialog
                    visible={open}
                    style={{ borderRadius: 10, }}
                    onBackdropPress={() => setopen(false)}>
                    <Input placeholder='Enter Language..'
                        style={{ ...styles.mpzero }} maxLength={30}
                        onChangeText={t => setLanguage(t)} value={language} />
                    {msg ? <Text style={{
                        padding: 0,
                        paddingLeft: 5,
                        marginTop: -20
                    }}>{'sddddddddd'}</Text> : null}
                    <Input placeholder='Enter vocabolary..' maxLength={30}
                        style={{ ...styles.mpzero }}
                        onChangeText={t => setvoc(t)} value={voc} />
                    <TouchableOpacity style={{
                        ...styles.btn,
                        width: width * 0.4
                    }}
                        onPress={add}><Text style={{ color: 'white' }}>Ok</Text></TouchableOpacity>
                </Dialog>
                <Input placeholder='Search language...' value={search}
                    onChangeText={t => setsearch(t)} />

                {names?.map((v, i) => <TouchableOpacity key={i} style={{
                    ...styles.card
                }}
                    onPress={() => navigation.navigate('vocablaries',
                        { name: v })}>
                    <Text style={{
                    }}>{v}</Text>
                </TouchableOpacity>)}
                <Icon
                    name='add'
                    raised
                    borderRadius={40}
                    backgroundColor='blue'
                    size={30}
                    onPress={() => setopen(true)}
                    containerStyle={{
                        ...styles.cont
                    }}
                    style={{ ...styles.cont }}
                    color='#00aced' />
            </View>
        </ScrollView>
    )
}

export default Vocabolary;
