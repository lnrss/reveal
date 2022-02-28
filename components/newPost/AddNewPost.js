import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FormikPostUploader from './FormikPostUploader'
import { NavigationContainer } from '@react-navigation/native'

const AddNewPost = ({navigation}) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
    <FormikPostUploader navigation={navigation} ></FormikPostUploader>
  </View>
)

const Header = ({navigation}) => (
  <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} >
        <Image source={{uri: 'https://zupimages.net/up/22/08/g6hp.png'}} style={{width: 16, height: 16, resizeMode: 'contain'}} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Nouveau Post</Text>
      <Text style={{width: 20}} />
    </View>
)



const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerText: {
      color: '#fff',
      fontSize: 20,
      fontFamily: 'msrB'
    }
})

export default AddNewPost