import React from "react";
import { Dimensions, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Speech from "../Component/Sppech";
import Vocabolary from "../screens/Vocabolary";
import Settings from "../screens/Settings";
import vocab_img from '../assets/vocab_img.jpg';
import FontAwesome5 from 'react-native-vector-icons/MaterialIcons';
import Vocabolaries from "../screens/Vocabolaries";

const TranslatorStackNavigator = createStackNavigator();
const VocabStackNavigator = createStackNavigator();
const SettingsStackNavigator = createStackNavigator();
const TabNavigator = createBottomTabNavigator();
const { width, height } = Dimensions.get('window')


const navStyles = {
    headerStyle: { backgroundColor: '#91bad6' },
    headerTransparent: false,
    headerTitleAlign: 'center',
    headerTitleContainerStyle: {
        borderRadius: 30,
    },
    headerTitleStyle: {
        color: 'white',
        padding: 10,
    }
}
const TranslatorStack = () => {
    return (
        <TranslatorStackNavigator.Navigator >
            <TranslatorStackNavigator.Screen name="speech" options={{
                ...navStyles,
                headerTitle: 'Translation',

            }} component={Speech} />
        </TranslatorStackNavigator.Navigator>
    );
}

const VocabolaryStack = () => {
    return (
        <VocabStackNavigator.Navigator >
            <VocabStackNavigator.Screen name="vocab"
                options={({ }) => {
                    return ({
                        ...navStyles,
                        headerTitle: 'Languages',
                    })
                }} component={Vocabolary} />
            <VocabStackNavigator.Screen name="vocablaries"
                options={({ route }) => {
                    return ({
                        ...navStyles,
                        headerTitle: route.params?.name,
                    })
                }} component={Vocabolaries} />
        </VocabStackNavigator.Navigator>
    );
}

const SettingStack = () => {
    return (
        <SettingsStackNavigator.Navigator >
            <SettingsStackNavigator.Screen name="settings" options={{
                ...navStyles,
                headerTitle: 'Settings',
            }} component={Settings} />
        </SettingsStackNavigator.Navigator>
    );
}


const arr = [{ name: "language", icon: 'language', stack: VocabolaryStack },
{ name: "vocabolary", icon: 'paper-plane', stack: TranslatorStack },
{ name: "settings", icon: 'settings', stack: SettingStack }];


const StackTabs = () => {
    return (<TabNavigator.Navigator screenOptions={{ tabBarVisible: true }} >
        {arr.map((v, i) => <TabNavigator.Screen
            name={v.name}
            key={i}
            component={v.stack}
            options={{
                tabBarBadgeStyle: { color: 'red' },
                tabBarIcon: (props) => {
                    return (<>{v.name == 'vocabolary' ? <Image source={vocab_img}
                        style={{ width: width * 0.09, height: height * 0.06 }} /> :
                        <FontAwesome5 name={v.icon} color='gray' size={width * 0.06}
                        />}</>)
                }
            }}
        />
        )}
    </TabNavigator.Navigator>
    );
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <StackTabs />
        </NavigationContainer>
    )
}

export default Navigation;