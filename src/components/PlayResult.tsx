import { View, Text, TouchableOpacity,Image, StyleSheet, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import recordItem from '@/src/assets/images/User.webp'
import pause from '@/src/assets/images/Pause.webp'
import play from '@/src/assets/images/Play.webp'

import cancel from '@/src/assets/images/Cencel.webp'
import done from '@/src/assets/images/Done.webp'

import { useVideoPlayer, VideoView } from 'expo-video'
import { useEvent } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import { Audio } from 'expo-av'
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import useRecordsStore from '../store/recordsStore'

const videoSource = require('@/src/assets/images/videos/Sphere.mp4')

interface IPlayResult {
    resultRecord: any
    cancelProcess: ()=> void
}

export const PlayResult:React.FC<IPlayResult> = ({resultRecord, cancelProcess}) => {
    const [isPlaing, setIsPlaing] = useState<boolean>(false)
    const [sound, setSound] = useState<any>()
    const { items, fetchItems, updateItem } = useRecordsStore()
    
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true
        player.play();
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    const playRecordHandler = async() => {
        const status = await sound.getStatusAsync()
        console.log(status)
        if(isPlaing){
            
            await sound.pauseAsync()
            setIsPlaing(false)
        }else{
            
            await sound.playAsync()
            setIsPlaing(true)
        }
        
    }

    const shareRecord = () => {
        Sharing.shareAsync(resultRecord)
    }

    const removeRecord = async() => {
      await FileSystem.deleteAsync(resultRecord)
      updateItem(resultRecord)
      cancelProcess()
      await sound.pauseAsync()
      Alert.alert("Cancel record")

    }

    const addRecord = async() => {
      fetchItems()
      await sound.pauseAsync()
      Alert.alert("Add record", "The record was added to your work list")
      cancelProcess()
    }

    useEffect(()=>{
        async function setRecordSound () {
            const { sound } = await Audio.Sound.createAsync( { uri: resultRecord as string } )
            setSound(sound)
            sound.setStatusAsync({ isLooping: true })
        }
        setRecordSound()
    }, [resultRecord])

  return (
    <View style={{}}>
    <VideoView style={{width:430, height: 430, position: 'relative', right: -60}} player={player} allowsFullscreen allowsPictureInPicture />
    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
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
        <View style={{flexDirection: 'row', gap: 14, alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={removeRecord}
          >
            <Image
                source={cancel}
                resizeMode='contain'
                style={{width:60, height:60}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={playRecordHandler}
          >
            <Image
                source={isPlaing ? pause : play}
                resizeMode='contain'
                style={{width:93, height:93}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={addRecord}
          >
            <Image
                source={done}
                resizeMode='contain'
                style={{width:60, height:60}}
            />
          </TouchableOpacity>
        </View>
       
       
      <TouchableOpacity
          activeOpacity={0.6}
          onPress={shareRecord}
        >
          <LinearGradient
            colors={['#00A3FF', '#CC00FF']}
            start={{ x: 1, y: .5 }}
            end={{ x: 0, y: .5 }}
            style={styles.createBtn}
          >
            <Text style={{color: '#fff', fontSize: 24}}>Share</Text>
          </LinearGradient>
        </TouchableOpacity> 
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    createBtn: {
        width: 320,
        height: 47,
        borderRadius: 25,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
      },
 

})