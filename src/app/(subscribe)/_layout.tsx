import * as SplashScreen from 'expo-splash-screen'
import { Stack } from 'expo-router'
import React from 'react'

SplashScreen.preventAutoHideAsync();

export default function SubscribeLayout() {
 
  return (
    <Stack>
        <Stack.Screen name="subscribe" options={{headerShown: false}} />
    </Stack>
  );
}
