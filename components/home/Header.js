import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { firebase } from '../../firebase'

const handleSignout = async () => {
  try{
    await firebase.auth().signOut()
    console.log('Signed out successfuly')
  }catch(error){
    console.log(error)
  }
}

const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignout}>
        <Text style={styles.textLogo}>Reveal<Text style={styles.dotLogo}>.</Text></Text>
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/img/map.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/img/bell.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('NewPostScreen')} >
          <Image
            source={require('../../assets/img/add.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10
  },
  textLogo: {
    color: '#fff',
    fontSize: 26,
    fontFamily: 'msrSB',
  },
  dotLogo: {
    color: '#834DEF'
  },
  iconsContainer:{
    flexDirection: 'row'
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 16
  }
})

export default Header