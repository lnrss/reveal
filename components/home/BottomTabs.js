import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export const bottomTabIcons = [
  {
      name: 'Home',
      active: 'https://zupimages.net/up/22/08/8wl7.png',
      inactive: 'https://zupimages.net/up/22/07/fdur.png',
  },
  {
      name: 'Search',
      active: 'https://zupimages.net/up/22/08/fta4.png',
      inactive: 'https://zupimages.net/up/22/07/w62r.png',
  },
  {
      name: 'Message',
      active: 'https://zupimages.net/up/22/08/pdx3.png',
      inactive: 'https://zupimages.net/up/22/07/hnsy.png',
  },
  {
      name: 'User',
      active: 'https://zupimages.net/up/22/08/gyrg.png',
      inactive: 'https://zupimages.net/up/22/07/x5d3.png',
  },
  {
      name: 'Flame',
      active: 'https://zupimages.net/up/22/08/79wy.png',
      inactive: 'https://zupimages.net/up/22/08/cpb0.png',
  },
]

const BottomTabs = ({icons}) => {
  const [activeTab, setActiveTab] = useState('Home')

  const Icon = ({icon}) => (
    <TouchableOpacity onPress={()=>setActiveTab(icon.name)}>
      <Image source={activeTab === icon.name ? require('../../assets/img/activeBar.png') : null} style={styles.activeBar} />
      <Image source={{uri: activeTab === icon.name ? icon.active : icon.inactive}} style={styles.icon} />
    </TouchableOpacity>
  )
  return (
    <View style={styles.container}>
      {icons.map((icon, index) => (
           <Icon key={index} icon={icon} />
      ))}
    </View>
  )
}

var {Platform} = React;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: (Platform.OS === 'ios') ? 40 : 50,
    paddingTop: (Platform.OS === 'ios') ? 20 : null,
    alignItems: (Platform.OS === 'ios') ? null : 'center',
    backgroundColor: '#212121'
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain'
  },
  activeBar: {
    position: 'absolute',
    bottom: (Platform.OS === 'ios') ? 36 : 30,
    left: (Platform.OS === 'ios') ? -12 : -10
  }
})

export default BottomTabs