import { View, Text, Pressable, Button } from 'react-native'
import { useEffect, useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import userStore from '../store/userStore'

WebBrowser.maybeCompleteAuthSession()

const GoogleAuth = () => {
    const [userInfo, setUserInfo] = useState(null)
    const {id, email, createUser, clearUser} = userStore()

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "1055738043123-0lbqb7obd062rp6fiklmv9558sgg40l2.apps.googleusercontent.com",
        iosClientId: "1055738043123-4gon01hsr2endfnt052jugc632d434ek.apps.googleusercontent.com",
        webClientId: "1055738043123-j73kjktq2a9ce41914vsv9jiobs233d4.apps.googleusercontent.com",
    })
    
    useEffect(()=>{
      handleSignInWithGoogle()
      
    }, [response])

    const getUserInfo = async(token: any) => {
      if(!token) return
      try {
        const response = await fetch('https://www.googleapis.com/userinfo/v2/me',
          {headers: {Authorization: `Bearer ${token}`}}
        )
        const user = await response.json()
        await AsyncStorage.setItem("@user", JSON.stringify(user))
        setUserInfo(user)
        createUser(user)
      } catch (error) {
        
      }
    }
    
    async function handleSignInWithGoogle () {
        const user = await AsyncStorage.getItem("@user")
        if(!user){
          if(response?.type === 'success'){
            await getUserInfo(response.authentication?.accessToken)
          }
        }else{
          setUserInfo(JSON.parse(user))
          createUser(JSON.parse(user))
        }
    } 

    const signIn = async() => {
        promptAsync()
        console.log('kog in')
        const user = await AsyncStorage.getItem("@user")
        console.log(userInfo)
    }

    const clearSession = () => {
      AsyncStorage.removeItem("@user")
      setUserInfo(null)
      clearUser()
    }

    
  return (
    <View>
      <Text style={{color: 'white'}}>{email} - {id}</Text>
      <Button onPress={signIn} title="Sign in with google" />
      <Button onPress={clearSession} title="Delete local storage" />
    </View>
  
  )
}

export default GoogleAuth


