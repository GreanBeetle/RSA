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
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  let content = <AppLoading />
  /************************************************ 
  VIDEO 
  *************************************************/
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
        // style={{width: 300, height: 300}} // MOVE STYLE OUT 
        style={{width: deviceWidth, height: deviceHeight}}
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
  /* 
  1st principle of Animated is this: 
    start with a value, i.e. 0 1 2 3 4 5 6 
    transform this value into some other value 
  you specify where the Animated.Whatever starts
  then specify where the Animated.Whatever should end
  and React Native will fill in the gaps to get it from A to B

    you: (0, 0) -> (100, 50)

    rn:  (0,0) -> (10, 5) -> (50, 25) -> (100, 50) this is inaccurate but you get the idea 

  we as developers say what should happen, but don't say how, 
  react native takes care of the how 

  1 second to get from point A to B
  60 frames per second 

  So ... 
  (0,0) -> (100, 100)
  (0,0) -> 60 frames in here per second -> (100, 100)

  Animated.Value(5) or Animated.Value(num) where num can be 0 1 2 3 4 5 etc 
  Animated.Value(num) allows React to make changes to the screen WITHOUT UPDATING STATE
  it's kind of an escape hatch, if you will. React breaks its own rules.   
  */

  const value = useState(new Animated.Value(0))[0] // here we are returning only the 1st value from useState hook, i.e. the "getter" value, not the "setter value"

  function moveBall() {
    Animated.timing(value, { // accepts the value you want to change, here we've simply called it "value", and what you want to change that value to
      toValue: 1000,
      duration: 1000,
      useNativeDriver: false // if TRUE, run on Native Thread. if FALSE, run on JavaScript Thread. JavaScript Thread MUCH SLOWER 
    })
    .start()
  }

  /* 
  How is animation actually played on the screen? 
  React Native has a couple of threads. The UI Thread (main) and the JavaScript Thread. (Skipping shadow thread here.)
      
  (1) is, computations run on JavaScript thread, Animations by Native OS
      However this would be very slow! 
      We would have to get from Animated.Value(0) all the way up to 300 or 100 or 1000 or whatever
      And each update goes over the Async RN Bridge
          1.a compute
          1.b serialize
          1.c transfer over bridge to host OS
          1.d deserialize
          1.e run the FRAME 
      All this stuff means the JavaScript thread is extremely busy 

      (2) is, everything runs on the Native Thread
      2.a PRIOR to animation beginning, serialize entire animation
      2.b Native OS deserialize it 
      2.c this is the BETTER alternative 

  */

  // function moveBall() { // has a "springier effect"
  //   Animated.spring(value, {
  //     toValue: 500, 
  //     useNativeDriver: false
  //   })
  //   .start()
  // }

  const animated = (
    <View style={styles.container}>
      <Animated.View style={{ marginBottom: value }}>
        <TouchableOpacity onPress={moveBall}>
          <View 
            style={{
              height: 100, 
              width: 100,
              borderRadius: 50, 
              backgroundColor: COLORS.actionGreen 
            }}
          /> 
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
  
  // content = animated
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

