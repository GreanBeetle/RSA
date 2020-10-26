import React, { useState } from 'react'
import { Dimensions, StyleSheet, View, Text, SafeAreaView} from 'react-native'
import { useAssets } from 'expo-asset'
import { Video } from 'expo-av'
import { AppLoading } from 'expo'
import COLORS from './src/colors'

const App = () => {
  /************************************************ 
  VIDEO 
  *************************************************/
  let content = <AppLoading />
  const [assets] = useAssets([
    require('./assets/fire.mp4'),
    require('./assets/nightsky.mp4'),
    require('./assets/waves.mp4')
  ])

  const video = (
    <SafeAreaView style={styles.container}>
      <Video
        source={require('./assets/nightsky.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={Video.RESIZE_MODE_COVER}
        shouldPlay
        isLooping
        style={{width: 300, height: 300}} // MOVE STYLE OUT 
      />
    </SafeAreaView>
  )

  if (assets) content = video 
  /************************************************
  VIDEO 
  *************************************************/


  /************************************************
  ANIMATIONS
  *************************************************/
  const animated = <View style={{height: 300, width: 300, backgroundColor: COLORS.actionGreen }}/> // MOVE STYLE OUT
  
  /************************************************
  ANIMATIONS
  *************************************************/
  

  

  return content 
}

export default App 

const styles = {
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
  }
}

