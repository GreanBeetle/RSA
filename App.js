import React, { useState, useRef } from 'react'
import { 
  Dimensions, 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView,
  Animated, 
  TouchableOpacity, 
  PanResponder
} from 'react-native'
// import { useAssets } from 'expo-asset' // maybe unnecessary 
import { Video } from 'expo-av'
import { AppLoading } from 'expo'
import COLORS from './src/colors'

const App = () => {
  let content = <AppLoading />
  const deviceWidth = Dimensions.get('window').width
  const deviceHeight = Dimensions.get('window').height


  //   const [assets] = useAssets([ // possibly unnecessary? 
  //     require('./assets/fire.mp4'),
  //     require('./assets/nightsky.mp4'),
  //     require('./assets/waves.mp4')
  //   ])


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
      // onPanResponderMove: Animated.event( // original code here 
      //   [
      //     null,
      //     { dx: pan.x, dy: pan.y }
      //   ]
      // ),
      onPanResponderMove: (_, gesture) => {
    
        pan.x.setValue(gesture.dx)
        pan.y.setValue(gesture.dy)
      },
      onPanResponderRelease: () => {
        console.log('SCREEN HEIGHT', deviceHeight)
        console.log('RELEASE PAN.Y', pan.y, 'pan.dy', pan.dy)
        // pan.flattenOffset(); // KEEP? 
        pan.y.setValue(0)
        // IF greater than 1/2 or 1/3 deviceheight, move on to next video
        // ELSE snap back to 0
      }
    })
  )[0]
 
  const animated = (
    <SafeAreaView style={{flex: 1}}>
          <Animated.View 
            style={{
              height: deviceWidth, 
              width: deviceHeight,
              transform: [{ translateY: pan.y }] 
              // transform: [{translateX: pan.x}, {translateY: pan.y}] 

            }}
            {...panResponder.panHandlers}
          >
              <Video
                source={require('./assets/nightsky.mp4')}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode={Video.RESIZE_MODE_COVER}
                shouldPlay
                isLooping
    
                style={{ width: deviceWidth, height: deviceHeight }}
              />
          </Animated.View>   
    </SafeAreaView>
  ) 
  content = animated
  
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

