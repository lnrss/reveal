import React, { Fragment } from 'react'
import { SafeAreaView } from 'react-native';
import SafeViewAndroid from "../components/SafeViewAndroid";
import AddNewPost from '../components/newPost/AddNewPost'

const NewPostScreen = ({navigation}) => {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <AddNewPost navigation={navigation} />
    </SafeAreaView>
  )
}

export default NewPostScreen