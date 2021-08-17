export const GET_VOCABOLARIES = 'GET_VOCABOLARIES';
export const GET_SETTINGS = 'GET_SETTINGS';
export const DEVICEIFNO = 'DEVICEIFNO';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from '../firebase';
import { getAndroidId } from 'react-native-device-info';


export const settings = () => {
    return async dispatch => {
        try {
            const res = await AsyncStorage.getItem('settings');
            JSON.parse(res)
            dispatch({
                type: GET_SETTINGS,
                payload: JSON.parse(res)
            })
        } catch (e) {
            console.log('note get 17')
        }
    }
}

export const saveSettings = (color, size) => {
    return async dispatch => {
        try {
            const json = JSON.stringify({ color, size })
            await AsyncStorage.setItem('settings', json);
            const data = { color, size }
            dispatch({
                type: GET_SETTINGS,
                payload: data
            })
        } catch (error) {
            console.log('err')
        }
    }
}

export const deviceId = () => {
    return async dispatch => {
        getAndroidId().then(id => {
            dispatch({
                type: DEVICEIFNO,
                device_id: id
            })
        }).catch(e => {
            console.log('err48')
        })
    }
}

export const getVocabolaries = () => {
    return async dispatch => {
        // app.database().ref('vocabolaries').orderByChild('deviceId').equalTo(deviceId)
        //     .get().then(res => {
        //         const obj = Object.values(res.toJSON())
        //         setChallengeId(Object.keys(res.toJSON()));
        //         setChallenge(arr.filter((v, i) => v.text === obj[0].categoryType))
        //         setTime(moment(obj[0].createdAt).fromNow())
        //         setclick(false)
        //         dispatch({
        //             type: ''
        //         })
        //     }).catch(e => {
        //         console.log(e);
        //     })
    }
}