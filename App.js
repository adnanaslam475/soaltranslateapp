import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import Navigation from './Navigation/Navigation';
import { useDispatch } from 'react-redux';

import { settings, getVocabolaries, deviceId } from './store/action'

const App = () => {
    const dis = useDispatch();
    useEffect(() => {
        dis(settings())
        dis(deviceId())
        dis(getVocabolaries())
    }, [])
    return <Navigation />
};

export default App;