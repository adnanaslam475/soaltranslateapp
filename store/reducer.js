import { GET_SETTINGS, GET_VOCABOLARIES, DEVICEIFNO } from './action';
const init = {
    settings: null,
    data: [],
    deviceId: ''
};
export default reducer = (state = init, action) => {
    switch (action.type) {
        case GET_SETTINGS:
            return {
                ...state,
                settings: action.payload
            }
        case DEVICEIFNO:
            return {
                ...state,
                deviceId: action.device_id
            }
        case GET_VOCABOLARIES:
            console.log('GET_VOCABOLARIES', action.payload)
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }

}