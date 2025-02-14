import * as SplashScreen from 'expo-splash-screen'
import { Stack } from 'expo-router'
import React from 'react'

SplashScreen.preventAutoHideAsync();

export default function UserPlan() {
 
  return (
    <Stack>
        <Stack.Screen name="user-plan" options={{headerShown: false}} />
    </Stack>
  );
}
