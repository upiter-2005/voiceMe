import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Button, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import pick from '@/src/assets/images/Pick.png'
import {getAudio} from '@/src/utils/textToSpeach'
import { Audio } from 'expo-av'
import { useGetVoices } from '@/src/hooks/useFetchVoices'
import recordItem from '@/src/assets/images/User.webp'
import { LinearGradient } from 'expo-linear-gradient'
import { PlayResult } from '@/src/components/PlayResult'
import { Settings } from '@/src/components/Settings'
import {voices} from '@/src/constants/Voices'

type ItemProps = {
  id: string,
  avatar_image: string,
  display_name: string
}

const AiCover = () => {
  const [title, setTitle] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [voice, setVoice] = useState('henry');
  const [readyRecord, setReadyRecord] = useState<boolean>(false);
  const [resultRecord, setResultRecord] = useState<any>('');
  
  const [sound, setSound] = useState<any>()
  //const {voices} = useGetVoices()
    
  const generateVoice = async() => {
    if(title.length < 3 ){
      return Alert.alert('Incorrect title', 'Please insert more symbols in Title field')
    }
    if(message.length > 200){
      return Alert.alert('Symbol limit', 'You write more then 100 symbols, please try less')
    }
    if(message.length === 0){
      return Alert.alert('Text empty', 'Your message is empty')
    }
    const audio = await getAudio(title, message, voice)
    setResultRecord(audio)
    //const { sound } = await Audio.Sound.createAsync( { uri: audio as string } )
    //await sound.playAsync()
    //setSound(sound);
    setReadyRecord(true)

  }

  const cancelProcess = () => {
    setResultRecord('')
    setReadyRecord(false)
    setMessage('')
    setTitle('')
  }

  const InstanceVoiceItem = ({id, avatar_image, display_name}: ItemProps) => (
    <TouchableOpacity style={[{marginVertical: 6, marginHorizontal: 10}]} onPress={()=>setVoice(id)}>
      {avatar_image ? 
      <Image source={{uri: avatar_image}} resizeMode='contain' style={[{width:90, height:90, borderColor: '#9E00FF', borderWidth: 1, borderRadius: '50%'}, id === voice && {borderColor: '#9E00FF', borderWidth: 7} ]} />
    :
    <Image source={recordItem} resizeMode='contain' style={{width:90, height:90, borderColor: '#9E00FF', borderWidth: 1, borderRadius: '50%'}} />
    }
       
       <Text style={{color: '#d4b3ff', textAlign: 'center', fontSize: 12, marginTop: 7}}>{display_name}</Text>
    </TouchableOpacity>
  )


  return (

    <ScrollView >
      <View style={styles.container}>

          <Settings />
        {readyRecord && (
          <PlayResult resultRecord={resultRecord} cancelProcess={cancelProcess}/>
        )} 

        {!readyRecord && (
          <View style={{paddingHorizontal: 10}}>
            <View style={{paddingBottom: 20}}>
            <Text style={{color: '#fff', marginBottom: 4}}>Title</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder='Click to enter text'
              style={styles.inputBox}
            />
          </View>

          <View className='pt-5'>
            <Text style={{color: '#fff', marginBottom: 4}}>Add text</Text>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder='Click to enter text'
              style={styles.textAreaBox}
              multiline={true}
              numberOfLines={7}
            />
          </View>

          <View><Image source={pick} resizeMode="contain" style={{width: 125, height: 30, marginTop: 20}} /></View>

          <View style={styles.voiceIstances}>
            
            {voices &&  <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} >
              <FlatList
                  style={{display: 'flex', gap: 24, flexDirection: 'row'}}
                  data={voices}
                  renderItem={({item}: any) =>
                  <InstanceVoiceItem 
                    id={item.id}
                    avatar_image={item.avatar_image}
                    display_name={item.display_name} 
                    />
                  }
                  keyExtractor={(item: any) => item.id}
                  numColumns={Math.ceil(voices.length / 2)}
                  scrollEnabled={false}
                />
            </ScrollView>}

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={generateVoice}
            >
              <LinearGradient
                colors={['#00A3FF', '#CC00FF']}
                start={{ x: 1, y: .5 }}
                end={{ x: 0, y: .5 }}
                style={styles.createBtn}
              >
                <Text style={{color: '#fff', fontSize: 24}}>Create</Text>
              </LinearGradient>
            </TouchableOpacity> 
            
            </View>
          </View>
        ) }
        
              
            <View style={{height:75}}></View>

      </View>
     
    
    </ScrollView>
  )
}

export default AiCover

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#000',
    paddingTop: 160,
    paddingVertical: 40
    
  },
  createBtn: {
    margin: 30,
    width: 131,
    height: 47,
    borderRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  voiceIstances:{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputBox:{
    width: '100%',
    borderColor: '#acacac',
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 10, 
    borderRadius: 10,
    color: '#fff'
  },
  textAreaBox:{
    width: '100%',
    height: 140,
    borderColor: '#acacac',
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 10, 
    borderRadius: 10,
    color: '#fff'
  }
})