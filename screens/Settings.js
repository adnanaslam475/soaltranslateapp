import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Text,
    View,
    Alert,
    TouchableOpacity,
    Animated,
    Dimensions,
    ToastAndroid
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from 'react-native-elements';
// import FontAw from 'react-native-vector-icons/FontAwesome5'
import { settings, saveSettings } from '../store/action';
import IonIcon from 'react-native-vector-icons/FontAwesome5';
import { styles } from '../styles';


const Settings = () => {
    const state = useSelector(s => s.reducer)
    const dispatch = useDispatch();
    const colors = ['rgb(254,180,21)', 'rgb(8,124,79)',
        'rgb(226,55,48)', 'rgb(60,81,164)', 'black']
    const [color, setcolor] = useState(state.settings?.color || '');
    const [fontSize, setFontSize] = useState(state.settings?.size || 0);


    const save = () => {
        dispatch(saveSettings(color, fontSize))
        ToastAndroid.show("saved successfully", ToastAndroid.SHORT);
    }


    return (
        <View>
            <Text style={{ ...styles.txt }}>Set Font size</Text>
            <Slider
                value={fontSize}
                onValueChange={v => setFontSize(v)}
                maximumValue={40}
                minimumValue={20}
                step={1}
                trackStyle={{ height: 2 }}
                thumbStyle={{ height: 20, width: 20 }}
                style={{ margin: 20 }}
                thumbProps={{
                    children: (<IonIcon
                        name="circle"
                        size={20}
                        style={{ backgroundColor: 'black', borderRadius: 50 }}
                    />),
                }}
            />
            <Text style={{
                fontSize: fontSize ? fontSize : 20,
                alignSelf: 'center'
            }} >Hello Translator</Text>
            <Text style={{ ...styles.txt }}>Set background</Text>
            <View style={{ ...styles.clr }}>{colors.map((v, i) => <TouchableOpacity key={i}
                onPress={() => setcolor(v)}
                style={{
                    ...styles.icon,
                    backgroundColor: v,
                }}>
                {v == color && <IonIcon name='check'
                    color='white' fontSize={30} />}
            </TouchableOpacity>
            )}
            </View>
            <TouchableOpacity style={{ ...styles.btn }} onPress={save}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const { width, height } = Dimensions.get('window')

export default Settings
