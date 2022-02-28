import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'react-native';
import NewPostScreen from "./screens/NewPostScreen";
import SignedInStack from "./navigation";
import AuthNavigation from "./AuthNavigation";

StatusBar.setBarStyle('light-content', true);

const fetchFonts = () => {
  return Font.loadAsync({
    'msrB': require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
    'msrSB': require('./assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
    'msr': require('./assets/fonts/montserrat/Montserrat-Regular.ttf'),
    'rbtB': require('./assets/fonts/roboto/Roboto-Bold.ttf'),
    'rbtM': require('./assets/fonts/roboto/Roboto-Medium.ttf'),
    'rbt': require('./assets/fonts/roboto/Roboto-Regular.ttf'),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  if(!dataLoaded){
    return(
      <AppLoading
        startAsync={fetchFonts}
        onFinish={()=>setDataLoaded(true)}
        onError={(error)=> console.warn(error)}
      />
    );
  }
  return <AuthNavigation />
}