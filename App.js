import React, { useState } from 'react'
import { Dimensions, StyleSheet, View, Text, SafeAreaView} from 'react-native'
import { useAssets } from 'expo-asset'
import { Video } from 'expo-av'
import { AppLoading } from 'expo'

const App = () => {
  
  let content
  
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
        style={{width: 300, height: 300}}
      />
    </SafeAreaView>
  )



  if (!assets) content = <AppLoading />

  if (assets) content = video 
 
  
  

  
  console.log('rendering app')
  console.log('assets', assets)
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

