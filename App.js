import React, { useState } from 'react'
import { 
  Dimensions, 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView,
  Animated,  
  PanResponder,
  FlatList
} from 'react-native'
import { useAssets } from 'expo-asset' // maybe unnecessary 
import { Video } from 'expo-av'
import { AppLoading } from 'expo'
import COLORS from './src/colors'

const VideoClip = ({ index, shouldPlay, setIndex }) => {

console.log('index', index)

  let content = <AppLoading />
  const deviceWidth = Dimensions.get('window').width
  const deviceHeight = Dimensions.get('window').height
  const [assets] = useAssets([
    require('./assets/fire.mp4'),
    require('./assets/nightsky.mp4'),
    require('./assets/waves.mp4')
  ])
  const pan = useState(new Animated.ValueXY())[0]
  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: (_, gesture) => {
        pan.x.setValue(gesture.dx)
        pan.y.setValue(gesture.dy)
      },
      onPanResponderRelease: () => {
        // pan.flattenOffset(); // KEEP? 
        pan.y.setValue(0)
        // IF greater than 1/2 or 1/3 deviceheight, move on to next video
        // ELSE snap back to 0
        // setIndex() // callback 
      }
    })
  )[0]
  
  if (assets) return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View
        style={{
          height: deviceWidth,
          width: deviceHeight,
          transform: [{ translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        <Video
          source={assets[index]}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={Video.RESIZE_MODE_COVER}
          shouldPlay={shouldPlay}
          isLooping
          style={{ width: deviceWidth, height: deviceHeight }}
        />
      </Animated.View>
    </SafeAreaView>
  ) 
  
  return content 
  
  

  
}

const VideoList = () => {
  const data = [ 0, 1, 2 ]
  const renderItem = ({ item }) => <VideoClip index={item} shouldPlay={true} /> 
  return (
    <FlatList data={data} renderItem={renderItem} />
  )

}




const App = () => <VideoList />
 
  
  // content = <VideoClip index={1} shouldPlay={true} />



  


export default App 

const styles = {
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
  }
}

