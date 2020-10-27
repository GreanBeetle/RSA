import React, { useState, useRef, useMemo } from 'react'
import { 
  Dimensions, 
  SafeAreaView,
  FlatList
} from 'react-native'
import { useAssets } from 'expo-asset'  
import { AppLoading } from 'expo'
import { Item } from './src/components'

const App = () => {
  const deviceWidth = Dimensions.get('window').width
  const deviceHeight = Dimensions.get('window').height
  const [shouldPlay, setShouldPlay] = useState([true, false, false])  
  let flatList = useRef(null)
  const videoIndexRef = useRef(0)
  const viewabilityConfig = { waitForInteraction: true, itemVisiblePercentThreshold: 20}
  const viewabilityConfigCallbackPairs = useRef([{viewabilityConfig, onViewableItemsChanged}])

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
  
  function onViewableItemsChanged(info) {
    const change = info.changed.length >= 1
    const index = info.changed[0].index
    if (change) videoIndexRef.current = index     
  } 

  function onScrollEndDrag(event) {
    flatList.current.scrollToIndex({ animated: true, index: videoIndexRef.current })
    playVideo(videoIndexRef.current)
  }

  function playVideo(index) {
    if (index === 0) setShouldPlay([true, false, false])
    if (index === 1) setShouldPlay([false, true, false])
    if (index === 2) setShouldPlay([false, false, true])
  }
  
  const renderItem = ({ item }) => {
    console.log('render item', item.id)
    return (
      <Item 
        item={item} 
        shouldPlay={shouldPlay} 
        assets={assets}
        deviceHeight={deviceHeight}
        deviceWidth={deviceWidth} 
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
          )}     
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          viewabilityConfig={viewabilityConfig}
        />
      </SafeAreaView>
    )
  }, [assets, shouldPlay]) 
  
  if (!assets) return useMemo(() => {
    return <AppLoading />
  }, [assets, shouldPlay]) 
   
}
 
export default App


