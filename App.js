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
  const videoIndexRef = useRef(0)
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
    const change = info.changed.length >= 1
    const index = info.changed[0].index
    if (change) videoIndexRef.current = index     
  } 

  function onScrollEndDrag(event) {
    console.log('end drag event', event)
    flatList.current.scrollToIndex({ animated: true, index: videoIndexRef.current })
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
    console.log('render item', item.id)
    return (
      <Item 
        videoIndex={item.videoIndex} 
        shouldPlay={false}
      />
    )
  } 

  console.log('rendering ASSESTS', assets)
  console.log('rendering CURRENT VIDEO INDEX', videoIndexRef.current)

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
          )}     
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

