import { router, Stack } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Swiper from "react-native-swiper"

import step1 from '@/src/assets/images/step1.png'
import step2 from '@/src/assets/images/step2.png'
import step3 from '@/src/assets/images/step3.png'
import step4 from '@/src/assets/images/step4.png'


import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import userStore from '../store/userStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Welcome() {
  const swiperRef = useRef<Swiper>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const {toggleVisit, firstVisit} = userStore()
  const data = [
    {title: "Welcome to VoiceMe!", img: step1},
    {title: "Record friend's or celeb's voices", img: step2},
    {title: "Write text for that voice", img: step3},
    {title: "Done! Send funny phrases in their voices. Enjoy!", img: step4},
  ]
  const isLastSlide = activeIndex === data.length - 1

  const finishWelcome = async() => {
    toggleVisit()
    await AsyncStorage.setItem("@userVisit", JSON.stringify({userVisit: true}))
    router.replace('/trial')
  }

  const checkFirstVisit = async() => {
    const userVisit = await AsyncStorage.getItem("@userVisit")
    console.log(userVisit)
    if(userVisit){
      await AsyncStorage.setItem("@userVisit", JSON.stringify({userVisit: true}))
      router.replace('/trial')
    } 
  }


  useEffect(()=> {
    checkFirstVisit()
    console.log('firstVisit - ' + firstVisit)
  },[firstVisit])

    return (
      <>
        <Stack.Screen  options={{headerShown: false}} />
     
         <SafeAreaView style={styles.container}>
         <View style={styles.btnsBlock}>
            <TouchableOpacity 
              onPress={finishWelcome}
              style={styles.skipBtn}><Text style={{color: 'white', textAlign: 'center', fontSize: 24, fontWeight: 700}}>Skip</Text></TouchableOpacity>
              <TouchableOpacity
                style={styles.nextBtn}
                onPress={ () => {
                  isLastSlide ? finishWelcome() : swiperRef.current?.scrollBy(1)}
              }>
                   <LinearGradient 
                    colors={['#00A3FF', '#CC00FF']}
                    start={{ y: 0.0, x: 0.0 }} 
                    end={{ y: 0.0, x: 1.0 }}
                  >
                    <Text style={styles.nextText}>{isLastSlide ? `Let's start` : `Next`}</Text>
                  </LinearGradient>
              </TouchableOpacity>
            
            </View>

           <Swiper
              ref={swiperRef}
              loop={false}
              dot={<View style={{width: 53, height: 3, backgroundColor: "#9757FF", marginHorizontal: 3, marginBottom: 70}}></View>}
              activeDot={<View style={{width: 53, height: 3, backgroundColor: "#E094FF", marginHorizontal: 3, marginBottom: 70 }}></View>}
              onIndexChanged={index => setActiveIndex(index)}
            >
              {data.map((item, i) => (
                <View style={styles.sliderWrap} key={i}>
                  <Image source={item.img} resizeMode="contain" />
                  <View style={styles.sliderTextBox}>
                    <Text style={styles.imageChapture}>How to use</Text>
                    <Text style={styles.imageTitile}>{item.title}</Text>
                  </View>
                  
                </View>
              ))}
            </Swiper>

           

         </SafeAreaView>
     </>
       
     );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: 'black',
    position: 'relative'
  },
  sliderWrap:{
    position: 'relative'
  },
  nextBtn: {
    width: '100%',
    height: '100%',
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#8350ff'
  },
  nextText:{
    color: "#fff",
    textAlign: 'center',
    padding: 16,  fontSize: 24, fontWeight: 700,

  },
 
  sliderTextBox: {
    position: 'absolute',
    top: 60,
    left: '50%',
    transform: [{translateX:  '-50%'} ],
    zIndex: 20,
    paddingHorizontal: 20
  },
  imageChapture:{
    fontSize: 20,
    color: '#decaff',
    textAlign: 'center',
    fontFamily: 'SF-Pro-Text-HeavyItalic',
  
  },
  imageTitile:{
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'SF-Pro-Text-HeavyItalic',
    fontSize: 32,

  },
  btnsBlock:{
    position: 'absolute',
    left: 0,
    bottom: 45,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30, 
    gap: 12,
    paddingHorizontal: 8
  },
  skipBtn:{
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 12,
    width: 100,
    borderWidth: 2,
    borderColor: '#fff',
    textAlign: 'center'

  }
})