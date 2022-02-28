import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import {LinearGradient} from 'expo-linear-gradient';

const Post = ({post}) => {
  return (
      <View>
        <View style={{height: 340}}>
            <View style={{flexDirection: 'row', marginHorizontal: 20, zIndex: 99}}>
                <LinearGradient colors={['#151515', '#151515']} style={{padding:7, borderRadius: 40, marginRight: 10}}>
                    <LinearGradient colors={['#834DEF', '#A986EE']} style={{padding:2, borderRadius: 31}}>
                        <Image source={{uri: post.profile_picture}} style={styles.story} />
                    </LinearGradient>
                </LinearGradient>
                <View style={{marginTop: 15}}>
                    <Text style={styles.userName}>{post.user}</Text>
                    <Text style={styles.address}>{post.address}</Text>
                </View>
            </View>
            <Image source={{uri: post.imageUrl}} style={styles.postImage} />
        </View>
        <Text style={{color: '#848484', marginHorizontal: 20, marginTop: 20, fontFamily: 'rbtM', fontSize: 12}}>{post.caption.replace(' #'+post.caption.split('#').pop(), '')} <Text style={{color: '#834DEF'}}>{post.caption.split('#').pop() != '' ? '#'+post.caption.split('#').pop() : ''}</Text></Text>
        <View style={styles.optionsPost}><Text style={styles.date}>20 Fév. 2022</Text><Text style={styles.reply}> • </Text><TouchableOpacity><Text style={styles.reply}>Répondre</Text></TouchableOpacity></View>
    </View>
  )
}


const styles = StyleSheet.create({
    story: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#151515'
    },
    userName: {
        color: '#fff',
        fontFamily: 'msrB'
    },
    address: {
        marginTop: -2,
        color: '#B2B2B2',
        fontFamily: 'rbt',
        fontSize: 12
    },
    postImage: {
        width: (Dimensions.get('window').width)-40,
        height: 300,
        position: 'absolute',
        top: 36,
        margin: 20,
        borderRadius: 4,
        resizeMode: 'cover',
    },
    optionsPost: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 2
    },
    date: {
        fontSize: 12,
        color: '#515151',
        fontFamily: 'rbt'
    },
    reply: {
        fontSize: 12,
        color: '#515151',
        fontFamily: 'rbtB'
    }
})

export default Post