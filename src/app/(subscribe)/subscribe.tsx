import React from 'react'
import {ImageBackground, ScrollView, StyleSheet, Text} from 'react-native'
import bgImg from "@/src/assets/images/Tariffs.webp"
import VoiceTitle2 from "@/src/assets/images/VoiceMeAssets/VoiceTitle2.webp"
import king from "@/src/assets/images/King.webp"
import master from "@/src/assets/images/Master.webp"
import pro from "@/src/assets/images/Pro.webp"
import {Image, View, TouchableOpacity} from 'react-native'

export default function Subscribe () {
    return (
      
          <ImageBackground source={bgImg} resizeMode="cover" style={styles.image}>
            <ScrollView contentContainerStyle={styles.contentContainer} >
                <Image source={VoiceTitle2} resizeMode="cover" style={{width: '110%', height: 97}} />

                <Text style={styles.title}>Choose your tariff</Text>
                <View style={styles.tariffBox}>

                  <TouchableOpacity onPress={()=>{}}>
                    <Image
                      source={king}
                      resizeMode='contain'
                      style={{width:313, height:123}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>{}}>
                    <Image
                      source={master}
                      resizeMode='contain'
                      style={{width:313, height:123}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>{}}>
                    <Image
                      source={pro}
                      resizeMode='contain'
                      style={{width:313, height:123}}
                    />
                  </TouchableOpacity>

                </View>
            </ScrollView>
            
          </ImageBackground>
    )
}

const styles = StyleSheet.create({
    contentContainer:{
      width: '100%',
      paddingTop: 100,
      display: 'flex', 
      alignItems: 'center'
    },
    title:{
      color: "#fff",
      fontSize: 36,
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