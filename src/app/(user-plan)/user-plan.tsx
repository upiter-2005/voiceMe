import React from 'react'
import {ImageBackground, ScrollView, StyleSheet, Text} from 'react-native'
import bgImg from "@/src/assets/images/Crown.webp"
import back from "@/src/assets/images/back.png"
import king from "@/src/assets/images/King.webp"
import master from "@/src/assets/images/Master.webp"
import pro from "@/src/assets/images/Pro.webp"
import {Image, View, TouchableOpacity} from 'react-native'
import { router } from "expo-router"
import subscribe from "@/src/assets/images/Subscribe.webp"
export default function UserPlan () {
    return (
        <ImageBackground source={bgImg} resizeMode="cover" style={styles.wrapper}>
            <TouchableOpacity onPress={()=>{router.back()}} style={{position: 'absolute', top: 84, left: 28}}>
                <Image
                    source={back}
                    resizeMode='contain'
                    style={{width: 12, height:30}}
                />
            </TouchableOpacity>
            <Text style={[styles.title, {color: "#ffcc02"}] }>Free trial time is over</Text>
            
            <TouchableOpacity onPress={()=>{router.push('/subscribe')}}>
                <Image
                    source={subscribe}
                    resizeMode='contain'
                    style={{width:313, height:166}}
                />
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    title:{
        color: "#fff",
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginTop: 27,
        marginBottom: 20,
        paddingHorizontal: 50
    },
    wrapper: {
        position: 'relative',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tariffBox:{
      gap: 20
    },
  });