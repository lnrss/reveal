import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import BottomTabs, {bottomTabIcons} from '../components/home/BottomTabs';
import Header from '../components/home/Header';
import Post from '../components/home/Post';
import Stories from '../components/home/Stories';
import SafeViewAndroid from "../components/SafeViewAndroid";
import { POSTS } from '../data/posts';
import { db } from '../firebase';


const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    db.collectionGroup('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>doc.data()))
    })
  }, [])
  return (
    <Fragment>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <Header navigation={navigation} />
        <Stories />
        <ScrollView>
          {posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </ScrollView>
        <BottomTabs icons={bottomTabIcons}></BottomTabs>
      </SafeAreaView>
      <SafeAreaView style={{ flex:0, backgroundColor: '#212121' }} />
  </Fragment>
  )
}

export default HomeScreen