import React, { useEffect } from 'react'
import bgImg from "@/src/assets/images/Page21.webp"
import subscribe from "@/src/assets/images/Subscribe.webp"
import freeForYou from "@/src/assets/images/FreeForYou.webp"
import mainChart from "@/src/assets/images/mainChart.webp"

import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { Link, Redirect, router } from "expo-router"
import {StyleSheet, Dimensions} from 'react-native'
import GoogleAuth from '../components/GoogleAuth'
import userStore from '../store/userStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const {width, height} = Dimensions.get('window')

const actualImageHeight = 273
const actualImageWidth = 353

const buttonImageHeight = 166
const buttonImageWidth = 313

const Trial = () => {
  const {changePlan, setRegisteredTime} = userStore()

  const getFreePlan = async() => {
    const now = Date.now()
    const hasPlan = await AsyncStorage.setItem("@hasPlan", JSON.stringify({planType: 'trial', planStart: now}))
    changePlan('trial')
    setRegisteredTime(now)
    router.replace('/record')
  }

  const checkFreePlan = async() => {
    const hasPlan = await AsyncStorage.getItem("@hasPlan")
    if(!hasPlan) return
    router.replace('/record')
  }

useEffect(()=>{
  checkFreePlan()
}, [])

  return (
      
    <ImageBackground source={bgImg} resizeMode="cover" style={styles.image}>

      <ScrollView contentContainerStyle={styles.contentContainer} >

          <Image 
            source={mainChart} 
            resizeMode="cover" 
            style={{width: width, height: actualImageHeight * (width / actualImageWidth)}}
          />
          
          <Text style={styles.title}>Use cloning voice full power</Text>

       
          <GoogleAuth />
          <Link href='/' asChild style={{color: 'white'}}>
            <Text>welcome</Text>
          </Link>
          <View style={styles.tariffBox}>

            <TouchableOpacity onPress={()=>{router.push('/subscribe')}}>
              <Image
                source={subscribe}
                resizeMode='contain'
                style={{width: 313, height: buttonImageHeight * (313 / buttonImageWidth), }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={getFreePlan}>
              <Image
                source={freeForYou}
                resizeMode='contain'
                style={{width: 313, height: buttonImageHeight * (313 / buttonImageWidth)}}
              />
            </TouchableOpacity>
          
          </View>
      </ScrollView>
      
    </ImageBackground>
  ) 
}

export default Trial

const styles = StyleSheet.create({
  contentContainer:{
    width: '100%',
    paddingTop: 30,
    paddingBottom: 100,
    display: 'flex', 
    alignItems: 'center'
  },
  title:{
    color: "#fff",
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 27,
    marginBottom: 20
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  tariffBox:{
    gap: 20
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});


