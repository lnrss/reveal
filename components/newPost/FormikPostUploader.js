import { View, Text, TextInput, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import validUrl from 'valid-url'
import { db, firebase } from '../../firebase'

const PLACEHOLDER_IMG = 'https://zupimages.net/up/22/08/b18z.png'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('Aucune URL saisie...'),
    caption: Yup.string().max(2200, 'Le nombre de caractère maximum est atteint')
})

const FormikPostUploader = ({navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUsername = () => {
        const user = firebase.auth().currentUser
        const unsubscribe = db.collection('users').where('owner_uid', '==', user.uid).limit(1).onSnapshot(
            snapshot => snapshot.docs.map(doc => {
                setCurrentLoggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture,
                })
            })
        )
        return unsubscribe
    }

    useEffect(()=>{
        getUsername()
    }, [])

    const uploadPostToFirebase = (imageUrl, caption) => {
        const unsubscribe = db
        .collection('users')
        .doc(firebase.auth().currentUser.email)
        .collection('posts')
        .add({
            imageUrl: imageUrl,
            user: currentLoggedInUser.username,
            profile_picture: currentLoggedInUser.profilePicture,
            owner_uid: firebase.auth().currentUser.uid,
            owner_email: firebase.auth().currentUser.email,
            caption: caption,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => navigation.goBack())
        return unsubscribe
    }

  return (
    <Formik 
        initialValues={{caption: '', imageUrl: ''}} 
        onSubmit={(values) => {
            uploadPostToFirebase(values.imageUrl, values.caption)
        }} 
        validationSchema={uploadPostSchema}
        validateOnMount={true}
    >
        {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => 
          <>
            <View style={{marginTop: 60, marginBottom: 14, justifyContent: 'space-between', flexDirection: 'row'}}>
                <Image source={{uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG}} style={{width: 125, height: 125, resizeMode: 'contain'}} />
                <View style={{flex: 1, marginLeft: 12}}>
                    <TextInput 
                        style={{color: '#fff', fontSize: 16}}
                        placeholder='Ecrire une description...' 
                        placeholderTextColor='gray' 
                        multiLine={true} 
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption} 
                        keyboardAppearance='dark'
                    />
                </View>
            </View>
            <TextInput
                onChange={e => setThumbnailUrl(e.nativeEvent.text)}  
                style={{color: '#fff', fontSize: 16, marginBottom: 40}}
                placeholder="Url de l'image" 
                placeholderTextColor='gray'
                onChangeText={handleChange('imageUrl')}
                onBlur={handleBlur('imageUrl')}
                value={values.imageUrl}
                keyboardAppearance='dark'
            />
            {errors.imageUrl && (
                <Text style={{fontSize: 14, color: '#fff', fontFamily: 'rbtB'}}>
                    {errors.imageUrl}
                </Text>
            )}

            <Pressable onPress={handleSubmit} title='Partager' disabled={!isValid} style={{borderRadius: 2, paddingVertical: 8, backgroundColor: '#834DEF', marginTop: 8}}>
                <Text style={{fontFamily: 'msrB', color: '#fff', textAlign: 'center'}}>Partager</Text>
            </Pressable>
        </>
        }
    </Formik>
  )
}

export default FormikPostUploader