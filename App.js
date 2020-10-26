import React, { useState } from 'react'
import { 
  Dimensions, 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView,
  Animated, 
  TouchableOpacity
} from 'react-native'
import { useAssets } from 'expo-asset'
import { Video } from 'expo-av'
import { AppLoading } from 'expo'
import COLORS from './src/colors'

const App = () => {
  let content = <AppLoading />
  /************************************************ 
  VIDEO 
  *************************************************/
  // const [assets] = useAssets([
  //   require('./assets/fire.mp4'),
  //   require('./assets/nightsky.mp4'),
  //   require('./assets/waves.mp4')
  // ])

  // const video = (
  //   <SafeAreaView style={styles.container}>
  //     <Video
  //       source={require('./assets/nightsky.mp4')}
  //       rate={1.0}
  //       volume={1.0}
  //       isMuted={false}
  //       resizeMode={Video.RESIZE_MODE_COVER}
  //       shouldPlay
  //       isLooping
  //       style={{width: 300, height: 300}} // MOVE STYLE OUT 
  //     />
  //   </SafeAreaView>
  // )

  // if (assets) content = video 
  /************************************************
  VIDEO 
  *************************************************/


  /************************************************
  ANIMATIONS
  *************************************************/
  const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0]

  function moveBall() {
    Animated.timing(value, {
      toValue: { x: 100, y: 100 }, 
      duration: 1000, 
      useNativeDriver: false
    }).start()
  }

  const animated = (
    <View style={styles.container}>
      <Animated.View style={value.getLayout()}>
        <View 
          style={{
            height: 100, 
            width: 100,
            borderRadius: 50, 
            backgroundColor: COLORS.actionGreen 
          }}
        /> 
      </Animated.View>
      <TouchableOpacity onPress={moveBall}>
        <Text>click me!</Text>
      </TouchableOpacity>
    </View>
  )
  
  content = animated
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

