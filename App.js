import React, { useState, useRef, useEffect } from 'react'
import { 
  Dimensions, 

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

const App = React.memo(() => {
  let flatList = useRef(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [assets] = useAssets([
    require('./assets/fire.mp4'),
    require('./assets/nightsky.mp4'),
    require('./assets/waves.mp4')
  ])

  useEffect( () => {}, [])


  const deviceWidth = Dimensions.get('window').width
  const deviceHeight = Dimensions.get('window').height
  const data = [
    { id: 'fire', videoIndex: 0 },
    { id: 'nightsky', videoIndex: 1 },
    { id: 'waves', videoIndex: 2 },
  ]
  const viewabilityConfig = { waitForInteraction: true, itemVisiblePercentThreshold: 50}


  function onViewableItemsChanged(info) {
    // console.log('viewable items changed', info)
    console.log('info.changed[0].index', info.changed[0].index)
    const index = info.changed[0].index
    if (index !== currentVideoIndex) setCurrentVideoIndex(index)
    
  } 

  // function onScrollEndDrag(event) {
  //   console.log('on scroll end drag', event)
  //   flatList.current.scrollToIndex({ animated: false, index: currentVideoIndex })
  // }
  
  // if (viewableItems.length) setCurrentVideoIndex(viewableItems[0].index)
    
  

  const viewabilityConfigCallbackPairs = useRef([{viewabilityConfig, onViewableItemsChanged}])
  
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
        index={index} 
      />
    )
  } 


  if (assets) return (
    <SafeAreaView>
      <FlatList 

        ref={flatList} 
        data={data} 
        renderItem={renderItem}
        // onScroll={ (event) => handleScroll(event)}
        // onScrollBeginDrag={ (event) => onScrollBegin(event) }
        onScrollEndDrag={ event => onScrollEndDrag(event)}
        // onMomentumScrollBegin={ (event, index) => handleScroll(event, index)}
        keyExtractor={item => item.id}
        // extraData={} // WILL NEED THIS TO RERENDER FLATLIST BECAUSE 
        getItemLayout={(data, index) => (
          {length: deviceHeight, offset: deviceHeight * index, index}
        )}
        // onViewableItemsChanged={info => onViewableItemsChanged(info)}
        
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        viewabilityConfig={viewabilityConfig}
      />

    </SafeAreaView>
  ) 

  if (!assets) return (
    <AppLoading />
  )
  
}, () => true) 
 
  


export default App

const styles = {
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
  }
}

