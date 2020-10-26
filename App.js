import React, { useState, useRef, useMemo, useEffect } from 'react'
import { 
  Dimensions, 
  View, 
  SafeAreaView,
  FlatList
} from 'react-native'
import { useAssets } from 'expo-asset' // maybe unnecessary 
import { Video } from 'expo-av'
import { AppLoading } from 'expo'
import COLORS from './src/colors'

const App = () => {
  const deviceWidth = Dimensions.get('window').width
  const deviceHeight = Dimensions.get('window').height
  
  let flatList = useRef(null)
  
  let [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  
  const [assets] = useAssets([
    require('./assets/fire.mp4'),
    require('./assets/nightsky.mp4'),
    require('./assets/waves.mp4')
  ])

  const data = [
    { id: 'fire', videoIndex: 0 },
    { id: 'nightsky', videoIndex: 1 },
    { id: 'waves', videoIndex: 2 },
  ]
  
  const viewabilityConfig = { waitForInteraction: true, itemVisiblePercentThreshold: 30}

  const viewabilityConfigCallbackPairs = useRef([{viewabilityConfig, onViewableItemsChanged}])
  
  function onViewableItemsChanged(info) {
    console.log('info.changed[0].index', info.changed[0].index)
    const index = info.changed[0].index
    if (index !== currentVideoIndex) setCurrentVideoIndex(index)
  } 




  // HERE! 
  // THIS NEEDS TO WORK WHEN CURRENT VIDEO INDEX UPDATES!!
  function onScrollEndDrag(event) {
    console.log('on end drag', event)
    console.log('END DRAG videoINDEXREF', currentVideoIndex)
    // flatList.current.scrollToIndex({ animated: true, index: currentVideoIndex})
  }
  
  const Item = ({ videoIndex, shouldPlay }) => 
    <View style={{ flex: 1 }} >
      <Video
        source={assets[videoIndex]}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={Video.RESIZE_MODE_COVER}
        shouldPlay={shouldPlay}
        isLooping
        style={{ width: deviceWidth, height: deviceHeight }}
      />
    </View>

  const renderItem = ({ item, index }) => {
    console.log('render item current index', index)
    return (
      <Item 
        videoIndex={item.videoIndex} 
        shouldPlay={false}
        // index={index} // not used
      />
    )
  } 

  if (assets) return useMemo( () => {
    return (
      <SafeAreaView>
        <FlatList 
          ref={flatList} 
          data={data} 
          renderItem={renderItem}
          onScrollEndDrag={ event => onScrollEndDrag(event)}
          keyExtractor={item => item.id}
          getItemLayout={(data, index) => (
            {length: deviceHeight, offset: deviceHeight * index, index}
          )} // REVISE?         
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          viewabilityConfig={viewabilityConfig}
        />
      </SafeAreaView>
    )
  }, [assets]) 
  
   

  if (!assets) return useMemo(() => {
    return <AppLoading />
  }, [assets]) 
  
   
}
 
export default App

const styles = {
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
  }
}

