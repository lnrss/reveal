import React from 'react'
import { View, Text, StyleSheet, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native'
import { firebase } from '../../firebase'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'

var {Platform} = React;
const LoginForm = ({navigation}) => {
    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('L\'email est necessaire'),
        password: Yup.string().required().min(8, 'Le mot de passe doit contenir 8 caractères')
    })

    const onLogin = async(email, password) => {
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log('Firebase Login Successful ! ✅', email, password)
        }catch(error){
            Alert.alert(
                'Oops..',
                'Le mot de passe est invalide ou l\'utilisateur n\'existe pas.',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK'),
                        style: 'cancel',
                    },
                    {
                        text: 'S\'inscrire',
                        onPress: () => navigation.push('SignupScreen'),
                    }
                ]
            )
        }
    }

  return (
    <View style={styles.formContainer}>
        <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values =>{
            onLogin(values.email, values.password)
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
        >
            {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
                <>
                    <View style={{alignItems: 'center',}}>
                        <View style={{position: 'relative'}}>
                            <Text style={styles.formSubtitle}>Se connecter à <Text style={styles.msrB}>Reveal</Text></Text>
                            <Text style={styles.formTitle}>Se connecter à <Text style={styles.msrB}>Reveal</Text></Text>
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
                    <View style={{marginHorizontal: 30, marginTop: 10, marginBottom: 16}}>
                        <Text style={styles.inputTitle}>Mot de passe</Text>
                            <TextInput 
                                style={[styles.input, {borderColor: 1 > values.password.length || values.password.length >= 8 ? '#151515' : 'red'}]}
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
                            <Text style={{textAlign: 'right', color: '#818181', fontSize: 13, fontFamily: 'rbt'}}>Mot de passe oublié</Text>
                    </View>
                    <Pressable 
                        style={styles.buttonSubmit(isValid)}
                        onPress={handleSubmit}
                        disabled={!isValid}
                    >
                        <Text style={{fontFamily: 'msrSB', color: '#fff', textAlign: 'center', fontSize: 18}}>Se connecter</Text>
                    </Pressable>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{textAlign: 'center', color: '#818181', fontFamily: 'rbtM', marginBottom: (Platform.OS === 'ios') ? 130 : 25}}>Vous n'avez plus de compte ? <Text style={{color: '#834DEF'}}>S'inscrire</Text></Text>
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

export default LoginForm