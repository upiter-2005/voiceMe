import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function StepItem() {
  const params = useLocalSearchParams();

  return (
    
      <View >
       <Text>Step page {params.id}</Text>
      </View>
   
    
  );
}


const styles = StyleSheet.create({

})