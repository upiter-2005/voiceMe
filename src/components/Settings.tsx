import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native'
import { Link, Redirect, router } from "expo-router"
import settings from '@/src/assets/images/settings.webp'
import vip from '@/src/assets/images/vip.webp'

export const Settings:React.FC = () => {
    return (
        <View style={styles.topBtns}>
        <TouchableOpacity onPress={()=>{}}>
          <Image
            source={settings}
            resizeMode='contain'
            style={{width:47, height:47}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{router.push('/user-plan')}}>
          <Image
            source={vip}
            resizeMode='contain'
            style={{width:47, height:47}}
          />
        </TouchableOpacity>
      </View>
    )
}


const styles = StyleSheet.create({
    
    topBtns: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 8,
      height: 70,
      position: 'absolute',
      top: 70,
      width: '100%',
      zIndex: 10
    }
   
  })