import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { USERS } from '../../data/users'
import {LinearGradient} from 'expo-linear-gradient';

const Stories = () => {
  return (
    <View style={{marginBottom: 13}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyContainer}>
            {USERS.map((story, index) => (
                <View style={styles.storyUser} key={index}>
                    <LinearGradient colors={['#834DEF', '#A986EE']} style={{padding:2, borderRadius: 31, marginLeft: 6}}>
                        <Image source={{uri:story.image}} style={styles.story} />
                    </LinearGradient>
                    <Text style={styles.username}>{
                        story.user.length > 11 
                        ? story.user.slice(0, 10).toLowerCase() + '..'
                        : story.user.toLowerCase()
                    }</Text>
                </View>
            ))}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    storyContainer: {
        marginLeft: 18,
        marginTop: 22
    },
    storyUser: {
        marginRight: 10,
        alignItems: 'center'
    },
    story: {
        width: 60,
        height: 60,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#151515'
    },
    username: {
        color:'white',
        marginTop: 5,
        justifyContent: 'center',
        fontFamily: 'rbtB'
    }
})

export default Stories