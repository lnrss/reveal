import React from 'react'
import { Image, StyleSheet, SafeAreaView } from 'react-native'
import SignupForm from '../components/signupScreen/SignupForm';
import SafeViewAndroid from "../components/SafeViewAndroid"; 

const LoginScreen = ({navigation}) => (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <Image source={require('../assets/img/bg.png')} style={styles.bgdImage} />
        <SignupForm navigation={navigation} />
    </SafeAreaView>
)

const styles = StyleSheet.create({
    bgdImage: {
        width: '100%',
        height: 500,
        resizeMode: 'contain',
        position: 'absolute',
        top: -20
    }
})

export default LoginScreen