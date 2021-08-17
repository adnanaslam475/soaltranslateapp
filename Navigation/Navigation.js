import React from "react";
import { Dimensions, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Speech from "../Component/Sppech";
import Vocabolary from "../screens/Vocabolary";
import Settings from "../screens/Settings";
import vocab_img from '../assets/vocab_img.jpg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { styles } from '../styles';
import Vocabolaries from "../screens/Vocabolaries";

const TranslatorStackNavigator = createStackNavigator();
const VocabStackNavigator = createStackNavigator();
const SettingsStackNavigator = createStackNavigator();
const TabNavigator = createBottomTabNavigator();
const { width, height } = Dimensions.get('window')

const TranslatorStack = () => {
    return (
        <TranslatorStackNavigator.Navigator >
            <TranslatorStackNavigator.Screen name="speech" options={{
                headerTintColor: 'blue',
                headerTitle: 'Translation',
                headerTransparent: false,
                headerTitleAlign: 'center',
                headerTitleContainerStyle: {
                    borderRadius: 30,
                },
                headerTitleStyle: {
                    color: 'blue',
                    padding: 10
                }
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
                        headerTintColor: 'blue',
                        headerTitle: 'Languages',
                        headerTransparent: false,
                        headerTitleAlign: 'center',
                        headerTitleContainerStyle: {
                            borderRadius: 30,
                        },
                        headerTitleStyle: {
                            color: 'blue',
                            padding: 10
                        }
                    })
                }} component={Vocabolary} />
            <VocabStackNavigator.Screen name="vocablaries"
                options={({ route }) => {
                    return ({
                        headerTintColor: 'blue',
                        headerTitle: route.params?.name,
                        headerTransparent: false,
                        headerTitleAlign: 'center',
                        headerTitleContainerStyle: {
                            borderRadius: 30,
                        },
                        headerTitleStyle: {
                            color: 'blue',
                            padding: 10
                        }
                    })
                }} component={Vocabolaries} />
        </VocabStackNavigator.Navigator>
    );
}

const SettingStack = () => {
    return (
        <SettingsStackNavigator.Navigator >
            <SettingsStackNavigator.Screen name="settings" options={{
                headerTintColor: 'blue',
                headerTitle: 'Settings',
                headerTransparent: false,
                headerTitleAlign: 'center',
                headerTitleContainerStyle: {
                    borderRadius: 30,
                },
                headerTitleStyle: {
                    color: 'blue',
                    padding: 10
                }
            }} component={Settings} />
        </SettingsStackNavigator.Navigator>
    );
}


const arr = [{ name: "language", icon: 'dumpster', stack: TranslatorStack },
{ name: "vocabolary", icon: 'paper-plane', stack: SettingStack },
{ name: "settings", icon: 'paper-plane', stack: VocabolaryStack }];


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