import { StyleSheet, Text, View, Image, ImagePropsBase } from 'react-native'
import { Tabs } from 'expo-router'
import React, { useEffect } from 'react'
import { useGetSession } from '@/src/hooks/useGetSession'


export default function RecordLayout() {
 
 const {session} = useGetSession()

  
  return (
   <>
   <Tabs
        screenOptions={{
         tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#000",
            // borderTopWidth: 1,
            // borderTopColor: "#232533",
            borderTopWidth: 0,
            height: 74,
            paddingBottom: 10,
            paddingTop: 20,
            elevation: 10
          },
        }}

      >
        <Tabs.Screen
          name="record"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Image
                source={require('../../assets/images/Record.webp')}
                style={[styles.tabItem , focused && {opacity: 1}]}
              />
            )
          }}
        />
        <Tabs.Screen
          name="aiCover"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Image
                source={require('../../assets/images/aiCover.webp')}
                style={[styles.tabItem , focused && {opacity: 1}]}
              />
            )
          }}
        />
        <Tabs.Screen
          name="myWork"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('../../assets/images/work.webp')}
              style={[styles.tabItem , focused && {opacity: 1}]}
            />
            )
          }}
        />
       
      </Tabs>
   </>

   
  );
}

const styles = StyleSheet.create({
  tabItem:{
    width: 121,
    height: 58,
    borderRadius: 24,
    opacity: .5

  }
})

