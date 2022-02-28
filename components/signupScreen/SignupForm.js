import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { firebase, db } from '../../firebase'

var {Platform} = React;
const SignupForm = ({navigation}) => {
    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('L\'email est obligatoire'),
        username: Yup.string().required().min(6, 'Le nom d\'utilisateur est obligatoire'),
        password: Yup.string().required().min(8, 'Le mot de passe doit contenir 8 caractères')
    })

    const getRandomProfilePicture = async() => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSignup = async(email, username, password) => {
        try{
            const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log('Firebase User Created Successfuly ! ✅', email, password)

            db.collection('users').doc(authUser.user.email).set({
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture(),
            })
        }catch(error){
            Alert.alert(error.message)
        }
    }

  return (
    <View style={styles.formContainer}>
        <Formik
        initialValues={{email: '', username: '', password: ''}}
        onSubmit={values =>{
            onSignup(values.email, values.username, values.password)
        }}
        validationSchema={SignupFormSchema}
        validateOnMount={true}
        >
            {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
                <>
                    <View style={{alignItems: 'center',}}>
                        <View style={{position: 'relative'}}>
                            <Text style={styles.formSubtitle}>S'inscrire à <Text style={styles.msrB}>Reveal</Text></Text>
                            <Text style={styles.formTitle}>S'inscrire à <Text style={styles.msrB}>Reveal</Text></Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 30}}>
                        <Text style={styles.inputTitle}>E-mail</Text>
                        <TextInput 
                            style={[styles.input, {borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#151515' : 'red'}]}
                            placeholder="Votre e-mail" 
                            placeholderTextColor='#B8B8B8'
                            keyboardAppearance='dark'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        >
                        </TextInput>
                    </View>
                    <View style={{marginHorizontal: 30, marginTop: 10}}>
                        <Text style={styles.inputTitle}>Nom d'utilisateur</Text>
                        <TextInput 
                            style={[styles.input, {borderColor: values.username.length < 1 || values.username.length >= 6 ? '#151515' : 'red'}]}
                            placeholder="Votre nom d'utilisateur" 
                            placeholderTextColor='#B8B8B8'
                            autoCapitalize='none'
                            keyboardAppearance='dark'
                            textContentType='username'
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        >
                        </TextInput>
                    </View>
                    <View style={{marginHorizontal: 30, marginTop: 10, marginBottom: 16}}>
                        <Text style={styles.inputTitle}>Mot de passe</Text>
                            <TextInput 
                                style={[styles.input, {borderColor: 1 > values.password.length || values.password.length >= 6 ? '#151515' : 'red'}]}
                                placeholder="Votre mot de passe" 
                                placeholderTextColor='#B8B8B8'
                                keyboardAppearance='dark'
                                autoCapitalize='none'
                                textContentType='password'
                                secureTextEntry={true}
                                autoCorrect={false}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            >
                            </TextInput>
                            <TouchableOpacity onPress={() => navigation.push('HomeScreen')}>
                                <Text style={{textAlign: 'right', color: '#818181', fontSize: 13, fontFamily: 'rbt'}}>Mot de passe oublié</Text>
                            </TouchableOpacity>
                    </View>
                    <Pressable 
                        style={styles.buttonSubmit(isValid)}
                        onPress={handleSubmit}
                        disabled={!isValid}
                    >
                        <Text style={{fontFamily: 'msrSB', color: '#fff', textAlign: 'center', fontSize: 18}}>C'est parti !</Text>
                    </Pressable>
                    <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                        <Text style={{textAlign: 'center', color: '#818181', fontFamily: 'rbtM', marginBottom: (Platform.OS === 'ios') ? 55 : 25}}>Vous avez déjà un compte ? <Text style={{color: '#834DEF'}}>Se connecter</Text></Text>
                    </TouchableOpacity>
                </>
            )}
        </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#212121',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    formTitle: {
        fontFamily: 'msrSB',
        color: '#fff',
        marginVertical: 25,
        fontSize: 18,
    },
    formSubtitle: {
        position: 'absolute',
        fontFamily: 'msrSB',
        color: '#834DEF',
        marginVertical: 25,
        fontSize: 18,
        right: -1,
        bottom: -1
    },
    msrB: {
        fontFamily: 'msrB'
    },
    inputTitle: {
        color: '#fff',
        fontFamily: 'msrSB'
    },
    input: {
        backgroundColor: '#151515',
        marginTop: 8,
        marginBottom: 4,
        color: '#fff',
        paddingLeft: 12,
        borderRadius: 2,
        paddingVertical: 8,
        fontFamily: 'rbt',
        borderWidth: 1,
    },
    buttonSubmit: isValid => ({
        marginHorizontal: 30, 
        marginBottom: 12, 
        borderRadius: 2, 
        paddingVertical: 10, 
        backgroundColor: isValid ? '#834DEF' : '#151515', 
        marginTop: 8
    })
})

export default SignupForm