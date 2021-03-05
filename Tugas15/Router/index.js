import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HomeScreen from '../Screen/HomeScreen'
import LoginScreen from '../Screen/LoginScreen'
import SkillScreen from '../Screen/SkillScreen'
import AboutScreen from '../Screen/AboutScreen'
import Settings from '../Screen/Settings'
import ProjectScreen from '../Screen/ProjectScreen'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='LoginScreen' component={LoginScreen} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='MainApp' component={MainApp} />
                <Stack.Screen name='myDrawer ' component={myDrawer} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const MainApp = () => (
        <Tab.Navigator>
        
            <Tab.Screen name='AboutScreen' component={AboutScreen} />
            <Tab.Screen name='SkillScreen' component={SkillScreen} />
            <Tab.Screen name='ProjectScreen' component={ProjectScreen} />
        </Tab.Navigator>
)


const myDrawer = () => {

    <Drawer.Navigator>
        <Drawer.Screen name='App' component={App} />
        <Drawer.Screen name='Settings' component={Settings} />
    </Drawer.Navigator>
}



const styles = StyleSheet.create({})
