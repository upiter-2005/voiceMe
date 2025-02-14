import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions, StatusBar } from 'react-native'

import settings from '@/src/assets/images/settings.webp'
import vip from '@/src/assets/images/vip.webp'
import pauseRecord from '@/src/assets/images/pauseRecord.png'
import importIco from '@/src/assets/images/Import.webp'
import record from '@/src/assets/images/tap.webp'
import bgimg from '@/src/assets/images/bg-gradient.webp'
import pause from '@/src/assets/images/Pause.webp'
import play from '@/src/assets/images/Play.webp'
import cancel from '@/src/assets/images/Cencel.webp'
import done from '@/src/assets/images/Done.webp'

import { useEvent } from 'expo'
import { useVideoPlayer, VideoView } from 'expo-video'
import {useGetVoices} from "@/src/hooks/useFetchVoices"
const videoSource = require('@/src/assets/images/Preloader.mp4')
import * as DocumentPicker from 'expo-document-picker'
import {createVoice} from "@/src/utils/createVoice"
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import { Settings } from '@/src/components/Settings'
const HEIGHT = Dimensions.get("window").height 

type Recordings = {
  sound: any,
  duration: string,
  file: string
}
const Record = () => {
  const [counter, setCounter] = useState<number>(0);
  const [activeCount, setActiveCount] = useState<boolean>(false);
  
  
  const [recording, setRecording] = React.useState<any>();
  const [recordings, setRecordings] = React.useState<Recordings[]>([]);
  const [fileName, setFileName] = useState<string>('')
  
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true
    player.play()
  });

  useEffect(() => {
    if(counter === 59){
      return
    }
    if(activeCount){
      setTimeout(() => setCounter(counter + 1), 1000)
    }
   
  }, [ activeCount, counter]);

  

  const importRecord = async() => {
    const resp = await DocumentPicker.getDocumentAsync()
    if(resp.assets){
      console.log(resp.assets[0]) 
      const result = await createVoice(resp.assets[0].name, resp.assets[0].uri)
      console.log(resp.assets[0]) 
      console.log(resp.assets[0].name)
      console.log(result)
    }
  }
  
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });


  async function startRecording() {
    setCounter(0)
    try {
      const perm = await Audio.requestPermissionsAsync()
      if (perm.status === "granted") {
       
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: true,
        });
        setActiveCount(true)
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
        setRecording(recording)
      }
    } catch (err) {console.log(err)}
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    let allRecordings = [];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(allRecordings);
    setActiveCount(false)
    setCounter(0)
  }

  function getDurationFormatted(milliseconds: number) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  }

  // function getRecordingLines() {
  //   return recordings.map((recordingLine, index) => {
  //     return (
  //       <View key={index} style={styles.row}>
  //         <Text style={styles.fill}>
  //           Recording #{index + 1} | {recordingLine.duration}
  //         </Text>
  //         <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
  //       </View>
  //     );
  //   });
  // }

  function clearRecordings() {
    setRecordings([])
    console.log(recording)
    setCounter(0)
  }


  return (
    
      <ScrollView >
        <ImageBackground source={bgimg} resizeMode="cover" style={styles.gbImg}>

        <Settings />

          <View className='items-center flex-col'>
                    
            <View style={styles.contentContainer}>
              <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
              <View style={styles.controlsContainer}>
                {/* <Button
                  title={isPlaying ? 'Pause' : 'Play'}
                  onPress={() => {
                    if (isPlaying) {
                      player.pause();
                    } else {
                      player.play();
                    }
                  }}
                /> */}
              </View>
            </View>


            <Text style={styles.time}>00:{counter < 10 && '0'}{counter}</Text>
            </View>

            {recordings.length === 0 && 
            <View style={styles.btnsBox}>

            <TouchableOpacity onPress={importRecord} style={styles.btn} >
              <Image
                source={importIco}
                resizeMode='contain'
                style={styles.iconSize}
              />
              <Text style={styles.recordBtn}>Import</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={styles.btn} >
              <Image
                source={recording ? pauseRecord : record}
                resizeMode='contain'
                style={styles.iconSize}
              />
              <Text style={styles.recordBtn}>Tap to Record</Text>
            </TouchableOpacity>

          </View>
          }
            

          {recordings.length > 0 &&  
            <View style={{flexDirection: 'row', gap: 14, alignItems: 'center', justifyContent: 'center', width: "100%",  }}>
              <TouchableOpacity activeOpacity={0.6} onPress={clearRecordings} >
                <Image
                    source={cancel}
                    resizeMode='contain'
                    style={{width:60, height:60}}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6} onPress={()=>{recordings[0].sound.replayAsync()}} >
                <Image
                    source={play}
                    resizeMode='contain'
                    style={{width:93, height:93}}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6} onPress={()=>{}} >
                <Image
                    source={done}
                    resizeMode='contain'
                    style={{width:60, height:60}}
                />
              </TouchableOpacity>
            </View> }
        
        </ImageBackground>
         
      </ScrollView>
  )
}

export default Record

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
  recordBtn: {
    color: '#fff'
  },
  iconSize:{
    width: 74,
    height: 74
  },
  btn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center"
  },
  gbImg:{
    height: HEIGHT - 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  topBtns:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8
  },
  time:{
    fontSize: 48,
    color: "#fff",
    marginBottom: 60,
    textAlign: 'center'    
  },
  btnsBox:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 340,
    paddingHorizontal: 12,
    marginHorizontal: 'auto',
    gap: 64,
    marginBottom: 120
  },


});


