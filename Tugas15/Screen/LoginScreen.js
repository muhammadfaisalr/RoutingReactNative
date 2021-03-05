import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function LoginScreen({navigation}) {
    return (
        <View>
            <Text>Halaman Login</Text>
            <Button onPress={() => navigation.navigate('myDrawer', {
                    screen : 'App', params: {
                        screen : 'AboutScreen'
                    }
                }
            )} title='Login'/>
        </View>
    )
}

const styles = StyleSheet.create({})
